"use client";

interface Props {
  isDark: boolean;
}

const STATS = [
  {
    value: "$4.2M+",
    label: "Paid to partners in 2025",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    value: "1,200+",
    label: "Active partners worldwide",
    accent: "from-purple-500 to-pink-500",
  },
  {
    value: "35%",
    label: "Max lifetime commission",
    accent: "from-orange-500 to-red-500",
  },
  {
    value: "$247",
    label: "Average monthly per referral",
    accent: "from-emerald-500 to-teal-500",
  },
];

export default function PartnerStats({ isDark }: Props) {
  return (
    <section
      className={`relative py-20 border-y ${
        isDark
          ? "border-white/5 bg-slate-900/40"
          : "border-slate-100 bg-slate-50/70"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`text-center text-xs font-semibold uppercase tracking-[0.3em] mb-12 ${
            isDark ? "text-white/50" : "text-slate-500"
          }`}
        >
          Trusted by creators, agencies, and communities worldwide
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`group relative p-8 sm:p-10 text-center overflow-hidden transition-colors ${
                isDark
                  ? "bg-slate-950 hover:bg-slate-900"
                  : "bg-white hover:bg-slate-50"
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
              }}
            >
              {/* gradient accent on hover */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-br ${s.accent}`}
              />

              <div className="relative">
                <div
                  className={`text-5xl sm:text-6xl font-semibold tabular-nums bg-gradient-to-br ${s.accent} bg-clip-text text-transparent`}
                >
                  {s.value}
                </div>
                <div
                  className={`mt-3 text-sm font-medium ${
                    isDark ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
