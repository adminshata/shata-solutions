import { Controller, Get, Post, Patch, Param, Body, Sse, Headers, ConflictException, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Observable, Subject } from "rxjs";
import type { MessageEvent } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Orders")
@Controller({ version: VERSION_NEUTRAL })
export class OrdersController {
  // Per-order subjects for SSE streaming
  private readonly subjects = new Map<string, Subject<MessageEvent>>();

  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post("sessions/:token/orders")
  @ApiOperation({ summary: "Place an order (customer)" })
  async placeOrder(
    @Param("token") _token: string,
    @Body() body: Record<string, unknown>,
    @Headers("idempotency-key") idempotencyKey?: string
  ) {
    // Idempotency check — if key seen in last 5 min, return 409 so client deduplicates
    if (idempotencyKey) {
      const recent = await this.ordersService.findByIdempotencyKey(idempotencyKey);
      if (recent) throw new ConflictException({ id: recent.id, deduplicated: true });
    }
    // TODO: decode session token → restaurantId + sessionId
    return this.ordersService.placeOrder("restaurantId", "sessionId", body as never);
  }

  @Public()
  @Get("orders/:id")
  @ApiOperation({ summary: "Get order status (customer)" })
  getOrder(@Param("id") id: string) {
    return this.ordersService.getOrder(id);
  }

  @Public()
  @Get("orders/:id/eta")
  @ApiOperation({ summary: "Get estimated prep time for an order" })
  getEta(@Param("id") id: string) {
    return this.ordersService.getEta(id);
  }

  @Public()
  @Get("orders/:id/stream")
  @Sse()
  @ApiOperation({ summary: "SSE stream for live order status updates" })
  orderStatusStream(@Param("id") orderId: string): Observable<MessageEvent> {
    if (!this.subjects.has(orderId)) {
      this.subjects.set(orderId, new Subject<MessageEvent>());
    }
    return this.subjects.get(orderId)!.asObservable();
  }

  @Post("dashboard/orders/manual")
  @ApiOperation({ summary: "Staff manual order entry (no customer session required)" })
  placeManualOrder(
    @Body() body: {
      restaurantId: string;
      staffId: string;
      tableId?: string;
      items: { productId: string; quantity: number; notes?: string }[];
      notes?: string;
      paymentMethod?: string;
    }
  ) {
    return this.ordersService.placeManualOrder(body.restaurantId, body.staffId, {
      tableId: body.tableId,
      items: body.items,
      notes: body.notes,
      paymentMethod: body.paymentMethod,
    });
  }

  @Patch("dashboard/orders/:id")
  @ApiOperation({ summary: "Update order status (dashboard)" })
  updateOrderStatus(
    @Param("id") id: string,
    @Body() body: { status: string; voidReason?: string; restaurantId: string }
  ) {
    return this.ordersService.updateStatus(body.restaurantId, id, body.status, body.voidReason);
  }
}
