import { Controller, Post, Body, Param, RawBodyRequest, Req, Headers } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import type { Request } from "express";
import { PaymentsService } from "./payments.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("intent")
  @ApiOperation({ summary: "Create a payment intent (server-side only)" })
  createIntent(@Body() body: { orderId: string; provider: string }) {
    return this.paymentsService.createIntent(body.orderId, body.provider);
  }

  @Public()
  @Post("webhook/:provider")
  @ApiOperation({ summary: "Payment provider webhook (idempotent)" })
  handleWebhook(
    @Param("provider") provider: string,
    @Req() req: RawBodyRequest<Request>,
    @Headers("stripe-signature") stripeSignature: string
  ) {
    const signature = stripeSignature ?? req.headers["x-paymob-hmac"] ?? "";
    return this.paymentsService.handleWebhook(
      provider,
      req.rawBody ?? Buffer.from(""),
      String(signature)
    );
  }
}
