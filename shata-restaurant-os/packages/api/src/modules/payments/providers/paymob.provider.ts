import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac } from "crypto";
import type {
  IPaymentProvider,
  CreateIntentDto,
  PaymentIntentResult,
  PaymentResult,
  RefundResult,
  WebhookEvent,
} from "../payment-provider.interface";

// Paymob 3-step flow:
// 1. Auth   → POST /api/auth/tokens          → auth_token
// 2. Order  → POST /api/ecommerce/orders     → order_id
// 3. PayKey → POST /api/acceptance/payment_keys → payment_token (iFrame URL)

const PAYMOB_BASE = "https://accept.paymob.com";

// Paymob HMAC fields must be concatenated in this exact order per their docs
const HMAC_FIELDS = [
  "amount_cents",
  "created_at",
  "currency",
  "error_occured",
  "has_parent_transaction",
  "id",
  "integration_id",
  "is_3d_secure",
  "is_auth",
  "is_capture",
  "is_refunded",
  "is_standalone_payment",
  "is_voided",
  "order.id",
  "owner",
  "pending",
  "source_data.pan",
  "source_data.sub_type",
  "source_data.type",
  "success",
] as const;

@Injectable()
export class PaymobProvider implements IPaymentProvider {
  private readonly logger = new Logger(PaymobProvider.name);
  private readonly apiKey: string;
  private readonly integrationIdCard: string;
  private readonly integrationIdWallet: string;
  private readonly integrationIdInstapay: string;
  private readonly hmacSecret: string;
  private readonly iframeId: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = config.get<string>("app.paymob.apiKey") ?? "";
    this.integrationIdCard = config.get<string>("app.paymob.integrationIdCard") ?? "";
    this.integrationIdWallet = config.get<string>("app.paymob.integrationIdWallet") ?? "";
    this.integrationIdInstapay = config.get<string>("app.paymob.integrationIdInstapay") ?? "";
    this.hmacSecret = config.get<string>("app.paymob.hmacSecret") ?? "";
    this.iframeId = config.get<string>("app.paymob.iframeId") ?? "";
  }

  getProviderName() { return "PAYMOB"; }
  getSupportedCurrencies() { return ["EGP", "USD", "SAR", "AED", "KWD", "QAR", "BHD"]; }

  async createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult> {
    const authToken = await this.authenticate();
    const amountCents = Math.round(dto.amount * 100);

    const paymobOrderId = await this.registerOrder(authToken, amountCents, dto.currency, dto.orderId);
    const paymentToken = await this.getPaymentKey(authToken, amountCents, dto.currency, paymobOrderId);

    const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${this.iframeId}?payment_token=${paymentToken}`;

    return {
      intentId: paymobOrderId,
      redirectUrl,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    };
  }

  // Paymob doesn't need a separate confirm step — webhook handles it
  async confirmPayment(_intentId: string): Promise<PaymentResult> {
    return { success: true, providerRef: _intentId };
  }

  async refund(transactionId: string, amount?: number): Promise<RefundResult> {
    try {
      const authToken = await this.authenticate();
      const body: Record<string, unknown> = {
        auth_token: authToken,
        transaction_id: transactionId,
      };
      if (amount !== undefined) {
        body["amount_cents"] = Math.round(amount * 100);
      }
      const res = await fetch(
        `${PAYMOB_BASE}/api/acceptance/void_refund/refund`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json() as Record<string, unknown>;
      if (data["success"]) {
        return { success: true, refundRef: String(data["id"] ?? "") };
      }
      return { success: false, refundRef: "", error: String(data["message"] ?? "Unknown error") };
    } catch (err) {
      this.logger.error(`Paymob refund failed: ${(err as Error).message}`);
      return { success: false, refundRef: "", error: (err as Error).message };
    }
  }

  async parseWebhookEvent(payload: Buffer, _signature: string): Promise<WebhookEvent> {
    const body = JSON.parse(payload.toString()) as Record<string, unknown>;

    // Paymob sends HMAC as query param ?hmac=... — it arrives pre-verified by the controller
    // Parse the nested transaction data
    const obj = (body["obj"] as Record<string, unknown>) ?? {};
    const order = (obj["order"] as Record<string, unknown>) ?? {};

    const transactionId = String(obj["id"] ?? "");
    const success = obj["success"] === true;
    const orderId = String(order["merchant_order_id"] ?? "");

    return {
      eventId: transactionId,
      type: success ? "payment.success" : "payment.failed",
      orderId,
      amount: typeof obj["amount_cents"] === "number" ? obj["amount_cents"] / 100 : undefined,
      currency: String(order["currency"] ?? "EGP"),
    };
  }

  // Verify HMAC from Paymob webhook query string
  verifyHmac(queryParams: Record<string, string>): boolean {
    const hmacReceived = queryParams["hmac"];
    if (!hmacReceived || !this.hmacSecret) return false;

    // Build the transaction object from nested query params for HMAC
    // Paymob sends flat params like: amount_cents, order.id, source_data.pan etc.
    const concat = HMAC_FIELDS.map((field) => queryParams[field] ?? "").join("");
    const computed = createHmac("sha512", this.hmacSecret)
      .update(concat)
      .digest("hex");

    return computed === hmacReceived;
  }

  private async authenticate(): Promise<string> {
    const res = await fetch(`${PAYMOB_BASE}/api/auth/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: this.apiKey }),
    });
    if (!res.ok) throw new Error(`Paymob auth failed: ${res.status}`);
    const data = await res.json() as { token: string };
    return data.token;
  }

  private async registerOrder(
    authToken: string,
    amountCents: number,
    currency: string,
    merchantOrderId: string
  ): Promise<string> {
    const res = await fetch(`${PAYMOB_BASE}/api/ecommerce/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: amountCents,
        currency,
        merchant_order_id: merchantOrderId,
        items: [],
      }),
    });
    if (!res.ok) throw new Error(`Paymob order registration failed: ${res.status}`);
    const data = await res.json() as { id: number };
    return String(data.id);
  }

  private async getPaymentKey(
    authToken: string,
    amountCents: number,
    currency: string,
    paymobOrderId: string
  ): Promise<string> {
    const integrationId = parseInt(this.integrationIdCard, 10);
    const res = await fetch(`${PAYMOB_BASE}/api/acceptance/payment_keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: paymobOrderId,
        currency,
        integration_id: integrationId,
        billing_data: {
          apartment: "NA", email: "NA@shata.app", floor: "NA",
          first_name: "Guest", street: "NA", building: "NA",
          phone_number: "NA", shipping_method: "NA",
          postal_code: "NA", city: "NA", country: "EG",
          last_name: "Customer", state: "NA",
        },
      }),
    });
    if (!res.ok) throw new Error(`Paymob payment key failed: ${res.status}`);
    const data = await res.json() as { token: string };
    return data.token;
  }
}
