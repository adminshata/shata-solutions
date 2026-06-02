"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface PricingRule {
  id: string;
  name: string;
  nameAr?: string;
  type: "PERCENTAGE_OFF" | "FIXED_OFF" | "FIXED_PRICE";
  value: number;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const emptyRule: Omit<PricingRule, "id"> = {
  name: "", nameAr: "", type: "PERCENTAGE_OFF", value: 20,
  daysOfWeek: [0, 1, 2, 3, 4, 5, 6], startTime: "15:00", endTime: "18:00", isActive: true,
};

export default function PricingPage() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [form, setForm] = useState({ ...emptyRule });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/dashboard/pricing?restaurantId=${RID}`)
      .then(r => r.ok ? r.json() : [])
      .then(setRules)
      .finally(() => setLoading(false));
  }, []);

  function isActive(rule: PricingRule) {
    const now = new Date();
    const day = now.getDay();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return rule.isActive && rule.daysOfWeek.includes(day) && time >= rule.startTime && time <= rule.endTime;
  }

  async function save() {
    setSaving(true);
    const res = await fetch(`${API}/api/dashboard/pricing?restaurantId=${RID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { const newRule = await res.json(); setRules(r => [newRule, ...r]); setForm({ ...emptyRule }); setShowForm(false); }
    setSaving(false);
  }

  async function toggle(id: string, isActive: boolean) {
    await fetch(`${API}/api/dashboard/pricing/${id}/toggle?restaurantId=${RID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive }),
    });
    setRules(r => r.map(x => x.id === id ? { ...x, isActive } : x));
  }

  async function remove(id: string) {
    await fetch(`${API}/api/dashboard/pricing/${id}?restaurantId=${RID}`, { method: "DELETE" });
    setRules(r => r.filter(x => x.id !== id));
  }

  const activeNow = rules.filter(isActive);

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Dynamic Pricing</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark">
          + New Rule
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Active now banner */}
        {activeNow.length > 0 && (
          <div className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3">
            <span className="text-lg">🏷️</span>
            <p className="text-sm font-semibold text-yellow-800">
              {activeNow.map(r => r.name).join(", ")} {activeNow.length === 1 ? "is" : "are"} active now
              — ends at {activeNow[0]?.endTime}
            </p>
          </div>
        )}

        {/* Create form */}
        {showForm && (
          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-slate-700">New Pricing Rule</h2>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 text-sm">
                Name (EN)
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" placeholder="Happy Hour" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Name (AR)
                <input value={form.nameAr ?? ""} onChange={e => setForm(f => ({ ...f, nameAr: e.target.value }))}
                  className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" placeholder="ساعة سعيدة" dir="rtl" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Type
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as never }))}
                  className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none">
                  <option value="PERCENTAGE_OFF">% Off</option>
                  <option value="FIXED_OFF">Fixed Amount Off</option>
                  <option value="FIXED_PRICE">Fixed Price</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Value
                <input type="number" step="0.01" value={form.value} onChange={e => setForm(f => ({ ...f, value: parseFloat(e.target.value) }))}
                  className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
                <span className="text-[10px] text-slate-400">{form.type === "PERCENTAGE_OFF" ? "%" : "amount"}</span>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Start time
                <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
                  className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                End time
                <input type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
                  className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
              </label>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-600">Days of week</p>
              <div className="flex gap-2 flex-wrap">
                {DAYS.map((d, i) => (
                  <button key={i} type="button"
                    onClick={() => setForm(f => ({ ...f, daysOfWeek: f.daysOfWeek.includes(i) ? f.daysOfWeek.filter(x => x !== i) : [...f.daysOfWeek, i] }))}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${form.daysOfWeek.includes(i) ? "border-brand bg-brand text-white" : "border-slate-200 text-slate-500"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={save} disabled={saving || !form.name}
                className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                {saving ? "Saving…" : "Create Rule"}
              </button>
              <button onClick={() => setShowForm(false)} className="rounded-xl border px-6 py-2.5 text-sm font-medium text-slate-600">Cancel</button>
            </div>
          </div>
        )}

        {/* Rules table */}
        {loading ? <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading…</div> : (
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Rule</th>
                  <th className="px-4 py-3 text-left">Discount</th>
                  <th className="px-4 py-3 text-left">Schedule</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {rules.map(rule => (
                  <tr key={rule.id} className={`hover:bg-slate-50 ${isActive(rule) ? "bg-yellow-50/50" : ""}`}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">{rule.name}</p>
                      {rule.nameAr && <p className="text-xs text-slate-400" dir="rtl">{rule.nameAr}</p>}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">
                      {rule.type === "PERCENTAGE_OFF" ? `-${rule.value}%` : rule.type === "FIXED_OFF" ? `-${rule.value}` : `=${rule.value}`}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {rule.startTime}–{rule.endTime}<br />
                      <span className="text-[10px]">{rule.daysOfWeek.map(d => DAYS[d]).join(", ")}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggle(rule.id, !rule.isActive)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${rule.isActive ? "bg-brand" : "bg-slate-200"}`}>
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${rule.isActive ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => remove(rule.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
                {rules.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-slate-400">No pricing rules yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
