"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const process = [
  {
    phase: "Phase 01",
    title: "Discovery & Strategy",
    desc: "We map your offer, audience, user journey, conversion bottlenecks, and the exact business outcome your site needs to drive.",
  },
  {
    phase: "Phase 02",
    title: "High-Fidelity Design",
    desc: "Apple-grade UI/UX, responsive layouts, premium visual hierarchy, conversion-focused copy, and trust-building section architecture.",
  },
  {
    phase: "Phase 03",
    title: "Engineering & Performance",
    desc: "Clean Next.js architecture, reusable components, fast loading, accessibility, structured SEO, and Lighthouse-focused implementation.",
  },
  {
    phase: "Phase 04",
    title: "Optimization & Deployment",
    desc: "Edge delivery, analytics, event tracking, SEO readiness, deployment, QA, and launch support so the site is ready for real traffic.",
  },
];

const stack = [
  {
    name: "React",
    logo: "react",
    benefit: "Reusable components make your website easier to scale, maintain, and improve after launch.",
  },
  {
    name: "Next.js",
    logo: "nextjs",
    benefit: "High-performance rendering, SEO-friendly pages, fast routing, and production-ready architecture.",
  },
  {
    name: "Tailwind CSS",
    logo: "tailwind",
    benefit: "A clean design system with consistent spacing, responsive behavior, and polished UI patterns.",
  },
  {
    name: "Vercel",
    logo: "vercel",
    benefit: "Global edge deployment, fast previews, reliable hosting, and a modern production workflow.",
  },
  {
    name: "Stripe",
    logo: "stripe",
    benefit: "Payments, checkout, subscriptions, invoices, and revenue flows connected directly into the site.",
  },
  {
    name: "Supabase",
    logo: "supabase",
    benefit: "Authentication, database, admin workflows, and backend features without slow enterprise complexity.",
  },
];

const caseStudies = [
  {
    title: "Founder SaaS Launch",
    category: "SaaS Website + Billing",
    image: "/case-studies/case-saas.png",
    result: "+412% conversion",
    desc: "A premium SaaS landing page with pricing, onboarding, Stripe checkout, and analytics-ready lead capture.",
  },
  {
    title: "Global Services Brand",
    category: "Trust-First Business Site",
    image: "/case-studies/case-services.png",
    result: "+189% qualified leads",
    desc: "A high-trust service website with strong positioning, clearer packages, and conversion-focused contact flows.",
  },
  {
    title: "Ecommerce System",
    category: "Storefront + Automation",
    image: "/case-studies/case-ecommerce.png",
    result: "+63% checkout speed",
    desc: "A fast storefront experience with product storytelling, payment readiness, and automated customer follow-up.",
  },
];

const tiers = [
  {
    name: "Launch",
    price: "Starter",
    desc: "For founders who need a clean, professional presence fast.",
    features: ["Conversion landing page", "Responsive UI", "Basic SEO setup", "Contact flow", "Launch checklist"],
  },
  {
    name: "Growth",
    price: "Most Popular",
    desc: "For businesses that need a premium site built to convert and scale.",
    popular: true,
    features: ["Full website system", "Premium UI/UX", "SEO architecture", "Analytics events", "Performance optimization", "CMS or backend setup"],
  },
  {
    name: "Scale",
    price: "Custom",
    desc: "For SaaS, automation, payments, dashboards, and complex workflows.",
    features: ["Custom web app", "Stripe integration", "Supabase backend", "Admin dashboard", "Automation workflows", "Ongoing optimization"],
  },
];

