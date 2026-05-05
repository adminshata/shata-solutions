"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, useStore } from "@/lib/shata-home/context";
import { formatPrice, lineSignature } from "@/lib/shata-home/utils";
import { Breadcrumbs, Container, EmptyState } from "@/components/templates/shata-home/ui/Atoms";
import { Button, LinkButton } from "@/components/templates/shata-home/ui/Button";

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const cart = useCart();
  const config = useStore();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [submitting, setSubmitting] = useState(false);

  const shippingFlat = cart.subtotal === 0 ? 0 : cart.subtotal >= 50000 ? 0 : 1500; // free over $500
  const tax = Math.round(cart.subtotal * 0.07);
  const total = cart.subtotal + shippingFlat + tax;

  if (cart.cart.lines.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Your cart is empty."
          copy="Add a product first, then come back to checkout."
          action={<LinkButton href="/templates/ecommerce-2/preview/shop">Browse the shop →</LinkButton>}
        />
      </Container>
    );
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const orderRef = `${config.slug.toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("shata-home/last-order", JSON.stringify({
          orderRef, email, name, total, items: cart.cart.lines.length, ts: Date.now(),
        }));
      } catch { /* ignore */ }
    }
    cart.clear();
    router.push(`/templates/ecommerce-2/preview/order-successful?ref=${orderRef}`);
  }

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/templates/ecommerce-2/preview" },
          { label: "Cart", href: "/templates/ecommerce-2/preview/cart" },
          { label: "Checkout" },
        ]} />
      </Container>

      <Container className="pb-16 pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Form column */}
          <form onSubmit={placeOrder} className="space-y-5">
            <h1 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Checkout</h1>

            {/* Stepper */}
            <ol className="flex gap-2">
              {([1, 2, 3] as const).map((n) => (
                <li key={n} className="flex flex-1 items-center gap-2 border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2">
                  <span className={`flex h-6 w-6 items-center justify-center text-[11px] font-bold ${
                    n === step
                      ? "bg-[color:var(--store-primary)] text-white"
                      : n < step
                      ? "bg-[color:var(--store-accent)] text-white"
                      : "bg-[color:var(--store-bg)] text-[color:var(--store-muted)]"
                  }`}>
                    {n < step ? "✓" : n}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">{["Contact", "Shipping", "Payment"][n - 1]}</span>
                </li>
              ))}
            </ol>

            {step === 1 && (
              <Section title="Contact">
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourdomain.com"
                    className="w-full border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-primary)]"
                  />
                </Field>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)} disabled={!email}>Continue to shipping →</Button>
                </div>
              </Section>
            )}

            {step === 2 && (
              <Section title="Shipping address">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-primary)]"
                    />
                  </Field>
                  <Field label="Country">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--store-primary)]"
                    >
                      {["United States", "Canada", "United Kingdom", "Egypt", "United Arab Emirates", "Other"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Street address">
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-primary)]"
                      />
                    </Field>
                  </div>
                  <Field label="City">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-primary)]"
                    />
                  </Field>
                  <Field label="ZIP / Postal">
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-primary)]"
                    />
                  </Field>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]">
                    ← Back
                  </button>
                  <Button type="button" onClick={() => setStep(3)} disabled={!name || !address || !city || !zip}>
                    Continue to payment →
                  </Button>
                </div>
              </Section>
            )}

            {step === 3 && (
              <Section title="Payment">
                <div className="border border-dashed border-[color:var(--store-border)] bg-[color:var(--store-bg)] p-5 text-sm text-[color:var(--store-muted)]">
                  This is a <strong className="text-[color:var(--store-fg)]">demo checkout</strong>. Payment is not collected. In production this step renders a Stripe Payment Element. Submit below to simulate placing the order.
                </div>
                <div className="border border-[color:var(--store-border)] bg-[color:var(--store-bg)] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">Card details · demo only</div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-[2fr_1fr_1fr]">
                    <input disabled placeholder="4242 4242 4242 4242" className="border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2.5 text-sm text-[color:var(--store-muted)]" />
                    <input disabled placeholder="MM / YY" className="border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2.5 text-sm text-[color:var(--store-muted)]" />
                    <input disabled placeholder="CVC" className="border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2.5 text-sm text-[color:var(--store-muted)]" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep(2)} className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]">
                    ← Back
                  </button>
                  <Button type="submit" disabled={submitting} size="lg">
                    {submitting ? "Placing order…" : `Place order · ${formatPrice(total)}`}
                  </Button>
                </div>
              </Section>
            )}
          </form>

          {/* Summary column */}
          <aside className="border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">Order summary</div>
            <ul className="mt-4 divide-y divide-[color:var(--store-border)]">
              {cart.cart.lines.map((l) => {
                const p = cart.resolveProduct(l.productId);
                if (!p) return null;
                const sig = lineSignature(l.productId, l.options);
                return (
                  <li key={sig} className="flex gap-3 py-3">
                    <div className="relative h-14 w-14 flex-none overflow-hidden border border-[color:var(--store-border)] bg-[color:var(--store-bg)]">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="56px" unoptimized />
                    </div>
                    <div className="flex flex-1 flex-col text-xs">
                      <span className="font-bold uppercase text-[color:var(--store-fg)]">{p.name}</span>
                      <span className="text-[color:var(--store-muted)]">Qty {l.quantity}</span>
                    </div>
                    <span className="text-xs font-bold text-[color:var(--store-accent)]">{formatPrice(p.price * l.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-[color:var(--store-border)] pt-4 text-sm">
              <Row k="Subtotal" v={formatPrice(cart.subtotal)} />
              <Row k="Shipping" v={shippingFlat === 0 ? "Free" : formatPrice(shippingFlat)} />
              <Row k="Tax (est.)" v={formatPrice(tax)} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-[color:var(--store-border)] pt-4 text-base">
              <span className="font-bold uppercase tracking-wide">Total</span>
              <span className="font-bold text-[color:var(--store-accent)]">{formatPrice(total)}</span>
            </div>
            <Link href="/templates/ecommerce-2/preview/cart" className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]">
              ← Edit cart
            </Link>
          </aside>
        </div>
      </Container>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[color:var(--store-muted)]">{k}</dt>
      <dd className="font-medium text-[color:var(--store-fg)]">{v}</dd>
    </div>
  );
}
