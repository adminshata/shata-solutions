"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTheme } from "@/lib/hooks";

/* ------------------------------------------------------------------ */
/* Admin shell — sidebar + topbar + premium ambient background        */
/* ------------------------------------------------------------------ */

type NavItem = {
  href: string;
  label: string;
  icon: "grid" | "list" | "users" | "pipe" | "activity" | "revenue" | "settings";
  badge?: string;
};

const NAV: NavItem[] = [
  { href: "/admin/formation",          label: "Overview",      icon: "grid" },
  { href: "/admin/formation/requests", label: "Requests",      icon: "list" },
  { href: "/admin/formation/pipeline", label: "Pipeline",      icon: "pipe", badge: "Soon" },
  { href: "/admin/formation/customers", label: "Customers",    icon: "users", badge: "Soon" },
  { href: "/admin/formation/activity", label: "Activity",      icon: "activity", badge: "Soon" },
  { href: "/admin/formation/revenue",  label: "Revenue",       icon: "revenue", badge: "Soon" },
  { href: "/admin/formation/settings", label: "Settings",      icon: "settings", badge: "Soon" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#050b16] text-white" : "bg-[#f6f9ff] text-slate-950"}`}>
      <AmbientBackground isDark={isDark} />
      <CursorSpotlight isDark={isDark} />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar (desktop) + drawer (mobile) */}
        <Sidebar isDark={isDark} open={open} onClose={() => setOpen(false)} />

        <div className="flex-1 lg:pl-[260px]">
          <Topbar isDark={isDark} onMenuClick={() => setOpen(true)} toggleTheme={toggleTheme} />

          {/* Demo banner */}
          <div className={`mx-4 mt-4 rounded-xl border px-4 py-2.5 text-[11px] leading-5 md:mx-8 lg:mx-12 ${isDark ? "border-amber-300/30 bg-amber-300/10 text-amber-100" : "border-amber-300 bg-amber-50 text-amber-900"}`}>
            <span className="font-semibold uppercase tracking-[0.18em]">Dev preview</span>
            <span className="mx-2">·</span>
            Data lives in-process and resets on redeploy. Add Supabase + auth before production.
          </div>

          <main className="px-4 pb-20 pt-6 md:px-8 lg:px-12">{children}</main>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

function AmbientBackground({ isDark }: { isDark: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[linear-gradient(to_right,rgba(99,91,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.07)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.05)_1px,transparent_1px)]"
        } bg-[size:72px_72px]`}
      />
      <div className="absolute -left-32 top-[-10%] h-[460px] w-[460px] rounded-full bg-[#635bff]/25 blur-[140px] opacity-50 motion-safe:animate-[shata-mesh-1_22s_ease-in-out_infinite]" />
      <div className="absolute right-[-10%] top-[40%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px] opacity-50 motion-safe:animate-[shata-mesh-2_26s_ease-in-out_infinite]" />
      <div className="absolute left-[20%] bottom-[-10%] h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[140px] opacity-40 motion-safe:animate-[shata-mesh-3_24s_ease-in-out_infinite]" />
      <div className={`absolute inset-0 ${isDark ? "bg-[#050b16]/40" : "bg-[#f6f9ff]/40"}`} />

      <style jsx>{`
        @keyframes shata-mesh-1 { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(40px,30px,0) scale(1.08); } }
        @keyframes shata-mesh-2 { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-30px,40px,0) scale(1.05); } }
        @keyframes shata-mesh-3 { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(20px,-30px,0) scale(1.07); } }
      `}</style>
    </div>
  );
}

function CursorSpotlight({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!el) return;
        el.style.transform = `translate3d(${e.clientX - 280}px, ${e.clientY - 280}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] mix-blend-screen will-change-transform motion-reduce:hidden"
      style={{
        background: isDark
          ? "radial-gradient(circle, rgba(99,91,255,0.18), transparent 55%)"
          : "radial-gradient(circle, rgba(99,91,255,0.10), transparent 55%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */

function Sidebar({ isDark, open, onClose }: { isDark: boolean; open: boolean; onClose: () => void }) {
  const pathname = usePathname() ?? "";
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          aria-hidden
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] transform border-r backdrop-blur-xl transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? "border-white/10 bg-[#050b16]/85" : "border-slate-200 bg-white/85"}`}
      >
        <div className={`flex h-16 items-center justify-between border-b px-5 lg:px-6 ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <Link href="/admin/formation" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]">
              S
            </span>
            <div className="leading-tight">
              <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>Shata Ops</div>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-slate-500"}`}>Formation</div>
            </div>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className={`rounded-md p-1.5 lg:hidden ${isDark ? "text-white/60 hover:bg-white/[0.06]" : "text-slate-500 hover:bg-slate-100"}`}
          >
            ✕
          </button>
        </div>

        <nav className="mt-3 px-3">
          <div className={`px-2 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/40" : "text-slate-400"}`}>
            Workspace
          </div>
          <ul className="space-y-1">
            {NAV.map((n) => {
              const active = n.href === "/admin/formation"
                ? pathname === "/admin/formation"
                : pathname.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "border border-[#635bff]/30 bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10 text-white shadow-[0_10px_25px_-12px_rgba(99,91,255,0.5)]"
                        : isDark ? "text-white/70 hover:bg-white/[0.05] hover:text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <NavIcon icon={n.icon} active={active} />
                      <span>{n.label}</span>
                    </span>
                    {n.badge && (
                      <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${isDark ? "border-white/10 bg-white/[0.04] text-white/50" : "border-slate-200 bg-white text-slate-400"}`}>
                        {n.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute inset-x-3 bottom-4">
          <div className={`overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
            <div className="relative p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,91,255,0.20),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.18),transparent_50%)]" />
              <div className="relative">
                <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#a3a0ff]" : "text-[#635bff]"}`}>You are</div>
                <div className={`mt-1 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>Operator</div>
                <div className={`mt-1 text-[11px] ${isDark ? "text-white/55" : "text-slate-500"}`}>Demo seat — add auth before production.</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavIcon({ icon, active }: { icon: NavItem["icon"]; active: boolean }) {
  const cls = active
    ? "h-4 w-4 text-[#a3a0ff]"
    : "h-4 w-4 text-current";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
      {icon === "grid" && <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>}
      {icon === "list" && <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="14" y2="18" /></>}
      {icon === "users" && <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2" /><path d="M15 20a4 4 0 0 1 6 0" /></>}
      {icon === "pipe" && <><rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="10" y="4" width="5" height="10" rx="1.5" /><rect x="17" y="4" width="4" height="6" rx="1.5" /></>}
      {icon === "activity" && <><polyline points="3 12 7 12 10 4 14 20 17 12 21 12" /></>}
      {icon === "revenue" && <><path d="M4 4v16h16" /><polyline points="7 14 11 10 14 13 19 7" /></>}
      {icon === "settings" && <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.4 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.4l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.6 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Topbar                                                              */
/* ------------------------------------------------------------------ */

function Topbar({ isDark, onMenuClick, toggleTheme }: { isDark: boolean; onMenuClick: () => void; toggleTheme: () => void }) {
  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-xl ${isDark ? "border-white/10 bg-[#050b16]/70" : "border-slate-200 bg-white/70"}`}>
      <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className={`rounded-lg border p-2 lg:hidden ${isDark ? "border-white/10 bg-white/[0.04] text-white" : "border-slate-200 bg-white text-slate-700"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <div className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/50" : "text-slate-500"}`}>
            Shata · Formation Ops
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/services/llc"
            className={`hidden items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-semibold sm:inline-flex ${isDark ? "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            View customer wizard →
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`flex h-9 w-9 items-center justify-center rounded-full border ${isDark ? "border-white/10 bg-white/[0.04] text-white/80" : "border-slate-200 bg-white text-slate-600"}`}
          >
            {isDark ? "☾" : "☀"}
          </button>
        </div>
      </div>
    </header>
  );
}
