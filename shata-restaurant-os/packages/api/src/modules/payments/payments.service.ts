import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";
import { StripeProvider } from "./providers/stripe.provider";
import type { IPaymentProvider } from "./payment-provider.interface";

@Injectable()
export class PaymentsService {
  private providers: Map<string, IPaymentProvider>;

  constructor(
    private readonly db: DatabaseService,
    private readonly stripeProvider: StripeProvider
  ) {
    this.providers = new Map([
      ["STRIPE", stripeProvider],
      // Add PaymobProvider, FawryProvider etc here as regional add-ons
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
      await this.db.order.update({
        where: { id: event.orderId },
        data: { status: "CONFIRMED" },
      });
    }

    return { processed: true };
  }
}
