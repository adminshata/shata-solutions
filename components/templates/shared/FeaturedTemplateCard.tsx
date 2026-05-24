"use client";

import Link from "next/link";
import type { SiteTemplate } from "@/lib/templates/registry";

interface Props {
  template: SiteTemplate;
  isDark?: boolean;
}

export default function FeaturedTemplateCard({ template, isDark = true }: Props) {
  const { name, description, category, features, previewHref, status, colorTheme, pages, recommendedFor } = template;
  const isLive = status === "live" && previewHref;

  return (
    <div
      className={`group relative rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-slate-900/80 border-white/10 hover:border-white/20 hover:shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-[0_24px_70px_rgba(0,0,0,0.1)]"
      }`}
    >
      {/* Preview area */}
      <div className={`relative h-56 overflow-hidden flex items-center justify-center bg-gradient-to-br ${colorTheme.gradient}`}>
        {/* Browser mockup */}
        <div
          className={`absolute inset-5 rounded-2xl border shadow-2xl overflow-hidden ${
            isDark ? "border-white/15 bg-slate-950/90" : "border-slate-300 bg-white/95"
          }`}
        >
          <div
            className={`flex items-center gap-1.5 px-3 py-2 border-b ${
              isDark ? "bg-slate-800/80 border-white/10" : "bg-slate-100 border-slate-200"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-400 opacity-80" />
            <span className="h-2 w-2 rounded-full bg-yellow-400 opacity-80" />
            <span className="h-2 w-2 rounded-full bg-green-400 opacity-80" />
            <div className={`ml-2 flex-1 h-3 rounded-sm ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
          </div>
          <div className={`p-4 space-y-2 ${isDark ? "bg-slate-950/90" : "bg-white"}`}>
            <div className="h-4 rounded-md w-1/2" style={{ background: colorTheme.primary + "60" }} />
            <div className={`h-2 rounded-sm w-full ${isDark ? "bg-white/6" : "bg-slate-100"}`} />
            <div className={`h-2 rounded-sm w-4/5 ${isDark ? "bg-white/6" : "bg-slate-100"}`} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="h-12 rounded-xl" style={{ background: colorTheme.primary + "28" }} />
              <div className="h-12 rounded-xl" style={{ background: colorTheme.primary + "16" }} />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-7 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Featured badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
          Featured
        </div>

        {/* Live badge */}
        {isLive && (
          <div
            className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm"
            style={{
              color: colorTheme.badge,
              borderColor: colorTheme.primary + "60",
              background: colorTheme.primary + "25",
            }}
          >
            Live
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 block"
          style={{ color: colorTheme.badge }}
        >
          {category}
        </span>

        <h3 className={`font-bold text-xl leading-snug mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
          {name}
        </h3>

        <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-white/55" : "text-slate-500"}`}>
          {description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {features.slice(0, 4).map((f) => (
            <span
              key={f}
              className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${
                isDark ? "bg-white/8 text-white/60" : "bg-slate-100 text-slate-600"
              }`}
            >
              {f}
            </span>
          ))}
          <span
            className="text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{ background: colorTheme.primary + "22", color: colorTheme.badge }}
          >
            {pages.length} pages
          </span>
        </div>

        <p className={`text-[11px] mb-5 ${isDark ? "text-white/35" : "text-slate-400"}`}>
          Best for: {recommendedFor.join(", ")}
        </p>

        <div className="mt-auto">
          {isLive ? (
            <Link
              href={previewHref!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${colorTheme.primary}, ${colorTheme.badge})`,
                boxShadow: `0 10px 30px ${colorTheme.primary}50`,
              }}
            >
              View Live Preview <span>→</span>
            </Link>
          ) : (
            <span
              className={`inline-flex items-center text-sm font-medium px-6 py-3 rounded-full ${
                isDark ? "bg-white/5 text-white/30" : "bg-slate-100 text-slate-400"
              }`}
            >
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
