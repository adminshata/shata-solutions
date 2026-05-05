"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, useStore } from "@/lib/shata-home/context";
import { formatPrice, lineSignature } from "@/lib/shata-home/utils";
import { Quantity } from "../ui/Atoms";

export function CartDrawer() {
  const cart = useCart();
  const config = useStore();

  if (!cart.drawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={cart.closeDrawer}
        aria-hidden
      />

      {/* Panel */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--store-border)] px-5 py-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-[color:var(--store-fg)]">
            Your cart
            {cart.itemCount > 0 && (
              <span className="ml-2 rounded bg-[color:var(--store-primary)] px-1.5 py-0.5 text-[10px] text-white">
                {cart.itemCount}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={cart.closeDrawer}
            aria-label="Close cart"
            className="p-1 text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="h-12 w-12 text-[color:var(--store-border)]">
                <path d="M6 6h15l-1.5 9H7.5z" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M6 6L4 2H2" />
              </svg>
              <p className="mt-4 text-sm font-semibold text-[color:var(--store-fg)]">Your cart is empty</p>
              <p className="mt-1 text-xs text-[color:var(--store-muted)]">Add some products to get started.</p>
              <button type="button" onClick={cart.closeDrawer}
                className="mt-5 text-xs font-bold uppercase tracking-wider text-[color:var(--store-primary)] hover:underline">
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.cart.lines.map((line) => {
                const product = cart.resolveProduct(line.productId);
                if (!product) return null;
                const sig = lineSignature(line.productId, line.options);
                return (
                  <li key={sig} className="flex gap-3 border-b border-[color:var(--store-border)] pb-4">
                    <div className="relative h-20 w-20 flex-none overflow-hidden bg-[color:var(--store-surface)]">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="80px" unoptimized />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/templates/ecommerce-2/preview/products/${product.handle}`}
                          onClick={cart.closeDrawer}
                          className="text-xs font-semibold text-[color:var(--store-fg)] hover:text-[color:var(--store-primary)]"
                        >
                          {product.name}
                        </Link>
                        <span className="flex-none text-xs font-bold text-[color:var(--store-primary)]">
                          {formatPrice(product.price * line.quantity)}
                        </span>
                      </div>
                      {line.options && Object.keys(line.options).length > 0 && (
                        <div className="mt-0.5 text-[10px] text-[color:var(--store-muted)]">
                          {Object.entries(line.options).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                        </div>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <Quantity value={line.quantity} onChange={(q) => cart.update(sig, q)} />
                        <button type="button" onClick={() => cart.remove(sig)}
                          className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--store-muted)] hover:text-[color:var(--store-primary)]">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.cart.lines.length > 0 && (
          <div className="border-t border-[color:var(--store-border)] px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[color:var(--store-muted)]">Subtotal</span>
              <span className="font-black text-[color:var(--store-fg)]">{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="text-[11px] text-[color:var(--store-muted)]">{cart.shippingHint}</div>
            <Link
              href="/templates/ecommerce-2/preview/checkout"
              onClick={cart.closeDrawer}
              className="flex w-full items-center justify-center gap-2 bg-[color:var(--store-primary)] py-3 text-xs font-black uppercase tracking-wider text-white transition hover:opacity-90"
            >
              Checkout · {formatPrice(cart.subtotal)}
            </Link>
            <Link
              href="/templates/ecommerce-2/preview/cart"
              onClick={cart.closeDrawer}
              className="block w-full border border-[color:var(--store-border)] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[color:var(--store-fg)] hover:bg-[color:var(--store-surface)] transition"
            >
              View cart
            </Link>
            <p className="text-center text-[10px] text-[color:var(--store-muted)]">
              Powered by {config.name}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
