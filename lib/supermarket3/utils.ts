export const SM2_BASE = "/templates/supermarket-3/preview";
export const SM2_ASSETS = "/templates/supermarket3";
import type { CSSProperties } from "react";
import type { SiteConfig, StoreProduct, StoreTheme } from "./types";

const RADIUS: Record<StoreTheme["radius"], string> = { sm: "4px", md: "8px", lg: "14px" };

export function sm3Img(path: string): string {
  return `${SM2_ASSETS}/${path}`;
}

export function sm3Link(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${SM2_BASE}${path}`;
}

export function themeVars(t: StoreTheme): CSSProperties {
  return {
    "--sm3-primary": t.primary,
    "--sm3-primary-fg": t.primaryFg,
    "--sm3-secondary": t.secondary,
    "--sm3-accent": t.accent,
    "--sm3-bg": t.background,
    "--sm3-fg": t.foreground,
    "--sm3-muted": t.muted,
    "--sm3-surface": t.surface,
    "--sm3-border": t.border,
    "--sm3-radius": RADIUS[t.radius],
    "--color-primary": t.primary,
  } as CSSProperties;
}

export function formatPrice(cents: number): string {
  return "$" + (cents / 100).toFixed(2);
}

export function activeProducts(config: SiteConfig): StoreProduct[] {
  return config.products.filter((p) => p.active !== false);
}

export function activeCategories(config: SiteConfig) {
  return config.categories.filter((c) => c.active !== false);
}

export function findProduct(config: SiteConfig, handle: string): StoreProduct | null {
  return config.products.find((p) => p.handle === handle) ?? null;
}

export function lineSignature(productId: string): string {
  return productId;
}

export function cartTotals(
  lines: { productId: string; quantity: number }[],
  resolveProduct: (id: string) => StoreProduct | null
): { itemCount: number; subtotal: number; shippingHint: string } {
  let itemCount = 0;
  let subtotal = 0;
  for (const line of lines) {
    const product = resolveProduct(line.productId);
    if (!product) continue;
    itemCount += line.quantity;
    subtotal += product.price * line.quantity;
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
