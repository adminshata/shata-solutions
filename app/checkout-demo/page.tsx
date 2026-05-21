"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import OnboardingModal from "@/components/home/OnboardingModal";
import DashboardModal from "@/components/home/DashboardModal";
import { useTheme, useSession } from "@/lib/hooks";
import type { PlanId } from "@/lib/types";

// ─── Packages ─────────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: "starter-website",
    category: "Website Development",
    name: "Starter Website Setup",
    price: 499,
    period: null as string | null,
    note: null as string | null,
    desc: "Up to 5 pages, mobile-responsive, contact form, basic SEO setup.",
  },
  {
    id: "template-customization",
    category: "Website Templates",
    name: "Template Customization",
    price: 499,
    period: null as string | null,
    note: null as string | null,
    desc: "Full brand color setup, custom content, logo integration, mobile optimization.",
  },
  {
    id: "ai-automation",
    category: "AI & Automation",
    name: "AI Automation Setup",
    price: 999,
    period: null as string | null,
    note: null as string | null,
    desc: "5–10 automated workflows, AI chatbot, CRM & pipeline automation.",
  },
  {
    id: "llc-ein-support",
    category: "Business Setup",
    name: "LLC / EIN Support Package",
    price: 449,
    period: null as string | null,
    note: "+ state filing fees" as string | null,
    desc: "LLC formation support, EIN application, operating agreement template, guidance.",
  },
  {
    id: "maintenance-plan",
    category: "Ongoing Support",
    name: "Monthly Maintenance Plan",
    price: 99,
    period: "month" as string | null,
    note: null as string | null,
    desc: "Monthly updates, security monitoring, uptime monitoring, 2 content updates/mo.",
  },
];

// ─── Form types ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  terms: boolean;
}

const BLANK_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  terms: false,
};

// ─── Success view ─────────────────────────────────────────────────────────────

