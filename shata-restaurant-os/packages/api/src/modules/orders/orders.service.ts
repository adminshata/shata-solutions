import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { TaxService } from "../../shared/tax/tax.service";
import { KitchenGateway } from "../../shared/realtime/kitchen.gateway";
import { DashboardGateway } from "../../shared/realtime/dashboard.gateway";
import { redactToken, SessionTokenService } from "../auth/session-token.service";
import type { PlaceOrderDto } from "@shata/types";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger("CustomerSession");

  // In-memory idempotency cache — evicts after 5 min. Production: use Redis.
  private readonly idempotencyCache = new Map<string, { id: string; expiresAt: number }>();

  constructor(
    private readonly db: DatabaseService,
    private readonly taxService: TaxService,
    private readonly kitchenGateway: KitchenGateway,
    private readonly dashboardGateway: DashboardGateway,
    private readonly events: EventEmitter2,
    private readonly sessionTokenSvc: SessionTokenService
  ) {}

  findByIdempotencyKey(key: string): { id: string } | null {
    const entry = this.idempotencyCache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) { this.idempotencyCache.delete(key); return null; }
    return { id: entry.id };
  }

  private cacheIdempotencyKey(key: string, orderId: string): void {
    this.idempotencyCache.set(key, { id: orderId, expiresAt: Date.now() + 5 * 60 * 1000 });
  }

  /**
   * Places a customer order from a session token. The token's tableId/restaurantId
   * are the source of truth — the request body is never trusted for tenant routing.
   * Finds the table's active session, creating one if it doesn't exist yet.
   */
  async placeOrderFromToken(token: string, dto: PlaceOrderDto, idempotencyKey?: string) {
    const ref = redactToken(token);
    const { tableId, restaurantId } = await this.sessionTokenSvc.verify(token);

    let session = await this.db.session.findFirst({
      where: { tableId, restaurantId, status: "ACTIVE" },
      orderBy: { openedAt: "desc" },
    });

    if (!session) {
      session = await this.db.session.create({ data: { tableId, restaurantId } });
      this.logger.debug(`[CustomerSession] created new active session: ${ref} -> session=${session.id}`);
    } else {
      this.logger.debug(`[CustomerSession] using active session: ${ref} -> session=${session.id}`);
    }

    const order = await this.placeOrder(restaurantId, session.id, dto);
    if (idempotencyKey) this.cacheIdempotencyKey(idempotencyKey, order.id);
    return order;
  }

  async placeOrder(restaurantId: string, sessionId: string, dto: PlaceOrderDto) {
    // 1. Load restaurant for currency + tax config
    const restaurant = await this.db.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) throw new NotFoundException("Restaurant not found");

    // 2. Load and validate every product — NEVER trust client prices
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.db.product.findMany({
      where: { id: { in: productIds }, restaurantId, isAvailable: true },
      include: { modifierGroups: { include: { options: true } } },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException("One or more products are unavailable");
    }

    // 3. Calculate subtotal server-side
    let subtotal = 0;
    const itemsData = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new BadRequestException(`Product ${item.productId} not found`);

      let unitPrice = Number(product.price);

      // Add modifier deltas (server-validated)
      if (item.selectedOptionIds.length > 0) {
        for (const optionId of item.selectedOptionIds) {
          const option = product.modifierGroups
            .flatMap((g) => g.options)
            .find((o) => o.id === optionId);
          if (option) unitPrice += Number(option.priceDelta);
        }
      }

      const totalPrice = round2(unitPrice * item.quantity);
      subtotal += totalPrice;

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: round2(unitPrice),
        totalPrice,
        notes: item.notes,
        selectedOptions: {
          create: item.selectedOptionIds.map((id) => {
            const option = product.modifierGroups
              .flatMap((g) => g.options)
              .find((o) => o.id === id);
            return {
              modifierOptionId: id,
              name: option?.name ?? "",
              priceDelta: Number(option?.priceDelta ?? 0),
            };
          }),
        },
      };
    });

    // 4. Calculate tax using TaxService — uses restaurant.taxRate, never hardcoded
    const { tax, total } = this.taxService.calculate(
      subtotal,
      Number(restaurant.taxRate),
      restaurant.taxInclusive
    );

    // 5. Atomic order creation
    const orderCount = await this.db.order.count({ where: { restaurantId } });
    const order = await this.db.order.create({
      data: {
        orderNumber: orderCount + 1,
        restaurantId,
        sessionId,
        currency: restaurant.currency,
        subtotal,
        tax,
        total,
        notes: dto.notes,
        status: "PENDING",
        items: { create: itemsData },
      },
      include: { items: { include: { selectedOptions: true } } },
    });

    // 6. Emit events — kitchen + dashboard will receive in < 500ms
    this.events.emit("order.created", { restaurantId, order });
    this.dashboardGateway.emitNewOrder(restaurantId, order);

    return order;
  }

  async getOrder(orderId: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true, selectedOptions: true } },
        kitchenTicket: true,
      },
    });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  /** Active (in-progress) orders for the dashboard live view — excludes served/cancelled/refunded/disputed. */
  async getActiveOrders(restaurantId: string) {
    if (!restaurantId) throw new BadRequestException("restaurantId is required");

    const orders = await this.db.order.findMany({
      where: {
        restaurantId,
        status: { in: ["PENDING", "CONFIRMED", "PREPARING", "COOKING", "READY"] },
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: true, selectedOptions: true } },
        kitchenTicket: true,
      },
    });

    return orders.map((order) => ({
      ...order,
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      total: Number(order.total),
      tipAmount: Number(order.tipAmount),
    }));
  }

  async getEta(orderId: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      select: {
        restaurantId: true,
        createdAt: true,
        items: { select: { product: { select: { avgPrepMinutes: true } } } },
      },
    });
    if (!order) throw new NotFoundException("Order not found");

    // Worst-case product prep time in this order (minimum 5 min floor)
    const maxPrepMinutes = Math.max(
      5,
      ...order.items.map((i) => i.product.avgPrepMinutes)
    );

    // Active tickets created before this order are "ahead" in the queue
    const activeTicketsAhead = await this.db.kitchenTicket.count({
      where: {
        restaurantId: order.restaurantId,
        status: { in: ["PENDING", "IN_PROGRESS"] },
        createdAt: { lt: order.createdAt },
      },
    });

    // 2 min per ticket ahead, capped at 15 min
    const queuePenalty = Math.min(activeTicketsAhead * 2, 15);
    const estimatedMinutes = maxPrepMinutes + queuePenalty;

    return { estimatedMinutes, activeTicketsAhead, maxPrepMinutes };
  }

  async reorderFrom(restaurantId: string, sessionId: string, orderId: string) {
    const original = await this.db.order.findUnique({
      where: { id: orderId, restaurantId },
      include: { items: { select: { productId: true, quantity: true, notes: true } } },
    });
    if (!original) throw new NotFoundException("Original order not found");

    // Re-place with cloned items — placeOrder re-validates availability and re-prices
    const dto = {
      items: original.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        selectedOptionIds: [] as string[],
        notes: item.notes ?? undefined,
      })),
    } as import("@shata/types").PlaceOrderDto;

    return this.placeOrder(restaurantId, sessionId, dto);
  }

  async placeManualOrder(
    restaurantId: string,
    staffId: string,
    dto: {
      tableId?: string;
      items: { productId: string; quantity: number; notes?: string }[];
      notes?: string;
      paymentMethod?: string;
    }
  ) {
    const restaurant = await this.db.restaurant.findUnique({ where: { id: restaurantId } });
    if (!restaurant) throw new NotFoundException("Restaurant not found");

    const productIds = dto.items.map((i) => i.productId);
    const products = await this.db.product.findMany({
      where: { id: { in: productIds }, restaurantId, isAvailable: true },
    });
    if (products.length !== productIds.length) {
      throw new BadRequestException("One or more products are unavailable");
    }

    let subtotal = 0;
    const itemsData = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const unitPrice = Number(product.price);
      const totalPrice = round2(unitPrice * item.quantity);
      subtotal += totalPrice;
      return { productId: item.productId, quantity: item.quantity, unitPrice, totalPrice, notes: item.notes };
    });

    const { tax, total } = this.taxService.calculate(subtotal, Number(restaurant.taxRate), restaurant.taxInclusive);
    const orderCount = await this.db.order.count({ where: { restaurantId } });

    // Resolve sessionId from tableId if provided
    let sessionId: string | undefined;
    if (dto.tableId) {
      const session = await this.db.session.findFirst({
        where: { tableId: dto.tableId, restaurantId, status: "ACTIVE" },
        select: { id: true },
      });
      sessionId = session?.id;
    }

    const order = await this.db.order.create({
      data: {
        orderNumber: orderCount + 1,
        restaurantId,
        sessionId,
        currency: restaurant.currency,
        subtotal,
        tax,
        total,
        notes: dto.notes,
        status: "PENDING",
        type: "STAFF_ENTRY",
        items: { create: itemsData },
      },
      include: { items: { include: { selectedOptions: true } } },
    });

    this.events.emit("order.created", { restaurantId, order });
    this.dashboardGateway.emitOrderUpdate(restaurantId, order);
    return order;
  }

  async updateStatus(restaurantId: string, orderId: string, status: string, voidReason?: string) {
    const order = await this.db.order.update({
      where: { id: orderId, restaurantId },
      data: { status: status as never, voidReason },
    });

    this.dashboardGateway.emitOrderUpdate(restaurantId, order);
    this.events.emit("order.status_changed", { restaurantId, order });
    if (status === "SERVED") {
      this.events.emit("order.completed", { restaurantId, order });
    }
    return order;
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
