"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

const TYPE_LABELS: Record<string, string> = {
  ASSISTANCE: "🙋 Help",
  CHECK_PLEASE: "🧾 Bill",
  WATER: "💧 Water",
  MORE_NAPKINS: "🧻 Napkins",
};

interface WaiterCall {
  id: string;
  type: string;
  status: "PENDING" | "ACKNOWLEDGED" | "RESOLVED";
  createdAt: string;
  resolvedAt?: string;
  session: { table: { number: string } };
}

export default function WaiterCallsPage() {
  const [calls, setCalls] = useState<WaiterCall[]>([]);
  const [stats, setStats] = useState<{ total: number; avgResponseMs: number | null }>({ total: 0, avgResponseMs: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/dashboard/waiter-calls/active?restaurantId=${RID}`).then(r => r.ok ? r.json() : []),
      fetch(`${API}/api/dashboard/waiter-calls?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
    ]).then(([active, history]) => {
      setCalls(active ?? []);
      if (history) setStats({ total: history.total, avgResponseMs: history.avgResponseMs });
    }).finally(() => setLoading(false));
  }, []);

  async function acknowledge(id: string) {
    await fetch(`${API}/api/dashboard/waiter-calls/${id}/acknowledge?restaurantId=${RID}`, { method: "PATCH" });
    setCalls(c => c.map(x => x.id === id ? { ...x, status: "ACKNOWLEDGED" } : x));
  }

  async function resolve(id: string) {
    await fetch(`${API}/api/dashboard/waiter-calls/${id}/resolve?restaurantId=${RID}`, { method: "PATCH" });
    setCalls(c => c.filter(x => x.id !== id));
  }

  const pending = calls.filter(c => c.status === "PENDING");
  const acknowledged = calls.filter(c => c.status === "ACKNOWLEDGED");

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-slate-900">Waiter Calls</h1>
          {pending.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
              {pending.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <span>Total calls: <strong className="text-slate-900">{stats.total}</strong></span>
          {stats.avgResponseMs && (
            <span>Avg response: <strong className="text-slate-900">{stats.avgResponseMs}s</strong></span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading…</div>
        ) : (
          <>
            {pending.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-red-500">Pending ({pending.length})</h2>
                <div className="space-y-2">
                  {pending.map(call => (
                    <CallRow key={call.id} call={call} onAcknowledge={() => acknowledge(call.id)} onResolve={() => resolve(call.id)} />
                  ))}
                </div>
              </section>
            )}

            {acknowledged.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-yellow-500">Acknowledged ({acknowledged.length})</h2>
                <div className="space-y-2">
                  {acknowledged.map(call => (
                    <CallRow key={call.id} call={call} onResolve={() => resolve(call.id)} />
                  ))}
                </div>
              </section>
            )}

            {pending.length === 0 && acknowledged.length === 0 && (
              <div className="flex h-32 items-center justify-center text-sm text-slate-400">
                No active calls — all clear.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CallRow({ call, onAcknowledge, onResolve }: { call: WaiterCall; onAcknowledge?: () => void; onResolve: () => void }) {
  const elapsed = Math.floor((Date.now() - new Date(call.createdAt).getTime()) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className={`flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm ${call.status === "PENDING" ? "border-red-200" : "border-yellow-200"}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${call.status === "PENDING" ? "bg-red-50" : "bg-yellow-50"}`}>
        {TYPE_LABELS[call.type]?.split(" ")[0]}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900">Table {call.session.table.number} — {TYPE_LABELS[call.type]?.split(" ").slice(1).join(" ")}</p>
        <p className="text-xs text-slate-400">{mins > 0 ? `${mins}m ` : ""}{secs}s ago</p>
      </div>
      <div className="flex gap-2">
        {call.status === "PENDING" && onAcknowledge && (
          <button onClick={onAcknowledge} className="rounded-lg bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-700 hover:bg-yellow-200">
            Acknowledge
          </button>
        )}
        <button onClick={onResolve} className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-200">
          Resolve
        </button>
      </div>
    </div>
  );
}
