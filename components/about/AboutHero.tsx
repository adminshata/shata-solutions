"use client";

interface Props {
  isDark: boolean;
}

export default function AboutHero({ isDark }: Props) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 text-center overflow-hidden">
      {/* floating accent dots */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-16 left-10 h-2 w-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute top-40 right-24 h-2 w-2 bg-purple-500 rounded-full animate-ping" />
        <div className="absolute bottom-10 left-1/4 h-2 w-2 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute bottom-32 right-1/3 h-1.5 w-1.5 bg-purple-400 rounded-full animate-ping" />
      </div>

      <div
        className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
          isDark
            ? "border-white/10 bg-white/5 text-white/80"
            : "border-slate-200 bg-white/70 text-slate-700"
        }`}
      >
        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        About Shata Solutions
      </div>

      <h1
        className={`text-5xl sm:text-7xl font-semibold leading-[1.05] tracking-tight max-w-5xl mx-auto ${
          isDark ? "text-white" : "text-slate-950"
        }`}
      >
        Built for founders who build anywhere,
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          {" "}
          serve everyone.
        </span>
      </h1>

      <p
        className={`mt-8 max-w-2xl mx-auto text-lg sm:text-xl ${
          isDark ? "text-white/70" : "text-slate-600"
        }`}
      >
        We exist to make launching a U.S. company as easy as sending an email — no matter where you are in the world.
      </p>

      <div
        className={`mt-14 grid grid-cols-3 max-w-2xl mx-auto divide-x ${
          isDark ? "divide-white/10" : "divide-slate-200"
        }`}
      >
        <div className="px-4">
          <div
            className={`text-3xl sm:text-4xl font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            2024
          </div>
          <div
            className={`mt-1 text-[10px] sm:text-xs font-semibold tracking-[0.2em] ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            FOUNDED
          </div>
        </div>
        <div className="px-4">
          <div
            className={`text-3xl sm:text-4xl font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            2,400+
          </div>
          <div
            className={`mt-1 text-[10px] sm:text-xs font-semibold tracking-[0.2em] ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            FOUNDERS SERVED
          </div>
        </div>
        <div className="px-4">
          <div
            className={`text-3xl sm:text-4xl font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            60+
          </div>
          <div
            className={`mt-1 text-[10px] sm:text-xs font-semibold tracking-[0.2em] ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            COUNTRIES
          </div>
        </div>
      </div>

      <div
        className={`mt-10 flex items-center justify-center gap-6 text-sm opacity-75 flex-wrap ${
          isDark ? "text-white/70" : "text-slate-600"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-400">★★★★★</span>
          <span>4.9 on Trustpilot</span>
        </div>
        <div className={`h-4 w-px ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
        <span>🛡️ SOC 2 Type II</span>
        <div className={`h-4 w-px ${isDark ? "bg-white/20" : "bg-slate-300"}`} />
        <span>⚖️ Licensed agent in DE & WY</span>
      </div>
    </section>
  );
}
