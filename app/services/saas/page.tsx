// Clean Apple/Stripe-style SaaS premium page, matching design, colors, spacing, and light/dark mode.
"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const codeLines = [
  "const product = await foundry.build();",
  "stripe.subscriptions.create({ scale: true });",
  "automation.trigger('trial_to_paid');",
];

const bento = [
  {
    title: "Global Payments",
    desc: "Stripe-ready subscriptions, invoices, checkout flows, Apple Pay, and customer billing logic.",
    kind: "payment",
  },
  {
    title: "Smart Onboarding",
    desc: "Guided setup, activation milestones, lifecycle emails, and clean product adoption flows.",
    kind: "onboarding",
  },
  {
    title: "Logic Automation",
    desc: "Connect product events, forms, CRM updates, Slack alerts, and internal workflows into one system.",
    kind: "automation",
  },
  {
    title: "Auto-Scale Foundation",
    desc: "Roles, database structure, APIs, dashboards, monitoring, and admin tools designed for growth.",
    kind: "scale",
  },
];

const flows = [
  { label: "Payments", detail: "subscriptions + checkout" },
  { label: "Onboarding", detail: "activation milestones" },
  { label: "Automation", detail: "events + alerts" },
  { label: "Dashboard", detail: "MRR + usage" },
];

const stack = [
  "Product architecture",
  "SaaS dashboard UI",
  "Subscription billing",
  "Customer onboarding",
  "Admin tools",
  "Automation workflows",
  "Analytics events",
  "Security-first design",
];

