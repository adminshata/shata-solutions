"use client";

import type { PlanId } from "@/lib/types";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface Props {
  isDark: boolean;
  openOnboarding: (plan: PlanId) => void;
}

export default function AboutCTA({ isDark, openOnboarding }: Props) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-10 sm:p-16 text-center shadow-2xl">
        {/* decorative glow */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Accepting new founders today
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Ready to join 2,400+ founders building globally?
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto">
            Your U.S. company, EIN, Wise bank, and Stripe payments — live in 7 days, on average. Guided by AI. Backed by real humans.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openOnboarding("growth")}
              className="rounded-full bg-white px-8 py-3.5 text-blue-700 font-semibold hover:bg-blue-50 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Start my company →
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/30 px-8 py-3.5 text-white font-semibold hover:bg-white/10 transition backdrop-blur-xl"
            >
              Talk to a specialist
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80 flex-wrap">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 14-day money-back guarantee</span>
            <span>✓ Free AI assistance, 24/7</span>
          </div>
        </div>
      </div>

      {/* Secondary reassurance */}
      <div className="mt-10 text-center">
        <p
          className={`text-sm ${
            isDark ? "text-white/60" : "text-slate-500"
          }`}
        >
          Questions?{" "}
          <a
            href="mailto:hello@shata.solutions"
            className={`font-semibold ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            hello@shata.solutions
          </a>{" "}
          · We usually reply within 30 minutes.
        </p>
      </div>
    </section>
  );
}