function SuccessView({
  isDark,
  orderNumber,
  pkg,
}: {
  isDark: boolean;
  orderNumber: string;
  pkg: (typeof PACKAGES)[number];
}) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6 max-w-lg mx-auto">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-green-400 mb-6 ring-1 ring-green-500/20">
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className={`text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
        Demo Order Received!
      </h2>
      <p className={`mt-3 text-base leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>
        Your demo order has been received. A Shata Solutions specialist will contact you before any payment is collected.
      </p>

      <div className={`mt-8 w-full rounded-2xl border p-6 text-left space-y-3 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-slate-50"}`}>
        <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDark ? "text-white/40" : "text-slate-400"}`}>
          Order Confirmation
        </p>
        {[
          { label: "Order Number", value: orderNumber },
          { label: "Service", value: pkg.name },
          { label: "Category", value: pkg.category },
          {
            label: "Starting Price",
            value: `$${pkg.price.toLocaleString()}${pkg.period ? `/${pkg.period}` : ""}${pkg.note ? ` ${pkg.note}` : ""}`,
            highlight: true,
          },
          { label: "Status", value: "Pending specialist review" },
        ].map(({ label, value, highlight }) => (
          <div key={label} className={`flex justify-between items-start gap-4 pb-2.5 border-b last:border-b-0 last:pb-0 ${isDark ? "border-white/5" : "border-slate-200"}`}>
            <span className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>{label}</span>
            <span className={`text-sm font-semibold text-right ${highlight ? "text-green-400" : isDark ? "text-white" : "text-slate-900"}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className={`mt-5 w-full rounded-xl border p-4 text-xs leading-relaxed ${isDark ? "border-amber-500/20 bg-amber-500/[0.06] text-amber-400/70" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
        No payment has been processed. Final pricing will be confirmed by our team within 24 hours.
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/"
          className={`flex-1 rounded-full py-3 text-sm font-semibold text-center transition ${isDark ? "bg-white/[0.07] text-white hover:bg-white/[0.12]" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
        >
          Back to Home
        </Link>
        <Link
          href="/pricing"
          className="flex-1 rounded-full py-3 text-sm font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View All Services
        </Link>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CheckoutDemoPage() {
  const { isDark, toggleTheme } = useTheme();
  const sessionId = useSession();

  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingPlan, setOnboardingPlan] = useState<PlanId>("growth");
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const openOnboarding = useCallback((plan: PlanId) => {
    setOnboardingPlan(plan);
    setOnboardingOpen(true);
  }, []);
  const closeOnboarding = useCallback(() => setOnboardingOpen(false), []);
  const openDashboard = useCallback(() => setDashboardOpen(true), []);
  const closeDashboard = useCallback(() => setDashboardOpen(false), []);

  // Form state
  const [pkgId, setPkgId] = useState("starter-website");
  const [form, setForm] = useState<FormState>(BLANK_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const selectedPkg = PACKAGES.find((p) => p.id === pkgId)!;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.terms) e.terms = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const num = `SS-DEMO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(num);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Styling helpers
  const input = (err?: string) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${
      isDark
        ? `bg-white/[0.05] text-white placeholder-white/25 ${err ? "border-red-500/60 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"}`
        : `bg-white text-slate-900 placeholder-slate-400 ${err ? "border-red-400 focus:ring-red-200" : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"}`
    }`;

  const label = `text-[11px] font-semibold uppercase tracking-wider ${isDark ? "text-white/50" : "text-slate-400"}`;

  const card = `rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      <GlobalStyles />

      <Navbar isDark={isDark} toggleTheme={toggleTheme} openOnboarding={openOnboarding} openDashboard={openDashboard} />

      <main>
        {/* Demo mode banner */}
        <div className="sticky top-0 z-30 border-b border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Demo Mode — No real payment is processed. This is a preview checkout flow only.
          </div>
        </div>

        {/* Page header */}
        <div className={`border-b ${isDark ? "border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%)]" : "border-slate-200 bg-white"}`}>
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">
            <h1 className={`text-3xl md:text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Checkout Preview
            </h1>
            <p className={`mt-3 text-base max-w-xl mx-auto ${isDark ? "text-white/60" : "text-slate-500"}`}>
              Select a service package and complete the form. Our team will confirm final pricing before any payment is collected.
            </p>
          </div>
        </div>

        {submitted ? (
          <SuccessView isDark={isDark} orderNumber={orderNumber} pkg={selectedPkg} />
        ) : (
          <div className="mx-auto max-w-7xl px-6 py-12">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">

                {/* ── Left: Form ──────────────────────────────────────── */}
                <div className="space-y-6">

                  {/* Step 1 — Package */}
                  <div className={card}>
                    <h2 className={`text-base font-semibold mb-5 ${isDark ? "text-white" : "text-slate-900"}`}>
                      1 — Choose Your Service Package
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PACKAGES.map((pkg) => {
                        const active = pkgId === pkg.id;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setPkgId(pkg.id)}
                            className={`relative flex flex-col items-start gap-1.5 rounded-xl border p-4 text-left transition-all ${
                              active
                                ? isDark
                                  ? "border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/20"
                                  : "border-blue-400 bg-blue-50 ring-1 ring-blue-200"
                                : isDark
                                ? "border-white/10 bg-white/[0.02] hover:border-white/20"
                                : "border-slate-200 bg-slate-50 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex w-full items-start justify-between gap-2">
                              <span className={`text-sm font-semibold leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>
                                {pkg.name}
                              </span>
                              <div className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${active ? "border-blue-500 bg-blue-500" : isDark ? "border-white/30" : "border-slate-300"}`}>
                                {active && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <div className={`text-xs font-bold ${active ? "text-blue-400" : isDark ? "text-white/50" : "text-slate-500"}`}>
                              ${pkg.price.toLocaleString()}{pkg.period ? `/${pkg.period}` : ""}
                              {pkg.note && <span className="ml-1 font-normal opacity-70">{pkg.note}</span>}
                            </div>
                            <div className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-slate-400"}`}>
                              {pkg.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2 — Customer info */}
                  <div className={card}>
                    <h2 className={`text-base font-semibold mb-5 ${isDark ? "text-white" : "text-slate-900"}`}>
                      2 — Your Information
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className={label}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          className={input(errors.name)}
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={label}>Email Address *</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          className={input(errors.email)}
                          autoComplete="email"
                        />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={label}>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          className={input()}
                          autoComplete="tel"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={label}>Company / Business Name</label>
                        <input
                          type="text"
                          placeholder="Acme Inc."
                          value={form.company}
                          onChange={(e) => setField("company", e.target.value)}
                          className={input()}
                          autoComplete="organization"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3 — Billing address */}
                  <div className={card}>
                    <h2 className={`text-base font-semibold mb-5 ${isDark ? "text-white" : "text-slate-900"}`}>
                      3 — Billing Address
                    </h2>
                    <div className="grid gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={label}>Street Address</label>
                        <input
                          type="text"
                          placeholder="123 Main Street"
                          value={form.address}
                          onChange={(e) => setField("address", e.target.value)}
                          className={input()}
                          autoComplete="street-address"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="flex flex-col gap-1.5">
                          <label className={label}>City</label>
                          <input
                            type="text"
                            placeholder="San Diego"
                            value={form.city}
                            onChange={(e) => setField("city", e.target.value)}
                            className={input()}
                            autoComplete="address-level2"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className={label}>State / Region</label>
                          <input
                            type="text"
                            placeholder="CA"
                            value={form.state}
                            onChange={(e) => setField("state", e.target.value)}
                            className={input()}
                            autoComplete="address-level1"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className={label}>ZIP / Postal Code</label>
                          <input
                            type="text"
                            placeholder="92101"
                            value={form.zip}
                            onChange={(e) => setField("zip", e.target.value)}
                            className={input()}
                            autoComplete="postal-code"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={label}>Country</label>
                        <select
                          value={form.country}
                          onChange={(e) => setField("country", e.target.value)}
                          className={input()}
                          autoComplete="country-name"
                        >
                          <option>United States</option>
                          <option>United Arab Emirates</option>
                          <option>Egypt</option>
                          <option>Saudi Arabia</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Australia</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 — Payment method preview */}
                  <div className={card}>
                    <h2 className={`text-base font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                      4 — Payment Method
                    </h2>
                    <p className={`text-xs mb-5 ${isDark ? "text-white/40" : "text-slate-400"}`}>
                      Payment details are collected securely after our team confirms your final quote. No card information is stored today.
                    </p>

                    {/* Demo card visual */}
                    <div className="relative max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl select-none">
                      {/* Subtle circles */}
                      <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full border border-white/10" />
                      <div className="pointer-events-none absolute -right-2 top-4 h-24 w-24 rounded-full border border-white/10" />

                      <div className="relative">
                        <div className="flex items-center justify-between mb-7">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                            Demo Preview
                          </span>
                          <div className="flex">
                            <div className="h-7 w-7 rounded-full bg-white/20" />
                            <div className="-ml-3 h-7 w-7 rounded-full bg-white/30" />
                          </div>
                        </div>

                        <p className="font-mono text-xl tracking-[0.3em] text-white/70 mb-5">
                          •••• •••• •••• ••••
                        </p>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-white/50">Cardholder</p>
                            <p className="mt-0.5 text-sm font-semibold">{form.name || "YOUR NAME"}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-white/50">Expires</p>
                            <p className="mt-0.5 text-sm font-semibold">MM / YY</p>
                          </div>
                        </div>
                      </div>

                      {/* DEMO watermark */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="rotate-[-20deg] text-6xl font-black tracking-[0.25em] text-white/[0.05]">
                          DEMO
                        </span>
                      </div>
                    </div>

                    <p className={`mt-4 text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
                      Accepted: Visa · Mastercard · American Express · PayPal · Wise · ACH Bank Transfer
                    </p>
                  </div>

                  {/* Terms */}
                  <div className={card}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <button
                        type="button"
                        onClick={() => setField("terms", !form.terms)}
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition ${
                          form.terms
                            ? "border-blue-500 bg-blue-500"
                            : errors.terms
                            ? "border-red-500"
                            : isDark
                            ? "border-white/30"
                            : "border-slate-300"
                        }`}
                        aria-pressed={form.terms}
                      >
                        {form.terms && (
                          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <p className={`text-sm ${isDark ? "text-white/80" : "text-slate-700"}`}>
                          I understand this is a demo checkout. No payment is processed today. I agree to be contacted by Shata Solutions to confirm scope and final pricing before any charge is made.
                        </p>
                        <p className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/40" : "text-slate-400"}`}>
                          By submitting you agree to our{" "}
                          <Link href="/terms" className="underline hover:text-blue-400">Terms of Service</Link>,{" "}
                          <Link href="/privacy" className="underline hover:text-blue-400">Privacy Policy</Link>, and{" "}
                          <Link href="/refund" className="underline hover:text-blue-400">Refund Policy</Link>.
                          {" "}Final pricing is confirmed before payment. Government fees, hosting, domains, software subscriptions, and third-party costs may be billed separately.
                        </p>
                        {errors.terms && <p className="mt-1.5 text-xs text-red-400">{errors.terms}</p>}
                      </div>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-blue-600 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Submit Demo Order →
                  </button>

                  <p className={`text-center text-xs ${isDark ? "text-white/30" : "text-slate-400"}`}>
                    No credit card charged · No payment processed · You will be contacted before any payment
                  </p>
                </div>

                {/* ── Right: Summary sidebar ───────────────────────────── */}
                <div className="lg:sticky lg:top-20 space-y-5 h-fit">

                  {/* Order summary */}
                  <div className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-sm"}`}>
                    <p className={`text-[11px] font-semibold uppercase tracking-widest mb-5 ${isDark ? "text-white/40" : "text-slate-400"}`}>
                      Order Summary
                    </p>

                    {/* Selected package */}
                    <div className={`rounded-xl border p-4 mb-5 ${isDark ? "border-blue-500/20 bg-blue-500/10" : "border-blue-200 bg-blue-50"}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? "text-blue-400/70" : "text-blue-500"}`}>
                        {selectedPkg.category}
                      </p>
                      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {selectedPkg.name}
                      </p>
                      <p className={`mt-1 text-xs leading-relaxed ${isDark ? "text-white/50" : "text-slate-500"}`}>
                        {selectedPkg.desc}
                      </p>
                    </div>

                    {/* Price breakdown */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>Service fee</span>
                        <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                          ${selectedPkg.price.toLocaleString()}{selectedPkg.period ? `/${selectedPkg.period}` : ""}
                        </span>
                      </div>
                      {selectedPkg.note && (
                        <div className="flex justify-between">
                          <span className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>Filing fees</span>
                          <span className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>Varies by state</span>
                        </div>
                      )}
                      <div className={`border-t pt-2.5 flex justify-between items-center ${isDark ? "border-white/10" : "border-slate-200"}`}>
                        <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                          Starting from
                        </span>
                        <span className="text-xl font-bold text-blue-500">
                          ${selectedPkg.price.toLocaleString()}
                          <span className="text-sm font-normal">{selectedPkg.period ? `/${selectedPkg.period}` : ""}</span>
                        </span>
                      </div>
                    </div>

                    {/* Demo callout */}
                    <div className={`mt-4 rounded-xl border p-3 ${isDark ? "border-amber-500/20 bg-amber-500/[0.06]" : "border-amber-200 bg-amber-50"}`}>
                      <p className={`text-xs leading-relaxed ${isDark ? "text-amber-400/80" : "text-amber-700"}`}>
                        Demo mode — no payment is processed today. Final pricing confirmed before checkout.
                      </p>
                    </div>
                  </div>

                  {/* Legal note */}
                  <div className={`rounded-2xl border p-5 text-xs leading-relaxed ${isDark ? "border-white/10 bg-white/[0.02] text-white/40" : "border-slate-200 bg-slate-50 text-slate-400"}`}>
                    <p className={`font-semibold mb-1.5 ${isDark ? "text-white/60" : "text-slate-600"}`}>Pricing Notice</p>
                    Final pricing is confirmed before payment. Government fees, hosting, domains, software subscriptions, and third-party costs may be billed separately.
                  </div>

                  {/* Trust indicators */}
                  <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-widest mb-4 ${isDark ? "text-white/30" : "text-slate-400"}`}>
                      Secure & Trusted
                    </p>
                    <div className="space-y-2.5">
                      {[
                        "256-bit SSL encrypted",
                        "No payment collected today",
                        "Stripe & Wise payment ready",
                        "24h specialist response",
                        "Verified U.S. LLC — Shata Global LLC",
                      ].map((text) => (
                        <div key={text} className="flex items-center gap-2">
                          <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-400 text-[9px] font-bold">✓</span>
                          <span className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"}`}>
                    <p className={`text-xs font-semibold mb-3 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                      Have questions?
                    </p>
                    <div className="space-y-2">
                      <a href="mailto:sales@shatasolutions.com" className={`flex items-center gap-2 text-xs transition ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>
                        <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        sales@shatasolutions.com
                      </a>
                      <a href="tel:+16197761222" className={`flex items-center gap-2 text-xs transition ${isDark ? "text-white/50 hover:text-white/70" : "text-slate-500 hover:text-slate-700"}`}>
                        <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        +1 (619) 776-1222
                      </a>
                    </div>
                  </div>

                  {/* Back to pricing */}
                  <Link
                    href="/pricing"
                    className={`flex items-center justify-center gap-1.5 rounded-full border py-2.5 text-xs font-semibold transition ${isDark ? "border-white/10 text-white/50 hover:bg-white/[0.05]" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    ← View full pricing guide
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <SiteFooter isDark={isDark} />

      <OnboardingModal isDark={isDark} open={onboardingOpen} onClose={closeOnboarding} initialPlan={onboardingPlan} sessionId={sessionId} />
      <DashboardModal isDark={isDark} open={dashboardOpen} onClose={closeDashboard} />
    </div>
  );
}
