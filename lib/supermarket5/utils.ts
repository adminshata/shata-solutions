import type { StoreTheme } from "./types";
import type { CSSProperties } from "react";

const RADIUS: Record<string, string> = { sm: "4px", md: "8px", lg: "14px" };

export function themeVars(t: StoreTheme): CSSProperties {
  return {
    "--sm-primary": t.primary,
    "--sm-primary-fg": t.primaryFg,
    "--sm-accent": t.accent,
    "--sm-bg": t.background,
    "--sm-fg": t.foreground,
    "--sm-muted": t.muted,
    "--sm-surface": t.surface,
    "--sm-border": t.border,
    "--sm-radius": RADIUS[t.radius],
    "--color-primary": t.primary,
  } as CSSProperties;
}

export function formatPrice(cents: number): string {
  return "$" + (cents / 100).toFixed(2);
}

export function makeHandle(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function activeProducts(config: import("./types").SiteConfig) {
  return config.products.filter(p => p.active !== false);
}

export function activeCategories(config: import("./types").SiteConfig) {
  return config.categories.filter(c => c.active !== false);
}

export function findProduct(config: import("./types").SiteConfig, handle: string) {
  return config.products.find(p => p.handle === handle) ?? null;
}

export function findCategory(config: import("./types").SiteConfig, handle: string) {
  return config.categories.find(c => c.handle === handle) ?? null;
}

export function productsByCategory(config: import("./types").SiteConfig, category: string) {
  return activeProducts(config).filter(p => p.category === category);
}

export function lineSignature(productId: string): string {
  return productId;
}

export function cartTotals(
  lines: { productId: string; quantity: number }[],
  resolveProduct: (id: string) => import("./types").Product | null
): { itemCount: number; subtotal: number; shippingHint: string } {
  let itemCount = 0;
  let subtotal = 0;
  for (const line of lines) {
    const p = resolveProduct(line.productId);
    if (!p) continue;
    itemCount += line.quantity;
    subtotal += p.price * line.quantity;
  }
  return {
    itemCount,
    subtotal,
    shippingHint:
      subtotal === 0
        ? "Free delivery on orders over $50"
        : subtotal >= 5000
        ? "Eligible for free delivery"
        : `Add ${formatPrice(5000 - subtotal)} for free delivery`,
  };
}
