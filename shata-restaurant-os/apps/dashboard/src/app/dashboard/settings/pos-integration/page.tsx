"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

const PROVIDERS = ["FOODICS", "IIKO", "LIGHTSPEED", "CUSTOM"] as const;
type Provider = (typeof PROVIDERS)[number];
type Tab = "config" | "mapping";

interface PosConfig { id?: string; provider: Provider; outboundUrl: string; inboundUrl: string; webhookSecret: string; isActive: boolean; lastSyncAt?: string }
interface MappingItem { id: string; externalSku: string; externalName: string; occurrences: number; productId?: string | null; product?: { id: string; name: string } | null }
interface MappingData { unmapped: MappingItem[]; mapped: MappingItem[]; ignored: MappingItem[] }

export default function PosIntegrationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("config");
  const [config, setConfig] = useState<PosConfig>({ provider: "FOODICS", outboundUrl: "", inboundUrl: "", webhookSecret: "", isActive: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mapping, setMapping] = useState<MappingData>({ unmapped: [], mapped: [], ignored: [] });
  const [mapInputs, setMapInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/dashboard/settings/pos-integration?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/dashboard/settings/pos-integration/webhook-url?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/dashboard/pos/unmapped?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
    ]).then(([cfg, urlData, mapData]) => {
      if (cfg) setConfig(c => ({ ...c, ...cfg }));
      if (urlData?.url) setConfig(c => ({ ...c, inboundUrl: urlData.url }));
      if (mapData) setMapping(mapData);
    }).finally(() => setLoading(false));
  }, []);

  async function doMap(itemId: string) {
    const productId = mapInputs[itemId];
    if (!productId) return;
    const res = await fetch(`${API}/api/dashboard/pos/map/${itemId}?restaurantId=${RID}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId }) });
    if (res.ok) { const updated = await res.json(); setMapping(m => ({ ...m, unmapped: m.unmapped.filter(i => i.id !== itemId), mapped: [...m.mapped, updated] })); }
  }

  async function doIgnore(itemId: string) {
    await fetch(`${API}/api/dashboard/pos/ignore/${itemId}?restaurantId=${RID}`, { method: "PATCH" });
    setMapping(m => ({ unmapped: m.unmapped.filter(i => i.id !== itemId), mapped: m.mapped.filter(i => i.id !== itemId), ignored: [...m.ignored, m.unmapped.find(i => i.id === itemId) ?? m.mapped.find(i => i.id === itemId)!] }));
  }

  async function doUnmap(itemId: string) {
    await fetch(`${API}/api/dashboard/pos/unmap/${itemId}?restaurantId=${RID}`, { method: "PATCH" });
    const item = mapping.mapped.find(i => i.id === itemId);
    if (item) setMapping(m => ({ ...m, mapped: m.mapped.filter(i => i.id !== itemId), unmapped: [{ ...item, productId: null, product: null }, ...m.unmapped] }));
  }

  async function save() {
    setSaving(true);
    await fetch(`${API}/api/dashboard/settings/pos-integration?restaurantId=${RID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: config.provider, outboundUrl: config.outboundUrl, isActive: config.isActive }),
    }).finally(() => setSaving(false));
  }

  function copyUrl() {
    navigator.clipboard.writeText(config.inboundUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading…</div>;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">POS Integration</h1>
        <div className={`rounded-full px-3 py-1 text-xs font-bold ${config.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {config.isActive ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 gap-1">
        {(["config", "mapping"] as Tab[]).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === t ? "border-brand text-brand" : "border-transparent text-slate-500"}`}>
            {t === "config" ? "Configuration" : `Product Mapping ${mapping.unmapped.length > 0 ? `(${mapping.unmapped.length} unmapped)` : ""}`}
          </button>
        ))}
      </div>

      {activeTab === "mapping" && (
        <div className="max-w-3xl space-y-6">
          <div className="flex gap-4 text-sm font-semibold">
            <span className="rounded-full bg-red-100 text-red-700 px-3 py-1">{mapping.unmapped.length} unmapped</span>
            <span className="rounded-full bg-green-100 text-green-700 px-3 py-1">{mapping.mapped.length} mapped</span>
            <span className="rounded-full bg-slate-100 text-slate-600 px-3 py-1">{mapping.ignored.length} ignored</span>
          </div>

          {mapping.unmapped.length > 0 && (
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Unmapped Items</h3>
              <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                    <tr><th className="px-4 py-2 text-left">SKU / Name</th><th className="px-4 py-2 text-right">Occurrences</th><th className="px-4 py-2">Map to Product ID</th><th className="px-4 py-2" /></tr>
                  </thead>
                  <tbody className="divide-y">
                    {mapping.unmapped.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-2">
                          <p className="font-medium text-slate-900">{item.externalName}</p>
                          <p className="text-xs text-slate-400 font-mono">{item.externalSku}</p>
                        </td>
                        <td className="px-4 py-2 text-right text-xs text-slate-400">{item.occurrences}×</td>
                        <td className="px-4 py-2">
                          <input value={mapInputs[item.id] ?? ""} onChange={e => setMapInputs(mi => ({ ...mi, [item.id]: e.target.value }))}
                            placeholder="Shata product ID…" className="w-full rounded-lg border px-2 py-1 text-xs font-mono focus:ring-2 focus:ring-brand/40 outline-none" />
                        </td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex gap-1 justify-end">
                            <button onClick={() => doMap(item.id)} disabled={!mapInputs[item.id]} className="text-xs rounded-lg bg-brand/10 px-2 py-1 font-semibold text-brand disabled:opacity-40">Map</button>
                            <button onClick={() => doIgnore(item.id)} className="text-xs rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-500">Ignore</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {mapping.mapped.length > 0 && (
            <section>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Mapped Items</h3>
              <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                    <tr><th className="px-4 py-2 text-left">External</th><th className="px-4 py-2 text-left">→ Shata Product</th><th className="px-4 py-2" /></tr>
                  </thead>
                  <tbody className="divide-y">
                    {mapping.mapped.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-2 text-slate-900">{item.externalName}</td>
                        <td className="px-4 py-2 text-green-700 font-medium">{item.product?.name ?? item.productId}</td>
                        <td className="px-4 py-2 text-right"><button onClick={() => doUnmap(item.id)} className="text-xs text-red-400 hover:text-red-600">Unmap</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}

      {activeTab === "config" && <div className="max-w-xl space-y-6">
        {/* Provider */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">POS Provider</h2>
          <div className="grid grid-cols-2 gap-3">
            {PROVIDERS.map(p => (
              <button key={p} onClick={() => setConfig(c => ({ ...c, provider: p }))}
                className={`rounded-xl border p-3 text-sm font-semibold transition-colors ${config.provider === p ? "border-brand bg-brand/5 text-brand" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Inbound webhook */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">Inbound Webhook (POS → Shata)</h2>
          <p className="text-xs text-slate-500">Copy this URL into your POS system. Send orders as POST with <code className="bg-slate-100 px-1 rounded">X-Pos-Secret</code> header.</p>
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 border px-3 py-2">
            <code className="flex-1 text-xs text-slate-700 break-all">{config.inboundUrl || "Configure restaurant ID to generate URL"}</code>
            <button onClick={copyUrl} className="shrink-0 text-xs font-semibold text-brand hover:underline">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {config.webhookSecret && (
            <div>
              <p className="text-xs text-slate-500 mb-1">Webhook Secret</p>
              <code className="block rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700 break-all">{config.webhookSecret}</code>
            </div>
          )}
        </section>

        {/* Outbound webhook */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">Outbound Webhook (Shata → POS)</h2>
          <p className="text-xs text-slate-500">Shata will POST to this URL on order.placed and payment.completed events.</p>
          <label className="flex flex-col gap-1 text-sm">
            Your POS webhook URL
            <input value={config.outboundUrl} onChange={e => setConfig(c => ({ ...c, outboundUrl: e.target.value }))}
              placeholder="https://your-pos.com/webhooks/shata"
              className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none font-mono text-xs" />
          </label>
          <div className="rounded-xl bg-slate-50 border p-3 text-xs text-slate-600">
            <p className="font-semibold mb-1">Events fired:</p>
            <ul className="list-disc ml-4 space-y-0.5">
              <li>order.placed — when order is created</li>
              <li>payment.completed — when payment succeeds</li>
              <li>inventory.low — when ingredient hits min threshold</li>
            </ul>
            <p className="mt-2 font-semibold">Retry policy: 3 attempts with exponential backoff (1s, 2s, 4s)</p>
          </div>
        </section>

        {/* Status */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
          <h2 className="font-semibold text-slate-700">Status</h2>
          <label className="flex items-center gap-3 cursor-pointer text-sm">
            <input type="checkbox" checked={config.isActive} onChange={e => setConfig(c => ({ ...c, isActive: e.target.checked }))} className="h-4 w-4 accent-brand" />
            Enable POS integration
          </label>
          {config.lastSyncAt && (
            <p className="text-xs text-slate-400">Last sync: {new Date(config.lastSyncAt).toLocaleString("en")}</p>
          )}
        </section>

        <button onClick={save} disabled={saving} className="rounded-xl bg-brand px-8 py-3 font-bold text-white hover:bg-brand-dark disabled:opacity-60">
          {saving ? "Saving…" : "Save Configuration"}
        </button>
      </div>}
    </div>
  );
}
