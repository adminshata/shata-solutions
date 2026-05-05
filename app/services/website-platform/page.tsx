"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";
import { websitePlatformFeatures, websiteIndustries } from "./data";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const buildOptions = [
  ["Start with a template", "Define your design"],
  ["Build with AI", "Accelerate your build"],
  ["Collect content first", "Onboard as you build"],
  ["Start with a file", "Turn plans into pages"],
] as const;

const showcasePanels = [
  {
    title: "AI Template Build",
    copy: "Generate a clinic, service, or ecommerce site from business data and a premium template.",
    cta: "Build with AI",
    variant: "ai",
  },
  {
    title: "Service Business Website",
    copy: "Launch polished service pages with booking, inquiries, and trust sections ready.",
    cta: "View service flow",
    variant: "service",
  },
  {
    title: "Ecommerce Starter",
    copy: "Start with products, checkout links, categories, and order-ready layouts.",
    cta: "Preview store",
    variant: "commerce",
  },
  {
    title: "Client Dashboard",
    copy: "Edit content, publish updates, and view leads without touching code.",
    cta: "Open dashboard",
    variant: "dashboard",
  },
  {
    title: "Mobile Booking Flow",
    copy: "Make your website ready for mobile customers, calls, bookings, and lead capture.",
    cta: "See mobile flow",
    variant: "mobile",
  },
] as const;

const templateCategories = [
  "Clinics",
  "Law Firms",
  "Accounting",
  "Auto / DMV",
  "Repair Centers",
  "Restaurants",
  "Ecommerce",
  "Agencies",
  "Real Estate",
  "Travel",
] as const;

const templateCards = [
  { title: "Clinic Website", tag: "Appointments", tone: "indigo" },
  { title: "Ecommerce Store", tag: "Products", tone: "cyan" },
  { title: "Law Firm", tag: "Lead forms", tone: "slate" },
  { title: "Repair Center", tag: "Service requests", tone: "blue" },
] as const;

const managedDifferences = [
  {
    title: "Managed setup",
    copy: "Shata configures your template, content, domain, SSL, and publishing — no setup screens to learn.",
  },
  {
    title: "Simple client dashboard",
    copy: "Update text, images, services, and products from a focused panel built for non-technical owners.",
  },
  {
    title: "Technical work handled",
    copy: "Hosting, SSL, DNS, performance, and security stay with us. You stay focused on your business.",
  },
  {
    title: "Business systems connected",
    copy: "Domain, email, lead forms, booking, and CRM-ready flows are wired in from day one.",
  },
] as const;

const dashboardItems = [
  "Edit text",
  "Upload images",
  "Manage services",
  "Manage products",
  "View leads",
  "Update contact info",
  "Change business hours",
  "Publish updates",
] as const;

const addressOptions = [
  {
    title: "Managed Shata Subdomain",
    example: "yourbrand.shatasolutions.com",
    description: "Launch fast with a low-cost monthly website address powered by Shata.",
  },
  {
    title: "Connect Existing Domain",
    example: "yourbrand.com",
    description: "Already own a domain? We connect it, secure it, and publish your website.",
  },
  {
    title: "Register New Domain",
    example: "yourbrand.com",
    description: "Need a domain? We help you find, register, and connect it from start to finish.",
  },
] as const;

// Feature + industry data now sourced from ./data.ts so it's shared with
// the dynamic feature/industry pages. The parent page renders cards as
// real links into /services/website-platform/features/[slug] and /industries/[slug].

const ecosystemCards = ["Domain Registration", "Business Email", "Website Hosting", "Lead Routing"] as const;

const connectedServices = [
  {
    title: "Website Development",
    href: "/services/website-development",
    copy: "Custom pages, advanced UI, and business-specific web builds.",
    icon: "WD",
  },
  {
    title: "Domain Registration",
    href: "/services/domain-registration",
    copy: "Register, connect, and secure your business domain.",
    icon: "DR",
  },
  {
    title: "Business Email",
    href: "/services/business-email",
    copy: "Professional email on your domain with deliverability setup.",
    icon: "BE",
  },
  {
    title: "Business Setup",
    href: "/services/business-setup",
    copy: "Launch your operating foundation before or after your website.",
    icon: "BS",
  },
  {
    title: "Ecommerce",
    href: "/services/ecommerce",
    copy: "Product pages, order flow, payment links, and online store setup.",
    icon: "EC",
  },
  {
    title: "Automation",
    href: "/services/automation",
    copy: "Connect forms, leads, notifications, CRM, and follow-ups.",
    icon: "AU",
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-app-development",
    copy: "Turn your website or business flow into iOS and Android apps.",
    icon: "MA",
  },
  {
    title: "Marketing Plans",
    href: "/services/marketing-plans",
    copy: "Campaigns, content systems, growth plans, and launch strategy.",
    icon: "MP",
  },
  {
    title: "Branding",
    href: "/services/branding",
    copy: "Logo system, visual identity, campaign assets, and brand portal.",
    icon: "BR",
  },
  {
    title: "SaaS",
    href: "/services/saas",
    copy: "Software platforms, dashboards, and subscription systems.",
    icon: "SA",
  },
] as const;

// `industries` now comes from `websiteIndustries` (./data.ts) — 26 entries.

const steps = [
  ["01", "Choose your plan"],
  ["02", "Choose website address"],
  ["03", "Pick your template"],
  ["04", "Send business info"],
  ["05", "We customize & publish"],
  ["06", "You edit from dashboard"],
] as const;

const plans = [
  {
    name: "Starter Website",
    desc: "For small businesses that need a simple, affordable launch.",
    items: ["Shata subdomain", "Template website", "Dashboard access", "SSL included", "Basic support", "Up to 5 pages"],
    featured: false,
    cta: "Request setup",
  },
  {
    name: "Professional Website",
    desc: "For businesses that want their own domain and a polished online presence.",
    items: ["Custom domain", "Full business website", "Business email add-on", "Lead forms", "Analytics", "Up to 10 pages"],
    featured: true,
    cta: "Start with this plan",
  },
  {
    name: "Business Platform",
    desc: "For growing businesses that need website, domain, email, and workflow support.",
    items: ["Website + domain + email", "Booking / order setup", "More pages & services", "Monthly updates", "Priority support", "CRM-ready forms"],
    featured: false,
    cta: "Request setup",
  },
] as const;

const addons = [
  "Extra page",
  "Extra service item",
  "Extra product upload",
  "Business email setup",
  "Domain registration",
  "Logo customization",
  "WhatsApp button",
  "Booking form",
  "Payment link",
  "CRM integration",
  "Monthly updates",
  "SEO setup",
  "Social media campaign design",
  "Automation setup",
  "CRM workflow",
  "Bilingual Arabic / English content",
] as const;

