"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

type Tab = "program" | "tiers" | "referrals" | "customers";

interface LoyaltyProgram { type: string; pointsPerEgp: number | null; pointsValue: number | null; birthdayBonus: number | null; referralEnabled: boolean; referrerBonus: number | null; referredBonus: number | null; isActive: boolean }
interface LoyaltyTier { id: string; name: string; nameAr?: string; minPoints: number; multiplier: number; badgeColor: string; perks: string[] }
interface LoyaltyCustomer { customerId: string; phone: string; name?: string; points: number; tier?: { name: string; color: string } | null; walletBalance: number }

export default function LoyaltyPage() {
  const [tab, setTab] = useState<Tab>("program");
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [customers, setCustomers] = useState<LoyaltyCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/dashboard/loyalty/program?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/dashboard/loyalty/customers?restaurantId=${RID}`).then(r => r.ok ? r.json() : []),
    ]).then(([prog, custs]) => {
      setProgram(prog?.program ?? null);
      setTiers(prog?.tiers ?? []);
      setCustomers(custs ?? []);
    }).finally(() => setLoading(false));
  }, []);

  async function saveProgram() {
    if (!program) return;
    setSaving(true);
    await fetch(`${API}/api/dashboard/loyalty/program?restaurantId=${RID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program),
    }).finally(() => setSaving(false));
  }

  async function deleteTier(id: string) {
    await fetch(`${API}/api/dashboard/loyalty/tiers/${id}?restaurantId=${RID}`, { method: "DELETE" });
    setTiers(t => t.filter(x => x.id !== id));
  }

  if (loading) return <div className="flex h-32 items-center justify-center text-slate-400 text-sm">Loading…</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Loyalty Program</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white px-6 gap-1">
        {(["program", "tiers", "referrals", "customers"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${tab === t ? "border-brand text-brand" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Program Config */}
        {tab === "program" && program !== undefined && (
          <div className="max-w-lg space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-700">Program Configuration</h2>
            <label className="flex flex-col gap-1 text-sm">
              Loyalty Type
              <select value={program?.type ?? "STAMP"} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), type: e.target.value }))}
                className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none">
                <option value="STAMP">Stamp Card</option>
                <option value="POINTS">Points</option>
                <option value="HYBRID">Hybrid (Stamps + Points)</option>
              </select>
            </label>

            {(program?.type === "POINTS" || program?.type === "HYBRID") && (
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-sm">
                  Points per EGP
                  <input type="number" step="0.1" value={program?.pointsPerEgp ?? ""} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), pointsPerEgp: parseFloat(e.target.value) }))}
                    className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Birthday Bonus Points
                  <input type="number" value={program?.birthdayBonus ?? ""} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), birthdayBonus: parseInt(e.target.value) }))}
                    className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
                </label>
              </div>
            )}

            <label className="flex items-center gap-3 cursor-pointer text-sm">
              <input type="checkbox" checked={program?.isActive ?? false} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), isActive: e.target.checked }))} className="h-4 w-4 accent-brand" />
              Program Active
            </label>

            <button onClick={saveProgram} disabled={saving} className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60">
              {saving ? "Saving…" : "Save Program"}
            </button>
          </div>
        )}

        {/* Tiers */}
        {tab === "tiers" && (
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-700">Loyalty Tiers</h2>
            </div>
            {tiers.length === 0 ? (
              <p className="text-sm text-slate-400">No tiers configured. Add your first tier below.</p>
            ) : (
              <div className="space-y-3">
                {tiers.map((tier) => (
                  <div key={tier.id} className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="h-8 w-8 rounded-full shrink-0" style={{ backgroundColor: tier.badgeColor }} />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{tier.name}</p>
                      <p className="text-xs text-slate-500">From {tier.minPoints} pts · ×{tier.multiplier} multiplier</p>
                    </div>
                    <button onClick={() => deleteTier(tier.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                ))}
              </div>
            )}
            <TierForm restaurantId={RID} onCreated={(t) => setTiers(ts => [...ts, t])} />
          </div>
        )}

        {/* Referrals */}
        {tab === "referrals" && (
          <div className="max-w-lg space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-700">Referral Program</h2>
            <label className="flex items-center gap-3 cursor-pointer text-sm">
              <input type="checkbox" checked={program?.referralEnabled ?? false} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), referralEnabled: e.target.checked }))} className="h-4 w-4 accent-brand" />
              Enable referral program
            </label>
            {program?.referralEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-sm">
                  Referrer bonus pts
                  <input type="number" value={program?.referrerBonus ?? ""} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), referrerBonus: parseInt(e.target.value) }))}
                    className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Referred bonus pts
                  <input type="number" value={program?.referredBonus ?? ""} onChange={e => setProgram(p => ({ ...(p ?? {} as LoyaltyProgram), referredBonus: parseInt(e.target.value) }))}
                    className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
                </label>
              </div>
            )}
            <button onClick={saveProgram} disabled={saving} className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60">
              {saving ? "Saving…" : "Save Referral Config"}
            </button>
          </div>
        )}

        {/* Customers */}
        {tab === "customers" && (
          <div className="max-w-3xl">
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Tier</th>
                    <th className="px-4 py-3 text-right">Points</th>
                    <th className="px-4 py-3 text-right">Wallet</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {customers.map((c) => (
                    <tr key={c.customerId} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{c.name ?? "Guest"}</p>
                        <p className="text-xs text-slate-400">{c.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        {c.tier ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: c.tier.color }}>
                            {c.tier.name}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">{c.points.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-500">{Number(c.walletBalance).toFixed(2)}</td>
                    </tr>
                  ))}
                  {customers.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-slate-400">No customers yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TierForm({ restaurantId, onCreated }: { restaurantId: string; onCreated: (t: LoyaltyTier) => void }) {
  const [name, setName] = useState("");
  const [minPoints, setMinPoints] = useState(500);
  const [multiplier, setMultiplier] = useState(1.5);
  const [color, setColor] = useState("#C0A060");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name) return;
    setSaving(true);
    const res = await fetch(`${API}/api/dashboard/loyalty/tiers?restaurantId=${restaurantId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, minPoints, multiplier, badgeColor: color, perks: [] }),
    });
    if (res.ok) { onCreated(await res.json()); setName(""); }
    setSaving(false);
  }

  return (
    <div className="rounded-2xl border border-dashed bg-slate-50 p-4 space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Add Tier</p>
      <div className="grid grid-cols-4 gap-3">
        <input placeholder="Name (e.g. Gold)" value={name} onChange={e => setName(e.target.value)}
          className="col-span-2 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-brand/40 outline-none" />
        <input type="number" placeholder="Min pts" value={minPoints} onChange={e => setMinPoints(parseInt(e.target.value))}
          className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-brand/40 outline-none" />
        <input type="number" step="0.1" placeholder="Multiplier" value={multiplier} onChange={e => setMultiplier(parseFloat(e.target.value))}
          className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-brand/40 outline-none" />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs text-slate-500 flex items-center gap-2">Badge color <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-8 w-12 rounded cursor-pointer" /></label>
        <button onClick={save} disabled={saving || !name} className="ml-auto rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {saving ? "Adding…" : "Add Tier"}
        </button>
      </div>
    </div>
  );
}
