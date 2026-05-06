import type { Cart, CartLine, Money, Product, SiteConfig, StoreTheme } from "./types";

export function formatPrice(cents: Money, locale = "en-US", currency = "USD"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function makeHandle(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function activeProducts(config: SiteConfig): Product[] {
  return config.products.filter((p) => p.active !== false);
}

export function activeCategories(config: SiteConfig): Category[] {
  return config.categories.filter((c) => c.active !== false);
}

import type { Category } from "./types";

export function findProduct(config: SiteConfig, key: string): Product | null {
  return config.products.find((p) => p.handle === key || p.id === key) ?? null;
}

export function findCategory(config: SiteConfig, handle: string): Category | null {
  return config.categories.find((c) => c.handle === handle) ?? null;
}

export function productsByCategory(config: SiteConfig, categoryHandle: string): Product[] {
  return config.products.filter((p) => p.category === categoryHandle && p.active !== false);
}

export function discountPercent(p: Product): number | null {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return null;
  return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
}

/* Cart */
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
    shippingHint:
      subtotal === 0
        ? "Free delivery on orders over $75"
        : subtotal >= 7500
        ? "Eligible for free delivery"
        : `Add ${formatPrice(7500 - subtotal)} for free delivery`,
  };
}

/* Theme */
const RADIUS_PX: Record<StoreTheme["radius"], string> = { sm: "4px", md: "8px", lg: "14px" };

export function themeVars(theme: StoreTheme): Record<string, string> {
  return {
    "--sm-primary": theme.primary,
    "--color-primary": theme.primary,
    "--sm-primary-fg": theme.primaryFg,
    "--sm-accent": theme.accent,
    "--sm-bg": theme.background,
    "--sm-fg": theme.foreground,
    "--sm-muted": theme.muted,
    "--sm-surface": theme.surface,
    "--sm-border": theme.border,
    "--sm-radius": RADIUS_PX[theme.radius],
  };
}

export function lineSignature(productId: string): string {
  return productId;
}

export function classes(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
