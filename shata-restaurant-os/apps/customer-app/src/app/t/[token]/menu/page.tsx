"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@shata/ui";
import { useCartStore } from "@/store/cart";
import { useSessionInfo } from "@/components/session-context";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
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

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.84 3.15M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.81-3.866 2.84-7.5H5.357M16.5 17.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

function ProductImagePlaceholder() {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-secondary/50">
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-primary-dark/40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h13.5v6a4.5 4.5 0 0 1-4.5 4.5H7.5A4.5 4.5 0 0 1 3 13.5v-6Zm13.5 1.5h2.25a2.25 2.25 0 0 1 0 4.5H16.5M7.5 3v1.5M11.25 3v1.5M15 3v1.5" />
      </svg>
    </div>
  );
}

function MenuSkeleton() {
  return (
    <div className="flex h-screen flex-col">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <div className="h-5 w-32 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="h-9 bg-secondary/40" />
      <div className="flex gap-2 px-4 py-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-muted" />
        ))}
      </div>
      <div className="flex-1 space-y-3 px-4 pt-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm">
            <div className="h-16 w-16 animate-pulse rounded-xl bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
  const { addItem, currency, locale, items } = useCartStore();
  const { restaurantName, tableNumber } = useSessionInfo();
  const itemCount = items.reduce((a, i) => a + i.quantity, 0);

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
    return <MenuSkeleton />;
  }

  if (fetchError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-2xl">⚠️</p>
        <p className="font-semibold text-error">Menu failed to load</p>
        <p className="text-xs text-muted-foreground font-mono break-all">{fetchError}</p>
        <button
          onClick={() => { setFetchError(null); setLoading(true); }}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all duration-200"
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
      {/* Sticky header */}
      <PageHeader
        title={restaurantName ?? "Shata Café"}
        badge={
          tableNumber && (
            <Badge variant="outline">
              Table {tableNumber}
            </Badge>
          )
        }
        right={
          <button
            onClick={() => router.push(`/t/${token}/cart`)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-primary-dark transition-all duration-200 active:scale-95"
            aria-label="Cart"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-foreground">
                {itemCount}
              </span>
            )}
          </button>
        }
      />

      {/* Hero banner — warm café-style gradient */}
      <div
        className="mx-4 mt-3 rounded-2xl px-4 py-3 text-center text-xs font-semibold text-white shadow-[0_8px_20px_-8px_rgba(74,46,31,0.35)]"
        style={{ backgroundImage: "linear-gradient(135deg, #4A2E1F 0%, #B9824A 100%)" }}
      >
        Fresh, made-to-order — browse the menu and tap to add.
      </div>

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
            <div className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-2xl border border-accent/30 bg-accent-light px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground">Last order</p>
                <p className="mt-0.5 truncate text-sm text-foreground">
                  {availableLastItems.slice(0, 3).map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                  {availableLastItems.length > 3 && ` +${availableLastItems.length - 3} more`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={handleReorder}
                  disabled={reordering}
                  className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition-all duration-200 disabled:opacity-60"
                >
                  {reordering ? "Adding..." : "Reorder"}
                </button>
                <button
                  onClick={() => setBannerDismissed(true)}
                  className="text-primary-dark/50 hover:text-primary-dark transition-colors text-lg leading-none"
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
      {categories.length > 0 && (
        <nav className="flex gap-2 overflow-x-auto px-4 py-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "border border-border bg-surface text-foreground hover:border-primary/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      )}

      {/* Products */}
      <div className="flex-1 overflow-y-auto px-4 pt-1">
        {categories.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-2xl">🍽️</p>
            <p className="font-semibold text-foreground">Menu coming soon</p>
            <p className="text-sm text-muted-foreground">Please check back shortly.</p>
          </div>
        ) : activeProducts.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-2xl">🍴</p>
            <p className="font-semibold text-foreground">No items in this category yet</p>
            <p className="text-sm text-muted-foreground">Try another category from above.</p>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-3 pb-4 sm:grid-cols-2"
          >
            {activeProducts.map((product: Product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm transition-all duration-200"
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <ProductImagePlaceholder />
                )}
                <div className="flex flex-1 flex-col">
                  <p className="font-bold leading-snug text-foreground">{product.name}</p>
                  {product.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-accent">
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
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow transition-all duration-200 hover:bg-primary/90"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <WaiterCallButton sessionToken={token} />
    </div>
  );
}
