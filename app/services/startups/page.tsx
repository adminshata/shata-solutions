// Apple/Stripe-style premium startups page, matching the service pages design system
"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const launchStack = [
  "Business structure guidance",
  "LLC formation path",
  "EIN preparation support",
  "Stripe/payment readiness",
  "Website or landing page setup",
  "Automation and lead capture",
  "Founder workflow planning",
  "Launch checklist and support",
];

const roadmap = [
  {
    step: "01",
    title: "Map your launch path",
    desc: "We clarify what you are building, who you serve, and which legal, payment, website, and automation pieces you need first.",
  },
  {
    step: "02",
    title: "Build the foundation",
    desc: "We help organize the startup setup: company formation, EIN readiness, payment flow, landing page, tools, and launch systems.",
  },
  {
    step: "03",
    title: "Go live and operate",
    desc: "Launch with a cleaner operating system for leads, payments, communication, onboarding, and customer follow-up.",
  },
];

const bento = [
  {
    title: "Company Setup",
    desc: "Structure the business correctly before building on top of it.",
    kind: "company",
  },
  {
    title: "Payments Ready",
    desc: "Prepare your business for Stripe, invoices, checkout, and global customers.",
    kind: "payments",
  },
  {
    title: "Launch Website",
    desc: "A clean page that explains your offer and captures leads from day one.",
    kind: "website",
  },
  {
    title: "Automation Base",
    desc: "Connect forms, email, CRM, WhatsApp, and follow-up workflows.",
    kind: "automation",
  },
];

const founderMetrics = [
  { label: "Setup clarity", value: "100%" },
  { label: "Launch checklist", value: "Ready" },
  { label: "Systems built", value: "4+" },
];

