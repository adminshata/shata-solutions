"use client";

import Image from "next/image";
import { useSite } from "@/lib/shata-cafe/context";
import { Container, PageBanner, SectionHeading } from "@/components/templates/shata-cafe/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-cafe/ui/Button";

const BASE = "/templates/cafe1/preview";

export default function AboutPage() {
  const config = useSite();
  const a = config.sections.about;
  const stats = config.sections.stats;

  return (
    <>
      <PageBanner
        title="Our Story"
        subtitle={config.tagline}
        crumbs={[
          { label: "Home", href: BASE },
          { label: "About" },
        ]}
        bg="/templates/shata-cafe/bg/about_bg.jpg"
      />

      {/* Hero split */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative hidden sm:block">
              {a.image && (
                <div className="relative h-80 lg:h-[460px] overflow-hidden rounded-[var(--cafe-radius)] shadow-xl">
                  <Image src={a.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" unoptimized />
                </div>
              )}
              {a.imageSecondary && (
                <div className="absolute -bottom-8 -right-6 h-44 w-52 overflow-hidden rounded-[var(--cafe-radius)] border-4 border-[color:var(--cafe-bg)] shadow-xl">
                  <Image src={a.imageSecondary} alt="" fill className="object-cover" sizes="208px" unoptimized />
                </div>
              )}
              <div className="absolute -top-4 -left-4 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[color:var(--cafe-accent)] text-white shadow-lg">
                <span className="text-2xl font-black leading-none">8+</span>
                <span className="text-[9px] font-bold uppercase tracking-wider leading-tight text-center">Years<br/>Open</span>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow={a.eyebrow} title={a.title} />
              <p className="mt-5 text-[color:var(--cafe-muted)] leading-7 text-[15px]">{a.body}</p>
              {a.checkpoints && a.checkpoints.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {a.checkpoints.map((cp) => (
                    <li key={cp} className="flex items-start gap-3">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--cafe-accent)]/15 text-[color:var(--cafe-accent)] text-[10px] font-bold">✓</span>
                      <span className="text-sm text-[color:var(--cafe-fg)]">{cp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats bar */}
      {stats.items.length > 0 && (
        <section
          className="relative py-16"
          style={stats.backgroundImage ? {
            backgroundImage: `url(${stats.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          } : { background: "var(--cafe-primary)" }}
        >
          <div className="absolute inset-0 bg-[color:var(--cafe-primary)]/80" />
          <Container className="relative z-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center text-white">
              {stats.items.map((s) => (
                <div key={s.label}>
                  <div className="text-5xl font-black text-[color:var(--cafe-accent)]">{s.value}</div>
                  <div className="mt-2 text-sm text-white/70 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Story block */}
      <section className="py-16 md:py-20 bg-[color:var(--cafe-surface)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <SectionHeading eyebrow="Our Journey" title="How Avenue Café Began" />
              <p className="mt-5 text-[color:var(--cafe-muted)] leading-8 text-[15px]">
                {a.body}
              </p>
              <p className="mt-4 text-[color:var(--cafe-muted)] leading-8 text-[15px]">
                Every morning we open our doors, we recommit to the principles that got us here: quality ingredients, warmth in service, and a space where people genuinely want to spend time. The menu evolves with the seasons, but the spirit stays the same.
              </p>
            </div>
            <aside className="space-y-4">
              <div className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white p-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--cafe-accent)] mb-3">Our Philosophy</div>
                <ul className="space-y-3">
                  {["Locally sourced where possible", "House-baked every morning", "Zero-waste kitchen policy", "Community-first hospitality", "Seasonal specials, always"].map((v) => (
                    <li key={v} className="flex items-start gap-2 text-sm text-[color:var(--cafe-fg)]">
                      <span className="mt-1 text-[color:var(--cafe-accent)] text-xs">◆</span>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Story image */}
              <div className="relative h-52 overflow-hidden rounded-[var(--cafe-radius)] shadow-md">
                <Image src="/templates/shata-cafe/about/story.jpg" alt="Our kitchen" fill className="object-cover" sizes="340px" unoptimized />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container className="text-center">
          <SectionHeading title="Come Say Hello" align="center" />
          <p className="mx-auto mt-3 max-w-md text-sm text-[color:var(--cafe-muted)]">
            Walk-ins always welcome. Reservations recommended on weekends and for groups over four.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <LinkButton href={`${BASE}/contact`}>Book a Table →</LinkButton>
            <LinkButton href={`${BASE}/menu`} variant="outline">Explore the Menu</LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