const faqs = [
  ["Can I use yourbrand.shatasolutions.com?", "Yes. The Shata subdomain option is the fastest and most affordable way to launch a website before moving to a custom domain."],
  ["Can I connect my own domain?", "Yes. We connect your existing domain, configure DNS, activate SSL, and publish your website."],
  ["Can Shata register a new domain for me?", "Yes. We can help you find, register, secure, and connect a new domain to your website."],
  ["Can I edit my website myself?", "Yes. The dashboard is built for simple edits like text, images, services, products, contact details, and business hours."],
  ["Do I need technical experience?", "No. Shata handles setup, hosting, SSL, publishing, and technical configuration."],
  ["Can I add more pages later?", "Yes. You can expand your website with more pages, service sections, products, forms, and workflows."],
  ["Can I add products or services later?", "Yes. Products, service items, booking flows, and lead forms can be added as your business grows."],
  ["Can I upgrade from subdomain to custom domain?", "Yes. You can start on a Shata subdomain and move to your own domain later."],
  ["Can I get business email with the website?", "Yes. Business email can be added as an upgrade, including setup for addresses like info@yourbrand.com."],
  ["Is hosting included?", "Yes. Hosting and SSL are included in the managed platform setup."],
  ["Is this a DIY website builder?", "No. Shata is a managed website platform. You receive a finished business-ready website rather than a builder to configure on your own."],
  ["Can Shata manage the website for me?", "Yes. Shata handles setup, publishing, technical work, and ongoing maintenance so you stay focused on your business."],
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function WebsitePlatform() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#050b16] text-white" : "bg-[#f6f9ff] text-slate-950"}`}>
      <GlobalStyles />

      {/* Global ambient background — subtle grid + mesh */}
      <PageBackground isDark={isDark} />
      <GlobalChrome isDark={isDark} />

      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative overflow-hidden pt-28">
        <Hero isDark={isDark} />
        <BuildOptions isDark={isDark} />
        <InteractiveShowcase isDark={isDark} />
        <TemplateMarketplace isDark={isDark} />
        <ManagedDifference isDark={isDark} />
        <OrbitalScene isDark={isDark} />
        <DashboardSection isDark={isDark} />
        <AddressSection isDark={isDark} />
        <FeatureBento isDark={isDark} />
        <EcosystemSection isDark={isDark} />
        <ConnectedServices isDark={isDark} />
        <IndustrySystems isDark={isDark} />
        <HowItWorks isDark={isDark} />
        <PlansSection isDark={isDark} />
        <AddonsSection isDark={isDark} />
        <FAQSection isDark={isDark} />
        <FinalCTA isDark={isDark} />
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared utility components                                           */
/* ------------------------------------------------------------------ */

function PageBackground({ isDark }: { isDark: boolean }) {
  // Stable particle positions (no Math.random in render)
  const particles = [
    { l: "8%", t: "12%", d: 14, s: 1.2 }, { l: "22%", t: "78%", d: 18, s: 0.9 },
    { l: "37%", t: "32%", d: 11, s: 1.4 }, { l: "55%", t: "65%", d: 16, s: 1.0 },
    { l: "70%", t: "20%", d: 13, s: 1.3 }, { l: "82%", t: "55%", d: 19, s: 0.8 },
    { l: "12%", t: "48%", d: 12, s: 1.1 }, { l: "29%", t: "92%", d: 15, s: 0.95 },
    { l: "44%", t: "8%", d: 17, s: 1.05 }, { l: "61%", t: "40%", d: 10, s: 1.3 },
    { l: "76%", t: "85%", d: 14, s: 1.1 }, { l: "90%", t: "30%", d: 16, s: 1.0 },
    { l: "5%", t: "70%", d: 13, s: 0.9 }, { l: "33%", t: "55%", d: 11, s: 1.2 },
    { l: "48%", t: "88%", d: 18, s: 1.0 }, { l: "67%", t: "12%", d: 12, s: 1.15 },
    { l: "85%", t: "72%", d: 15, s: 1.05 }, { l: "18%", t: "25%", d: 20, s: 0.85 },
    { l: "40%", t: "70%", d: 11, s: 1.25 }, { l: "58%", t: "18%", d: 14, s: 1.0 },
    { l: "73%", t: "45%", d: 17, s: 0.95 }, { l: "92%", t: "8%", d: 12, s: 1.2 },
    { l: "15%", t: "62%", d: 13, s: 1.1 }, { l: "27%", t: "5%", d: 15, s: 1.0 },
    { l: "50%", t: "50%", d: 19, s: 0.9 },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Subtle grid */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[linear-gradient(to_right,rgba(99,91,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.08)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.06)_1px,transparent_1px)]"
        } bg-[size:72px_72px]`}
      />

      {/* Mesh blobs */}
      <div className="absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-[#635bff]/30 blur-[140px] opacity-50 motion-safe:animate-[shata-mesh-1_18s_ease-in-out_infinite]" />
      <div className="absolute right-[-10%] top-[20%] h-[480px] w-[480px] rounded-full bg-cyan-400/25 blur-[140px] opacity-50 motion-safe:animate-[shata-mesh-2_22s_ease-in-out_infinite]" />
      <div className="absolute left-[20%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[140px] opacity-50 motion-safe:animate-[shata-mesh-3_20s_ease-in-out_infinite]" />

      {/* Floating particles — pure CSS animated */}
      <div className="absolute inset-0 motion-reduce:hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400 opacity-50 will-change-transform"
            style={{
              left: p.l,
              top: p.t,
              width: `${p.d * p.s * 0.18}px`,
              height: `${p.d * p.s * 0.18}px`,
              boxShadow: "0 0 12px rgba(99,91,255,0.5)",
              animation: `shata-float-${i % 4} ${(8 + (i % 6))}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Animated horizontal beam */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden motion-reduce:hidden">
        <div className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-[#635bff] to-transparent opacity-70 animate-[shata-beam_8s_linear_infinite]" />
      </div>
      <div className="absolute inset-x-0 bottom-1/3 h-px overflow-hidden motion-reduce:hidden">
        <div className="absolute h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-[shata-beam-rev_12s_linear_infinite]" />
      </div>

      <div className={`absolute inset-0 ${isDark ? "bg-[#050b16]/40" : "bg-[#f6f9ff]/40"}`} />

      <style jsx>{`
        @keyframes shata-float-0 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(8px,-14px,0); } }
        @keyframes shata-float-1 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-12px,10px,0); } }
        @keyframes shata-float-2 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(10px,12px,0); } }
        @keyframes shata-float-3 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-8px,-10px,0); } }
        @keyframes shata-beam { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
        @keyframes shata-beam-rev { 0% { transform: translateX(400%); } 100% { transform: translateX(-100%); } }
        @keyframes shata-mesh-1 { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(40px,30px,0) scale(1.08); } }
        @keyframes shata-mesh-2 { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-30px,40px,0) scale(1.05); } }
        @keyframes shata-mesh-3 { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(20px,-30px,0) scale(1.07); } }
      `}</style>
    </div>
  );
}

