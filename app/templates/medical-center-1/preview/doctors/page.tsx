"use client";

import { useState, useMemo } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { Container, PageBanner } from "@/components/templates/shata-medical/ui/Atoms";
import { DoctorGrid } from "@/components/templates/shata-medical/doctor/DoctorCard";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function DoctorsPage() {
  const config = useSite();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    const visible = config.doctors.filter((d) => d.active !== false);
    return activeFilter === "all"
      ? visible
      : visible.filter((d) => d.department === activeFilter);
  }, [config.doctors, activeFilter]);

  const deptOptions = config.departments.filter((dept) =>
    config.doctors.some((d) => d.department === dept.handle && d.active !== false)
  );

  return (
    <>
      <PageBanner
        title="Our Medical Team"
        subtitle="Board-certified specialists committed to evidence-based, patient-first care."
        crumbs={[
          { label: "Home", href: BASE_PATH },
          { label: "Doctors" },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      <section className="border-b border-[color:var(--med-border)] bg-white">
        <Container className="py-4">
          <div className="flex flex-wrap gap-2">
            <FilterPill active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>
              All Specialties
            </FilterPill>
            {deptOptions.map((dept) => (
              <FilterPill
                key={dept.id}
                active={activeFilter === dept.handle}
                onClick={() => setActiveFilter(dept.handle)}
              >
                {dept.name}
              </FilterPill>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <p className="mb-8 text-sm text-[color:var(--med-muted)]">
          <span className="font-semibold text-[color:var(--med-fg)]">{filtered.length}</span> doctor{filtered.length !== 1 ? "s" : ""} available
        </p>
        <DoctorGrid doctors={filtered} basePath={BASE_PATH} />
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
