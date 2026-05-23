"use client";

import Link from "next/link";
import {
  BASE,
  FIRM,
  STATS,
  PRACTICE_AREAS,
  ATTORNEYS,
  CASE_RESULTS,
  TESTIMONIALS,
} from "@/lib/multiLawyer1/data";

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050d1f]">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#050d1f] to-[#030912]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,168,76,0.08),transparent_60%)]" />
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      {/* Vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-40 grid gap-16 lg:grid-cols-2 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#c9a84c]/40 bg-[#c9a84c]/10 rounded-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.2em] uppercase">
              Established {FIRM.established} · New York
            </span>
          </div>

          <h1 className="ml-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            {FIRM.tagline.split(".").map((part, i) => (
              <span key={i}>
                {i === 0 ? (
                  <span>
                    {part}.{" "}
                  </span>
                ) : (
                  <span className="text-[#c9a84c]">{part}.</span>
                )}
              </span>
            ))}
          </h1>

          <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-10">
            {FIRM.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${BASE}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm tracking-wide rounded-sm hover:bg-[#e4b96a] transition-colors"
            >
              Book a Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`${BASE}/practice-areas`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
            >
              View Practice Areas
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              "Free Consultation",
              "No Win, No Fee*",
              "26+ Years Experience",
              "ABA Member",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="text-[#c9a84c]">✓</span>
                <span className="text-white/60 text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats card panel */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0a1628] border border-[#c9a84c]/20 rounded-sm p-6 hover:border-[#c9a84c]/50 transition-colors"
            >
              <p className="ml-serif text-4xl font-bold text-[#c9a84c] mb-2">
                {stat.value}
              </p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Practice Areas Preview ---------- */
function PracticeAreasSection() {
  return (
    <section className="py-24 bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              What We Do
            </p>
            <h2 className="ml-serif text-4xl font-bold text-white">
              Our Practice Areas
            </h2>
          </div>
          <Link
            href={`${BASE}/practice-areas`}
            className="text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors flex items-center gap-1.5 shrink-0"
          >
            View all practice areas →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICE_AREAS.map((area, idx) => (
            <Link
              key={area.id}
              href={`${BASE}/practice-areas`}
              className="group bg-[#050d1f] border border-[#1a3060] rounded-sm p-6 hover:border-[#c9a84c]/50 hover:bg-[#0a1628] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#c9a84c]/40 text-xs font-bold tracking-widest">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[#c9a84c] group-hover:translate-x-1 transition-transform text-lg">
                  →
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#c9a84c] transition-colors">
                {area.name}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                {area.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Us ---------- */
function WhySection() {
  const reasons = [
    {
      title: "26+ Years of Proven Excellence",
      desc: "Decades of consistent results across complex business, personal, and criminal matters in New York courts and beyond.",
    },
    {
      title: "Multi-Practice Depth",
      desc: "Eight practice areas under one roof — so your legal matters get coordinated, seamless attention without bouncing between firms.",
    },
    {
      title: "Personalized Attention",
      desc: "You work directly with experienced attorneys, not just paralegals. Your case gets the focus it deserves from start to finish.",
    },
    {
      title: "Transparent Communication",
      desc: "We keep you informed at every stage. No surprises on billing, strategy, or timelines. Clarity is a core part of our service.",
    },
  ];

  return (
    <section className="py-24 bg-[#050d1f]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Why Morrison & Grant
            </p>
            <h2 className="ml-serif text-4xl font-bold text-white leading-tight mb-6">
              A Law Firm That Treats<br />Every Case as a Priority
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              We built this firm on the belief that every client deserves the same level of strategic dedication — whether their matter involves millions of dollars or their most personal family decision.
            </p>
            <Link
              href={`${BASE}/about`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c]/50 text-[#c9a84c] text-sm font-semibold rounded-sm hover:bg-[#c9a84c]/10 transition-colors"
            >
              Learn About Our Firm →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="bg-[#0a1628] border border-[#1a3060] rounded-sm p-5 hover:border-[#c9a84c]/30 transition-colors"
              >
                <div className="w-8 h-0.5 bg-[#c9a84c] mb-4" />
                <h3 className="text-white font-semibold text-sm mb-2">
                  {r.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Attorneys Preview ---------- */
function AttorneysSection() {
  const featured = ATTORNEYS.slice(0, 4);

  return (
    <section className="py-24 bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Team
            </p>
            <h2 className="ml-serif text-4xl font-bold text-white">
              Meet Our Attorneys
            </h2>
          </div>
          <Link
            href={`${BASE}/attorneys`}
            className="text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors flex items-center gap-1.5 shrink-0"
          >
            View all attorneys →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((attorney) => (
            <Link
              key={attorney.slug}
              href={`${BASE}/attorneys/${attorney.slug}`}
              className="group bg-[#050d1f] border border-[#1a3060] rounded-sm overflow-hidden hover:border-[#c9a84c]/50 transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-[#0f1f3d] to-[#1a3060] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#c9a84c]/10 border-2 border-[#c9a84c]/30 flex items-center justify-center">
                  <span className="ml-serif text-2xl font-bold text-[#c9a84c]">
                    {attorney.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold tracking-wider uppercase rounded-sm">
                    {attorney.title}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[#c9a84c] transition-colors">
                  {attorney.name}
                </h3>
                <p className="text-[#c9a84c] text-xs mb-2 font-medium">
                  {attorney.specialty}
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  {attorney.yearsExp}+ years of experience
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Case Results ---------- */
function CaseResultsSection() {
  const featured = CASE_RESULTS.slice(0, 3);

  return (
    <section className="py-24 bg-[#050d1f]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Track Record
            </p>
            <h2 className="ml-serif text-4xl font-bold text-white">
              Selected Case Results
            </h2>
          </div>
          <Link
            href={`${BASE}/case-results`}
            className="text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors flex items-center gap-1.5 shrink-0"
          >
            View all results →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((result) => (
            <div
              key={result.id}
              className="bg-[#0a1628] border border-[#1a3060] rounded-sm p-7 hover:border-[#c9a84c]/30 transition-colors"
            >
              <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                {result.type}
              </p>
              <p className="ml-serif text-3xl font-bold text-white mb-4">
                {result.verdict}
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                {result.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-8">
          * Past results do not guarantee future outcomes. Results vary depending on the specific facts and legal circumstances of each individual case.
        </p>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Client Testimonials
          </p>
          <h2 className="ml-serif text-4xl font-bold text-white">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#050d1f] border border-[#1a3060] rounded-sm p-6 flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#c9a84c] text-sm">★</span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-[#c9a84c] text-xs mt-0.5">{t.case}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Free Initial Consultation",
      desc: "We begin with a no-obligation consultation to understand your legal matter and assess how we can help.",
    },
    {
      num: "02",
      title: "Case Evaluation",
      desc: "Our team reviews the facts, researches applicable law, and develops a tailored legal strategy.",
    },
    {
      num: "03",
      title: "Active Representation",
      desc: "We fight for your interests — negotiating, filing motions, and advocating in court when needed.",
    },
    {
      num: "04",
      title: "Resolution & Support",
      desc: "We pursue the best possible outcome and support you through implementation and any follow-on matters.",
    },
  ];

  return (
    <section className="py-24 bg-[#050d1f] border-t border-[#c9a84c]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            How We Work
          </p>
          <h2 className="ml-serif text-4xl font-bold text-white">
            Our Process
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%_-_16px)] w-full h-px bg-gradient-to-r from-[#c9a84c]/40 to-transparent z-0" />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center border border-[#c9a84c]/50 bg-[#c9a84c]/10 rounded-sm mb-5">
                  <span className="text-[#c9a84c] font-bold text-sm">{step.num}</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0f1f3d] via-[#0a1628] to-[#050d1f] border-t border-[#c9a84c]/20">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Take the First Step
        </p>
        <h2 className="ml-serif text-4xl sm:text-5xl font-bold text-white mb-6">
          Your Case Deserves<br />Expert Counsel
        </h2>
        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Contact Morrison & Grant LLP today for a free, confidential initial consultation. Our attorneys are ready to evaluate your matter and explain your options with clarity and candor.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`${BASE}/contact`}
            className="px-8 py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
          >
            Schedule Free Consultation
          </Link>
          <a
            href={`tel:${FIRM.phone}`}
            className="px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded-sm hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
          >
            {FIRM.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function MultiLawyer1Home() {
  return (
    <>
      <Hero />
      <PracticeAreasSection />
      <WhySection />
      <AttorneysSection />
      <CaseResultsSection />
      <TestimonialsSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
