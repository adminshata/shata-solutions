
// Apple/Stripe-style Automation as a Service landing page
"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const automationPillars = [
  {
    title: "Social Media Automation",
    eyebrow: "Content + DMs",
    desc: "Multi-platform AI content distribution, auto-engagement, comment routing, and sentiment-aware DM responders that protect your brand voice.",
    features: ["AI content repurposing", "Auto-publishing workflows", "DM qualification", "Sentiment routing"],
    kind: "social",
  },
  {
    title: "Sales & Lead Gen",
    eyebrow: "Pipeline systems",
    desc: "Automated lead sourcing, enrichment, AI-personalized cold outreach, instant CRM synchronization, and sales-ready alerts.",
    features: ["Lead scraping", "Personalized outreach", "CRM sync", "Slack alerts"],
    kind: "sales",
  },
  {
    title: "Operational Workflows",
    eyebrow: "Back-office engine",
    desc: "Invoice processing, internal approvals, automated reporting, employee onboarding, document routing, and recurring task orchestration.",
    features: ["Invoices", "Reports", "Approvals", "Onboarding"],
    kind: "ops",
  },
  {
    title: "Customer Experience",
    eyebrow: "24/7 service layer",
    desc: "AI agents that resolve tickets, answer FAQs, trigger shipping updates, process refund paths, and escalate sensitive cases to humans.",
    features: ["AI support agents", "Ticket triage", "Refund triggers", "Human escalation"],
    kind: "cx",
  },
];

const flowActions = [
  "Lead captured from ad or social DM",
  "CRM record created and enriched",
  "Slack alert sent to the right team",
  "Personalized email sequence triggered",
  "Retargeting audience updated automatically",
];

const connectors = [
  { name: "zapier", label: "Zapier" },
  { name: "make", label: "Make" },
  { name: "n8n", label: "n8n" },
  { name: "openai", label: "OpenAI" },
  { name: "anthropic", label: "Claude" },
  { name: "python", label: "Python" },
];

const scorecard = [
  { metric: "Weekly manual hours", manual: "25–60 hrs", automated: "4–8 hrs supervised" },
  { metric: "Error rate", manual: "5–12%", automated: "~0.1% with validation" },
  { metric: "Response speed", manual: "Hours or days", automated: "Seconds" },
  { metric: "Follow-up consistency", manual: "Depends on staff", automated: "Every lead, every time" },
  { metric: "Scalability limit", manual: "Headcount-bound", automated: "Near-infinite workflows" },
];

const safeguards = [
  "Encrypted API connections and scoped access",
  "Human-in-the-loop approvals for sensitive actions",
  "Audit trails for automation runs and customer events",
  "Rate limits, validation steps, and error fallback paths",
  "Private workflow design with least-privilege permissions",
  "Escalation logic for payments, refunds, and support risks",
];

