"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

interface Ingredient { id: string; name: string; nameAr?: string; unit: string; currentStock: number; minStock: number; costPerUnit: number; status: "OK" | "LOW" | "OUT" }
interface Stats { total: number; low: number; out: number }

const STATUS_CONFIG = {
  OK:  { color: "text-green-600 bg-green-50",  dot: "bg-green-500",  label: "OK"  },
  LOW: { color: "text-yellow-700 bg-yellow-50", dot: "bg-yellow-400", label: "Low" },
  OUT: { color: "text-red-600 bg-red-50",       dot: "bg-red-500",   label: "Out" },
};

export default function InventoryPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, low: 0, out: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [restockId, setRestockId] = useState<string | null>(null);
  const [restockQty, setRestockQty] = useState("10");
  const [form, setForm] = useState({ name: "", nameAr: "", unit: "kg", currentStock: "10", minStock: "2", costPerUnit: "1" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/dashboard/inventory?restaurantId=${RID}`).then(r => r.ok ? r.json() : []),
      fetch(`${API}/api/dashboard/inventory/stats?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
    ]).then(([ing, s]) => { setIngredients(ing ?? []); if (s) setStats(s); })
      .finally(() => setLoading(false));
  }, []);

  async function create() {
    setSaving(true);
    const res = await fetch(`${API}/api/dashboard/inventory?restaurantId=${RID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, currentStock: parseFloat(form.currentStock), minStock: parseFloat(form.minStock), costPerUnit: parseFloat(form.costPerUnit) }),
    });
    if (res.ok) { const i = await res.json(); setIngredients(prev => [...prev, i]); setShowForm(false); setStats(s => ({ ...s, total: s.total + 1 })); }
    setSaving(false);
  }

  async function doRestock(id: string) {
    const qty = parseFloat(restockQty);
    if (isNaN(qty) || qty <= 0) return;
    const res = await fetch(`${API}/api/dashboard/inventory/${id}/restock?restaurantId=${RID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });
    if (res.ok) {
      const updated = await res.json();
      setIngredients(prev => prev.map(i => i.id === id ? { ...i, currentStock: updated.currentStock, status: updated.currentStock <= 0 ? "OUT" : updated.currentStock < i.minStock ? "LOW" : "OK" } : i));
    }
    setRestockId(null);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Inventory</h1>
        <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white">+ Add Ingredient</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Ingredients", val: stats.total, cls: "text-slate-900" },
            { label: "Low Stock", val: stats.low, cls: stats.low > 0 ? "text-yellow-600" : "text-slate-900" },
            { label: "Out of Stock", val: stats.out, cls: stats.out > 0 ? "text-red-600" : "text-slate-900" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{s.label}</p>
              <p className={`mt-2 text-3xl font-black ${s.cls}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Create form */}
        {showForm && (
          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-slate-700">Add Ingredient</h2>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex flex-col gap-1 text-sm col-span-1">Name<input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" /></label>
              <label className="flex flex-col gap-1 text-sm col-span-1">Name (AR)<input value={form.nameAr} onChange={e => setForm(f => ({ ...f, nameAr: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" dir="rtl" /></label>
              <label className="flex flex-col gap-1 text-sm col-span-1">Unit<input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="kg, L, pcs" className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" /></label>
              <label className="flex flex-col gap-1 text-sm">Current Stock<input type="number" value={form.currentStock} onChange={e => setForm(f => ({ ...f, currentStock: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" /></label>
              <label className="flex flex-col gap-1 text-sm">Min Stock<input type="number" value={form.minStock} onChange={e => setForm(f => ({ ...f, minStock: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" /></label>
              <label className="flex flex-col gap-1 text-sm">Cost/Unit<input type="number" step="0.01" value={form.costPerUnit} onChange={e => setForm(f => ({ ...f, costPerUnit: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" /></label>
            </div>
            <div className="flex gap-3">
              <button onClick={create} disabled={saving || !form.name} className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving…" : "Add"}</button>
              <button onClick={() => setShowForm(false)} className="rounded-xl border px-6 py-2.5 text-sm font-medium text-slate-600">Cancel</button>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading…</div> : (
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Ingredient</th>
                  <th className="px-4 py-3 text-right">Stock</th>
                  <th className="px-4 py-3 text-right">Min</th>
                  <th className="px-4 py-3 text-right">Cost/Unit</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {ingredients.map(ing => {
                  const cfg = STATUS_CONFIG[ing.status];
                  return (
                    <tr key={ing.id} className={`${ing.status === "LOW" ? "bg-yellow-50/30" : ing.status === "OUT" ? "bg-red-50/30" : "hover:bg-slate-50"}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{ing.name}</p>
                        {ing.nameAr && <p className="text-xs text-slate-400" dir="rtl">{ing.nameAr}</p>}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold">{ing.currentStock.toFixed(2)} <span className="text-xs text-slate-400">{ing.unit}</span></td>
                      <td className="px-4 py-3 text-right text-xs text-slate-400">{ing.minStock} {ing.unit}</td>
                      <td className="px-4 py-3 text-right text-xs text-slate-400">{ing.costPerUnit.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {restockId === ing.id ? (
                          <span className="flex items-center gap-2 justify-end">
                            <input type="number" value={restockQty} onChange={e => setRestockQty(e.target.value)} className="w-16 rounded-lg border px-2 py-1 text-xs focus:ring-2 focus:ring-brand/40 outline-none" />
                            <button onClick={() => doRestock(ing.id)} className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">Add</button>
                            <button onClick={() => setRestockId(null)} className="text-xs text-slate-400">✕</button>
                          </span>
                        ) : (
                          <button onClick={() => setRestockId(ing.id)} className="text-xs text-brand hover:underline">Restock</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {ingredients.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-slate-400">No ingredients yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
