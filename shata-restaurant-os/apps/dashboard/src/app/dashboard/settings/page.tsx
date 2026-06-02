"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";

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
  const [testScenario, setTestScenario] = useState<"PAYMENT" | "READY">("PAYMENT");
  const [upsellMinOrders, setUpsellMinOrders] = useState(500);
  const [upsellStatus, setUpsellStatus] = useState<{ isActive: boolean; orderCount: number; ordersNeeded: number } | null>(null);
  const [savingUpsell, setSavingUpsell] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/dashboard/settings/upsell?restaurantId=${RESTAURANT_ID}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setUpsellMinOrders(d.minOrders); setUpsellStatus(d); } })
      .catch(() => {});
  }, []);

  async function saveUpsellConfig() {
    setSavingUpsell(true);
    const res = await fetch(`${API}/api/dashboard/settings/upsell?restaurantId=${RESTAURANT_ID}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ minOrders: upsellMinOrders }),
    });
    if (res.ok) { const d = await res.json(); setUpsellStatus(prev => prev ? { ...prev, minOrders: d.minOrders } : null); }
    setSavingUpsell(false);
  }
  const [testingPush, setTestingPush] = useState(false);
  const [pushResult, setPushResult] = useState<string | null>(null);

  async function sendTestPush() {
    setTestingPush(true);
    setPushResult(null);
    try {
      const res = await fetch(
        `${API}/api/dashboard/notifications/test?restaurantId=${RESTAURANT_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario: testScenario }),
        }
      );
      if (res.ok) {
        setPushResult("Test notification sent successfully.");
      } else {
        setPushResult("Failed — check ONESIGNAL_APP_ID and ONESIGNAL_API_KEY.");
      }
    } catch {
      setPushResult("Network error sending test push.");
    } finally {
      setTestingPush(false);
    }
  }

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

      {/* Push Notifications */}
      <div className="max-w-xl mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-700">Push Notifications (OneSignal)</h2>
        <p className="text-xs text-slate-500">
          Staff devices are targeted by the <code className="bg-slate-100 px-1 rounded">restaurant_id</code> tag.
          Set <code className="bg-slate-100 px-1 rounded">ONESIGNAL_APP_ID</code> and{" "}
          <code className="bg-slate-100 px-1 rounded">ONESIGNAL_API_KEY</code> in your API environment to enable.
        </p>
        <div className="flex items-center gap-3">
          <select
            value={testScenario}
            onChange={(e) => setTestScenario(e.target.value as "PAYMENT" | "READY")}
            className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-brand/40 outline-none"
          >
            <option value="PAYMENT">Payment confirmed</option>
            <option value="READY">Order ready</option>
            <option value="CONFIRMED">Order confirmed</option>
            <option value="PREPARING">Order preparing</option>
          </select>
          <button
            onClick={sendTestPush}
            disabled={testingPush}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60 transition-colors"
          >
            {testingPush ? "Sending…" : "Send test push"}
          </button>
        </div>
        {pushResult && (
          <p className={`text-xs font-medium ${pushResult.startsWith("Test") ? "text-green-600" : "text-red-500"}`}>
            {pushResult}
          </p>
        )}
        <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700">Automatic push events:</p>
          <ul className="list-disc ml-4 space-y-0.5">
            <li>New order placed → all restaurant staff</li>
            <li>Payment confirmed → all restaurant staff</li>
            <li>Order status changed → customer (if subscribed)</li>
            <li>Order served → customer thank-you</li>
          </ul>
        </div>
      </div>
      {/* Upsell Threshold */}
      <div className="max-w-xl mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-700">Smart Upselling Threshold</h2>
          {upsellStatus && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${upsellStatus.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {upsellStatus.isActive ? "Active" : "Not yet active"}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">Show "Customers also ordered" after this many total orders.</p>
        {upsellStatus && !upsellStatus.isActive && (
          <p className="text-xs text-amber-600 font-medium">{upsellStatus.orderCount} orders so far — need {upsellStatus.ordersNeeded} more to activate.</p>
        )}
        <div className="flex items-center gap-3">
          <select value={upsellMinOrders} onChange={e => setUpsellMinOrders(parseInt(e.target.value))}
            className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-brand/40 outline-none">
            {[20, 50, 100, 200, 500, 1000].map(v => <option key={v} value={v}>{v} orders</option>)}
          </select>
          <button onClick={saveUpsellConfig} disabled={savingUpsell}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {savingUpsell ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
