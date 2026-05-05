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
import { SHATA_STORE_DEFAULTS } from "./defaults";
import type { Cart, CartLine, Product, StoreConfig } from "./types";
import { cartTotals, lineSignature } from "./utils";

/* ------------------------------------------------------------------ */
/* Store config — read-only at runtime                                 */
/* ------------------------------------------------------------------ */

const StoreContext = createContext<StoreConfig | null>(null);

export function useStore(): StoreConfig {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export function StoreProvider({
  children,
  config,
}: {
  children: ReactNode;
  /** Optional override. Defaults to SHATA_STORE_DEFAULTS. */
  config?: StoreConfig;
}) {
  const value = config ?? SHATA_STORE_DEFAULTS;
  return (
    <StoreContext.Provider value={value}>
      <CartProvider config={value}>{children}</CartProvider>
    </StoreContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */

type CartAction =
  | { type: "hydrate"; cart: Cart }
  | { type: "add"; productId: string; options?: Record<string, string>; quantity: number }
  | { type: "update"; signature: string; quantity: number }
  | { type: "remove"; signature: string }
  | { type: "clear" };

function cartReducer(cart: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "hydrate":
      return action.cart;

    case "add": {
      const sig = lineSignature(action.productId, action.options);
      const existingIdx = cart.lines.findIndex(
        (l) => lineSignature(l.productId, l.options) === sig
      );
      const next: CartLine[] = [...cart.lines];
      if (existingIdx >= 0) {
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + action.quantity,
        };
      } else {
        next.push({
          productId: action.productId,
          options: action.options,
          quantity: action.quantity,
        });
      }
      return { lines: next };
    }

    case "update": {
      if (action.quantity <= 0) {
        return {
          lines: cart.lines.filter(
            (l) => lineSignature(l.productId, l.options) !== action.signature
          ),
        };
      }
      return {
        lines: cart.lines.map((l) =>
          lineSignature(l.productId, l.options) === action.signature
            ? { ...l, quantity: action.quantity }
            : l
        ),
      };
    }

    case "remove":
      return {
        lines: cart.lines.filter(
          (l) => lineSignature(l.productId, l.options) !== action.signature
        ),
      };

    case "clear":
      return { lines: [] };
  }
}

const CART_STORAGE_KEY_PREFIX = "shata-store/cart";

type CartContextValue = {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  shippingHint: string;
  resolveProduct: (id: string) => Product | null;
  add: (productId: string, options?: Record<string, string>, quantity?: number) => void;
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
  if (!ctx) throw new Error("useCart must be used inside <StoreProvider>");
  return ctx;
}

function CartProvider({ children, config }: { children: ReactNode; config: StoreConfig }) {
  const [cart, dispatch] = useReducer(cartReducer, { lines: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const storageKey = `${CART_STORAGE_KEY_PREFIX}/${config.slug}`;

  // Hydrate from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Cart;
      if (parsed && Array.isArray(parsed.lines)) {
        dispatch({ type: "hydrate", cart: parsed });
      }
    } catch {
      /* ignore corrupt cart */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      /* quota / SSR — ignore */
    }
  }, [cart, storageKey]);

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
      add: (productId, options, quantity = 1) =>
        dispatch({ type: "add", productId, options, quantity }),
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
