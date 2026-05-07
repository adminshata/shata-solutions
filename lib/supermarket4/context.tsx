"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SUPERMARKET4_DEFAULTS } from "./defaults";
import type { CartItem, CompareItem, SiteConfig, StoreProduct, WishlistItem } from "./types";
import { cartTotals, lineSignature } from "./utils";

type CartLine = { productId: string; quantity: number };

interface SiteContextValue extends SiteConfig {}

const SiteContext = createContext<SiteContextValue | undefined>(undefined);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within Supermarket4Provider");
  return ctx;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  isCartLoaded: boolean;
  cart: { lines: CartLine[] };
  add: (productId: string, quantity?: number) => void;
  update: (signature: string, quantity: number) => void;
  remove: (signature: string) => void;
  itemCount: number;
  subtotal: number;
  shippingHint: string;
  resolveProduct: (productId: string) => StoreProduct | null;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

function CartProvider({ children, config }: { children: ReactNode; config: SiteConfig }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sm4_cart");
      if (stored) setCartItems(JSON.parse(stored) as CartItem[]);
    } catch {
      localStorage.removeItem("sm4_cart");
    }
    try {
      const storedLines = localStorage.getItem("sm4_cart_lines");
      if (storedLines) setLines(JSON.parse(storedLines) as CartLine[]);
    } catch {
      localStorage.removeItem("sm4_cart_lines");
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) localStorage.setItem("sm4_cart", JSON.stringify(cartItems));
  }, [cartItems, isCartLoaded]);

  useEffect(() => {
    if (isCartLoaded) localStorage.setItem("sm4_cart_lines", JSON.stringify(lines));
  }, [lines, isCartLoaded]);

  const resolveProduct = (productId: string) =>
    config.products.find((product) => product.id === productId) ?? null;

  const totals = useMemo(
    () => cartTotals(lines, resolveProduct),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, config.products]
  );

  const addToCart = (item: CartItem) =>
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.active);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.active
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });

  const addToWishlist = (item: CartItem) =>
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && !i.active);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && !i.active
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });

  const removeFromCart = (id: number) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateItemQuantity = (id: number, quantity: number) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );

  const add = (productId: string, quantity = 1) =>
    setLines((prev) => {
      const sig = lineSignature(productId);
      const existing = prev.find((line) => lineSignature(line.productId) === sig);
      if (existing) {
        return prev.map((line) =>
          lineSignature(line.productId) === sig
            ? { ...line, quantity: line.quantity + quantity }
            : line
        );
      }
      return [...prev, { productId, quantity }];
    });

  const update = (signature: string, quantity: number) =>
    setLines((prev) =>
      prev.map((line) =>
        lineSignature(line.productId) === signature
          ? { ...line, quantity: Math.max(1, quantity) }
          : line
      )
    );

  const remove = (signature: string) =>
    setLines((prev) => prev.filter((line) => lineSignature(line.productId) !== signature));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToWishlist,
        removeFromCart,
        updateItemQuantity,
        isCartLoaded,
        cart: { lines },
        add,
        update,
        remove,
        ...totals,
        resolveProduct,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

interface WishlistContextProps {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  isWishlistLoaded: boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const useWishlist = (): WishlistContextProps => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};

function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sm4_wishlist");
      if (stored) setWishlistItems(JSON.parse(stored) as WishlistItem[]);
    } catch {
      localStorage.removeItem("sm4_wishlist");
    }
    setIsWishlistLoaded(true);
  }, []);

  useEffect(() => {
    if (isWishlistLoaded) localStorage.setItem("sm4_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems, isWishlistLoaded]);

  const addToWishlist = (item: WishlistItem) =>
    setWishlistItems((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));

  const removeFromWishlist = (id: number) =>
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));

  const updateItemQuantity = (id: number, quantity: number) =>
    setWishlistItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, updateItemQuantity, isWishlistLoaded }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

interface CompareContextProps {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (name: string) => void;
}

export const CompareContext = createContext<CompareContextProps>({
  compareItems: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
});

function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sm4_compare");
      if (stored) setCompareItems(JSON.parse(stored) as CompareItem[]);
    } catch {
      localStorage.removeItem("sm4_compare");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sm4_compare", JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (item: CompareItem) =>
    setCompareItems((prev) => (prev.some((i) => i.name === item.name) ? prev : [...prev, item]));

  const removeFromCompare = (name: string) =>
    setCompareItems((prev) => prev.filter((i) => i.name !== name));

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);

export function Supermarket4Provider({
  children,
  config = SUPERMARKET4_DEFAULTS,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  return (
    <SiteContext.Provider value={config}>
      <CartProvider config={config}>
        <WishlistProvider>
          <CompareProvider>{children}</CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </SiteContext.Provider>
  );
}
