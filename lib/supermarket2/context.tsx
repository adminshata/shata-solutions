"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ─────────────── CART ─────────────── */
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
  addToWishlist: (item: CartItem) => void;
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
    const stored = localStorage.getItem("sm2_cart");
    if (stored) { try { setCartItems(JSON.parse(stored)); } catch { localStorage.removeItem("sm2_cart"); } }
    setIsCartLoaded(true);
  }, []);
  useEffect(() => { if (isCartLoaded) localStorage.setItem("sm2_cart", JSON.stringify(cartItems)); }, [cartItems, isCartLoaded]);
  const addToCart = (item: CartItem) => setCartItems(prev => {
    const ex = prev.find(i => i.id === item.id && i.active);
    if (ex) return prev.map(i => i.id === item.id && i.active ? { ...i, quantity: i.quantity + item.quantity } : i);
    return [...prev, item];
  });
  const addToWishlist = (item: CartItem) => setCartItems(prev => {
    const ex = prev.find(i => i.id === item.id && !i.active);
    if (ex) return prev.map(i => i.id === item.id && !i.active ? { ...i, quantity: i.quantity + item.quantity } : i);
    return [...prev, item];
  });
  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));
  const updateItemQuantity = (id: number, quantity: number) => setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
  return (
    <CartContext.Provider value={{ cartItems, addToCart, addToWishlist, removeFromCart, updateItemQuantity, isCartLoaded }}>
      {children}
    </CartContext.Provider>
  );
};

/* ─────────────── WISHLIST ─────────────── */
interface WishlistItem { id: number; image: string; title: string; price: number; quantity: number; }
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
    const stored = localStorage.getItem("sm2_wishlist");
    if (stored) { try { setWishlistItems(JSON.parse(stored)); } catch { localStorage.removeItem("sm2_wishlist"); } }
    setIsWishlistLoaded(true);
  }, []);
  useEffect(() => { if (isWishlistLoaded) localStorage.setItem("sm2_wishlist", JSON.stringify(wishlistItems)); }, [wishlistItems, isWishlistLoaded]);
  const addToWishlist = (item: WishlistItem) => setWishlistItems(prev => { if (prev.find(i => i.id === item.id)) return prev; return [...prev, item]; });
  const removeFromWishlist = (id: number) => setWishlistItems(prev => prev.filter(i => i.id !== id));
  const updateItemQuantity = (id: number, quantity: number) => setWishlistItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, updateItemQuantity, isWishlistLoaded }}>
      {children}
    </WishlistContext.Provider>
  );
};

/* ─────────────── COMPARE ─────────────── */
interface CompareItem { image: string; name: string; price: string; description: string; rating: number; ratingCount: number; weight: string; inStock: boolean; }
interface CompareContextProps { compareItems: CompareItem[]; addToCompare: (item: CompareItem) => void; removeFromCompare: (name: string) => void; }
export const CompareContext = createContext<CompareContextProps>({ compareItems: [], addToCompare: () => {}, removeFromCompare: () => {} });
export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
  useEffect(() => { const s = localStorage.getItem("sm2_compare"); if (s) setCompareItems(JSON.parse(s)); }, []);
  useEffect(() => { localStorage.setItem("sm2_compare", JSON.stringify(compareItems)); }, [compareItems]);
  const addToCompare = (item: CompareItem) => setCompareItems(prev => { if (prev.some(i => i.name === item.name)) return prev; return [...prev, item]; });
  const removeFromCompare = (name: string) => setCompareItems(prev => prev.filter(i => i.name !== name));
  return <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare }}>{children}</CompareContext.Provider>;
};
export const useCompare = () => useContext(CompareContext);

/* ─────────────── COMBINED PROVIDER ─────────────── */
export function Supermarket2Provider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          {children}
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
