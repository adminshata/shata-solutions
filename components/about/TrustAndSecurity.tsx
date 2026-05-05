"use client";

interface Props {
  isDark: boolean;
}

const BADGES = [
  {
    icon: "🛡️",
    label: "SOC 2 Type II",
    desc: "Independently audited. Annual security and availability controls verified.",
  },
  {
    icon: "🔒",
    label: "256-bit encryption",
    desc: "Every document and record is encrypted at rest and in transit (TLS 1.3).",
  },
  {
    icon: "🌐",
    label: "GDPR & CCPA compliant",
    desc: "Your data, your rights — full export, edit, and deletion available anytime.",
  },
  {
    icon: "⚖️",
    label: "Licensed registered agent",
    desc: "Active registered agents in Delaware and Wyoming with public state filings.",
  },
];

const PARTNERS = [
  "Stripe",
  "Wise",
  "Delaware",
  "Wyoming",
  "Google",
  "Meta",
  "Shopify",
  "OpenAI",
  "AWS",
  "Supabase",
];

export default function TrustAndSecurity({ isDark }: Props) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Trust & Security
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Enterprise-grade trust, founder-friendly pricing
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            We hold ourselves to the same standards as the banks, payment networks, and state agencies we integrate with.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {BADGES.map((b, i) => (
            <div
              key={b.label}
              className={`relative rounded-2xl border p-6 text-center transition-all hover:-translate-y-1 ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-slate-200 bg-white hover:shadow-lg"
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
              }}
            >
              <div className="text-5xl mb-3">{b.icon}</div>
              <div
                className={`font-semibold text-lg ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {b.label}
              </div>
              <div
                className={`mt-2 text-sm leading-relaxed ${
                  isDark ? "text-white/60" : "text-slate-500"
                }`}
              >
                {b.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Partners strip */}
        <div
          className={`rounded-3xl border p-8 sm:p-10 ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div
            className={`text-center text-xs font-semibold uppercase tracking-[0.25em] mb-8 ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            Trusted partners & integrations
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 sm:gap-x-12">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className={`text-lg sm:text-xl font-semibold opacity-50 hover:opacity-100 transition-opacity ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Reassurance bar */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
          {[
            { icon: "🔐", label: "Data residency in U.S. & EU regions" },
            { icon: "🔁", label: "99.98% uptime over last 12 months" },
            { icon: "📜", label: "Independent security audits every year" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
