export const SM4_BASE = "/templates/supermarket-4/preview";
export const SM4_ASSETS = "/templates/supermarket4";
import type { CSSProperties } from "react";
import type { SiteConfig, StoreProduct, StoreTheme } from "./types";

const RADIUS: Record<StoreTheme["radius"], string> = { sm: "4px", md: "8px", lg: "14px" };

export function sm4Img(path: string): string {
  return `${SM4_ASSETS}/${path}`;
}

export function sm4Link(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${SM4_BASE}${path}`;
}

export function themeVars(t: StoreTheme): CSSProperties {
  return {
    "--sm4-primary": t.primary,
    "--sm4-primary-fg": t.primaryFg,
    "--sm4-secondary": t.secondary,
    "--sm4-accent": t.accent,
    "--sm4-bg": t.background,
    "--sm4-fg": t.foreground,
    "--sm4-muted": t.muted,
    "--sm4-surface": t.surface,
    "--sm4-border": t.border,
    "--sm4-radius": RADIUS[t.radius],
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
