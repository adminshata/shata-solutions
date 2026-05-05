"use client";

import { useEffect, useState } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme, useSession } from "@/lib/hooks";
import PartnerDashboardView from "@/components/partners/PartnerDashboardView";

export default function PartnerDashboardPage() {
  const { isDark, toggleTheme } = useTheme();
  const sessionId = useSession();

  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("shata_partner_email") : null;
    if (saved) {
      setEmail(saved);
      load(saved);
    }
    setLoaded(true);
  }, []);

  async function load(e: string) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/partners/dashboard?email=${encodeURIComponent(e)}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to load");
      }
      const j = await res.json();
      setData(j);
      if (typeof window !== "undefined") localStorage.setItem("shata_partner_email", e);
    } catch (e: any) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative z-10 pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {!data && loaded && (
            <div className="max-w-md mx-auto">
              <h1 className={`text-3xl font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                Partner dashboard
              </h1>
              <p className={`mb-8 text-sm ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Enter your partner email to view your stats. Full auth coming soon.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  load(email);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@brand.com"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${
                    isDark
                      ? "border-white/15 bg-white/5 text-white"
                      : "border-slate-200 bg-white text-slate-900"
                  }`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold disabled:opacity-60"
                >
                  {loading ? "Loading…" : "View dashboard"}
                </button>
                {err && <div className="text-sm text-red-500 text-center">{err}</div>}
              </form>
            </div>
          )}

          {data && (
            <PartnerDashboardView
              isDark={isDark}
              data={data}
              onReload={() => load(email)}
              onLogout={() => {
                localStorage.removeItem("shata_partner_email");
                setData(null);
                setEmail("");
              }}
            />
          )}
        </div>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}
