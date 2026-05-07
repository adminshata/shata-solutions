"use client";

import { useState, type ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import SideLeft from "./SideLeft";

export function DashboardShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="vividmart-dashboard min-h-screen bg-[#f6f7fb]">
      <SideLeft collapsed={collapsed} />
      <div className={`body-root-inner ${collapsed ? "collapsed" : ""}`}>
        <DashboardHeader onToggleSidebar={() => setCollapsed((value) => !value)} />
        <main className="p-4 md:p-6">
          <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#7C3AED]">VividMart dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-[#1F1F25]">{title}</h1>
            {subtitle && <p className="mt-2 text-base text-slate-600">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <div className="mt-2 text-3xl font-black text-[#1F1F25]">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-4 text-sm font-black uppercase tracking-wide text-slate-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-5 py-4 text-base text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
