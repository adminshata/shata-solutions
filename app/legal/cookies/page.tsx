"use client";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

export default function CookiesPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background (same system as partner page) */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/40"
              : "bg-gradient-to-br from-white via-blue-100/60 to-purple-100/50"
          }`}
        />

        <div className="absolute top-20 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div
          className="absolute top-40 -right-20 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse"
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
          isDark ? "text-white" : "bg-white text-slate-900"
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
          <div className="mx-auto max-w-6xl px-6 text-center">

            {/* Top pill */}
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white/70 text-slate-700"
              }`}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Privacy System
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Cookies & Tracking
            </div>

            {/* Headline */}
            <h1
              className={`mt-8 text-5xl sm:text-6xl font-semibold tracking-[-0.02em] leading-tight ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Cookies built for
              <span className="block bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-[pulse_4s_ease-in-out_infinite]">
                performance & trust.
              </span>
            </h1>

            <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            <p
              className={`mt-6 max-w-2xl mx-auto text-lg ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              We use modern tracking systems to improve experience, analyze usage, and power referral attribution — while respecting user privacy.
            </p>

            {/* Chips */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 animate-[float_6s_ease-in-out_infinite]">
              <Chip label="Session Tracking" isDark={isDark} />
              <Chip label="Referral Attribution" isDark={isDark} />
              <Chip label="Analytics" isDark={isDark} />
              <Chip label="Privacy-first" isDark={isDark} />
            </div>
          </div>

          {/* Sections */}
          <div className="mx-auto max-w-4xl px-6 mt-16 space-y-6">
            <Section title="What Are Cookies" isDark={isDark}>
              Cookies are lightweight data files stored in your browser that help us recognize sessions, improve speed, and deliver a consistent user experience.
            </Section>

            <Section title="How We Use Them" isDark={isDark}>
              We use cookies for authentication, referral tracking, analytics, and performance optimization across the Shata platform.
            </Section>

            <Section title="Types of Cookies" isDark={isDark}>
              We use essential cookies for functionality, analytics cookies for insights, and attribution cookies for partner tracking.
            </Section>

            <Section title="Third-Party Services" isDark={isDark}>
              Some cookies are set by trusted partners such as payment processors and analytics providers to ensure secure and optimized experiences.
            </Section>

            <Section title="Control & Settings" isDark={isDark}>
              You can disable or manage cookies via browser settings. Some features may be limited if cookies are turned off.
            </Section>

            <Section title="Updates" isDark={isDark}>
              We may update this policy over time. Continued usage means acceptance of updated practices.
            </Section>
          </div>

          <style jsx global>{`
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}
`}</style>
        </main>

        <SiteFooter isDark={isDark} />
      </div>
    </div>
  );
}

function Section({ title, children, isDark }: any) {
  return (
    <div
      className={`group relative rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/20 transition" />

      <div className="relative">
        <h2 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          {children}
        </p>
      </div>
    </div>
  );
}

function Chip({ label, isDark }: any) {
  return (
    <div
      className={`px-5 py-2.5 rounded-full text-xs font-semibold backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
        isDark
          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
          : "border-slate-200 bg-white text-slate-700 hover:shadow-md"
      }`}
    >
      {label}
    </div>
  );
}