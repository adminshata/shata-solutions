import { Controller, Get, Post, Patch, Param, Query, Body, Headers, Req, Res, ConflictException, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { Request, Response } from "express";
import type { PlaceOrderDto } from "@shata/types";
import { OrdersService } from "./orders.service";
import { Public } from "../auth/clerk.guard";

const SSE_HEARTBEAT_MS = 20_000;

@ApiTags("Orders")
@Controller({ version: VERSION_NEUTRAL })
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly events: EventEmitter2
  ) {}

  @Public()
  @Post("sessions/:token/orders")
  @ApiOperation({ summary: "Place an order (customer)" })
  async placeOrder(
    @Param("token") token: string,
    @Body() body: PlaceOrderDto,
    @Headers("idempotency-key") idempotencyKey?: string
  ) {
    // Idempotency check — if key seen in last 5 min, return 409 so client deduplicates
    if (idempotencyKey) {
      const recent = await this.ordersService.findByIdempotencyKey(idempotencyKey);
      if (recent) throw new ConflictException({ id: recent.id, deduplicated: true });
    }
    // restaurantId/tableId come from the verified session token, never the request body
    return this.ordersService.placeOrderFromToken(token, body, idempotencyKey);
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
  @ApiOperation({ summary: "SSE stream for live order status updates" })
  async orderStatusStream(
    @Param("id") orderId: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    });
    res.flushHeaders();

    const send = (data: unknown, event?: string) => {
      if (event) res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Initial handshake event so the client knows the stream is live
    send({ ok: true }, "connected");

    // Send the current status immediately so the UI doesn't wait for the next change
    try {
      const order = await this.ordersService.getOrder(orderId);
      send({ status: order.status });
    } catch {
      // Order not found — keep the stream open, client already has it from the initial fetch
    }

    const onStatusChange = (payload: { order: { id: string; status: string } }) => {
      if (payload.order.id !== orderId) return;
      send({ status: payload.order.status });
    };
    this.events.on("order.status_changed", onStatusChange);
    this.events.on("order.completed", onStatusChange);

    // Heartbeat comment keeps proxies (Railway/Vercel) from closing the idle connection
    const heartbeat = setInterval(() => {
      res.write(": heartbeat\n\n");
    }, SSE_HEARTBEAT_MS);

    req.on("close", () => {
      clearInterval(heartbeat);
      this.events.off("order.status_changed", onStatusChange);
      this.events.off("order.completed", onStatusChange);
      res.end();
    });
  }

  @Get("dashboard/orders/active")
  @ApiOperation({ summary: "Get active (in-progress) orders for the dashboard live view" })
  getActiveOrders(@Query("restaurantId") restaurantId: string) {
    return this.ordersService.getActiveOrders(restaurantId);
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
