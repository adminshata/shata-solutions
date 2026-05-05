"use client";

import { useMemo, useState } from "react";

interface Props {
  isDark: boolean;
  scrollToApply: () => void;
}

const AVG_DEAL_SIZE = 297; // Growth plan monthly price
const COMMISSION_RATE = 0.3; // 30% (Elite tier, realistic target)
const AVG_RETENTION_MONTHS = 18; // SaaS average

export default function CommissionCalculator({ isDark, scrollToApply }: Props) {
  const [leads, setLeads] = useState(50);
  const [conversion, setConversion] = useState(12);

  const { customers, monthly, yearOne, lifetime } = useMemo(() => {
    const cust = Math.round((leads * conversion) / 100);
    const m = cust * AVG_DEAL_SIZE * COMMISSION_RATE;
    // cumulative over the year: each month you add `cust` new customers,
    // so month N has N×cust paying. Sum 1..12 = 78 "customer-months".
    const y1 = 78 * cust * AVG_DEAL_SIZE * COMMISSION_RATE;
    // lifetime = per cohort 18 months × 12 cohorts of `cust` = 216 × base
    const lt = cust * 12 * AVG_RETENTION_MONTHS * AVG_DEAL_SIZE * COMMISSION_RATE;
    return { customers: cust, monthly: m, yearOne: y1, lifetime: lt };
  }, [leads, conversion]);

  const leadsPct = ((leads - 10) / (500 - 10)) * 100;
  const convPct = ((conversion - 3) / (30 - 3)) * 100;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <section
      id="calculator"
      className="relative py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Earnings calculator
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            See what you could be earning
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Move the sliders. The math is real — based on our average deal size of ${AVG_DEAL_SIZE}/mo
            and 30% Elite-tier commission.
          </p>
        </div>

        <div
          className={`relative rounded-3xl overflow-hidden border ${
            isDark
              ? "border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950"
              : "border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20"
          } shadow-[0_30px_80px_-20px_rgba(99,102,241,0.25)]`}
        >
          {/* glow accents */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/20 blur-[100px]" />

          <div className="relative grid lg:grid-cols-5 gap-0">
            {/* LEFT: Controls */}
            <div className="lg:col-span-3 p-8 sm:p-12">
              <div className="space-y-10">
                <SliderRow
                  isDark={isDark}
                  label="Monthly leads you'll send"
                  hint="People who click your link and visit Shata."
                  value={leads}
                  min={10}
                  max={500}
                  step={5}
                  suffix="leads"
                  fillPct={leadsPct}
                  onChange={setLeads}
                />

                <SliderRow
                  isDark={isDark}
                  label="Conversion rate"
                  hint="% of those leads that become paying Shata customers."
                  value={conversion}
                  min={3}
                  max={30}
                  step={1}
                  suffix="%"
                  fillPct={convPct}
                  onChange={setConversion}
                />

                <div
                  className={`rounded-2xl border p-5 ${
                    isDark
                      ? "border-white/10 bg-white/5"
                      : "border-slate-200 bg-white/70"
                  }`}
                >
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    Assumptions
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <AssumptionChip
                      isDark={isDark}
                      label="Avg deal"
                      value={`$${AVG_DEAL_SIZE}/mo`}
                    />
                    <AssumptionChip
                      isDark={isDark}
                      label="Your rate"
                      value={`${COMMISSION_RATE * 100}%`}
                    />
                    <AssumptionChip
                      isDark={isDark}
                      label="Retention"
                      value={`${AVG_RETENTION_MONTHS} mo`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Results */}
            <div
              className={`lg:col-span-2 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l ${
                isDark ? "border-white/10 bg-slate-950/60" : "border-slate-200 bg-white/80"
              } backdrop-blur-xl`}
            >
              <div
                className={`text-xs font-semibold uppercase tracking-[0.25em] ${
                  isDark ? "text-white/60" : "text-slate-500"
                }`}
              >
                Your monthly income
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <div className="text-6xl sm:text-7xl font-semibold tabular-nums bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
                  ${fmt(monthly)}
                </div>
              </div>
              <div
                className={`mt-2 text-sm ${
                  isDark ? "text-white/60" : "text-slate-500"
                }`}
              >
                from {customers} new customer{customers === 1 ? "" : "s"} / month
              </div>

              <div
                className={`my-8 h-px ${
                  isDark ? "bg-white/10" : "bg-slate-200"
                }`}
              />

              <div className="space-y-5">
                <ResultRow
                  isDark={isDark}
                  label="Year 1 projected"
                  value={`$${fmt(yearOne)}`}
                  hint="Cumulative, assuming steady monthly growth"
                />
                <ResultRow
                  isDark={isDark}
                  label="Lifetime value (3yr)"
                  value={`$${fmt(lifetime)}`}
                  hint={`${AVG_RETENTION_MONTHS}-month avg retention × 12 cohorts`}
                  highlight
                />
              </div>

              <button
                onClick={scrollToApply}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-white font-semibold shadow-[0_10px_40px_rgba(99,102,241,0.45)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Start earning this →
              </button>

              <div
                className={`mt-4 text-center text-[11px] ${
                  isDark ? "text-white/40" : "text-slate-400"
                }`}
              >
                Estimates only · your actual commission rate depends on volume
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom slider thumb & track styles (webkit + firefox) */}
      <style jsx>{`
        :global(.shata-slider) {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 9999px;
          outline: none;
          cursor: grab;
          transition: all 0.2s;
        }
        :global(.shata-slider:active) {
          cursor: grabbing;
        }
        :global(.shata-slider::-webkit-slider-thumb) {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid rgb(59, 130, 246);
          cursor: grab;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.5);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        :global(.shata-slider:hover::-webkit-slider-thumb) {
          transform: scale(1.15);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.7);
        }
        :global(.shata-slider:active::-webkit-slider-thumb) {
          transform: scale(1.25);
        }
        :global(.shata-slider::-moz-range-thumb) {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid rgb(59, 130, 246);
          cursor: grab;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.5);
          transition: transform 0.15s ease;
        }
        :global(.shata-slider:hover::-moz-range-thumb) {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}

function SliderRow({
  isDark,
  label,
  hint,
  value,
  min,
  max,
  step,
  suffix,
  fillPct,
  onChange,
}: {
  isDark: boolean;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  fillPct: number;
  onChange: (v: number) => void;
}) {
  const trackBg = isDark
    ? `linear-gradient(to right, rgb(59,130,246) 0%, rgb(168,85,247) ${fillPct}%, rgba(255,255,255,0.08) ${fillPct}%, rgba(255,255,255,0.08) 100%)`
    : `linear-gradient(to right, rgb(59,130,246) 0%, rgb(168,85,247) ${fillPct}%, rgb(226,232,240) ${fillPct}%, rgb(226,232,240) 100%)`;

  return (
    <div>
      <div className="flex items-end justify-between mb-3">
        <div>
          <label
            className={`block text-sm font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {label}
          </label>
          <p
            className={`mt-1 text-xs ${
              isDark ? "text-white/50" : "text-slate-500"
            }`}
          >
            {hint}
          </p>
        </div>
        <div
          className={`rounded-xl border px-4 py-2 min-w-[100px] text-center ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`text-2xl font-semibold tabular-nums ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {value}
            <span
              className={`text-sm font-normal ml-1 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              {suffix}
            </span>
          </div>
        </div>
      </div>

      <input
        type="range"
        className="shata-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: trackBg }}
      />

      <div
        className={`mt-2 flex justify-between text-[11px] ${
          isDark ? "text-white/40" : "text-slate-400"
        }`}
      >
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

function AssumptionChip({
  isDark,
  label,
  value,
}: {
  isDark: boolean;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div
        className={`text-[10px] font-semibold uppercase tracking-wider ${
          isDark ? "text-white/50" : "text-slate-500"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-1 text-sm font-semibold tabular-nums ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ResultRow({
  isDark,
  label,
  value,
  hint,
  highlight,
}: {
  isDark: boolean;
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div
          className={`text-sm ${
            isDark ? "text-white/70" : "text-slate-600"
          }`}
        >
          {label}
        </div>
        <div
          className={`text-2xl font-semibold tabular-nums ${
            highlight
              ? "bg-gradient-to-br from-emerald-400 to-teal-500 bg-clip-text text-transparent"
              : isDark
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {value}
        </div>
      </div>
      {hint && (
        <div
          className={`mt-1 text-[11px] ${
            isDark ? "text-white/40" : "text-slate-400"
          }`}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
