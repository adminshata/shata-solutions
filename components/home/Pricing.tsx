"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANS } from "@/lib/constants";
import type { BillingCycle, PlanId } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  isDark: boolean;
  openOnboarding: (plan: PlanId) => void;
}

type PricingTab = "platform" | "services";

// ─── Service pricing data ─────────────────────────────────────────────────────

interface ServicePlan {
  name: string;
  price: string;
  priceNote?: string;
  bullets: string[];
  featured?: boolean;
  cta: "quote" | "demo";
  customPrice?: boolean;
}

interface ServiceCategory {
  id: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentBgLight: string;
  accentBorderLight: string;
  accentLight: string;
  title: string;
  icon: React.ReactNode;
  plans: ServicePlan[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "website-development",
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    accentBgLight: "bg-blue-50",
    accentBorderLight: "border-blue-200",
    accentLight: "text-blue-600",
    title: "Website Development",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    plans: [
      {
        name: "Starter Website",
        price: "from $499",
        bullets: ["Up to 5 pages", "Mobile-responsive design", "Contact form + basic SEO"],
        cta: "demo",
      },
      {
        name: "Business Website",
        price: "from $999",
        bullets: ["Up to 10 pages", "Premium UI/UX design", "CMS + analytics integration"],
        featured: true,
        cta: "demo",
      },
      {
        name: "Premium Custom",
        price: "from $1,999",
        bullets: ["Unlimited pages", "Custom design system", "API & booking integrations"],
        cta: "quote",
      },
    ],
  },
  {
    id: "templates",
    accent: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30",
    accentBgLight: "bg-purple-50",
    accentBorderLight: "border-purple-200",
    accentLight: "text-purple-600",
    title: "Website Templates",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    plans: [
      {
        name: "Template Setup",
        price: "from $299",
        bullets: ["Installation + domain", "Hosting config", "Basic content setup"],
        cta: "demo",
      },
      {
        name: "Template Customization",
        price: "from $499",
        bullets: ["Full brand color & font", "Custom content + logo", "2 revision rounds"],
        featured: true,
        cta: "demo",
      },
      {
        name: "Full Launch Package",
        price: "from $899",
        bullets: ["Template + branding", "SEO + analytics", "Go-live support"],
        cta: "quote",
      },
    ],
  },
  {
    id: "ai-automation",
    accent: "text-green-400",
    accentBg: "bg-green-500/10",
    accentBorder: "border-green-500/30",
    accentBgLight: "bg-green-50",
    accentBorderLight: "border-green-200",
    accentLight: "text-green-600",
    title: "AI & Automation",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    plans: [
      {
        name: "Basic Automation",
        price: "from $299",
        bullets: ["1–2 workflows", "Email/form automation", "Zapier / Make integration"],
        cta: "demo",
      },
      {
        name: "Business Automation",
        price: "from $999",
        bullets: ["5–10 workflows", "AI chatbot + CRM", "1 month support included"],
        featured: true,
        cta: "demo",
      },
      {
        name: "Custom AI Agent",
        price: "from $1,499",
        bullets: ["Custom AI workflows", "Multi-step agents", "API + data integrations"],
        cta: "quote",
      },
    ],
  },
  {
    id: "branding",
    accent: "text-pink-400",
    accentBg: "bg-pink-500/10",
    accentBorder: "border-pink-500/30",
    accentBgLight: "bg-pink-50",
    accentBorderLight: "border-pink-200",
    accentLight: "text-pink-600",
    title: "Branding & Design",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    plans: [
      {
        name: "Social Media Pack",
        price: "from $199",
        bullets: ["10 social templates", "Brand colors applied", "Editable source files"],
        cta: "demo",
      },
      {
        name: "Logo + Brand Kit",
        price: "from $299",
        bullets: ["Logo suite + variations", "Color & typography", "All file formats"],
        featured: true,
        cta: "demo",
      },
      {
        name: "Full Brand Identity",
        price: "from $799",
        bullets: ["Complete brand system", "Guidelines document", "2 revision rounds"],
        cta: "quote",
      },
    ],
  },
  {
    id: "business-setup",
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/30",
    accentBgLight: "bg-orange-50",
    accentBorderLight: "border-orange-200",
    accentLight: "text-orange-600",
    title: "Business Setup",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
      </svg>
    ),
    plans: [
      {
        name: "EIN Support",
        price: "from $149",
        priceNote: "Gov. fees not included",
        bullets: ["EIN application prep", "IRS submission support", "Doc review included"],
        cta: "demo",
      },
      {
        name: "LLC Formation",
        price: "from $299",
        priceNote: "+ state filing fees",
        bullets: ["LLC filing + Articles", "Operating Agreement", "EIN application"],
        featured: true,
        cta: "demo",
      },
      {
        name: "Business Launch",
        price: "from $999",
        priceNote: "+ gov. fees",
        bullets: ["LLC + EIN + Banking", "Stripe setup + email", "Starter website"],
        cta: "quote",
      },
    ],
  },
  {
    id: "ongoing-support",
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/30",
    accentBgLight: "bg-indigo-50",
    accentBorderLight: "border-indigo-200",
    accentLight: "text-indigo-600",
    title: "Ongoing Support",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138" />
      </svg>
    ),
    plans: [
      {
        name: "Maintenance Plan",
        price: "from $99/mo",
        bullets: ["Monthly updates", "Security monitoring", "2 content updates/mo"],
        cta: "demo",
      },
      {
        name: "Growth Support",
        price: "from $299/mo",
        bullets: ["5 dev/design hrs/mo", "SEO monitoring", "Priority support"],
        featured: true,
        cta: "demo",
      },
      {
        name: "Dedicated Support",
        price: "Custom quote",
        bullets: ["Unlimited requests", "Dedicated manager", "SLA-backed response"],
        customPrice: true,
        cta: "quote",
      },
    ],
  },
];

