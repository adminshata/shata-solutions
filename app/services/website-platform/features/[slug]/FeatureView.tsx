"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";
import type { WebsitePlatformFeature } from "../../data";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function FeatureView({ feature }: { feature: WebsitePlatformFeature }) {
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
        <Hero feature={feature} isDark={isDark} />
        <Outcomes feature={feature} isDark={isDark} />
        <HowItWorks feature={feature} isDark={isDark} />
        <ConnectedStack feature={feature} isDark={isDark} />
        <ProofPoints feature={feature} isDark={isDark} />
        <FinalCTA feature={feature} />
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

/* Reveal on scroll */
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
      className={`transition-all duration-[900ms] ease-out will-change-transform ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Tilt-on-hover wrapper */
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

function Hero({ feature, isDark }: { feature: WebsitePlatformFeature; isDark: boolean }) {
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
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(99,91,255,0.7)]">
                {feature.number}
              </span>
              <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/60" : "text-slate-500"}`}>{feature.subtitle}</span>
            </div>

            <h1 className={`mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-6xl lg:text-7xl ${isDark ? "text-white" : "text-slate-950"}`}>
              {feature.title}{" "}
              <span className="bg-gradient-to-r from-[#635bff] via-[#2563eb] to-cyan-400 bg-clip-text text-transparent">on Shata Platform.</span>
            </h1>

            <p className={`mt-6 max-w-xl text-lg leading-8 ${isDark ? "text-white/65" : "text-slate-600"}`}>{feature.heroLine}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact?type=website-platform"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5"
              >
                Start your website →
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
            <FeatureMockup slug={feature.slug} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Feature-specific hero mockups                                       */
/* ------------------------------------------------------------------ */

function MockShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(99,91,255,0.35),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(6,182,212,0.30),transparent_55%)] blur-2xl" />
      <div className="relative h-[560px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#070d1c] p-6 shadow-[0_40px_120px_-30px_rgba(2,6,23,0.6)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(99,91,255,0.30),transparent_38%),radial-gradient(circle_at_85%_30%,rgba(6,182,212,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

function FeatureMockup({ slug }: { slug: string }) {
  if (slug === "templates") return <TemplatesMockup />;
  if (slug === "hosting-ssl") return <HostingMockup />;
  if (slug === "client-dashboard") return <DashboardMockup />;
  if (slug === "domain-options") return <DomainMockup />;
  if (slug === "business-email") return <EmailMockup />;
  if (slug === "lead-forms") return <LeadFormMockup />;
  if (slug === "booking-orders") return <BookingMockup />;
  if (slug === "analytics") return <AnalyticsMockup />;
  if (slug === "support-maintenance") return <MaintenanceMockup />;
  return <DashboardMockup />;
}

function TemplatesMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-cols-2 gap-3">
        {[
          { t: "Clinic", g: "from-[#635bff]/35 to-cyan-400/20" },
          { t: "Ecommerce", g: "from-cyan-400/30 to-blue-500/20" },
          { t: "Law Firm", g: "from-slate-500/30 to-[#635bff]/20" },
          { t: "Repair", g: "from-blue-500/30 to-cyan-400/20" },
        ].map((tpl) => (
          <div key={tpl.t} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <div className="ml-2 truncate rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-white/50">{tpl.t.toLowerCase()}.com</div>
            </div>
            <div className={`h-[80%] bg-gradient-to-br ${tpl.g} p-3`}>
              <div className="text-xs font-semibold text-white">{tpl.t} Template</div>
              <div className="mt-2 h-3 w-16 rounded bg-white/15" />
              <div className="mt-1 h-3 w-12 rounded bg-white/10" />
              <div className="mt-3 h-12 rounded-lg bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function HostingMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Server health</div>
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">99.98% uptime</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["TTFB", "112ms"],
              ["LCP", "1.4s"],
              ["CLS", "0.01"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                <div className="text-[9px] font-semibold uppercase text-white/40">{k}</div>
                <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-sm font-semibold text-transparent">{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white">SSL Certificate</div>
            <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-2 py-0.5 text-[10px] font-semibold text-white">Auto-renew</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[11px] text-white/70">
            <div>Issued: Apr 22, 2026</div>
            <div>Expires: Jul 21, 2026</div>
            <div className="mt-1 text-cyan-300">Renewal: scheduled +30d</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
              <span>Edge regions</span><span>6 active</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={`h-2 rounded ${i < 6 ? "bg-gradient-to-r from-[#635bff] to-cyan-400" : "bg-white/5"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function DashboardMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-cols-[170px_1fr] gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Workspace</div>
          {["Text", "Images", "Services", "Products", "Leads", "Hours"].map((item, i) => (
            <div key={item} className={`mt-1.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium transition ${i === 1 ? "border border-white/10 bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10 text-white" : "text-white/60"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-gradient-to-br from-[#635bff] to-cyan-400" : "bg-white/20"}`} />
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="text-xs font-semibold text-white">Hero section</div>
            <div className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/60">Editing</div>
          </div>
          <div className="mt-3 h-32 rounded-xl bg-[linear-gradient(135deg,#635bff,#2563eb,#06b6d4)]" />
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-white/10" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="h-2 w-2/3 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[10px] text-white/40">Last saved 12s ago</div>
            <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-1.5 text-[11px] font-semibold text-white">Save changes</div>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function DomainMockup() {
  const items = [
    { type: "Subdomain", value: "yourbrand.shatasolutions.com", badge: "Fast", live: true },
    { type: "Custom", value: "yourbrand.com", badge: "Owned", live: true },
    { type: "Register", value: "yourbrand.co", badge: "Available", live: false },
  ];
  return (
    <MockShell>
      <div className="flex h-full flex-col justify-center gap-3">
        {items.map((it) => (
          <div key={it.type} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{it.type}</div>
              <div className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${it.live ? "bg-gradient-to-r from-[#635bff] to-cyan-400 text-white" : "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"}`}>{it.badge}</div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="font-mono text-sm text-white">{it.value}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1 text-[9px] uppercase tracking-wider text-white/40">
              <div>DNS<span className="ml-1 text-cyan-300">●</span></div>
              <div>SSL<span className="ml-1 text-cyan-300">●</span></div>
              <div>Live<span className={`ml-1 ${it.live ? "text-cyan-300" : "text-white/30"}`}>●</span></div>
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function EmailMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="text-xs font-semibold text-white">Inbox · info@yourbrand.com</div>
          <div className="mt-3 space-y-2">
            {[
              ["New booking request", "From: jane@example.com", "10:24"],
              ["Quote inquiry", "From: omar@business.ae", "09:48"],
              ["Welcome to Shata!", "From: hello@shatasolutions.com", "08:02"],
            ].map(([t, f, time]) => (
              <div key={t} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div>
                  <div className="text-[11px] font-semibold text-white">{t}</div>
                  <div className="text-[10px] text-white/50">{f}</div>
                </div>
                <div className="text-[10px] text-white/40">{time}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Deliverability</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["SPF", "Pass"],
              ["DKIM", "Pass"],
              ["DMARC", "Pass"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-2 text-center">
                <div className="text-[10px] font-semibold text-white/60">{k}</div>
                <div className="text-xs font-semibold text-cyan-300">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function LeadFormMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-cols-[1fr_1fr] gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="text-xs font-semibold text-white">Quote request</div>
          <div className="mt-3 space-y-2">
            {["Full name", "Phone", "Service", "Notes"].map((f, i) => (
              <div key={f} className={`rounded-lg border px-3 py-2 text-[11px] ${i === 1 ? "border-[#635bff]/40 bg-[#635bff]/10 text-white" : "border-white/10 bg-white/[0.03] text-white/60"}`}>{f}</div>
            ))}
          </div>
          <div className="mt-3 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 py-2 text-center text-[11px] font-semibold text-white">Submit</div>
        </div>
        <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Routing</div>
          {["Email inbox", "WhatsApp", "CRM"].map((r) => (
            <div key={r} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-[11px]">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              <span className="text-white/80">{r}</span>
              <span className="ml-auto text-cyan-300">●</span>
            </div>
          ))}
          <div className="mt-3 rounded-xl border border-white/10 bg-gradient-to-br from-[#635bff]/15 to-cyan-400/10 p-3">
            <div className="text-[10px] uppercase tracking-wider text-white/60">Today</div>
            <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-2xl font-semibold text-transparent">12 leads</div>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function BookingMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="text-xs font-semibold text-white">Pick a slot</div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`flex h-8 items-center justify-center rounded-md text-[10px] font-semibold ${i === 5 ? "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white" : "bg-white/[0.05] text-white/55"}`}>{i + 10}:00</div>
            ))}
          </div>
          <div className="mt-3 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 py-2 text-center text-[11px] font-semibold text-white">Confirm booking</div>
        </div>
        <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Order</div>
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="text-[11px] text-white/80">Service A</span>
            <span className="text-[11px] font-semibold text-white">$120</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="text-[11px] text-white/80">Add-on</span>
            <span className="text-[11px] font-semibold text-white">$30</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-2.5">
            <span className="text-[11px] text-white">Total</span>
            <span className="bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-sm font-semibold text-transparent">$150</span>
          </div>
          <div className="mt-3 rounded-full border border-white/15 bg-white/[0.05] py-2 text-center text-[11px] font-semibold text-white">Pay via Stripe</div>
        </div>
      </div>
    </MockShell>
  );
}

function AnalyticsMockup() {
  return (
    <MockShell>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Visits", "12,430", "+18%"],
            ["Leads", "284", "+24%"],
            ["Conv.", "2.3%", "+0.4"],
          ].map(([k, v, d]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{k}</div>
              <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-lg font-semibold text-transparent">{v}</div>
              <div className="text-[10px] text-cyan-300">{d}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Traffic sources</div>
            <div className="text-[10px] text-white/40">Last 30d</div>
          </div>
          <div className="mt-4 flex h-32 items-end gap-2">
            {[40, 65, 35, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#635bff] to-cyan-400" style={{ height: `${h}%`, opacity: 0.4 + (h / 100) * 0.6 }} />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-white/50">
            <span>Search</span><span>Social</span><span>Direct</span><span>Referral</span>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function MaintenanceMockup() {
  return (
    <MockShell>
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Open requests</div>
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">3 active</div>
          </div>
          <div className="mt-3 space-y-2">
            {[
              ["Update homepage hero", "in progress", "Today"],
              ["Add new service page", "queued", "Tomorrow"],
              ["Replace team photo", "ready to publish", "Today"],
            ].map(([t, s, d]) => (
              <div key={t} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div>
                  <div className="text-[11px] font-semibold text-white">{t}</div>
                  <div className="text-[10px] text-white/50">{s}</div>
                </div>
                <div className="text-[10px] text-white/40">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Uptime</div>
            <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-lg font-semibold text-transparent">99.97%</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">SSL</div>
            <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-lg font-semibold text-transparent">Healthy</div>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */
/* Outcomes                                                            */
/* ------------------------------------------------------------------ */

function Outcomes({ feature, isDark }: { feature: WebsitePlatformFeature; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="What this unlocks" title={`What ${feature.title.toLowerCase()} delivers.`} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {feature.outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 80}>
              <Tilt intensity={6} className="h-full">
                <div className={`relative h-full overflow-hidden rounded-[1.75rem] border p-6 backdrop-blur-xl ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,91,255,0.7)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={`mt-5 text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{o.title}</div>
                  <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{o.copy}</p>
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
/* HowItWorks                                                          */
/* ------------------------------------------------------------------ */

function HowItWorks({ feature, isDark }: { feature: WebsitePlatformFeature; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="How it works" title="From request to live in four steps." />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {feature.steps.map((s, idx) => (
            <Reveal key={s.number} delay={idx * 80}>
              <div className={`relative h-full overflow-hidden rounded-[1.75rem] border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
                <div className="bg-gradient-to-r from-[#635bff] to-cyan-400 bg-clip-text text-xs font-semibold text-transparent">{s.number}</div>
                <div className={`mt-5 text-base font-semibold leading-tight ${isDark ? "text-white" : "text-slate-950"}`}>{s.title}</div>
                <p className={`mt-3 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{s.copy}</p>
                {idx < feature.steps.length - 1 && (
                  <div className="absolute right-3 top-3 hidden h-px w-6 bg-gradient-to-r from-[#635bff]/40 to-cyan-400/40 lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ConnectedStack                                                      */
/* ------------------------------------------------------------------ */

function ConnectedStack({ feature, isDark }: { feature: WebsitePlatformFeature; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            isDark={isDark}
            eyebrow="Connected stack"
            title={`The ${feature.title.toLowerCase()} layer in the platform.`}
            copy="Every layer is wired into the next so your business operates as a single system."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className={`mt-12 overflow-hidden rounded-[2rem] border p-8 ${isDark ? "border-white/10 bg-[#070d1c]" : "border-slate-200 bg-white/80"}`}>
            <div className="relative">
              {/* Horizontal connection line */}
              <svg aria-hidden className="absolute inset-x-0 top-1/2 hidden h-px w-full md:block" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="stackLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#635bff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <line x1="6%" y1="0" x2="94%" y2="0" stroke="url(#stackLine)" strokeWidth="1" strokeDasharray="3,4" />
              </svg>

              <div className="relative grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {feature.stackNodes.map((node, idx) => (
                  <div key={node} className="flex flex-col items-center text-center">
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(99,91,255,0.7)] ${
                        isDark ? "ring-4 ring-[#070d1c]" : "ring-4 ring-white/80"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className={`mt-3 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{node}</div>
                    <div className={`mt-1 text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-400"}`}>Layer {String(idx + 1).padStart(2, "0")}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-10 rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"} p-5`}>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>How they connect</div>
              <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/65" : "text-slate-600"}`}>
                Each layer feeds the next. Output of one becomes input of another — no manual handoff, no broken seams. The platform manages the connections so your team only sees the result.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ProofPoints                                                         */
/* ------------------------------------------------------------------ */

function ProofPoints({ feature, isDark }: { feature: WebsitePlatformFeature; isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader isDark={isDark} eyebrow="Proof points" title="Why operators trust this layer." />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {feature.proofPoints.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <Tilt intensity={5} className="h-full">
                <div className={`relative h-full overflow-hidden rounded-[1.75rem] border p-7 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
                  <div className="bg-gradient-to-r from-[#635bff] via-[#2563eb] to-cyan-400 bg-clip-text text-5xl font-semibold tracking-[-0.04em] text-transparent">{p.metric}</div>
                  <div className={`mt-2 text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/55" : "text-slate-500"}`}>{p.label}</div>
                  <p className={`mt-4 text-sm leading-6 ${isDark ? "text-white/65" : "text-slate-600"}`}>{p.copy}</p>
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

function FinalCTA({ feature }: { feature: WebsitePlatformFeature }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#070d1c] p-10 text-center text-white shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(99,91,255,0.40),transparent_50%),radial-gradient(circle_at_82%_70%,rgba(6,182,212,0.32),transparent_50%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              Ready to launch
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl">
              Start your website with <span className="bg-gradient-to-r from-[#a3a0ff] to-cyan-300 bg-clip-text text-transparent">{feature.title}</span> built in.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">{feature.heroLine}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact?type=website-platform" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.8)] transition hover:-translate-y-0.5">
                {feature.ctaLabel} →
              </Link>
              <Link href="/services/website-platform" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.10]">
                See all platform features
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
