"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const ORG_ID = "REPLACE_WITH_ORG_ID";

interface WLConfig { appName: string; appNameAr: string; logoUrl: string; faviconUrl: string; primaryColor: string; secondaryColor: string; customDomain: string; hideShataLogo: boolean; isActive: boolean }

const defaults: WLConfig = { appName: "", appNameAr: "", logoUrl: "", faviconUrl: "", primaryColor: "#FF4500", secondaryColor: "#00B4D8", customDomain: "", hideShataLogo: false, isActive: false };

export default function WhiteLabelPage() {
  const [config, setConfig] = useState<WLConfig>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/dashboard/settings/white-label?orgId=${ORG_ID}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setConfig({ ...defaults, ...d }); });
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch(`${API}/api/dashboard/settings/white-label?orgId=${ORG_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
    setSaving(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">White-label Branding</h1>
          <p className="text-xs text-slate-400 mt-0.5">Enterprise plan only — customize your customer app appearance</p>
        </div>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">ENTERPRISE</span>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* App Identity */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">App Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm">App Name (EN)<input value={config.appName} onChange={e => setConfig(c => ({ ...c, appName: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" /></label>
            <label className="flex flex-col gap-1 text-sm">App Name (AR)<input value={config.appNameAr} onChange={e => setConfig(c => ({ ...c, appNameAr: e.target.value }))} className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" dir="rtl" /></label>
            <label className="flex flex-col gap-1 text-sm col-span-2">Logo URL (from R2)<input value={config.logoUrl} onChange={e => setConfig(c => ({ ...c, logoUrl: e.target.value }))} placeholder="https://media.shataos.com/logos/..." className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none font-mono text-xs" /></label>
            <label className="flex flex-col gap-1 text-sm col-span-2">Favicon URL<input value={config.faviconUrl} onChange={e => setConfig(c => ({ ...c, faviconUrl: e.target.value }))} placeholder="https://media.shataos.com/favicons/..." className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none font-mono text-xs" /></label>
          </div>
        </section>

        {/* Colors */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">Brand Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm">
              Primary Color
              <div className="flex items-center gap-3">
                <input type="color" value={config.primaryColor} onChange={e => setConfig(c => ({ ...c, primaryColor: e.target.value }))} className="h-10 w-16 rounded cursor-pointer border" />
                <input value={config.primaryColor} onChange={e => setConfig(c => ({ ...c, primaryColor: e.target.value }))} className="flex-1 rounded-lg border px-3 py-2 font-mono text-xs focus:ring-2 focus:ring-brand/40 outline-none" />
              </div>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Secondary Color
              <div className="flex items-center gap-3">
                <input type="color" value={config.secondaryColor} onChange={e => setConfig(c => ({ ...c, secondaryColor: e.target.value }))} className="h-10 w-16 rounded cursor-pointer border" />
                <input value={config.secondaryColor} onChange={e => setConfig(c => ({ ...c, secondaryColor: e.target.value }))} className="flex-1 rounded-lg border px-3 py-2 font-mono text-xs focus:ring-2 focus:ring-brand/40 outline-none" />
              </div>
            </label>
          </div>

          {/* Live preview swatch */}
          <div className="rounded-xl border p-4 bg-slate-50">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <div className="flex items-center gap-3">
              <button className="rounded-xl px-4 py-2 text-sm font-bold text-white" style={{ backgroundColor: config.primaryColor }}>Order Now</button>
              <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: config.secondaryColor }}>New</span>
              <span className="text-sm font-bold" style={{ color: config.primaryColor }}>29.99 EGP</span>
            </div>
          </div>
        </section>

        {/* Custom Domain */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">Custom Domain</h2>
          <label className="flex flex-col gap-1 text-sm">
            Domain
            <input value={config.customDomain} onChange={e => setConfig(c => ({ ...c, customDomain: e.target.value }))} placeholder="order.mybrand.com" className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none font-mono" />
          </label>
          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
            <p className="font-semibold">DNS Setup:</p>
            <p>Add a CNAME record in your DNS provider:</p>
            <p className="font-mono bg-white rounded p-2 text-slate-800">CNAME → customer.shataos.com</p>
          </div>
        </section>

        {/* Shata branding */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-700">Shata Branding</h2>
          <label className="flex items-center gap-3 cursor-pointer text-sm">
            <input type="checkbox" checked={config.hideShataLogo} onChange={e => setConfig(c => ({ ...c, hideShataLogo: e.target.checked }))} className="h-4 w-4 accent-brand" />
            Hide "Powered by Shata" footer
            <span className="text-xs text-slate-400">(Enterprise only)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer text-sm">
            <input type="checkbox" checked={config.isActive} onChange={e => setConfig(c => ({ ...c, isActive: e.target.checked }))} className="h-4 w-4 accent-brand" />
            Activate white-label (applies to all customer sessions)
          </label>
        </section>

        <button onClick={save} disabled={saving}
          className="rounded-xl bg-brand px-8 py-3 font-bold text-white hover:bg-brand-dark disabled:opacity-60 transition-colors">
          {saved ? "Saved!" : saving ? "Saving…" : "Save White-label Config"}
        </button>
      </div>
    </div>
  );
}
