"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@shata/ui";
import { enqueueOrder } from "@/lib/offline-queue";
import { useOfflineSync } from "@/lib/use-offline-sync";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { BottomBar } from "@/components/ui/BottomBar";

type PaymentMethod = "CARD" | "CASH" | "APPLE_PAY" | "GOOGLE_PAY" | "INSTAPAY" | "FAWRY";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "CARD", label: "Credit / Debit Card", icon: "💳" },
  { id: "CASH", label: "Pay at Counter", icon: "💵" },
  { id: "INSTAPAY", label: "InstaPay", icon: "📲" },
  { id: "FAWRY", label: "Fawry", icon: "🏪" },
  { id: "APPLE_PAY", label: "Apple Pay", icon: "🍎" },
  { id: "GOOGLE_PAY", label: "Google Pay", icon: "G" },
];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11l4 4 8-8" />
    </svg>
  );
}

export default function CheckoutPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { items, total, currency, locale, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const { isOnline, pendingCount } = useOfflineSync();

  const orderPayload = {
    tableToken: params.token,
    items: items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      selectedOptionIds: i.selectedOptionIds ?? [],
      notes: i.notes,
    })),
    paymentMethod,
    orderNotes: notes,
  };

  async function placeOrder() {
    if (items.length === 0) return;
    setPlacing(true);
    setError("");

    // Offline — queue for later and optimistically clear cart
    if (!isOnline) {
      await enqueueOrder(params.token, orderPayload);
      clearCart();
      router.push(`/t/${params.token}/menu?queued=1`);
      return;
    }

    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    // Generate idempotency key so server deduplicates if request is retried
    const idempotencyKey = `${params.token}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      const res = await fetch(`${apiUrl}/api/sessions/${params.token}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as Record<string, unknown>;
        throw new Error(typeof body["message"] === "string" ? body["message"] : "Failed to place order");
      }

      const order = await res.json() as { id: string };
      clearCart();
      router.push(`/t/${params.token}/order/${order.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setPlacing(false);
    }
  }

  if (items.length === 0) {
    router.replace(`/t/${params.token}/menu`);
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <PageHeader
        title={
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary-dark"
          >
            <BackIcon />
            <span>Checkout</span>
          </button>
        }
      />

      <div className="flex-1 space-y-4 p-4">
        {/* Offline / queued banner */}
        {!isOnline && (
          <div className="rounded-2xl border border-accent/30 bg-accent-light px-4 py-3 text-sm font-semibold text-foreground">
            You&apos;re offline. Your order will be queued and sent automatically when you reconnect.
          </div>
        )}
        {pendingCount > 0 && isOnline && (
          <div className="rounded-2xl border border-secondary bg-secondary/40 px-4 py-3 text-sm text-primary-dark">
            {pendingCount} queued order{pendingCount > 1 ? "s" : ""} being submitted…
          </div>
        )}

        {/* Order summary */}
        <Card>
          <h2 className="mb-3 text-sm font-bold text-foreground">Order Summary</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}× {item.name}
                  {item.selectedOptionsLabel && (
                    <span className="block text-xs text-muted-foreground/80">{item.selectedOptionsLabel}</span>
                  )}
                </span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(item.price * item.quantity, currency, locale)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-lg text-accent">
              {formatCurrency(total, currency, locale)}
            </span>
          </div>
        </Card>

        {/* Payment method */}
        <Card>
          <h2 className="mb-3 text-sm font-bold text-foreground">Payment Method</h2>
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  paymentMethod === opt.id
                    ? "border-primary bg-secondary/40 text-primary-dark"
                    : "border-border text-foreground hover:border-primary/30"
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                {opt.label}
                {paymentMethod === opt.id && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                    <CheckIcon />
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Order notes */}
        <Card>
          <h2 className="mb-2 text-sm font-bold text-foreground">
            Order Notes <span className="font-normal text-muted-foreground">(optional)</span>
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any allergies or special requests for the kitchen…"
            rows={3}
            className="w-full resize-none rounded-xl border border-border px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </Card>

        {error && (
          <p className="rounded-2xl bg-error/10 px-4 py-3 text-sm font-medium text-error">
            {error}
          </p>
        )}
      </div>

      {/* Place order button */}
      <BottomBar className="space-y-2">
        <p dir="rtl" className="text-center font-cairo text-xs text-muted-foreground">
          تأكيد الطلب
        </p>
        <Button
          variant="accent"
          onClick={placeOrder}
          disabled={placing}
          className="w-full"
        >
          {placing
            ? "Placing Order…"
            : isOnline
              ? `Place Order · ${formatCurrency(total, currency, locale)}`
              : "Queue Order (Offline)"}
        </Button>
      </BottomBar>
    </div>
  );
}
