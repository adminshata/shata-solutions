"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@shata/ui";

type PaymentMethod = "CARD" | "CASH" | "APPLE_PAY" | "GOOGLE_PAY";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "CARD", label: "Credit / Debit Card", icon: "💳" },
  { id: "CASH", label: "Pay at Counter", icon: "💵" },
  { id: "APPLE_PAY", label: "Apple Pay", icon: "🍎" },
  { id: "GOOGLE_PAY", label: "Google Pay", icon: "G" },
];

export default function CheckoutPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { items, total, currency, locale, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  async function placeOrder() {
    if (items.length === 0) return;
    setPlacing(true);
    setError("");

    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    try {
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableToken: params.token,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            selectedOptionIds: i.selectedOptionIds ?? [],
            notes: i.notes,
          })),
          paymentMethod,
          orderNotes: notes,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Failed to place order");
      }

      const order = await res.json();
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white border-b px-4">
        <button
          onClick={() => router.back()}
          className="text-sm font-semibold text-brand"
        >
          ← Cart
        </button>
        <h1 className="font-bold text-slate-900">Checkout</h1>
        <div className="w-16" />
      </header>

      <div className="flex-1 p-4 space-y-4">
        {/* Order summary */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-slate-700">Order Summary</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-slate-700">
                  {item.quantity}× {item.name}
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(item.price * item.quantity, currency, locale)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t pt-3 font-bold">
            <span className="text-slate-900">Total</span>
            <span className="text-brand text-lg">
              {formatCurrency(total, currency, locale)}
            </span>
          </div>
        </div>

        {/* Payment method */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-slate-700">Payment Method</h2>
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  paymentMethod === opt.id
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                {opt.label}
                {paymentMethod === opt.id && (
                  <span className="ml-auto text-brand">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Order notes */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-bold text-slate-700">
            Order Notes <span className="font-normal text-slate-400">(optional)</span>
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any allergies or special requests for the kitchen…"
            rows={3}
            className="w-full resize-none rounded-xl border px-3 py-2 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
      </div>

      {/* Place order button */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <button
          onClick={placeOrder}
          disabled={placing}
          className="w-full rounded-2xl bg-brand py-3.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60 transition-colors"
        >
          {placing ? "Placing Order…" : `Place Order · ${formatCurrency(total, currency, locale)}`}
        </button>
      </div>
    </div>
  );
}
