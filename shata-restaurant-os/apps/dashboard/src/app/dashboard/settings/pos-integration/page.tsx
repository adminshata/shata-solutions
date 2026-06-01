"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

const PROVIDERS = ["FOODICS", "IIKO", "LIGHTSPEED", "CUSTOM"] as const;
type Provider = (typeof PROVIDERS)[number];

interface PosConfig { id?: string; provider: Provider; outboundUrl: string; inboundUrl: string; webhookSecret: string; isActive: boolean; lastSyncAt?: string }

export default function PosIntegrationPage() {
  const [config, setConfig] = useState<PosConfig>({ provider: "FOODICS", outboundUrl: "", inboundUrl: "", webhookSecret: "", isActive: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/dashboard/settings/pos-integration?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/dashboard/settings/pos-integration/webhook-url?restaurantId=${RID}`).then(r => r.ok ? r.json() : null),
    ]).then(([cfg, urlData]) => {
      if (cfg) setConfig({ ...config, ...cfg });
      if (urlData?.url) setConfig(c => ({ ...c, inboundUrl: urlData.url }));
    }).finally(() => setLoading(false));
  }, []);

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

      <div className="max-w-xl space-y-6">
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
      </div>
    </div>
  );
}
