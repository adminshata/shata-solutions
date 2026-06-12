import { Injectable, NotFoundException } from "@nestjs/common";
import { OnEvent, EventEmitter2 } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { KitchenGateway } from "../../shared/realtime/kitchen.gateway";
import { DashboardGateway } from "../../shared/realtime/dashboard.gateway";
import type { KitchenTicketDto } from "@shata/types";

// Maps a kitchen ticket status to the order status it reflects, so the
// dashboard and customer SSE stream stay in sync with kitchen progress.
const TICKET_TO_ORDER_STATUS: Record<string, string | undefined> = {
  IN_PROGRESS: "PREPARING",
  READY: "READY",
  SERVED: "SERVED",
};

@Injectable()
export class KitchenService {
  constructor(
    private readonly db: DatabaseService,
    private readonly kitchenGateway: KitchenGateway,
    private readonly dashboardGateway: DashboardGateway,
    private readonly events: EventEmitter2
  ) {}

  @OnEvent("order.created")
  async onOrderCreated({ restaurantId, order }: { restaurantId: string; order: { id: string } }) {
    const ticket = await this.db.kitchenTicket.create({
      data: {
        orderId: order.id,
        restaurantId,
        status: "PENDING",
        priority: 0,
      },
      include: {
        order: { include: { items: { include: { product: true, selectedOptions: true } } } },
      },
    });

    const dto = this.toDto(ticket);
    this.kitchenGateway.emitNewTicket(restaurantId, dto);
  }

  async getActiveTickets(restaurantId: string, station?: string) {
    const tickets = await this.db.kitchenTicket.findMany({
      where: {
        restaurantId,
        status: { in: ["PENDING", "IN_PROGRESS"] },
        ...(station && station !== "ALL" ? { station } : {}),
      },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      include: {
        order: {
          include: {
            items: { include: { product: true, selectedOptions: true } },
            session: { include: { table: true } },
          },
        },
      },
    });

    return tickets.map((t) => this.toDto(t));
  }

  async updateTicket(restaurantId: string, ticketId: string, status: string) {
    const ticket = await this.db.kitchenTicket.update({
      where: { id: ticketId, restaurantId },
      data: {
        status: status as never,
        ...(status === "IN_PROGRESS" ? { prepStartedAt: new Date() } : {}),
        ...(status === "READY" ? { readyAt: new Date() } : {}),
        ...(status === "SERVED" ? { servedAt: new Date() } : {}),
      },
      include: {
        order: {
          include: {
            items: { include: { product: true, selectedOptions: true } },
            session: { include: { table: true } },
          },
        },
      },
    });

    if (!ticket) throw new NotFoundException("Ticket not found");

    const dto = this.toDto(ticket);
    this.kitchenGateway.emitTicketUpdate(restaurantId, dto);

    // Propagate kitchen progress to the order — keeps the dashboard and
    // customer order-status SSE stream in sync with kitchen bumps.
    const orderStatus = TICKET_TO_ORDER_STATUS[status];
    if (orderStatus) {
      const order = await this.db.order.update({
        where: { id: ticket.orderId, restaurantId },
        data: { status: orderStatus as never },
      });
      this.dashboardGateway.emitOrderUpdate(restaurantId, order);
      this.events.emit("order.status_changed", { restaurantId, order });
      if (orderStatus === "SERVED") {
        this.events.emit("order.completed", { restaurantId, order });
      }
    }

    return dto;
  }

  private toDto(ticket: Record<string, unknown>): KitchenTicketDto {
    const t = ticket as {
      id: string;
      orderId: string;
      station: string | null;
      status: string;
      priority: number;
      createdAt: Date;
      prepStartedAt: Date | null;
      order: {
        orderNumber: number;
        items: Array<{
          quantity: number;
          notes: string | null;
          product: { name: string; nameAr: string | null };
          selectedOptions: Array<{ name: string }>;
        }>;
        session: { table: { number: string } | null } | null;
      };
    };

    const elapsed = Math.floor((Date.now() - t.createdAt.getTime()) / 1000);

    return {
      id: t.id,
      orderId: t.orderId,
      orderNumber: String(t.order.orderNumber),
      tableNumber: t.order.session?.table?.number ?? "?",
      station: t.station,
      status: t.status as never,
      priority: t.priority,
      elapsedSeconds: elapsed,
      createdAt: t.createdAt,
      prepStartedAt: t.prepStartedAt ?? undefined,
      items: t.order.items.map((item) => ({
        id: item.product.name,
        name: item.product.name,
        nameAr: item.product.nameAr ?? undefined,
        quantity: item.quantity,
        notes: item.notes ?? undefined,
        modifiers: item.selectedOptions.map((o) => o.name),
      })),
    };
  }
}
