"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/shata-store/context";
import { Breadcrumbs, Container, SectionHeading } from "@/components/templates/shata-store/ui/Atoms";
import { ProductGrid } from "@/components/templates/shata-store/product/ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

export default function ShopPage() {
  const config = useStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const items = useMemo(() => {
    const visible = config.products.filter((p) => p.active !== false);
    const filtered = activeCategory === "all"
      ? visible
      : visible.filter((p) => p.category === activeCategory);
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":  sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "newest":     sorted.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0)); break;
      default:           sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return sorted;
  }, [config.products, activeCategory, sort]);

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/templates/ecommerce/preview" }, { label: "Shop" }]} />
      </Container>

      <Container className="py-8">
        <SectionHeading
          title="The full collection"
          subtitle={`${config.products.length} pieces · curated for everyday wear`}
        />
      </Container>

      <Container>
        <div className="flex flex-col gap-3 border-y border-[color:var(--store-border)] py-3 md:flex-row md:items-center md:justify-between">
          <ul className="-mx-1 flex flex-wrap gap-1">
            <FilterPill active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>All</FilterPill>
            {config.categories.map((c) => (
              <FilterPill key={c.id} active={activeCategory === c.handle} onClick={() => setActiveCategory(c.handle)}>
                {c.name}
              </FilterPill>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-1.5 text-sm text-[color:var(--store-fg)] outline-none focus:border-[color:var(--store-accent)]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
            </select>
          </div>
        </div>
      </Container>

      <Container className="py-8">
        {items.length === 0 ? (
          <div className="rounded-[var(--store-radius)] border border-dashed border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-6 py-14 text-center">
            <div className="text-base font-semibold">No products match.</div>
            <p className="mt-1 text-sm text-[color:var(--store-muted)]">Try a different category.</p>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="mt-5 rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-4 py-2 text-xs font-semibold"
            >
              View all
            </button>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </Container>

      <Container className="py-12">
        <div className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6 text-sm text-[color:var(--store-muted)] sm:flex sm:items-center sm:justify-between">
          <span>Looking for something specific?</span>
          <Link href="/templates/ecommerce/preview/contact" className="font-semibold text-[color:var(--store-fg)] hover:underline">
            Contact our team →
          </Link>
        </div>
      </Container>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
          active
            ? "bg-[color:var(--store-fg)] text-[color:var(--store-bg)]"
            : "bg-[color:var(--store-surface)] text-[color:var(--store-fg)] hover:bg-black/[0.04]"
        }`}
      >
        {children}
      </button>
    </li>
  );
}
