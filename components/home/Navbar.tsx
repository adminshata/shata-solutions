"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { PlanId } from "@/lib/types";

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
  openOnboarding: (plan: PlanId) => void;
  openDashboard: () => void;
}

export default function Navbar({
  isDark,
  toggleTheme,
  openOnboarding,
  openDashboard,
}: Props) {
  const [openMegaMenu, setOpenMegaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [menuTimeout, setMenuTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [hasPartnerSession, setHasPartnerSession] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasPartnerSession(!!localStorage.getItem("shata_partner_email"));
    }
  }, []);

  const devServices = [
    { name: "Website Platform", desc: "Templates, domain, hosting & dashboard", href: "/services/website-platform", icon: "🧩" },
    { name: "Website Development", desc: "Modern scalable websites", href: "/services/website-development", icon: "🌐" },
    { name: "Mobile Apps", desc: "iOS & Android apps", href: "/services/mobile-app-development", icon: "📱" },
    { name: "Automation", desc: "AI workflows", href: "/services/automation", icon: "⚙️" },
    { name: "SaaS", desc: "Software platforms", href: "/services/saas", icon: "🧠" },
    { name: "Ecommerce", desc: "Online stores", href: "/services/ecommerce", icon: "🛒" },
    { name: "Marketing Plans", desc: "Growth campaigns", href: "/services/marketing-plans", icon: "📣" },
    { name: "Branding", desc: "Identity, visuals & brand systems", href: "/services/branding", icon: "✨" },
    { name: "Startups", desc: "Startup solutions", href: "/services/startups", icon: "🚀" },
    { name: "All Services", desc: "Browse everything", href: "/services", icon: "📂" },
  ];
  const businessServices = [
    { name: "LLC Formation", desc: "Start your LLC", href: "/services/llc", icon: "📄" },
    { name: "EIN Registration", desc: "Get your tax ID fast", href: "/services/ein-registration", icon: "💼" },
    { name: "Business Setup", desc: "Launch your company", href: "/services/business-setup", icon: "🏢" },
    { name: "Business Email", desc: "Domain email, security & deliverability", href: "/services/business-email", icon: "📧" },
    { name: "Domain Registration", desc: "Secure your business domain", href: "/services/domain-registration", icon: "🔗" },
    { name: "Global Business", desc: "Operate worldwide", href: "/services/global-business", icon: "🌍" },
    { name: "Start Business", desc: "Start your business journey", href: "/start-business", icon: "🚀" },
    { name: "Stripe Setup", desc: "Payments & billing", href: "/stripe", icon: "💳" },
  ];

  const websitePlatformFeatureLinks = [
    { label: "Website Templates", href: "/services/website-platform/features/templates" },
    { label: "Hosting & SSL", href: "/services/website-platform/features/hosting-ssl" },
    { label: "Client Dashboard", href: "/services/website-platform/features/client-dashboard" },
    { label: "Domain Options", href: "/services/website-platform/features/domain-options" },
    { label: "Business Email", href: "/services/website-platform/features/business-email" },
    { label: "Lead Forms", href: "/services/website-platform/features/lead-forms" },
    { label: "Booking / Orders", href: "/services/website-platform/features/booking-orders" },
    { label: "Analytics", href: "/services/website-platform/features/analytics" },
    { label: "Support & Maintenance", href: "/services/website-platform/features/support-maintenance" },
  ];

  const websitePlatformIndustryLinks = [
    { label: "Clinics", href: "/services/website-platform/industries/clinics" },
    { label: "DMV / Auto Services", href: "/services/website-platform/industries/dmv-auto-services" },
    { label: "Law Firms", href: "/services/website-platform/industries/law-firms" },
    { label: "Ecommerce", href: "/services/website-platform/industries/ecommerce" },
    { label: "Repair Centers", href: "/services/website-platform/industries/repair-centers" },
    { label: "Agencies", href: "/services/website-platform/industries/agencies" },
    { label: "Car Showrooms", href: "/services/website-platform/industries/car-showrooms" },
    { label: "Barber Shops", href: "/services/website-platform/industries/barber-shops" },
    { label: "Supermarkets", href: "/services/website-platform/industries/supermarkets" },
    { label: "Restaurants & Cafes", href: "/services/website-platform/industries/restaurants-cafes" },
  ];

  return (
    <header className="sticky top-4 z-50 px-4">
      <div
        className={`relative mx-auto max-w-7xl px-6 h-16 flex items-center justify-between rounded-2xl backdrop-blur-2xl border shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-colors duration-300 ${
          isDark ? "bg-slate-900/60 border-white/10" : "bg-white/30 border-white/30"
        }`}
      >
        <div className="flex items-center z-10">
          <img
            src={isDark ? "/shata-logo-light.svg" : "/shata-logo.svg"}
            alt="Shata Solutions"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/shata-logo.svg";
            }}
            className={`h-20 sm:h-24 md:h-28 w-auto object-contain ${
              isDark ? "drop-shadow-[0_0_14px_rgba(59,130,246,0.7)]" : ""
            }`}
          />
        </div>

        <nav
          className={`hidden md:flex items-center justify-center gap-3 text-sm font-semibold tracking-tight absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl pointer-events-auto z-20 transition-colors duration-300 ${
            isDark ? "text-white/90" : "text-slate-800"
          }`}
        >
          <div
            className="relative flex justify-center"
            onMouseEnter={() => {
              if (menuTimeout) clearTimeout(menuTimeout);
              setOpenMegaMenu(true);
            }}
            onMouseLeave={() => {
              const t = setTimeout(() => setOpenMegaMenu(false), 150);
              setMenuTimeout(t);
            }}
          >
            <button
              type="button"
              onClick={() => setOpenMegaMenu((p) => !p)}
              className={`inline-flex items-center gap-2 rounded-full px-2 py-1.5 transition ${
                isDark ? "hover:bg-white/5 hover:text-blue-300" : "hover:bg-slate-100 hover:text-blue-600"
              }`}
              aria-expanded={openMegaMenu}
            >
              <span>Services</span>
              <span className={`text-[10px] transition-transform duration-300 ${openMegaMenu ? "rotate-180" : ""}`}>▼</span>
            </button>

            {openMegaMenu && (
              <div
                onMouseEnter={() => {
                  if (menuTimeout) clearTimeout(menuTimeout);
                  setOpenMegaMenu(true);
                }}
                onMouseLeave={() => {
                  const t = setTimeout(() => setOpenMegaMenu(false), 150);
                  setMenuTimeout(t);
                }}
                className={`fixed left-1/2 top-[96px] z-[60] w-[calc(100vw-48px)] max-w-[1180px] -translate-x-1/2 overflow-visible rounded-[28px] border shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-3xl animate-[scaleIn_0.16s_ease,fadeIn_0.16s_ease] ${
                  isDark ? "border-white/10 bg-slate-900/95" : "border-slate-200/80 bg-white/95"
                }`}
              >
                <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10" />

                <div className="grid grid-cols-[1fr_1fr_1fr_300px] gap-4 p-5">
                  <div className="col-span-3 grid grid-cols-3 gap-4 pr-5 border-r border-slate-200/60 dark:border-white/10">
                    <div>
                      <p className="text-[10px] uppercase mb-2.5 opacity-60 tracking-[0.18em]">Platform</p>
                      {devServices.slice(0, 4).map((item) => (
                        <div key={item.name} className="relative group/platform">
                          <a
                            href={item.href}
                            className="group flex items-start gap-2.5 p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
                          >
                            <div className="h-6 w-6 flex shrink-0 items-center justify-center text-[12px] rounded-md bg-white/70 dark:bg-white/10">
                              {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-[13px] leading-tight">{item.name}</p>
                                {item.name === "Website Platform" && <span className="text-[10px] opacity-50">›</span>}
                              </div>
                              <p className="mt-0.5 text-[11px] leading-snug opacity-60">{item.desc}</p>
                            </div>
                          </a>

                          {item.name === "Website Platform" && (
                            <div
                              className={`pointer-events-none absolute left-full top-0 z-[80] ml-2 w-[520px] translate-x-2 rounded-2xl border p-3 opacity-0 shadow-[0_25px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-200 group-hover/platform:pointer-events-auto group-hover/platform:translate-x-0 group-hover/platform:opacity-100 ${
                                isDark ? "border-white/10 bg-slate-950/95" : "border-slate-200 bg-white/95"
                              }`}
                            >
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-500">Platform Features</p>
                                  <div className="space-y-1">
                                    {websitePlatformFeatureLinks.map((link) => (
                                      <a
                                        key={link.href}
                                        href={link.href}
                                        className="block rounded-xl px-2 py-1.5 text-[11px] font-semibold transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-white/5 dark:hover:text-blue-300"
                                      >
                                        {link.label}
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-500">Industry Templates</p>
                                  <div className="max-h-[260px] space-y-1 overflow-y-auto pr-1">
                                    {websitePlatformIndustryLinks.map((link) => (
                                      <a
                                        key={link.href}
                                        href={link.href}
                                        className="block rounded-xl px-2 py-1.5 text-[11px] font-semibold transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-white/5 dark:hover:text-blue-300"
                                      >
                                        {link.label}
                                      </a>
                                    ))}
                                  </div>
                                  <a
                                    href="/services/website-platform#industries"
                                    className="mt-2 block rounded-xl bg-blue-600 px-3 py-2 text-center text-[11px] font-bold text-white transition hover:bg-blue-500"
                                  >
                                    View all industries →
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] uppercase mb-2.5 opacity-60 tracking-[0.18em]">Growth</p>
                      {devServices.slice(4).map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-start gap-2.5 p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
                        >
                          <div className="h-6 w-6 flex shrink-0 items-center justify-center text-[12px] rounded-md bg-white/70 dark:bg-white/10">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-[13px] leading-tight">{item.name}</p>
                            <p className="mt-0.5 text-[11px] leading-snug opacity-60">{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] uppercase mb-2.5 opacity-60 tracking-[0.18em]">Business</p>
                      {businessServices.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-start gap-2.5 p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
                        >
                          <div className="h-6 w-6 flex shrink-0 items-center justify-center text-[12px] rounded-md bg-white/70 dark:bg-white/10">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-[13px] leading-tight">{item.name}</p>
                            <p className="mt-0.5 text-[11px] leading-snug opacity-60">{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-1 pl-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
                      <div
                        className={`relative z-10 p-5 rounded-[22px] backdrop-blur-2xl border transition-all duration-300 hover:-translate-y-1 ${
                          isDark
                            ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-white/10"
                            : "bg-gradient-to-br from-white/90 to-slate-100/90 border-slate-200"
                        }`}
                      >
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 ${isDark ? "text-blue-300" : "text-blue-600"}`}>
                          START NOW
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">🚀</span>
                          <h3 className={`text-lg font-semibold leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>
                            Launch your U.S. business
                          </h3>
                        </div>
                        <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-white/75" : "text-slate-600"}`}>
                          Everything you need to start your LLC, get EIN, and grow fast.
                        </p>
                        <button
                          onClick={() => {
                            setOpenMegaMenu(false);
                            openOnboarding("growth");
                          }}
                          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.6)] hover:scale-[1.05] active:scale-[0.95] transition-all"
                        >
                          <span>Get Started</span>
                          <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/" className="px-1.5 py-1 hover:text-blue-500 transition whitespace-nowrap">Home</Link>
          <Link href="/pricing" className="px-1.5 py-1 hover:text-blue-500 transition whitespace-nowrap">Pricing</Link>

          <div
            className="relative"
            onMouseEnter={() => {
              if (menuTimeout) clearTimeout(menuTimeout);
              setCompanyOpen(true);
            }}
            onMouseLeave={() => {
              const t = setTimeout(() => setCompanyOpen(false), 180);
              setMenuTimeout(t);
            }}
          >
            <button className="px-1.5 py-1 hover:text-blue-500 transition whitespace-nowrap flex items-center gap-1">
              Company
              <span className={`text-[10px] transition-transform ${companyOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {companyOpen && (
              <div
                onMouseEnter={() => {
                  if (menuTimeout) clearTimeout(menuTimeout);
                  setCompanyOpen(true);
                }}
                onMouseLeave={() => {
                  const t = setTimeout(() => setCompanyOpen(false), 180);
                  setMenuTimeout(t);
                }}
                className={`absolute left-1/2 top-[64px] z-[60] w-[500px] max-w-[95vw] -translate-x-1/2 overflow-hidden rounded-[28px] border shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-3xl animate-[scaleIn_0.16s_ease,fadeIn_0.16s_ease] ${
                  isDark ? "border-white/10 bg-slate-900/95" : "border-slate-200/80 bg-white/90"
                }`}
              >
                <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10" />
                <div className="p-5 grid grid-cols-2 gap-4">
                  <Link href="/about" className="group flex flex-col p-3 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                    <div className="font-semibold">About</div>
                    <div className="text-xs opacity-60 mt-1">Who we are</div>
                  </Link>

                  <Link href="/faq" className="group flex flex-col p-3 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                    <div className="font-semibold">FAQ</div>
                    <div className="text-xs opacity-60 mt-1">Common questions</div>
                  </Link>

                  <Link href="/blog" className="group flex flex-col p-3 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                    <div className="font-semibold">Blog</div>
                    <div className="text-xs opacity-60 mt-1">Guides & insights</div>
                  </Link>

                  <Link href="/legal" className="group flex flex-col p-3 rounded-xl pointer-events-auto relative z-50 transition-all duration-200 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                    <div className="font-semibold">Legal Center</div>
                    <div className="text-xs opacity-60 mt-1">Privacy & compliance</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {hasPartnerSession ? (
            <Link
              href="/partners/dashboard"
              className="px-1.5 py-1 hover:text-blue-500 transition whitespace-nowrap"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/partners"
              className="px-1.5 py-1 hover:text-blue-500 transition whitespace-nowrap"
            >
              Become a Partner
            </Link>
          )}
          <Link href="/contact" className="px-1.5 py-1 hover:text-blue-500 transition whitespace-nowrap">Contact</Link>
        </nav>

        <div className="flex items-center gap-3 z-10">
          <button
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-white/20 bg-white/30 dark:bg-white/5 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-lg font-semibold tracking-wide">{mobileMenuOpen ? "✕" : "≡"}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`group relative inline-flex h-11 w-[78px] items-center rounded-full border px-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.18)] active:scale-[0.98] ${
              isDark ? "border-white/10 bg-white/10 backdrop-blur-xl" : "border-slate-200 bg-white/80 backdrop-blur-xl"
            }`}
          >
            <span
              className={`absolute inset-y-1.5 left-1.5 w-8 rounded-full transition-all duration-300 shadow-md ${
                isDark ? "translate-x-[34px] bg-gradient-to-br from-slate-700 to-slate-900" : "translate-x-0 bg-gradient-to-br from-yellow-300 to-orange-400"
              }`}
            />
            <span className="relative z-10 flex w-full items-center justify-between px-1 text-sm">
              <span className={`transition-all duration-300 ${isDark ? "text-white/40 scale-90" : "text-slate-700 scale-100"}`}>☀️</span>
              <span className={`transition-all duration-300 ${isDark ? "text-white scale-100" : "text-slate-400 scale-90"}`}>🌙</span>
            </span>
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className={`hidden sm:inline-flex items-center rounded-full border px-4 py-2 text-sm transition ${
              isDark ? "border-white/15 text-white hover:bg-white/10" : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Chat
          </a>
          <button
            onClick={() => openOnboarding("growth")}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="md:hidden mt-3 mx-auto max-w-7xl px-6 relative z-50">
            <div
              className={`rounded-2xl p-5 space-y-4 border backdrop-blur-xl shadow-lg animate-[mobileSpring_0.35s_cubic-bezier(.2,.8,.2,1)] ${
                isDark ? "bg-slate-900/95 border-white/10" : "bg-white/95 border-slate-200"
              }`}
            >
              {[
                { href: "/services/website-platform", label: "Website Platform" },
                { href: "/services/website-development", label: "Website Development" },
                { href: "/services/mobile-app-development", label: "Mobile Apps" },
                { href: "/services/ein-registration", label: "EIN Registration" },
                { href: "/services/business-setup", label: "Business Setup" },
                { href: "/services/business-email", label: "Business Email" },
                { href: "/services/domain-registration", label: "Domain Registration" },
                { href: "/services/marketing-plans", label: "Marketing Plans" },
                { href: "/services/branding", label: "Branding" },
                { href: "/services/global-business", label: "Global Business" },
                { href: "/pricing", label: "Pricing" },
              ].map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block transition-all duration-200 hover:translate-x-1 active:scale-95 animate-[mobileItem_0.35s_ease_forwards] opacity-0 translate-y-2"
                  style={{ animationDelay: `${(i + 1) * 40}ms` }}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/legal"
                onClick={() => setMobileMenuOpen(false)}
                className="block transition hover:translate-x-1 active:scale-95"
              >
                Legal Center
              </Link>
              <button
                className="block text-left w-full transition hover:translate-x-1 active:scale-95 animate-[mobileItem_0.35s_ease_forwards] opacity-0 translate-y-2"
                style={{ animationDelay: "240ms" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDashboard();
                }}
              >
                Dashboard
              </button>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10" />

              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block transition hover:translate-x-1 active:scale-95 animate-[mobileItem_0.35s_ease_forwards] opacity-0 translate-y-2" style={{ animationDelay: "280ms" }}>
                All Services
              </a>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block transition hover:translate-x-1 active:scale-95 animate-[mobileItem_0.35s_ease_forwards] opacity-0 translate-y-2" style={{ animationDelay: "320ms" }}>
                About
              </Link>

              <button
                className="block w-full transition active:scale-95 text-center bg-blue-600 text-white px-4 py-2 rounded-full mt-3 animate-[mobileItem_0.35s_ease_forwards] opacity-0 translate-y-2"
                style={{ animationDelay: "360ms" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openOnboarding("growth");
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
