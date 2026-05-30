"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@shata/ui";

export default function CartPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { items, total, currency, locale, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-slate-400 px-6">
        <p className="text-xl font-bold text-slate-700">Your cart is empty</p>
        <button
          onClick={() => router.push(`/t/${params.token}/menu`)}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white border-b px-4">
        <button
          onClick={() => router.back()}
          className="text-sm font-semibold text-brand"
        >
          ← Menu
        </button>
        <h1 className="font-bold text-slate-900">Your Order</h1>
        <div className="w-16" />
      </header>

      {/* Items */}
      <div className="flex-1 p-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate">{item.name}</p>
              <p className="text-sm text-brand font-bold">
                {formatCurrency(item.price, currency, locale)}
              </p>
              {item.notes && (
                <p className="text-xs text-slate-400 italic">"{item.notes}"</p>
              )}
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200"
              >
                −
              </button>
              <span className="w-5 text-center font-bold text-slate-900">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.productId)}
              className="ml-1 text-slate-300 hover:text-red-500 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-slate-600">Total</span>
          <span className="font-black text-slate-900 text-lg">
            {formatCurrency(total, currency, locale)}
          </span>
        </div>
        <button
          onClick={() => router.push(`/t/${params.token}/checkout`)}
          className="w-full rounded-2xl bg-brand py-3.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
