"use client";

import { useState } from "react";
import { FAQS } from "@/lib/constants";

interface Props {
  isDark: boolean;
}

export default function FAQ({ isDark }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            FAQ
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Frequently asked questions
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Everything international founders ask — answered.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isDark
                    ? "bg-slate-900/60 border-white/10"
                    : "bg-white border-slate-200"
                } ${isOpen ? "shadow-lg" : ""}`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition ${
                    isDark ? "hover:bg-white/5" : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`font-semibold pr-6 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-45"
                        : isDark
                        ? "bg-white/10 text-white/70"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-6 pb-6 leading-relaxed ${
                        isDark ? "text-white/75" : "text-slate-600"
                      }`}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
