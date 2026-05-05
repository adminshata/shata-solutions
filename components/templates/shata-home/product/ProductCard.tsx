"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/shata-home/context";
import { discountPercent, formatPrice } from "@/lib/shata-home/utils";
import type { Product } from "@/lib/shata-home/types";

/* ------------------------------------------------------------------ */
/* Single card                                                          */
/* ------------------------------------------------------------------ */

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const off = discountPercent(product);

  function addToCart() {
    const firstOptions: Record<string, string> = {};
    (product.options ?? []).forEach((o) => { firstOptions[o.name] = o.values[0]; });
    cart.add(product.id, firstOptions, 1);
    cart.openDrawer();
  }

  return (
    <article className="group relative flex flex-col bg-white border border-[color:var(--store-border)] transition-shadow hover:shadow-md">
      {/* Image */}
      <Link href={`/templates/ecommerce-2/preview/products/${product.handle}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.badge && (
            <span className="inline-block bg-[color:var(--store-primary)] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
              {{
                new: "New",
                sale: "Sale",
                bestseller: "Top Pick",
                limited: "Limited",
              }[product.badge]}
            </span>
          )}
          {off !== null && !product.badge && (
            <span className="inline-block bg-[color:var(--store-primary)] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
              -{off}%
            </span>
          )}
        </div>

        {/* Hover overlay actions */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gray-900 py-2.5 text-center transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); addToCart(); }}
            className="text-[10px] font-black uppercase tracking-widest text-white hover:text-red-400 transition-colors"
          >
            + Add to Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        {/* Rating */}
        {product.rating !== undefined && (
          <div className="mb-1 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} viewBox="0 0 24 24" className="h-3 w-3"
                fill={s <= Math.round(product.rating!) ? "#f59e0b" : "transparent"}
                stroke="#f59e0b" strokeWidth={1.5}>
                <path d="M12 2l2.92 6.04 6.66.97-4.82 4.7 1.14 6.64L12 17.27 6.1 20.35l1.14-6.64-4.82-4.7 6.66-.97L12 2z" />
              </svg>
            ))}
          </div>
        )}
        <Link href={`/templates/ecommerce-2/preview/products/${product.handle}`}
          className="line-clamp-2 text-sm font-bold leading-snug text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)] transition-colors">
          {product.name}
        </Link>
        {product.shortDescription && (
          <p className="mt-1 line-clamp-1 text-[11px] text-[color:var(--store-muted)]">{product.shortDescription}</p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-black text-[color:var(--store-primary)]">{formatPrice(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-[color:var(--store-muted)] line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Grid                                                                 */
/* ------------------------------------------------------------------ */

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
