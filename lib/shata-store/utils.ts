import type { CartLine, Money, Product, StoreConfig, StoreTheme } from "./types";

/** Format integer cents as a localized currency string. */
export function formatPrice(cents: Money, locale = "en-US", currency = "USD"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** Get a product by handle (slug) or id. */
export function findProduct(config: StoreConfig, key: string): Product | null {
  return config.products.find((p) => p.handle === key || p.id === key) ?? null;
}

export function findCategory(config: StoreConfig, handle: string) {
  return config.categories.find((c) => c.handle === handle) ?? null;
}

/** True if the product should be shown to customers (active by default). */
export function isVisible(p: Product): boolean {
  return p.active !== false;
}

export function productsInCategory(config: StoreConfig, categoryHandle: string): Product[] {
  return config.products.filter((p) => p.category === categoryHandle && isVisible(p));
}

export function featuredProducts(config: StoreConfig, limit = 8): Product[] {
  const explicit = config.sections.featuredProducts.productHandles ?? [];
  if (explicit.length > 0) {
    const ordered = explicit
      .map((h) => config.products.find((p) => p.handle === h))
      .filter((p): p is Product => !!p && isVisible(p));
    return limit ? ordered.slice(0, limit) : ordered;
  }
  return config.products.filter((p) => p.featured && isVisible(p)).slice(0, limit);
}

export function discountPercent(p: Product): number | null {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return null;
  return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
}

/* ------------------------------- Cart ---------------------------------- */

export function lineSignature(productId: string, options?: Record<string, string>): string {
  if (!options || Object.keys(options).length === 0) return productId;
  const sorted = Object.keys(options)
    .sort()
    .map((k) => `${k}=${options[k]}`)
    .join("|");
  return `${productId}::${sorted}`;
}

export function lineSubtotal(line: CartLine, product: Product): Money {
  return product.price * line.quantity;
}

export function cartTotals(
  lines: CartLine[],
  resolveProduct: (id: string) => Product | null
): { itemCount: number; subtotal: Money; shippingHint: string } {
  let itemCount = 0;
  let subtotal = 0;
  for (const line of lines) {
    const p = resolveProduct(line.productId);
    if (!p) continue;
    itemCount += line.quantity;
    subtotal += lineSubtotal(line, p);
  }
  return {
    itemCount,
    subtotal,
    shippingHint: subtotal === 0
      ? "Free shipping on orders over $75"
      : subtotal >= 7500
      ? "Eligible for free shipping"
      : `Add ${formatPrice(7500 - subtotal)} for free shipping`,
  };
}

/* ------------------------------ Theme ---------------------------------- */

const RADIUS_PX: Record<StoreTheme["radius"], string> = {
  sm: "8px",
  md: "14px",
  lg: "22px",
};

/** CSS variable map applied at the storefront wrapper.
 * Components consume them via Tailwind arbitrary values: bg-[var(--store-primary)] etc. */
export function themeVars(theme: StoreTheme): Record<string, string> {
  return {
    "--store-primary": theme.primary,
    "--store-primary-fg": theme.primaryFg,
    "--store-accent": theme.accent,
    "--store-bg": theme.background,
    "--store-fg": theme.foreground,
    "--store-muted": theme.muted,
    "--store-surface": theme.surface,
    "--store-border": theme.border,
    "--store-radius": RADIUS_PX[theme.radius],
  };
}

/* ----------------------------- Misc ------------------------------------ */

export function classes(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export function pluralize(n: number, singular: string, plural?: string) {
  return `${n} ${n === 1 ? singular : plural ?? singular + "s"}`;
}
