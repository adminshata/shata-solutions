"use client";

import { WHATSAPP_NUMBER } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

interface Props {
  isDark: boolean;
}

export default function SiteFooter({ isDark }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer
      className={`${
        isDark
          ? "bg-slate-950 text-white/70 border-t border-white/10"
          : "bg-slate-50 text-slate-700 border-t border-slate-200"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-5 items-start pt-6 lg:divide-x lg:divide-slate-200 dark:lg:divide-white/10">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <div className="flex items-center gap-2">
              <Image
                src="/logo icon.svg"
                alt="Shata Solutions Logo"
                width={128}
                height={128}
                className="h-32 w-32 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
              />
              <div className="flex flex-col justify-center">
                <div
                  className={`font-bold text-2xl leading-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Shata Solutions
                </div>
                <p className={`text-sm mt-1 font-medium ${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Work smarter. Grow faster.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold max-w-xs leading-relaxed">
              We help international founders launch and operate U.S. businesses — from LLC formation to payments and AI automation.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition hover:scale-105 hover:shadow-lg shadow-lg before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-black/5 before:blur-md before:-z-10 ${
                  isDark
                    ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    : "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md hover:shadow-[0_10px_25px_rgba(34,197,94,0.4)]"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.94 14.47L2 22l5.7-1.5A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.12l-.29-.17-3.38.89.9-3.3-.19-.3A8 8 0 1 1 12 20Zm4.43-5.57c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94c-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.2-1.4-1.34-1.64-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.52.58.18 1.1.15 1.52.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
                </svg>
                WhatsApp
              </a>

              <a
                href="mailto:info@shatasolutions.com"
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition hover:scale-105 hover:shadow-lg shadow-lg before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-black/5 before:blur-md before:-z-10 ${
                  isDark
                    ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                    : "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md hover:shadow-[0_10px_25px_rgba(59,130,246,0.4)]"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Email
              </a>
            </div>
            <div className="mt-4 text-sm font-bold">
              <p>Email: <a href="mailto:info@shatasolutions.com" className="hover:text-blue-500">info@shatasolutions.com</a></p>
              <p>Phone: <a href="tel:+16197761222" className="hover:text-blue-500">+1 (619) 776-1222</a></p>
              <p>Address: 3845 University Ave, San Diego, California</p>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col items-start mt-28 lg:mt-32 lg:pl-6">
            <h4
              className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Product
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><a href="#services" className="hover:text-blue-500 transition hover:translate-x-1">Services</a></li>
              <li><a href="#pricing" className="hover:text-blue-500 transition hover:translate-x-1">Pricing</a></li>
              <li><a href="#flow" className="hover:text-blue-500 transition hover:translate-x-1">How it works</a></li>
              <li><a href="#testimonials" className="hover:text-blue-500 transition hover:translate-x-1">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-blue-500 transition hover:translate-x-1">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start mt-28 lg:mt-32 lg:pl-6">
            <h4
              className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Legal
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><a href="/privacy" className="hover:text-blue-500 transition hover:translate-x-1">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-500 transition hover:translate-x-1">Terms of Service</a></li>
              <li><Link href="/refund" className="hover:text-blue-500 transition hover:translate-x-1">Refund Policy</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-500 transition hover:translate-x-1">Compliance</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-start mt-28 lg:mt-32 lg:pl-6">
            <h4
              className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Company
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><a href="#contact" className="hover:text-blue-500 transition hover:translate-x-1">Contact</a></li>
              <li><a href="mailto:support@shatasolutions.com" className="hover:text-blue-500 transition hover:translate-x-1 text-xs font-normal">support@</a></li>
              <li><a href="mailto:sales@shatasolutions.com" className="hover:text-blue-500 transition hover:translate-x-1 text-xs font-normal">sales@</a></li>
              <li><a href="mailto:billing@shatasolutions.com" className="hover:text-blue-500 transition hover:translate-x-1 text-xs font-normal">billing@</a></li>
              <li>
                <span className="text-xs font-normal">Wyoming HQ</span>
              </li>
              <li>
                <span className="text-xs font-normal">San Diego Office</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal company summary */}
        <div
          className={`mt-14 rounded-2xl border px-6 py-5 text-xs leading-relaxed ${
            isDark
              ? "border-white/10 bg-white/[0.03] text-white/40"
              : "border-slate-200 bg-slate-100/60 text-slate-500"
          }`}
        >
          <p className="mb-2">
            <span className={`font-semibold ${isDark ? "text-white/70" : "text-slate-700"}`}>
              Shata Global LLC
            </span>{" "}
            (operating as <span className={`font-semibold ${isDark ? "text-white/70" : "text-slate-700"}`}>Shata Solutions</span>) is a
            U.S.-registered Limited Liability Company incorporated in the State of Wyoming. We provide digital services
            including website development, AI automation, branding, SaaS solutions, website templates, and business
            formation support. Business Email:{" "}
            <a href="mailto:info@shatasolutions.com" className="hover:text-blue-500 transition-colors">
              info@shatasolutions.com
            </a>{" "}
            · Mailing Address: 3845 University Ave, San Diego, CA 92105 · EIN available upon request.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Refund Policy", href: "/refund" },
              { label: "Compliance", href: "/compliance" },
              { label: "Contact / Support", href: "mailto:support@shatasolutions.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`hover:text-blue-500 transition-colors ${
                  isDark ? "text-white/40" : "text-slate-400"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-6 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isDark ? "border-white/10 text-white/50" : "border-slate-200 text-slate-500"
          }`}
        >
          <p>
            © {year} Shata Global LLC. All rights reserved. — Wyoming & San Diego, USA
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