export default function AutomationPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        isDark ? "bg-[#121212] text-white" : "bg-white text-slate-950"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_18%_10%,rgba(99,91,255,0.22),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(0,210,255,0.16),transparent_34%),linear-gradient(180deg,#121212_0%,#0b1020_52%,#121212_100%)]"
              : "bg-gradient-to-br from-white via-indigo-50/50 to-cyan-50/40"
          }`}
        />
        <div className="absolute top-16 -left-24 h-[520px] w-[520px] rounded-full bg-[#635bff]/25 blur-[130px] animate-pulse" />
        <div
          className="absolute top-48 -right-24 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[130px] animate-pulse"
          style={{ animationDelay: "1.4s" }}
        />
        <div
          className="absolute left-1/2 top-[520px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400uchsia-500/15 blur-[140px] animate-pulse"
          style={{ animationDelay: "2.1s" }}
        />
        <div
          className="absolute bottom-[15%] left-10 h-[420px] w-[420px] rounded-full bg-violet-500/15 blur-[130px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.06]" : "opacity-[0.06]"}`}
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
        <section className="mx-auto max-w-7xl px-6 text-center [transform-style:preserve-3d]">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-white/5 text-white/80"
                : "border-slate-200 bg-white/70 text-slate-700"
            }`}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
            Automation as a Service
            <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
            Neural growth systems
          </div>

          <h1
            className={`mx-auto mt-8 max-w-6xl text-5xl sm:text-6xl lg:text-[5.2rem] font-semibold leading-[1.02] tracking-[-0.045em] ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Your Business on Autopilot.
            <span className="block bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Systems that think, scale, and deliver.
            </span>
          </h1>

          <p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            We architect intelligent automation systems across social media, sales, operations, and customer experience — so your business captures, responds, routes, reports, and grows without manual bottlenecks.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?type=automation"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-8 py-3.5 text-white font-semibold shadow-[0_20px_70px_rgba(99,91,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span className="relative z-10">Build my automation system →</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <a
              href="#automation-universe"
              className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                isDark
                  ? "border-white/15 text-white hover:bg-white/10"
                  : "border-slate-300 text-slate-700 hover:bg-white"
              }`}
            >
              Explore automation universe
            </a>
          </div>

          <CommandCenter isDark={isDark} />
        </section>

        {/* AUTOMATION UNIVERSE */}
        <section id="automation-universe" className="mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>Automation universe</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              One architecture across every field of the business.
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We don’t build random zaps. We design connected systems where marketing, sales, operations, and support all communicate in real time.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {automationPillars.map((pillar, index) => (
              <AutomationBento key={pillar.title} isDark={isDark} index={index} {...pillar} />
            ))}
          </div>
        </section>

        {/* VISUAL FLOW */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#635bff]/20 blur-[110px]" />
            <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <Eyebrow isDark={isDark}>Visual flow</Eyebrow>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  A single lead enters. Five automated actions happen instantly.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Like a Stripe-style technical diagram, every node has a purpose: capture, enrich, notify, nurture, and retarget — without waiting for a human to move data manually.
                </p>
              </div>

              <NodeFlow isDark={isDark} />
            </div>
          </GlassCard>
        </section>

        {/* CONNECTORS */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <GlassCard isDark={isDark} className="px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.25em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"}>
                  Compatibility ribbon
                </div>
                <div className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>Connectors we architect around</div>
              </div>
              <div className="flex flex-wrap gap-3">
                {connectors.map((connector) => (
                  <ConnectorBadge key={connector.name} isDark={isDark} {...connector} />
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* SCORECARD */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <GlassCard isDark={isDark} className="p-8">
              <Eyebrow isDark={isDark}>Efficiency scorecard</Eyebrow>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Automation doesn’t just save time. It removes operational drag.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                The goal is not to replace people. The goal is to remove repetitive work so your team can focus on strategy, sales, and customer relationships.
              </p>
            </GlassCard>

            <ScorecardTable isDark={isDark} />
          </div>
        </section>

        {/* SECURITY */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px]" />
            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Eyebrow isDark={isDark}>Enterprise-grade security</Eyebrow>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  Fast automation with safe controls, private data, and human approval gates.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Every workflow is designed with encryption, scoped API access, fallback logic, and human-in-the-loop safeguards for actions that affect money, customers, or compliance.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {safeguards.map((item) => (
                  <Requirement key={item} isDark={isDark} label={item} />
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
          <GlassCard isDark={isDark} className="p-10">
            <Eyebrow isDark={isDark}>Autonomous growth</Eyebrow>
            <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Ready to turn your manual process into a growth system?
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We’ll map your workflows, identify the highest-leverage automations, and build a system that connects your tools, team, and customers.
            </p>
            <Link
              href="/contact?type=automation"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-[0_20px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
            >
              Start automation audit →
            </Link>
          </GlassCard>
        </section>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function VisualBox({
  isDark,
  title,
  subtitle,
  gradient,
  logo,
}: {
  isDark: boolean;
  title: string;
  subtitle: string;
  gradient: string;
  logo: string;
}) {
  return (
    <div
      className={`group/box relative overflow-hidden rounded-3xl border p-5 text-left transition duration-500 hover:-translate-y-2 hover:rotate-[1deg] ${
        isDark
          ? "border-white/10 bg-black/30 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
          : "border-white bg-white/90 shadow-[0_25px_80px_rgba(15,23,42,0.12)]"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 transition group-hover/box:opacity-30`} />
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-50`} />
      <div className="relative">
      <div className={`flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${gradient} text-white shadow-[0_22px_60px_rgba(99,91,255,0.42)] ring-1 ring-white/20`}>
        <BrandLogo name={logo} isDark={false} size="lg" />
      </div>
        <div className={`mt-5 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
        <div className={`mt-1 text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>{subtitle}</div>
      </div>
    </div>
  );
}

