"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/shata-home/context";
import { featuredProducts } from "@/lib/shata-home/utils";
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

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* Background image */}
      {h.image && (
        <div className="absolute inset-0">
          <Image src={h.image} alt="" fill className="object-cover object-center" sizes="100vw" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-gray-900/20" />
        </div>
      )}

      <div className="relative">
        <Container>
          <div className="grid gap-8 py-20 md:grid-cols-2 md:py-28 lg:py-32">
            <div className="flex flex-col justify-center">
              {h.eyebrow && (
                <span className="inline-flex w-fit items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                  {h.eyebrow}
                </span>
              )}
              <h1 className="mt-5 text-4xl font-black uppercase leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl">
                {h.title}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-gray-300 md:text-base">
                {h.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={h.ctaHref} size="lg">
                  {h.ctaLabel} →
                </LinkButton>
                {h.secondaryCtaLabel && h.secondaryCtaHref && (
                  <LinkButton href={h.secondaryCtaHref} size="lg"
                    className="border border-white/30 bg-white/10 text-white hover:bg-white/20">
                    {h.secondaryCtaLabel}
                  </LinkButton>
                )}
              </div>

              {/* Stats row */}
              {config.about.stats && config.about.stats.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-8">
                  {config.about.stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-black text-white">{s.value}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value props                                                          */
/* ------------------------------------------------------------------ */

export function ValueProps() {
  const config = useStore();
  const sec = config.sections.valueProps;
  if (!sec.enabled || sec.items.length === 0) return null;

  return (
    <section className="border-b border-[color:var(--store-border)] bg-white py-8">
      <Container>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {sec.items.map((it) => (
            <li key={it.title} className="flex items-start gap-3">
              <ValueIcon kind={it.icon} />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[color:var(--store-fg)]">{it.title}</div>
                <p className="mt-1 hidden text-[11px] leading-5 text-[color:var(--store-muted)] sm:block">{it.copy}</p>
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
    <div className="flex h-10 w-10 flex-none items-center justify-center bg-red-50 text-[color:var(--store-primary)]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
        {kind === "shipping" && <><rect x="2" y="7" width="13" height="10" rx="1.5" /><path d="M15 10h4l2 3v4h-6" /><circle cx="6.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>}
        {kind === "support" && <><path d="M21 12a9 9 0 1 0-3 6.7L21 21l-2.3-3a9 9 0 0 0 2.3-6Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>}
        {kind === "returns" && <><path d="M3 7h13a4 4 0 0 1 0 8H8" /><polyline points="7 11 3 7 7 3" /></>}
        {kind === "secure" && <><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="m9 12 2 2 4-4" /></>}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Categories                                                           */
/* ------------------------------------------------------------------ */

export function Categories() {
  const config = useStore();
  const sec = config.sections.categories;
  if (!sec.enabled) return null;
  const items = sec.limit ? config.categories.slice(0, sec.limit) : config.categories;

  return (
    <section className="bg-gray-50 py-14">
      <Container>
        <SectionHeading
          title={sec.title}
          subtitle={sec.subtitle}
          action={
            <Link href="/templates/ecommerce-2/preview/shop"
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--store-primary)] hover:underline">
              View all →
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/templates/ecommerce-2/preview/collections/${c.handle}`}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="160px" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">Shop now</span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs font-bold uppercase tracking-wider text-[color:var(--store-fg)] group-hover:text-[color:var(--store-primary)] transition-colors">
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured products                                                    */
/* ------------------------------------------------------------------ */

export function FeaturedProducts() {
  const config = useStore();
  const sec = config.sections.featuredProducts;
  if (!sec.enabled) return null;
  const items = featuredProducts(config, sec.limit ?? 8);

  return (
    <section className="bg-white py-14">
      <Container>
        <SectionHeading
          title={sec.title}
          subtitle={sec.subtitle}
          action={
            <LinkButton href="/templates/ecommerce-2/preview/shop" variant="outline" size="sm">
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
/* Banner offer                                                         */
/* ------------------------------------------------------------------ */

export function BannerOffer() {
  const config = useStore();
  const sec = config.sections.bannerOffer;
  if (!sec.enabled) return null;

  return (
    <section className="bg-gray-50 py-14">
      <Container>
        <div className="relative overflow-hidden">
          {sec.image && (
            <div className="relative aspect-[21/6] overflow-hidden">
              <Image src={sec.image} alt={sec.title} fill className="object-cover object-center" sizes="(min-width: 768px) 80vw, 100vw" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-10">
                  {sec.eyebrow && (
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-300">{sec.eyebrow}</p>
                  )}
                  <h3 className="mt-2 max-w-xl text-3xl font-black uppercase leading-tight text-white md:text-4xl">{sec.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-gray-300">{sec.subtitle}</p>
                  <Link
                    href={sec.ctaHref}
                    className="mt-5 inline-flex items-center gap-2 bg-[color:var(--store-primary)] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:opacity-90"
                  >
                    {sec.ctaLabel} →
                  </Link>
                </div>
              </div>
            </div>
          )}
          {!sec.image && (
            <div className="bg-[color:var(--store-primary)] p-10 text-white md:p-14">
              {sec.eyebrow && <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">{sec.eyebrow}</p>}
              <h3 className="mt-2 text-3xl font-black uppercase leading-tight md:text-4xl">{sec.title}</h3>
              <p className="mt-2 max-w-xl text-sm text-white/80">{sec.subtitle}</p>
              <Link href={sec.ctaHref}
                className="mt-5 inline-flex items-center gap-2 bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-[color:var(--store-primary)] transition hover:opacity-90">
                {sec.ctaLabel} →
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                         */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const config = useStore();
  const sec = config.sections.testimonials;
  if (!sec.enabled) return null;

  return (
    <section className="bg-gray-50 py-14">
      <Container>
        <SectionHeading title={sec.title} align="center" />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {sec.items.map((t, i) => (
            <li key={i} className="border border-[color:var(--store-border)] bg-white p-6">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden className="text-[color:var(--store-primary)]">
                <path d="M0 18V11.4c0-2.7.6-4.9 1.7-6.7C2.8 3 4.6 1.4 7 0l1.4 2c-1.6 1-2.8 2.1-3.6 3.4-.7 1.2-1.1 2.6-1.2 4.2H8v8.4H0zm12 0V11.4c0-2.7.6-4.9 1.7-6.7C14.8 3 16.6 1.4 19 0l1.4 2c-1.6 1-2.8 2.1-3.6 3.4-.7 1.2-1.1 2.6-1.2 4.2H20v8.4h-8z" fill="currentColor" />
              </svg>
              <blockquote className="mt-4 text-sm leading-6 text-[color:var(--store-fg)]">{t.quote}</blockquote>
              <div className="mt-4 text-xs font-bold text-[color:var(--store-muted)]">
                — {t.author}{t.role ? `, ${t.role}` : ""}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                           */
/* ------------------------------------------------------------------ */

export function Newsletter() {
  const config = useStore();
  const sec = config.sections.newsletter;
  if (!sec.enabled) return null;

  return (
    <section className="bg-[color:var(--store-primary)] px-4 py-14 sm:px-6 lg:px-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Left */}
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{sec.title}</h3>
              <p className="mt-1 max-w-sm text-sm text-red-200">{sec.subtitle}</p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full sm:max-w-md">
            <form onSubmit={(e) => e.preventDefault()} className="flex overflow-hidden shadow-lg">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 bg-white px-5 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button type="submit"
                className="flex items-center gap-2 bg-gray-900 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                {sec.ctaLabel}
              </button>
            </form>
            <p className="mt-2 text-xs text-red-200">No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
