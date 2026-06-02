"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@shata/ui";
import { useCartStore } from "@/store/cart";
import { WaiterCallButton } from "@/components/waiter-call-button";
import type { Category, Product } from "@shata/types";

interface LastOrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  isAvailable: boolean;
}

interface LastOrder {
  id: string;
  orderNumber: number;
  total: number;
  currency: string;
  items: LastOrderItem[];
}

export default function MenuPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [bouncingIds, setBouncingIds] = useState<Set<string>>(new Set());
  const { addItem, currency, locale } = useCartStore();

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    Promise.all([
      fetch(`${apiUrl}/api/sessions/${token}/menu`).then((r) => {
        if (!r.ok) throw new Error(`Menu API ${r.status}: ${r.url}`);
        return r.json();
      }),
      fetch(`${apiUrl}/api/sessions/${token}/last-order`).then((r) =>
        r.status === 200 ? r.json() : null
      ).catch(() => null),
    ])
      .then(([menuData, lastOrderData]: [unknown, LastOrder | null]) => {
        // Guard: API must return an array of categories
        const cats = Array.isArray(menuData) ? (menuData as Category[]) : [];
        if (!Array.isArray(menuData)) {
          console.error("Menu API returned non-array:", menuData);
          setFetchError(`Menu data format unexpected. API URL: ${apiUrl}`);
        }
        setCategories(cats);
        if (cats.length > 0 && cats[0]) setActiveCategory(cats[0].id);
        if (lastOrderData) setLastOrder(lastOrderData);
      })
      .catch((err: Error) => {
        console.error("Menu fetch failed:", err);
        setFetchError(err.message ?? "Failed to load menu. Check NEXT_PUBLIC_API_URL.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleReorder() {
    if (!lastOrder) return;
    setReordering(true);
    try {
      const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
      const res = await fetch(
        `${apiUrl}/api/sessions/${token}/reorder/${lastOrder.id}`,
        { method: "POST" }
      );
      if (res.ok) {
        const order = await res.json() as { id: string };
        router.push(`/t/${token}/order/${order.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReordering(false);
    }
  }

  function handleAdd(product: Product) {
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    setBouncingIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setBouncingIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 300);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-2xl">⚠️</p>
        <p className="font-semibold text-red-600">Menu failed to load</p>
        <p className="text-xs text-muted-foreground font-mono break-all">{fetchError}</p>
        <button
          onClick={() => { setFetchError(null); setLoading(true); }}
          className="rounded-xl bg-brand px-6 py-2 text-sm font-bold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const activeProducts = categories.find((c) => c.id === activeCategory)?.products ?? [];
  const availableLastItems = lastOrder?.items.filter((i) => i.isAvailable) ?? [];

  return (
    <div className="flex h-screen flex-col">
      {/* Reorder banner */}
      <AnimatePresence>
        {lastOrder && !bannerDismissed && availableLastItems.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-2xl bg-brand/8 border border-brand/20 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-brand">Last order</p>
                <p className="mt-0.5 truncate text-sm text-foreground">
                  {availableLastItems.slice(0, 3).map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                  {availableLastItems.length > 3 && ` +${availableLastItems.length - 3} more`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={handleReorder}
                  disabled={reordering}
                  className="rounded-xl bg-brand px-3.5 py-1.5 text-xs font-bold text-white disabled:opacity-60"
                >
                  {reordering ? "Adding..." : "Reorder"}
                </button>
                <button
                  onClick={() => setBannerDismissed(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category nav */}
      <nav className="sticky top-0 z-20 flex gap-2 overflow-x-auto bg-background/95 px-4 py-3 shadow-sm backdrop-blur-sm">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeCategory === cat.id
                ? "bg-brand text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {/* Products */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {activeProducts.map((product: Product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              )}
              <div className="flex flex-1 flex-col">
                <p className="font-semibold leading-snug">{product.name}</p>
                {product.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-brand">
                    {formatCurrency(product.price, currency, locale)}
                  </span>
                  <motion.button
                    animate={
                      bouncingIds.has(product.id)
                        ? { scale: [1, 1.15, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    whileTap={{ scale: 1.15 }}
                    onClick={() => handleAdd(product)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-xl font-bold shadow hover:bg-brand-dark transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <WaiterCallButton sessionToken={token} />
    </div>
  );
}
