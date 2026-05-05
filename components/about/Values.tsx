"use client";

interface Props {
  isDark: boolean;
}

const VALUES = [
  {
    icon: "🎯",
    title: "Founders first",
    desc: "Every product decision passes through one filter: does this make founders faster, smarter, or more confident? If not, we don't ship it.",
  },
  {
    icon: "🔍",
    title: "Radical transparency",
    desc: "No hidden fees. No surprise paperwork. You see every step, every cost, and every timeline before anything happens.",
  },
  {
    icon: "⚡",
    title: "Move fast, with care",
    desc: "Speed without sloppiness. We automate where it's safe, and put real, named humans exactly where it matters most.",
  },
  {
    icon: "🌍",
    title: "Global by default",
    desc: "Built for founders in 60+ countries. Multilingual AI, 24/7 support, zero geographical discrimination in pricing or access.",
  },
];

export default function Values({ isDark }: Props) {
  return (
    <section
      className={`relative py-24 border-y ${
        isDark
          ? "bg-slate-900/30 border-white/5"
          : "bg-slate-50/70 border-slate-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            What we stand for
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Principles we actually live by
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Not posters on a wall — the filters we use every day to decide what to build and how to behave.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`group relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50"
                  : "border-slate-200 bg-white hover:border-blue-400"
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}
            >
              {/* big number watermark */}
              <div
                className={`absolute -top-6 -right-2 text-[9rem] font-bold leading-none select-none transition-opacity ${
                  isDark
                    ? "text-white/5 group-hover:text-white/10"
                    : "text-slate-100 group-hover:text-blue-100"
                }`}
              >
                0{i + 1}
              </div>

              <div className="relative">
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3
                  className={`text-2xl font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {v.title}
                </h3>
                <p
                  className={`mt-3 text-base leading-relaxed ${
                    isDark ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
