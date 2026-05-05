"use client";

import {
  createContext, useCallback, useContext, useEffect,
  useMemo, useReducer, useState, type ReactNode,
} from "react";
import { SUPERMARKET2_DEFAULTS } from "./defaults";
import type { Cart, CartLine, Product, SiteConfig } from "./types";
import { cartTotals } from "./utils";

/* ------------------------------------------------------------------ */
/* Site config context                                                  */
/* ------------------------------------------------------------------ */
const SiteContext = createContext<SiteConfig | null>(null);

export function useSite(): SiteConfig {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be inside <Supermarket2Provider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Cart context                                                         */
/* ------------------------------------------------------------------ */
type CartAction =
  | { type: "hydrate"; cart: Cart }
  | { type: "add"; productId: string; quantity: number }
  | { type: "update"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

function cartReducer(cart: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "hydrate": return action.cart;
    case "add": {
      const idx = cart.lines.findIndex((l) => l.productId === action.productId);
      const next: CartLine[] = [...cart.lines];
      if (idx >= 0) {
        next[idx] = { ...next[idx], quantity: next[idx].quantity + action.quantity };
      } else {
        next.push({ productId: action.productId, quantity: action.quantity });
      }
      return { lines: next };
    }
    case "update": {
      if (action.quantity <= 0) {
        return { lines: cart.lines.filter((l) => l.productId !== action.productId) };
      }
      return { lines: cart.lines.map((l) => l.productId === action.productId ? { ...l, quantity: action.quantity } : l) };
    }
    case "remove": return { lines: cart.lines.filter((l) => l.productId !== action.productId) };
    case "clear": return { lines: [] };
  }
}

type CartContextValue = {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  shippingHint: string;
  resolveProduct: (id: string) => Product | null;
  add: (productId: string, quantity?: number) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside <Supermarket2Provider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Combined provider                                                    */
/* ------------------------------------------------------------------ */
export function Supermarket2Provider({
  children,
  config,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  const value = config ?? SUPERMARKET2_DEFAULTS;
  return (
    <SiteContext.Provider value={value}>
      <CartProvider config={value}>{children}</CartProvider>
    </SiteContext.Provider>
  );
}

function CartProvider({ children, config }: { children: ReactNode; config: SiteConfig }) {
  const [cart, dispatch] = useReducer(cartReducer, { lines: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const storageKey = "supermarket2/cart/" + config.name;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Cart;
      if (parsed && Array.isArray(parsed.lines)) dispatch({ type: "hydrate", cart: parsed });
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* ignore */ }
  }, [cart, storageKey]);

  const resolveProduct = useCallback(
    (id: string) => config.products.find((p) => p.id === id) ?? null,
    [config.products]
  );

  const totals = useMemo(() => cartTotals(cart.lines, resolveProduct), [cart.lines, resolveProduct]);

  const value: CartContextValue = useMemo(() => ({
    cart,
    itemCount: totals.itemCount,
    subtotal: totals.subtotal,
    shippingHint: totals.shippingHint,
    resolveProduct,
    add: (productId, quantity = 1) => dispatch({ type: "add", productId, quantity }),
    update: (productId, quantity) => dispatch({ type: "update", productId, quantity }),
    remove: (productId) => dispatch({ type: "remove", productId }),
    clear: () => dispatch({ type: "clear" }),
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  }), [cart, totals, resolveProduct, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
