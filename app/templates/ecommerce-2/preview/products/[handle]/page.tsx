"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart, useStore } from "@/lib/shata-home/context";
import { findProduct, formatPrice, productsInCategory } from "@/lib/shata-home/utils";
import { Breadcrumbs, Container, Price, ProductBadge, Quantity, Rating, SectionHeading } from "@/components/templates/shata-home/ui/Atoms";
import { Button } from "@/components/templates/shata-home/ui/Button";
import { ProductGrid } from "@/components/templates/shata-home/product/ProductCard";

export default function ProductPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const config = useStore();
  const cart = useCart();
  const product = findProduct(config, handle);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const initialOptions = useMemo<Record<string, string>>(() => {
    const o: Record<string, string> = {};
    (product!.options ?? []).forEach((opt) => { o[opt.name] = opt.values[0]; });
    return o;
  }, [product]);
  const [options, setOptions] = useState<Record<string, string>>(initialOptions);
  const [added, setAdded] = useState(false);

  const related = useMemo(
    () => productsInCategory(config, product!.category).filter((p) => p.id !== product!.id).slice(0, 4),
    [config, product]
  );

  function addToCart() {
    cart.add(product!.id, options, qty);
    setAdded(true);
    cart.openDrawer();
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/templates/ecommerce-2/preview" },
          { label: "Shop", href: "/templates/ecommerce-2/preview/shop" },
          { label: product!.name },
        ]} />
      </Container>

      <Container className="py-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden border border-[color:var(--store-border)] bg-gray-50">
              {product!.badge && (
                <div className="absolute left-4 top-4 z-10">
                  <ProductBadge kind={product!.badge} />
                </div>
              )}
              <Image
                src={product!.images[activeImage]}
                alt={product!.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
            {product!.images.length > 1 && (
              <ul className="mt-3 grid grid-cols-4 gap-2">
                {product!.images.map((src, i) => (
                  <li key={src + i}>
                    <button
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-square w-full overflow-hidden border ${
                        i === activeImage ? "border-[color:var(--store-primary)]" : "border-[color:var(--store-border)]"
                      } bg-[color:var(--store-surface)]`}
                      aria-label={`Image ${i + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="120px" unoptimized />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Info */}
          <div>
            <Rating value={product!.rating} count={product!.reviewCount} size="md" />
            <h1 className="mt-2 text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">{product!.name}</h1>
            {product!.shortDescription && (
              <p className="mt-2 text-sm text-[color:var(--store-muted)]">{product!.shortDescription}</p>
            )}
            <div className="mt-4">
              <Price product={product!} size="lg" />
            </div>

            {(product!.options ?? []).map((opt) => (
              <div key={opt.name} className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">{opt.name}</span>
                  <span className="text-xs text-[color:var(--store-fg)]">{options[opt.name]}</span>
                </div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {opt.values.map((v) => {
                    const active = options[opt.name] === v;
                    return (
                      <li key={v}>
                        <button
                          type="button"
                          onClick={() => setOptions((cur) => ({ ...cur, [opt.name]: v }))}
                          className={`px-3 py-1.5 text-xs font-bold transition ${
                            active
                              ? "bg-[color:var(--store-primary)] text-white"
                              : "border border-[color:var(--store-border)] bg-[color:var(--store-surface)] text-[color:var(--store-fg)] hover:border-[color:var(--store-primary)]"
                          }`}
                        >
                          {v}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="mt-7 flex items-center gap-3">
              <Quantity value={qty} onChange={setQty} />
              <Button onClick={addToCart} size="lg" className="flex-1">
                {added ? "Added ✓" : `Add to cart · ${formatPrice(product!.price * qty)}`}
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-4 text-xs text-[color:var(--store-muted)]">
              <div><div className="font-bold text-[color:var(--store-fg)]">Free delivery</div><div>On orders over $500</div></div>
              <div><div className="font-bold text-[color:var(--store-fg)]">30-day returns</div><div>No questions asked</div></div>
              <div><div className="font-bold text-[color:var(--store-fg)]">In stock</div><div>{product!.inventory ?? "Available"}</div></div>
              <div><div className="font-bold text-[color:var(--store-fg)]">Secure checkout</div><div>Stripe-ready</div></div>
            </div>

            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">Description</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[color:var(--store-fg)]">{product!.description}</p>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="py-12">
          <SectionHeading title="You may also like" />
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </Container>
      )}
    </>
  );
}