// ─── Service pricing card ─────────────────────────────────────────────────────

function ServiceCard({
  plan,
  cat,
  isDark,
}: {
  plan: ServicePlan;
  cat: ServiceCategory;
  isDark: boolean;
}) {
  const accent = isDark ? cat.accent : cat.accentLight;
  const accentBg = isDark ? cat.accentBg : cat.accentBgLight;
  const accentBorder = isDark ? cat.accentBorder : cat.accentBorderLight;

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5 ${
        plan.featured
          ? `${accentBorder} ${accentBg}`
          : isDark
          ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
          : "border-slate-200 bg-white hover:shadow-sm"
      }`}
    >
      {plan.featured && (
        <div className={`absolute -top-2.5 left-4 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${accentBg} ${accent} ${accentBorder}`}>
          Popular
        </div>
      )}

      <div>
        <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
          {plan.name}
        </p>
        <p className={`mt-1 text-base font-bold ${plan.featured ? accent : isDark ? "text-white/90" : "text-slate-900"}`}>
          {plan.price}
        </p>
        {plan.priceNote && (
          <p className={`text-[10px] mt-0.5 ${isDark ? "text-white/35" : "text-slate-400"}`}>
            {plan.priceNote}
          </p>
        )}
        <ul className="mt-3 space-y-1.5">
          {plan.bullets.map((b) => (
            <li key={b} className={`flex items-start gap-1.5 text-xs ${isDark ? "text-white/60" : "text-slate-600"}`}>
              <span className={`mt-0.5 flex-shrink-0 text-[10px] font-bold ${accent}`}>✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {plan.cta === "demo" && !plan.customPrice ? (
        <Link
          href="/checkout-demo"
          className={`mt-4 block text-center rounded-full py-1.5 text-xs font-semibold transition ${
            plan.featured
              ? `${accentBg} ${accent} border ${accentBorder} hover:opacity-80`
              : isDark
              ? "border border-white/15 text-white/70 hover:bg-white/[0.06]"
              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Checkout Demo
        </Link>
      ) : (
        <Link
          href="/contact"
          className={`mt-4 block text-center rounded-full py-1.5 text-xs font-semibold transition border ${
            isDark ? "border-white/15 text-white/70 hover:bg-white/[0.06]" : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Request Quote
        </Link>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Pricing({ isDark, openOnboarding }: Props) {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [tab, setTab] = useState<PricingTab>("platform");

  return (
    <section
      id="pricing"
      className={`py-24 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-slate-950 to-slate-900"
          : "bg-gradient-to-b from-slate-50 to-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Transparent pricing
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            No hidden fees. Ever.
          </h2>
          <p className={`mt-4 text-lg ${isDark ? "text-white/70" : "text-slate-600"}`}>
            Platform subscription plans or one-time project pricing — choose what fits your stage.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center mb-10">
          <div
            className={`inline-flex rounded-full border p-1 ${
              isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
            }`}
          >
            <button
              onClick={() => setTab("platform")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                tab === "platform"
                  ? "bg-blue-600 text-white shadow-md"
                  : isDark
                  ? "text-white/60 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Platform Plans
            </button>
            <button
              onClick={() => setTab("services")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                tab === "services"
                  ? "bg-blue-600 text-white shadow-md"
                  : isDark
                  ? "text-white/60 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Service Pricing
            </button>
          </div>
        </div>

        {/* ── Platform Plans tab ─────────────────────────────────────────── */}
        {tab === "platform" && (
          <>
            {/* Billing toggle */}
            <div className="flex justify-center mb-12">
              <div
                role="tablist"
                aria-label="Billing cycle"
                className={`inline-flex rounded-full border p-1 ${
                  isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
                }`}
              >
                <button
                  role="tab"
                  aria-selected={billing === "monthly"}
                  onClick={() => setBilling("monthly")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    billing === "monthly"
                      ? "bg-blue-600 text-white shadow-md"
                      : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  role="tab"
                  aria-selected={billing === "yearly"}
                  onClick={() => setBilling("yearly")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    billing === "yearly"
                      ? "bg-blue-600 text-white shadow-md"
                      : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Yearly
                  <span className="text-[10px] bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded-full font-bold">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {PLANS.map((plan) => {
                const price = billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
                const featured = plan.badge === "MOST POPULAR";
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                      featured
                        ? "scale-105 shadow-[0_20px_60px_rgba(59,130,246,0.3)] border-blue-500/50 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                        : isDark
                        ? "bg-slate-900 border-white/10 hover:border-blue-500/40"
                        : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl"
                    }`}
                  >
                    {plan.badge && (
                      <div
                        className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow ${
                          featured
                            ? "bg-white text-blue-700"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        }`}
                      >
                        {plan.badge}
                      </div>
                    )}
                    <h3
                      className={`text-xl font-semibold ${
                        featured ? "text-white" : isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        featured ? "text-white/90" : isDark ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-5xl font-bold ${
                            featured ? "text-white" : isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          ${price}
                        </span>
                        <span
                          className={`text-sm ${
                            featured ? "text-white/80" : isDark ? "text-white/60" : "text-slate-500"
                          }`}
                        >
                          /mo
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-sm ${
                          featured ? "text-white/80" : isDark ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        + ${plan.oneTime} one-time setup
                      </p>
                    </div>

                    <button
                      onClick={() => openOnboarding(plan.id)}
                      className={`mt-8 w-full rounded-full py-3 font-semibold transition-all hover:scale-[1.02] active:scale-95 ${
                        featured
                          ? "bg-white text-blue-700 hover:bg-slate-100"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      }`}
                    >
                      Get started →
                    </button>

                    <div className="mt-8">
                      <p
                        className={`text-xs uppercase tracking-widest font-semibold mb-3 ${
                          featured ? "text-white/80" : isDark ? "text-white/50" : "text-slate-400"
                        }`}
                      >
                        What&apos;s included
                      </p>
                      <ul className="space-y-2.5">
                        {plan.features.map((f) => (
                          <li
                            key={f}
                            className={`flex items-start gap-2 text-sm ${
                              featured ? "text-white" : isDark ? "text-white/80" : "text-slate-700"
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                featured ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-500"
                              }`}
                            >
                              ✓
                            </span>
                            {f}
                          </li>
                        ))}
                        {plan.notIncluded.map((f) => (
                          <li
                            key={f}
                            className={`flex items-start gap-2 text-sm line-through opacity-50 ${
                              featured ? "text-white/70" : isDark ? "text-white/50" : "text-slate-400"
                            }`}
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-500/10 text-slate-400">
                              ×
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className={`mt-10 text-center text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
            >
              Need a custom plan?{" "}
              <a href="#contact" className="text-blue-500 hover:underline">Contact us</a>
              {" · "}
              <button
                onClick={() => setTab("services")}
                className="text-blue-500 hover:underline"
              >
                View one-time service pricing →
              </button>
            </p>
          </>
        )}

        {/* ── Service Pricing tab ────────────────────────────────────────── */}
        {tab === "services" && (
          <>
            {/* Legal disclaimer */}
            <div
              className={`mb-10 rounded-2xl border px-5 py-4 flex gap-3 ${
                isDark
                  ? "border-amber-500/20 bg-amber-500/[0.06]"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <svg className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className={`text-xs leading-relaxed ${isDark ? "text-amber-300/70" : "text-amber-700"}`}>
                <span className="font-semibold">Pricing notice:</span> All prices are starting estimates. Final pricing is confirmed in writing before any payment. Government fees, hosting, domains, and third-party costs may be billed separately.
              </p>
            </div>

            {/* 6 categories, 2-column layout of categories */}
            <div className="space-y-10">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isDark ? cat.accentBg : cat.accentBgLight
                      } ${isDark ? cat.accent : cat.accentLight}`}
                    >
                      {cat.icon}
                    </div>
                    <h3
                      className={`text-base font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cat.title}
                    </h3>
                  </div>

                  {/* 3 plan cards */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {cat.plans.map((plan) => (
                      <ServiceCard
                        key={plan.name}
                        plan={plan}
                        cat={cat}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-12 space-y-4">
              <div
                className={`rounded-2xl border px-5 py-4 text-xs leading-relaxed ${
                  isDark
                    ? "border-white/10 bg-white/[0.02] text-white/40"
                    : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
              >
                <span className={`font-semibold ${isDark ? "text-white/60" : "text-slate-600"}`}>Important: </span>
                Prices are starting estimates in USD. Actual pricing depends on scope, complexity, and integrations. Final pricing is always confirmed in writing before any payment is collected.
                Government filing fees (LLC/EIN), domain fees, hosting, SSL, and third-party software are not included unless explicitly stated in your quote.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition hover:scale-105 ${
                    isDark
                      ? "border-white/20 text-white hover:bg-white/[0.06]"
                      : "border-slate-300 text-slate-700 hover:bg-white"
                  }`}
                >
                  Request a Free Quote
                </Link>
                <Link
                  href="/checkout-demo"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500/20 transition hover:scale-105"
                >
                  Try Checkout Demo
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
