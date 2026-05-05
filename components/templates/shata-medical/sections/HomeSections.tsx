"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { featuredServices, featuredDoctors } from "@/lib/shata-medical/utils";
import type { SectionId } from "@/lib/shata-medical/types";
import { Container, SectionHeading, StarRating } from "@/components/templates/shata-medical/ui/Atoms";
import { LinkButton, Button } from "@/components/templates/shata-medical/ui/Button";
import { ServiceGrid } from "@/components/templates/shata-medical/service/ServiceCard";
import { DoctorGrid } from "@/components/templates/shata-medical/doctor/DoctorCard";

const BASE_PATH = "/templates/medical-center-1/preview";

/* ======================================================================
   HERO
   ====================================================================== */
export function HeroSection() {
  const config = useSite();
  const slides = config.sections.hero.slides;
  const [active, setActive] = useState(0);
  const slide = slides[active];
  if (!slide) return null;

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--med-primary)]/85 via-[color:var(--med-primary)]/60 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex h-full flex-col justify-center text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight whitespace-pre-line md:text-5xl lg:text-6xl">
            {slide.heading}
          </h1>
          <p className="mt-4 text-base text-blue-100 leading-7 max-w-xl md:text-lg">
            {slide.subheading}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {slide.cta && (
              <LinkButton href={slide.cta.href} size="lg">
                {slide.cta.label}
              </LinkButton>
            )}
            {slide.ctaSecondary && (
              <LinkButton href={slide.ctaSecondary.href} variant="white" size="lg">
                {slide.ctaSecondary.label}
              </LinkButton>
            )}
          </div>
        </div>
      </Container>

      {/* Slide dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ======================================================================
   DEPARTMENTS
   ====================================================================== */
export function DepartmentsSection() {
  const config = useSite();
  return (
    <section className="border-y border-[color:var(--med-border)] bg-white">
      <Container className="py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {config.departments.map((dept) => (
            <Link
              key={dept.id}
              href={`${BASE_PATH}/services`}
              className="group flex flex-col items-center gap-2 rounded-[var(--med-radius)] border border-transparent p-3 text-center hover:border-[color:var(--med-border)] hover:bg-[color:var(--med-surface)] transition-all"
            >
              {dept.icon && (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--med-surface)] group-hover:bg-[color:var(--med-primary)]/10 transition-colors">
                  <Image src={dept.icon} alt="" width={24} height={24} unoptimized />
                </span>
              )}
              <span className="text-[12px] font-semibold text-[color:var(--med-fg)] leading-tight">
                {dept.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   ABOUT
   ====================================================================== */
export function AboutSection() {
  const config = useSite();
  const a = config.sections.about;
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          {a.image && (
            <div className="relative h-72 lg:h-[420px] overflow-hidden rounded-[var(--med-radius)] shadow-lg">
              <Image src={a.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" unoptimized />
              {/* Floating badge */}
              <div className="absolute bottom-5 right-5 rounded-[var(--med-radius)] bg-[color:var(--med-primary)] px-4 py-3 text-white shadow-xl">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-[11px] font-medium text-blue-100">Years of Excellence</div>
              </div>
            </div>
          )}
          {/* Text */}
          <div>
            <SectionHeading eyebrow={a.eyebrow} title={a.title} />
            <p className="mt-4 text-[color:var(--med-muted)] leading-7">{a.body}</p>
            {a.checkpoints && a.checkpoints.length > 0 && (
              <ul className="mt-5 space-y-2.5">
                {a.checkpoints.map((cp) => (
                  <li key={cp} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--med-primary)]/10 text-[color:var(--med-primary)] text-xs">✓</span>
                    <span className="text-sm text-[color:var(--med-fg)]">{cp}</span>
                  </li>
                ))}
              </ul>
            )}
            {a.cta && (
              <div className="mt-7">
                <LinkButton href={a.cta.href}>{a.cta.label} →</LinkButton>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   STATS
   ====================================================================== */
export function StatsSection() {
  const config = useSite();
  const s = config.sections.stats;
  return (
    <section
      className="relative py-16"
      style={s.backgroundImage ? {
        backgroundImage: `url(${s.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      } : { background: "var(--med-primary)" }}
    >
      <div className="absolute inset-0 bg-[color:var(--med-primary)]/80" />
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {s.items.map((item) => (
            <div key={item.label} className="text-center text-white">
              {item.icon && (
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                  <Image src={item.icon} alt="" width={28} height={28} unoptimized />
                </div>
              )}
              <div className="text-4xl font-bold">{item.value}</div>
              <div className="mt-1 text-sm text-blue-200">{item.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   FEATURED SERVICES
   ====================================================================== */
export function FeaturedServicesSection() {
  const config = useSite();
  const s = config.sections.featuredServices;
  const services = featuredServices(config);
  if (services.length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-[color:var(--med-surface)]">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
          <LinkButton href={`${BASE_PATH}/services`} variant="outline" size="sm" className="shrink-0">
            All Services →
          </LinkButton>
        </div>
        <ServiceGrid services={services} basePath={BASE_PATH} />
      </Container>
    </section>
  );
}

/* ======================================================================
   DOCTORS
   ====================================================================== */
export function DoctorsSection() {
  const config = useSite();
  const s = config.sections.doctors;
  const doctors = featuredDoctors(config);
  if (doctors.length === 0) return null;
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
          <LinkButton href={`${BASE_PATH}/doctors`} variant="outline" size="sm" className="shrink-0">
            Meet All Doctors →
          </LinkButton>
        </div>
        <DoctorGrid doctors={doctors} basePath={BASE_PATH} />
      </Container>
    </section>
  );
}

/* ======================================================================
   PROCESS
   ====================================================================== */
export function ProcessSection() {
  const config = useSite();
  const p = config.sections.process;
  return (
    <section
      className="relative py-16 md:py-20"
      style={p.backgroundImage ? {
        backgroundImage: `url(${p.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : { background: "var(--med-primary)" }}
    >
      <div className="absolute inset-0 bg-[color:var(--med-primary)]/90" />
      <Container className="relative z-10">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} align="center" light />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {p.steps.map((step, i) => (
            <div key={i} className="text-center text-white">
              {step.icon && (
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Image src={step.icon} alt="" width={32} height={32} unoptimized />
                </div>
              )}
              <div className="text-5xl font-black text-white/20 leading-none mb-2">{step.number}</div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-blue-200 leading-6">{step.copy}</p>
              {i < p.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-white/30 text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   TESTIMONIALS
   ====================================================================== */
export function TestimonialsSection() {
  const config = useSite();
  const t = config.sections.testimonials;
  return (
    <section className="py-16 md:py-20 bg-[color:var(--med-surface)]">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white p-6 shadow-sm"
            >
              {item.rating && <StarRating value={item.rating} />}
              <p className="text-sm text-[color:var(--med-fg)] leading-7 italic">"{item.body}"</p>
              <div className="mt-auto flex items-center gap-3">
                {item.avatar && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={item.avatar} alt={item.author} fill className="object-cover" sizes="40px" unoptimized />
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-[color:var(--med-fg)]">{item.author}</div>
                  {item.role && (
                    <div className="text-[11px] text-[color:var(--med-muted)]">{item.role}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   CTA
   ====================================================================== */
export function CtaSection() {
  const config = useSite();
  const c = config.sections.cta;
  return (
    <section className="relative overflow-hidden py-20 min-h-[280px]">
      {c.image && (
        <>
          <Image src={c.image} alt="" fill className="object-cover" sizes="100vw" unoptimized />
          <div className="absolute inset-0 bg-[color:var(--med-primary)]/85" />
        </>
      )}
      {!c.image && <div className="absolute inset-0 bg-[color:var(--med-primary)]" />}
      <Container className="relative z-10 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">{c.title}</h2>
        {c.subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-base text-blue-100">{c.subtitle}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href={c.cta.href} variant="white" size="lg">
            {c.cta.label}
          </LinkButton>
          {c.ctaSecondary && (
            <LinkButton href={c.ctaSecondary.href} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[color:var(--med-primary)]">
              {c.ctaSecondary.label}
            </LinkButton>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   NEWSLETTER
   ====================================================================== */
export function NewsletterSection() {
  const config = useSite();
  const n = config.sections.newsletter;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    setEmail("");
  }

  return (
    <section className="bg-[color:var(--med-fg)] py-14">
      <Container className="text-center">
        <h2 className="text-2xl font-bold text-white">{n.title}</h2>
        {n.subtitle && <p className="mt-2 text-sm text-gray-400">{n.subtitle}</p>}
        {done ? (
          <p className="mt-6 text-[color:var(--med-accent)] font-semibold">
            ✓ You're subscribed. Thank you!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={n.placeholder ?? "Enter your email"}
              className="flex-1 rounded-[var(--med-radius)] border border-gray-600 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[color:var(--med-accent)]"
            />
            <Button type="submit" size="md">Subscribe</Button>
          </form>
        )}
      </Container>
    </section>
  );
}

/* ======================================================================
   Section map
   ====================================================================== */
export const SECTION_MAP: Record<SectionId, React.FC> = {
  "hero":              HeroSection,
  "departments":       DepartmentsSection,
  "about":             AboutSection,
  "stats":             StatsSection,
  "featured-services": FeaturedServicesSection,
  "doctors":           DoctorsSection,
  "process":           ProcessSection,
  "testimonials":      TestimonialsSection,
  "cta":               CtaSection,
  "newsletter":        NewsletterSection,
};
