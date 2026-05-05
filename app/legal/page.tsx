"use client";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LegalCenterPage() {
  const { isDark } = useTheme();
  const noop = () => {};

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={noop}
        openOnboarding={noop}
        openDashboard={noop}
      />

      <section className="relative overflow-hidden">
      {/* ambient gradient backdrop (same as PartnerHero) */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/40"
              : "bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30"
          }`}
        />
        <div className="absolute top-20 -left-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute top-40 -right-20 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className={`min-h-screen ${isDark ? "text-white" : "text-slate-900"}`}>
        <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">

        {/* HERO */}
        <div className="text-center mb-16 pt-28">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl mb-4 ${
              isDark
                ? "border-white/10 bg-white/5 text-white/80"
                : "border-slate-200 bg-white/70 text-slate-700"
            }`}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>Legal Center</span>
            <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
            <span className={isDark ? "text-blue-400" : "text-blue-600"}>
              Compliance & Policies
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-6xl lg:text-[4.5rem] font-semibold leading-[1.02] tracking-[-0.02em] ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Legal <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Center</span>
          </h1>

          <p className={`mt-6 text-base max-w-xl mx-auto ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>
            Understand how Shata Solutions operates, safeguards your data, and maintains enterprise-grade compliance across our platform.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

          <GlassCard href="/legal/privacy" title="Privacy Policy" desc="How we collect, process, and safeguard your data across our platform" />
          <GlassCard href="/legal/terms" title="Terms of Service" desc="Rules, responsibilities, and conditions for using Shata Solutions" />
          <GlassCard href="/legal/cookies" title="Cookies & Tracking" desc="How we use cookies and analytics to improve your experience" />
          <GlassCard href="/legal/partners" title="Partner Program Terms" desc="Commission structure, referrals, and partner responsibilities" />

        </div>

        {/* COMPLIANCE BLOCK */}
        <div className="relative mb-16">
          <div className={`absolute inset-0 blur-3xl opacity-20 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`} />

          <div className={`relative rounded-3xl p-8 border backdrop-blur-xl ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white/80 border-slate-200 shadow-xl"
          }`}>
            <h2 className="text-xl font-semibold mb-3">Compliance & Security</h2>

            <p className={`text-sm mb-6 ${
              isDark ? "text-white/60" : "text-slate-600"
            }`}>
              We build our platform with security at the core — protecting your data, your operations, and your business at every step.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Pill label="Data protection" />
              <Pill label="Privacy standards" />
              <Pill label="Security audits" />
              <Pill label="Payment security" />
            </div>
          </div>
        </div>

        {/* CONTACT / SUPPORT */}
        <div className="grid md:grid-cols-3 gap-6">
          <SupportCard
            title="Legal support"
            desc="Questions about terms, policies, or agreements."
            cta="Contact support"
          />
          <SupportCard
            title="Privacy requests"
            desc="Request data access, updates, or deletion."
            cta="Submit request"
          />
          <SupportCard
            title="Security issues"
            desc="Report vulnerabilities or suspicious activity."
            cta="Report issue"
          />
        </div>

        <p className="text-center text-xs mt-16 opacity-50">
          © {new Date().getFullYear()} Shata Solutions Inc. All rights reserved.
        </p>

        </main>
      </div>
    </section>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

/* ---------------- Components ---------------- */

function GlassCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  const { isDark } = useTheme();
  return (
    <Link href={href} className="block">
      <div className={`cursor-pointer group relative rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-slate-200 bg-white/80"
      }`}>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
        <div className="relative">
          <h3 className={`font-semibold text-base mb-2 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>{title}</h3>
          <p className={`text-sm ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}>{desc}</p>
        </div>
      </div>
    </Link>
  );
}

function Pill({ label }: { label: string }) {
  const { isDark } = useTheme();
  return (
    <div
      className={`rounded-full px-4 py-2 text-xs font-semibold text-center ${
        isDark
          ? "border border-white/10 bg-white/5 text-white"
          : "border border-slate-200 bg-white text-slate-700"
      }`}
    >
      {label}
    </div>
  );
}


function SupportCard({ title, desc, cta }: { title: string; desc: string; cta: string }) {
  const { isDark } = useTheme();
  const router = useRouter();

  function handleClick() {
    const type = title.toLowerCase().includes("legal")
      ? "legal"
      : title.toLowerCase().includes("privacy")
      ? "privacy"
      : "security";

    router.push(`/contact?type=${type}`);
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] cursor-pointer ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-slate-200 bg-white/80"
      }`}
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />

      <div className="relative">
        <div
          className={`text-sm font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </div>

        <p
          className={`text-sm mt-2 ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}
        >
          {desc}
        </p>

        <div
          className={`text-sm mt-4 font-medium ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {cta} →
        </div>
      </div>
    </div>
  );
}