"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const services = [
  { title: "Website Platform", href: "/services/website-platform", desc: "Templates, domain, hosting, SSL, and dashboard." },
  { title: "Website Development", href: "/services/website-development", desc: "Custom modern websites built for growth." },
  { title: "Business Setup", href: "/services/business-setup", desc: "Launch-ready business operating foundation." },
  { title: "Business Email", href: "/services/business-email", desc: "Professional domain email and deliverability." },
  { title: "Domain Registration", href: "/services/domain-registration", desc: "Secure and manage your business domain." },
  { title: "Branding", href: "/services/branding", desc: "Premium brand systems and campaign identity." },
];

export default function ServicesPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#070b12] text-white" : "bg-[#f7fbff] text-slate-950"}`}>
      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative mx-auto min-h-screen max-w-7xl px-6 py-40">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300" : "text-xs font-semibold uppercase tracking-[0.28em] text-[#635bff]"}>Services</div>
        <h1 className={`mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl ${isDark ? "text-white" : "text-slate-950"}`}>
          Business services built as systems.
        </h1>
        <p className={`mt-6 max-w-2xl text-base leading-8 ${isDark ? "text-white/60" : "text-slate-600"}`}>
          Choose the service your business needs and launch with a cleaner, more connected operating foundation.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className={`rounded-[2rem] border p-6 transition hover:-translate-y-2 ${isDark ? "border-white/10 bg-white/[0.045] hover:bg-white/[0.07]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"}`}>
              <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{service.title}</h2>
              <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{service.desc}</p>
              <div className={isDark ? "mt-6 text-sm font-semibold text-cyan-300" : "mt-6 text-sm font-semibold text-[#635bff]"}>Open service →</div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}