function CommandPanel({ isDark, title, value, sub }: { isDark: boolean; title: string; value: string; sub: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border p-5 text-left transition duration-500 hover:-translate-y-2 ${isDark ? "border-white/10 bg-black/30 shadow-[0_30px_90px_rgba(0,0,0,0.45)]" : "border-white bg-white/90 shadow-[0_25px_80px_rgba(15,23,42,0.12)]"}`}>
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#635bff]/25 blur-[55px]" />
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 text-white shadow-[0_22px_60px_rgba(99,91,255,0.42)] ring-1 ring-white/20">
          <BrandLogo name={title.toLowerCase() === "crm" ? "salesforce" : "instagram"} isDark={false} size="lg" />
        </div>
        <div className={isDark ? "mt-6 text-xs uppercase tracking-[0.22em] text-white/35" : "mt-6 text-xs uppercase tracking-[0.22em] text-slate-400"}>{title}</div>
        <div className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{value}</div>
        <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/55" : "text-slate-600"}`}>{sub}</p>
      </div>
    </div>
  );
}

function MiniStat({ isDark, label, value }: { isDark: boolean; label: string; value: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-4 text-left transition duration-500 hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]" : "border-white bg-white/90 shadow-[0_18px_55px_rgba(15,23,42,0.10)]"}`}>
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-400/15 blur-2xl" />
      <div className="relative">
        <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>{label}</div>
        <div className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{value}</div>
      </div>
    </div>
  );
}

