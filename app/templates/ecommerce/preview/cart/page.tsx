"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/shata-store/context";
import { formatPrice, lineSignature } from "@/lib/shata-store/utils";
import { Breadcrumbs, Container, EmptyState, Quantity, SectionHeading } from "@/components/templates/shata-store/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-store/ui/Button";

export default function CartPage() {
  const cart = useCart();
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/templates/ecommerce/preview" }, { label: "Cart" }]} />
      </Container>

      <Container className="py-8">
        <SectionHeading title="Your cart" subtitle={cart.itemCount === 0 ? "It's empty for now." : `${cart.itemCount} item${cart.itemCount === 1 ? "" : "s"} in your cart.`} />
      </Container>

      <Container className="pb-20">
        {cart.cart.lines.length === 0 ? (
          <EmptyState
            title="Your cart is empty."
            copy="Browse the shop and pick something up."
            action={<LinkButton href="/templates/ecommerce/preview/shop">Browse the shop →</LinkButton>}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <ul className="divide-y divide-[color:var(--store-border)] rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
              {cart.cart.lines.map((line) => {
                const product = cart.resolveProduct(line.productId);
                if (!product) return null;
                const sig = lineSignature(line.productId, line.options);
                return (
                  <li key={sig} className="flex gap-4 p-4">
                    <div className="relative h-24 w-24 flex-none overflow-hidden rounded-[var(--store-radius)] bg-[color:var(--store-bg)]">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="96px" unoptimized />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/templates/ecommerce/preview/products/${product.handle}`}
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
                        <span className="text-sm font-semibold">{formatPrice(product.price * line.quantity)}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <Quantity value={line.quantity} onChange={(q) => cart.update(sig, q)} />
                        <button
                          type="button"
                          onClick={() => cart.remove(sig)}
                          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)] hover:text-[color:var(--store-fg)]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6 lg:sticky lg:top-24 lg:h-fit">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">Order summary</div>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Subtotal" v={formatPrice(cart.subtotal)} />
                <Row k="Shipping" v="Calculated at checkout" />
                <Row k="Estimated tax" v="—" />
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-[color:var(--store-border)] pt-4 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="mt-2 text-[11px] text-[color:var(--store-muted)]">{cart.shippingHint}</div>
              <LinkButton href="/templates/ecommerce/preview/checkout" full size="lg" className="mt-5">
                Proceed to checkout →
              </LinkButton>
              <LinkButton href="/templates/ecommerce/preview/shop" variant="outline" full size="md" className="mt-2">
                Continue shopping
              </LinkButton>
            </aside>
          </div>
        )}
      </Container>
    </>
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
