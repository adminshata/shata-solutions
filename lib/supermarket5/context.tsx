"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { SUPERMARKET5_DEFAULTS } from "./defaults";
import type { Product, SiteConfig } from "./types";
import { cartTotals, lineSignature } from "./utils";

const SiteContext = createContext<SiteConfig | null>(null);

export function useSite(): SiteConfig {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <Supermarket5Provider>");
  return ctx;
}

function SiteProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  const value = config ?? SUPERMARKET5_DEFAULTS;
  return (
    <SiteContext.Provider value={value}>
      <CartProvider config={value}>{children}</CartProvider>
    </SiteContext.Provider>
  );
}

export const Supermarket5Provider = SiteProvider;

type CartLine = { productId: string; quantity: number };
type Cart = { lines: CartLine[] };
type CartAction =
  | { type: "hydrate"; cart: Cart }
  | { type: "add"; productId: string; quantity: number }
  | { type: "update"; signature: string; quantity: number }
  | { type: "remove"; signature: string }
  | { type: "clear" };

function cartReducer(cart: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "hydrate": return action.cart;
    case "add": {
      const sig = lineSignature(action.productId);
      const idx = cart.lines.findIndex((l) => lineSignature(l.productId) === sig);
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
        return { lines: cart.lines.filter((l) => lineSignature(l.productId) !== action.signature) };
      }
      return {
        lines: cart.lines.map((l) =>
          lineSignature(l.productId) === action.signature ? { ...l, quantity: action.quantity } : l
        ),
      };
    }
    case "remove": return { lines: cart.lines.filter((l) => lineSignature(l.productId) !== action.signature) };
    case "clear": return { lines: [] };
  }
}

const CART_KEY = "supermarket5/cart";

type CartContextValue = {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  shippingHint: string;
  resolveProduct: (id: string) => Product | null;
  add: (productId: string, quantity?: number) => void;
  update: (signature: string, quantity: number) => void;
  remove: (signature: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Supermarket5Provider>");
  return ctx;
}

function CartProvider({ children, config }: { children: ReactNode; config: SiteConfig }) {
  const [cart, dispatch] = useReducer(cartReducer, { lines: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Cart;
        if (parsed && Array.isArray(parsed.lines)) dispatch({ type: "hydrate", cart: parsed });
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* ignore */ }
  }, [cart]);

  const resolveProduct = useCallback(
    (id: string) => config.products.find((p) => p.id === id) ?? null,
    [config.products]
  );

  const totals = useMemo(() => cartTotals(cart.lines, resolveProduct), [cart.lines, resolveProduct]);

  const value: CartContextValue = useMemo(
    () => ({
      cart,
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      shippingHint: totals.shippingHint,
      resolveProduct,
      add: (productId, quantity = 1) => dispatch({ type: "add", productId, quantity }),
      update: (signature, quantity) => dispatch({ type: "update", signature, quantity }),
      remove: (signature) => dispatch({ type: "remove", signature }),
      clear: () => dispatch({ type: "clear" }),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [cart, totals, resolveProduct, drawerOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
