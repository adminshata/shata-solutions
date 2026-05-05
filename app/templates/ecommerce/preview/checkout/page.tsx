"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, useStore } from "@/lib/shata-store/context";
import { formatPrice, lineSignature } from "@/lib/shata-store/utils";
import { Breadcrumbs, Container, EmptyState } from "@/components/templates/shata-store/ui/Atoms";
import { Button, LinkButton } from "@/components/templates/shata-store/ui/Button";

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

  const shippingFlat = cart.subtotal === 0 ? 0 : cart.subtotal >= 7500 ? 0 : 800; // free over $75
  const tax = Math.round(cart.subtotal * 0.07);
  const total = cart.subtotal + shippingFlat + tax;

  if (cart.cart.lines.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Your cart is empty."
          copy="Add a product first, then come back to checkout."
          action={<LinkButton href="/templates/ecommerce/preview/shop">Browse the shop →</LinkButton>}
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
        window.sessionStorage.setItem("shata-store/last-order", JSON.stringify({
          orderRef, email, name, total, items: cart.cart.lines.length, ts: Date.now(),
        }));
      } catch { /* ignore */ }
    }
    cart.clear();
    router.push(`/templates/ecommerce/preview/order-successful?ref=${orderRef}`);
  }

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/templates/ecommerce/preview" },
          { label: "Cart", href: "/templates/ecommerce/preview/cart" },
          { label: "Checkout" },
        ]} />
      </Container>

      <Container className="pb-16 pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Form column */}
          <form onSubmit={placeOrder} className="space-y-5">
            <h1 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Checkout</h1>

            {/* Stepper */}
            <ol className="flex gap-2">
              {([1, 2, 3] as const).map((n) => (
                <li key={n} className="flex flex-1 items-center gap-2 rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                    n === step
                      ? "bg-[color:var(--store-fg)] text-[color:var(--store-bg)]"
                      : n < step
                      ? "bg-[color:var(--store-accent)] text-white"
                      : "bg-[color:var(--store-bg)] text-[color:var(--store-muted)]"
                  }`}>
                    {n < step ? "✓" : n}
                  </span>
                  <span className="text-xs font-semibold">{["Contact", "Shipping", "Payment"][n - 1]}</span>
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
                    className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20"
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
                      className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20"
                    />
                  </Field>
                  <Field label="Country">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)]"
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
                        className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20"
                      />
                    </Field>
                  </div>
                  <Field label="City">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20"
                    />
                  </Field>
                  <Field label="ZIP / Postal">
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20"
                    />
                  </Field>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]">
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
                <div className="rounded-[var(--store-radius)] border border-dashed border-[color:var(--store-border)] bg-[color:var(--store-bg)] p-5 text-sm text-[color:var(--store-muted)]">
                  This is a <strong className="text-[color:var(--store-fg)]">demo checkout</strong>. Payment is not collected. In production this step renders a Stripe Payment Element. Submit below to simulate placing the order.
                </div>
                <div className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">Card details · demo only</div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-[2fr_1fr_1fr]">
                    <input disabled placeholder="4242 4242 4242 4242" className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2.5 text-sm text-[color:var(--store-muted)]" />
                    <input disabled placeholder="MM / YY" className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2.5 text-sm text-[color:var(--store-muted)]" />
                    <input disabled placeholder="CVC" className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-2.5 text-sm text-[color:var(--store-muted)]" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep(2)} className="text-xs font-semibold text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]">
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
          <aside className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">Order summary</div>
            <ul className="mt-4 divide-y divide-[color:var(--store-border)]">
              {cart.cart.lines.map((l) => {
                const p = cart.resolveProduct(l.productId);
                if (!p) return null;
                const sig = lineSignature(l.productId, l.options);
                return (
                  <li key={sig} className="flex gap-3 py-3">
                    <div className="relative h-14 w-14 flex-none overflow-hidden rounded-[var(--store-radius)] bg-[color:var(--store-bg)]">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="56px" unoptimized />
                    </div>
                    <div className="flex flex-1 flex-col text-xs">
                      <span className="font-semibold text-[color:var(--store-fg)]">{p.name}</span>
                      <span className="text-[color:var(--store-muted)]">Qty {l.quantity}</span>
                    </div>
                    <span className="text-xs font-semibold">{formatPrice(p.price * l.quantity)}</span>
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
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <Link href="/templates/ecommerce/preview/cart" className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]">
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
    <section className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">{label}</span>
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
