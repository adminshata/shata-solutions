"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface TableRow {
  id: string;
  number: string;
  label?: string | null;
  status: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  notes: string;
}

const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const PAYMENT_METHODS = ["CASH", "CARD", "INSTAPAY", "FAWRY"];

export default function ManualOrderPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [tables, setTables] = useState<TableRow[]>([]);
  const [activeCat, setActiveCat] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableId, setTableId] = useState("");
  const [payment, setPayment] = useState("CASH");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/dashboard/menu?restaurantId=${RESTAURANT_ID}`).then((r) => r.json()),
      fetch(`${API}/api/dashboard/tables?restaurantId=${RESTAURANT_ID}`).then((r) => r.json()),
    ]).then(([menuData, tablesData]) => {
      const cats = (menuData.categories ?? menuData) as Category[];
      setCategories(cats);
      if (cats.length > 0) setActiveCat(cats[0]!.id);
      setTables((tablesData.tables ?? tablesData) as TableRow[]);
    });
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) return prev.map((c) => c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { product, quantity: 1, notes: "" }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((c) => c.product.id !== productId);
      return prev.map((c) => c.product.id === productId ? { ...c, quantity: c.quantity - 1 } : c);
    });
  };

  const total = cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0);

  const submit = async () => {
    if (cart.length === 0) { setError("Add at least one item"); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/dashboard/orders/manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: RESTAURANT_ID,
          staffId: "current-staff-id",
          tableId: tableId || undefined,
          items: cart.map((c) => ({ productId: c.product.id, quantity: c.quantity, notes: c.notes || undefined })),
          notes: notes || undefined,
          paymentMethod: payment,
        }),
      });
      if (!res.ok) { setError("Failed to place order"); return; }
      router.push("/dashboard/orders");
    } finally {
      setSubmitting(false);
    }
  };

  const activeProducts = categories.find((c) => c.id === activeCat)?.products ?? [];
  const cartCount = (productId: string) => cart.find((c) => c.product.id === productId)?.quantity ?? 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-sm text-slate-500 hover:text-slate-900">← Back</button>
          <h1 className="font-bold text-slate-900">New Manual Order</h1>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — product grid */}
        <div className="flex flex-1 flex-col overflow-hidden border-r">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto border-b bg-white px-4 py-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeCat === cat.id ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 content-start sm:grid-cols-3 lg:grid-cols-4">
            {activeProducts.map((product) => {
              const qty = cartCount(product.id);
              return (
                <div
                  key={product.id}
                  className={`relative flex flex-col rounded-xl border bg-white p-3 shadow-sm cursor-pointer select-none transition-all ${
                    qty > 0 ? "border-brand ring-1 ring-brand/30" : "hover:border-slate-300"
                  }`}
                  onClick={() => addToCart(product)}
                >
                  <span className="font-semibold text-sm text-slate-800 leading-tight">{product.name}</span>
                  <span className="mt-1 text-xs text-slate-500">{product.price.toFixed(2)}</span>
                  {qty > 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFromCart(product.id); }}
                        className="h-5 w-5 rounded-full bg-slate-200 text-xs font-bold hover:bg-slate-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-brand">{qty}</span>
                    </div>
                  )}
                </div>
              );
            })}
            {activeProducts.length === 0 && (
              <p className="col-span-full text-center text-sm text-slate-400 py-12">No products in this category</p>
            )}
          </div>
        </div>

        {/* Right — order summary */}
        <div className="flex w-80 flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Order Summary</p>

            {cart.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No items added</p>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{item.product.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">{item.quantity}x</span>
                    <span className="font-semibold">{(item.product.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => setCart((p) => p.filter((c) => c.product.id !== item.product.id))}
                      className="text-xs text-slate-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <div className="border-t pt-2 flex justify-between font-bold text-sm">
                <span>Total</span>
                <span>{total.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="border-t p-4 space-y-3">
            {/* Table selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Table (optional)</label>
              <select
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                <option value="">No table</option>
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    Table {t.number}{t.label ? ` — ${t.label}` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment method */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-1.5">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayment(m)}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors ${
                      payment === m ? "border-brand bg-brand/10 text-brand" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Order notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full rounded-lg border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/40"
                placeholder="Any special instructions..."
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={submit}
              disabled={submitting || cart.length === 0}
              className="w-full rounded-xl bg-brand py-2.5 text-sm font-bold text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {submitting ? "Placing…" : `Place Order • ${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
