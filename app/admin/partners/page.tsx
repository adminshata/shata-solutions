"use client";

import { useEffect, useState } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import { useTheme } from "@/lib/hooks";

export default function AdminPartnersPage() {
  const { isDark, toggleTheme } = useTheme();
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [status, setStatus] = useState("pending");
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const s = localStorage.getItem("shata_admin_key");
    if (s) {
      setKey(s);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, status]);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/partners/admin/list?status=${status}`, {
        headers: { "x-admin-key": key },
      });
      if (!res.ok) throw new Error("Auth failed");
      const j = await res.json();
      setApps(j.applications);
    } catch (e: any) {
      setErr(e.message);
      setAuthed(false);
      localStorage.removeItem("shata_admin_key");
    } finally {
      setLoading(false);
    }
  }

  async function review(appId: string, action: "approve" | "reject" | "more_info", notes?: string) {
    const res = await fetch("/api/partners/admin/review", {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ applicationId: appId, action, notes }),
    });
    if (!res.ok) {
      alert("Failed");
      return;
    }
    load();
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <h1 className={`text-3xl font-semibold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
          Partner applications (admin)
        </h1>

        {!authed && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem("shata_admin_key", key);
              setAuthed(true);
            }}
            className="max-w-sm space-y-3"
          >
            <label className={`block text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              Admin API key
            </label>
            <input
              type="password"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 text-sm ${
                isDark ? "border-white/15 bg-white/5 text-white" : "border-slate-200 bg-white"
              }`}
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-white font-semibold"
            >
              Sign in
            </button>
            {err && <div className="text-sm text-red-500">{err}</div>}
          </form>
        )}

        {authed && (
          <>
            <div className="flex gap-2 mb-6">
              {["pending", "more_info", "approved", "rejected"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                    status === s
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : isDark
                      ? "border border-white/15 text-white/70"
                      : "border border-slate-200 text-slate-700"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>

            {loading && <div className={isDark ? "text-white/60" : "text-slate-500"}>Loading…</div>}

            <div className="space-y-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className={`rounded-2xl border p-6 ${
                    isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {app.full_name} · {app.email}
                      </div>
                      <div className={`text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                        {app.website || "no website"} · audience: {app.audience_size}
                      </div>
                      <div className={`mt-2 text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
                        Channels: {app.channels.join(", ")} · {new Date(app.created_at).toLocaleString()}
                      </div>
                    </div>
                    {status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => review(app.id, "approve")}
                          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const n = prompt("Why reject?");
                            if (n !== null) review(app.id, "reject", n);
                          }}
                          className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-white/80" : "text-slate-700"}`}>
                    {app.pitch}
                  </p>
                </div>
              ))}
              {!loading && apps.length === 0 && (
                <div className={`text-center py-12 text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                  No {status} applications.
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
