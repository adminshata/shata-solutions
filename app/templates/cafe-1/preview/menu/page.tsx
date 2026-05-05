"use client";

import { useState } from "react";
import { useSite } from "@/lib/cafe1/context";
import { Container, PageBanner, EmptyState } from "@/components/templates/cafe1/ui/Atoms";
import { MenuItemCard } from "@/components/templates/cafe1/menu/MenuItemCard";

const BASE = "/templates/cafe-1/preview";

const ALL_CATS = [
  { handle: "all",        label: "All" },
  { handle: "starters",   label: "Starters" },
  { handle: "breakfasts", label: "Breakfasts" },
  { handle: "desserts",   label: "Desserts" },
  { handle: "beverages",  label: "Beverages" },
];

export default function MenuPage() {
  const config = useSite();
  const [activeTab, setActiveTab] = useState("all");

  const items = config.menuItems.filter(
    (item) => item.active !== false && (activeTab === "all" || item.category === activeTab)
  );

  return (
    <>
      <PageBanner
        title="Our Menu"
        crumbs={[
          { label: "Home", href: BASE },
          { label: "Menu" },
        ]}
      />

      <section className="py-16 bg-[color:var(--c1-light)]">
        <Container>
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {ALL_CATS.map((cat) => (
              <button
                key={cat.handle}
                type="button"
                onClick={() => setActiveTab(cat.handle)}
                className={`px-5 py-2 text-[11px] font-bold tracking-[0.15em] uppercase rounded-[var(--c1-radius,4px)] transition-colors ${
                  activeTab === cat.handle
                    ? "bg-[color:var(--c1-accent)] text-white"
                    : "border border-[color:var(--c1-primary)] text-[color:var(--c1-body)] hover:border-[color:var(--c1-accent)] hover:text-[color:var(--c1-accent)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {items.length === 0 ? (
            <EmptyState
              title="No items found"
              body="Try selecting a different category."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  href={`${BASE}/menu/${item.handle}`}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