function CommandCenter({ isDark }: { isDark: boolean }) {
  return (
    <div className="group relative mx-auto mt-16 h-[620px] w-full max-w-6xl perspective-[1600px]">
      <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/25 blur-[130px] transition duration-700 group-hover:scale-110" />
      <div
        className={`absolute inset-x-0 top-8 mx-auto max-w-5xl rotate-[1.5deg] rounded-[2.75rem] border p-6 backdrop-blur-2xl transition duration-700 group-hover:-translate-y-6 group-hover:rotate-[2.8deg] ${
          isDark
            ? "border-white/15 bg-white/[0.09] shadow-[0_80px_220px_rgba(0,0,0,0.65),0_0_120px_rgba(99,91,255,0.18)]"
            : "border-white/80 bg-white/90 shadow-[0_50px_150px_rgba(15,23,42,0.16),0_0_90px_rgba(99,91,255,0.14)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>Automation Command Center</div>
            <div className={`mt-1 text-3xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>Live Growth Operations</div>
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-400">Active now</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <VisualBox
            isDark={isDark}
            title="Social Pulse"
            subtitle="Publishing + engagement"
            gradient="from-pink-500 via-fuchsia-500 to-[#635bff]"
            logo="instagram"
          />
          <VisualBox
            isDark={isDark}
            title="Revenue Sync"
            subtitle="Stripe + CRM signals"
            gradient="from-[#635bff] via-blue-500 to-cyan-400"
            logo="salesforce"
          />
          <VisualBox
            isDark={isDark}
            title="AI Support"
            subtitle="Tickets + refunds"
            gradient="from-emerald-400 via-cyan-400 to-blue-500"
            logo="openai"
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
          <CommandPanel isDark={isDark} title="Social" value="42 posts" sub="Queued across 5 platforms" />
          <div className={`relative overflow-hidden rounded-3xl border p-5 shadow-2xl ${isDark ? "border-white/10 bg-black/30" : "border-white bg-white/90"}`}>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-[60px]" />
            <div className="flex items-center justify-between text-sm">
              <span className={isDark ? "text-white/60" : "text-slate-600"}>Revenue workflow</span>
              <span className="text-cyan-400">+31%</span>
            </div>
            <div className="relative mt-5 flex h-44 items-end gap-3">
              {[42, 58, 50, 75, 68, 92, 80, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-full bg-gradient-to-t from-[#635bff] to-cyan-400 shadow-[0_0_30px_rgba(99,91,255,0.25)]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <CommandPanel isDark={isDark} title="CRM" value="218 leads" sub="Scored, enriched, routed" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <MiniStat isDark={isDark} label="Tickets resolved" value="1,284" />
          <MiniStat isDark={isDark} label="Hours saved" value="320+" />
          <MiniStat isDark={isDark} label="Error rate" value="0.1%" />
          <MiniStat isDark={isDark} label="Automations" value="76 live" />
        </div>
      </div>
    </div>
  );
}


function AutomationBento({
  isDark,
  eyebrow,
  title,
  desc,
  features,
  kind,
  index,
}: {
  isDark: boolean;
  eyebrow: string;
  title: string;
  desc: string;
  features: string[];
  kind: string;
  index: number;
}) {
  return (
    <div
      className={`group relative min-h-[390px] overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:scale-[1.02] ${
        isDark
          ? "border-white/10 bg-white/[0.05] hover:bg-white/[0.07] shadow-[0_35px_110px_rgba(0,0,0,0.45)]"
          : "border-white bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.11)]"
      }`}
    >
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#635bff]/10 blur-[80px] transition group-hover:scale-125" />
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-[50px]" />
      <div className="relative">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.25em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"}>
          {eyebrow} · 0{index + 1}
        </div>
        <h3 className={`mt-4 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
        <p className={`mt-3 max-w-xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
        <AutomationVisual kind={kind} />
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <Requirement key={feature} isDark={isDark} label={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationVisual({ kind }: { kind: string }) {
  if (kind === "social") {
    return (
      <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-4 shadow-2xl">
        <div className="grid grid-cols-4 gap-4">
          {["instagram", "youtube", "linkedin", "tiktok"].map((logo) => (
            <div
              key={logo}
              className="flex min-h-[92px] items-center justify-center rounded-[1.6rem] bg-white/95 shadow-[0_22px_55px_rgba(15,23,42,0.32)] ring-1 ring-white/70 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.04]"
            >
              <BrandLogo name={logo} isDark={false} size="xxl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "sales") {
    return (
      <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-5 shadow-2xl">
        <div className="flex items-center justify-between text-sm text-white/70"><span>Lead Score</span><span className="text-cyan-300">92%</span></div>
        <div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400" /></div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            ["salesforce", "CRM"],
            ["gmail", "Email"],
            ["slack", "Slack"],
          ].map(([logo, label]) => (
            <div key={logo} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center text-xs font-semibold text-white/75">
              <BrandLogo name={logo} isDark={false} size="lg" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "ops") {
    return (
      <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-4 shadow-2xl">
        <div className="space-y-3">
          {[
            ["stripe", "Invoice approved"],
            ["sheets", "Report generated"],
            ["notion", "Onboarding task sent"],
          ].map(([logo, item], index) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg ring-1 ring-slate-200/70">
                <BrandLogo name={logo} isDark={false} size="md" />
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-5 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-emerald-400 to-cyan-400 text-white shadow-[0_22px_60px_rgba(16,185,129,0.35)] ring-1 ring-white/20">
          <BrandLogo name="openai" isDark={false} size="lg" />
        </div>
        <div>
          <div className="text-sm text-white/70">AI Agent resolved</div>
          <div className="mt-1 text-3xl font-semibold text-white">1,284</div>
        </div>
      </div>
      <div className="mt-5 h-20 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-[#635bff]/20" />
      <div className="mt-3 text-xs text-white/45">tickets this month</div>
    </div>
  );
}

function NodeFlow({ isDark }: { isDark: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border p-6 ${isDark ? "border-white/10 bg-black/30 shadow-[0_35px_100px_rgba(0,0,0,0.45)]" : "border-white bg-white/90 shadow-[0_30px_90px_rgba(15,23,42,0.12)]"}`}>
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/10 blur-[90px]" />
      <div className="relative grid gap-4">
        {flowActions.map((action, index) => (
          <div key={action} className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_18px_50px_rgba(99,91,255,0.35)] ring-1 ring-white/20">
              <BrandLogo name={["meta", "salesforce", "slack", "gmail", "googleads"][index]} isDark={false} size="lg" />
            </div>
            <div className={`flex-1 rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-white/10 bg-white/5 text-white/75" : "border-slate-200 bg-white text-slate-700"}`}>
              {action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectorBadge({ isDark, name, label }: { isDark: boolean; name: string; label: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/5 text-white/75 shadow-[0_16px_45px_rgba(0,0,0,0.25)]" : "border-white bg-white text-slate-700 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-[0_12px_28px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80">
        <BrandLogo name={name} isDark={false} size="md" />
      </span>
      {label}
    </div>
  );
}

function BrandLogo({ name, isDark, size = "md" }: { name: string; isDark: boolean; size?: "sm" | "md" | "lg" | "xl" | "xxl" }) {
  const darkFill = isDark ? "#ffffff" : "#0f172a";
  const sizeClass =
    size === "xxl"
      ? "h-14 w-14"
      : size === "xl"
      ? "h-10 w-10"
      : size === "lg"
      ? "h-8 w-8"
      : size === "sm"
      ? "h-5 w-5"
      : "h-6 w-6";

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <defs>
          <linearGradient id="igGradient" x1="0" y1="64" x2="64" y2="0">
            <stop stopColor="#F58529" />
            <stop offset="0.45" stopColor="#DD2A7B" />
            <stop offset="0.75" stopColor="#8134AF" />
            <stop offset="1" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="44" height="44" rx="13" fill="url(#igGradient)" />
        <circle cx="32" cy="32" r="10" fill="none" stroke="#fff" strokeWidth="4" />
        <circle cx="44" cy="20" r="3" fill="#fff" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="8" y="18" width="48" height="30" rx="9" fill="#FF0000" />
        <path d="M28 25v14l13-7-13-7Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="8" fill="#0A66C2" />
        <circle cx="22" cy="24" r="4" fill="#fff" />
        <path d="M18 30h8v20h-8V30Zm13 0h7.5v2.8c1.2-1.8 3.2-3.3 6.4-3.3 5 0 8.1 3.3 8.1 9.5v11h-8V40c0-2.7-1.1-4.2-3.2-4.2s-3.4 1.6-3.4 4.2v10H31V30Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "tiktok") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="12" fill="#111827" />
        <path d="M38 18c1.1 5.7 4.1 8.8 9 9.6v7.1c-3.4-.1-6.3-1.1-9-3.1v10.1c0 7-4.8 11.3-11 11.3-6.1 0-10.5-4.1-10.5-9.8 0-6.3 4.9-10.2 11.8-9.6v7.2c-2.6-.4-4.5.7-4.5 2.7 0 1.7 1.4 2.8 3.2 2.8 2.2 0 3.6-1.3 3.6-4.4V18H38Z" fill="#fff" />
        <path d="M38 18c.3 1.8.9 3.4 1.8 4.8" stroke="#25F4EE" strokeWidth="3" strokeLinecap="round" />
        <path d="M28.4 34c-7-.6-11.8 3.3-11.8 9.6" stroke="#FE2C55" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "salesforce") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M25 46c-5.6 0-10.2-4.2-10.2-9.5 0-4.2 2.9-7.8 7-9-1-5.5 3.6-10.5 9.5-10.5 3.6 0 6.8 1.8 8.5 4.5 1.4-.7 3-1.1 4.7-1.1 5.3 0 9.6 4 9.6 9 0 .8-.1 1.5-.3 2.2 3.1 1.5 5.2 4.5 5.2 8 0 5-4.3 9-9.6 9H25Z" fill="#00A1E0" />
        <text x="22" y="39" fontSize="12" fontWeight="700" fill="#fff">SF</text>
      </svg>
    );
  }

  if (name === "gmail") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="10" y="16" width="44" height="34" rx="6" fill="#fff" />
        <path d="M14 20 32 34 50 20" fill="none" stroke="#EA4335" strokeWidth="6" strokeLinejoin="round" />
        <path d="M14 22v24" stroke="#34A853" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 22v24" stroke="#4285F4" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 48h36" stroke="#FBBC05" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "slack") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M24 8a6 6 0 0 1 6 6v10h-6a6 6 0 0 1 0-12Z" fill="#36C5F0" />
        <path d="M56 24a6 6 0 0 1-6 6H40v-6a6 6 0 0 1 12 0Z" fill="#2EB67D" />
        <path d="M40 56a6 6 0 0 1-6-6V40h6a6 6 0 0 1 0 12Z" fill="#ECB22E" />
        <path d="M8 40a6 6 0 0 1 6-6h10v6a6 6 0 0 1-12 0Z" fill="#E01E5A" />
        <path d="M34 8a6 6 0 0 1 12 0v16H34V8Z" fill="#2EB67D" />
        <path d="M56 34a6 6 0 0 1 0 12H40V34h16Z" fill="#ECB22E" />
        <path d="M30 56a6 6 0 0 1-12 0V40h12v16Z" fill="#E01E5A" />
        <path d="M8 30a6 6 0 0 1 0-12h16v12H8Z" fill="#36C5F0" />
      </svg>
    );
  }

  if (name === "stripe") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="11" fill="#635BFF" />
        <path d="M38 30c-4.5-1.5-6-2.4-6-4 0-1.4 1.2-2.3 3.6-2.3 2.7 0 5.5.9 7.5 2v-6.2c-1.8-.8-4.4-1.5-7.5-1.5-6.8 0-11.1 3.5-11.1 8.8 0 4.8 3.5 6.8 9 8.6 3.7 1.3 5 2.2 5 3.9 0 1.6-1.4 2.5-4 2.5-3.1 0-6.4-1.2-8.7-2.6v6.4c2.1 1.1 5.3 2 9 2 7.2 0 11.7-3.4 11.7-9.1 0-4.8-3-6.6-8.5-8.5Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "sheets") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M18 8h22l10 10v38H18V8Z" fill="#0F9D58" />
        <path d="M40 8v10h10" fill="#87D7A5" />
        <path d="M25 28h18M25 36h18M25 44h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "notion") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="6" fill="#fff" stroke="#111827" strokeWidth="4" />
        <path d="M22 45V20h5l13 18V20h5v25h-5L27 27v18h-5Z" fill="#111827" />
      </svg>
    );
  }

  if (name === "meta") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M13 39c0-10 5-17 11-17 5 0 7 4 10 9 3-5 6-9 11-9 6 0 11 7 11 17 0 5-2 8-6 8-4 0-7-3-11-10l-5-8-5 8c-4 7-7 10-11 10-4 0-6-3-6-8Z" fill="none" stroke="#1877F2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "googleads") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M26 12h10l18 32a7 7 0 0 1-12 7L26 22a7 7 0 0 1 0-10Z" fill="#4285F4" />
        <path d="M26 12a7 7 0 0 1 6 10L16 51a7 7 0 0 1-12-7L20 15a7 7 0 0 1 6-3Z" fill="#34A853" />
        <circle cx="48" cy="48" r="8" fill="#FBBC05" />
      </svg>
    );
  }

  if (name === "zapier") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <circle cx="32" cy="32" r="24" fill="#FF4A00" />
        <path d="M32 15v34M15 32h34M20 20l24 24M44 20 20 44" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "make") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="8" y="16" width="48" height="32" rx="10" fill="#6D28D9" />
        <path d="M18 40V24h6l8 10 8-10h6v16h-6V32l-6 8h-4l-6-8v8h-6Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "n8n") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <circle cx="16" cy="32" r="7" fill="#EA4B71" />
        <circle cx="32" cy="20" r="7" fill="#EA4B71" />
        <circle cx="48" cy="32" r="7" fill="#EA4B71" />
        <circle cx="32" cy="44" r="7" fill="#EA4B71" />
        <path d="M22 29 28 23M38 23 44 29M44 35 38 41M28 41 22 35" stroke="#EA4B71" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "openai") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M32 8c5 0 9 2.5 11.3 6.3 4.4.4 8.2 3.2 10 7.3 2.5 5.5.8 11.3-3.5 14.8.4 4.4-1.5 8.8-5.2 11.5-4.9 3.6-10.9 3.3-15.4.2-4 1.8-8.7 1.2-12.3-1.7-4.7-3.8-6-9.7-4.4-14.9-2.8-3.4-3.6-8.2-1.7-12.5C13.2 13.5 18.6 11 24 11.8 26.1 9.4 28.9 8 32 8Z" fill="none" stroke={darkFill} strokeWidth="4" strokeLinejoin="round" />
        <path d="M24 24 40 15M24 24v17l16 8M24 41l16-9 8-14M40 49V32l-16-8" fill="none" stroke={darkFill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "anthropic") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <rect x="8" y="10" width="48" height="44" rx="10" fill="#D4A373" />
        <path d="M20 44 31 18h5l11 26h-7l-2-5H29l-2 5h-7Zm11-11h5l-2.5-7-2.5 7Z" fill="#111827" />
      </svg>
    );
  }

  if (name === "python") {
    return (
      <svg viewBox="0 0 64 64" className={sizeClass} aria-hidden="true">
        <path d="M31 8h10c6 0 9 3 9 9v10c0 6-3 9-9 9H23c-5 0-9 4-9 9v3H8V36c0-6 5-11 11-11h18v-4H21V17c0-6 4-9 10-9Z" fill="#3776AB" />
        <path d="M33 56H23c-6 0-9-3-9-9V37c0-6 3-9 9-9h18c5 0 9-4 9-9v-3h6v12c0 6-5 11-11 11H27v4h16v4c0 6-4 9-10 9Z" fill="#FFD43B" />
        <circle cx="39" cy="16" r="2" fill="#fff" />
        <circle cx="25" cy="48" r="2" fill="#111827" />
      </svg>
    );
  }

  return null;
}

function ScorecardTable({ isDark }: { isDark: boolean }) {
  return (
    <GlassCard isDark={isDark} className="overflow-hidden">
      <div className="grid grid-cols-3 border-b border-slate-200/20 px-5 py-3 text-xs font-semibold uppercase tracking-wider">
        <div>Metric</div>
        <div>Manual Process</div>
        <div>Automated System</div>
      </div>
      {scorecard.map((row) => (
        <div key={row.metric} className={`grid grid-cols-3 gap-3 border-b px-5 py-4 text-sm last:border-b-0 ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{row.metric}</div>
          <div className={isDark ? "text-white/55" : "text-slate-500"}>{row.manual}</div>
          <div className={isDark ? "text-cyan-300" : "text-[#635bff]"}>{row.automated}</div>
        </div>
      ))}
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
          ? "border-white/10 bg-white/[0.05] shadow-[0_35px_110px_rgba(0,0,0,0.40)]"
          : "border-white bg-white/85 shadow-[0_30px_100px_rgba(15,23,42,0.10)]"
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