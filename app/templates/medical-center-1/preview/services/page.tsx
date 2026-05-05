"use client";

import { useState, useMemo } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { Container, PageBanner, EmptyState } from "@/components/templates/shata-medical/ui/Atoms";
import { ServiceGrid } from "@/components/templates/shata-medical/service/ServiceCard";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function ServicesPage() {
  const config = useSite();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    const visible = config.services.filter((s) => s.active !== false);
    return activeCategory === "all"
      ? visible
      : visible.filter((s) => s.category === activeCategory);
  }, [config.services, activeCategory]);

  return (
    <>
      <PageBanner
        title="Our Medical Services"
        subtitle="Expert specialist care across eight departments — all under one roof."
        crumbs={[
          { label: "Home", href: `${BASE_PATH}` },
          { label: "Services" },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      <section className="border-b border-[color:var(--med-border)] bg-white">
        <Container className="py-4">
          <div className="flex flex-wrap gap-2">
            <FilterPill active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              All Departments
            </FilterPill>
            {config.departments.map((dept) => (
              <FilterPill
                key={dept.id}
                active={activeCategory === dept.handle}
                onClick={() => setActiveCategory(dept.handle)}
              >
                {dept.name}
              </FilterPill>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <p className="mb-6 text-sm text-[color:var(--med-muted)]">
          Showing <span className="font-semibold text-[color:var(--med-fg)]">{filtered.length}</span> service{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && (
            <> in <span className="font-semibold text-[color:var(--med-fg)]">
              {config.departments.find((d) => d.handle === activeCategory)?.name}
            </span></>
          )}
        </p>

        {filtered.length === 0 ? (
          <EmptyState
            title="No services in this department yet."
            copy="Try selecting a different department."
            action={
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="rounded border border-[color:var(--med-border)] px-4 py-2 text-sm font-semibold hover:bg-[color:var(--med-surface)]"
              >
                Show all
              </button>
            }
          />
        ) : (
          <ServiceGrid services={filtered} basePath={BASE_PATH} />
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
          ? "bg-[color:var(--med-primary)] text-white"
          : "border border-[color:var(--med-border)] bg-white text-[color:var(--med-fg)] hover:border-[color:var(--med-primary)] hover:text-[color:var(--med-primary)]"
      }`}
    >
      {children}
    </button>
  );
}
