"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const benefits = [
  "Fast EIN preparation for U.S. business setup",
  "Clear guidance for non-U.S. residents and founders",
  "Document review before submission",
  "Step-by-step support until your request is complete",
];

const steps = [
  {
    title: "Tell us about your company",
    desc: "Share your LLC or corporation details, owner information, and business purpose.",
  },
  {
    title: "We prepare the EIN request",
    desc: "Our team reviews the details, checks for missing information, and prepares the required filing flow.",
  },
  {
    title: "Submit and track",
    desc: "We guide the submission process and keep you updated until your EIN request is completed.",
  },
];

const requiredItems = [
  "Company legal name",
  "Formation state",
  "Responsible party name",
  "Business address",
  "Business activity",
  "Formation document, if available",
];

const faqs = [
  {
    q: "Can non-U.S. residents apply for an EIN?",
    a: "Yes. Non-U.S. residents can request an EIN for a U.S. business, but the process may differ from online applications available to U.S. taxpayers.",
  },
  {
    q: "Do you guarantee approval?",
    a: "We prepare and guide the process carefully, but final approval and timing depend on the IRS and the accuracy of the submitted information.",
  },
  {
    q: "Can I use the EIN for banking and Stripe?",
    a: "An EIN is commonly required for business banking, payment processors, tax setup, and vendor accounts. Each provider may still request additional verification.",
  },
];

export default function EinRegistrationPage() {
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
              ? "bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950/40"
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
              Business Setup
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              EIN Registration
            </div>

            <h1
              className={`mx-auto mt-8 max-w-5xl text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.03em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Get your EIN ready for
              <span className="block bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                banking, Stripe, and growth.
              </span>
            </h1>

            <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            <p
              className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              Shata Solutions helps founders prepare and complete the EIN process with a clear, guided workflow built for modern online businesses.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?type=ein"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Start EIN request →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#requirements"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                See requirements
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <TrustChip isDark={isDark} label="Founder-friendly" />
              <TrustChip isDark={isDark} label="Non-U.S. resident guidance" />
              <TrustChip isDark={isDark} label="Secure document handling" />
              <TrustChip isDark={isDark} label="Clear status updates" />
            </div>
          </section>

          <section className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-4">
            {benefits.map((item) => (
              <FeatureCard key={item} isDark={isDark} title={item} />
            ))}
          </section>

          <section className="mx-auto mt-20 max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className={`rounded-3xl border p-8 backdrop-blur-xl ${
                  isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                  How it works
                </div>
                <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  A simple flow from business details to EIN-ready setup.
                </h2>
                <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  We keep the process clear, reduce back-and-forth, and help you avoid common mistakes before submission.
                </p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <StepCard key={step.title} isDark={isDark} index={index + 1} title={step.title} desc={step.desc} />
                ))}
              </div>
            </div>
          </section>

          <section id="requirements" className="mx-auto mt-20 max-w-6xl px-6">
            <div
              className={`rounded-3xl border p-8 backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-xl"
              }`}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                    Requirements
                  </div>
                  <h2 className={`mt-3 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    What you’ll need before starting.
                  </h2>
                </div>
                <p className={`max-w-md text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Have these details ready so your request can be reviewed and prepared faster.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {requiredItems.map((item) => (
                  <Requirement key={item} isDark={isDark} label={item} />
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {faqs.map((faq) => (
                <FaqCard key={faq.q} isDark={isDark} q={faq.q} a={faq.a} />
              ))}
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
                Ready to set up your EIN?
              </h2>
              <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Start with a guided request. We’ll help you understand the process and prepare the right details before moving forward.
              </p>
              <Link
                href="/contact?type=ein"
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

function FeatureCard({ isDark, title }: { isDark: boolean; title: string }) {
  return (
    <div
      className={`group relative rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="relative text-sm font-semibold leading-relaxed">{title}</div>
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

function FaqCard({ isDark, q, a }: { isDark: boolean; q: string; a: string }) {
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-sm"
      }`}
    >
      <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{q}</h3>
      <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>{a}</p>
    </div>
  );
}
