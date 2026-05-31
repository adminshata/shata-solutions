"use client";

import { useEffect, useState } from "react";

interface NfcTag {
  id: string;
  serialNumber: string;
  tableId: string | null;
  status: string;
  scanCount: number;
  lastScanned: string | null;
  notes: string | null;
  programmedAt: string | null;
}

interface NfcStats {
  total: number;
  unassigned: number;
  assigned: number;
  active: number;
  damaged: number;
}

interface TableRow {
  id: string;
  number: string;
  label?: string | null;
}

const STATUS_STYLES: Record<string, string> = {
  UNASSIGNED: "bg-slate-100 text-slate-600",
  ASSIGNED: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  DAMAGED: "bg-red-100 text-red-700",
  LOST: "bg-orange-100 text-orange-700",
};

const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export default function NfcPage() {
  const [tab, setTab] = useState<"tags" | "register" | "stats">("tags");
  const [tags, setTags] = useState<NfcTag[]>([]);
  const [stats, setStats] = useState<NfcStats | null>(null);
  const [tables, setTables] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Register form state
  const [serial, setSerial] = useState("");
  const [registerNotes, setRegisterNotes] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registerMsg, setRegisterMsg] = useState("");

  // Assign state
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [assignTableId, setAssignTableId] = useState("");

  const load = async () => {
    setLoading(true);
    const [tagsRes, statsRes, tablesRes] = await Promise.all([
      fetch(`${API}/api/dashboard/nfc?restaurantId=${RESTAURANT_ID}`).then((r) => r.json()),
      fetch(`${API}/api/dashboard/nfc/stats?restaurantId=${RESTAURANT_ID}`).then((r) => r.json()),
      fetch(`${API}/api/dashboard/tables?restaurantId=${RESTAURANT_ID}`).then((r) => r.json()),
    ]);
    setTags(tagsRes as NfcTag[]);
    setStats(statsRes as NfcStats);
    setTables(((tablesRes as { tables?: TableRow[] }).tables ?? tablesRes) as TableRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const register = async () => {
    if (!serial) return;
    setRegistering(true);
    setRegisterMsg("");
    const res = await fetch(`${API}/api/dashboard/nfc/register?restaurantId=${RESTAURANT_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serialNumber: serial, notes: registerNotes || undefined }),
    });
    if (res.ok) {
      setRegisterMsg("Tag registered successfully");
      setSerial("");
      setRegisterNotes("");
      load();
    } else {
      const e = await res.json() as { message?: string };
      setRegisterMsg(e.message ?? "Failed to register");
    }
    setRegistering(false);
  };

  const assign = async (id: string, tableId: string) => {
    await fetch(`${API}/api/dashboard/nfc/${id}/assign?restaurantId=${RESTAURANT_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableId }),
    });
    setAssigningId(null);
    setAssignTableId("");
    load();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API}/api/dashboard/nfc/${id}/status?restaurantId=${RESTAURANT_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">NFC Management</h1>
        {stats && (
          <span className="text-sm text-slate-500">{stats.total} tags registered</span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b bg-white px-6 py-2">
        {(["tags", "register", "stats"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              tab === t ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : tab === "tags" ? (
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Serial Number</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Table</th>
                  <th className="px-4 py-3">Scans</th>
                  <th className="px-4 py-3">Last Scan</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{tag.serialNumber}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[tag.status] ?? "bg-slate-100"}`}>
                        {tag.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {tag.tableId ? (tables.find((t) => t.id === tag.tableId)?.number ?? tag.tableId) : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{tag.scanCount}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {tag.lastScanned ? new Date(tag.lastScanned).toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-4 py-3">
                      {assigningId === tag.id ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={assignTableId}
                            onChange={(e) => setAssignTableId(e.target.value)}
                            className="rounded-lg border px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
                          >
                            <option value="">Select table</option>
                            {tables.map((t) => (
                              <option key={t.id} value={t.id}>
                                Table {t.number}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => assignTableId && assign(tag.id, assignTableId)}
                            className="rounded-lg bg-brand px-2 py-1 text-xs font-bold text-white"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setAssigningId(null)}
                            className="rounded-lg border px-2 py-1 text-xs text-slate-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setAssigningId(tag.id)}
                            className="rounded-lg border px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Assign
                          </button>
                          {tag.status !== "DAMAGED" && (
                            <button
                              onClick={() => updateStatus(tag.id, "DAMAGED")}
                              className="rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                            >
                              Damaged
                            </button>
                          )}
                          {tag.status !== "LOST" && (
                            <button
                              onClick={() => updateStatus(tag.id, "LOST")}
                              className="rounded-lg border border-orange-200 px-2 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-50"
                            >
                              Lost
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {tags.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-400">
                      No NFC tags registered yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : tab === "register" ? (
          <div className="max-w-md space-y-4">
            <div className="rounded-xl border bg-white p-5 space-y-4">
              <p className="font-semibold text-slate-800">Register New NFC Tag</p>
              {registerMsg && (
                <p className={`text-sm font-semibold ${registerMsg.includes("success") ? "text-green-600" : "text-red-600"}`}>
                  {registerMsg}
                </p>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Serial Number *</label>
                <input
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  placeholder="e.g. 04:AB:12:CD:EF:01"
                  className="w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Notes</label>
                <input
                  value={registerNotes}
                  onChange={(e) => setRegisterNotes(e.target.value)}
                  placeholder="Optional — e.g. Batch 2024-Q1"
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <button
                onClick={register}
                disabled={registering || !serial}
                className="w-full rounded-xl bg-brand py-2.5 text-sm font-bold text-white disabled:opacity-50 hover:opacity-90"
              >
                {registering ? "Registering…" : "Register Tag"}
              </button>
            </div>
          </div>
        ) : (
          stats && (
            <div className="grid grid-cols-2 gap-4 max-w-xl sm:grid-cols-3">
              {[
                { label: "Total", value: stats.total, color: "text-slate-700" },
                { label: "Unassigned", value: stats.unassigned, color: "text-slate-500" },
                { label: "Assigned", value: stats.assigned, color: "text-blue-600" },
                { label: "Active", value: stats.active, color: "text-green-600" },
                { label: "Damaged / Lost", value: stats.damaged, color: "text-red-600" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border bg-white p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{stat.label}</p>
                  <p className={`mt-1 text-3xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
