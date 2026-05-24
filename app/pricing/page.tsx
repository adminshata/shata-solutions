"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import OnboardingModal from "@/components/home/OnboardingModal";
import DashboardModal from "@/components/home/DashboardModal";
import { useTheme, useSession } from "@/lib/hooks";
import type { PlanId } from "@/lib/types";

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_CATS = [
  { id: "website-development", label: "Website Dev" },
  { id: "templates", label: "Templates" },
  { id: "ai-automation", label: "AI & Automation" },
  { id: "branding", label: "Branding" },
  { id: "business-setup", label: "Business Setup" },
  { id: "ongoing-support", label: "Ongoing Support" },
];

interface Plan {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  includes: string[];
  cta: "quote" | "demo";
  featured?: boolean;
  customPrice?: boolean;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  icon: React.ReactNode;
  plans: Plan[];
}

const CATEGORIES: Category[] = [
  {
    id: "website-development",
    title: "Website Development",
    subtitle: "Custom-built websites engineered for performance, conversion, and brand impact.",
    accent: "text-blue-500",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(59,130,246,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    plans: [
      {
        name: "Starter Website",
        price: "from $499",
        description: "A clean, professional website for new businesses and personal brands.",
        includes: ["Up to 5 pages", "Mobile-responsive design", "Contact form integration", "Basic SEO setup", "1 round of revisions"],
        cta: "demo",
      },
      {
        name: "Business Website",
        price: "from $999",
        description: "A full-featured site built to convert visitors into customers.",
        includes: ["Up to 10 pages", "Premium UI/UX design", "CMS or content management", "Lead capture forms", "Analytics integration", "2 rounds of revisions"],
        cta: "demo",
        featured: true,
      },
      {
        name: "Premium Custom Website",
        price: "from $1,999",
        description: "Enterprise-grade websites with advanced integrations.",
        includes: ["Unlimited pages", "Custom design system", "API & third-party integrations", "Advanced SEO & performance", "Booking or ecommerce ready", "Dedicated project manager"],
        cta: "quote",
      },
    ],
  },
  {
    id: "templates",
    title: "Website Templates",
    subtitle: "Ready-to-launch templates for every industry — customize and go live fast.",
    accent: "text-purple-500",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(168,85,247,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    plans: [
      {
        name: "Template Setup",
        price: "from $299",
        description: "Get a professional template installed and configured for your business.",
        includes: ["Template installation", "Domain connection", "Hosting configuration", "Basic content setup", "1 revision round"],
        cta: "demo",
      },
      {
        name: "Template Customization",
        price: "from $499",
        description: "Tailored template with your brand colors, content, and custom sections.",
        includes: ["Full brand color & font setup", "Custom content & copy", "Logo & image integration", "Mobile optimization", "Contact & lead forms", "2 revision rounds"],
        cta: "demo",
        featured: true,
      },
      {
        name: "Full Template + Branding",
        price: "from $899",
        description: "Complete launch package — template, branding, content, and go-live support.",
        includes: ["Template + full customization", "Logo & brand kit", "Professional copywriting", "SEO foundation", "Analytics setup", "Launch support"],
        cta: "quote",
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation Systems",
    subtitle: "Intelligent systems that automate your workflows, support, and customer journeys.",
    accent: "text-green-500",
    accentBg: "bg-green-500/10",
    accentBorder: "border-green-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(34,197,94,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    plans: [
      {
        name: "Basic Automation",
        price: "from $299",
        description: "Simple automations to eliminate repetitive manual tasks.",
        includes: ["1–2 automated workflows", "Email or form automation", "Zapier / Make integration", "Basic CRM connection", "Setup documentation"],
        cta: "demo",
      },
      {
        name: "Business Automation System",
        price: "from $999",
        description: "A full automation layer for your business operations.",
        includes: ["5–10 automated workflows", "AI chatbot or assistant", "CRM & pipeline automation", "Lead capture & follow-up", "Notification & reporting", "1 month support included"],
        cta: "demo",
        featured: true,
      },
      {
        name: "Custom AI Agent",
        price: "from $1,499",
        description: "Purpose-built AI agents and advanced automation architectures.",
        includes: ["Custom AI agent development", "Multi-step intelligent workflows", "API & data integrations", "Custom dashboards", "Ongoing optimization support", "Priority response"],
        cta: "quote",
      },
    ],
  },
  {
    id: "branding",
    title: "Branding & Design",
    subtitle: "Premium brand identity that makes your business look credible and memorable.",
    accent: "text-pink-500",
    accentBg: "bg-pink-500/10",
    accentBorder: "border-pink-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(236,72,153,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    plans: [
      {
        name: "Social Media Design Pack",
        price: "from $199",
        description: "Branded social templates and graphics for your marketing channels.",
        includes: ["10 social media templates", "Brand color & font applied", "Post, story, and cover designs", "Editable source files"],
        cta: "demo",
      },
      {
        name: "Logo + Brand Kit",
        price: "from $299",
        description: "A professional logo and cohesive brand identity.",
        includes: ["Primary logo + variations", "Color palette & typography", "Business card design", "Brand usage guidelines", "All file formats (SVG, PNG, PDF)"],
        cta: "demo",
        featured: true,
      },
      {
        name: "Full Brand Identity",
        price: "from $799",
        description: "Complete brand system for businesses ready to stand out.",
        includes: ["Logo suite + brand kit", "Social media templates", "Presentation deck template", "Email signature design", "Brand guidelines document", "2 revision rounds"],
        cta: "quote",
      },
    ],
  },
  {
    id: "business-setup",
    title: "Business Setup Support",
    subtitle: "Launch your U.S. business the right way — legal, compliant, and payment-ready.",
    accent: "text-orange-500",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(249,115,22,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
      </svg>
    ),
    plans: [
      {
        name: "EIN Support",
        price: "from $149",
        priceNote: "Government fees not included",
        description: "Obtain your Employer Identification Number quickly and correctly.",
        includes: ["EIN application preparation", "IRS submission support", "Guidance for international founders", "Document review"],
        cta: "demo",
      },
      {
        name: "LLC Formation Support",
        price: "from $299",
        priceNote: "+ state filing fees",
        description: "Full assistance registering your LLC in the United States.",
        includes: ["State LLC filing preparation", "Articles of Organization", "Registered agent guidance", "Operating Agreement template", "EIN application included"],
        cta: "demo",
        featured: true,
      },
      {
        name: "Business Launch Package",
        price: "from $999",
        priceNote: "+ applicable government fees",
        description: "Everything to go from idea to fully operational U.S. business.",
        includes: ["LLC formation + EIN", "Business banking guidance", "Payment processor setup (Stripe)", "Business email setup", "Starter website or landing page", "1-on-1 onboarding call"],
        cta: "quote",
      },
    ],
  },
  {
    id: "ongoing-support",
    title: "Ongoing Support & Maintenance",
    subtitle: "Keep your website fast, secure, and improving — with a team always on call.",
    accent: "text-indigo-500",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/30",
    accentGlow: "shadow-[0_0_60px_rgba(99,102,241,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448" />
      </svg>
    ),
    plans: [
      {
        name: "Maintenance Plan",
        price: "from $99/mo",
        description: "Essential maintenance to keep your website healthy.",
        includes: ["Monthly software updates", "Security monitoring", "Uptime monitoring", "Minor content updates (2/mo)", "Email support"],
        cta: "demo",
      },
      {
        name: "Growth Support Plan",
        price: "from $299/mo",
        description: "Active support for businesses that need continuous improvements.",
        includes: ["All Maintenance features", "Up to 5 hours dev/design work", "Landing page optimization", "Monthly performance report", "Priority email & chat support", "SEO monitoring"],
        cta: "demo",
        featured: true,
      },
      {
        name: "Dedicated Business Support",
        price: "Custom quote",
        description: "A dedicated team for complex, ongoing technical needs.",
        includes: ["Unlimited support requests", "Dedicated project manager", "Custom development hours", "Weekly strategy calls", "SLA-backed response time", "Full-stack support"],
        cta: "quote",
        customPrice: true,
      },
    ],
  },
];

const FAQS = [
  {
    q: "Are the listed prices final?",
    a: "No — all prices are starting estimates. Final pricing is always confirmed in a written quote before any payment is requested. The actual price may vary based on your project scope, number of integrations, third-party tools required, and timeline.",
  },
  {
    q: "What costs are not included in these prices?",
    a: "Government filing fees (LLC, EIN), domain registration fees, hosting, SSL certificates, email hosting, payment processor fees (Stripe, Wise), and any third-party software subscriptions are billed separately unless explicitly included in your quoted scope.",
  },
  {
    q: "How do I know what I'll pay before committing?",
    a: "You can use the Checkout Demo to select a service and submit your details. Our team will review your requirements and send a detailed written quote within 24 hours. No payment is collected until you confirm the quote.",
  },
  {
    q: "Can I combine multiple services?",
    a: "Yes. Many clients bundle services like LLC Formation + Website + Branding. We offer bundled pricing that is typically more cost-effective than purchasing services individually. Mention your needs in the contact form and we will quote accordingly.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, for projects above $500 we typically split payments: 50% to start and 50% on delivery. For larger projects or retainers, custom payment schedules can be arranged. Payment plans are confirmed in your project agreement.",
  },
  {
    q: "How quickly can I get started after payment?",
    a: "Most projects begin within 1–2 business days of payment confirmation. Business formation services (LLC/EIN) typically process within 1–5 business days depending on state. Website and automation projects have a kickoff call scheduled within 48 hours.",
  },
];

// ─── Pricing card ─────────────────────────────────────────────────────────────

function PricingCard({ plan, cat, isDark }: { plan: Plan; cat: Category; isDark: boolean }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        plan.featured
          ? `${cat.accentBorder} ${cat.accentBg} ${cat.accentGlow}`
          : isDark
          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
          : "border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300"
      }`}
    >
      {plan.featured && (
        <div className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${cat.accentBg} ${cat.accent} ${cat.accentBorder}`}>
          Most Popular
        </div>
      )}

      <div className="flex-1">
        <h3 className={`text-base font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
        <p className={`mt-1.5 text-sm leading-relaxed ${isDark ? "text-white/55" : "text-slate-500"}`}>{plan.description}</p>

        <div className="mt-5">
          <span className={`text-2xl font-bold ${plan.featured ? cat.accent : isDark ? "text-white" : "text-slate-900"}`}>
            {plan.price}
          </span>
          {plan.priceNote && (
            <p className={`mt-0.5 text-xs ${isDark ? "text-white/35" : "text-slate-400"}`}>{plan.priceNote}</p>
          )}
        </div>

        <ul className="mt-5 space-y-2">
          {plan.includes.map((item) => (
            <li key={item} className={`flex items-start gap-2 text-sm ${isDark ? "text-white/65" : "text-slate-600"}`}>
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${cat.accentBg} ${cat.accent}`}>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {plan.cta === "demo" && !plan.customPrice ? (
          <>
            <Link
              href="/checkout-demo"
              className={`block text-center rounded-full py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] ${
                plan.featured
                  ? `${cat.accentBg} ${cat.accent} border ${cat.accentBorder} hover:opacity-90`
                  : isDark
                  ? "bg-white/[0.07] text-white border border-white/15 hover:bg-white/[0.12]"
                  : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
              }`}
            >
              Checkout Demo
            </Link>
            <Link
              href="/contact"
              className={`block text-center rounded-full py-2 text-xs font-medium transition ${
                isDark ? "text-white/50 hover:text-white/80" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Request Quote instead
            </Link>
          </>
        ) : (
          <Link
            href="/contact"
            className={`block text-center rounded-full py-2.5 text-sm font-semibold border transition-all hover:scale-[1.02] ${
              isDark
                ? "border-white/20 text-white hover:bg-white/[0.08]"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Request Quote
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({
  faq,
  open,
  onToggle,
  isDark,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
  isDark: boolean;
}) {
  return (
    <div className={`border-b last:border-0 ${isDark ? "border-white/10" : "border-slate-200"}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span
          className={`text-sm font-semibold transition-colors ${
            open
              ? isDark ? "text-white" : "text-slate-900"
              : isDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full border text-xs transition-all ${
            open
              ? "border-blue-500/50 bg-blue-500/15 text-blue-500 rotate-45"
              : isDark
              ? "border-white/20 text-white/50"
              : "border-slate-300 text-slate-400"
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <p className={`pb-5 text-sm leading-relaxed ${isDark ? "text-white/55" : "text-slate-500"}`}>
          {faq.a}
        </p>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const { isDark, toggleTheme } = useTheme();
  const sessionId = useSession();

  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingPlan, setOnboardingPlan] = useState<PlanId>("growth");
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [activecat, setActiveCat] = useState("website-development");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const openOnboarding = useCallback((plan: PlanId) => {
    setOnboardingPlan(plan);
    setOnboardingOpen(true);
  }, []);
  const closeOnboarding = useCallback(() => setOnboardingOpen(false), []);
  const openDashboard = useCallback(() => setDashboardOpen(true), []);
  const closeDashboard = useCallback(() => setDashboardOpen(false), []);

  function scrollToSection(id: string) {
    setActiveCat(id);
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = (navRef.current?.offsetHeight ?? 48) + 96;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    function onScroll() {
      const navHeight = (navRef.current?.offsetHeight ?? 48) + 120;
      for (const cat of [...CATEGORIES].reverse()) {
        const el = document.getElementById(cat.id);
        if (el && el.getBoundingClientRect().top <= navHeight) {
          setActiveCat(cat.id);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#06080f] text-white" : "bg-slate-50 text-slate-900"}`}>
      <GlobalStyles />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} openOnboarding={openOnboarding} openDashboard={openDashboard} />

      <main>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className={`relative overflow-hidden border-b ${
            isDark
              ? "border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_55%)]"
              : "border-slate-200 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.07),transparent_55%)]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-600/5 blur-[100px]" />
            <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-purple-600/5 blur-[80px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-500">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Transparent Pricing — Confirmed Before Payment
            </div>

            <h1 className={`text-4xl sm:text-6xl font-semibold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Clear pricing.{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                No surprises.
              </span>
            </h1>

            <p className={`mt-6 text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/60" : "text-slate-500"}`}>
              Starting prices for every service we offer. Final pricing is always confirmed in writing before any payment is collected — no hidden fees, ever.
            </p>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              {[
                { value: "6", label: "Service categories" },
                { value: "$0", label: "Hidden fees" },
                { value: "24h", label: "Quote turnaround" },
                { value: "100%", label: "Price confirmed first" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{value}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-white/45" : "text-slate-400"}`}>{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/checkout-demo"
                className="px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
              >
                Try Checkout Demo
              </Link>
              <Link
                href="/contact"
                className={`px-7 py-3.5 rounded-full border text-sm font-semibold transition-all hover:scale-105 ${
                  isDark
                    ? "border-white/20 text-white hover:bg-white/[0.07]"
                    : "border-slate-300 text-slate-700 bg-white hover:bg-slate-100"
                }`}
              >
                Request a Free Quote
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["256-bit SSL", "Stripe & Wise ready", "Verified U.S. LLC", "No payment until confirmed", "GDPR compliant"].map((t) => (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-white/50"
                      : "border-slate-200 bg-white text-slate-500 shadow-sm"
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-green-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sticky category nav ───────────────────────────────────────── */}
        <div
          ref={navRef}
          className={`sticky top-[76px] z-30 border-b backdrop-blur-xl ${
            isDark ? "border-white/10 bg-[#06080f]/95" : "border-slate-200 bg-white/95"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
              {NAV_CATS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollToSection(c.id)}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    activecat === c.id
                      ? "bg-blue-600 text-white"
                      : isDark
                      ? "text-white/50 hover:text-white hover:bg-white/[0.07]"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Legal disclaimer ──────────────────────────────────────────── */}
        <div className="mx-auto max-w-5xl px-6 pt-10">
          <div className={`flex gap-3 rounded-2xl border border-amber-500/20 px-5 py-4 ${
            isDark ? "bg-amber-500/[0.06]" : "bg-amber-50"
          }`}>
            <svg className="h-4 w-4 flex-shrink-0 text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p className={`text-xs leading-relaxed ${isDark ? "text-amber-300/70" : "text-amber-700"}`}>
              <span className={`font-semibold ${isDark ? "text-amber-300" : "text-amber-700"}`}>Pricing disclosure: </span>
              All prices are starting estimates and may vary based on scope, complexity, integrations, and timeline.
              Government fees, domain registration, hosting, payment processor fees, and third-party software are not included unless stated in your quote.
              Final pricing is always confirmed in writing before any payment is collected.
            </p>
          </div>
        </div>

        {/* ── How pricing works ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">How it works</p>
            <h2 className={`text-2xl sm:text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              From browse to launch in 3 steps
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a service",
                desc: "Browse the categories below and select the package that fits your business stage and budget.",
                icon: "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5",
                color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
              },
              {
                step: "02",
                title: "Request a quote or try the demo",
                desc: "Fill out the Checkout Demo or send us a message. We'll send a detailed written quote within 24 hours.",
                icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
                color: "text-green-500 bg-green-500/10 border-green-500/20",
              },
              {
                step: "03",
                title: "Confirm and launch",
                desc: "Review your quote, approve the scope, and make payment. We start work within 1–2 business days.",
                icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
                color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
              },
            ].map(({ step, title, desc, icon, color }) => (
              <div
                key={step}
                className={`rounded-2xl border p-6 ${
                  isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border mb-4 ${color}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? "text-white/30" : "text-slate-400"}`}>
                  Step {step}
                </p>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-white/55" : "text-slate-500"}`}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Service categories ────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-10 space-y-20">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-32">
              {/* Category header */}
              <div className={`mb-8 rounded-2xl border px-6 py-5 flex items-center gap-4 ${cat.accentBorder} ${cat.accentBg}`}>
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${cat.accentBorder} ${cat.accent}`}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{cat.title}</h2>
                  <p className={`text-sm mt-0.5 ${isDark ? "text-white/55" : "text-slate-500"}`}>{cat.subtitle}</p>
                </div>
              </div>

              {/* Plan cards */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.plans.map((plan) => (
                  <PricingCard key={plan.name} plan={plan} cat={cat} isDark={isDark} />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── Pricing FAQ ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">Common questions</p>
            <h2 className={`text-2xl sm:text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              Pricing FAQ
            </h2>
          </div>

          <div
            className={`rounded-2xl border px-6 ${
              isDark
                ? "border-white/10 bg-white/[0.03] divide-y divide-white/10"
                : "border-slate-200 bg-white shadow-sm divide-y divide-slate-100"
            }`}
          >
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                isDark={isDark}
              />
            ))}
          </div>
        </section>

        {/* ── Legal note ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 pb-10">
          <div
            className={`rounded-2xl border px-6 py-5 text-xs leading-relaxed space-y-2 ${
              isDark
                ? "border-white/10 bg-white/[0.02] text-white/40"
                : "border-slate-200 bg-white text-slate-400 shadow-sm"
            }`}
          >
            <p className={`font-semibold ${isDark ? "text-white/60" : "text-slate-600"}`}>Important Pricing Notes</p>
            <p>All prices listed are starting estimates in USD and represent the minimum for each service tier. Actual pricing depends on scope, number of integrations, third-party tools required, and project timeline.</p>
            <p>Government filing fees (LLC, EIN), domain registration, hosting, SSL, email hosting, payment processing fees, and third-party software subscriptions are not included unless explicitly stated in your project quote.</p>
            <p>Final project pricing is always confirmed in a written quote before any payment is requested. Shata Global LLC (operating as Shata Solutions) does not charge hidden fees.</p>
            <p>
              Questions?{" "}
              <a href="mailto:sales@shatasolutions.com" className={`transition-colors hover:text-blue-500 ${isDark ? "text-white/60" : "text-slate-500"}`}>
                sales@shatasolutions.com
              </a>
              {" · "}
              <a href="mailto:billing@shatasolutions.com" className={`transition-colors hover:text-blue-500 ${isDark ? "text-white/60" : "text-slate-500"}`}>
                billing@shatasolutions.com
              </a>
            </p>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div
            className={`relative overflow-hidden rounded-3xl border p-10 md:p-16 text-center ${
              isDark
                ? "border-white/10 bg-gradient-to-br from-blue-600/10 via-white/[0.03] to-purple-600/10"
                : "border-slate-200 bg-gradient-to-br from-blue-50 via-white to-purple-50"
            }`}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px]" />
              <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-purple-600/10 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className={`text-3xl md:text-4xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                Not sure where to start?
              </h2>
              <p className={`mt-4 max-w-lg mx-auto ${isDark ? "text-white/60" : "text-slate-500"}`}>
                Tell us about your project and get a custom quote within 24 hours — no commitment, no pressure.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="/contact"
                  className={`px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                    isDark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Request a Free Quote
                </Link>
                <Link
                  href="/checkout-demo"
                  className="px-7 py-3.5 border border-blue-500/40 bg-blue-500/10 text-blue-500 rounded-full text-sm font-semibold hover:bg-blue-500/20 transition-all hover:scale-105"
                >
                  Try Checkout Demo
                </Link>
                <Link
                  href="/services"
                  className={`px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:scale-105 border ${
                    isDark
                      ? "border-white/20 text-white hover:bg-white/[0.07]"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Explore All Services
                </Link>
              </div>

              {/* Contact info */}
              <div className={`mt-8 flex flex-wrap justify-center gap-5 text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
                <a href="mailto:sales@shatasolutions.com" className="hover:text-blue-500 transition">sales@shatasolutions.com</a>
                <a href="tel:+16197761222" className="hover:text-blue-500 transition">+1 (619) 776-1222</a>
                <span>Mon–Fri, 9 AM–6 PM EST</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter isDark={isDark} />

      <OnboardingModal isDark={isDark} open={onboardingOpen} onClose={closeOnboarding} initialPlan={onboardingPlan} sessionId={sessionId} />
      <DashboardModal isDark={isDark} open={dashboardOpen} onClose={closeDashboard} />
    </div>
  );
}
