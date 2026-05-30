"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { formatCurrency } from "@shata/ui";
import { useCartStore } from "@/store/cart";
import type { Category, Product } from "@shata/types";

export default function MenuPage() {
  const { token } = useParams<{ token: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Track recently-added product IDs for the bounce animation
  const [bouncingIds, setBouncingIds] = useState<Set<string>>(new Set());
  const { addItem, currency, locale } = useCartStore();

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    fetch(`${apiUrl}/api/sessions/${token}/menu`)
      .then((r) => r.json())
      .then((data: Category[]) => {
        setCategories(data);
        if (data.length > 0 && data[0]) setActiveCategory(data[0].id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  const activeProducts =
    categories.find((c) => c.id === activeCategory)?.products ?? [];

  function handleAdd(product: Product) {
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    setBouncingIds((prev) => new Set(prev).add(product.id));
    // Clear bounce state after animation completes
    setTimeout(() => {
      setBouncingIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 300);
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Category nav */}
      <nav className="sticky top-0 z-20 flex gap-2 overflow-x-auto bg-background/95 px-4 py-3 shadow-sm backdrop-blur-sm">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeCategory === cat.id
                ? "bg-brand text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {/* Products */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {activeProducts.map((product: Product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              )}
              <div className="flex flex-1 flex-col">
                <p className="font-semibold leading-snug">{product.name}</p>
                {product.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-brand">
                    {formatCurrency(product.price, currency, locale)}
                  </span>
                  <motion.button
                    animate={
                      bouncingIds.has(product.id)
                        ? { scale: [1, 1.15, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    whileTap={{ scale: 1.15 }}
                    onClick={() => handleAdd(product)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-xl font-bold shadow hover:bg-brand-dark transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
