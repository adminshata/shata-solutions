"use client";

import { useState, useMemo } from "react";
import { useSite } from "@/lib/shata-cafe/context";
import { Container, PageBanner, EmptyState } from "@/components/templates/shata-cafe/ui/Atoms";
import { MenuItemGrid } from "@/components/templates/shata-cafe/menu/MenuItemCard";

const BASE = "/templates/cafe1/preview";

export default function MenuPage() {
  const config = useSite();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    const visible = config.menuItems.filter((m) => m.active !== false);
    return activeCategory === "all"
      ? visible
      : visible.filter((m) => m.category === activeCategory);
  }, [config.menuItems, activeCategory]);

  return (
    <>
      <PageBanner
        title="Our Menu"
        subtitle="Handcrafted with seasonal ingredients — served fresh every day."
        crumbs={[
          { label: "Home", href: BASE },
          { label: "Menu" },
        ]}
        bg="/templates/shata-cafe/bg/menu_bg.jpg"
      />

      {/* Category filter bar */}
      <section className="sticky top-16 z-30 border-b border-[color:var(--cafe-border)] bg-[color:var(--cafe-bg)]/95 backdrop-blur">
        <Container className="py-3">
          <div className="flex flex-wrap gap-2">
            <FilterPill active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              All
            </FilterPill>
            {config.menuCategories.map((cat) => (
              <FilterPill
                key={cat.id}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </FilterPill>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <p className="mb-6 text-sm text-[color:var(--cafe-muted)]">
          Showing{" "}
          <span className="font-semibold text-[color:var(--cafe-fg)]">{filtered.length}</span> item
          {filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && (
            <>
              {" "}in{" "}
              <span className="font-semibold text-[color:var(--cafe-fg)]">
                {config.menuCategories.find((c) => c.id === activeCategory)?.name}
              </span>
            </>
          )}
        </p>

        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing here yet."
            copy="Try a different category or check back soon."
            action={
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] px-4 py-2 text-sm font-semibold hover:bg-[color:var(--cafe-surface)]"
              >
                Show all
              </button>
            }
          />
        ) : (
          <MenuItemGrid items={filtered} basePath={BASE} />
        )}
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
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
        active
          ? "bg-[color:var(--cafe-primary)] text-white"
          : "border border-[color:var(--cafe-border)] bg-white text-[color:var(--cafe-fg)] hover:border-[color:var(--cafe-accent)] hover:text-[color:var(--cafe-accent)]"
      }`}
    >
      {children}
    </button>
  );
}
