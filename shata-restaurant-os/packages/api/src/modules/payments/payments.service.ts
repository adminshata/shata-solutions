import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DatabaseService } from "../../shared/database/database.service";
import { StripeProvider } from "./providers/stripe.provider";
import { PaymobProvider } from "./providers/paymob.provider";
import { FawryProvider } from "./providers/fawry.provider";
import type { IPaymentProvider } from "./payment-provider.interface";

@Injectable()
export class PaymentsService {
  private providers: Map<string, IPaymentProvider>;

  constructor(
    private readonly db: DatabaseService,
    private readonly stripeProvider: StripeProvider,
    private readonly paymobProvider: PaymobProvider,
    private readonly fawryProvider: FawryProvider,
    private readonly events: EventEmitter2,
  ) {
    this.providers = new Map<string, IPaymentProvider>([
      ["STRIPE", stripeProvider],
      ["PAYMOB", paymobProvider],
      ["FAWRY", fawryProvider],
    ]);
  }

  private getProvider(providerName: string): IPaymentProvider {
    const provider = this.providers.get(providerName.toUpperCase());
    if (!provider) throw new BadRequestException(`Payment provider ${providerName} not configured`);
    return provider;
  }

  async createIntent(orderId: string, providerName: string) {
    const order = await this.db.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException("Order not found");

    const provider = this.getProvider(providerName);

    const result = await provider.createIntent({
      orderId,
      amount: Number(order.total),
      currency: order.currency, // From the order — never from client
    });

    // Persist intent — idempotency key prevents duplicates
    await this.db.paymentIntent.upsert({
      where: { orderId },
      update: { providerRef: result.intentId, status: "PENDING" },
      create: {
        orderId,
        provider: providerName as never,
        providerRef: result.intentId,
        amount: order.total,
        currency: order.currency,
        status: "PENDING",
        idempotencyKey: `${orderId}-${providerName}`,
      },
    });

    return result;
  }

  // Idempotent webhook handler — safe to call multiple times
  async handleWebhook(providerName: string, payload: Buffer, signature: string) {
    const provider = this.getProvider(providerName);
    const event = await provider.parseWebhookEvent(payload, signature);

    // Check if already processed (idempotency)
    const existing = await this.db.paymentIntent.findFirst({
      where: { providerRef: event.eventId },
    });
    if (existing?.status === "COMPLETED") return { alreadyProcessed: true };

    if (event.type === "payment.success" && event.orderId) {
      await this.db.paymentIntent.updateMany({
        where: { orderId: event.orderId },
        data: { status: "COMPLETED", settledAt: new Date() },
      });
      const order = await this.db.order.update({
        where: { id: event.orderId },
        data: { status: "CONFIRMED" },
      });
      this.events.emit("payment.completed", { orderId: event.orderId, restaurantId: order.restaurantId });
    }

    if (event.type === "payment.failed" && event.orderId) {
      await this.db.paymentIntent.updateMany({
        where: { orderId: event.orderId },
        data: { status: "FAILED" },
      });
      this.events.emit("payment.failed", { orderId: event.orderId });
    }

    return { processed: true };
  }

  // Used by reconciliation queue job — returns stale PROCESSING intents
  async getStaleProcessingIntents(olderThanMinutes = 10) {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    return this.db.paymentIntent.findMany({
      where: { status: "PROCESSING", createdAt: { lt: cutoff } },
      include: { order: { select: { restaurantId: true } } },
    });
  }

  async markIntentFailed(intentId: string) {
    return this.db.paymentIntent.update({
      where: { id: intentId },
      data: { status: "FAILED" },
    });
  }
}
