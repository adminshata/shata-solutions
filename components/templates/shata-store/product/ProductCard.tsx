"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/shata-store/types";
import { useCart } from "@/lib/shata-store/context";
import { Price, ProductBadge, Rating } from "../ui/Atoms";

const PREVIEW_BASE = "/templates/ecommerce/preview";

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [hover, setHover] = useState(false);
  const primary = product.images[0];
  const secondary = product.images[1] ?? primary;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    // For options-required products, send to PDP instead of silent default.
    const hasOptions = (product.options ?? []).some((o) => o.values.length > 1);
    if (hasOptions) {
      window.location.href = `${PREVIEW_BASE}/products/${product.handle}`;
      return;
    }
    cart.add(product.id, undefined, 1);
    cart.openDrawer();
  }

  return (
    <Link
      href={`${PREVIEW_BASE}/products/${product.handle}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.25)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--store-bg)]">
        <Image
          src={hover && secondary !== primary ? secondary : primary}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          unoptimized
        />

        {/* Badges */}
        {product.badge && (
          <div className="absolute left-3 top-3 z-10">
            <ProductBadge kind={product.badge} />
          </div>
        )}

        {/* Quick add */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={quickAdd}
            className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-[var(--store-radius)] bg-[color:var(--store-primary)] px-4 py-2.5 text-xs font-semibold text-[color:var(--store-primary-fg)] shadow-[0_18px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            Quick add
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--store-muted)]">
          {labelForCategory(product.category)}
        </div>
        <div className="text-sm font-semibold text-[color:var(--store-fg)]">{product.name}</div>
        {product.shortDescription && (
          <div className="line-clamp-1 text-xs text-[color:var(--store-muted)]">{product.shortDescription}</div>
        )}
        <div className="mt-auto flex items-center justify-between">
          <Price product={product} size="md" />
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
      </div>
    </Link>
  );
}

function labelForCategory(handle: string): string {
  return handle
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/* ------------------------------------------------------------------ */
/* ProductGrid                                                         */
/* ------------------------------------------------------------------ */

export function ProductGrid({ products, className = "" }: { products: Product[]; className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
