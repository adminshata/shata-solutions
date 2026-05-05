"use client";

import { useSite } from "@/lib/cafe1/context";
import { Container, PageBanner, SectionHeading } from "@/components/templates/cafe1/ui/Atoms";
import { LinkButton } from "@/components/templates/cafe1/ui/Button";

const BASE = "/templates/cafe-1/preview";

const BENEFITS = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Our Story",
    text:  "Founded with a love for great food and warm hospitality.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Made With Love",
    text:  "Every dish is crafted with care, using the freshest local ingredients.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Our Team",
    text:  "Passionate chefs and welcoming staff dedicated to your experience.",
  },
];

export default function AboutPage() {
  const config = useSite();
  const { about } = config.sections;

  return (
    <>
      <PageBanner
        title="About Us"
        crumbs={[
          { label: "Home", href: BASE },
          { label: "About Us" },
        ]}
      />

      {/* Benefits */}
      <section className="py-20 bg-[color:var(--c1-light)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BENEFITS.map((b) => (
              <div key={b.title} className="text-center">
                <div className="flex justify-center mb-5 text-[color:var(--c1-accent)]">{b.icon}</div>
                <h4
                  className="text-lg font-bold text-[color:var(--c1-header)] mb-2"
                  style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
                >
                  {b.title}
                </h4>
                <p className="text-sm text-[color:var(--c1-body)] leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Story section */}
      {about.enabled && (
        <section className="py-20 bg-[color:var(--c1-primary)]">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading subtitle={about.subtitle} title={about.heading} />
              <p className="text-[color:var(--c1-body)] leading-relaxed text-base">{about.body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <LinkButton href={`${BASE}/menu`} variant="primary">Explore Our Menu</LinkButton>
                <LinkButton href={`${BASE}/reservation`} variant="outline">Make a Reservation</LinkButton>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Contact bar */}
      <section className="py-12 bg-[color:var(--c1-light)] border-t border-[color:var(--c1-primary)]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c1-accent)] mb-1">Phone</p>
              <a href={`tel:${config.contact.phone}`} className="text-sm font-semibold text-[color:var(--c1-header)] hover:text-[color:var(--c1-accent)] transition-colors">
                {config.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c1-accent)] mb-1">Address</p>
              <p className="text-sm text-[color:var(--c1-body)]">{config.contact.address}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c1-accent)] mb-1">Hours</p>
              <p className="text-sm text-[color:var(--c1-body)]">
                {config.contact.hours[0]?.day} {config.contact.hours[0]?.time}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
