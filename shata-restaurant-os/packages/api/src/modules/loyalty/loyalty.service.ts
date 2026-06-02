import { Injectable, Logger, BadRequestException, NotFoundException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { SessionTokenService } from "../auth/session-token.service";

interface OrderCompletedPayload {
  restaurantId: string;
  order: { id: string; sessionId: string | null; customerId: string | null; total: unknown };
}

@Injectable()
export class LoyaltyService {
  private readonly logger = new Logger(LoyaltyService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly sessionTokenSvc: SessionTokenService
  ) {}

  // ── Event handler ────────────────────────────────────────────────────────

  @OnEvent("order.completed")
  async onOrderCompleted({ restaurantId, order }: OrderCompletedPayload) {
    const customerId =
      order.customerId ??
      (order.sessionId
        ? (await this.db.session.findUnique({ where: { id: order.sessionId }, select: { tableId: true } }))?.tableId ?? null
        : null);

    if (!customerId) return;

    await this.awardStamp(restaurantId, customerId, order.id);

    const program = await this.db.loyaltyProgram.findUnique({ where: { restaurantId } });
    if (!program?.isActive || program.type === "STAMP") return;

    const orderTotal = Number(order.total);
    const ppEgp = Number(program.pointsPerEgp ?? 1);
    let pts = Math.floor(orderTotal * ppEgp);

    const tier = await this.getCustomerTier(restaurantId, customerId);
    if (tier) pts = Math.floor(pts * Number(tier.multiplier));

    const profile = await this.db.customerProfile.findFirst({ where: { customerId }, select: { birthdate: true } });
    if (profile?.birthdate && program.birthdayBonus) {
      const now = new Date();
      const bd = new Date(profile.birthdate);
      if (bd.getMonth() === now.getMonth() && bd.getDate() === now.getDate()) pts += program.birthdayBonus;
    }

    if (pts > 0) {
      await this.appendLedger(restaurantId, customerId, "EARN", pts, order.id);
      this.logger.debug(`Awarded ${pts}pts to ${customerId} (restaurant ${restaurantId})`);
    }
  }

  // ── Customer-facing ──────────────────────────────────────────────────────

  async getLoyaltyStatus(token: string) {
    const { restaurantId, tableId } = await this.sessionTokenSvc.verify(token);
    const customerId = tableId;

    const [program, account, stampCard, tiers] = await Promise.all([
      this.db.loyaltyProgram.findUnique({ where: { restaurantId } }),
      this.db.loyaltyAccount.findUnique({ where: { customerId_restaurantId: { restaurantId, customerId } } }),
      this.db.stampCard.findUnique({ where: { restaurantId_customerId: { restaurantId, customerId } } }),
      this.db.loyaltyTier.findMany({ where: { restaurantId }, orderBy: { minPoints: "asc" } }),
    ]);

    const points = account?.points ?? 0;
    const currentTier = tiers.filter((t) => t.minPoints <= points).at(-1) ?? null;
    const nextTier = tiers.find((t) => t.minPoints > points) ?? null;

    return {
      type: program?.type ?? "STAMP",
      points,
      stampCount: stampCard?.stamps ?? 0,
      stampsRequired: stampCard?.stampsRequired ?? 10,
      tier: currentTier ? { name: currentTier.name, color: currentTier.badgeColor } : null,
      nextTier: nextTier ? { name: nextTier.name, minPoints: nextTier.minPoints } : null,
      pointsToNextTier: nextTier ? Math.max(0, nextTier.minPoints - points) : 0,
      walletBalance: account?.walletBalance ?? 0,
    };
  }

  async getCard(token: string) { return this.getLoyaltyStatus(token); }

  // ── Referrals ────────────────────────────────────────────────────────────

  async applyReferral(dto: { restaurantId: string; referralCode: string; newCustomerId: string }) {
    const { restaurantId, referralCode, newCustomerId } = dto;
    const program = await this.db.loyaltyProgram.findUnique({ where: { restaurantId } });
    if (!program?.referralEnabled) throw new BadRequestException("Referral program not active");
    if (referralCode === newCustomerId) throw new BadRequestException("Cannot refer yourself");
    if (!await this.db.customer.findUnique({ where: { id: referralCode } })) throw new NotFoundException("Invalid referral code");
    if (await this.db.referral.findFirst({ where: { restaurantId, referredId: newCustomerId } }))
      throw new BadRequestException("Customer already used a referral");

    const referral = await this.db.referral.create({
      data: { restaurantId, referrerId: referralCode, referredId: newCustomerId, rewardPoints: program.referrerBonus ?? 0 },
    });
    if (program.referrerBonus && program.referrerBonus > 0)
      await this.appendLedger(restaurantId, referralCode, "EARN", program.referrerBonus, referral.id);
    if (program.referredBonus && program.referredBonus > 0)
      await this.appendLedger(restaurantId, newCustomerId, "EARN", program.referredBonus, referral.id);
    await this.db.referral.update({ where: { id: referral.id }, data: { status: "COMPLETED" } });
    return { success: true };
  }

  // ── Dashboard ────────────────────────────────────────────────────────────

  async getDashboardCustomers(restaurantId: string, page = 1) {
    const take = 20;
    const accounts = await this.db.loyaltyAccount.findMany({
      where: { restaurantId },
      orderBy: { points: "desc" },
      take,
      skip: (page - 1) * take,
      include: { customer: { select: { id: true, phone: true, name: true } } },
    });
    const tiers = await this.db.loyaltyTier.findMany({ where: { restaurantId }, orderBy: { minPoints: "asc" } });
    return accounts.map((a) => {
      const tier = tiers.filter((t) => t.minPoints <= a.points).at(-1) ?? null;
      return { customerId: a.customerId, phone: a.customer.phone, name: a.customer.name, points: a.points, tier, walletBalance: a.walletBalance };
    });
  }

  async getProgram(restaurantId: string) {
    const [program, tiers] = await Promise.all([
      this.db.loyaltyProgram.findUnique({ where: { restaurantId } }),
      this.db.loyaltyTier.findMany({ where: { restaurantId }, orderBy: { minPoints: "asc" } }),
    ]);
    return { program, tiers };
  }

  async updateProgram(restaurantId: string, dto: Record<string, unknown>) {
    return this.db.loyaltyProgram.upsert({
      where: { restaurantId },
      create: Object.assign({ restaurantId }, dto) as never,
      update: dto as never,
    });
  }

  async upsertTier(restaurantId: string, tierId: string | undefined, dto: { name: string; nameAr?: string; minPoints: number; multiplier: number; perks: string[]; badgeColor: string }) {
    if (tierId) return this.db.loyaltyTier.update({ where: { id: tierId }, data: { ...dto, perks: dto.perks } });
    return this.db.loyaltyTier.create({ data: { restaurantId, ...dto, perks: dto.perks } });
  }

  async deleteTier(tierId: string) { return this.db.loyaltyTier.delete({ where: { id: tierId } }); }

  async updateConfig(restaurantId: string, dto: { stampsRequired?: number; rewardType?: string; rewardProductId?: string | null }) {
    const r = await this.db.restaurant.findUnique({ where: { id: restaurantId }, select: { settings: true } });
    const s = (r?.settings ?? {}) as Record<string, unknown>;
    const updated = { ...s, loyalty: { ...((s["loyalty"] ?? {}) as Record<string, unknown>), ...dto } };
    await this.db.restaurant.update({ where: { id: restaurantId }, data: { settings: updated } });
    return updated["loyalty"];
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  private async awardStamp(restaurantId: string, customerId: string, orderId: string) {
    const r = await this.db.restaurant.findUnique({ where: { id: restaurantId }, select: { settings: true } });
    const s = ((r?.settings ?? {}) as Record<string, unknown>)["loyalty"] as Record<string, unknown> ?? {};
    const stampsRequired = (s["stampsRequired"] as number) ?? 10;
    const rewardType = (s["rewardType"] as string) ?? "FREE_ITEM";
    const rewardProductId = (s["rewardProductId"] as string | null) ?? null;
    const card = await this.db.stampCard.upsert({
      where: { restaurantId_customerId: { restaurantId, customerId } },
      create: { restaurantId, customerId, stamps: 1, stampsRequired, rewardType: rewardType as never, rewardProductId },
      update: { stamps: { increment: 1 } },
    });
    await this.db.stampTransaction.create({ data: { stampCardId: card.id, orderId, stampsAdded: 1 } });
    if (card.stamps + 1 >= stampsRequired && !card.completedAt)
      await this.db.stampCard.update({ where: { id: card.id }, data: { completedAt: new Date() } });
  }

  private async appendLedger(restaurantId: string, customerId: string, type: "EARN" | "REDEEM" | "ADJUSTMENT", points: number, refOrderId?: string) {
    const account = await this.db.loyaltyAccount.upsert({
      where: { customerId_restaurantId: { customerId, restaurantId } },
      create: { restaurantId, customerId, points: type === "EARN" ? points : 0, currency: "EGP" },
      update: { points: { increment: type === "EARN" ? points : -points } },
    });
    await this.db.loyaltyTransaction.create({
      data: { loyaltyAccountId: account.id, type: type as never, pointsDelta: type === "EARN" ? points : -points, refOrderId },
    });
    return account;
  }

  private async getCustomerTier(restaurantId: string, customerId: string) {
    const account = await this.db.loyaltyAccount.findUnique({ where: { customerId_restaurantId: { restaurantId, customerId } } });
    if (!account) return null;
    const tiers = await this.db.loyaltyTier.findMany({ where: { restaurantId }, orderBy: { minPoints: "asc" } });
    return tiers.filter((t) => t.minPoints <= account.points).at(-1) ?? null;
  }

  private loyaltySettings(settings: unknown): Record<string, unknown> {
    const s = (settings ?? {}) as Record<string, unknown>;
    return (s["loyalty"] ?? {}) as Record<string, unknown>;
  }
}