function SectionHeader({
  isDark,
  eyebrow,
  title,
  copy,
  align = "left",
  invert = false,
}: {
  isDark: boolean;
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const isCenter = align === "center";
  const heading = invert ? "text-white" : isDark ? "text-white" : "text-slate-950";
  const sub = invert ? "text-white/70" : isDark ? "text-white/65" : "text-slate-600";

  return (
    <div className={isCenter ? "text-center" : ""}>
      <span className="inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
        {eyebrow}
      </span>
      <h2 className={`mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-6xl ${heading} ${isCenter ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {copy && (
        <p className={`mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${sub} ${isCenter ? "mx-auto" : ""}`}>
          {copy}
        </p>
      )}
    </div>
  );
}

function Surface({
  isDark,
  className = "",
  children,
  hover = true,
}: {
  isDark: boolean;
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[1.75rem] border backdrop-blur-xl transition duration-500 ${
        isDark
          ? "border-white/10 bg-white/[0.03]"
          : "border-slate-200/80 bg-white/80"
      } ${hover ? "hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(99,91,255,0.35)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Motion primitives (hooks + components)                              */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/* Cursor-following ambient glow + scroll progress bar (page-level) */
function GlobalChrome({ isDark }: { isDark: boolean }) {
  const reduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.style.transform = `translate3d(${e.clientX - 280}px, ${e.clientY - 280}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!barRef.current) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      barRef.current.style.transform = `scaleX(${pct / 100})`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <>
      {/* Scroll progress */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#635bff] via-[#2563eb] to-cyan-400 transition-transform duration-150 will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      {/* Cursor spotlight — tight bright core + wide soft halo */}
      {!reduced && (
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] will-change-transform"
        >
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(99,91,255,0.20), transparent 55%)"
                : "radial-gradient(circle, rgba(99,91,255,0.12), transparent 55%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.30), transparent 60%)",
            }}
          />
        </div>
      )}
    </>
  );
}

/* Reveal on scroll — fade + translate */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  const cls = `transition-all duration-[900ms] ease-out will-change-transform ${
    shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  } ${className}`;

  return (
    <div ref={ref} style={style} className={cls}>
      {children}
    </div>
  );
}

/* Tilt-on-hover wrapper — true 3D scene with layered depth.
 * Children annotated with data-depth="N" pop forward by N pixels on hover.
 * data-tilt-glow gets a cursor-tracked radial light + edge sheen. */
function Tilt({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${(-y * intensity).toFixed(2)}deg) rotateY(${(x * intensity).toFixed(2)}deg) translateZ(0)`;
        layers.forEach((node) => {
          const depth = Number(node.dataset.depth || "0");
          node.style.transform = `translate3d(${(x * depth * 0.4).toFixed(2)}px, ${(y * depth * 0.4).toFixed(2)}px, ${depth}px)`;
        });
        const glow = el.querySelector<HTMLDivElement>("[data-tilt-glow]");
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(99,91,255,0.32), transparent 60%)`;
          glow.style.opacity = "1";
        }
        const sheen = el.querySelector<HTMLDivElement>("[data-tilt-sheen]");
        if (sheen) {
          sheen.style.background = `linear-gradient(${(x * 90 + 90).toFixed(0)}deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)`;
          sheen.style.opacity = "1";
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      layers.forEach((node) => {
        node.style.transform = "translate3d(0,0,0)";
      });
      const glow = el.querySelector<HTMLDivElement>("[data-tilt-glow]");
      if (glow) glow.style.opacity = "0";
      const sheen = el.querySelector<HTMLDivElement>("[data-tilt-sheen]");
      if (sheen) sheen.style.opacity = "0";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [intensity, reduced]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* Magnetic CTA — translates slightly toward the cursor */
function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * 0.18}px, ${y * 0.22}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* Animated counter — eases toward `value`, refreshes when value changes */
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    fromRef.current = display;
    startRef.current = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(fromRef.current + (value - fromRef.current) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, reduced]);

  return <>{display}</>;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 pb-20 pt-10 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? "border-white/10 bg-white/[0.04] text-white/80" : "border-slate-200 bg-white/80 text-slate-700"}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              Shata Website Platform
            </span>

            <h1 className={`mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-7xl lg:text-[5.5rem] ${isDark ? "text-white" : "text-slate-950"}`}>
              The website platform <span className="bg-gradient-to-r from-[#635bff] via-[#2563eb] to-cyan-400 bg-clip-text text-transparent">built for serious business.</span>
            </h1>

            <p className={`mt-6 max-w-xl text-lg leading-8 ${isDark ? "text-white/65" : "text-slate-600"}`}>
              Choose a template, publish on a Shata subdomain or your own domain, and edit everything from a simple dashboard — no code, no technical setup, no hosting headaches.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Link
                  href="/contact?type=website-platform"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.7)] transition"
                  style={{
                    backgroundImage: "linear-gradient(110deg, #635bff 0%, #2563eb 50%, #06b6d4 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shata-shift 6s ease-in-out infinite",
                  }}
                >
                  <span className="relative z-10">Start your website</span>
                  <span className="relative z-10">→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="#templates"
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold backdrop-blur-xl transition hover:-translate-y-0.5 ${
                    isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white/80 text-slate-900 hover:bg-white"
                  }`}
                >
                  View templates
                </Link>
              </Magnetic>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              {["Managed setup", "Hosting + SSL", "Domain ready", "Business email"].map((label, i) => (
                <span key={label} className={`flex items-center gap-2 ${isDark ? "text-white/55" : "text-slate-500"}`}>
                  {i > 0 && <span className={isDark ? "text-white/20" : "text-slate-300"}>•</span>}
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <HeroCanvas isDark={isDark} />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <LogosMarquee isDark={isDark} />
        </Reveal>
      </div>

      {/* Local keyframes for animated gradients */}
      <style jsx>{`
        @keyframes shata-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}

