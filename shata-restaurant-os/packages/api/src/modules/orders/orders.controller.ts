import { Controller, Get, Post, Patch, Param, Body, Sse } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Observable, Subject } from "rxjs";
import type { MessageEvent } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Orders")
@Controller()
export class OrdersController {
  // Per-order subjects for SSE streaming
  private readonly subjects = new Map<string, Subject<MessageEvent>>();

  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post("sessions/:token/orders")
  @ApiOperation({ summary: "Place an order (customer)" })
  placeOrder(@Param("token") _token: string, @Body() body: Record<string, unknown>) {
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

  @Patch("dashboard/orders/:id")
  @ApiOperation({ summary: "Update order status (dashboard)" })
  updateOrderStatus(
    @Param("id") id: string,
    @Body() body: { status: string; voidReason?: string; restaurantId: string }
  ) {
    return this.ordersService.updateStatus(body.restaurantId, id, body.status, body.voidReason);
  }
}
