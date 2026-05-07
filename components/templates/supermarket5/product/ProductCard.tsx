"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/supermarket5/context";
import { formatPrice, lineSignature } from "@/lib/supermarket5/utils";
import type { StoreProduct } from "@/lib/supermarket5/types";
import { Badge } from "../ui/Atoms";

const BASE_PATH = "/templates/supermarket-5/preview";

export function ProductCard({ product }: { product: StoreProduct }) {
  const cart = useCart();
  const sig = lineSignature(product.id);
  const inCart = cart.cart.lines.find((l) => lineSignature(l.productId) === sig);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    cart.add(product.id, 1);
    cart.openDrawer();
  }

  return (
    <div className="group relative bg-white rounded border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
      {/* Image */}
      <Link href={`${BASE_PATH}/shop/${product.handle}`} className="block relative h-48 bg-gray-50 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          unoptimized
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge badge={product.badge} />
          </div>
        )}
        {/* Compare price badge */}
        {product.compareAtPrice && (
          <div className="absolute top-2 right-2">
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors"
              title="Add to cart"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 6h15l-1.5 9H7.5z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6L4 2H2" />
              </svg>
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
              title="Add to wishlist"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        {product.category && (
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {product.category.replace(/-/g, " ")}
          </div>
        )}
        <Link
          href={`${BASE_PATH}/shop/${product.handle}`}
          className="block text-sm font-semibold text-gray-800 hover:text-[#7C3AED] line-clamp-2 leading-snug"
        >
          {product.name}
        </Link>
        {product.unit && (
          <div className="text-[11px] text-gray-400 mt-0.5">{product.unit}</div>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold" style={{ color: "#7C3AED" }}>
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded border py-2 text-xs font-bold uppercase tracking-wider transition-colors"
          style={
            inCart
              ? { background: "#7C3AED", color: "#fff", borderColor: "#7C3AED" }
              : { background: "transparent", color: "#7C3AED", borderColor: "#7C3AED" }
          }
        >
          {inCart ? `In cart (${inCart.quantity})` : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
