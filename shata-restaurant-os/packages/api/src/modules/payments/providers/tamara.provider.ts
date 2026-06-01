import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import type {
  IPaymentProvider,
  CreateIntentDto,
  PaymentIntentResult,
  PaymentResult,
  RefundResult,
  WebhookEvent,
} from "../payment-provider.interface";

// Tamara BNPL — Gulf market (AED, SAR, KWD, BHD)
// Docs: https://docs.tamara.co/
const TAMARA_BASE = "https://api.tamara.co";

@Injectable()
export class TamaraProvider implements IPaymentProvider {
  private readonly apiToken: string;
  private readonly notificationKey: string;

  constructor(private readonly config: ConfigService) {
    this.apiToken = this.config.get<string>("app.tamara.apiToken") ?? "";
    this.notificationKey = this.config.get<string>("app.tamara.notificationKey") ?? "";
  }

  getProviderName(): string { return "TAMARA"; }

  getSupportedCurrencies(): string[] {
    return ["AED", "SAR", "KWD", "BHD"];
  }

  async createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult> {
    const res = await fetch(`${TAMARA_BASE}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({
        order_reference_id: dto.orderId,
        total_amount: {
          amount: dto.amount.toFixed(2),
          currency: dto.currency,
        },
        description: `Order ${dto.orderId}`,
        country_code: this.currencyToCountry(dto.currency),
        payment_type: "PAY_BY_INSTALMENTS",
        instalments: 3,
        locale: "en_US",
        items: [
          {
            reference_id: dto.orderId,
            type: "Digital",
            name: `Order ${dto.orderId}`,
            sku: dto.orderId,
            quantity: 1,
            unit_price: { amount: dto.amount.toFixed(2), currency: dto.currency },
            total_amount: { amount: dto.amount.toFixed(2), currency: dto.currency },
          },
        ],
        consumer: {
          email: dto.metadata?.["customerEmail"] ?? "guest@shataos.com",
          first_name: dto.metadata?.["customerFirstName"] ?? "Guest",
          last_name: dto.metadata?.["customerLastName"] ?? "",
          phone_number: dto.metadata?.["customerPhone"] ?? "",
        },
        billing_address: {
          first_name: dto.metadata?.["customerFirstName"] ?? "Guest",
          last_name: dto.metadata?.["customerLastName"] ?? "",
          line1: "N/A",
          city: "N/A",
          country_code: this.currencyToCountry(dto.currency),
          phone_number: dto.metadata?.["customerPhone"] ?? "",
        },
        shipping_address: {
          first_name: dto.metadata?.["customerFirstName"] ?? "Guest",
          last_name: dto.metadata?.["customerLastName"] ?? "",
          line1: "N/A",
          city: "N/A",
          country_code: this.currencyToCountry(dto.currency),
          phone_number: dto.metadata?.["customerPhone"] ?? "",
        },
        merchant_url: {
          success: dto.returnUrl ?? "https://pos.shataos.com/payment/success",
          failure: dto.returnUrl ?? "https://pos.shataos.com/payment/failure",
          cancel: dto.returnUrl ?? "https://pos.shataos.com/payment/cancel",
          notification: `https://api.shataos.com/api/v1/payments/webhook/tamara`,
        },
        tax_amount: { amount: "0.00", currency: dto.currency },
        shipping_amount: { amount: "0.00", currency: dto.currency },
        discount: { amount: { amount: "0.00", currency: dto.currency }, name: "" },
      }),
    });

    const data = (await res.json()) as {
      order_id?: string;
      checkout_url?: string;
    };

    return {
      intentId: data.order_id ?? dto.orderId,
      redirectUrl: data.checkout_url,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    };
  }

  async confirmPayment(intentId: string): Promise<PaymentResult> {
    const res = await fetch(`${TAMARA_BASE}/orders/${intentId}`, {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    });
    const data = (await res.json()) as { status?: string };
    return {
      success: data.status === "approved" || data.status === "captured",
      providerRef: intentId,
      settledAt: new Date(),
    };
  }

  async refund(intentId: string, amount?: number): Promise<RefundResult> {
    const res = await fetch(`${TAMARA_BASE}/payments/simplified-refund/${intentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({
        total_amount: amount,
        comment: "Customer refund",
      }),
    });
    const data = (await res.json()) as { refund_id?: string };
    return {
      success: res.ok,
      refundRef: data.refund_id ?? intentId,
      error: res.ok ? undefined : `Tamara refund failed (${res.status})`,
    };
  }

  async parseWebhookEvent(payload: Buffer, signature: string): Promise<WebhookEvent> {
    // Tamara uses HMAC-SHA256 notification key
    const expected = crypto
      .createHmac("sha256", this.notificationKey)
      .update(payload)
      .digest("hex");

    if (expected !== signature) throw new Error("Invalid Tamara webhook signature");

    const body = JSON.parse(payload.toString()) as {
      order_id?: string;
      event_type?: string;
      order_reference_id?: string;
      amount?: { amount?: string; currency?: string };
    };

    const successEvents = new Set(["order_approved", "order_captured"]);
    const type = successEvents.has(body.event_type ?? "")
      ? ("payment.success" as const)
      : ("payment.failed" as const);

    return {
      eventId: body.order_id ?? "",
      type,
      orderId: body.order_reference_id,
      amount: body.amount?.amount ? parseFloat(body.amount.amount) : undefined,
      currency: body.amount?.currency,
    };
  }

  private currencyToCountry(currency: string): string {
    const map: Record<string, string> = {
      AED: "AE",
      SAR: "SA",
      KWD: "KW",
      BHD: "BH",
    };
    return map[currency] ?? "SA";
  }
}
