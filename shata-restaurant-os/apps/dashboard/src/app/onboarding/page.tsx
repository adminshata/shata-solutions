"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "shata-onboarding";
const TOTAL_STEPS = 5;

interface OnboardingData {
  step: number;
  restaurant: {
    name: string;
    currency: string;
    timezone: string;
    taxRate: string;
  };
  menu: {
    categories: { name: string }[];
    sampleItems: boolean;
  };
  tables: {
    count: string;
    prefix: string;
  };
  staff: {
    ownerName: string;
    ownerEmail: string;
    ownerPin: string;
  };
  payment: {
    cash: boolean;
    card: boolean;
    instapay: boolean;
    fawry: boolean;
  };
}

const DEFAULT_DATA: OnboardingData = {
  step: 1,
  restaurant: { name: "", currency: "EGP", timezone: "Africa/Cairo", taxRate: "14" },
  menu: { categories: [{ name: "Main Course" }, { name: "Drinks" }, { name: "Desserts" }], sampleItems: true },
  tables: { count: "10", prefix: "T" },
  staff: { ownerName: "", ownerEmail: "", ownerPin: "" },
  payment: { cash: true, card: false, instapay: true, fawry: false },
};

const STEP_LABELS = [
  "Restaurant Info",
  "Menu Setup",
  "Tables",
  "Staff Account",
  "Payment Methods",
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              done ? "bg-green-500 text-white" : active ? "bg-brand text-white" : "bg-slate-200 text-slate-500"
            }`}>
              {done ? "✓" : n}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${active ? "text-slate-900" : "text-slate-400"}`}>
              {label}
            </span>
            {n < TOTAL_STEPS && <div className="w-8 h-0.5 bg-slate-200 mx-1" />}
          </div>
        );
      })}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData>(DEFAULT_DATA);
  const [submitting, setSubmitting] = useState(false);

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setData(JSON.parse(saved) as OnboardingData); } catch {}
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const next = () => setData((d) => ({ ...d, step: Math.min(d.step + 1, TOTAL_STEPS) }));
  const back = () => setData((d) => ({ ...d, step: Math.max(d.step - 1, 1) }));

  const finish = async () => {
    setSubmitting(true);
    // In real impl: POST to API to provision restaurant, tables, staff
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.removeItem(STORAGE_KEY);
    router.push("/dashboard/orders");
  };

  const { step, restaurant, menu, tables, staff, payment } = data;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-black text-lg">S</div>
            <span className="font-bold text-xl text-slate-900">Shata OS</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-lg p-8">
          <StepIndicator current={step} />

          {/* Step 1 — Restaurant Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Welcome! Let&apos;s set up your restaurant</h2>
                <p className="text-sm text-slate-500 mt-1">Basic details about your venue</p>
              </div>
              <Field label="Restaurant Name *" value={restaurant.name}
                onChange={(v) => update("restaurant", { ...restaurant, name: v })}
                placeholder="e.g. El-Kebabgy, Sushi Palace" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Currency" value={restaurant.currency}
                  onChange={(v) => update("restaurant", { ...restaurant, currency: v })}
                  placeholder="EGP" help="ISO 4217" />
                <Field label="Tax Rate (%)" value={restaurant.taxRate} type="number"
                  onChange={(v) => update("restaurant", { ...restaurant, taxRate: v })}
                  placeholder="14" />
              </div>
              <Field label="Timezone" value={restaurant.timezone}
                onChange={(v) => update("restaurant", { ...restaurant, timezone: v })}
                placeholder="Africa/Cairo" help="IANA timezone" />
            </div>
          )}

          {/* Step 2 — Menu Setup */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Menu Categories</h2>
                <p className="text-sm text-slate-500 mt-1">Add your main menu sections</p>
              </div>
              {menu.categories.map((cat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={cat.name}
                    onChange={(e) => {
                      const cats = [...menu.categories];
                      cats[i] = { name: e.target.value };
                      update("menu", { ...menu, categories: cats });
                    }}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                    placeholder={`Category ${i + 1}`}
                  />
                  {menu.categories.length > 1 && (
                    <button
                      onClick={() => update("menu", { ...menu, categories: menu.categories.filter((_, j) => j !== i) })}
                      className="rounded-lg border px-3 text-slate-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => update("menu", { ...menu, categories: [...menu.categories, { name: "" }] })}
                className="text-sm font-semibold text-brand hover:underline"
              >
                + Add Category
              </button>
              <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={menu.sampleItems}
                  onChange={(e) => update("menu", { ...menu, sampleItems: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
                Pre-populate with sample menu items
              </label>
            </div>
          )}

          {/* Step 3 — Tables */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Set Up Tables</h2>
                <p className="text-sm text-slate-500 mt-1">We&apos;ll create your tables and QR codes automatically</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Number of Tables" value={tables.count} type="number"
                  onChange={(v) => update("tables", { ...tables, count: v })}
                  placeholder="10" />
                <Field label="Table Prefix" value={tables.prefix}
                  onChange={(v) => update("tables", { ...tables, prefix: v })}
                  placeholder="T" help="e.g. T → T1, T2, T3" />
              </div>
              <div className="rounded-xl bg-slate-50 border px-4 py-3 text-sm text-slate-600">
                Preview: <span className="font-mono font-semibold text-slate-800">
                  {tables.prefix}1, {tables.prefix}2, … {tables.prefix}{tables.count}
                </span>
              </div>
            </div>
          )}

          {/* Step 4 — Staff */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Owner Account</h2>
                <p className="text-sm text-slate-500 mt-1">Your primary staff account</p>
              </div>
              <Field label="Full Name *" value={staff.ownerName}
                onChange={(v) => update("staff", { ...staff, ownerName: v })}
                placeholder="Ahmed Hassan" />
              <Field label="Email *" value={staff.ownerEmail} type="email"
                onChange={(v) => update("staff", { ...staff, ownerEmail: v })}
                placeholder="owner@restaurant.com" />
              <Field label="4-Digit PIN *" value={staff.ownerPin} type="password"
                onChange={(v) => update("staff", { ...staff, ownerPin: v.slice(0, 4) })}
                placeholder="••••" help="Used for POS authentication" />
            </div>
          )}

          {/* Step 5 — Payment Methods */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Payment Methods</h2>
                <p className="text-sm text-slate-500 mt-1">Which payment types do you accept?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "cash", label: "Cash", icon: "💵" },
                  { key: "card", label: "Card (Paymob)", icon: "💳" },
                  { key: "instapay", label: "InstaPay", icon: "📲" },
                  { key: "fawry", label: "Fawry", icon: "🏪" },
                ].map(({ key, label, icon }) => (
                  <label key={key} className={`flex items-center gap-3 cursor-pointer rounded-xl border p-4 transition-colors ${
                    payment[key as keyof typeof payment] ? "border-brand bg-brand/5" : "hover:border-slate-300"
                  }`}>
                    <input
                      type="checkbox"
                      checked={payment[key as keyof typeof payment]}
                      onChange={(e) => update("payment", { ...payment, [key]: e.target.checked })}
                      className="h-4 w-4 accent-brand"
                    />
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            {step > 1 ? (
              <button onClick={back} className="rounded-lg border px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Back
              </button>
            ) : <div />}

            {step < TOTAL_STEPS ? (
              <button
                onClick={next}
                disabled={step === 1 && !restaurant.name}
                className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={submitting}
                className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Setting up…" : "Launch Restaurant"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Progress is saved automatically
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  help?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
      {help && <p className="text-[10px] text-slate-400 mt-0.5">{help}</p>}
    </div>
  );
}
