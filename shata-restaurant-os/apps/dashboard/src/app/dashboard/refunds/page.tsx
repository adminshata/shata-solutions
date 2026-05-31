"use client";

import { useEffect, useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  PENDING_APPROVAL: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-orange-100 text-orange-800",
  COMPLETED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const REASON_LABELS: Record<string, string> = {
  WRONG_ITEM: "Wrong Item",
  QUALITY_ISSUE: "Quality Issue",
  CUSTOMER_CANCELLED: "Customer Cancelled",
  DUPLICATE_PAYMENT: "Duplicate Payment",
  OTHER: "Other",
};

interface Refund {
  id: string;
  amount: number;
  reason: string;
  status: string;
  notes: string | null;
  initiatedBy: string;
  approvedBy: string | null;
  createdAt: string;
  order: { orderNumber: number; total: number; currency: string };
}

const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        restaurantId: RESTAURANT_ID,
        page: String(page),
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      const res = await fetch(`${API}/api/dashboard/refunds?${params}`);
      const data = await res.json() as { refunds: Refund[]; total: number };
      setRefunds(data.refunds);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, statusFilter]);

  async function approve(id: string) {
    setProcessing(id);
    await fetch(`${API}/api/dashboard/refunds/${id}/approve?restaurantId=${RESTAURANT_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approvedBy: "current-staff-id", staffRole: "MANAGER" }),
    });
    setProcessing(null);
    load();
  }

  async function reject(id: string) {
    setProcessing(id);
    await fetch(`${API}/api/dashboard/refunds/${id}/reject?restaurantId=${RESTAURANT_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffRole: "MANAGER" }),
    });
    setProcessing(null);
    load();
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Refunds</h1>
        <span className="text-sm text-slate-500">{total} total</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b bg-white px-6 py-3">
        {["", "PENDING_APPROVAL", "COMPLETED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === s
                ? "bg-brand text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s === "" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : refunds.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-16">No refunds found</p>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Requested</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {refunds.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold">
                      #{r.order.orderNumber}
                    </td>
                    <td className="px-4 py-3 font-bold text-danger">
                      -{r.amount} {r.order.currency}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {REASON_LABELS[r.reason] ?? r.reason}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[r.status] ?? "bg-slate-100"}`}>
                        {r.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "PENDING_APPROVAL" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approve(r.id)}
                            disabled={processing === r.id}
                            className="rounded-lg bg-success px-3 py-1 text-xs font-bold text-white disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => reject(r.id)}
                            disabled={processing === r.id}
                            className="rounded-lg bg-danger px-3 py-1 text-xs font-bold text-white disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > 20 && (
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="self-center text-sm text-slate-500">
              Page {page} of {Math.ceil(total / 20)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 20 >= total}
              className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
