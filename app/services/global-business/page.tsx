"use client";
"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const highlights = [
  {
    title: "U.S. business setup",
    description:
      "Launch with the right structure, documents, and foundation from day one.",
  },
  {
    title: "Global payment readiness",
    description:
      "Prepare your business for payment processors, banking tools, and international clients.",
  },
  {
    title: "Operating system",
    description:
      "Build the workflows, website, and automation needed to run across borders.",
  },
];

const included = [
  "Company formation guidance",
  "EIN preparation support",
  "Payment setup direction",
  "Website or landing page setup",
  "Lead capture and automation",
  "Launch workflow planning",
];

const steps = [
  {
    step: "01",
    title: "Share your goal",
    description:
      "Tell us where you are, what you want to launch, and which markets you want to serve.",
  },
  {
    step: "02",
    title: "Build the foundation",
    description:
      "We help organize the core setup: formation path, EIN readiness, payments, and online presence.",
  },
  {
    step: "03",
    title: "Launch globally",
    description:
      "Go live with a clean system for payments, leads, communication, and client onboarding.",
  },
];

export default function GlobalBusinessPage() {
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
              Global Business
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Operate worldwide
            </div>

            <h1
              className={`mx-auto mt-8 max-w-5xl text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.03em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Build a business that can
              <span className="block bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                sell beyond borders.
              </span>
            </h1>

            <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            <p
              className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              Shata Solutions helps founders set up the structure, payments, website, and systems needed to launch and operate globally with clarity.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?type=global-business"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Start global setup →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#included"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                See what’s included
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <TrustChip isDark={isDark} label="Founder-friendly" />
              <TrustChip isDark={isDark} label="Remote-ready setup" />
              <TrustChip isDark={isDark} label="Payments guidance" />
              <TrustChip isDark={isDark} label="Systems-first approach" />
            </div>
          </section>

          <section className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
            {highlights.map((item) => (
              <FeatureCard
                key={item.title}
                isDark={isDark}
                title={item.title}
                description={item.description}
              />
            ))}
          </section>

          <section id="included" className="mx-auto mt-20 max-w-6xl px-6">
            <div
              className={`rounded-3xl border p-8 backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"
              }`}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    What’s included
                  </div>
                  <h2 className={`mt-3 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    Everything you need to start operating globally.
                  </h2>
                </div>
                <p className={`max-w-md text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  A clean launch foundation for founders who want to sell, collect payments, and manage customers internationally.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {included.map((item) => (
                  <Requirement key={item} isDark={isDark} label={item} />
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className={`rounded-3xl border p-8 backdrop-blur-xl ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                  How it works
                </div>
                <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  A simple path from idea to global launch.
                </h2>
                <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  We connect the core pieces so you don’t have to figure out formation, payments, website, and automation separately.
                </p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <StepCard
                    key={step.title}
                    isDark={isDark}
                    index={index + 1}
                    title={step.title}
                    desc={step.description}
                  />
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
                Ready to build your global setup?
              </h2>
              <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Start with a guided request. We’ll help you understand the best setup for your market, service, and growth plan.
              </p>
              <Link
                href="/contact?type=global-business"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
              >
                Start now →
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

function FeatureCard({ isDark, title, description }: { isDark: boolean; title: string; description: string }) {
  return (
    <div
      className={`group relative rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="relative">
        <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h2>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{description}</p>
      </div>
    </div>
  );
}

function StepCard({ isDark, index, title, desc }: { isDark: boolean; index: number; title: string; desc: string }) {
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
      className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
        isDark ? "border-white/10 bg-white/5 text-white/80" : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <span className={isDark ? "text-blue-400" : "text-blue-600"}>✓</span> {label}
    </div>
  );
}