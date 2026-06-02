export interface CreateIntentDto {
  orderId: string;
  amount: number;
  currency: string;
  returnUrl?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResult {
  intentId: string;
  clientSecret?: string;
  redirectUrl?: string;
  qrCode?: string;
  expiresAt?: Date;
}

export interface PaymentResult {
  success: boolean;
  providerRef: string;
  settledAt?: Date;
}

export interface RefundResult {
  success: boolean;
  refundRef: string;
  error?: string;
}

export interface WebhookEvent {
  eventId: string;
  type: "payment.success" | "payment.failed" | "refund.success" | "refund.failed" | "dispute.created";
  orderId?: string;
  amount?: number;
  currency?: string;
  disputeReason?: string;
  disputeDueDate?: Date;
}

export interface IPaymentProvider {
  createIntent(dto: CreateIntentDto): Promise<PaymentIntentResult>;
  confirmPayment(intentId: string): Promise<PaymentResult>;
  refund(intentId: string, amount?: number): Promise<RefundResult>;
  parseWebhookEvent(payload: Buffer, signature: string): Promise<WebhookEvent>;
  getProviderName(): string;
  getSupportedCurrencies(): string[];
}