export default function StartupsPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-950"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-[#0b1020] to-indigo-950/40"
              : "bg-gradient-to-br from-white via-indigo-50/50 to-blue-50/40"
          }`}
        />
        <div className="absolute top-16 -left-24 h-[520px] w-[520px] rounded-full bg-[#635bff]/25 blur-[130px] animate-pulse" />
        <div
          className="absolute top-48 -right-24 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[130px] animate-pulse"
          style={{ animationDelay: "1.4s" }}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.05]" : "opacity-[0.06]"}`}
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative z-10 pt-32 pb-24 [transform-style:preserve-3d]">
        {/* HERO */}
        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] [transform-style:preserve-3d]">
          <div className="text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white/70 text-slate-700"
              }`}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#635bff] animate-pulse" />
              Startup Launch System
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Build from day one
            </div>

            <h1
              className={`mt-8 text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.04em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Start your business with
              <span className="block bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                a real launch system.
              </span>
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              } mx-auto lg:mx-0`}
            >
              We help founders organize the legal setup, EIN readiness, payments, landing page, automation, and launch workflow — so the business starts clean, not chaotic.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/contact?type=startups"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 text-white font-semibold shadow-[0_20px_60px_rgba(99,91,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Start your launch →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#launch-stack"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                See what’s included
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <TrustChip isDark={isDark} label="Founder-friendly" />
              <TrustChip isDark={isDark} label="Payment-ready" />
              <TrustChip isDark={isDark} label="Systems-first" />
            </div>
          </div>

          <FounderDashboard isDark={isDark} />
        </section>

        {/* CLARITY STRIP */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <GlassCard isDark={isDark} className="p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Eyebrow isDark={isDark}>Founder clarity</Eyebrow>
                <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  Most startup problems start with messy foundations.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Requirement isDark={isDark} label="Know what to set up first" />
                <Requirement isDark={isDark} label="Avoid scattered tools and manual work" />
                <Requirement isDark={isDark} label="Prepare for payments and customers" />
                <Requirement isDark={isDark} label="Launch with a clean operating workflow" />
              </div>
            </div>
          </GlassCard>
        </section>

        {/* LAUNCH STACK */}
        <section id="launch-stack" className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#635bff]/20 blur-[110px]" />
            <div className="relative">
              <Eyebrow isDark={isDark}>Launch stack</Eyebrow>
              <h2 className={`mt-4 max-w-3xl text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Everything you need to move from idea to operating business.
              </h2>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We connect the practical startup pieces into one clear setup so you can move faster without guessing what comes next.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {launchStack.map((item) => (
                  <Requirement key={item} isDark={isDark} label={item} />
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* BENTO */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>Startup bento system</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Four foundations that make your launch feel professional.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {bento.map((item, index) => (
              <BentoPanel key={item.title} isDark={isDark} index={index} {...item} />
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <GlassCard isDark={isDark} className="p-8">
              <Eyebrow isDark={isDark}>How it works</Eyebrow>
              <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                A practical path from idea to launch.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We work like an operating partner: map the foundation, build the system, then help you launch with confidence.
              </p>
            </GlassCard>

            <div className="space-y-4">
              {roadmap.map((item) => (
                <RoadmapCard key={item.step} isDark={isDark} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
          <GlassCard isDark={isDark} className="p-10">
            <Eyebrow isDark={isDark}>Launch smarter</Eyebrow>
            <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Ready to start your business the right way?
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We’ll help you turn the idea into a structured setup with legal, payments, website, and automation working together.
            </p>
            <Link
              href="/contact?type=startups"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 font-semibold text-white shadow-[0_20px_60px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
            >
              Start now →
            </Link>
          </GlassCard>
        </section>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function FounderDashboard({ isDark }: { isDark: boolean }) {
  return (
    <div className="group relative mx-auto h-[560px] w-full max-w-[520px] perspective-[1400px]">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/25 blur-[110px] transition duration-700 group-hover:scale-110" />
      <div
        className={`absolute inset-x-6 top-16 rotate-[4deg] rounded-[2.5rem] border p-6 backdrop-blur-2xl transition duration-700 group-hover:-translate-y-3 group-hover:rotate-[6deg] ${
          isDark
            ? "border-white/10 bg-white/[0.08] shadow-[0_50px_160px_rgba(0,0,0,0.45)]"
            : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>Launch Dashboard</div>
            <div className={`mt-1 text-4xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>Day One</div>
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-400">Ready</div>
        </div>

        <div className={`mt-8 rounded-3xl border p-5 ${isDark ? "border-white/10 bg-black/30" : "border-slate-200 bg-white/80"}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>Launch progress</div>
              <div className={`mt-1 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>82%</div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-lg">
              ✓
            </div>
          </div>
          <div className="mt-5 h-2 rounded-full bg-slate-200/20">
            <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {founderMetrics.map((metric) => (
            <MiniMetric key={metric.label} isDark={isDark} {...metric} />
          ))}
        </div>
      </div>

      <FloatingStat isDark={isDark} className="bottom-16 left-0" label="Payments" value="Ready" />
      <FloatingStat isDark={isDark} className="bottom-4 right-4" label="Systems" value="Live" />
    </div>
  );
}

function MiniMetric({ isDark, label, value }: { isDark: boolean; label: string; value: string }) {
  return (
    <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80"}`}>
      <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>{label}</div>
      <div className={`mt-1 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{value}</div>
    </div>
  );
}

function FloatingStat({ isDark, className, label, value }: { isDark: boolean; className: string; label: string; value: string }) {
  return (
    <div
      className={`absolute ${className} rounded-2xl border p-4 shadow-xl backdrop-blur-2xl transition duration-700 group-hover:-translate-y-2 ${
        isDark ? "border-white/10 bg-white/10 text-white" : "border-white/70 bg-white/80 text-slate-900"
      }`}
    >
      <div className={isDark ? "text-xs text-white/50" : "text-xs text-slate-400"}>{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function BentoPanel({ isDark, title, desc, kind, index }: { isDark: boolean; title: string; desc: string; kind: string; index: number }) {
  return (
    <div
      className={`group relative min-h-[300px] overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl transition duration-300 hover:scale-[1.02] ${
        isDark
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
          : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#635bff]/10 blur-[80px] transition group-hover:scale-125" />
      <div className="relative">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.25em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"}>
          Panel 0{index + 1}
        </div>
        <h3 className={`mt-4 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
        <p className={`mt-3 max-w-md text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
        <div className="mt-8">
          {kind === "company" && <CompanyVisual />}
          {kind === "payments" && <PaymentVisual />}
          {kind === "website" && <WebsiteVisual />}
          {kind === "automation" && <AutomationVisual />}
        </div>
      </div>
    </div>
  );
}

function CompanyVisual() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-2xl">
      <div className="text-sm text-white/60">Entity Setup</div>
      <div className="mt-8 flex items-center justify-between">
        <div className="text-lg font-semibold text-white">LLC + EIN path</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-slate-950">✓</div>
      </div>
    </div>
  );
}

function PaymentVisual() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-2xl">
      <div className="flex justify-between text-sm text-white/60"><span>Startup Card</span><span>•••• 4821</span></div>
      <div className="mt-10 flex items-center justify-between"><div className="text-lg font-semibold text-white">Payment Ready</div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-slate-950">✓</div></div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
      <div className="h-3 w-24 rounded-full bg-cyan-300/50" />
      <div className="mt-4 h-8 w-3/4 rounded-xl bg-white/20" />
      <div className="mt-3 h-3 w-full rounded-full bg-white/10" />
      <div className="mt-2 h-3 w-2/3 rounded-full bg-white/10" />
      <div className="mt-5 h-9 w-32 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400" />
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="relative h-40 rounded-3xl border border-white/10 bg-black/30 p-5">
      <div className="absolute left-8 top-8 h-10 w-10 rounded-full bg-cyan-300/20 ring-1 ring-cyan-300/30" />
      <div className="absolute left-1/2 top-16 h-10 w-10 -translate-x-1/2 rounded-full bg-blue-400/20 ring-1 ring-blue-300/30" />
      <div className="absolute bottom-8 right-8 h-10 w-10 rounded-full bg-purple-400/20 ring-1 ring-purple-300/30" />
      <div className="absolute left-16 top-12 h-px w-36 rotate-[18deg] bg-cyan-300/50" />
      <div className="absolute right-16 top-24 h-px w-32 rotate-[28deg] bg-cyan-300/50" />
    </div>
  );
}

function RoadmapCard({ isDark, step, title, desc }: { isDark: boolean; step: string; title: string; desc: string }) {
  return (
    <div
      className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] ${
        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white/80 hover:shadow-xl"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#635bff] to-blue-500 text-sm font-bold text-white shadow-lg">
          {step}
        </div>
        <div>
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Requirement({ isDark, label }: { isDark: boolean; label: string }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        isDark
          ? "border-white/10 bg-black/20 text-white/75"
          : "border-slate-200 bg-white/80 text-slate-700"
      }`}
    >
      <span className={isDark ? "text-cyan-300" : "text-[#635bff]"}>✓</span> {label}
    </div>
  );
}

function TrustChip({ isDark, label }: { isDark: boolean; label: string }) {
  return (
    <div
      className={`rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-xl ${
        isDark ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {label}
    </div>
  );
}

function GlassCard({ isDark, className = "", children }: { isDark: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[2rem] border backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
      {children}
    </div>
  );
}