"use client";

import type { PlanId } from "@/lib/types";

interface Props {
  isDark: boolean;
  openOnboarding: (plan: PlanId) => void;
}

export default function Hero({ isDark, openOnboarding }: Props) {
  return (
    <section
      className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 text-center overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        const el = document.getElementById("parallax");
        if (el) el.style.transform = `translate(${x}px, ${y}px)`;
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-2 w-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute top-40 right-20 h-2 w-2 bg-purple-500 rounded-full animate-ping" />
        <div className="absolute bottom-20 left-1/3 h-2 w-2 bg-blue-400 rounded-full animate-ping" />
      </div>

      <div id="parallax" className="transition-transform duration-200">
        <div className="flex flex-col items-center">
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
              isDark ? "border-white/10 bg-white/5 text-white/80" : "border-slate-200 bg-white/70 text-slate-700"
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Trusted by 2,400+ founders worldwide
          </div>

          <h1 className={`text-4xl font-semibold sm:text-6xl leading-tight max-w-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
            Start and grow your U.S. business from anywhere
          </h1>
          <p className={`mt-3 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase ${isDark ? "text-blue-200/70" : "text-slate-500"}`}>
            LLC · EIN · Bank · Stripe · All-in-one
          </p>
          <p className={`mt-6 max-w-2xl text-lg ${isDark ? "text-white/70" : "text-slate-600"}`}>
            Form your U.S. LLC, get your EIN, open a Wise bank account, and start accepting payments with Stripe — all guided by AI and real human specialists.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => openOnboarding("growth")}
              className="rounded-full bg-blue-600 px-8 py-3.5 text-white font-medium hover:bg-blue-700 shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              Start my LLC →
            </button>
            <a
              href="#pricing"
              className={`rounded-full border px-8 py-3.5 transition ${
                isDark ? "border-white/15 text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100 border-slate-300"
              }`}
            >
              See pricing
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm opacity-75 flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400">★★★★★</span>
              <span className={isDark ? "text-white/70" : "text-slate-600"}>4.9 on Trustpilot</span>
            </div>
            <div className={`h-4 w-px ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
            <span className={isDark ? "text-white/70" : "text-slate-600"}>🚀 Live in 7 days</span>
            <div className={`h-4 w-px ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
            <span className={isDark ? "text-white/70" : "text-slate-600"}>🛡️ 100% satisfaction</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-70">
        {["Google", "Stripe", "Shopify", "OpenAI", "Meta"].map((brand) => (
          <span key={brand} className={`text-sm font-semibold tracking-wide ${isDark ? "text-white/60" : "text-slate-500"}`}>
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
