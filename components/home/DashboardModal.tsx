"use client";

import { useEffect, useState } from "react";
import {
  DASHBOARD_DOCS,
  DASHBOARD_STAGES,
  DASHBOARD_TASKS,
} from "@/lib/constants";
import { useScrollLock } from "@/lib/hooks";
import type { DashboardTab } from "@/lib/types";

interface Props {
  isDark: boolean;
  open: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isDark, open, onClose }: Props) {
  const [tab, setTab] = useState<DashboardTab>("overview");
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const completed = DASHBOARD_STAGES.filter((s) => s.status === "complete").length;
  const progress = Math.round((completed / DASHBOARD_STAGES.length) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dashboard"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-[fadeIn_0.25s_ease]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex ${
          isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* SIDEBAR — Notion style */}
        <aside
          className={`hidden sm:flex w-64 shrink-0 flex-col border-r ${
            isDark
              ? "bg-slate-900/60 border-white/10"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="px-5 py-5 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              S
            </div>
            <div>
              <p className="text-sm font-semibold">Acme Holdings LLC</p>
              <p
                className={`text-[11px] ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Wyoming · Growth plan
              </p>
            </div>
          </div>

          <nav className="px-3 py-2 space-y-1">
            <NavItem
              label="Overview"
              icon="🏠"
              active={tab === "overview"}
              onClick={() => setTab("overview")}
              isDark={isDark}
            />
            <NavItem
              label="Documents"
              icon="📄"
              badge={String(DASHBOARD_DOCS.length)}
              active={tab === "documents"}
              onClick={() => setTab("documents")}
              isDark={isDark}
            />
            <NavItem
              label="Tasks"
              icon="✅"
              badge={String(
                DASHBOARD_TASKS.filter((t) => t.status === "action").length
              )}
              active={tab === "tasks"}
              onClick={() => setTab("tasks")}
              isDark={isDark}
            />
            <NavItem
              label="Billing"
              icon="💳"
              active={tab === "billing"}
              onClick={() => setTab("billing")}
              isDark={isDark}
            />
          </nav>

          <div className="mt-auto p-5">
            <div
              className={`rounded-xl p-4 text-xs ${
                isDark
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "bg-blue-50 border border-blue-100"
              }`}
            >
              <p className="font-semibold mb-1">Need help?</p>
              <p
                className={`${
                  isDark ? "text-white/70" : "text-slate-600"
                } mb-2`}
              >
                Chat with your account manager
              </p>
              <button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 font-medium transition">
                Open chat
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <div>
              <p
                className={`text-xs uppercase tracking-widest ${
                  isDark ? "text-white/50" : "text-slate-400"
                }`}
              >
                Dashboard
              </p>
              <h2 className="text-lg font-semibold capitalize">{tab}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className={`h-9 w-9 rounded-full flex items-center justify-center ${
                isDark
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              ×
            </button>
          </div>

          {/* Mobile tabs */}
          <div
            className={`sm:hidden flex px-4 py-2 gap-2 overflow-x-auto border-b ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            {(["overview", "documents", "tasks", "billing"] as DashboardTab[]).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition ${
                    tab === t
                      ? "bg-blue-600 text-white"
                      : isDark
                      ? "bg-white/10 text-white/70"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          {/* Content */}
          <div
            className={`flex-1 overflow-y-auto p-6 ${
              isDark ? "bg-slate-950" : "bg-slate-50/40"
            }`}
          >
            {tab === "overview" && (
              <div className="space-y-6">
                {/* Hero card */}
                <div
                  className={`rounded-2xl p-6 border ${
                    isDark
                      ? "bg-slate-900 border-white/10"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p
                        className={`text-xs uppercase tracking-widest font-semibold ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Formation progress
                      </p>
                      <p className="text-3xl font-bold mt-1">
                        {progress}% complete
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        {completed} of {DASHBOARD_STAGES.length} stages done.
                        Estimated finish: <b>2 days</b>.
                      </p>
                    </div>
                    <button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold">
                      View live status
                    </button>
                  </div>
                  <div
                    className={`mt-4 h-2 rounded-full overflow-hidden ${
                      isDark ? "bg-white/10" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stages */}
                <div
                  className={`rounded-2xl p-6 border ${
                    isDark
                      ? "bg-slate-900 border-white/10"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold mb-4 ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    Stages
                  </p>
                  <ul className="space-y-3">
                    {DASHBOARD_STAGES.map((s) => (
                      <li
                        key={s.label}
                        className={`flex items-center gap-4 p-3 rounded-xl ${
                          isDark
                            ? "bg-slate-950/40 hover:bg-slate-950/70"
                            : "bg-slate-50 hover:bg-slate-100"
                        } transition`}
                      >
                        <div className="text-2xl">{s.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{s.label}</p>
                        </div>
                        <StatusBadge status={s.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === "documents" && (
              <div
                className={`rounded-2xl border overflow-hidden ${
                  isDark
                    ? "bg-slate-900 border-white/10"
                    : "bg-white border-slate-200"
                }`}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className={`${
                        isDark ? "bg-slate-950/60" : "bg-slate-100"
                      } text-xs uppercase tracking-widest`}
                    >
                      <th className="text-left px-5 py-3 font-semibold">Name</th>
                      <th className="text-left px-5 py-3 font-semibold">Type</th>
                      <th className="text-left px-5 py-3 font-semibold">Date</th>
                      <th className="text-left px-5 py-3 font-semibold">Size</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {DASHBOARD_DOCS.map((d) => (
                      <tr
                        key={d.name}
                        className={`border-t ${
                          isDark
                            ? "border-white/5 hover:bg-white/5"
                            : "border-slate-100 hover:bg-slate-50"
                        } transition`}
                      >
                        <td className="px-5 py-3 font-medium">📄 {d.name}</td>
                        <td className="px-5 py-3">
                          <span
                            className={`text-xs rounded-full px-2 py-0.5 ${
                              isDark
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {d.type}
                          </span>
                        </td>
                        <td
                          className={`px-5 py-3 ${
                            isDark ? "text-white/70" : "text-slate-600"
                          }`}
                        >
                          {d.date}
                        </td>
                        <td
                          className={`px-5 py-3 ${
                            isDark ? "text-white/70" : "text-slate-600"
                          }`}
                        >
                          {d.size}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button className="text-blue-500 text-xs font-semibold hover:underline">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "tasks" && (
              <div className="space-y-3">
                {DASHBOARD_TASKS.map((t) => (
                  <div
                    key={t.title}
                    className={`flex items-center gap-4 p-4 rounded-2xl border ${
                      isDark
                        ? "bg-slate-900 border-white/10 hover:border-white/20"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    } transition`}
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-blue-600"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{t.title}</p>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        Due: {t.due}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        t.status === "action"
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-slate-500/10 text-slate-500"
                      }`}
                    >
                      {t.status === "action" ? "Action needed" : "Upcoming"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === "billing" && (
              <div className="space-y-6">
                <div
                  className={`rounded-2xl p-6 border ${
                    isDark
                      ? "bg-slate-900 border-white/10"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-xs uppercase tracking-widest font-semibold ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Current plan
                      </p>
                      <p className="text-2xl font-bold mt-1">Growth</p>
                      <p
                        className={`text-sm mt-1 ${
                          isDark ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        $99/mo · renews May 15
                      </p>
                    </div>
                    <button
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isDark
                          ? "bg-white/10 hover:bg-white/20 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                      }`}
                    >
                      Change plan
                    </button>
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-6 border ${
                    isDark
                      ? "bg-slate-900 border-white/10"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold mb-4 ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    Payment method
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium text-sm">•••• 4242</p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        Expires 12/27
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-6 border ${
                    isDark
                      ? "bg-slate-900 border-white/10"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-widest font-semibold mb-4 ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    Recent invoices
                  </p>
                  <ul className="divide-y divide-slate-200/20">
                    {[
                      { date: "2026-04-15", amt: "$99.00", status: "Paid" },
                      { date: "2026-03-15", amt: "$99.00", status: "Paid" },
                      { date: "2026-02-15", amt: "$499.00", status: "Paid (setup)" },
                    ].map((inv) => (
                      <li
                        key={inv.date}
                        className="py-3 flex items-center justify-between text-sm"
                      >
                        <div>
                          <p className="font-medium">{inv.date}</p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-white/60" : "text-slate-500"
                            }`}
                          >
                            {inv.status}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold">{inv.amt}</p>
                          <button className="text-blue-500 text-xs font-semibold hover:underline">
                            PDF
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  label,
  icon,
  active,
  onClick,
  badge,
  isDark,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  isDark: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
        active
          ? isDark
            ? "bg-blue-500/10 text-blue-300"
            : "bg-blue-50 text-blue-700"
          : isDark
          ? "text-white/70 hover:bg-white/5"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className={`text-[10px] rounded-full px-2 py-0.5 font-bold ${
            active
              ? "bg-blue-500 text-white"
              : isDark
              ? "bg-white/10 text-white/70"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function StatusBadge({ status }: { status: "complete" | "in-progress" | "pending" }) {
  const map = {
    complete: { label: "Done", cls: "bg-green-500/10 text-green-500" },
    "in-progress": { label: "In progress", cls: "bg-blue-500/10 text-blue-500" },
    pending: { label: "Pending", cls: "bg-slate-500/10 text-slate-500" },
  } as const;
  const { label, cls } = map[status];
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      {label}
    </span>
  );
}
