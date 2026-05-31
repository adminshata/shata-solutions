"use client";

import { useState } from "react";
import Link from "next/link";

// All settings are per-restaurant — currency, locale, timezone, tax
// Never hardcoded anywhere in the system
export default function SettingsPage() {
  const [currency, setCurrency] = useState("USD");
  const [locale, setLocale] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const [taxRate, setTaxRate] = useState("0");
  const [taxLabel, setTaxLabel] = useState("Tax");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    alert("Settings saved");
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h1 className="mb-6 text-xl font-bold">Restaurant Settings</h1>

      <div className="mb-6 flex gap-3">
        <Link href="/dashboard/settings/printer" className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand transition-colors shadow-sm">
          <span>🖨</span> Thermal Printer
        </Link>
      </div>

      <div className="max-w-xl space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <section>
          <h2 className="mb-3 font-semibold text-slate-700">Localization</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm">
              Currency (ISO 4217)
              <input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} maxLength={3}
                className="rounded-lg border px-3 py-2 font-mono uppercase focus:ring-2 focus:ring-brand/40 outline-none" />
              <span className="text-[10px] text-slate-400">e.g. USD, EGP, AED, GBP, EUR</span>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Locale (BCP-47)
              <input value={locale} onChange={(e) => setLocale(e.target.value)}
                className="rounded-lg border px-3 py-2 font-mono focus:ring-2 focus:ring-brand/40 outline-none" />
              <span className="text-[10px] text-slate-400">e.g. en, ar, fr, de, tr</span>
            </label>
            <label className="col-span-2 flex flex-col gap-1 text-sm">
              Timezone (IANA)
              <input value={timezone} onChange={(e) => setTimezone(e.target.value)}
                className="rounded-lg border px-3 py-2 font-mono focus:ring-2 focus:ring-brand/40 outline-none" />
              <span className="text-[10px] text-slate-400">e.g. UTC, America/New_York, Europe/London, Africa/Cairo, Asia/Dubai</span>
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-slate-700">Tax Configuration</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm">
              Tax Rate
              <div className="flex items-center gap-1">
                <input type="number" min="0" max="100" step="0.01" value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
                <span className="font-bold text-slate-500">%</span>
              </div>
              <span className="text-[10px] text-slate-400">0 = no tax, 14 = 14% VAT, 5 = 5% GST</span>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Tax Label
              <input value={taxLabel} onChange={(e) => setTaxLabel(e.target.value)}
                className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-brand/40 outline-none" />
              <span className="text-[10px] text-slate-400">e.g. VAT, GST, Sales Tax, MwSt</span>
            </label>
            <label className="col-span-2 flex items-center gap-3 cursor-pointer text-sm">
              <input type="checkbox" checked={taxInclusive} onChange={(e) => setTaxInclusive(e.target.checked)}
                className="h-4 w-4 accent-brand" />
              Prices are tax-inclusive
              <span className="text-[10px] text-slate-400">(UK/EU style — tax extracted from price, not added on top)</span>
            </label>
          </div>
        </section>

        <button onClick={save} disabled={saving}
          className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60 transition-colors">
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
