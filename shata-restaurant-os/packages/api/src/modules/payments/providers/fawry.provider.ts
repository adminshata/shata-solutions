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

// Fawry Pay documentation: https://developer.fawrystaging.com/
const FAWRY_BASE = "https://www.atfawry.com/ECommerceWeb/Fawry/payments";

@Injectable()
export class FawryProvider implements IPaymentProvider {
  private readonly merchantCode: string;
  private readonly securityKey: string;

  constructor(private readonly config: ConfigService) {
    this.merchantCode = this.config.get<string>("app.fawryMerchantCode") ?? "";
    this.securityKey = this.config.get<string>("app.fawrySecurityKey") ?? "";
  }

  getProviderName(): string { return "FAWRY"; }
  getSupportedCurrencies(): string[] { return ["EGP"]; }

  private buildSignature(
    merchantCode: string,
    merchantRefNum: string,
    customerProfileId: string,
    returnUrl: string,
    amount: string,
    itemsSig: string,
    securityKey: string
  ): string {
    // Fawry SHA-256 signature: merchantCode + merchantRefNum + customerProfileId +
    // returnUrl + amount(2dp) + itemsDescriptions(concatenated) + securityKey
    const raw = `${merchantCode}${merchantRefNum}${customerProfileId}${returnUrl}${amount}${itemsSig}${securityKey}`;
    return crypto.createHash("sha256").update(raw).digest("hex");
  }

  async createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult> {
    const merchantRefNum = dto.orderId;
    const customerProfileId = dto.metadata?.["customerId"] ?? dto.orderId;
    const returnUrl = dto.returnUrl ?? `https://pos.shataos.com/payment/callback`;
    const amount = dto.amount.toFixed(2);
    const itemDescription = `Order ${dto.orderId}`;

    const signature = this.buildSignature(
      this.merchantCode,
      merchantRefNum,
      customerProfileId,
      returnUrl,
      amount,
      itemDescription,
      this.securityKey
    );

    const payload = {
      merchantCode: this.merchantCode,
      merchantRefNum,
      customerProfileId,
      paymentExpiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      currencyCode: dto.currency,
      amount,
      returnUrl,
      chargeItems: [
        { itemId: dto.orderId, description: itemDescription, price: amount, quantity: 1 },
      ],
      signature,
    };

    const res = await fetch(`${FAWRY_BASE}/charge/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json() as { referenceNumber?: string; redirectUrl?: string; statusCode?: number };

    return {
      intentId: String(data["referenceNumber"] ?? merchantRefNum),
      redirectUrl: data["redirectUrl"],
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    };
  }

  async confirmPayment(intentId: string): Promise<PaymentResult> {
    const signature = crypto
      .createHash("sha256")
      .update(`${this.merchantCode}${intentId}${this.securityKey}`)
      .digest("hex");

    const res = await fetch(
      `${FAWRY_BASE}/status?merchantCode=${this.merchantCode}&merchantRefNum=${intentId}&signature=${signature}`
    );
    const data = await res.json() as { paymentStatus?: string };

    return {
      success: data["paymentStatus"] === "PAID",
      providerRef: intentId,
      settledAt: new Date(),
    };
  }

  async refund(intentId: string, amount?: number): Promise<RefundResult> {
    const amountStr = amount?.toFixed(2) ?? "0.00";
    const signature = crypto
      .createHash("sha256")
      .update(`${this.merchantCode}${intentId}${amountStr}${this.securityKey}`)
      .digest("hex");

    const res = await fetch(`${FAWRY_BASE}/refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchantCode: this.merchantCode,
        referenceNumber: intentId,
        refundAmount: amountStr,
        reason: "Customer request",
        signature,
      }),
    });
    const data = await res.json() as { statusCode?: number; statusDescription?: string };

    if (data["statusCode"] === 200) return { success: true, refundRef: intentId };
    return { success: false, refundRef: intentId, error: String(data["statusDescription"] ?? "Refund failed") };
  }

  async parseWebhookEvent(payload: Buffer, signature: string): Promise<WebhookEvent> {
    // Fawry sends GET callback — verify signature
    const body = JSON.parse(payload.toString()) as Record<string, string>;
    const expected = crypto
      .createHash("sha256")
      .update(`${this.merchantCode}${body["merchantRefNum"]}${body["paymentAmount"]}${body["orderStatus"]}${this.securityKey}`)
      .digest("hex");

    if (expected !== signature) throw new Error("Invalid Fawry webhook signature");

    const type = body["orderStatus"] === "PAID" ? "payment.success" as const : "payment.failed" as const;
    return {
      eventId: String(body["fawryRefNumber"] ?? ""),
      type,
      orderId: body["merchantRefNum"],
      amount: parseFloat(body["paymentAmount"] ?? "0"),
      currency: "EGP",
    };
  }
}
