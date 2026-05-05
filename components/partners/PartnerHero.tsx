"use client";

interface Props {
  isDark: boolean;
  scrollToApply: () => void;
  scrollToCalculator: () => void;
}

export default function PartnerHero({
  isDark,
  scrollToApply,
  scrollToCalculator,
}: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/40"
              : "bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30"
          }`}
        />
        <div className="absolute top-20 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div
          className="absolute top-40 -right-20 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 text-center">
        {/* Announcement pill */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-white/5 text-white/80"
              : "border-slate-200 bg-white/70 text-slate-700"
          }`}
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>Shata Partner Program</span>
          <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
          <span className={isDark ? "text-blue-400" : "text-blue-600"}>
            Accepting applications
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`mt-8 text-5xl sm:text-7xl lg:text-[5.5rem] font-semibold leading-[1.02] tracking-[-0.02em] max-w-5xl mx-auto ${
            isDark ? "text-white" : "text-slate-950"
          }`}
        >
          Turn your audience into{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              recurring income.
            </span>
          </span>
        </h1>

        <p
          className={`mt-8 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed ${
            isDark ? "text-white/70" : "text-slate-600"
          }`}
        >
          Earn up to{" "}
          <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            35% lifetime recurring commission
          </span>{" "}
          for every founder you refer to Shata. No caps. No expiration. Paid monthly via Stripe or Wise.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={scrollToApply}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-white font-semibold shadow-[0_10px_40px_rgba(99,102,241,0.45)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <span className="relative z-10">Apply to become a partner →</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={scrollToCalculator}
            className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
              isDark
                ? "border-white/15 text-white hover:bg-white/10"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Calculate my earnings
          </button>
        </div>

        {/* Earning chips row */}
        <div className="mt-14 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <EarningsChip
            isDark={isDark}
            label="Top partner earning"
            value="$23,847"
            suffix="/mo"
          />
          <EarningsChip
            isDark={isDark}
            label="Paid out in 2025"
            value="$4.2M+"
          />
          <EarningsChip
            isDark={isDark}
            label="Active partners"
            value="1,200+"
          />
          <EarningsChip
            isDark={isDark}
            label="Avg commission"
            value="$247"
            suffix="/referral/mo"
          />
        </div>

        {/* Trust signal */}
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm ${
          isDark ? "text-white/60" : "text-slate-500"
        }`}>
          <span>💳 Paid via Stripe, Wise, or PayPal</span>
          <span className={`h-1 w-1 rounded-full ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
          <span>📅 30-day cookie tracking</span>
          <span className={`h-1 w-1 rounded-full ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
          <span>♾️ Lifetime commissions</span>
        </div>
      </div>
    </section>
  );
}

function EarningsChip({
  isDark,
  label,
  value,
  suffix,
}: {
  isDark: boolean;
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div
      className={`rounded-2xl border px-5 sm:px-6 py-4 backdrop-blur-xl transition-all hover:scale-105 ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-slate-200 bg-white/80 hover:shadow-xl"
      }`}
    >
      <div
        className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
          isDark ? "text-white/50" : "text-slate-500"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-1 text-2xl font-semibold tabular-nums ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
        {suffix && (
          <span
            className={`text-sm font-normal ml-0.5 ${
              isDark ? "text-white/50" : "text-slate-500"
            }`}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
