"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart, useStore } from "@/lib/shata-store/context";
import { formatPrice, lineSignature } from "@/lib/shata-store/utils";
import { Quantity } from "../ui/Atoms";
import { LinkButton } from "../ui/Button";

export function CartDrawer() {
  const cart = useCart();
  const config = useStore();

  useEffect(() => {
    if (!cart.drawerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") cart.closeDrawer();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cart]);

  if (!cart.drawerOpen) return null;

  return (
    <>
      <div
        aria-hidden
        onClick={cart.closeDrawer}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[color:var(--store-bg)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
      >
        <header className="flex items-center justify-between border-b border-[color:var(--store-border)] px-5 py-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">{config.name} cart</div>
            <div className="text-base font-semibold">{cart.itemCount === 0 ? "Empty cart" : `${cart.itemCount} item${cart.itemCount === 1 ? "" : "s"}`}</div>
          </div>
          <button
            type="button"
            onClick={cart.closeDrawer}
            aria-label="Close cart"
            className="rounded-full p-1.5 text-[color:var(--store-muted)] hover:bg-black/[0.04]"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-base font-semibold">Your cart is empty.</div>
              <p className="mt-1 max-w-xs text-sm text-[color:var(--store-muted)]">Add a product from the shop to get started.</p>
              <LinkButton href="/templates/ecommerce/preview/shop" className="mt-5">
                Browse the shop →
              </LinkButton>
            </div>
          ) : (
            <ul className="divide-y divide-[color:var(--store-border)]">
              {cart.cart.lines.map((line) => {
                const product = cart.resolveProduct(line.productId);
                if (!product) return null;
                const sig = lineSignature(line.productId, line.options);
                return (
                  <li key={sig} className="flex gap-4 py-4">
                    <div className="relative h-20 w-20 flex-none overflow-hidden rounded-[var(--store-radius)] bg-[color:var(--store-surface)]">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="80px" unoptimized />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/templates/ecommerce/preview/products/${product.handle}`}
                          onClick={cart.closeDrawer}
                          className="text-sm font-semibold text-[color:var(--store-fg)] hover:underline"
                        >
                          {product.name}
                        </Link>
                        {line.options && Object.keys(line.options).length > 0 && (
                          <div className="text-[11px] text-[color:var(--store-muted)]">
                            {Object.entries(line.options).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Quantity value={line.quantity} onChange={(q) => cart.update(sig, q)} />
                        <span className="text-sm font-semibold">{formatPrice(product.price * line.quantity)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(sig)}
                      aria-label={`Remove ${product.name}`}
                      className="self-start text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.cart.lines.length > 0 && (
          <footer className="border-t border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[color:var(--store-muted)]">Subtotal</span>
              <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="mt-1 text-[11px] text-[color:var(--store-muted)]">{cart.shippingHint}</div>
            <div className="mt-4 flex flex-col gap-2">
              <LinkButton href="/templates/ecommerce/preview/checkout" full size="lg">
                Checkout →
              </LinkButton>
              <LinkButton href="/templates/ecommerce/preview/cart" variant="outline" full size="md">
                View full cart
              </LinkButton>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
