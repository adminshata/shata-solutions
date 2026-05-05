"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import { useSite } from "@/lib/cafe1/context";
import { Container } from "@/components/templates/cafe1/ui/Atoms";
import { LinkButton } from "@/components/templates/cafe1/ui/Button";
import { MenuItemCard } from "@/components/templates/cafe1/menu/MenuItemCard";

const BASE = "/templates/cafe-1/preview";

const BADGE_CLS: Record<string, string> = {
  new:      "bg-green-100 text-green-800",
  popular:  "bg-amber-100 text-amber-800",
  spicy:    "bg-red-100 text-red-700",
  vegan:    "bg-emerald-100 text-emerald-700",
  seasonal: "bg-blue-100 text-blue-700",
};

export default function MenuItemPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const config = useSite();
  const item = config.menuItems.find((m) => m.handle === handle);

  if (!item || item.active === false) notFound();

  const related = config.menuItems
    .filter((m) => m.id !== item.id && m.category === item.category && m.active !== false)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[color:var(--c1-primary)] py-4">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-[color:var(--c1-body)]">
            <Link href={BASE} className="hover:text-[color:var(--c1-accent)] transition-colors">Home</Link>
            <span className="text-[color:var(--c1-accent)]">/</span>
            <Link href={`${BASE}/menu`} className="hover:text-[color:var(--c1-accent)] transition-colors">Menu</Link>
            <span className="text-[color:var(--c1-accent)]">/</span>
            <span className="text-[color:var(--c1-header)] font-medium capitalize">{item.category}</span>
            <span className="text-[color:var(--c1-accent)]">/</span>
            <span className="text-[color:var(--c1-header)] font-semibold">{item.name}</span>
          </nav>
        </Container>
      </div>

      {/* Item detail */}
      <section className="py-16 bg-[color:var(--c1-light)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-[var(--c1-radius,4px)] overflow-hidden bg-[color:var(--c1-primary)]">
              {item.images[0] ? (
                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-[color:var(--c1-accent)] opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1
                  className="text-3xl font-bold text-[color:var(--c1-header)]"
                  style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
                >
                  {item.name}
                </h1>
                {item.badge && (
                  <span className={`mt-1 shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${BADGE_CLS[item.badge] ?? "bg-gray-100 text-gray-700"}`}>
                    {item.badge}
                  </span>
                )}
              </div>

              <p className="text-2xl font-bold text-[color:var(--c1-accent)] mb-6">{item.price}</p>

              {(item.description || item.shortDescription) && (
                <p className="text-[color:var(--c1-body)] leading-relaxed mb-6">
                  {item.description || item.shortDescription}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <LinkButton href={`${BASE}/reservation`} variant="accent">
                  Reserve a Table
                </LinkButton>
                <LinkButton href={`${BASE}/menu`} variant="outline">
                  ← Back to Menu
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related items */}
      {related.length > 0 && (
        <section className="py-14 bg-[color:var(--c1-primary)]">
          <Container>
            <h2
              className="text-xl font-bold text-[color:var(--c1-header)] mb-8 text-center"
              style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
            >
              More from {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r) => (
                <MenuItemCard key={r.id} item={r} href={`${BASE}/menu/${r.handle}`} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
