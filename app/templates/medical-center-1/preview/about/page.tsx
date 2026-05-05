"use client";

import Image from "next/image";
import { useSite } from "@/lib/shata-medical/context";
import { Container, PageBanner, SectionHeading } from "@/components/templates/shata-medical/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-medical/ui/Button";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function AboutPage() {
  const config = useSite();
  const a = config.about;

  return (
    <>
      <PageBanner
        title="About Us"
        subtitle={config.tagline}
        crumbs={[
          { label: "Home", href: BASE_PATH },
          { label: "About" },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      {/* Hero section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {a.image && (
              <div className="relative h-72 lg:h-[420px] overflow-hidden rounded-[var(--med-radius)] shadow-lg">
                <Image src={a.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" unoptimized />
              </div>
            )}
            <div>
              <SectionHeading eyebrow="About Us" title={a.title} />
              <p className="mt-4 text-[color:var(--med-muted)] leading-7">{a.subtitle}</p>
              {a.mission && (
                <div className="mt-6 rounded-[var(--med-radius)] border-l-4 border-[color:var(--med-primary)] bg-[color:var(--med-surface)] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-primary)] mb-1">Our Mission</div>
                  <p className="text-sm text-[color:var(--med-fg)] leading-6">{a.mission}</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      {a.stats.length > 0 && (
        <section className="bg-[color:var(--med-primary)] py-14">
          <Container>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center text-white">
              {a.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-bold">{s.value}</div>
                  <div className="mt-1 text-sm text-blue-200">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Story */}
      <section className="py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
            <article>
              <SectionHeading title="Our Story" />
              <p className="mt-5 text-[color:var(--med-muted)] leading-8 whitespace-pre-line">{a.story}</p>
            </article>
            {a.vision && (
              <aside className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-6 self-start">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-primary)] mb-2">Our Vision</div>
                <p className="text-sm text-[color:var(--med-fg)] leading-6">{a.vision}</p>
              </aside>
            )}
          </div>
        </Container>
      </section>

      {/* Values */}
      {a.values.length > 0 && (
        <section className="border-t border-[color:var(--med-border)] bg-[color:var(--med-surface)] py-16">
          <Container>
            <SectionHeading eyebrow="What We Stand For" title="Our Core Values" align="center" />
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {a.values.map((v) => (
                <li key={v.title} className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white p-6">
                  <div className="mb-3 h-1 w-10 rounded bg-[color:var(--med-primary)]" />
                  <div className="font-bold text-[color:var(--med-fg)]">{v.title}</div>
                  <p className="mt-2 text-sm text-[color:var(--med-muted)] leading-6">{v.copy}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Doctors teaser */}
      <section className="py-16">
        <Container className="text-center">
          <SectionHeading title="Ready to Meet Our Team?" align="center" />
          <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--med-muted)]">
            Our board-certified specialists are ready to help. Browse profiles and book directly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <LinkButton href={`${BASE_PATH}/doctors`}>Meet Our Doctors →</LinkButton>
            <LinkButton href={`${BASE_PATH}/appointment/request`} variant="outline">Book Appointment</LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
