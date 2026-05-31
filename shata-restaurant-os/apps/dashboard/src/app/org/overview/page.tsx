"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BranchStat {
  id: string;
  name: string;
  branchCode: string | null;
  currency: string;
  revenue30d: number;
  orders30d: number;
  activeSessions: number;
  _count: { orders: number; tables: number; staff: number };
}

interface OrgOverview {
  org: { id: string; name: string; plan: string };
  branches: BranchStat[];
}

const ORG_ID = "REPLACE_WITH_ORG_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export default function OrgOverviewPage() {
  const [data, setData] = useState<OrgOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [centralMenu, setCentralMenu] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/org/overview?orgId=${ORG_ID}`)
      .then((r) => r.json())
      .then((d) => setData(d as OrgOverview))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-400 text-sm">
        Organization not found
      </div>
    );
  }

  const totalRevenue = data.branches.reduce((s, b) => s + b.revenue30d, 0);
  const totalOrders = data.branches.reduce((s, b) => s + b.orders30d, 0);
  const topBranch = [...data.branches].sort((a, b) => b.revenue30d - a.revenue30d)[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/orders" className="text-sm text-brand font-semibold">← Dashboard</Link>
          <span className="text-slate-300">/</span>
          <h1 className="font-bold text-slate-900">{data.org.name} — Branch Overview</h1>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
          {data.org.plan}
        </span>
      </header>

      <div className="p-6 space-y-6 max-w-6xl">
        {/* Org-level KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "30-day Revenue", value: `${totalRevenue.toLocaleString()} ${data.branches[0]?.currency ?? ""}`, sub: "Across all branches" },
            { label: "30-day Orders", value: totalOrders.toLocaleString(), sub: "All branches combined" },
            { label: "Top Branch", value: topBranch?.name ?? "—", sub: topBranch ? `${topBranch.revenue30d.toLocaleString()} ${topBranch.currency}` : "" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border bg-white p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Centralized Menu Toggle */}
        <div className="rounded-xl border bg-white p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Centralized Menu</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {centralMenu
                ? "All branches share the same menu. Changes apply to all branches instantly."
                : "Each branch manages its own menu independently."}
            </p>
          </div>
          <button
            onClick={() => setCentralMenu((v) => !v)}
            className={`relative h-7 w-13 rounded-full transition-colors ${centralMenu ? "bg-brand" : "bg-slate-200"}`}
            style={{ width: "52px" }}
          >
            <span className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${centralMenu ? "translate-x-6" : ""}`} />
          </button>
        </div>

        {/* Branch Comparison Table */}
        <div className="rounded-xl border bg-white overflow-hidden">
          <div className="px-5 py-4 border-b bg-slate-50 flex items-center justify-between">
            <p className="font-semibold text-slate-800">Branches ({data.branches.length})</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-5 py-3">Branch</th>
                <th className="px-5 py-3">30-day Revenue</th>
                <th className="px-5 py-3">30-day Orders</th>
                <th className="px-5 py-3">Active Sessions</th>
                <th className="px-5 py-3">Tables</th>
                <th className="px-5 py-3">Staff</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.branches.map((branch) => (
                <tr key={branch.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{branch.name}</p>
                    {branch.branchCode && (
                      <p className="text-xs text-slate-400 font-mono">{branch.branchCode}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {branch.revenue30d.toLocaleString()} {branch.currency}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{branch.orders30d}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${branch.activeSessions > 0 ? "text-green-600" : "text-slate-400"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${branch.activeSessions > 0 ? "bg-green-500" : "bg-slate-300"}`} />
                      {branch.activeSessions} active
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{branch._count.tables}</td>
                  <td className="px-5 py-4 text-slate-600">{branch._count.staff}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/orders?restaurantId=${branch.id}`}
                      className="text-xs font-semibold text-brand hover:underline"
                    >
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.branches.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-12">No branches in this organization</p>
          )}
        </div>
      </div>
    </div>
  );
}
