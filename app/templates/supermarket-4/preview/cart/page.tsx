"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/templates/supermarket4/layout/SiteShell";
import { Header } from "@/components/templates/supermarket4/layout/Header";
import { Footer } from "@/components/templates/supermarket4/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket4/layout/CartDrawer";
import { Quantity } from "@/components/templates/supermarket4/ui/Atoms";
import { useCart, useSite } from "@/lib/supermarket4/context";
import { formatPrice, lineSignature } from "@/lib/supermarket4/utils";

const BASE_PATH = "/templates/supermarket-4/preview";

export default function CartPage() {
  const config = useSite();
  const cart = useCart();

  return (
    <SiteShell>
      <Header />
      <main style={{ background: "#F3F4F6" }}>
        {/* Banner */}
        <div style={{ background: "#EA580C" }} className="py-10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 text-xs text-white/70 mb-2">
              <Link href={BASE_PATH} className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Cart</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white">Shopping Cart</h1>
          </div>
        </div>

        <section className="py-8">
          <div className="container mx-auto px-4">
            {cart.cart.lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded border border-gray-200 p-16 text-center gap-4">
                <svg className="h-16 w-16 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6 6h15l-1.5 9H7.5z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6L4 2H2" />
                </svg>
                <p className="text-lg font-bold text-gray-700">Your cart is empty</p>
                <p className="text-sm text-gray-500">Add some products to get started.</p>
                <Link
                  href={`${BASE_PATH}/shop`}
                  className="rounded px-6 py-2.5 text-sm font-bold text-white"
                  style={{ background: "#EA580C" }}
                >
                  Browse Shop
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart items */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white rounded border border-gray-200 overflow-hidden">
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                    <ul className="divide-y divide-gray-100">
                      {cart.cart.lines.map((line) => {
                        const product = cart.resolveProduct(line.productId);
                        if (!product) return null;
                        const sig = lineSignature(line.productId);
                        return (
                          <li key={sig} className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 p-4">
                            {/* Product */}
                            <div className="col-span-6 flex items-center gap-3">
                              <div className="relative h-16 w-16 shrink-0 rounded border border-gray-100 overflow-hidden bg-gray-50">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                  unoptimized
                                />
                              </div>
                              <div className="min-w-0">
                                <Link
                                  href={`${BASE_PATH}/shop/${product.handle}`}
                                  className="text-sm font-semibold text-gray-800 hover:text-[#EA580C] line-clamp-2"
                                >
                                  {product.name}
                                </Link>
                                {product.unit && (
                                  <div className="text-[11px] text-gray-400 mt-0.5">{product.unit}</div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => cart.remove(sig)}
                                  className="mt-1 text-[11px] text-red-400 hover:text-red-600 font-semibold"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            {/* Price */}
                            <div className="col-span-2 flex sm:justify-center items-center gap-2">
                              <span className="sm:hidden text-[11px] font-bold uppercase text-gray-400">Price:</span>
                              <span className="text-sm font-semibold text-gray-700">{formatPrice(product.price)}</span>
                            </div>
                            {/* Qty */}
                            <div className="col-span-2 flex sm:justify-center items-center gap-2">
                              <span className="sm:hidden text-[11px] font-bold uppercase text-gray-400">Qty:</span>
                              <Quantity value={line.quantity} onChange={(q) => cart.update(sig, q)} />
                            </div>
                            {/* Total */}
                            <div className="col-span-2 flex sm:justify-end items-center gap-2">
                              <span className="sm:hidden text-[11px] font-bold uppercase text-gray-400">Total:</span>
                              <span className="text-sm font-bold" style={{ color: "#EA580C" }}>
                                {formatPrice(product.price * line.quantity)}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href={`${BASE_PATH}/shop`}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#EA580C] transition-colors"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Continue Shopping
                    </Link>
                    <button
                      type="button"
                      onClick={() => cart.clear()}
                      className="text-sm font-semibold text-red-400 hover:text-red-600"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="lg:w-80 shrink-0">
                  <div className="bg-white rounded border border-gray-200 p-5 sticky top-4">
                    <h2 className="text-base font-bold text-gray-800 mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cart.itemCount} items)</span>
                        <span className="font-semibold text-gray-800">{formatPrice(cart.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-[#EA580C]">
                          {cart.subtotal >= 5000 ? "FREE" : formatPrice(499)}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-2 mb-4 p-2 rounded bg-gray-50 border border-gray-100">
                      {cart.shippingHint}
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-800 border-t border-gray-100 pt-4 mb-4">
                      <span>Total</span>
                      <span>{formatPrice(cart.subtotal + (cart.subtotal >= 5000 ? 0 : 499))}</span>
                    </div>
                    <Link
                      href={`${BASE_PATH}/checkout`}
                      className="block w-full rounded py-3 text-center text-sm font-bold text-white"
                      style={{ background: "#EA580C" }}
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}
