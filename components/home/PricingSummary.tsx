"use client";

import Link from "next/link";

interface Props {
  isDark: boolean;
}

const HIGHLIGHTS = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
    accentLight: "text-blue-600",
    accentBgLight: "bg-blue-50",
    accentBorderLight: "border-blue-200",
    title: "Website Development",
    from: "from $499",
    desc: "Starter to premium custom websites built for your business.",
    href: "/pricing#website-development",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    accent: "text-green-400",
    accentBg: "bg-green-500/10",
    accentBorder: "border-green-500/20",
    accentLight: "text-green-600",
    accentBgLight: "bg-green-50",
    accentBorderLight: "border-green-200",
    title: "AI & Automation",
    from: "from $299",
    desc: "Intelligent workflows, AI agents, and business automation.",
    href: "/pricing#ai-automation",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/20",
    accentLight: "text-orange-600",
    accentBgLight: "bg-orange-50",
    accentBorderLight: "border-orange-200",
    title: "Business Setup",
    from: "from $299",
    desc: "LLC formation, EIN, banking, and full U.S. business launch.",
    href: "/pricing#business-setup",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    accent: "text-pink-400",
    accentBg: "bg-pink-500/10",
    accentBorder: "border-pink-500/20",
    accentLight: "text-pink-600",
    accentBgLight: "bg-pink-50",
    accentBorderLight: "border-pink-200",
    title: "Branding & Design",
    from: "from $199",
    desc: "Logo, brand kits, and full identity systems for your business.",
    href: "/pricing#branding",
  },
];

export default function PricingSummary({ isDark }: Props) {
  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Transparent starting pricing
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-4xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Know what to expect before you start
          </h2>
          <p className={`mt-4 text-base ${isDark ? "text-white/60" : "text-slate-500"}`}>
            All prices are starting estimates. Final pricing is confirmed in writing before payment — no hidden fees.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <Link
              key={h.title}
              href={h.href}
              className={`group flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
                isDark
                  ? `${h.accentBorder} ${h.accentBg} hover:border-opacity-60`
                  : `${h.accentBorderLight} ${h.accentBgLight} hover:shadow-md`
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isDark ? h.accentBg : h.accentBgLight} ${isDark ? h.accent : h.accentLight}`}>
                {h.icon}
              </div>
              <h3 className={`mt-4 font-semibold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                {h.title}
              </h3>
              <p className={`mt-1 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-500"}`}>
                {h.desc}
              </p>
              <div className={`mt-4 text-lg font-bold ${isDark ? h.accent : h.accentLight}`}>
                {h.from}
              </div>
              <div className={`mt-3 text-xs font-semibold group-hover:underline ${isDark ? h.accent : h.accentLight}`}>
                See full pricing →
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note + links */}
        <div className="mt-10 text-center">
          <p className={`text-xs mb-5 ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Prices may vary. Government fees, domain, hosting, and third-party costs billed separately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pricing"
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105 ${
                isDark
                  ? "border-white/20 text-white hover:bg-white/[0.06]"
                  : "border-slate-300 text-slate-700 hover:bg-white"
              }`}
            >
              View complete pricing guide
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/checkout-demo"
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105 ${
                isDark
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                  : "border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              Try Checkout Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
