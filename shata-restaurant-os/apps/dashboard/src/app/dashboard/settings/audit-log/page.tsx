"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

interface AuditEntry { id: string; action: string; resource: string; resourceId?: string; userId?: string; ipAddress?: string; metadata?: Record<string, unknown>; createdAt: string }

const ACTION_COLORS: Record<string, string> = {
  "order.void": "bg-red-100 text-red-700",
  "refund.requested": "bg-orange-100 text-orange-700",
  "refund.approved": "bg-yellow-100 text-yellow-700",
  "refund.rejected": "bg-red-100 text-red-700",
  "staff.role_changed": "bg-purple-100 text-purple-700",
  "menu.product_deleted": "bg-red-100 text-red-700",
  "payment.method_changed": "bg-blue-100 text-blue-700",
  "subscription.plan_changed": "bg-brand/10 text-brand",
};

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ restaurantId: RID, page: String(page) });
    if (action) params.set("action", action);
    fetch(`${API}/api/dashboard/settings/audit-log?${params}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setLogs(d.logs); setTotal(d.total); } })
      .finally(() => setLoading(false));
  }, [page, action]);

  function exportCsv() {
    const rows = [
      ["Date", "Action", "Resource", "Resource ID", "User", "IP"].join(","),
      ...logs.map(l => [new Date(l.createdAt).toISOString(), l.action, l.resource, l.resourceId ?? "", l.userId ?? "", l.ipAddress ?? ""].join(",")),
    ].join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "audit-log.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Audit Log</h1>
          <p className="text-xs text-slate-400">{total} total entries</p>
        </div>
        <button onClick={exportCsv} className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-600 hover:border-brand hover:text-brand">Export CSV</button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={action} onChange={e => { setAction(e.target.value); setPage(1); }}
          className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-brand/40 outline-none">
          <option value="">All actions</option>
          <option value="order.void">Order void</option>
          <option value="refund.requested">Refund requested</option>
          <option value="refund.approved">Refund approved</option>
          <option value="refund.rejected">Refund rejected</option>
          <option value="staff.role_changed">Staff role changed</option>
          <option value="menu.product_deleted">Product deleted</option>
          <option value="payment.method_changed">Payment method changed</option>
        </select>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading…</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Resource</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">IP</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ACTION_COLORS[log.action] ?? "bg-slate-100 text-slate-600"}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-900">
                    {log.resource}
                    {log.resourceId && <span className="text-xs text-slate-400 ml-1">#{log.resourceId.slice(-6)}</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{log.userId ?? "—"}</td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-400">{log.ipAddress ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(log.createdAt).toLocaleString("en")}</td>
                </tr>
              ))}
              {logs.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-slate-400">No audit entries yet</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {total > 50 && (
        <div className="flex gap-2 mt-4 justify-end">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">← Prev</button>
          <span className="text-sm text-slate-500 py-1.5">Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page * 50 >= total} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">Next →</button>
        </div>
      )}
    </div>
  );
}
