"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { SUPERMARKET1_DEFAULTS, SUPERMARKET1_STORAGE_KEY } from "./defaults";
import type { SiteConfig } from "./types";
import { themeVars } from "./utils";

/* ─────────────────────────── SITE CONFIG ──────────────────────────── */

interface Supermarket1ConfigContextProps {
  config: SiteConfig;
  hasDraft: boolean;
}

const Supermarket1ConfigContext = createContext<Supermarket1ConfigContextProps>({
  config: SUPERMARKET1_DEFAULTS,
  hasDraft: false,
});

export function useSupermarket1Config() {
  return useContext(Supermarket1ConfigContext);
}

function Supermarket1ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(SUPERMARKET1_DEFAULTS);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SUPERMARKET1_STORAGE_KEY);
      if (raw) {
        setConfig(JSON.parse(raw) as SiteConfig);
        setHasDraft(true);
      }
    } catch {
      setConfig(SUPERMARKET1_DEFAULTS);
      setHasDraft(false);
    }
  }, []);

  useEffect(() => {
    if (!hasDraft) return;
    const vars = themeVars(config.theme);
    for (const [key, value] of Object.entries(vars)) {
      if (key.startsWith("--") && typeof value === "string") {
        document.documentElement.style.setProperty(key, value);
      }
    }
  }, [config.theme, hasDraft]);

  return (
    <Supermarket1ConfigContext.Provider value={{ config, hasDraft }}>
      {children}
    </Supermarket1ConfigContext.Provider>
  );
}

/* ─────────────────────────────── CART ──────────────────────────────── */

interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  active: boolean;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  addToWishlistViaCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  isCartLoaded: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sm1_cart");
    if (stored) {
      try { setCartItems(JSON.parse(stored)); } catch { localStorage.removeItem("sm1_cart"); }
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) localStorage.setItem("sm1_cart", JSON.stringify(cartItems));
  }, [cartItems, isCartLoaded]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.active === true);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.active === true ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const addToWishlistViaCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.active === false);
      if (existing) return prev;
      return [...prev, { ...item, active: false }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, addToWishlistViaCart, removeFromCart, updateItemQuantity, isCartLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ──────────────────────────── WISHLIST ─────────────────────────────── */

interface WishlistItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
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

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sm1_wishlist");
    if (stored) {
      try { setWishlistItems(JSON.parse(stored)); } catch { localStorage.removeItem("sm1_wishlist"); }
    }
    setIsWishlistLoaded(true);
  }, []);

  useEffect(() => {
    if (isWishlistLoaded) localStorage.setItem("sm1_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems, isWishlistLoaded]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    setWishlistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, updateItemQuantity, isWishlistLoaded }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/* ──────────────────────────── COMPARE ─────────────────────────────── */

interface CompareItem {
  image: string;
  name: string;
  price: string;
  description: string;
  rating: number;
  ratingCount: number;
  weight: string;
  inStock: boolean;
}

interface CompareContextProps {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (name: string) => void;
}

const CompareContext = createContext<CompareContextProps>({
  compareItems: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
});

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sm1_compare");
    if (stored) { try { setCompareItems(JSON.parse(stored)); } catch { /* ignore */ } }
  }, []);

  useEffect(() => {
    localStorage.setItem("sm1_compare", JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (item: CompareItem) => {
    setCompareItems((prev) => {
      if (prev.some((i) => i.name === item.name)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCompare = (name: string) => {
    setCompareItems((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);

/* ──────────────────────────── COMBINED ─────────────────────────────── */

export function Supermarket1Provider({ children }: { children: ReactNode }) {
  return (
    <Supermarket1ConfigProvider>
      <WishlistProvider>
        <CartProvider>
          <CompareProvider>
            {children}
          </CompareProvider>
        </CartProvider>
      </WishlistProvider>
    </Supermarket1ConfigProvider>
  );
}
