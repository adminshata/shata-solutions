"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useSite } from "@/lib/shata-cafe/context";
import { findMenuItem, menuByCategory } from "@/lib/shata-cafe/utils";
import { Container, PageBanner, MenuBadge } from "@/components/templates/shata-cafe/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-cafe/ui/Button";
import { MenuItemCard } from "@/components/templates/shata-cafe/menu/MenuItemCard";

const BASE = "/templates/cafe1/preview";

export default function MenuItemDetailPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const config = useSite();
  const item = findMenuItem(config, handle);
  if (!item) notFound();

  const related = menuByCategory(config, item.category)
    .filter((m) => m.id !== item.id)
    .slice(0, 4);

  const catName = config.menuCategories.find((c) => c.id === item.category)?.name ?? item.category;

  return (
    <>
      <PageBanner
        title={item.name}
        subtitle={item.shortDescription}
        crumbs={[
          { label: "Home",  href: BASE },
          { label: "Menu",  href: `${BASE}/menu` },
          { label: catName, href: `${BASE}/menu` },
          { label: item.name },
        ]}
        bg="/templates/shata-cafe/bg/menu_bg.jpg"
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main */}
          <div>
            {/* Hero image */}
            {item.images[0] && (
              <div className="relative h-64 md:h-80 overflow-hidden rounded-[var(--cafe-radius)] mb-8 shadow-md">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  unoptimized
                />
                {item.badge && (
                  <div className="absolute left-4 top-4">
                    <MenuBadge kind={item.badge} />
                  </div>
                )}
              </div>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-[color:var(--cafe-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="text-[color:var(--cafe-accent)]">◆</span>
                <span className="font-semibold text-[color:var(--cafe-fg)]">{catName}</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold text-[color:var(--cafe-accent)] text-base">
                {item.price}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[color:var(--cafe-fg)] mb-3">About This Dish</h2>
            <p className="text-[color:var(--cafe-muted)] leading-7">{item.description}</p>

            {/* Second image */}
            {item.images[1] && (
              <div className="relative mt-8 h-56 md:h-72 overflow-hidden rounded-[var(--cafe-radius)] shadow-sm">
                <Image
                  src={item.images[1]}
                  alt={`${item.name} — detail`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Order / reservation CTA */}
            <div className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--cafe-muted)] mb-3">
                Enjoying this dish?
              </div>
              <p className="text-sm text-[color:var(--cafe-muted)] mb-4 leading-6">
                Book a table and let us serve it to you fresh — reservations recommended on weekends.
              </p>
              <LinkButton href={`${BASE}/contact`} full>
                Reserve a Table →
              </LinkButton>
              <LinkButton href={`${BASE}/menu`} variant="outline" full className="mt-2">
                Back to Menu
              </LinkButton>
            </div>

            {/* Hours */}
            <div className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--cafe-muted)] mb-3">
                Opening Hours
              </div>
              <ul className="space-y-1.5 text-sm">
                {config.sections.reservation.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-[color:var(--cafe-muted)]">{h.day}</span>
                    <span className="font-medium text-[color:var(--cafe-fg)]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other items in category */}
            {related.length > 0 && (
              <div className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--cafe-muted)] mb-3">
                  More {catName}
                </div>
                <ul className="space-y-1">
                  {related.map((m) => (
                    <li key={m.id}>
                      <Link
                        href={`${BASE}/menu/${m.handle}`}
                        className="flex items-center justify-between py-1.5 text-sm text-[color:var(--cafe-fg)] hover:text-[color:var(--cafe-accent)] transition-colors"
                      >
                        <span>{m.name}</span>
                        <span className="text-[color:var(--cafe-accent)] font-semibold text-[13px]">{m.price}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Related grid */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[color:var(--cafe-fg)] mb-6">
              More from {catName}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((m) => (
                <MenuItemCard key={m.id} item={m} basePath={BASE} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
