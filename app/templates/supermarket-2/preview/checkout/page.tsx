"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/templates/supermarket2/layout/SiteShell";
import { Header } from "@/components/templates/supermarket2/layout/Header";
import { Footer } from "@/components/templates/supermarket2/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket2/layout/CartDrawer";
import { useCart, useSite } from "@/lib/supermarket2/context";
import { formatPrice } from "@/lib/supermarket2/utils";

const BASE_PATH = "/templates/supermarket-2/preview";

export default function CheckoutPage() {
  const config = useSite();
  const cart = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const shipping = cart.subtotal >= 5000 ? 0 : 499;
  const total = cart.subtotal + shipping;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const orderRef = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      sessionStorage.setItem(
        "sm2/order",
        JSON.stringify({
          ref: orderRef,
          name: data.get("firstName") + " " + data.get("lastName"),
          email: data.get("email"),
          address: [data.get("address"), data.get("city"), data.get("state")].filter(Boolean).join(", "),
          total,
          itemCount: cart.itemCount,
          store: config.name,
        })
      );
    } catch { /* ignore */ }
    setTimeout(() => {
      cart.clear();
      router.push(`${BASE_PATH}/order-successful`);
    }, 800);
  }

  return (
    <SiteShell>
      <Header />
      <main style={{ background: "#F3F4F6" }}>
        {/* Banner */}
        <div style={{ background: "#DC2626" }} className="py-10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 text-xs text-white/70 mb-2">
              <Link href={BASE_PATH} className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href={`${BASE_PATH}/cart`} className="hover:text-white">Cart</Link>
              <span>/</span>
              <span className="text-white font-medium">Checkout</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white">Checkout</h1>
          </div>
        </div>

        <section className="py-8">
          <div className="container mx-auto px-4">
            {cart.cart.lines.length === 0 ? (
              <div className="flex flex-col items-center gap-4 bg-white rounded border border-gray-200 p-16 text-center">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link href={`${BASE_PATH}/shop`} className="text-sm font-bold underline" style={{ color: "#DC2626" }}>
                  Go to shop
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Billing */}
                  <div className="flex-1 space-y-5">
                    <div className="bg-white rounded border border-gray-200 p-5">
                      <h2 className="text-base font-bold text-gray-800 mb-4">Shipping Details</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="First Name" name="firstName" required />
                        <Field label="Last Name" name="lastName" required />
                        <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
                        <Field label="Phone" name="phone" type="tel" required className="sm:col-span-2" />
                        <Field label="Address" name="address" required className="sm:col-span-2" />
                        <Field label="City" name="city" required />
                        <Field label="State / Province" name="state" />
                        <Field label="ZIP / Postal Code" name="zip" required />
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Country</label>
                          <select
                            name="country"
                            className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#DC2626]"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded border border-gray-200 p-5">
                      <h2 className="text-base font-bold text-gray-800 mb-4">Payment</h2>
                      <div className="space-y-3">
                        {["Credit / Debit Card", "PayPal", "Cash on Delivery"].map((method, i) => (
                          <label key={method} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value={method}
                              defaultChecked={i === 0}
                              className="accent-[#DC2626]"
                            />
                            <span className="text-sm text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="lg:w-80 shrink-0">
                    <div className="bg-white rounded border border-gray-200 p-5 sticky top-4">
                      <h2 className="text-base font-bold text-gray-800 mb-4">Your Order</h2>
                      <ul className="divide-y divide-gray-100 mb-4 max-h-60 overflow-y-auto">
                        {cart.cart.lines.map((line) => {
                          const product = cart.resolveProduct(line.productId);
                          if (!product) return null;
                          return (
                            <li key={line.productId} className="flex gap-3 py-3">
                              <div className="relative h-12 w-12 shrink-0 rounded border border-gray-100 overflow-hidden bg-gray-50">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                  unoptimized
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-gray-700 line-clamp-2">{product.name}</div>
                                <div className="text-[11px] text-gray-400">×{line.quantity}</div>
                              </div>
                              <div className="text-xs font-bold text-gray-800 shrink-0">
                                {formatPrice(product.price * line.quantity)}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="font-semibold text-[#DC2626]">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-800 text-base border-t border-gray-100 pt-2 mt-2">
                          <span>Total</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full rounded py-3 text-sm font-bold text-white disabled:opacity-70 transition-opacity"
                        style={{ background: "#DC2626" }}
                      >
                        {loading ? "Placing Order…" : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={label}
        className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#DC2626]"
      />
    </div>
  );
}
