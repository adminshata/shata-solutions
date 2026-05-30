import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptionIds?: string[];
  notes?: string;
}

interface CartStore {
  items: CartItem[];
  currency: string;
  locale: string;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: string) => void;
  setLocale: (locale: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currency: "USD",
      locale: "en",
      total: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          const items = existing
            ? state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.items, item];
          const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
          return { items, total };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const items = state.items.filter((i) => i.productId !== productId);
          const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
          return { items, total };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          const items = quantity <= 0
            ? state.items.filter((i) => i.productId !== productId)
            : state.items.map((i) => i.productId === productId ? { ...i, quantity } : i);
          const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
          return { items, total };
        });
      },

      clearCart: () => set({ items: [], total: 0 }),
      setCurrency: (currency) => set({ currency }),
      setLocale: (locale) => set({ locale }),
    }),
    { name: "shata-cart" }
  )
);
