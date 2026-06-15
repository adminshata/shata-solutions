import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptionIds?: string[];
  selectedOptionsLabel?: string;
  notes?: string;
}

// Identity key for a cart line: products without selected options keep the
// productId (backward compatible), products with options get a composite key
// so different size/extras combinations don't merge into one line.
function computeCartItemId(productId: string, selectedOptionIds?: string[]): string {
  if (!selectedOptionIds || selectedOptionIds.length === 0) return productId;
  return `${productId}::${[...selectedOptionIds].sort().join(",")}`;
}

interface CartStore {
  items: CartItem[];
  currency: string;
  locale: string;
  total: number;
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
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
          const cartItemId = computeCartItemId(item.productId, item.selectedOptionIds);
          const existing = state.items.find((i) => i.cartItemId === cartItemId);
          const items = existing
            ? state.items.map((i) =>
                i.cartItemId === cartItemId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.items, { ...item, cartItemId }];
          const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
          return { items, total };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => {
          const items = state.items.filter((i) => i.cartItemId !== cartItemId);
          const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
          return { items, total };
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        set((state) => {
          const items = quantity <= 0
            ? state.items.filter((i) => i.cartItemId !== cartItemId)
            : state.items.map((i) => i.cartItemId === cartItemId ? { ...i, quantity } : i);
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
