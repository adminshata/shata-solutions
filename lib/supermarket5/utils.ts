export const SM5_BASE = "/templates/supermarket-5/preview";
export const SM5_ASSETS = "/templates/supermarket5";
import type { CSSProperties } from "react";
import type { SiteConfig, StoreProduct, StoreTheme } from "./types";

const RADIUS: Record<StoreTheme["radius"], string> = { sm: "4px", md: "8px", lg: "14px" };

export function sm5Img(path: string): string {
  return `${SM5_ASSETS}/${path}`;
}

export function sm5Link(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${SM5_BASE}${path}`;
}

export function themeVars(t: StoreTheme): CSSProperties {
  return {
    "--sm5-primary": t.primary,
    "--sm5-primary-fg": t.primaryFg,
    "--sm5-secondary": t.secondary,
    "--sm5-accent": t.accent,
    "--sm5-bg": t.background,
    "--sm5-fg": t.foreground,
    "--sm5-muted": t.muted,
    "--sm5-surface": t.surface,
    "--sm5-border": t.border,
    "--sm5-radius": RADIUS[t.radius],
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
