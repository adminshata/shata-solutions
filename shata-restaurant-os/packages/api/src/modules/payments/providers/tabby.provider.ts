import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type {
  IPaymentProvider,
  CreateIntentDto,
  PaymentIntentResult,
  PaymentResult,
  RefundResult,
  WebhookEvent,
} from "../payment-provider.interface";

// Tabby BNPL — Gulf market (AED, SAR, KWD, BHD)
// Docs: https://docs.tabby.ai/
const TABBY_BASE = "https://api.tabby.ai/api/v2";

@Injectable()
export class TabbyProvider implements IPaymentProvider {
  private readonly apiKey: string;
  private readonly webhookSecret: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.get<string>("app.tabby.apiKey") ?? "";
    this.webhookSecret = this.config.get<string>("app.tabby.webhookSecret") ?? "";
  }

  getProviderName(): string { return "TABBY"; }

  getSupportedCurrencies(): string[] {
    return ["AED", "SAR", "KWD", "BHD"];
  }

  async createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult> {
    const res = await fetch(`${TABBY_BASE}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        payment: {
          amount: dto.amount.toFixed(2),
          currency: dto.currency,
          description: `Order ${dto.orderId}`,
          buyer: {
            email: dto.metadata?.["customerEmail"] ?? "guest@shataos.com",
            phone: dto.metadata?.["customerPhone"] ?? "",
            name: dto.metadata?.["customerName"] ?? "Guest",
          },
          order: {
            reference_id: dto.orderId,
            items: [
              {
                title: `Order ${dto.orderId}`,
                quantity: 1,
                unit_price: dto.amount.toFixed(2),
                category: "Restaurant",
              },
            ],
          },
          buyer_history: { registered_since: "2000-01-01T00:00:00Z", loyalty_level: 0 },
          order_history: [],
        },
        lang: "en",
        merchant_code: dto.metadata?.["merchantCode"] ?? "shata",
        merchant_urls: {
          success: dto.returnUrl ?? "https://pos.shataos.com/payment/success",
          cancel: dto.returnUrl ?? "https://pos.shataos.com/payment/cancel",
          failure: dto.returnUrl ?? "https://pos.shataos.com/payment/failure",
        },
      }),
    });

    const data = (await res.json()) as {
      id?: string;
      configuration?: { available_products?: { installments?: Array<{ web_url?: string }> } };
      status?: string;
    };

    const installmentUrl =
      data.configuration?.available_products?.installments?.[0]?.web_url;

    return {
      intentId: data.id ?? dto.orderId,
      redirectUrl: installmentUrl,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    };
  }

  async confirmPayment(intentId: string): Promise<PaymentResult> {
    const res = await fetch(`${TABBY_BASE}/payments/${intentId}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    const data = (await res.json()) as { status?: string };
    return {
      success: data.status === "AUTHORIZED" || data.status === "CLOSED",
      providerRef: intentId,
      settledAt: new Date(),
    };
  }

  async refund(intentId: string, amount?: number): Promise<RefundResult> {
    const res = await fetch(`${TABBY_BASE}/payments/${intentId}/refunds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ amount: amount?.toFixed(2) }),
    });
    const data = (await res.json()) as { id?: string; status?: string };
    return {
      success: res.ok,
      refundRef: data.id ?? intentId,
      error: res.ok ? undefined : `Tabby refund failed (${res.status})`,
    };
  }

  async parseWebhookEvent(payload: Buffer, _signature: string): Promise<WebhookEvent> {
    const body = JSON.parse(payload.toString()) as {
      id?: string;
      status?: string;
      order?: { reference_id?: string };
      amount?: string;
      currency?: string;
    };

    const type =
      body.status === "AUTHORIZED" || body.status === "CLOSED"
        ? ("payment.success" as const)
        : ("payment.failed" as const);

    return {
      eventId: body.id ?? "",
      type,
      orderId: body.order?.reference_id,
      amount: body.amount ? parseFloat(body.amount) : undefined,
      currency: body.currency,
    };
  }
}
