"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

interface UpsellProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  currency: string;
}

interface Props {
  sessionToken: string;
  cartProductIds: string[];
  currency: string;
  onAddProduct: (productId: string, name: string, price: number) => void;
}

export function UpsellSection({ sessionToken, cartProductIds, currency, onAddProduct }: Props) {
  const [suggestions, setSuggestions] = useState<UpsellProduct[]>([]);

  useEffect(() => {
    if (cartProductIds.length === 0) return;
    // Fetch upsells for the first cart item
    const pid = cartProductIds[0];
    if (!pid) return;
    fetch(`${API}/api/v1/sessions/${sessionToken}/upsell/${pid}`)
      .then(r => r.ok ? r.json() : [])
      .then((items: UpsellProduct[]) => setSuggestions(items.map(i => ({ ...i, currency }))))
      .catch(() => {});
  }, [sessionToken, cartProductIds, currency]);

  if (suggestions.length === 0) return null;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-700">Customers also ordered</p>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {suggestions.map(p => (
          <div key={p.productId} className="flex min-w-[140px] flex-col rounded-xl border bg-slate-50 p-3">
            {p.imageUrl && (
              <img src={p.imageUrl} alt={p.name} className="mb-2 h-16 w-full rounded-lg object-cover" />
            )}
            <p className="text-xs font-semibold text-slate-900 line-clamp-2">{p.name}</p>
            <p className="mt-1 text-xs font-bold text-brand">{p.price.toFixed(2)} {currency}</p>
            <button
              onClick={() => onAddProduct(p.productId, p.name, p.price)}
              className="mt-2 rounded-lg bg-brand/10 py-1 text-xs font-bold text-brand hover:bg-brand/20 transition-colors"
            >
              Add +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