function LogosMarquee({ isDark }: { isDark: boolean }) {
  const items = [
    "Clinics", "Law Firms", "Auto / DMV", "Restaurants", "Repair Centers",
    "Agencies", "Real Estate", "Travel", "Accounting", "Ecommerce",
  ];
  const loop = [...items, ...items];
  return (
    <div className={`mt-16 overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white/60"}`}>
      <div className="relative flex items-center py-4">
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#f6f9ff] to-transparent dark:from-[#050b16]" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#f6f9ff] to-transparent dark:from-[#050b16]" />
        <div className="flex shrink-0 animate-[shata-marquee_38s_linear_infinite] gap-10 pl-10">
          {loop.map((label, i) => (
            <div key={`${label}-${i}`} className={`flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-slate-500"}`}>
              <span className="h-1 w-1 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              {label}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes shata-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function HeroCanvas({ isDark }: { isDark: boolean }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [leads, setLeads] = useState(24);

  // Live counter — gives the hero a real "command center" feel
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setLeads((n) => n + (Math.random() > 0.5 ? 1 : 0));
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced]);

  // True 3D scene: rotate entire stage rigidly + push each layer to its own translateZ
  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const stage = el.querySelector<HTMLElement>("[data-stage]");
    if (!stage) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
        // Subtle counter-parallax on individual layers for depth feel
        el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((node) => {
          const d = Number(node.dataset.parallax || "0");
          const z = Number(node.dataset.z || "0");
          node.style.transform = `translate3d(${(-x * d * 0.4).toFixed(2)}px, ${(-y * d * 0.4).toFixed(2)}px, ${z}px)`;
        });
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      stage.style.transform = "rotateX(0deg) rotateY(0deg)";
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((node) => {
        const z = Number(node.dataset.z || "0");
        node.style.transform = `translate3d(0,0,${z}px)`;
      });
    };
    // Initialize z positions so depth is visible even without mouse
    el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((node) => {
      const z = Number(node.dataset.z || "0");
      node.style.transform = `translate3d(0,0,${z}px)`;
    });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="relative" style={{ perspective: "1600px" }}>
      {/* Glow */}
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(99,91,255,0.35),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(6,182,212,0.30),transparent_55%)] blur-2xl" />

      <div
        className={`relative h-[640px] overflow-hidden rounded-[2.25rem] border ${
          isDark ? "border-white/10 bg-[#070d1c]" : "border-slate-200 bg-[#0a1024]"
        } shadow-[0_40px_120px_-30px_rgba(2,6,23,0.6)]`}
      >
        {/* Inner mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(99,91,255,0.30),transparent_38%),radial-gradient(circle_at_85%_30%,rgba(6,182,212,0.22),transparent_42%),radial-gradient(circle_at_60%_90%,rgba(37,99,235,0.20),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* True 3D stage — entire scene rotates as one rigid unit, layers occupy real Z space */}
        <div data-stage className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform" style={{ transformStyle: "preserve-3d" }}>

        {/* Top: domain chip */}
        <div data-parallax="14" data-z="60" className="absolute left-7 top-7 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-xl will-change-transform">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          client.shatasolutions.com
        </div>

        {/* Status chips top right */}
        <div data-parallax="18" data-z="70" className="absolute right-7 top-7 z-30 flex items-center gap-2 will-change-transform">
          {[
            ["SSL", "Active"],
            ["Forms", "Ready"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-xl">
              <span className="text-white/55">{k}</span> <span className="ml-1 text-cyan-300">{v}</span>
            </div>
          ))}
        </div>

        {/* Dashboard command card */}
        <div data-parallax="22" data-z="40" className="absolute left-7 top-24 z-20 w-[330px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] will-change-transform">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#635bff] to-cyan-400" />
              <div className="text-sm font-semibold text-white">Site Editor</div>
            </div>
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Live</div>
          </div>
          <div className="space-y-2 p-4">
            {[
              ["Header", "Live"],
              ["Hero section", "Editing"],
              ["Services", "Ready"],
              ["Contact form", "Connected"],
            ].map(([label, status], idx) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                <span className="font-medium text-white/85">{label}</span>
                <span className={`font-semibold ${idx === 1 ? "text-[#8a84ff]" : "text-white/50"}`}>{status}</span>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 py-2.5 text-center text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,91,255,0.7)]">
              Publish website
            </div>
          </div>
        </div>

        {/* Stats column */}
        <div data-parallax="16" data-z="30" className="absolute bottom-7 left-7 z-20 grid w-[330px] grid-cols-3 gap-2 will-change-transform">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">SSL</div>
            <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-base font-semibold text-transparent">Active</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Leads</div>
            <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-base font-semibold text-transparent">
              <AnimatedNumber value={leads} />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Forms</div>
            <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-base font-semibold text-transparent">Ready</div>
          </div>
        </div>

        {/* Right: site preview panel */}
        <div data-parallax="28" data-z="-10" className="absolute right-7 top-24 z-10 w-[330px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1226] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] will-change-transform">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <div className="ml-2 truncate rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-white/60">client.shatasolutions.com</div>
          </div>
          <div className="relative h-[290px] bg-[linear-gradient(160deg,#0b1226,#0a1632_55%,#082037)] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/80">Premium service</div>
            <div className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-white">Your business, ready online.</div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-2 text-xs font-semibold text-white">
              Book now →
            </div>

            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
              <div className="h-16 rounded-lg border border-white/10 bg-white/[0.04]" />
              <div className="h-16 rounded-lg border border-white/10 bg-gradient-to-br from-[#635bff]/30 to-cyan-400/20" />
              <div className="h-16 rounded-lg border border-white/10 bg-white/[0.04]" />
            </div>
          </div>
        </div>

        {/* Floating mobile preview */}
        <div data-parallax="38" data-z="90" className="absolute bottom-8 right-12 z-30 w-[170px] animate-[shata-float_6s_ease-in-out_infinite] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0b1226] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] will-change-transform">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-white/45">Mobile</div>
            <div className="flex gap-1">
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span className="h-1 w-1 rounded-full bg-white/30" />
            </div>
          </div>
          <div className="space-y-2 p-3">
            <div className="h-12 rounded-lg bg-gradient-to-br from-[#635bff]/40 to-cyan-400/30" />
            <div className="text-xs font-semibold leading-tight text-white">Book a service</div>
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex h-6 items-center justify-center rounded-md bg-white/[0.05] text-[9px] font-semibold text-white/60">{i + 1}</div>
              ))}
            </div>
            <div className="rounded-md bg-gradient-to-r from-[#635bff] to-cyan-400 py-2 text-center text-[10px] font-semibold text-white">BOOK</div>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shata-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BuildOptions                                                        */
/* ------------------------------------------------------------------ */

