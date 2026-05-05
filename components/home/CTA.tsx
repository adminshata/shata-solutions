"use client";

import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { PlanId } from "@/lib/types";

interface Props {
  openOnboarding: (plan: PlanId) => void;
}

export default function CTA({ openOnboarding }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-24 text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 2px, transparent 2px), radial-gradient(circle at 80% 70%, white 2px, transparent 2px)", backgroundSize: "60px 60px" }} />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
          Ready to launch your U.S. business?
        </h2>
        <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
          Join 2,400+ founders who&apos;ve launched with Shata Solutions. From idea to operating company in 7 days.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openOnboarding("growth")}
            className="rounded-full bg-white text-blue-700 px-8 py-4 font-semibold shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start my LLC now →
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="rounded-full border-2 border-white/60 px-8 py-4 font-semibold hover:bg-white/10 transition"
          >
            Talk on WhatsApp
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <span className="text-white">✓</span> No credit card required
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">✓</span> Money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">✓</span> Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
}
