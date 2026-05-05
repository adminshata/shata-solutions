"use client";

interface Props {
  isDark: boolean;
}

const MILESTONES = [
  {
    year: "2024",
    quarter: "Q2",
    title: "Shata Solutions founded",
    desc: "Launched with a single mission: make U.S. company formation globally accessible, fast, and transparent.",
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "First 500 founders onboarded",
    desc: "Helped founders from 22 countries register their LLCs and secure EINs in record average time.",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "Wise & Stripe partnerships",
    desc: "Integrated banking and payments directly into the onboarding flow — founders now go from idea to accepting payments in under 10 days.",
  },
  {
    year: "2025",
    quarter: "Q3",
    title: "AI assistant launched",
    desc: "Rolled out real-time, voice-enabled AI support in English and Arabic for every customer, 24/7.",
  },
  {
    year: "2026",
    quarter: "Q1",
    title: "2,400+ companies milestone",
    desc: "Crossed 2,400 companies formed across 60+ countries, with a 4.9★ Trustpilot rating.",
  },
  {
    year: "2026",
    quarter: "Q2",
    title: "SOC 2 Type II certified",
    desc: "Achieved SOC 2 compliance through independent audit — reinforcing our commitment to security and trust.",
  },
];

export default function Timeline({ isDark }: Props) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Our journey
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Milestones and momentum
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Where we came from, and where we&apos;re headed.
          </p>
        </div>

        <div className="relative">
          {/* center / left line */}
          <div
            className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 ${
              isDark ? "bg-white/10" : "bg-slate-200"
            }`}
          />

          <div className="space-y-10 sm:space-y-12">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={`${m.year}-${m.quarter}-${m.title}`}
                  className="relative"
                  style={{
                    animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
                  }}
                >
                  {/* dot */}
                  <div
                    className={`absolute left-6 md:left-1/2 top-2 h-4 w-4 rounded-full -translate-x-1/2 ring-4 ${
                      isDark
                        ? "bg-blue-500 ring-slate-950"
                        : "bg-blue-600 ring-white"
                    }`}
                  />

                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft
                        ? "md:pr-10 md:text-right"
                        : "md:pl-10 md:ml-auto"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        isDark
                          ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {m.year} · {m.quarter}
                    </div>
                    <h3
                      className={`mt-3 text-xl sm:text-2xl font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {m.title}
                    </h3>
                    <p
                      className={`mt-2 leading-relaxed ${
                        isDark ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      {m.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
