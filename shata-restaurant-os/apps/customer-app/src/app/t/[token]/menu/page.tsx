"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@shata/ui";
import { useCartStore } from "@/store/cart";
import { useSessionInfo } from "@/components/session-context";
import { Badge } from "@/components/ui/Badge";
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

type VisualType = "hot" | "cold" | "food";

function getVisualType(categoryName: string): VisualType {
  const name = categoryName.toLowerCase();
  if (name.includes("cold") || name.includes("ice") || name.includes("juice") || name.includes("soda")) {
    return "cold";
  }
  if (name.includes("hot") || name.includes("coffee") || name.includes("tea") || name.includes("drink")) {
    return "hot";
  }
  return "food";
}

// Warm café gradients used for generated product visuals when no imageUrl is set
const VISUAL_GRADIENTS: Record<VisualType, string> = {
  hot: "linear-gradient(135deg, #4A2E1F 0%, #B9824A 100%)",
  cold: "linear-gradient(135deg, #B9824A 0%, #EAD7C0 100%)",
  food: "linear-gradient(135deg, #2A1810 0%, #7A4F30 100%)",
};

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.84 3.15M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.81-3.866 2.84-7.5H5.357M16.5 17.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function CoffeeCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3.5c-.6 1-.2 1.6.3 2.2M12 3.5c-.6 1-.2 1.6.3 2.2" />
    </svg>
  );
}

function IcedCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14l-1.4 12.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3l-1.5 4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.5 2" d="M7 11h10M7.5 15h9" />
    </svg>
  );
}

function PlateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 10.5h11M6.5 12.5h11M7.5 14.5h9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5a6 3 0 0 1 12 0" />
    </svg>
  );
}

function CategoryIcon({ type, className }: { type: VisualType; className?: string }) {
  if (type === "hot") return <CoffeeCupIcon className={className} />;
  if (type === "cold") return <IcedCupIcon className={className} />;
  return <PlateIcon className={className} />;
}

function ProductVisual({
  imageUrl,
  visualType,
  size = "tile",
}: {
  imageUrl?: string | null;
  visualType: VisualType;
  size?: "tile" | "hero";
}) {
  if (imageUrl) {
    return <img src={imageUrl} alt="" className="h-full w-full object-cover" />;
  }
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundImage: VISUAL_GRADIENTS[visualType] }}
    >
      <CategoryIcon type={visualType} className={cn("text-white/85 drop-shadow-sm", size === "hero" ? "h-16 w-16" : "h-10 w-10")} />
    </div>
  );
}

