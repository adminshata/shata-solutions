"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ---- Cart ---- */
export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartCtx {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartCtx | null>(null);
export const useShopCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useShopCart outside ShopProvider");
  return ctx;
};

/* ---- Wishlist ---- */
export interface WishlistItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

interface WishCtx {
  wishItems: WishlistItem[];
  addToWish: (item: WishlistItem) => void;
  removeFromWish: (id: number) => void;
}

const WishContext = createContext<WishCtx | null>(null);
export const useWishlist = () => {
  const ctx = useContext(WishContext);
  if (!ctx) throw new Error("useWishlist outside ShopProvider");
  return ctx;
};

/* ---- Compare ---- */
export interface CompareItem {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  rating: number;
  ratingCount: number;
  weight: string;
  inStock: boolean;
}

interface CompareCtx {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (id: string) => void;
}

const CompareContext = createContext<CompareCtx | null>(null);
export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare outside ShopProvider");
  return ctx;
};

/* ---- Provider ---- */
export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishItems, setWishItems] = useState<WishlistItem[]>([]);
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("fm1-cart");
      if (c) setCartItems(JSON.parse(c));
      const w = localStorage.getItem("fm1-wish");
      if (w) setWishItems(JSON.parse(w));
      const k = localStorage.getItem("fm1-compare");
      if (k) setCompareItems(JSON.parse(k));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("fm1-cart", JSON.stringify(cartItems)); } catch {}
  }, [cartItems]);

  useEffect(() => {
    try { localStorage.setItem("fm1-wish", JSON.stringify(wishItems)); } catch {}
  }, [wishItems]);

  useEffect(() => {
    try { localStorage.setItem("fm1-compare", JSON.stringify(compareItems)); } catch {}
  }, [compareItems]);

  const addToCart = (item: CartItem) =>
    setCartItems(prev => {
      const ex = prev.find(i => i.id === item.id);
      if (ex) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      return [...prev, item];
    });

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: number, qty: number) =>
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
  const clearCart = () => setCartItems([]);

  const addToWish = (item: WishlistItem) =>
    setWishItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  const removeFromWish = (id: number) => setWishItems(prev => prev.filter(i => i.id !== id));

  const addToCompare = (item: CompareItem) =>
    setCompareItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  const removeFromCompare = (id: string) => setCompareItems(prev => prev.filter(i => i.id !== id));

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      <WishContext.Provider value={{ wishItems, addToWish, removeFromWish }}>
        <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare }}>
          {children}
        </CompareContext.Provider>
      </WishContext.Provider>
    </CartContext.Provider>
  );
}
