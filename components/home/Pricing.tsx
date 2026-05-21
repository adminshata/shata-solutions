"use client";

import { useState } from "react";
import { PLANS } from "@/lib/constants";
import type { BillingCycle, PlanId } from "@/lib/types";

interface Props {
  isDark: boolean;
  openOnboarding: (plan: PlanId) => void;
}

export default function Pricing({ isDark, openOnboarding }: Props) {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      className={`py-24 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-slate-950 to-slate-900"
          : "bg-gradient-to-b from-slate-50 to-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Simple pricing
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Transparent pricing, no hidden fees
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            One-time setup + low monthly compliance fee. Cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div
            role="tablist"
            aria-label="Billing cycle"
            className={`inline-flex rounded-full border p-1 ${
              isDark
                ? "bg-slate-900 border-white/10"
                : "bg-white border-slate-200"
            }`}
          >
            <button
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                billing === "monthly"
                  ? "bg-blue-600 text-white shadow-md"
                  : isDark
                  ? "text-white/70 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              role="tab"
              aria-selected={billing === "yearly"}
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                billing === "yearly"
                  ? "bg-blue-600 text-white shadow-md"
                  : isDark
                  ? "text-white/70 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Yearly
              <span className="text-[10px] bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded-full font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PLANS.map((plan) => {
            const price =
              billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
            const featured = plan.badge === "MOST POPULAR";
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                  featured
                    ? "scale-105 shadow-[0_20px_60px_rgba(59,130,246,0.3)] border-blue-500/50 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                    : isDark
                    ? "bg-slate-900 border-white/10 hover:border-blue-500/40"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl"
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow ${
                      featured
                        ? "bg-white text-blue-700"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}
                <h3
                  className={`text-xl font-semibold ${
                    featured
                      ? "text-white"
                      : isDark
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    featured
                      ? "text-white/90"
                      : isDark
                      ? "text-white/60"
                      : "text-slate-500"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-5xl font-bold ${
                        featured
                          ? "text-white"
                          : isDark
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      ${price}
                    </span>
                    <span
                      className={`text-sm ${
                        featured
                          ? "text-white/80"
                          : isDark
                          ? "text-white/60"
                          : "text-slate-500"
                      }`}
                    >
                      /mo
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      featured
                        ? "text-white/80"
                        : isDark
                        ? "text-white/60"
                        : "text-slate-500"
                    }`}
                  >
                    + ${plan.oneTime} one-time setup
                  </p>
                </div>

                <button
                  onClick={() => openOnboarding(plan.id)}
                  className={`mt-8 w-full rounded-full py-3 font-semibold transition-all hover:scale-[1.02] active:scale-95 ${
                    featured
                      ? "bg-white text-blue-700 hover:bg-slate-100"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  }`}
                >
                  Get started →
                </button>

                <div className="mt-8">
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold mb-3 ${
                      featured
                        ? "text-white/80"
                        : isDark
                        ? "text-white/50"
                        : "text-slate-400"
                    }`}
                  >
                    What&apos;s included
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-sm ${
                          featured
                            ? "text-white"
                            : isDark
                            ? "text-white/80"
                            : "text-slate-700"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            featured
                              ? "bg-white/20 text-white"
                              : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-sm line-through opacity-50 ${
                          featured
                            ? "text-white/70"
                            : isDark
                            ? "text-white/50"
                            : "text-slate-400"
                        }`}
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-500/10 text-slate-400">
                          ×
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className={`mt-10 text-center text-sm ${
            isDark ? "text-white/60" : "text-slate-500"
          }`}
        >
          Need a custom plan?{" "}
          <a href="#contact" className="text-blue-500 hover:underline">Contact us</a>
          {" · "}
          <a href="/pricing" className="text-blue-500 hover:underline">View full service pricing guide →</a>
        </p>
      </div>
    </section>
  );
}
