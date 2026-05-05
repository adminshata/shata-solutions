"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const pillars = [
  {
    eyebrow: "Pillar 01",
    title: "ICP & Positioning",
    body:
      "Define the accounts most likely to buy, stay, expand, and refer. We map pain points, buying committees, objections, and the value story for each persona.",
    bullets: ["Economic buyer messaging", "Champion enablement", "End-user adoption narrative"],
  },
  {
    eyebrow: "Pillar 02",
    title: "SEO & Social Search",
    body:
      "Build a 2026-ready search engine across Google, LinkedIn, and YouTube using keyword clusters, authority content, and search-optimized social assets.",
    bullets: ["Google topic clusters", "LinkedIn search content", "YouTube intent videos"],
  },
  {
    eyebrow: "Pillar 03",
    title: "The Ad Flywheel",
    body:
      "Design TOFU, MOFU, and BOFU campaigns across LinkedIn and Google to create demand, capture intent, and convert sales-ready buyers.",
    bullets: ["Value-first video", "Retargeting flows", "Conversion campaigns"],
  },
  {
    eyebrow: "Pillar 04",
    title: "Automation & RevOps",
    body:
      "Connect forms, CRM, email, product events, Slack alerts, and nurture sequences so every lead moves through a measurable lifecycle.",
    bullets: ["Trial-to-paid nurture", "Sales-ready alerts", "Lapsed-user reactivation"],
  },
  {
    eyebrow: "Pillar 05",
    title: "PLG & Viral Loops",
    body:
      "Add in-product growth loops that let users invite teammates, share branded outputs, and create organic acquisition from product usage.",
    bullets: ["Collaboration invites", "Branded exports", "Usage-based prompts"],
  },
  {
    eyebrow: "Pillar 06",
    title: "KPI Scorecard",
    body:
      "Track the numbers that actually matter: pipeline, CAC, payback period, activation, conversion, churn, expansion, and LTV:CAC.",
    bullets: ["MRR growth", "CAC payback", "Activation quality"],
  },
];

const execution = [
  {
    phase: "Months 1–2",
    title: "Foundation & Market Clarity",
    desc: "Finalize ICP, messaging, competitor map, analytics, lifecycle stages, CRM fields, and conversion tracking.",
  },
  {
    phase: "Months 3–4",
    title: "Search & Content Engine",
    desc: "Launch SEO clusters, LinkedIn thought leadership, YouTube explainers, and first conversion assets for each persona.",
  },
  {
    phase: "Months 5–6",
    title: "Paid Acquisition Flywheel",
    desc: "Launch TOFU video campaigns, pricing-page retargeting, BOFU search campaigns, and social-proof experiments.",
  },
  {
    phase: "Months 7–9",
    title: "Automation & PLG Expansion",
    desc: "Add trial scoring, Slack alerts, nurture flows, lapsed-user campaigns, referral prompts, and in-app invite loops.",
  },
  {
    phase: "Months 10–12",
    title: "Optimization & Scale",
    desc: "Double down on highest-converting channels, improve CAC payback, expand content moat, and systemize reporting.",
  },
];

const metrics = [
  ["LTV:CAC Ratio", "LTV ÷ CAC", "Target 3:1+"],
  ["CAC Payback", "CAC ÷ gross profit per customer per month", "Target < 12 months"],
  ["Trial-to-Paid", "Paid conversions ÷ trials", "Target improves monthly"],
  ["Activation Rate", "Activated users ÷ signups", "Leading indicator of revenue"],
  ["Pipeline Velocity", "Opportunities × win rate × ACV ÷ sales cycle", "Revenue momentum"],
];

