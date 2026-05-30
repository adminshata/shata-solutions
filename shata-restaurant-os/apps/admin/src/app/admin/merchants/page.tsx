"use client";

import { useEffect, useState } from "react";

interface Merchant {
  id: string;
  name: string;
  plan: string;
  currency: string;
  timezone: string;
  createdAt: string;
  active: boolean;
}

const PLAN_COLORS: Record<string, string> = {
  STARTER: "bg-slate-100 text-slate-600",
  GROWTH: "bg-blue-100 text-blue-700",
  PRO: "bg-purple-100 text-purple-700",
  ENTERPRISE: "bg-amber-100 text-amber-700",
};

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    fetch(`${apiUrl}/api/admin/restaurants`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setMerchants(data))
      .catch(() => setMerchants([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.includes(search)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Merchants</h1>
        <input
          type="search"
          placeholder="Search by name or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            Loading merchants…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">
            {search ? "No merchants match your search." : "No merchants yet."}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Restaurant</th>
                  <th className="px-4 py-3 text-left">Plan</th>
                  <th className="px-4 py-3 text-left">Currency</th>
                  <th className="px-4 py-3 text-left">Timezone</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{m.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{m.id.slice(0, 8)}…</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PLAN_COLORS[m.plan] ?? "bg-slate-100 text-slate-600"}`}>
                        {m.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">{m.currency}</td>
                    <td className="px-4 py-3 text-slate-600">{m.timezone}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${m.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${m.active ? "bg-green-500" : "bg-red-500"}`} />
                        {m.active ? "Active" : "Suspended"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
