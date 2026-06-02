import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import type { IPaymentProvider, CreateIntentDto, PaymentIntentResult, PaymentResult, RefundResult, WebhookEvent } from "../payment-provider.interface";

@Injectable()
export class StripeProvider implements IPaymentProvider {
  private stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    this.stripe = new Stripe(config.get<string>("app.stripe.secretKey") ?? "", {
      apiVersion: "2024-06-20",
    });
  }

  getProviderName(): string {
    return "STRIPE";
  }

  // Stripe supports 135+ currencies — the most globally capable provider
  getSupportedCurrencies(): string[] {
    return ["*"]; // Supports all ISO 4217 currencies Stripe accepts
  }

  async createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult> {
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(dto.amount * 100), // Stripe uses smallest currency unit
      currency: dto.currency.toLowerCase(),
      metadata: { orderId: dto.orderId, ...dto.metadata },
    });

    return {
      intentId: intent.id,
      clientSecret: intent.client_secret ?? undefined,
    };
  }

  async confirmPayment(intentId: string): Promise<PaymentResult> {
    const intent = await this.stripe.paymentIntents.retrieve(intentId);
    return {
      success: intent.status === "succeeded",
      providerRef: intent.id,
      settledAt: intent.status === "succeeded" ? new Date() : undefined,
    };
  }

  async refund(intentId: string, amount?: number): Promise<RefundResult> {
    const refund = await this.stripe.refunds.create({
      payment_intent: intentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
    return { success: refund.status === "succeeded", refundRef: refund.id };
  }

  async parseWebhookEvent(payload: Buffer, signature: string): Promise<WebhookEvent> {
    const secret = this.config.get<string>("app.stripe.webhookSecret") ?? "";
    const event = this.stripe.webhooks.constructEvent(payload, signature, secret);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        return {
          eventId: event.id,
          type: "payment.success",
          orderId: pi.metadata["orderId"],
          amount: pi.amount_received / 100,
          currency: pi.currency.toUpperCase(),
        };
      }
      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        return {
          eventId: event.id,
          type: "payment.failed",
          orderId: pi.metadata["orderId"],
        };
      }
      case "charge.dispute.created": {
        const dispute = event.data.object as Stripe.Dispute;
        return {
          eventId: event.id,
          type: "dispute.created",
          amount: dispute.amount / 100,
          currency: dispute.currency.toUpperCase(),
          disputeReason: dispute.reason,
          disputeDueDate: dispute.evidence_details?.due_by
            ? new Date(dispute.evidence_details.due_by * 1000)
            : undefined,
        };
      }
      default:
        return { eventId: event.id, type: "payment.failed" };
    }
  }
}
