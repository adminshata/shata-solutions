import { Injectable, Logger, BadRequestException, NotFoundException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { randomBytes } from "crypto";

interface OrderEvent { restaurantId: string; order: { id: string; total: unknown; currency: string } }

interface InboundOrderDto {
  externalOrderId?: string;
  tableIdentifier: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  customerName?: string;
  notes?: string;
}

export interface PosConfigDto {
  provider: "FOODICS" | "IIKO" | "LIGHTSPEED" | "CUSTOM";
  outboundUrl?: string;
  isActive?: boolean;
  config?: Record<string, unknown>;
}

@Injectable()
export class PosService {
  private readonly logger = new Logger(PosService.name);

  constructor(private readonly db: DatabaseService) {}

  // ── Inbound: POS → Shata ─────────────────────────────────────────────────

  async handleInboundWebhook(restaurantId: string, webhookSecret: string, dto: InboundOrderDto) {
    const integration = await this.db.posIntegration.findUnique({ where: { restaurantId } });
    if (!integration?.isActive) throw new BadRequestException("POS integration not active");
    if (integration.webhookSecret !== webhookSecret) throw new BadRequestException("Invalid webhook secret");

    // Find table by number
    const table = await this.db.table.findFirst({
      where: { restaurantId, number: dto.tableIdentifier },
      select: { id: true },
    });
    if (!table) throw new NotFoundException(`Table ${dto.tableIdentifier} not found`);

    // Find or create active session
    let session = await this.db.session.findFirst({ where: { tableId: table.id, restaurantId, status: "ACTIVE" } });
    if (!session) {
      session = await this.db.session.create({ data: { tableId: table.id, restaurantId } });
    }

    const restaurant = await this.db.restaurant.findUnique({ where: { id: restaurantId }, select: { currency: true } });

    // Calculate totals
    const subtotal = dto.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const orderCount = await this.db.order.count({ where: { restaurantId } });

    const order = await this.db.order.create({
      data: {
        orderNumber: orderCount + 1,
        sessionId: session.id,
        restaurantId,
        type: "EXTERNAL_POS",
        currency: restaurant?.currency ?? "USD",
        subtotal,
        tax: 0,
        total: subtotal,
        notes: dto.notes ?? dto.externalOrderId ? `POS: ${dto.externalOrderId}` : undefined,
        status: "CONFIRMED",
        items: {
          create: dto.items.map(item => ({
            productId: "", // POS items don't have product IDs
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
            notes: item.name,
          })),
        },
      },
      include: { items: true },
    });

    await this.db.kitchenTicket.create({ data: { orderId: order.id, restaurantId } });

    // Log delivery
    await this.logDelivery(restaurantId, "inbound", dto);

    return { orderId: order.id, kitchenTicketId: order.id };
  }

  // ── Outbound: Shata → POS ────────────────────────────────────────────────

  @OnEvent("order.created")
  async onOrderCreated({ restaurantId, order }: OrderEvent) {
    await this.sendOutbound(restaurantId, "order.placed", { orderId: order.id, total: order.total, currency: order.currency });
  }

  @OnEvent("payment.completed")
  async onPaymentCompleted({ restaurantId, orderId }: { restaurantId: string; orderId: string }) {
    await this.sendOutbound(restaurantId, "payment.completed", { orderId });
  }

  private async sendOutbound(restaurantId: string, event: string, payload: Record<string, unknown>) {
    const integration = await this.db.posIntegration.findUnique({ where: { restaurantId } });
    if (!integration?.isActive || !integration.outboundUrl) return;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(integration.outboundUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Shata-Event": event, "X-Shata-Secret": integration.webhookSecret },
          body: JSON.stringify({ event, restaurantId, ...payload, timestamp: new Date().toISOString() }),
        });
        await this.logDelivery(restaurantId, "outbound", { event, status: res.status });
        if (res.ok) return;
      } catch (err) {
        this.logger.warn({ err, attempt, event }, "POS outbound failed");
        if (attempt < 2) await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  // ── Dashboard endpoints ──────────────────────────────────────────────────

  async getIntegration(restaurantId: string) {
    return this.db.posIntegration.findUnique({ where: { restaurantId } });
  }

  async upsertIntegration(restaurantId: string, dto: PosConfigDto) {
    const webhookSecret = randomBytes(32).toString("hex");
    return this.db.posIntegration.upsert({
      where: { restaurantId },
      create: { restaurantId, webhookSecret, ...dto, config: (dto.config ?? {}) as never },
      update: { ...dto, config: (dto.config ?? {}) as never },
    });
  }

  async getWebhookUrl(restaurantId: string) {
    return { url: `https://api.shataos.com/api/v1/pos/webhook/${restaurantId}` };
  }

  private async logDelivery(restaurantId: string, direction: string, payload: unknown) {
    this.logger.debug({ restaurantId, direction, payload }, "POS webhook");
    await this.db.posIntegration.updateMany({ where: { restaurantId }, data: { lastSyncAt: new Date() } });
  }
}
