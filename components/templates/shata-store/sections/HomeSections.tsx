"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/shata-store/context";
import { featuredProducts } from "@/lib/shata-store/utils";
import { ProductGrid } from "../product/ProductCard";
import { Container, SectionHeading } from "../ui/Atoms";
import { LinkButton } from "../ui/Button";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const config = useStore();
  const h = config.sections.hero;
  if (!h.enabled) return null;
  const isCenter = h.align === "center";

  return (
    <section className="border-b border-[color:var(--store-border)]">
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-16 lg:py-20">
        <div className={`flex flex-col justify-center ${isCenter ? "text-center" : ""}`}>
          {h.eyebrow && (
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--store-accent)]" />
              {h.eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-[color:var(--store-fg)] md:text-5xl lg:text-6xl">
            {h.title}
          </h1>
          <p className={`mt-5 max-w-xl text-base leading-7 text-[color:var(--store-muted)] md:text-lg ${isCenter ? "mx-auto" : ""}`}>
            {h.subtitle}
          </p>
          <div className={`mt-7 flex flex-wrap gap-3 ${isCenter ? "justify-center" : ""}`}>
            <LinkButton href={h.ctaHref} size="lg">
              {h.ctaLabel} →
            </LinkButton>
            {h.secondaryCtaLabel && h.secondaryCtaHref && (
              <LinkButton href={h.secondaryCtaHref} variant="outline" size="lg">
                {h.secondaryCtaLabel}
              </LinkButton>
            )}
          </div>
        </div>

        <HeroVisual src={h.image} />
      </Container>
    </section>
  );
}

function HeroVisual({ src }: { src?: string }) {
  // Build a beautiful 3-image collage from the catalog if no hero image is set.
  const config = useStore();
  if (src) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)]">
        <Image src={src} alt="" fill className="object-cover" unoptimized sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
    );
  }
  const picks = config.products.slice(0, 3);
  return (
    <div className="relative grid h-[420px] grid-cols-2 grid-rows-2 gap-3 md:h-auto md:aspect-square">
      <div className="relative col-span-1 row-span-2 overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
        {picks[0] && <Image src={picks[0].images[0]} alt={picks[0].name} fill className="object-cover" unoptimized sizes="(min-width: 768px) 25vw, 50vw" />}
      </div>
      <div className="relative overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
        {picks[1] && <Image src={picks[1].images[0]} alt={picks[1].name} fill className="object-cover" unoptimized sizes="(min-width: 768px) 25vw, 50vw" />}
      </div>
      <div className="relative overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
        {picks[2] && <Image src={picks[2].images[0]} alt={picks[2].name} fill className="object-cover" unoptimized sizes="(min-width: 768px) 25vw, 50vw" />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export function Categories() {
  const config = useStore();
  const sec = config.sections.categories;
  if (!sec.enabled) return null;
  const items = sec.limit ? config.categories.slice(0, sec.limit) : config.categories;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title={sec.title}
          subtitle={sec.subtitle}
          action={
            <Link
              href="/templates/ecommerce/preview/shop"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-fg)] hover:underline"
            >
              View all →
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/templates/ecommerce/preview/collections/${c.handle}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
                <Image src={c.image} alt={c.name} fill className="object-cover transition group-hover:scale-105" sizes="160px" unoptimized />
              </div>
              <span className="text-sm font-semibold text-[color:var(--store-fg)]">{c.name}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured products                                                   */
/* ------------------------------------------------------------------ */

export function FeaturedProducts() {
  const config = useStore();
  const sec = config.sections.featuredProducts;
  if (!sec.enabled) return null;
  const items = featuredProducts(config, sec.limit ?? 8);

  return (
    <section className="border-y border-[color:var(--store-border)] bg-[color:var(--store-surface)] py-16">
      <Container>
        <SectionHeading
          title={sec.title}
          subtitle={sec.subtitle}
          action={
            <LinkButton href="/templates/ecommerce/preview/shop" variant="outline" size="sm">
              Shop all →
            </LinkButton>
          }
        />
        <div className="mt-8">
          <ProductGrid products={items} />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Banner offer                                                        */
/* ------------------------------------------------------------------ */

export function BannerOffer() {
  const config = useStore();
  const sec = config.sections.bannerOffer;
  if (!sec.enabled) return null;

  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-fg)] p-10 text-[color:var(--store-bg)] md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(99,91,255,0.30),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(6,182,212,0.25),transparent_55%)]" />
          <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              {sec.eyebrow && (
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-bg)]/70">{sec.eyebrow}</div>
              )}
              <h3 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{sec.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--store-bg)]/75 md:text-base">{sec.subtitle}</p>
            </div>
            <div className="flex justify-end">
              <Link
                href={sec.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--store-radius)] bg-[color:var(--store-bg)] px-6 py-3 text-sm font-semibold text-[color:var(--store-fg)] transition hover:opacity-90"
              >
                {sec.ctaLabel} →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value props                                                         */
