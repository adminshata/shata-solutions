"use client";

import { TESTIMONIALS } from "@/lib/constants";

interface Props {
  isDark: boolean;
}

export default function Testimonials({ isDark }: Props) {
  return (
    <section
      id="testimonials"
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Trusted by founders
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Founders love Shata Solutions
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
            <span
              className={`ml-2 text-sm ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              4.9/5 from 2,400+ founders
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                isDark
                  ? "bg-slate-900 border-white/10 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]"
                  : "bg-white border-slate-200 hover:shadow-xl"
              }`}
            >
              <div className="text-4xl text-blue-500/40 leading-none mb-4">
                &ldquo;
              </div>
              <p
                className={`text-base leading-relaxed ${
                  isDark ? "text-white/85" : "text-slate-700"
                }`}
              >
                {t.quote}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? "text-white/60" : "text-slate-500"
                    }`}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
