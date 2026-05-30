import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { SessionTokenService } from "../auth/session-token.service";

interface OrderCompletedPayload {
  restaurantId: string;
  order: {
    id: string;
    sessionId: string;
  };
}

@Injectable()
export class LoyaltyService {
  private readonly logger = new Logger(LoyaltyService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly sessionTokenSvc: SessionTokenService
  ) {}

  @OnEvent("order.completed")
  async onOrderCompleted({ restaurantId, order }: OrderCompletedPayload) {
    // Resolve tableId (persistent customer identity) from the session
    const session = await this.db.session.findUnique({
      where: { id: order.sessionId },
      select: { tableId: true },
    });
    if (!session) return;

    const customerId = session.tableId;

    // Read restaurant's loyalty config from settings JSON
    const restaurant = await this.db.restaurant.findUnique({
      where: { id: restaurantId },
      select: { settings: true },
    });
    const loyaltySettings = this.loyaltySettings(restaurant?.settings);
    const stampsRequired = (loyaltySettings["stampsRequired"] as number) ?? 10;
    const rewardType = (loyaltySettings["rewardType"] as string) ?? "FREE_ITEM";
    const rewardProductId = (loyaltySettings["rewardProductId"] as string | null) ?? null;

    // Upsert the stamp card for this table
    const card = await this.db.stampCard.upsert({
      where: { restaurantId_customerId: { restaurantId, customerId } },
      create: {
        restaurantId,
        customerId,
        stamps: 1,
        stampsRequired,
        rewardType: rewardType as never,
        rewardProductId,
      },
      update: { stamps: { increment: 1 } },
    });

    await this.db.stampTransaction.create({
      data: { stampCardId: card.id, orderId: order.id, stampsAdded: 1 },
    });

    // Mark complete when threshold is reached
    const newStamps = card.stamps + 1;
    if (newStamps >= stampsRequired && !card.completedAt) {
      await this.db.stampCard.update({
        where: { id: card.id },
        data: { completedAt: new Date() },
      });
    }

    this.logger.debug(
      `Stamp added for table ${customerId} in restaurant ${restaurantId} (${newStamps}/${stampsRequired})`
    );
  }

  async getCard(token: string) {
    const { restaurantId, tableId } = await this.sessionTokenSvc.verify(token);
    const customerId = tableId;

    const card = await this.db.stampCard.findUnique({
      where: { restaurantId_customerId: { restaurantId, customerId } },
      select: {
        id: true,
        stamps: true,
        stampsRequired: true,
        rewardType: true,
        rewardProductId: true,
        isRedeemed: true,
        completedAt: true,
      },
    });

    if (card) return card;

    // Return default (no card yet) so the UI can still render the widget
    const restaurant = await this.db.restaurant.findUnique({
      where: { id: restaurantId },
      select: { settings: true },
    });
    const loyalty = this.loyaltySettings(restaurant?.settings);

    return {
      stamps: 0,
      stampsRequired: (loyalty["stampsRequired"] as number) ?? 10,
      rewardType: (loyalty["rewardType"] as string) ?? "FREE_ITEM",
      rewardProductId: (loyalty["rewardProductId"] as string | null) ?? null,
      isRedeemed: false,
      completedAt: null,
    };
  }

  async updateConfig(
    restaurantId: string,
    dto: { stampsRequired?: number; rewardType?: string; rewardProductId?: string | null }
  ) {
    const restaurant = await this.db.restaurant.findUnique({
      where: { id: restaurantId },
      select: { settings: true },
    });
    const settings = (restaurant?.settings ?? {}) as Record<string, unknown>;
    const updated = {
      ...settings,
      loyalty: { ...(this.loyaltySettings(restaurant?.settings)), ...dto },
    };

    await this.db.restaurant.update({
      where: { id: restaurantId },
      data: { settings: updated },
    });

    return updated["loyalty"];
  }

  private loyaltySettings(settings: unknown): Record<string, unknown> {
    const s = (settings ?? {}) as Record<string, unknown>;
    return (s["loyalty"] ?? {}) as Record<string, unknown>;
  }
}
