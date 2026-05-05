"use client";

import { useState } from "react";
import { INTEGRATIONS } from "@/lib/constants";
import type { Integration } from "@/lib/types";

interface Props {
  isDark: boolean;
}

export default function Integrations({ isDark }: Props) {
  const [active, setActive] = useState<Integration | null>(null);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? "bg-slate-950 text-white" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Integrations</p>
          <h2 className={`mt-4 text-3xl sm:text-5xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
            Connect with your favorite tools
          </h2>
          <p className={`mt-4 ${isDark ? "text-white/70" : "text-slate-600"}`}>
            Seamlessly integrate with platforms you already use to automate workflows and scale your business faster.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {INTEGRATIONS.map((tool) => (
            <div
              key={tool.name}
              onClick={() => setActive(tool)}
              className={`group relative flex items-center justify-center h-28 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:scale-105 ${
                isDark
                  ? "border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)]"
                  : "border-slate-200 bg-gradient-to-br from-white to-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.25)]"
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 bg-gradient-to-br ${tool.color} transition duration-300`} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-10 w-10 mb-2 flex items-center justify-center">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/logos/stripe.svg")}
                    className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className={`text-sm font-semibold tracking-wide ${isDark ? "text-white/90" : "text-slate-700"}`}>{tool.name}</span>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-blue-400/30 transition" />
            </div>
          ))}
        </div>

        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <div
              className={`w-full max-w-md p-6 rounded-3xl shadow-xl ${isDark ? "bg-slate-900 text-white" : "bg-white"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-2">{active.name} Integration</h3>
              <p className="text-sm opacity-70 mb-4">
                Connect {active.name} with your AI system to automate workflows and scale your business.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Connecting to ${active.name}...`)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Connect
                </button>
                <button onClick={() => setActive(null)} className="flex-1 border px-4 py-2 rounded-full text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
