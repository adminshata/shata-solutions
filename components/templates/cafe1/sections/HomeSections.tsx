"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSite } from "@/lib/cafe1/context";
import { Container, SectionHeading } from "../ui/Atoms";
import { LinkButton } from "../ui/Button";

const BASE = "/templates/cafe-1/preview";

const CATEGORIES = [
  { handle: "starters",   label: "Starters" },
  { handle: "breakfasts", label: "Breakfasts" },
  { handle: "desserts",   label: "Desserts" },
  { handle: "beverages",  label: "Beverages" },
];

const BADGE_CLS: Record<string, string> = {
  new:      "bg-green-100 text-green-800",
  popular:  "bg-amber-100 text-amber-800",
  spicy:    "bg-red-100 text-red-700",
  vegan:    "bg-emerald-100 text-emerald-700",
  seasonal: "bg-blue-100 text-blue-700",
};

/* ── Hero ── */
export function HeroSection() {
  const { sections, brand, navigation } = useSite();
  const { hero } = sections;
  const reserveHref = navigation.find((n) => n.label.toLowerCase().includes("reserv"))?.href ?? `${BASE}/reservation`;
  return (
    <section className="relative flex min-h-[520px] items-center justify-center bg-[color:var(--c1-primary)] overflow-hidden">
      {/* decorative diagonal */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[color:var(--c1-accent)] opacity-5 skew-x-[-12deg] translate-x-1/4" />
      </div>
      <Container className="relative z-10 py-24 text-center">
        <span className="block text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--c1-accent)] mb-4">
          {hero.subtitle}
        </span>
        <h1
          className="text-5xl sm:text-6xl font-bold text-[color:var(--c1-header)] leading-tight mb-8"
          style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
        >
          {hero.heading}
        </h1>
        <LinkButton href={reserveHref} variant="accent">
          {hero.ctaLabel}
        </LinkButton>
      </Container>
    </section>
  );
}

/* ── Offer banner ── */
export function OfferSection() {
  const { sections } = useSite();
  const { offer } = sections;
  if (!offer.enabled) return null;
  return (
    <section className="bg-[color:var(--c1-accent)] text-white py-12">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
          >
            {offer.heading}
          </h3>
          <p className="mt-1 text-sm opacity-90 font-semibold tracking-wide">{offer.subtitle}</p>
        </div>
        <LinkButton href={`${BASE}/reservation`} variant="outline" className="border-white text-white hover:bg-white hover:text-[color:var(--c1-accent)]">
          Reserve Now
        </LinkButton>
      </Container>
    </section>
  );
}

/* ── Menu Preview (tabbed) ── */
export function MenuPreviewSection() {
  const { sections, menuItems, navigation } = useSite();
  const { menu } = sections;
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].handle);

  if (!menu.enabled) return null;

  const menuHref = navigation.find((n) => n.label.toLowerCase() === "menu")?.href ?? `${BASE}/menu`;
  const filtered = menuItems.filter((item) => item.active !== false && item.category === activeTab);

  return (
    <section className="py-20 bg-[color:var(--c1-light)]">
      <Container>
        <SectionHeading subtitle={menu.subtitle} title={menu.heading} />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.handle}
              type="button"
              onClick={() => setActiveTab(cat.handle)}
              className={`px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase rounded-[var(--c1-radius,4px)] transition-colors ${
                activeTab === cat.handle
                  ? "bg-[color:var(--c1-accent)] text-white"
                  : "border border-[color:var(--c1-primary)] text-[color:var(--c1-body)] hover:border-[color:var(--c1-accent)] hover:text-[color:var(--c1-accent)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-[color:var(--c1-body)] opacity-60 py-8">
            No items in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.slice(0, 8).map((item) => (
              <Link
                key={item.id}
                href={`${BASE}/menu/${item.handle}`}
                className="group flex items-center gap-4 bg-white border border-[color:var(--c1-primary)] rounded-[var(--c1-radius,4px)] p-4 hover:shadow-md transition-shadow"
              >
                {/* Image placeholder */}
                <div className="relative w-16 h-16 shrink-0 rounded bg-[color:var(--c1-primary)] overflow-hidden">
                  {item.images[0] ? (
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[color:var(--c1-accent)] opacity-40 text-lg">
                      ◈
                    </div>
                  )}
                  {item.badge && (
                    <span className={`absolute top-0.5 left-0.5 text-[8px] font-bold uppercase px-1 rounded ${BADGE_CLS[item.badge] ?? "bg-gray-100 text-gray-700"}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-[color:var(--c1-header)] truncate group-hover:text-[color:var(--c1-accent)] transition-colors">
                      {item.name}
                    </p>
                    <span className="shrink-0 text-sm font-bold text-[color:var(--c1-accent)]">{item.price}</span>
                  </div>
                  {(item.shortDescription || item.description) && (
                    <p className="mt-0.5 text-xs text-[color:var(--c1-body)] opacity-70 line-clamp-1">
                      {item.shortDescription || item.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <LinkButton href={menuHref} variant="outline">
            View Full Menu →
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

/* ── Private Dining CTA ── */
export function PrivateDiningSection() {
  const { sections } = useSite();
  const { privateDining } = sections;
  if (!privateDining.enabled) return null;
  return (
    <section className="py-20 bg-[color:var(--c1-primary)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <span className="block text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--c1-accent)] mb-3">
            {privateDining.subtitle}
          </span>
          <h2
            className="text-3xl font-bold text-[color:var(--c1-header)] mb-6"
            style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
          >
            {privateDining.heading}
          </h2>
          <LinkButton href={`${BASE}/reservation`} variant="primary">
            {privateDining.ctaLabel}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

/* ── Testimonials ── */
export function TestimonialsSection() {
  const { sections } = useSite();
  const { testimonials } = sections;
  if (!testimonials.enabled) return null;
  return (
    <section className="py-20 bg-[color:var(--c1-header)]">
      <Container>
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-[color:var(--c1-primary)]"
            style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
          >
            {testimonials.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.items.map((t, i) => (
            <div
              key={i}
              className="bg-[color:var(--c1-primary)] bg-opacity-10 rounded-[var(--c1-radius,4px)] p-7 border border-white/10"
            >
              {/* Quote mark */}
              <div className="text-4xl text-[color:var(--c1-accent)] opacity-60 leading-none mb-4 font-serif">&ldquo;</div>
              <p className="text-sm text-[color:var(--c1-primary)] opacity-90 leading-relaxed italic">
                {t.text}
              </p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-[color:var(--c1-accent)]">{t.name}</p>
                {t.role && (
                  <p className="text-[11px] text-[color:var(--c1-primary)] opacity-60 mt-0.5">{t.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Booking CTA ── */
export function BookingCTASection() {
  const { sections } = useSite();
  const { booking } = sections;
  if (!booking.enabled) return null;
  return (
    <section className="py-20 bg-[color:var(--c1-light)]">
      <Container>
        <div className="rounded-[var(--c1-radius,4px)] bg-[color:var(--c1-accent)] text-white px-8 py-14 text-center">
          <span className="block text-xs font-bold tracking-[0.3em] uppercase opacity-80 mb-3">
            {booking.subtitle}
          </span>
          <h2
            className="text-3xl font-bold mb-7"
            style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
          >
            {booking.heading}
          </h2>
          <LinkButton href={`${BASE}/reservation`} variant="outline" className="border-white text-white hover:bg-white hover:text-[color:var(--c1-accent)]">
            {booking.ctaLabel}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

/* ── Full home page composition ── */
export function HomeSections() {
  return (
    <>
      <HeroSection />
      <OfferSection />
      <MenuPreviewSection />
      <PrivateDiningSection />
      <TestimonialsSection />
      <BookingCTASection />
    </>
  );
}

export const SECTION_MAP: Record<string, React.FC> = {
  hero:           HeroSection,
  offer:          OfferSection,
  "menu-preview": MenuPreviewSection,
  "private-dining": PrivateDiningSection,
  testimonials:   TestimonialsSection,
  booking:        BookingCTASection,
};