/* ------------------------------------------------------------------ */

export function ValueProps() {
  const config = useStore();
  const sec = config.sections.valueProps;
  if (!sec.enabled || sec.items.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sec.items.map((it) => (
            <li
              key={it.title}
              className="flex items-start gap-3 rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-5"
            >
              <ValueIcon kind={it.icon} />
              <div>
                <div className="text-sm font-semibold text-[color:var(--store-fg)]">{it.title}</div>
                <p className="mt-1 text-xs leading-5 text-[color:var(--store-muted)]">{it.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ValueIcon({ kind }: { kind: "shipping" | "support" | "returns" | "secure" }) {
  return (
    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[var(--store-radius)] bg-[color:var(--store-bg)] text-[color:var(--store-fg)]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        {kind === "shipping" && <><rect x="2" y="7" width="13" height="10" rx="1.5" /><path d="M15 10h4l2 3v4h-6" /><circle cx="6.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>}
        {kind === "support" && <><path d="M21 12a9 9 0 1 0-3 6.7L21 21l-2.3-3a9 9 0 0 0 2.3-6Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>}
        {kind === "returns" && <><path d="M3 7h13a4 4 0 0 1 0 8H8" /><polyline points="7 11 3 7 7 3" /></>}
        {kind === "secure" && <><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="m9 12 2 2 4-4" /></>}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const config = useStore();
  const sec = config.sections.testimonials;
  if (!sec.enabled) return null;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading title={sec.title} align="center" />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {sec.items.map((t, i) => (
            <li
              key={i}
              className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6"
            >
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden className="text-[color:var(--store-accent)]">
                <path d="M0 18V11.4c0-2.7.6-4.9 1.7-6.7C2.8 3 4.6 1.4 7 0l1.4 2c-1.6 1-2.8 2.1-3.6 3.4-.7 1.2-1.1 2.6-1.2 4.2H8v8.4H0zm12 0V11.4c0-2.7.6-4.9 1.7-6.7C14.8 3 16.6 1.4 19 0l1.4 2c-1.6 1-2.8 2.1-3.6 3.4-.7 1.2-1.1 2.6-1.2 4.2H20v8.4h-8z" fill="currentColor" />
              </svg>
              <blockquote className="mt-4 text-sm leading-6 text-[color:var(--store-fg)]">{t.quote}</blockquote>
              <div className="mt-4 text-xs font-semibold text-[color:var(--store-muted)]">— {t.author}{t.role ? `, ${t.role}` : ""}</div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

export function Newsletter() {
  const config = useStore();
  const sec = config.sections.newsletter;
  if (!sec.enabled) return null;

  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-10 text-center md:p-14">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{sec.title}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[color:var(--store-muted)] md:text-base">{sec.subtitle}</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@yourdomain.com"
              className="h-11 flex-1 rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-4 text-sm text-[color:var(--store-fg)] outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20"
            />
            <button
              type="submit"
              className="h-11 rounded-[var(--store-radius)] bg-[color:var(--store-primary)] px-5 text-sm font-semibold text-[color:var(--store-primary-fg)] hover:opacity-90"
            >
              {sec.ctaLabel}
            </button>
          </form>
          <p className="mt-3 text-[11px] text-[color:var(--store-muted)]">By subscribing you agree to receive marketing emails. Unsubscribe anytime.</p>
        </div>
      </Container>
    </section>
  );
}