function ProductTile({
  product,
  visualType,
  currency,
  locale,
  onAdd,
  bouncing,
}: {
  product: Product;
  visualType: VisualType;
  currency: string;
  locale: string;
  onAdd: (product: Product) => void;
  bouncing: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ProductVisual imageUrl={product.imageUrl} visualType={visualType} />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-sm font-bold leading-snug text-foreground line-clamp-1">{product.name}</p>
        {product.nameAr && (
          <p className="text-xs text-muted-foreground line-clamp-1" dir="rtl">
            {product.nameAr}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-extrabold text-accent">{formatCurrency(product.price, currency, locale)}</span>
          <motion.button
            animate={bouncing ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            whileTap={{ scale: 1.15 }}
            onClick={() => onAdd(product)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-sm transition-colors hover:bg-primary/90"
            aria-label={`Add ${product.name}`}
          >
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function MenuSkeleton() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col bg-background">
      <div className="shrink-0 space-y-3 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-36 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-11 animate-pulse rounded-2xl bg-muted" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-9 w-24 shrink-0 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-4">
        <div className="mb-3 h-44 animate-pulse rounded-3xl bg-muted" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border/60">
              <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
              <div className="space-y-2 p-3">
                <div className="h-3.5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
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
  const [search, setSearch] = useState("");
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

  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const results: { product: Product; visualType: VisualType }[] = [];
    for (const cat of categories) {
      const visualType = getVisualType(cat.name);
      for (const p of cat.products ?? []) {
        if (p.name.toLowerCase().includes(query) || (p.nameAr ?? "").toLowerCase().includes(query)) {
          results.push({ product: p, visualType });
        }
      }
    }
    return results;
  }, [categories, query, isSearching]);

  const heroEntry = useMemo(() => {
    for (const cat of categories) {
      const product = cat.products?.find((p) => p.isAvailable);
      if (product) return { product, visualType: getVisualType(cat.name) };
    }
    return null;
  }, [categories]);

  if (loading) {
    return <MenuSkeleton />;
  }

  if (fetchError) {
    return (
      <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
          <CloseIcon className="h-6 w-6" />
        </div>
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

  const activeCategoryObj = categories.find((c) => c.id === activeCategory);
  const activeProducts = activeCategoryObj?.products ?? [];
  const activeVisualType = getVisualType(activeCategoryObj?.name ?? "");
  const availableLastItems = lastOrder?.items.filter((i) => i.isAvailable) ?? [];

  return (
    <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col bg-background">
      {/* App header: greeting, table badge, cart, search, category tabs */}
      <div className="shrink-0 space-y-3 border-b border-border/60 bg-background px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">Welcome</p>
            <h1 className="truncate text-lg font-extrabold leading-tight text-primary-dark">
              {restaurantName ?? "Shata Café"}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {tableNumber && <Badge variant="outline">Table {tableNumber}</Badge>}
            <button
              onClick={() => router.push(`/t/${token}/cart`)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-primary-dark transition-all duration-200 active:scale-95"
              aria-label="Cart"
            >
              <CartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu"
            className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Clear search"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        {!isSearching && categories.length > 0 && (
          <nav className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "border border-border bg-surface text-foreground hover:border-primary/30"
                  )}
                >
                  <CategoryIcon type={getVisualType(cat.name)} className="h-4 w-4" />
                  {cat.name}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Reorder banner — compact, dismissible */}
        <AnimatePresence>
          {lastOrder && !bannerDismissed && availableLastItems.length > 0 && !isSearching && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mb-3 flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent-light px-3 py-2">
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground">
                  Reorder: {availableLastItems.slice(0, 2).map((i) => i.name).join(", ")}
                  {availableLastItems.length > 2 && ` +${availableLastItems.length - 2} more`}
                </p>
                <button
                  onClick={handleReorder}
                  disabled={reordering}
                  className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white transition-all duration-200 disabled:opacity-60"
                >
                  {reordering ? "..." : "Reorder"}
                </button>
                <button
                  onClick={() => setBannerDismissed(true)}
                  className="shrink-0 text-primary-dark/40 transition-colors hover:text-primary-dark"
                  aria-label="Dismiss"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isSearching ? (
          <section>
            <p className="mb-3 text-sm font-bold text-primary-dark">
              {searchResults.length > 0 ? `Results for "${search.trim()}"` : `No results for "${search.trim()}"`}
            </p>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-surface px-6 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60 text-primary-dark">
                  <SearchIcon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-foreground">Nothing matches that search</p>
                <p className="text-sm text-muted-foreground">Try a different name or browse categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pb-2">
                {searchResults.map(({ product, visualType }) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    visualType={visualType}
                    currency={currency}
                    locale={locale}
                    onAdd={handleAdd}
                    bouncing={bouncingIds.has(product.id)}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Hero / Recommended */}
            {heroEntry && (
              <section className="mb-4">
                <p className="mb-2 text-sm font-bold text-primary-dark">Recommended</p>
                <div className="overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-border/60">
                  <div className="relative h-40 w-full overflow-hidden">
                    <ProductVisual imageUrl={heroEntry.product.imageUrl} visualType={heroEntry.visualType} size="hero" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-dark">
                      Popular now
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-base font-extrabold text-foreground">{heroEntry.product.name}</p>
                    {heroEntry.product.nameAr && (
                      <p className="text-xs text-muted-foreground" dir="rtl">{heroEntry.product.nameAr}</p>
                    )}
                    {heroEntry.product.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{heroEntry.product.description}</p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-accent">
                        {formatCurrency(heroEntry.product.price, currency, locale)}
                      </span>
                      <motion.button
                        animate={bouncingIds.has(heroEntry.product.id) ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAdd(heroEntry.product)}
                        className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary/90"
                      >
                        Add
                      </motion.button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Product grid */}
            <section>
              {activeCategoryObj && (
                <p className="mb-2 text-sm font-bold text-primary-dark">{activeCategoryObj.name}</p>
              )}
              {categories.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-surface px-6 py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60 text-primary-dark">
                    <PlateIcon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-foreground">Menu coming soon</p>
                  <p className="text-sm text-muted-foreground">Please check back shortly.</p>
                </div>
              ) : activeProducts.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-surface px-6 py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60 text-primary-dark">
                    <CategoryIcon type={activeVisualType} className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-foreground">No items in this category yet</p>
                  <p className="text-sm text-muted-foreground">Try another category from above.</p>
                </div>
              ) : (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-3 pb-2"
                >
                  {activeProducts.map((product: Product) => (
                    <ProductTile
                      key={product.id}
                      product={product}
                      visualType={activeVisualType}
                      currency={currency}
                      locale={locale}
                      onAdd={handleAdd}
                      bouncing={bouncingIds.has(product.id)}
                    />
                  ))}
                </motion.div>
              )}
            </section>
          </>
        )}
      </div>

      <WaiterCallButton sessionToken={token} />
    </div>
  );
}
