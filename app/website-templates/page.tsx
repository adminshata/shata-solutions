"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import OnboardingModal from "@/components/home/OnboardingModal";
import DashboardModal from "@/components/home/DashboardModal";
import TemplateCard from "@/components/templates/shared/TemplateCard";
import FeaturedTemplateCard from "@/components/templates/shared/FeaturedTemplateCard";
import TemplateFilters from "@/components/templates/shared/TemplateFilters";
import { useTheme, useSession } from "@/lib/hooks";
import {
  LIVE_TEMPLATES,
  FEATURED_TEMPLATES,
  TEMPLATE_STATS,
  TEMPLATE_CATEGORIES,
  getTemplatesByCategory,
  type TemplateCategoryFilter,
} from "@/lib/templates/registry";
import type { PlanId } from "@/lib/types";

export default function WebsiteTemplatesPage() {
  const { isDark, toggleTheme } = useTheme();
  const sessionId = useSession();

  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingPlan, setOnboardingPlan] = useState<PlanId>("growth");
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TemplateCategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const openOnboarding = (plan: PlanId) => {
    setOnboardingPlan(plan);
    setOnboardingOpen(true);
  };
  const openDashboard = () => setDashboardOpen(true);

  const filteredTemplates = useMemo(() => {
    let list = getTemplatesByCategory(activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const counts = useMemo(() => {
    const result: Partial<Record<TemplateCategoryFilter, number>> = { All: LIVE_TEMPLATES.length };
    for (const cat of TEMPLATE_CATEGORIES.slice(1)) {
      result[cat] = LIVE_TEMPLATES.filter((t) => t.category === cat).length;
    }
    return result;
  }, []);

  const showFeatured = activeCategory === "All" && !searchQuery.trim();

  return (
    <>
      <GlobalStyles />
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialPlan={onboardingPlan}
        isDark={isDark}
        sessionId={sessionId}
      />
      <DashboardModal open={dashboardOpen} onClose={() => setDashboardOpen(false)} isDark={isDark} />

      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-[#070c1a] text-white" : "bg-slate-50 text-slate-900"
        }`}
      >
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          openOnboarding={openOnboarding}
          openDashboard={openDashboard}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-16 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-60 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full opacity-[0.14] blur-[130px]"
              style={{
                background: "radial-gradient(ellipse, #635bff 0%, #06b6d4 40%, #8b5cf6 70%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            {/* Label */}
            <div
              className={`inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] border ${
                isDark
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-blue-50 border-blue-200 text-blue-600"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              {TEMPLATE_STATS.total} Production-Ready Templates
            </div>

            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Premium Website Templates
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Built to Convert
              </span>
            </h1>

            <p
              className={`text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${
                isDark ? "text-white/55" : "text-slate-500"
              }`}
            >
              {TEMPLATE_STATS.total} fully-designed website templates across {TEMPLATE_STATS.categories} industries.
              Every template includes domain, hosting, SSL, business email, CRM flows, and full support.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { value: String(TEMPLATE_STATS.total), label: "Live Templates" },
                { value: String(TEMPLATE_STATS.categories), label: "Industries" },
                { value: `${TEMPLATE_STATS.pagesTotal}+`, label: "Total Pages" },
                { value: "100%", label: "Mobile Ready" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`flex items-baseline gap-2.5 px-5 py-3 rounded-2xl border backdrop-blur-sm ${
                    isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <span
                    className={`text-2xl font-bold tabular-nums ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {s.value}
                  </span>
                  <span className={`text-xs font-medium ${isDark ? "text-white/45" : "text-slate-500"}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  isDark ? "text-white/30" : "text-slate-400"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by industry, style, or feature…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm outline-none transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:bg-white/8"
                    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
                }`}
              />
            </div>
          </div>
        </section>

        {/* ── Featured Templates ────────────────────────────────────────── */}
        {showFeatured && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2
                    className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    Featured Templates
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? "text-white/45" : "text-slate-500"}`}>
                    Our most complete and popular templates
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                    isDark ? "border-white/10 text-white/35" : "border-slate-200 text-slate-400"
                  }`}
                >
                  {FEATURED_TEMPLATES.length} featured
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_TEMPLATES.map((t) => (
                  <FeaturedTemplateCard key={t.id} template={t} isDark={isDark} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── All Templates ─────────────────────────────────────────────── */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            {/* Divider label when featured is shown */}
            {showFeatured && (
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
                <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  All Templates
                </h2>
                <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
              </div>
            )}

            {/* Filters + result count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <TemplateFilters
                active={activeCategory}
                onChange={(cat) => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                isDark={isDark}
                counts={counts}
              />
              <span className={`text-sm whitespace-nowrap ${isDark ? "text-white/35" : "text-slate-400"}`}>
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Template grid */}
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredTemplates.map((t) => (
                  <TemplateCard key={t.id} template={t} isDark={isDark} />
                ))}
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center py-24 ${
                  isDark ? "text-white/35" : "text-slate-400"
                }`}
              >
                <div className={`text-5xl mb-4 font-thin ${isDark ? "text-white/15" : "text-slate-200"}`}>
                  ∅
                </div>
                <p className="text-base font-semibold">No templates found</p>
                <p className="text-sm mt-1">Try a different category or search term.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Included With Every Template ─────────────────────────────── */}
        <section
          className={`px-6 py-20 border-t border-b ${
            isDark ? "border-white/8" : "border-slate-200"
          }`}
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
              Every template includes
            </h2>
            <p className={`text-base mb-12 ${isDark ? "text-white/50" : "text-slate-500"}`}>
              Not just a design — a complete web presence, ready to grow.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: "🌐", label: "Custom Domain" },
                { icon: "🔒", label: "SSL Certificate" },
                { icon: "☁️", label: "Managed Hosting" },
                { icon: "📧", label: "Business Email" },
                { icon: "📊", label: "Analytics" },
                { icon: "📋", label: "Lead Forms & CRM" },
                { icon: "🛠", label: "Support & Maintenance" },
                { icon: "📱", label: "Mobile Responsive" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-semibold ${
                    isDark
                      ? "bg-white/4 border-white/8 text-white/70"
                      : "bg-white border-slate-200 text-slate-700 shadow-sm"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Ready to launch your website?
            </h2>
            <p className={`text-lg mb-10 ${isDark ? "text-white/50" : "text-slate-500"}`}>
              Pick a template. We handle domain, hosting, SSL, email, and full setup.
              Go live in days — not weeks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services/website-platform"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-full font-semibold text-base shadow-[0_12px_40px_rgba(99,91,255,0.45)] hover:shadow-[0_20px_60px_rgba(99,91,255,0.65)] hover:scale-105 active:scale-95 transition-all"
              >
                See Platform Plans <span>→</span>
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base border transition-all hover:scale-105 ${
                  isDark
                    ? "border-white/20 text-white hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter isDark={isDark} />
      </div>
    </>
  );
}
