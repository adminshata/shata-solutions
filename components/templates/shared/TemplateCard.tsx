"use client";

import Link from "next/link";
import type { SiteTemplate } from "@/lib/templates/registry";

interface Props {
  template: SiteTemplate;
  isDark?: boolean;
}

export default function TemplateCard({ template, isDark = true }: Props) {
  const { name, tagline, category, tags, previewHref, status, colorTheme, pages } = template;
  const isLive = status === "live" && previewHref;

  return (
    <div
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-slate-900/60 border-white/10 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
      }`}
    >
      {/* Color accent top bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${colorTheme.primary}, ${colorTheme.badge})` }}
      />

      {/* Mockup preview area */}
      <div
        className={`relative h-44 overflow-hidden flex items-center justify-center bg-gradient-to-br ${colorTheme.gradient}`}
      >
        {/* Browser chrome mockup */}
        <div
          className={`w-[82%] rounded-xl border shadow-2xl overflow-hidden ${
            isDark ? "border-white/15 bg-slate-950" : "border-slate-300 bg-white"
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
          <div className={`p-3 space-y-1.5 ${isDark ? "bg-slate-950" : "bg-white"}`}>
            <div className="h-3 rounded-sm w-3/4" style={{ background: colorTheme.primary + "50" }} />
            <div className={`h-2 rounded-sm w-full ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
            <div className={`h-2 rounded-sm w-5/6 ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
            <div className="grid grid-cols-3 gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-8 rounded-md"
                  style={{ background: colorTheme.primary + (i === 0 ? "35" : "18") }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Status badge */}
        {isLive ? (
          <div
            className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border backdrop-blur-sm"
            style={{
              color: colorTheme.badge,
              borderColor: colorTheme.primary + "60",
              background: colorTheme.primary + "22",
            }}
          >
            Live
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-slate-800/90 text-white/50 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 block"
          style={{ color: colorTheme.badge }}
        >
          {category}
        </span>

        <h3 className={`font-bold text-[15px] leading-snug mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
          {name}
        </h3>

        <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          {tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                isDark ? "bg-white/8 text-white/50" : "bg-slate-100 text-slate-500"
              }`}
            >
              {tag}
            </span>
          ))}
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: colorTheme.primary + "20", color: colorTheme.badge }}
          >
            {pages.length}p
          </span>
        </div>

        {isLive ? (
          <Link
            href={previewHref!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: colorTheme.primary,
              boxShadow: `0 6px 20px ${colorTheme.primary}45`,
            }}
          >
            Live Preview <span>→</span>
          </Link>
        ) : (
          <span
            className={`inline-flex items-center text-xs font-medium px-4 py-2 rounded-full ${
              isDark ? "bg-white/5 text-white/30" : "bg-slate-100 text-slate-400"
            }`}
          >
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}
