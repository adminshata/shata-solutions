"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart, useSite } from "@/lib/supermarket4/context";
import { formatPrice, lineSignature } from "@/lib/supermarket4/utils";
import { Quantity } from "../ui/Atoms";

const BASE_PATH = "/templates/supermarket-4/preview";

export function CartDrawer() {
  const config = useSite();
  const cart = useCart();

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
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{config.name}</div>
            <div className="text-base font-bold text-gray-800">
              {cart.itemCount === 0 ? "Your cart is empty" : `${cart.itemCount} item${cart.itemCount === 1 ? "" : "s"}`}
            </div>
          </div>
          <button
            type="button"
            onClick={cart.closeDrawer}
            aria-label="Close cart"
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center gap-4">
              <svg className="h-14 w-14 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M6 6h15l-1.5 9H7.5z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6L4 2H2" />
              </svg>
              <p className="text-sm text-gray-500">Add some products from the shop.</p>
              <Link
                href={`${BASE_PATH}/shop`}
                onClick={cart.closeDrawer}
                className="rounded px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: "#EA580C" }}
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {cart.cart.lines.map((line) => {
                const product = cart.resolveProduct(line.productId);
                if (!product) return null;
                const sig = lineSignature(line.productId);
                return (
                  <li key={sig} className="flex gap-3 py-4">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded border border-gray-100 bg-gray-50">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`${BASE_PATH}/shop/${product.handle}`}
                          onClick={cart.closeDrawer}
                          className="text-sm font-semibold text-gray-800 hover:text-[#EA580C] line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => cart.remove(sig)}
                          className="shrink-0 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {product.unit && (
                        <span className="text-[11px] text-gray-400">{product.unit}</span>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <Quantity value={line.quantity} onChange={(q) => cart.update(sig, q)} />
                        <span className="text-sm font-bold" style={{ color: "#EA580C" }}>
                          {formatPrice(product.price * line.quantity)}
                        </span>
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
          <footer className="border-t border-gray-200 bg-gray-50 px-5 py-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold text-gray-800">{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="text-[11px] text-gray-400 mb-4">{cart.shippingHint}</div>
            <div className="flex flex-col gap-2">
              <Link
                href={`${BASE_PATH}/checkout`}
                onClick={cart.closeDrawer}
                className="block w-full rounded py-3 text-center text-sm font-bold text-white"
                style={{ background: "#EA580C" }}
              >
                Checkout →
              </Link>
              <Link
                href={`${BASE_PATH}/cart`}
                onClick={cart.closeDrawer}
                className="block w-full rounded border border-gray-200 bg-white py-2.5 text-center text-sm font-semibold text-gray-700 hover:border-[#EA580C] hover:text-[#EA580C] transition-colors"
              >
                View Cart
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
