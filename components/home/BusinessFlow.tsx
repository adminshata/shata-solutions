"use client";

import { FLOW_STEPS } from "@/lib/constants";
import type { PlanId } from "@/lib/types";

interface Props {
  isDark: boolean;
  openOnboarding: (plan: PlanId) => void;
  selectedPlan: PlanId;
}

export default function BusinessFlow({ isDark, openOnboarding, selectedPlan }: Props) {
  return (
    <section
      id="flow"
      className={`relative py-24 overflow-hidden ${
        isDark ? "bg-slate-950" : "bg-gradient-to-b from-white to-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">How it works</p>
          <h2 className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${isDark ? "text-white" : "text-slate-950"}`}>
            From idea to operating business<br className="hidden sm:block" /> in days, not months.
          </h2>
          <p className={`mt-6 max-w-2xl mx-auto text-lg ${isDark ? "text-white/70" : "text-slate-600"}`}>
            We handle every step of your U.S. business launch. You just fill a short form — we take care of filings, government agencies, banks, and payment processors.
          </p>
        </div>

        <div className="relative">
          <div className={`absolute top-12 left-12 right-12 h-0.5 hidden lg:block ${isDark ? "bg-white/10" : "bg-slate-200"}`}>
            <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {FLOW_STEPS?.map((s) => (
              <div
                key={`${s.step}-${s.title}`}
                className={`group relative rounded-3xl p-7 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ${
                  isDark
                    ? "bg-slate-900/60 border-white/10 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]"
                    : "bg-white border-slate-200 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-xs font-mono tracking-widest ${isDark ? "text-white/40" : "text-slate-400"}`}>{s.step}</div>
                  <span
                    className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-full ${
                      isDark ? "bg-blue-500/10 text-blue-300" : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {s.time}
                  </span>
                </div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openOnboarding(selectedPlan)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-white font-semibold shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            Launch my U.S. business <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
