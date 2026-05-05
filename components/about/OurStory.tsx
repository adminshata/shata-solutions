"use client";

interface Props {
  isDark: boolean;
}

const PILLARS = [
  { icon: "🏢", label: "LLC", desc: "Delaware or Wyoming" },
  { icon: "🔢", label: "EIN", desc: "Registered with IRS" },
  { icon: "🏦", label: "Bank", desc: "Wise account" },
  { icon: "💳", label: "Stripe", desc: "Payments live" },
];

export default function OurStory({ isDark }: Props) {
  return (
    <section
      className={`relative py-24 border-y ${
        isDark
          ? "bg-slate-900/30 border-white/5"
          : "bg-slate-50/70 border-slate-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Our Mission
            </div>
            <h2
              className={`text-4xl sm:text-5xl font-semibold leading-tight tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Remove every barrier between a great idea and a global business.
            </h2>

            <div
              className={`mt-6 space-y-5 text-base sm:text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              <p>
                Shata was born from a simple frustration: incorporating a U.S. company from abroad was painfully manual, expensive, and opaque. Filings got lost. EINs took months. Bank accounts felt impossible.
              </p>
              <p>
                We rebuilt the entire flow — from registration, to EIN, to Wise banking, to Stripe payments — into one guided, AI-powered experience. Real paperwork, real humans when you need them, delivered in days instead of months.
              </p>
              <p>
                Today, founders from 60+ countries use Shata to launch and operate U.S. companies the same way domestic founders do — only faster.
              </p>
            </div>

            <div
              className={`mt-10 border-l-4 pl-6 ${
                isDark
                  ? "border-blue-500 text-white/85"
                  : "border-blue-600 text-slate-700"
              }`}
            >
              <p className="text-lg sm:text-xl italic leading-snug">
                &ldquo;The best tool is the one that disappears. Our job is to make the legal, financial, and operational plumbing invisible — so founders can focus on what actually matters.&rdquo;
              </p>
              <div
                className={`mt-4 text-sm font-semibold not-italic ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                — Dr. M. Shata, Founder
              </div>
            </div>
          </div>

          {/* Right-side visual: 4 pillar cards */}
          <div className="relative">
            <div
              className={`relative aspect-square rounded-3xl overflow-hidden border ${
                isDark
                  ? "border-white/10 bg-gradient-to-br from-blue-900/40 via-slate-900/40 to-purple-900/40"
                  : "border-slate-200 bg-gradient-to-br from-blue-50 via-white to-purple-50"
              }`}
            >
              {/* grid pattern */}
              <div
                className={`absolute inset-0 ${
                  isDark ? "opacity-20" : "opacity-30"
                }`}
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)"
                    : "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* soft glow */}
              <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/30 blur-3xl" />

              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {PILLARS.map((p, i) => (
                    <div
                      key={p.label}
                      className={`rounded-2xl border p-5 backdrop-blur-xl transition-transform hover:scale-105 ${
                        isDark
                          ? "border-white/20 bg-white/5"
                          : "border-white/70 bg-white/80 shadow-sm"
                      }`}
                      style={{
                        animation: `fadeUp 0.6s ease ${i * 0.12}s both`,
                      }}
                    >
                      <div className="text-3xl">{p.icon}</div>
                      <div
                        className={`mt-3 text-base font-semibold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {p.label}
                      </div>
                      <div
                        className={`text-xs ${
                          isDark ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        {p.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* floating chip */}
            <div
              className={`absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border px-5 py-2 text-sm font-semibold backdrop-blur-xl shadow-lg ${
                isDark
                  ? "border-white/15 bg-slate-900/80 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2" />
              Live in 7 days, on average
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
