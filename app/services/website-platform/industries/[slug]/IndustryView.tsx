"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";
import type { WebsiteIndustry } from "../../data";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function IndustryView({ industry }: { industry: WebsiteIndustry }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#050b16] text-white" : "bg-[#f6f9ff] text-slate-950"}`}>
      <GlobalStyles />
      <PageBackground isDark={isDark} />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative overflow-hidden pt-28">
        <Hero industry={industry} isDark={isDark} />
        <TemplateSections industry={industry} isDark={isDark} />
        <IncludedFeatures industry={industry} isDark={isDark} />
        <ConversionFlow industry={industry} isDark={isDark} />
        <TrustSignals industry={industry} isDark={isDark} />
        <FinalCTA industry={industry} />
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

function PageBackground({ isDark }: { isDark: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[linear-gradient(to_right,rgba(99,91,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.08)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.06)_1px,transparent_1px)]"
        } bg-[size:72px_72px]`}
      />
      <div className="absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-[#635bff]/30 blur-[140px] opacity-50" />
      <div className="absolute right-[-10%] top-[20%] h-[480px] w-[480px] rounded-full bg-cyan-400/25 blur-[140px] opacity-50" />
      <div className={`absolute inset-0 ${isDark ? "bg-[#050b16]/40" : "bg-[#f6f9ff]/40"}`} />
    </div>
  );
}

function SectionHeader({
  isDark,
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  isDark: boolean;
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : ""}>
      <span className="inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
        {eyebrow}
      </span>
      <h2 className={`mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl ${isDark ? "text-white" : "text-slate-950"} ${isCenter ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {copy && (
        <p className={`mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${isDark ? "text-white/65" : "text-slate-600"} ${isCenter ? "mx-auto" : ""}`}>
          {copy}
        </p>
      )}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out will-change-transform ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function Tilt({ children, intensity = 6, className = "" }: { children: ReactNode; intensity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${(-y * intensity).toFixed(2)}deg) rotateY(${(x * intensity).toFixed(2)}deg) translateZ(0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);
  return <div ref={ref} className={`transition-transform duration-300 ease-out will-change-transform ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ industry, isDark }: { industry: WebsiteIndustry; isDark: boolean }) {
  return (
    <section className="relative px-6 pb-16 pt-10 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Link
            href="/services/website-platform"
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:-translate-y-0.5 ${
              isDark ? "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08]" : "border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
            }`}
          >
            ← Shata Website Platform
          </Link>
        </Reveal>

        <div className="mt-6 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? "border-white/10 bg-white/[0.04] text-white/80" : "border-slate-200 bg-white/80 text-slate-700"}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              Industry Website System
            </span>

            <h1 className={`mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl lg:text-7xl ${isDark ? "text-white" : "text-slate-950"}`}>
              {industry.title}{" "}
              <span className="bg-gradient-to-r from-[#635bff] via-[#2563eb] to-cyan-400 bg-clip-text text-transparent">websites built as business systems.</span>
            </h1>

            <p className={`mt-6 max-w-xl text-lg leading-8 ${isDark ? "text-white/65" : "text-slate-600"}`}>{industry.heroLine}</p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10 px-4 py-2 text-sm font-semibold text-[#8a84ff] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              <span className="font-mono text-sm">{industry.domain}</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact?type=website-platform"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5"
              >
                Start this template →
              </Link>
              <Link
                href="/services/website-platform"
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold backdrop-blur-xl transition hover:-translate-y-0.5 ${
                  isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white/80 text-slate-900 hover:bg-white"
                }`}
              >
                Back to Website Platform
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <IndustryMockup industry={industry} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* IndustryMockup — browser preview + floating mobile                  */
/* ------------------------------------------------------------------ */

function IndustryMockup({ industry }: { industry: WebsiteIndustry }) {
  const firstSection = industry.templateSections[0]?.title ?? industry.tag;
  const secondSection = industry.templateSections[1]?.title ?? "Services";
  const thirdSection = industry.templateSections[2]?.title ?? "Contact";

  return (
    <div className="relative">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(99,91,255,0.35),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(6,182,212,0.30),transparent_55%)] blur-2xl" />

      <div className="relative h-[560px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#070d1c] p-6 shadow-[0_40px_120px_-30px_rgba(2,6,23,0.6)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(99,91,255,0.30),transparent_38%),radial-gradient(circle_at_85%_30%,rgba(6,182,212,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Browser preview */}
        <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1226]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <div className="ml-2 truncate rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/60">{industry.domain}</div>
            <div className="ml-auto rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan-300">{industry.tag}</div>
          </div>

          <div className="relative h-full p-5">
            {/* Site header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#635bff] to-cyan-400" />
                <div className="text-sm font-semibold text-white">{industry.title}</div>
              </div>
              <div className="flex gap-3 text-[10px] font-semibold text-white/55">
                <span>{firstSection}</span>
                <span>{secondSection}</span>
                <span>{thirdSection}</span>
              </div>
            </div>

            {/* Hero block */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">Premium service</div>
              <div className="mt-2 max-w-md text-2xl font-semibold leading-tight tracking-tight text-white">{industry.title} that customers actually choose.</div>
              <div className="mt-4 flex gap-2">
                <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-3 py-1.5 text-[11px] font-semibold text-white">Start now</div>
                <div className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white">Learn more</div>
              </div>
            </div>

            {/* Section grid */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {industry.templateSections.slice(0, 3).map((s, i) => (
                <div key={s.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className={`mb-2 h-12 rounded-md ${i === 0 ? "bg-gradient-to-br from-[#635bff]/30 to-cyan-400/20" : i === 1 ? "bg-gradient-to-br from-cyan-400/25 to-blue-500/15" : "bg-gradient-to-br from-blue-500/25 to-[#635bff]/15"}`} />
                  <div className="text-[10px] font-semibold text-white">{s.title}</div>
                </div>
              ))}
            </div>

            {/* CTA strip */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div>
                <div className="text-[10px] uppercase text-white/40">Lead form</div>
                <div className="text-xs font-semibold text-white">{industry.tag}</div>
              </div>
              <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-3 py-1.5 text-[11px] font-semibold text-white">Submit</div>
            </div>
          </div>
        </div>

        {/* Floating mobile preview */}
        <div className="absolute bottom-7 right-7 z-30 w-[160px] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#0b1226] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-white/45">{industry.title}</div>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </div>
          <div className="space-y-2 p-3">
            <div className="h-12 rounded-lg bg-gradient-to-br from-[#635bff]/40 to-cyan-400/30" />
            <div className="text-[10px] font-semibold leading-tight text-white">{industry.tag}</div>
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="rounded-md bg-gradient-to-r from-[#635bff] to-cyan-400 py-1.5 text-center text-[10px] font-semibold text-white">Start</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TemplateSections                                                    */
/* ------------------------------------------------------------------ */

function TemplateSections({ industry, isDark }: { industry: WebsiteIndustry; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="Template structure" title="What your template includes." copy={`Every ${industry.title.toLowerCase()} site ships with the sections that drive your business — already in the right order.`} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industry.templateSections.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <Tilt intensity={5} className="h-full">
                <div className={`relative h-full overflow-hidden rounded-[1.75rem] border p-6 backdrop-blur-xl ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">
                    <span className="h-1 w-1 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
                    Section {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={`mt-5 text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{s.title}</div>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{s.copy}</p>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-[#635bff]/30 via-cyan-400/20 to-transparent" />
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* IncludedFeatures                                                    */
/* ------------------------------------------------------------------ */

function IncludedFeatures({ industry, isDark }: { industry: WebsiteIndustry; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="Included" title={`Built into every ${industry.title.toLowerCase()} system.`} copy="No add-on chase. The essentials are part of the platform from day one." />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {industry.includedFeatures.map((feature) => (
              <span
                key={feature}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition hover:-translate-y-0.5 ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-white/75 hover:border-[#635bff]/40 hover:bg-white/[0.08] hover:text-white"
                    : "border-slate-200 bg-white/80 text-slate-700 hover:border-[#635bff]/40 hover:bg-white hover:text-slate-900"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
                {feature}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ConversionFlow                                                      */
/* ------------------------------------------------------------------ */

function ConversionFlow({ industry, isDark }: { industry: WebsiteIndustry; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="Conversion flow" title={`How a ${industry.title.toLowerCase()} visitor becomes a customer.`} copy="Your website isn't just a brochure — it's a structured funnel that captures, qualifies, and routes leads." />
        </Reveal>

        <Reveal delay={120}>
          <div className={`mt-12 overflow-hidden rounded-[2rem] border p-8 ${isDark ? "border-white/10 bg-[#070d1c]" : "border-slate-200 bg-white/80"}`}>
            <div className="relative">
              <svg aria-hidden className="absolute inset-x-0 top-[60px] hidden h-px w-full lg:block" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#635bff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <line x1="6%" y1="0" x2="94%" y2="0" stroke="url(#flowLine)" strokeWidth="1" strokeDasharray="3,4" />
              </svg>

              <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {industry.conversionFlow.map((step) => (
                  <div key={step.step} className="flex flex-col items-center text-center">
                    <div
                      className={`relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_20px_50px_-15px_rgba(99,91,255,0.7)] ${
                        isDark ? "ring-4 ring-[#070d1c]" : "ring-4 ring-white/80"
                      }`}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/80">Step</div>
                      <div className="text-2xl font-semibold tracking-tight">{step.step}</div>
                    </div>
                    <div className={`mt-4 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{step.label}</div>
                    <p className={`mt-2 text-xs leading-5 ${isDark ? "text-white/60" : "text-slate-600"}`}>{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TrustSignals                                                        */
/* ------------------------------------------------------------------ */

function TrustSignals({ industry, isDark }: { industry: WebsiteIndustry; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="Trust signals" title={`Why ${industry.title.toLowerCase()} customers choose you.`} copy="Trust is the conversion multiplier. Every template includes the signals that matter most for your industry." />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {industry.trustSignals.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <Tilt intensity={5} className="h-full">
                <div className={`relative h-full overflow-hidden rounded-[1.75rem] border p-7 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,91,255,0.7)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={`mt-5 text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{t.title}</div>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{t.copy}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FinalCTA                                                            */
/* ------------------------------------------------------------------ */

function FinalCTA({ industry }: { industry: WebsiteIndustry }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#070d1c] p-10 text-center text-white shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(99,91,255,0.40),transparent_50%),radial-gradient(circle_at_82%_70%,rgba(6,182,212,0.32),transparent_50%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              Industry-ready
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl">
              Start your <span className="bg-gradient-to-r from-[#a3a0ff] to-cyan-300 bg-clip-text text-transparent">{industry.title}</span> website today.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{industry.heroLine}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact?type=website-platform" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.8)] transition hover:-translate-y-0.5">
                {industry.ctaLabel} →
              </Link>
              {industry.previewHref && (
                <Link href={industry.previewHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.10]">
                  View live template →
                </Link>
              )}
              {!industry.previewHref && (
                <Link href="/services/website-platform" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.10]">
                  Explore all industries
                </Link>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