function BuildOptions({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            isDark={isDark}
            eyebrow="Start your way"
            title="How do you want to build your first site?"
          />
          <p className={`max-w-md text-base leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
            Pick the path that fits your business. Shata handles the technical setup so you focus on the content and the flow.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {buildOptions.map(([title, desc], index) => (
            <Reveal key={title} delay={index * 80}>
              <Tilt intensity={8} className="h-full">
                <div
                  className={`group relative h-full overflow-hidden rounded-[1.75rem] border p-7 backdrop-blur-xl transition duration-500 ${
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200/80 bg-white/80"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div data-tilt-glow aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  <div data-tilt-sheen aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  <div data-depth="40" className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-base font-semibold text-white shadow-[0_12px_30px_-10px_rgba(99,91,255,0.7)] transition-transform duration-300 will-change-transform">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div data-depth="24" className={`relative mt-6 text-lg font-semibold tracking-tight transition-transform duration-300 will-change-transform ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
                  <div data-depth="14" className={`relative mt-2 text-sm leading-6 transition-transform duration-300 will-change-transform ${isDark ? "text-white/55" : "text-slate-600"}`}>{desc}</div>
                  <div data-depth="6" className="relative mt-6 h-px w-full bg-gradient-to-r from-[#635bff]/40 via-cyan-400/30 to-transparent transition-transform duration-300 will-change-transform" />
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* InteractiveShowcase                                                 */
/* ------------------------------------------------------------------ */

function InteractiveShowcase({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeader
            isDark={isDark}
            eyebrow="Template showcase"
            title="See what Shata can launch for you."
          />
          <p className={`max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${isDark ? "text-white/65" : "text-slate-600"}`}>
            From service websites to ecommerce starters, every template becomes a working business system — customized, connected, and ready to publish.
          </p>
        </div>
      </div>

      <Reveal delay={120}>
        <div className="mt-12 w-full overflow-x-auto overflow-y-hidden px-6 pb-4 md:px-10 lg:px-16">
          <div className="group/strip flex min-w-[1180px] gap-3">
            {showcasePanels.map((panel) => (
              <ShowcasePanel key={panel.title} panel={panel} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ShowcasePanel({ panel }: { panel: (typeof showcasePanels)[number] }) {
  return (
    <div className="group/panel relative h-[520px] min-w-[230px] flex-[1] overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d1c] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-all duration-700 hover:flex-[2.4]">
      <div className="absolute inset-0 transition duration-700 group-hover/panel:scale-[1.02]">
        <PanelVisual variant={panel.variant} />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#050b16] via-[#050b16]/80 to-transparent p-6 pt-24 text-white">
        <div className="translate-y-6 transition duration-500 group-hover/panel:translate-y-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">{panel.variant}</div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{panel.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70 opacity-0 transition duration-500 group-hover/panel:opacity-100">{panel.copy}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 opacity-0 transition duration-500 group-hover/panel:opacity-100">
            {panel.cta} →
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelVisual({ variant }: { variant: string }) {
  if (variant === "ai") {
    return (
      <div className="relative h-full overflow-hidden bg-[linear-gradient(160deg,#0a1224,#070d1c)] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(99,91,255,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.25),transparent_45%)]" />
        <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white">AI</div>
            <div className="text-sm font-semibold text-white">Onboarding</div>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-white/80">Create 6 websites based on the Clinic template using <span className="text-cyan-300">client_data.csv</span>.</div>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs font-semibold text-white/70">client_data.csv • 6 rows</div>
          <div className="mt-4 text-xs font-semibold text-[#8a84ff]">Generating sites…</div>
        </div>
        <div className="relative mt-6 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl border border-white/10 bg-gradient-to-br from-[#635bff]/20 to-cyan-400/10" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "service") {
    return (
      <div className="relative h-full overflow-hidden bg-[linear-gradient(160deg,#0a1224,#070d1c)] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.30),transparent_50%)]" />
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl shadow-2xl">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            <span>Service</span><span>Booking</span>
          </div>
          <div className="mt-12 text-3xl font-semibold leading-tight tracking-tight text-white">Book a service online.</div>
          <div className="mt-4 space-y-2">
            {["Date", "Time", "Service", "Contact"].map((f) => (
              <div key={f} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">
                <span>{f}</span><span className="text-white/30">→</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 py-2.5 text-center text-xs font-semibold text-white">Request quote</div>
        </div>
      </div>
    );
  }

  if (variant === "commerce") {
    return (
      <div className="relative h-full overflow-hidden bg-[linear-gradient(160deg,#0a1224,#070d1c)] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.25),transparent_50%)]" />
        <div className="relative grid grid-cols-2 gap-2">
          {["$49", "$82", "$120", "$65"].map((price, i) => (
            <div key={price} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
              <div className={`h-20 rounded-lg ${i % 2 === 0 ? "bg-gradient-to-br from-[#635bff]/30 to-cyan-400/20" : "bg-gradient-to-br from-blue-500/30 to-[#635bff]/20"}`} />
              <div className="mt-2 text-xs font-semibold text-white">Product</div>
              <div className="text-[11px] text-white/50">{price}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Checkout ready</div>
              <div className="text-[10px] text-white/50">Products • Categories • Orders</div>
            </div>
            <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-3 py-1.5 text-[10px] font-semibold text-white">Pay</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className="relative h-full overflow-hidden bg-[linear-gradient(160deg,#0a1224,#070d1c)] p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(99,91,255,0.30),transparent_50%)]" />
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-sm font-semibold text-white">Dashboard</span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">Published</span>
          </div>
          <div className="mt-3 grid grid-cols-[100px_1fr] gap-2">
            <div className="space-y-1.5">
              {["Text", "Images", "Services", "Leads"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[10px] font-semibold text-white/75">{item}</div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="h-32 rounded-lg bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400" />
              <div className="mt-3 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 py-2 text-center text-[10px] font-semibold text-white">Save changes</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[linear-gradient(160deg,#0a1224,#070d1c)] p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,91,255,0.30),transparent_50%)]" />
      <div className="relative mx-auto w-[200px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0b1226] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-white/45">Booking</div>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </div>
        <div className="space-y-3 p-3">
          <div className="text-xs font-semibold text-white">Choose a date</div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`flex h-7 items-center justify-center rounded-md text-[10px] font-semibold ${i === 5 ? "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white" : "bg-white/[0.05] text-white/55"}`}>{i + 1}</div>
            ))}
          </div>
          <div className="rounded-md bg-gradient-to-r from-[#635bff] to-cyan-400 py-2 text-center text-[10px] font-semibold text-white">BOOK NOW</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TemplateMarketplace                                                 */
/* ------------------------------------------------------------------ */

function TemplateMarketplace({ isDark }: { isDark: boolean }) {
  return (
    <section id="templates" className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            isDark={isDark}
            eyebrow="Template marketplace"
            title="Start from a template built for your business."
          />
          <p className={`max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${isDark ? "text-white/65" : "text-slate-600"}`}>
            Template-based does not mean generic. Every website is customized with your branding, services, copy, images, pages, and business flow.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {templateCards.map((tpl) => (
            <TemplateCard key={tpl.title} title={tpl.title} tag={tpl.tag} tone={tpl.tone} isDark={isDark} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {templateCategories.map((item) => (
            <span
              key={item}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 ${
                isDark ? "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]" : "border-slate-200 bg-white/80 text-slate-700 hover:bg-white"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateCard({ title, tag, tone, isDark }: { title: string; tag: string; tone: string; isDark: boolean }) {
  const toneMap: Record<string, string> = {
    indigo: "from-[#635bff]/15 via-white to-cyan-100",
    cyan: "from-cyan-100 via-white to-[#e0f2fe]",
    slate: "from-slate-100 via-white to-[#e0f2fe]",
    blue: "from-blue-100 via-white to-cyan-50",
  };
  const accent: Record<string, string> = {
    indigo: "from-[#635bff] to-cyan-400",
    cyan: "from-cyan-400 to-blue-500",
    slate: "from-slate-700 to-[#635bff]",
    blue: "from-blue-500 to-cyan-400",
  };

  return (
    <div
      className={`group overflow-hidden rounded-[1.75rem] border transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-20px_rgba(99,91,255,0.4)] ${
        isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
      }`}
    >
      <div className={`relative h-[300px] bg-gradient-to-br ${toneMap[tone]} p-5 text-slate-900`}>
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 rounded-t-lg">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <div className="ml-2 truncate rounded-md bg-white/70 px-2 py-0.5 text-[10px] font-medium text-slate-500">yourbrand.com</div>
        </div>

        <div className="mt-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span>Your logo</span><span>{tag}</span>
        </div>

        <div className="mt-10 text-3xl font-semibold leading-[1] tracking-[-0.03em] text-slate-900">{title}</div>
        <div className="mt-4 max-w-[14rem] text-xs leading-5 text-slate-600">A premium starting point built around your business flow.</div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${accent[tone]} px-3.5 py-2 text-[11px] font-semibold text-white shadow-lg`}>
            Preview →
          </div>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ManagedDifference                                                   */
/* ------------------------------------------------------------------ */

function ManagedDifference({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d1c] p-8 text-white shadow-[0_40px_120px_-40px_rgba(2,6,23,0.7)] md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,91,255,0.30),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(6,182,212,0.22),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionHeader
                isDark={isDark}
                invert
                eyebrow="Managed platform"
                title="Not a DIY builder. A managed website platform."
                copy="DIY builders hand you tools, settings, and complexity. Shata hands you a finished business-ready website. You edit content. We handle the rest."
              />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">DIY builder</div>
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/55">
                    <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-white/30" />You configure hosting</li>
                    <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-white/30" />You wire DNS and SSL</li>
                    <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-white/30" />You learn the editor</li>
                    <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-white/30" />You debug errors alone</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#635bff]/30 bg-gradient-to-br from-[#635bff]/15 to-cyan-400/10 p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">Shata Platform</div>
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/85">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />We configure everything</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />Domain, SSL, and email ready</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />Simple dashboard for content</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />Ongoing support included</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {managedDifferences.map((item, index) => (
                <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.06]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-5 text-lg font-semibold tracking-tight text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
            You run your business. We run the platform.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DashboardSection                                                    */
/* ------------------------------------------------------------------ */

function DashboardSection({ isDark }: { isDark: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll-driven 3D tilt on the dashboard mockup
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const ratio = (center - vh / 2) / vh; // -1 .. 1
      const clamped = Math.max(-0.6, Math.min(0.6, ratio));
      el.style.transform = `perspective(1600px) rotateX(${(clamped * -10).toFixed(2)}deg) translateZ(0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          eyebrow="Client dashboard"
          title="Edit your website without calling a developer."
          copy="A focused control panel — not a complicated CMS. Update content, products, services, and leads in seconds."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Realistic dashboard mockup */}
          <div ref={ref} className="origin-bottom overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070d1c] p-2 shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] will-change-transform">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#0a1224]">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/60">app.shatasolutions.com</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300">Published</div>
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
                </div>
              </div>

              <div className="grid grid-cols-[180px_1fr]">
                {/* Sidebar */}
                <div className="border-r border-white/5 p-4">
                  <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Workspace</div>
                  {dashboardItems.slice(0, 6).map((item, idx) => (
                    <div
                      key={item}
                      className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                        idx === 1 ? "border border-white/10 bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10 text-white" : "text-white/60 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${idx === 1 ? "bg-gradient-to-br from-[#635bff] to-cyan-400" : "bg-white/20"}`} />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main panel */}
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ["Visits", "12,430", "+18%"],
                      ["Leads", "284", "+24%"],
                      ["Forms", "98%", "Healthy"],
                    ].map(([k, v, d]) => (
                      <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{k}</div>
                        <div className="mt-1 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-xl font-semibold text-transparent">{v}</div>
                        <div className="mt-0.5 text-[10px] text-cyan-300">{d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-white">Hero section preview</div>
                      <div className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/60">Editing</div>
                    </div>
                    <div className="mt-3 h-32 rounded-lg bg-[linear-gradient(135deg,#635bff_0%,#2563eb_50%,#06b6d4_100%)]" />
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-white/10" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-[10px] text-white/40">Last saved 2 minutes ago</div>
                    <div className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,91,255,0.7)]">
                      Save changes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side action cards */}
          <div className="grid gap-3">
            {dashboardItems.slice(5).map((item, idx) => (
              <div
                key={item}
                className={`group flex items-center justify-between rounded-2xl border p-5 transition hover:-translate-y-0.5 ${
                  isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white">{String(idx + 1).padStart(2, "0")}</div>
                  <div className={`text-base font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{item}</div>
                </div>
                <span className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* AddressSection                                                      */
/* ------------------------------------------------------------------ */

function AddressSection({ isDark }: { isDark: boolean }) {
  return (
    <section id="website-address" className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          align="center"
          eyebrow="Choose your website address"
          title="Choose how your website goes live."
          copy="Start on a managed Shata subdomain, connect your domain, or let us register a new one."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {addressOptions.map((option) => (
            <Surface key={option.title} isDark={isDark} className="p-7">
              <div className={`text-xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{option.title}</div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10 px-4 py-2 text-sm font-semibold text-[#8a84ff] backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
                {option.example}
              </div>
              <p className={`mt-5 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{option.description}</p>
            </Surface>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services/domain-registration"
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
              isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white text-slate-900 hover:shadow-lg"
            }`}
          >
            Need domain help? View Domain Registration →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FeatureBento                                                        */
/* ------------------------------------------------------------------ */

function FeatureBento({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          eyebrow="What you get"
          title="Everything your website needs to run like a business system."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {websitePlatformFeatures.map((feature, index) => (
            <Reveal key={feature.slug} delay={(index % 3) * 80}>
              <Tilt intensity={9} className="h-full">
                <Link
                  href={`/services/website-platform/features/${feature.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border p-7 transition duration-500 ${
                    isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 hover:bg-white"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div data-tilt-glow aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  <div data-tilt-sheen aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  <div className="relative">
                    <div data-depth="36" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff] transition-transform duration-300 will-change-transform">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#635bff] to-cyan-400 text-[10px] font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]">{feature.number}</span>
                      <span>Feature {feature.number}</span>
                    </div>
                    <div data-depth="22" className={`mt-5 text-xl font-semibold tracking-tight transition-transform duration-300 will-change-transform ${isDark ? "text-white" : "text-slate-950"}`}>{feature.title}</div>
                    <p data-depth="12" className={`mt-3 text-sm leading-6 transition-transform duration-300 will-change-transform ${isDark ? "text-white/60" : "text-slate-600"}`}>{feature.description}</p>
                    <div data-depth="18" className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold transition-transform duration-300 will-change-transform ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>
                      Open feature →
                    </div>
                    <div data-depth="6" className="mt-6 h-px w-full bg-gradient-to-r from-[#635bff]/30 via-cyan-400/20 to-transparent transition-transform duration-300 will-change-transform" />
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EcosystemSection                                                    */
/* ------------------------------------------------------------------ */

function EcosystemSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeader
            isDark={isDark}
            eyebrow="Connected ecosystem"
            title="Your website, domain, and email work together."
            copy="A simple platform that connects the essentials: website, domain, hosting, SSL, forms, and business email."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services/domain-registration"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5"
            >
              Explore Domain Registration →
            </Link>
            <Link
              href="/services/business-email"
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white text-slate-900 hover:shadow-lg"
              }`}
            >
              Explore Business Email →
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ecoLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#635bff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="url(#ecoLine)" strokeWidth="1" strokeDasharray="3,4" />
            <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="url(#ecoLine)" strokeWidth="1" strokeDasharray="3,4" />
            <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="url(#ecoLine)" strokeWidth="1" strokeDasharray="3,4" />
            <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="url(#ecoLine)" strokeWidth="1" strokeDasharray="3,4" />
          </svg>

          <div className="relative grid gap-4 md:grid-cols-2">
            {ecosystemCards.map((item, idx) => (
              <div
                key={item}
                className={`relative rounded-[1.75rem] border p-7 transition hover:-translate-y-1 ${
                  isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-slate-200 bg-white/90 hover:bg-white"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white">{String(idx + 1).padStart(2, "0")}</div>
                <div className={`mt-5 text-xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{item}</div>
                <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>Connected setup managed by Shata so your business launches cleanly.</p>
                {/* connection nodes */}
                <span className="absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400 md:block" />
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ConnectedServices (NEW)                                             */
/* ------------------------------------------------------------------ */

function ConnectedServices({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <SectionHeader
            isDark={isDark}
            eyebrow="Connected Website Services"
            title="Build the full online business stack around your website."
            copy="Your website can connect with the services your business needs next — domain, email, automation, ecommerce, apps, marketing, branding, and SaaS systems."
          />

          {/* Website Stack visual */}
          <div className={`relative overflow-hidden rounded-[1.75rem] border p-6 ${
            isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"
          }`}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">Website stack</div>
            <div className="mt-4 flex items-center justify-between gap-1">
              {["Website", "Domain", "Email", "CRM", "Automation"].map((node, idx, arr) => (
                <div key={node} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-[10px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,91,255,0.7)]`}>
                      {idx + 1}
                    </div>
                    <div className={`mt-2 text-[10px] font-semibold ${isDark ? "text-white/75" : "text-slate-700"}`}>{node}</div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="mx-1 flex flex-1 items-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#635bff]/40 to-cyan-400/40" />
                      <span className={`mx-1 text-[10px] ${isDark ? "text-white/30" : "text-slate-400"}`}>→</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#635bff]/40 to-cyan-400/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={`mt-5 text-xs leading-6 ${isDark ? "text-white/55" : "text-slate-600"}`}>
              Every service connects to the next so your business operates as one stack.
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {connectedServices.map((service, idx) => (
            <Reveal key={service.title} delay={(idx % 5) * 60}>
              <Tilt intensity={10} className="h-full">
                <Link
                  href={service.href}
                  className={`group relative block h-full overflow-hidden rounded-[1.5rem] border p-6 transition duration-500 ${
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div data-tilt-glow aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  <div data-tilt-sheen aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  <div className="relative">
                    <div data-depth="42" className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white shadow-[0_18px_40px_-12px_rgba(99,91,255,0.8)] transition-transform duration-300 will-change-transform">
                      {service.icon}
                    </div>
                    <div data-depth="22" className={`mt-5 text-base font-semibold tracking-tight transition-transform duration-300 will-change-transform ${isDark ? "text-white" : "text-slate-950"}`}>{service.title}</div>
                    <p data-depth="12" className={`mt-2 text-xs leading-5 transition-transform duration-300 will-change-transform ${isDark ? "text-white/60" : "text-slate-600"}`}>{service.copy}</p>
                    <div data-depth="18" className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold transition-transform duration-300 will-change-transform ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>
                      Open service →
                    </div>
                  </div>
                  <div className="relative mt-5 h-px w-full bg-gradient-to-r from-[#635bff]/30 via-cyan-400/20 to-transparent" />
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* IndustrySystems                                                     */
/* ------------------------------------------------------------------ */

function IndustrySystems({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeader
            isDark={isDark}
            eyebrow="Industry systems"
            title="More industry systems ready to launch."
          />
          <p className={`max-w-2xl text-base leading-7 md:text-lg md:leading-8 ${isDark ? "text-white/65" : "text-slate-600"}`}>
            Each industry template is shaped around the way that business actually operates — the forms, services, sections, and flows are already in the right place. {websiteIndustries.length} systems live and counting.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {websiteIndustries.map((item, idx) => (
            <Reveal key={item.slug} delay={(idx % 4) * 60}>
              <Tilt intensity={6} className="h-full">
                <Link
                  href={`/services/website-platform/industries/${item.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border p-6 transition duration-500 ${
                    isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 hover:bg-white"
                  }`}
                >
                  <div data-tilt-glow aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition duration-300" />
                  {/* Mock browser strip — uses real industry domain */}
                  <div className={`relative mb-5 overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-[#070d1c]" : "border-slate-200 bg-[#0a1224]"} p-3`}>
                    <div className="flex items-center gap-1 border-b border-white/10 pb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                      <div className="ml-2 truncate rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-white/55">{item.domain}</div>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      <div className="col-span-2 h-8 rounded-md bg-gradient-to-br from-[#635bff]/30 to-cyan-400/20" />
                      <div className="h-8 rounded-md border border-white/10 bg-white/[0.04]" />
                      <div className="h-3 rounded-md bg-white/10" />
                      <div className="h-3 rounded-md bg-white/10" />
                      <div className="h-3 rounded-md bg-gradient-to-r from-[#635bff]/40 to-cyan-400/30" />
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between gap-2">
                    <div className={`text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{item.title}</div>
                    <span className="shrink-0 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-2 py-0.5 text-[10px] font-semibold text-[#8a84ff]">{item.tag}</span>
                  </div>
                  <p className={`relative mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{item.description}</p>
                  <div className={`relative mt-4 inline-flex items-center gap-1 text-xs font-semibold ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>
                    View template →
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HowItWorks                                                          */
/* ------------------------------------------------------------------ */

function HowItWorks({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          eyebrow="How it works"
          title="From idea to live website in a simple flow."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {steps.map(([num, title], idx) => (
            <div
              key={num}
              className={`group relative overflow-hidden rounded-[1.5rem] border p-5 transition hover:-translate-y-1 ${
                isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 hover:bg-white"
              }`}
            >
              <div className="bg-gradient-to-r from-[#635bff] to-cyan-400 bg-clip-text text-xs font-semibold text-transparent">{num}</div>
              <div className={`mt-5 text-base font-semibold leading-tight ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
              {idx < steps.length - 1 && (
                <div className="absolute right-3 top-3 hidden h-px w-6 bg-gradient-to-r from-[#635bff]/40 to-cyan-400/40 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PlansSection                                                        */
/* ------------------------------------------------------------------ */

function PlansSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          eyebrow="Plans"
          title="Choose the platform level that fits your business."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <Reveal key={plan.name} delay={idx * 100}>
            <div
              className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 transition hover:-translate-y-1 ${
                plan.featured
                  ? "border-transparent bg-[linear-gradient(160deg,#635bff_0%,#2563eb_45%,#06b6d4_100%)] text-white shadow-[0_40px_120px_-30px_rgba(99,91,255,0.7)]"
                  : isDark
                  ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  : "border-slate-200 bg-white/80 hover:bg-white"
              }`}
            >
              {plan.featured && (
                <>
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-[1.75rem] bg-[conic-gradient(from_0deg,#635bff,#06b6d4,#2563eb,#635bff)] opacity-80 blur-[2px] animate-[shata-rotate_8s_linear_infinite]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.20),transparent_50%)]" />
                  <div className="absolute -top-3 left-7 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#635bff]">
                    Recommended
                  </div>
                </>
              )}
              <div className="relative">
                <div className={`text-xl font-semibold tracking-tight ${plan.featured ? "text-white" : isDark ? "text-white" : "text-slate-950"}`}>{plan.name}</div>
                <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/85" : isDark ? "text-white/60" : "text-slate-600"}`}>{plan.desc}</p>
                <div className="mt-7 flex-1 space-y-2">
                  {plan.items.map((item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium ${
                        plan.featured ? "bg-white/15 text-white" : isDark ? "bg-white/[0.04] text-white/80" : "bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 flex-none items-center justify-center rounded-full text-[10px] font-semibold ${
                          plan.featured ? "bg-white text-[#635bff]" : "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white"
                        }`}
                      >
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact?type=website-platform"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    plan.featured
                      ? "bg-white text-[#635bff] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)]"
                      : isDark
                      ? "bg-white text-slate-900"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  {plan.cta} →
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        <p className={`mt-6 text-center text-xs ${isDark ? "text-white/45" : "text-slate-500"}`}>
          Pricing shared after a short discovery call so we recommend the right plan for your business.
        </p>
      </div>

      <style jsx>{`
        @keyframes shata-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* AddonsSection                                                       */
/* ------------------------------------------------------------------ */

function AddonsSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          eyebrow="Add-ons & expansion"
          title="Start simple. Expand when your business grows."
          copy="Layer extra services, pages, automations, and bilingual content on top of your plan whenever you are ready."
        />

        <div className="mt-10 flex flex-wrap gap-2.5">
          {addons.map((item) => (
            <span
              key={item}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/10 bg-white/[0.04] text-white/75 hover:border-[#635bff]/40 hover:bg-white/[0.08] hover:text-white"
                  : "border-slate-200 bg-white/80 text-slate-700 hover:border-[#635bff]/40 hover:bg-white hover:text-slate-900"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400 opacity-60 transition group-hover:opacity-100" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQSection                                                          */
/* ------------------------------------------------------------------ */

function FAQSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          isDark={isDark}
          eyebrow="FAQ"
          title="Clear answers before you launch."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <details
              key={question}
              className={`group rounded-[1.5rem] border p-6 transition open:shadow-[0_20px_60px_-20px_rgba(99,91,255,0.3)] ${
                isDark
                  ? "border-white/10 bg-white/[0.03] open:bg-white/[0.06]"
                  : "border-slate-200 bg-white/80 open:bg-white"
              }`}
            >
              <summary className={`flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                <span>{question}</span>
                <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white transition group-open:rotate-45">+</span>
              </summary>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/65" : "text-slate-600"}`}>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FinalCTA                                                            */
/* ------------------------------------------------------------------ */

function FinalCTA({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#070d1c] p-10 text-center text-white shadow-[0_40px_120px_-30px_rgba(2,6,23,0.7)] md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(99,91,255,0.40),transparent_50%),radial-gradient(circle_at_82%_70%,rgba(6,182,212,0.32),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
            Ready to launch
          </span>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-6xl">
            Start your website on <span className="bg-gradient-to-r from-[#a3a0ff] to-cyan-300 bg-clip-text text-transparent">Shata Platform.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Launch with a template, domain, hosting, SSL, dashboard, and support — all managed in one place.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact?type=website-platform"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-12px_rgba(99,91,255,0.8)] transition hover:-translate-y-0.5"
            >
              Start your website →
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.10]"
            >
              View templates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OrbitalScene — true CSS 3D rotating cube + orbital connection nodes */
/* ------------------------------------------------------------------ */

function OrbitalScene({ isDark }: { isDark: boolean }) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Drag-to-rotate
  useEffect(() => {
    if (reduced) return;
    const el = sceneRef.current;
    if (!el) return;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let baseX = -18;
    let baseY = 28;
    let raf = 0;

    const apply = (rx: number, ry: number) => {
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    apply(baseX, baseY);

    // Auto-rotate when not dragging
    let auto = 0;
    const tick = () => {
      if (!dragging) {
        auto += 0.18;
        apply(baseX, baseY + auto);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = (e.clientX - startX) * 0.4;
      const dy = (e.clientY - startY) * 0.4;
      apply(baseX - dy, baseY + auto + dx);
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = (e.clientX - startX) * 0.4;
      const dy = (e.clientY - startY) * 0.4;
      baseX -= dy;
      baseY += dx;
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointerleave", up);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointerleave", up);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // 6 nodes orbiting on a tilted ring
  const nodes = [
    { label: "Domain", angle: 0 },
    { label: "Hosting", angle: 60 },
    { label: "Email", angle: 120 },
    { label: "Forms", angle: 180 },
    { label: "Analytics", angle: 240 },
    { label: "CRM", angle: 300 },
  ];
  const orbitRadius = 220;

  return (
    <section className="relative px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeader
              isDark={isDark}
              eyebrow="Platform core"
              title="Your business runs on one connected platform."
              copy="Domain, hosting, email, forms, analytics, and CRM — every service orbits the same core. Drag the scene to look around."
            />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              {[
                ["6", "Connected services"],
                ["1", "Source of truth"],
                ["0", "Plugins to manage"],
                ["100%", "Managed for you"],
              ].map(([k, v]) => (
                <div
                  key={v}
                  className={`rounded-2xl border p-4 ${
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"
                  }`}
                >
                  <div className="bg-gradient-to-r from-[#635bff] to-cyan-400 bg-clip-text text-2xl font-semibold text-transparent">{k}</div>
                  <div className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${isDark ? "text-white/55" : "text-slate-500"}`}>{v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto h-[520px] w-full max-w-[560px]" style={{ perspective: "1400px" }}>
              {/* Glow halo */}
              <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,91,255,0.35),transparent_60%)] blur-2xl motion-safe:animate-[shata-pulse_4s_ease-in-out_infinite]" />

              {/* The 3D scene root — drag to rotate, auto-spins otherwise */}
              <div
                ref={sceneRef}
                className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing motion-reduce:!transform-none"
                style={{ transformStyle: "preserve-3d", transition: "transform 60ms linear" }}
              >
                {/* Center cube — 6 faces */}
                <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: "preserve-3d" }}>
                  {[
                    { t: "translateZ(70px)", g: "from-[#635bff] to-cyan-400", label: "SHATA" },
                    { t: "translateZ(-70px) rotateY(180deg)", g: "from-cyan-400 to-[#635bff]", label: "PLATFORM" },
                    { t: "translateX(70px) rotateY(90deg)", g: "from-[#2563eb] to-cyan-400", label: "01" },
                    { t: "translateX(-70px) rotateY(-90deg)", g: "from-cyan-400 to-[#2563eb]", label: "02" },
                    { t: "translateY(70px) rotateX(-90deg)", g: "from-[#635bff] to-[#2563eb]", label: "03" },
                    { t: "translateY(-70px) rotateX(90deg)", g: "from-[#2563eb] to-[#635bff]", label: "04" },
                  ].map((face, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 rounded-2xl border border-white/15 bg-gradient-to-br ${face.g} shadow-[0_30px_80px_-30px_rgba(99,91,255,0.8)]`}
                      style={{ transform: face.t }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold tracking-[0.18em] text-white/95">{face.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Orbital ring */}
                <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#635bff]/25" style={{ transform: "rotateX(72deg)" }} />
                <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" style={{ transform: "rotateX(72deg) rotateZ(45deg)" }} />

                {/* Orbital nodes */}
                {nodes.map((n) => {
                  const rad = (n.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * orbitRadius;
                  const z = Math.sin(rad) * orbitRadius;
                  return (
                    <div
                      key={n.label}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ transform: "translate(-50%,-50%) rotateX(-72deg)" }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-[#0b1226] shadow-[0_18px_40px_-12px_rgba(99,91,255,0.7)]">
                            <span className="bg-gradient-to-br from-[#a3a0ff] to-cyan-300 bg-clip-text text-[10px] font-semibold uppercase tracking-[0.18em] text-transparent">{n.label.slice(0, 3)}</span>
                          </div>
                          <div className={`mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/70" : "text-slate-700"}`}>{n.label}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hint label */}
              <div className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/[0.04] text-white/55" : "border-slate-200 bg-white/80 text-slate-500"
              }`}>
                Drag to rotate
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @keyframes shata-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.95); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
