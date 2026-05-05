"use client";

interface Props {
  isDark: boolean;
}

const STATS = [
  { value: "2,400+", label: "Companies formed", sub: "And counting, monthly" },
  { value: "60+", label: "Countries served", sub: "Truly borderless" },
  { value: "4.9★", label: "Trustpilot rating", sub: "From real founders" },
  { value: "$18M+", label: "Processed via Stripe", sub: "For our customers" },
];

export default function AboutStats({ isDark }: Props) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            By the numbers
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Real numbers. Real founders.
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            No marketing fluff — just what we&apos;ve shipped, verified by independent review platforms and our partners.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative rounded-2xl border p-6 sm:p-8 text-center overflow-hidden transition-all hover:scale-[1.03] hover:-translate-y-1 ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/40"
                  : "border-slate-200 bg-white hover:border-blue-400 hover:shadow-xl"
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}
            >
              <div
                className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity ${
                  isDark ? "bg-blue-500" : "bg-blue-300"
                }`}
              />

              <div
                className={`relative text-4xl sm:text-5xl lg:text-6xl font-semibold bg-gradient-to-br ${
                  isDark
                    ? "from-blue-300 via-purple-300 to-blue-400"
                    : "from-blue-600 via-purple-600 to-blue-700"
                } bg-clip-text text-transparent`}
              >
                {stat.value}
              </div>
              <div
                className={`relative mt-4 font-semibold text-sm sm:text-base ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {stat.label}
              </div>
              <div
                className={`relative mt-1 text-xs sm:text-sm ${
                  isDark ? "text-white/60" : "text-slate-500"
                }`}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