const faqs = [
  {
    q: "Do I own the website after launch?",
    a: "Yes. You own the website, content, and final codebase. We can also guide hosting, domains, analytics, and future updates.",
  },
  {
    q: "Can you handle hosting and deployment?",
    a: "Yes. We can deploy on modern infrastructure such as Vercel and configure a clean production workflow with performance, previews, and rollback options.",
  },
  {
    q: "Will the website be fast and SEO-ready?",
    a: "Yes. We build with performance, metadata, content structure, responsive layouts, and clean technical foundations from the start.",
  },
  {
    q: "Can the site scale into a full platform later?",
    a: "Yes. We design the architecture so your website can evolve into payments, customer portals, dashboards, automations, and SaaS workflows.",
  },
  {
    q: "Do you provide maintenance after launch?",
    a: "Yes. You can request ongoing support for edits, analytics, performance improvements, landing pages, and conversion optimization.",
  },
];

export default function WebsiteDevelopmentPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-950"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-[#0b1020] to-indigo-950/40"
              : "bg-gradient-to-br from-white via-indigo-50/50 to-blue-50/40"
          }`}
        />
        <div className="absolute top-16 -left-24 h-[520px] w-[520px] rounded-full bg-[#635bff]/25 blur-[130px] animate-pulse" />
        <div
          className="absolute top-48 -right-24 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[130px] animate-pulse"
          style={{ animationDelay: "1.4s" }}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.05]" : "opacity-[0.06]"}`}
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
        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] [transform-style:preserve-3d]">
          <div className="text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white/70 text-slate-700"
              }`}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#635bff] animate-pulse" />
              Premium Website Development
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Stripe-Apple Fusion
            </div>

            <h1
              className={`mt-8 text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.04em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Websites that convert
              <span className="block bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                traffic into revenue.
              </span>
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              } mx-auto lg:mx-0`}
            >
              We design and build high-performance websites that look premium, load fast, explain your offer clearly, and turn visitors into leads, customers, and revenue.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/contact?type=website-development"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 text-white font-semibold shadow-[0_20px_60px_rgba(99,91,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Build my website →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#process"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                See the A-Z process
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <TrustChip isDark={isDark} label="Fast loading" />
              <TrustChip isDark={isDark} label="SEO-ready" />
              <TrustChip isDark={isDark} label="Conversion-first" />
            </div>
          </div>

          <HeroMockup isDark={isDark} />
        </section>

        <section className="mx-auto mt-24 max-w-6xl px-6">
          <GlassCard isDark={isDark} className="px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm">
              <div className={isDark ? "text-white/50" : "text-slate-500"}>Built with trust standards</div>
              <div className="flex flex-wrap items-center gap-3 font-semibold">
                <Badge isDark={isDark}>SSL secure</Badge>
                <Badge isDark={isDark}>PCI-aware checkout</Badge>
                <Badge isDark={isDark}>SOC2-ready workflows</Badge>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-amber-400">★★★★★</span>
                <span className={isDark ? "text-white/70" : "text-slate-700"}>Premium delivery quality</span>
              </div>
            </div>
          </GlassCard>
        </section>

        <section id="process" className="mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>A-to-Z process architecture</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              From strategy to deployment, every step is engineered for conversion.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item, index) => (
              <ProcessCard key={item.title} isDark={isDark} index={index} {...item} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#635bff]/20 blur-[110px]" />
            <div className="relative">
              <Eyebrow isDark={isDark}>Technical stack</Eyebrow>
              <h2 className={`mt-4 max-w-3xl text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                A curated toolkit, not a wall of logos.
              </h2>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Every tool is selected for speed, reliability, clean maintenance, and the ability to support payments, data, SEO, and future product growth.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {stack.map((item, index) => (
                  <StackPanel key={item.name} isDark={isDark} index={index} {...item} />
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mx-auto mt-24 max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard isDark={isDark} className="p-8">
              <Eyebrow isDark={isDark}>Performance & CRO</Eyebrow>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Speed is not a detail. It is a conversion advantage.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Generic sites look acceptable but often load slowly, confuse visitors, and waste traffic. We build for clarity, speed, trust, and measurable business outcomes.
              </p>
            </GlassCard>

            <SpeedComparison isDark={isDark} />
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>Portfolio display</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Case studies designed to show outcomes, not just screenshots.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((item, index) => (
              <CaseStudyCard key={item.title} isDark={isDark} index={index} {...item} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>Engagement tiers</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Choose the build model that matches your stage.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <PricingCard key={tier.name} isDark={isDark} {...tier} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <GlassCard isDark={isDark} className="relative overflow-hidden p-8">
              <Eyebrow isDark={isDark}>Concierge FAQ</Eyebrow>
              <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Clear answers before you start.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We remove the black box from website development so you know exactly what happens from first call to launch.
              </p>

              <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <img
                  src="/case-studies/faq-process-visual.png"
                  alt="Website development concierge process visual"
                  className="h-[560px] w-full object-contain object-center p-4"
                />
              </div>
            </GlassCard>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FaqCard key={faq.q} isDark={isDark} {...faq} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
          <GlassCard isDark={isDark} className="p-10">
            <Eyebrow isDark={isDark}>Build the revenue layer</Eyebrow>
            <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Ready for a website that works like a business asset?
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We’ll turn your offer, audience, and goals into a premium website built for trust, speed, SEO, and conversion.
            </p>
            <Link
              href="/contact?type=website-development"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 font-semibold text-white shadow-[0_20px_60px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
            >
              Start my website →
            </Link>
          </GlassCard>
        </section>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function HeroMockup({ isDark }: { isDark: boolean }) {
  return (
    <div className="group relative mx-auto h-[620px] w-full max-w-[560px] perspective-[1500px]">
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/25 blur-[120px] transition duration-700 group-hover:scale-110" />
      <div
        className={`absolute left-0 top-16 w-[430px] rotate-[-5deg] rounded-[2rem] border p-4 backdrop-blur-2xl transition duration-700 group-hover:-translate-y-3 group-hover:rotate-[-7deg] ${
          isDark
            ? "border-white/10 bg-white/[0.08] shadow-[0_50px_160px_rgba(0,0,0,0.45)]"
            : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
        }`}
      >
        <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-white/20" />
            <div className="h-7 w-24 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400" />
          </div>
          <div className="mt-8 h-10 w-3/4 rounded-2xl bg-white/20" />
          <div className="mt-3 h-3 w-full rounded-full bg-white/10" />
          <div className="mt-2 h-3 w-2/3 rounded-full bg-white/10" />
          <div className="mt-8 grid grid-cols-3 gap-3">
            {["SEO", "Speed", "CRO"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center text-xs">{item}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 right-8 h-[360px] w-[180px] rotate-[8deg] rounded-[2.4rem] border-[8px] border-slate-950 bg-slate-950 shadow-[0_55px_160px_rgba(15,23,42,0.45)] transition duration-700 group-hover:-translate-y-5 group-hover:rotate-[11deg]">
        <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-4 text-slate-950">
          <div className="mt-8 h-3 w-20 rounded-full bg-slate-300" />
          <div className="mt-5 text-2xl font-semibold leading-tight">Fast. Clear. Trusted.</div>
          <div className="mt-5 h-24 rounded-3xl bg-gradient-to-br from-[#635bff] to-cyan-400" />
          <div className="mt-4 space-y-2">
            <div className="h-3 rounded-full bg-slate-200" />
            <div className="h-3 w-2/3 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
      <FloatingStat isDark={isDark} className="bottom-28 left-4" label="Load time" value="0.8s" />
      <FloatingStat isDark={isDark} className="bottom-4 right-0" label="Conversion" value="+400%" />
    </div>
  );
}

function ProcessCard({ isDark, index, phase, title, desc }: { isDark: boolean; index: number; phase: string; title: string; desc: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition duration-300 hover:scale-[1.02] ${
        isDark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#635bff]/10 blur-[60px]" />
      <div className="relative">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.25em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"}>{phase}</div>
        <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#635bff]/10 text-sm font-bold text-[#635bff] ring-1 ring-[#635bff]/20">0{index + 1}</div>
        <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
      </div>
    </div>
  );
}

function StackPanel({
  isDark,
  logo,
  name,
  benefit,
  index,
}: {
  isDark: boolean;
  logo: string;
  name: string;
  benefit: string;
  index: number;
}) {
  return (
    <div
      className={`group relative min-h-[220px] overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition duration-300 hover:scale-[1.02] ${
        isDark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#635bff]/10 blur-[70px] transition group-hover:scale-125" />
      <div className="relative">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-xl ${
            isDark ? "border-white/10 bg-white/10" : "border-slate-200 bg-white"
          }`}
        >
          <BrandLogo name={logo} isDark={isDark} />
        </div>
        <div className={isDark ? "mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/35" : "mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"}>Tool 0{index + 1}</div>
        <h3 className={`mt-3 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{name}</h3>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{benefit}</p>
      </div>
    </div>
  );
}

function BrandLogo({ name, isDark }: { name: string; isDark: boolean }) {
  const darkFill = isDark ? "#ffffff" : "#0f172a";

  if (name === "react") {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <circle cx="32" cy="32" r="5.5" fill="#61DAFB" />
        <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#61DAFB" strokeWidth="3" />
        <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 32 32)" />
      </svg>
    );
  }

  if (name === "nextjs") {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill={darkFill} />
        <path d="M20 44V20h5.5l17.7 24H38L25 27.4V44H20Z" fill={isDark ? "#0f172a" : "#ffffff"} />
        <path d="M40 20h5v24h-5V20Z" fill={isDark ? "#0f172a" : "#ffffff"} />
      </svg>
    );
  }

  if (name === "tailwind") {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <path
          d="M32 18c-7.2 0-11.7 3.6-13.5 10.7 2.7-3.6 5.8-4.9 9.4-3.8 2 .6 3.4 2 5 3.5 2.5 2.5 5.4 5.4 11.6 5.4 7.2 0 11.7-3.6 13.5-10.7-2.7 3.6-5.8 4.9-9.4 3.8-2-.6-3.4-2-5-3.5C41.1 20.9 38.2 18 32 18ZM18.5 34.2C11.3 34.2 6.8 37.8 5 45c2.7-3.6 5.8-4.9 9.4-3.8 2 .6 3.4 2 5 3.5 2.5 2.5 5.4 5.4 11.6 5.4 7.2 0 11.7-3.6 13.5-10.7-2.7 3.6-5.8 4.9-9.4 3.8-2-.6-3.4-2-5-3.5-2.5-2.5-5.4-5.5-11.6-5.5Z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  if (name === "vercel") {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <path d="M32 13 58 51H6L32 13Z" fill={darkFill} />
      </svg>
    );
  }

  if (name === "stripe") {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <rect x="6" y="10" width="52" height="44" rx="12" fill="#635BFF" />
        <path
          d="M37.9 29.4c-4.4-1.6-6.1-2.8-6.1-4.6 0-1.5 1.3-2.5 3.7-2.5 3 0 6.1 1.1 8.3 2.3v-7.1c-1.9-.9-4.9-1.8-8.5-1.8-7.4 0-12.2 3.9-12.2 9.8 0 5.1 3.7 7.3 9.8 9.5 4.1 1.5 5.5 2.6 5.5 4.4 0 1.8-1.5 2.8-4.3 2.8-3.4 0-7.1-1.4-9.6-3v7.2c2.3 1.3 5.8 2.3 9.9 2.3 7.8 0 12.8-3.8 12.8-10.1 0-5.2-3.2-7.2-9.3-9.2Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (name === "supabase") {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <path d="M36.5 6.5 16.5 34h18.2L27.5 57.5 47.5 30H29.3L36.5 6.5Z" fill="#3ECF8E" />
        <path d="M36.5 6.5 16.5 34h18.2L36.5 6.5Z" fill="#3ECF8E" opacity="0.65" />
      </svg>
    );
  }

  return null;
}

function SpeedComparison({ isDark }: { isDark: boolean }) {
  return (
    <GlassCard isDark={isDark} className="p-8">
      <Eyebrow isDark={isDark}>Speed comparison</Eyebrow>
      <div className="mt-8 space-y-5">
        <SpeedRow isDark={isDark} label="Generic template site" value="42" detail="Slow scripts, weak hierarchy, unclear conversion path" muted />
        <SpeedRow isDark={isDark} label="Built by Shata Solutions" value="98" detail="Fast architecture, clean UX, conversion-focused sections" />
      </div>
    </GlassCard>
  );
}

function SpeedRow({ isDark, label, value, detail, muted }: { isDark: boolean; label: string; value: string; detail: string; muted?: boolean }) {
  return (
    <div className={`rounded-3xl border p-5 ${isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-white/80"}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{label}</div>
          <div className={`mt-1 text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>{detail}</div>
        </div>
        <div className={`text-3xl font-semibold ${muted ? "text-slate-400" : "bg-gradient-to-br from-[#635bff] to-cyan-400 bg-clip-text text-transparent"}`}>{value}</div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-200/30">
        <div className={`h-2 rounded-full ${muted ? "bg-slate-400" : "bg-gradient-to-r from-[#635bff] to-cyan-400"}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function CaseStudyCard({
  isDark,
  index,
  title,
  category,
  result,
  desc,
  image,
}: {
  isDark: boolean;
  index: number;
  title: string;
  category: string;
  result: string;
  desc: string;
  image?: string;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-[2rem] border backdrop-blur-xl transition duration-300 hover:scale-[1.02] ${
        isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${title} case study mockup`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 opacity-90 transition group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl">
          Case 0{index + 1}
        </div>
      </div>
      <div className="p-6">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.22em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"}>{category}</div>
        <h3 className={`mt-3 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
        <div className="mt-3 bg-gradient-to-br from-[#635bff] to-cyan-400 bg-clip-text text-2xl font-semibold text-transparent">{result}</div>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
      </div>
    </div>
  );
}

function PricingCard({ isDark, name, price, desc, features, popular }: { isDark: boolean; name: string; price: string; desc: string; features: string[]; popular?: boolean }) {
  return (
    <div
      className={`relative rounded-[2rem] border p-8 backdrop-blur-xl transition duration-300 hover:scale-[1.02] ${
        popular
          ? "border-[#635bff]/50 bg-[#635bff]/10 shadow-[0_30px_100px_rgba(99,91,255,0.22)]"
          : isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
      }`}
    >
      {popular && <div className="absolute -top-4 left-8 rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-4 py-1.5 text-xs font-semibold text-white">Most Popular</div>}
      <h3 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{name}</h3>
      <div className="mt-3 text-3xl font-semibold bg-gradient-to-br from-[#635bff] to-cyan-400 bg-clip-text text-transparent">{price}</div>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <Requirement key={feature} isDark={isDark} label={feature} />
        ))}
      </div>
      <Link href="/contact?type=website-development" className="mt-8 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-5 py-3 font-semibold text-white">
        Start with {name}
      </Link>
    </div>
  );
}

function FaqCard({ isDark, q, a }: { isDark: boolean; q: string; a: string }) {
  return (
    <div className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-sm"}`}>
      <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{q}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{a}</p>
    </div>
  );
}

function FloatingStat({ isDark, className, label, value }: { isDark: boolean; className: string; label: string; value: string }) {
  return (
    <div
      className={`absolute ${className} rounded-2xl border p-4 shadow-xl backdrop-blur-2xl transition duration-700 group-hover:-translate-y-2 ${
        isDark ? "border-white/10 bg-white/10 text-white" : "border-white/70 bg-white/80 text-slate-900"
      }`}
    >
      <div className={isDark ? "text-xs text-white/50" : "text-xs text-slate-400"}>{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
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

function Badge({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-full border px-3 py-1 text-xs ${isDark ? "border-white/10 bg-white/5 text-white/70" : "border-slate-200 bg-white text-slate-600"}`}>
      {children}
    </div>
  );
}

function GlassCard({ isDark, className = "", children }: { isDark: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[2rem] border backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
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