export default function SaaSPage() {
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
              Foundry SaaS Platform
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Build systems designed to scale
            </div>

            <h1
              className={`mt-8 text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.04em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Build a SaaS product with
              <span className="block bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                infrastructure from day one.
              </span>
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              } mx-auto lg:mx-0`}
            >
              Foundry turns your idea into a launch-ready product system — payments, onboarding, automation, dashboards, security, and operations built together.
            </p>

            <div
              className={`mt-8 overflow-hidden rounded-3xl border p-5 font-mono text-sm backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-black/40 shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
                  : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-cyan-400mber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              {codeLines.map((line, index) => (
                <div key={line} className={`flex gap-3 py-1 ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  <span className={isDark ? "text-white/25" : "text-slate-400"}>0{index + 1}</span>
                  <span className={isDark ? "text-cyan-300" : "text-[#635bff]"}>{line}</span>
                  {index === 0 && <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-cyan-300" />}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/contact?type=saas"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 text-white font-semibold shadow-[0_20px_60px_rgba(99,91,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Build your SaaS →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#infrastructure"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                View architecture
              </a>
            </div>
          </div>

          <MRRDashboard isDark={isDark} />
        </section>

        {/* UX SYSTEM */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <GlassCard isDark={isDark} className="p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Eyebrow isDark={isDark}>UX motion system</Eyebrow>
                <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  Depth, motion, and clarity — without slowing the user down.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Requirement isDark={isDark} label="Dashboard floats with subtle parallax on hover" />
                <Requirement isDark={isDark} label="Infrastructure nodes glow as users scan the flow" />
                <Requirement isDark={isDark} label="Bento panels lift with soft glass reflections" />
                <Requirement isDark={isDark} label="Trust vault uses frosted overlays and low-noise motion" />
              </div>
            </div>
          </GlassCard>
        </section>

        {/* INFRASTRUCTURE */}
        <section id="infrastructure" className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#635bff]/20 blur-[110px]" />
            <div className="relative">
              <Eyebrow isDark={isDark}>Infrastructure layer</Eyebrow>
              <h2 className={`mt-4 max-w-3xl text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                The product plumbing that makes your SaaS operate.
              </h2>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Payments, onboarding, automation, and analytics are connected systems that move revenue and product data through the business.
              </p>

              <div className="mt-10 grid gap-6 lg:grid-cols-4">
                {flows.map((flow, index) => (
                  <FlowNode key={flow.label} isDark={isDark} index={index} {...flow} />
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* BENTO GRID */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>Bento system grid</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Everything your SaaS needs to become a real business.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {bento.map((item, index) => (
              <BentoPanel key={item.title} isDark={isDark} index={index} {...item} />
            ))}
          </div>
        </section>

        {/* SECURITY */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard isDark={isDark} className="p-8">
              <Eyebrow isDark={isDark}>Trust & security</Eyebrow>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Enterprise-grade safety, designed into the product foundation.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We plan the product around secure sessions, roles, data boundaries, audit-friendly workflows, and payment-safe architecture.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {stack.map((item) => (
                  <Requirement key={item} isDark={isDark} label={item} />
                ))}
              </div>
            </GlassCard>

            <SecurityVault isDark={isDark} />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
          <GlassCard isDark={isDark} className="p-10">
            <Eyebrow isDark={isDark}>Launch smarter</Eyebrow>
            <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Turn your SaaS idea into a product system.
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Instead of patching payments, onboarding, dashboards, and automation later, build the operating system from the beginning.
            </p>
            <Link
              href="/contact?type=saas"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 font-semibold text-white shadow-[0_20px_60px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
            >
              Start your SaaS build →
            </Link>
          </GlassCard>
        </section>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function MRRDashboard({ isDark }: { isDark: boolean }) {
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
            <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>MRR Dashboard</div>
            <div className={`mt-1 text-4xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>$84,230</div>
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-400">Live</div>
        </div>

        <div className={`mt-8 rounded-3xl border p-5 ${isDark ? "border-white/10 bg-black/30" : "border-slate-200 bg-white/80"}`}>
          <div className="flex h-40 items-end gap-3">
            {[42, 58, 45, 72, 65, 90, 78, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-gradient-to-t from-[#635bff] to-cyan-400 shadow-[0_0_30px_rgba(99,91,255,0.25)]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <DashStat isDark={isDark} label="Trials" value="428" />
          <DashStat isDark={isDark} label="Paid" value="92" />
          <DashStat isDark={isDark} label="Churn" value="1.8%" />
        </div>
      </div>

      <FloatingStat isDark={isDark} className="bottom-16 left-0" label="CAC payback" value="7.4 mo" />
      <FloatingStat isDark={isDark} className="bottom-4 right-4" label="Activation" value="68%" />
    </div>
  );
}

function DashStat({ isDark, label, value }: { isDark: boolean; label: string; value: string }) {
  return (
    <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80"}`}>
      <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>{label}</div>
      <div className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{value}</div>
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

function FlowNode({ isDark, index, label, detail }: { isDark: boolean; index: number; label: string; detail: string }) {
  return (
    <div
      className={`group relative rounded-3xl border p-6 backdrop-blur-xl transition hover:scale-[1.02] ${
        isDark ? "border-white/10 bg-black/30" : "border-slate-200 bg-white/80"
      }`}
    >
      {index < 3 && <div className="absolute left-[92%] top-1/2 hidden h-px w-16 bg-gradient-to-r from-cyan-300 to-transparent lg:block" />}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#635bff]/10 text-sm font-bold text-[#635bff] ring-1 ring-[#635bff]/20">
        0{index + 1}
      </div>
      <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{label}</h3>
      <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/55" : "text-slate-600"}`}>{detail}</p>
    </div>
  );
}

function BentoPanel({ isDark, title, desc, kind, index }: { isDark: boolean; title: string; desc: string; kind: string; index: number }) {
  return (
    <div
      className={`group relative min-h-[320px] overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl transition duration-300 hover:scale-[1.02] ${
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
          {kind === "payment" && <PaymentVisual />}
          {kind === "onboarding" && <OnboardingVisual />}
          {kind === "automation" && <AutomationVisual />}
          {kind === "scale" && <ServerVisual />}
        </div>
      </div>
    </div>
  );
}

function PaymentVisual() {
  return (
    <div className="max-w-sm rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-2xl">
      <div className="flex justify-between text-sm text-white/60"><span>Foundry Card</span><span>•••• 4821</span></div>
      <div className="mt-10 flex items-center justify-between"><div className="text-lg font-semibold text-white">Payment Success</div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-slate-950">✓</div></div>
    </div>
  );
}

function OnboardingVisual() {
  return (
    <div className="space-y-3">
      {["Create workspace", "Connect billing", "Invite team"].map((item, i) => (
        <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between text-sm text-white"><span>{item}</span><span className="text-cyan-300">{i < 2 ? "Done" : "Next"}</span></div>
          <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-300" style={{ width: `${i < 2 ? 100 : 55}%` }} /></div>
        </div>
      ))}
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

function ServerVisual() {
  return (
    <div className="grid gap-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <span className="text-sm text-white/70">Server node 0{n}</span>
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.8)]" />
        </div>
      ))}
    </div>
  );
}

function SecurityVault({ isDark }: { isDark: boolean }) {
  return (
    <GlassCard isDark={isDark} className="relative min-h-[420px] overflow-hidden p-8">
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/10 blur-[90px]" />
      <div
        className={`relative mx-auto mt-10 flex h-56 w-56 items-center justify-center rounded-[2rem] border backdrop-blur-2xl ${
          isDark
            ? "border-white/10 bg-black/40 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
        }`}
      >
        <div className="absolute -top-16 h-28 w-36 rounded-t-full border-[14px] border-cyan-300/30 border-b-0" />
        <div className="text-center">
          <div className="text-5xl">🔒</div>
          <div className={`mt-4 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>256-bit encryption</div>
          <div className={isDark ? "mt-2 text-xs text-white/45" : "mt-2 text-xs text-slate-400"}>Enterprise-grade safety layer</div>
        </div>
      </div>
    </GlassCard>
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