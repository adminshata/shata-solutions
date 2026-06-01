"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

const DIETARY_OPTIONS = [
  { id: "vegetarian", label: "Vegetarian", ar: "نباتي" },
  { id: "vegan", label: "Vegan", ar: "نباتي صارم" },
  { id: "halal", label: "Halal", ar: "حلال" },
  { id: "no_nuts", label: "No Nuts", ar: "بدون مكسرات" },
  { id: "gluten_free", label: "Gluten Free", ar: "خالي من الغلوتين" },
];

interface Profile { customerId: string; name: string; email?: string; birthdate?: string; preferredLang: string; dietaryPrefs: string[]; loyaltyAccounts: { restaurantId: string; points: number }[] }
interface SavedOrder { id: string; name: string; restaurantId: string; items: unknown[]; createdAt: string }

// customerId is normally from OTP auth; using localStorage for demo
function getCustomerId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("shata_customer_id") ?? "";
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedOrders, setSavedOrders] = useState<SavedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"profile" | "saved" | "loyalty">("profile");
  const customerId = getCustomerId();

  useEffect(() => {
    if (!customerId) { setLoading(false); return; }
    Promise.all([
      fetch(`${API}/api/customer/profile?customerId=${customerId}`).then(r => r.ok ? r.json() : null),
      fetch(`${API}/api/customer/saved-orders?customerId=${customerId}`).then(r => r.ok ? r.json() : []),
    ]).then(([p, s]) => { setProfile(p); setSavedOrders(s ?? []); }).finally(() => setLoading(false));
  }, [customerId]);

  async function save() {
    if (!profile) return;
    setSaving(true);
    const res = await fetch(`${API}/api/customer/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profile, customerId }),
    });
    if (res.ok) setProfile(await res.json());
    setSaving(false);
  }

  async function deleteSaved(id: string) {
    await fetch(`${API}/api/customer/saved-orders/${id}?customerId=${customerId}`, { method: "DELETE" });
    setSavedOrders(s => s.filter(o => o.id !== id));
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading…</div>;

  if (!customerId) return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <p className="text-muted-foreground text-sm">Sign in with your phone number to access your profile.</p>
    </main>
  );

  const defaultProfile: Profile = { customerId, name: "", preferredLang: "ar", dietaryPrefs: [], loyaltyAccounts: [] };
  const p = profile ?? defaultProfile;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background px-4 py-4">
        <div className="flex-1">
          <p className="font-bold text-foreground">{p.name || "My Profile"}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {(["profile", "saved", "loyalty"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? "border-brand text-brand" : "border-transparent text-muted-foreground"}`}>
            {t === "profile" ? "Profile" : t === "saved" ? "Saved Orders" : "Loyalty"}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {tab === "profile" && (
          <>
            <label className="flex flex-col gap-1 text-sm">
              Name
              <input value={p.name} onChange={e => setProfile({ ...p, name: e.target.value })}
                className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Email (optional)
              <input type="email" value={p.email ?? ""} onChange={e => setProfile({ ...p, email: e.target.value })}
                className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Birthday (optional)
              <input type="date" value={p.birthdate ? new Date(p.birthdate).toISOString().slice(0, 10) : ""}
                onChange={e => setProfile({ ...p, birthdate: e.target.value })}
                className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40" />
            </label>
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Dietary Preferences</p>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map(opt => {
                  const active = p.dietaryPrefs.includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => setProfile({
                      ...p,
                      dietaryPrefs: active ? p.dietaryPrefs.filter(x => x !== opt.id) : [...p.dietaryPrefs, opt.id]
                    })} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${active ? "border-brand bg-brand text-white" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="flex flex-col gap-1 text-sm">
              Language
              <select value={p.preferredLang} onChange={e => setProfile({ ...p, preferredLang: e.target.value })}
                className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/40">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </label>
            <button onClick={save} disabled={saving} className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white disabled:opacity-60">
              {saving ? "Saving…" : "Save Profile"}
            </button>
          </>
        )}

        {tab === "saved" && (
          <div className="space-y-3">
            {savedOrders.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No saved orders yet.</p>
            ) : savedOrders.map(o => (
              <div key={o.id} className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{o.name}</p>
                  <p className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString("en", { month: "short", day: "numeric" })}</p>
                </div>
                <button onClick={() => deleteSaved(o.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
              </div>
            ))}
          </div>
        )}

        {tab === "loyalty" && (
          <div className="space-y-3">
            {p.loyaltyAccounts.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No loyalty accounts yet. Start ordering!</p>
            ) : p.loyaltyAccounts.map(la => (
              <div key={la.restaurantId} className="rounded-2xl border bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-400 mb-1">Restaurant</p>
                <p className="font-mono text-xs text-slate-500">{la.restaurantId}</p>
                <p className="mt-2 text-2xl font-black text-brand">{la.points.toLocaleString()} <span className="text-sm font-normal text-slate-400">pts</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