export default function MarketingPlansPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        isDark ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/40"
              : "bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30"
          }`}
        />
        <div className="absolute top-20 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div
          className="absolute top-44 -right-24 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.04]" : "opacity-[0.06]"}`}
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div
        className={`relative min-h-screen transition-colors duration-300 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        <GlobalStyles />
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          openOnboarding={() => {}}
          openDashboard={() => {}}
        />

        <main className="relative z-10 pt-32 pb-24">
          <section className="mx-auto max-w-7xl px-6 text-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white/70 text-slate-700"
              }`}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Marketing Plans
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Operator-grade growth
            </div>

            <h1
              className={`mx-auto mt-8 max-w-5xl text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.03em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Build a marketing system that
              <span className="block bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                drives MRR, not noise.
              </span>
            </h1>

            <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            <p
              className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              We design practical 12-month marketing execution plans for SaaS, service businesses, and online brands — focused on ICP clarity, pipeline creation, CAC control, and repeatable revenue growth.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?type=marketing-plans"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Request growth plan →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#framework"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                View framework
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <TrustChip isDark={isDark} label="MRR-focused" />
              <TrustChip isDark={isDark} label="CAC-aware" />
              <TrustChip isDark={isDark} label="RevOps-ready" />
              <TrustChip isDark={isDark} label="12-month execution" />
            </div>
          </section>

          <section id="framework" className="mx-auto mt-20 max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <PillarCard key={pillar.title} isDark={isDark} {...pillar} />
              ))}
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-6xl px-6">
            <div
              className={`rounded-3xl border p-8 backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"
              }`}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    12-month execution plan
                  </div>
                  <h2 className={`mt-3 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    From positioning to paid acquisition to lifecycle automation.
                  </h2>
                </div>
                <p className={`max-w-md text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Each phase is designed to build compounding demand, improve conversion quality, and reduce wasted spend.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {execution.map((item, index) => (
                  <ExecutionCard key={item.title} isDark={isDark} index={index + 1} {...item} />
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div
                className={`rounded-3xl border p-8 backdrop-blur-xl ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                  KPI scorecard
                </div>
                <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  The metrics we optimize every month.
                </h2>
                <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  No vanity dashboards. The plan is measured by pipeline quality, conversion, acquisition efficiency, retention, and revenue growth.
                </p>
              </div>

              <div className={`overflow-hidden rounded-3xl border backdrop-blur-xl ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"}`}>
                <div className="grid grid-cols-3 border-b border-slate-200/20 px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                  <div>Metric</div>
                  <div>Formula</div>
                  <div>Goal</div>
                </div>
                {metrics.map(([metric, formula, goal]) => (
                  <div key={metric} className={`grid grid-cols-3 gap-3 px-5 py-4 text-sm ${isDark ? "border-white/10" : "border-slate-200"} border-b last:border-b-0`}>
                    <div className="font-semibold">{metric}</div>
                    <div className={isDark ? "text-white/60" : "text-slate-600"}>{formula}</div>
                    <div className={isDark ? "text-blue-300" : "text-blue-600"}>{goal}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-5xl px-6 text-center">
            <div
              className={`rounded-[2rem] border p-10 backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
              }`}
            >
              <h2 className={`text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Need a growth plan your team can actually execute?
              </h2>
              <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We’ll turn your niche, audience, offer, and revenue goals into a clear operator-grade roadmap.
              </p>
              <Link
                href="/contact?type=marketing-plans"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
              >
                Build my plan →
              </Link>
            </div>
          </section>
        </main>

        <SiteFooter isDark={isDark} />
      </div>
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

function PillarCard({
  isDark,
  eyebrow,
  title,
  body,
  bullets,
}: {
  isDark: boolean;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
}) {
  return (
    <div
      className={`group relative rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="relative">
        <div className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${isDark ? "text-blue-400" : "text-blue-600"}`}>{eyebrow}</div>
        <h2 className={`mt-3 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h2>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{body}</p>
        <div className="mt-5 space-y-2">
          {bullets.map((item) => (
            <div key={item} className={`text-sm ${isDark ? "text-white/70" : "text-slate-700"}`}>
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExecutionCard({
  isDark,
  index,
  phase,
  title,
  desc,
}: {
  isDark: boolean;
  index: number;
  phase: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] ${
        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white/80 hover:shadow-xl"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
          {index}
        </div>
        <div>
          <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-white/40" : "text-slate-400"}`}>{phase}</div>
          <h3 className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
        </div>
      </div>
    </div>
  );
}