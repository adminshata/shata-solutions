"use client";

import { SERVICES } from "@/lib/constants";

interface Props {
  isDark: boolean;
}

export default function Services({ isDark }: Props) {
  return (
    <section
      id="services"        
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            What we do
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Everything you need to run a U.S. company
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Formation, taxes, banking, payments, and AI automation — all in one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className={`group relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                isDark
                  ? "bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]"
                  : "bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
              }`}
            >
              <div className="absolute -top-4 left-8 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                0{i + 1}
              </div>
              <h3
                className={`mt-2 text-xl font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                {s.description}
              </p>
              <ul className="mt-6 space-y-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-2 text-sm ${
                      isDark ? "text-white/80" : "text-slate-700"
                    }`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
