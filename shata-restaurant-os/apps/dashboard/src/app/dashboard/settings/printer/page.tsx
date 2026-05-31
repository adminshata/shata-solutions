"use client";

import { useEffect, useState } from "react";

interface PrinterConfig {
  type: string;
  ipAddress: string | null;
  port: number | null;
  usbPath: string | null;
  isActive: boolean;
  printOnOrder: boolean;
  printReceipt: boolean;
}

const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export default function PrinterSettingsPage() {
  const [config, setConfig] = useState<PrinterConfig>({
    type: "NETWORK",
    ipAddress: "",
    port: 9100,
    usbPath: "",
    isActive: true,
    printOnOrder: true,
    printReceipt: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string } | null>(null);

  useEffect(() => {
    fetch(`${API}/api/dashboard/printer/status?restaurantId=${RESTAURANT_ID}`)
      .then((r) => r.json())
      .then((data) => { if (data.config) setConfig(data.config); })
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API}/api/dashboard/printer/config?restaurantId=${RESTAURANT_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
  };

  const testPrint = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await fetch(`${API}/api/dashboard/printer/test?restaurantId=${RESTAURANT_ID}`, { method: "POST" });
    const data = await res.json() as { success: boolean; error?: string };
    setTestResult(data);
    setTesting(false);
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Thermal Printer</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={testPrint}
            disabled={testing}
            className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            {testing ? "Printing…" : "Test Print"}
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-brand px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 max-w-xl space-y-6">
        {testResult && (
          <div className={`rounded-lg px-4 py-3 text-sm font-semibold ${testResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {testResult.success ? "Test print sent successfully" : `Failed: ${testResult.error}`}
          </div>
        )}

        {/* Connection type */}
        <div className="rounded-xl border bg-white p-5 space-y-4">
          <p className="font-semibold text-slate-800">Connection</p>

          <div className="flex gap-3">
            {["NETWORK", "USB"].map((t) => (
              <button
                key={t}
                onClick={() => setConfig((c) => ({ ...c, type: t }))}
                className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors ${
                  config.type === t ? "border-brand bg-brand/10 text-brand" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t === "NETWORK" ? "Network (TCP/IP)" : "USB"}
              </button>
            ))}
          </div>

          {config.type === "NETWORK" ? (
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1">IP Address</label>
                <input
                  value={config.ipAddress ?? ""}
                  onChange={(e) => setConfig((c) => ({ ...c, ipAddress: e.target.value }))}
                  placeholder="192.168.1.100"
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Port</label>
                <input
                  type="number"
                  value={config.port ?? 9100}
                  onChange={(e) => setConfig((c) => ({ ...c, port: parseInt(e.target.value, 10) }))}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">USB Device Path</label>
              <input
                value={config.usbPath ?? ""}
                onChange={(e) => setConfig((c) => ({ ...c, usbPath: e.target.value }))}
                placeholder="/dev/usb/lp0"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          )}
        </div>

        {/* Behavior */}
        <div className="rounded-xl border bg-white p-5 space-y-3">
          <p className="font-semibold text-slate-800">Behavior</p>
          {[
            { key: "isActive", label: "Printer enabled" },
            { key: "printOnOrder", label: "Auto-print kitchen ticket on new order" },
            { key: "printReceipt", label: "Auto-print receipt on payment" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-700">{label}</span>
              <button
                onClick={() => setConfig((c) => ({ ...c, [key]: !c[key as keyof PrinterConfig] }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  config[key as keyof PrinterConfig] ? "bg-brand" : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    config[key as keyof PrinterConfig] ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
