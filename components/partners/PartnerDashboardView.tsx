"use client";

import { formatMoney } from "@/lib/partners";

interface Props {
  isDark: boolean;
  data: any;
  onReload: () => void;
  onLogout: () => void;
}

export default function PartnerDashboardView({ isDark, data, onReload, onLogout }: Props) {
  const { partner, kpis, referrals, commissions, payouts } = data;
  const refLink = `https://shata.io/?ref=${partner.slug}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-blue-400" : "text-blue-600"}`}>
            Partner dashboard · {partner.tier.toUpperCase()} tier
          </div>
          <h1 className={`mt-1 text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            Welcome back, {partner.full_name.split(" ")[0]}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onReload}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              isDark ? "border-white/15 text-white hover:bg-white/10" : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            Refresh
          </button>
          <button
            onClick={onLogout}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              isDark ? "border-white/15 text-white/70 hover:bg-white/10" : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Referral link */}
      <div
        className={`rounded-2xl border p-6 ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
        }`}
      >
        <div className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          Your referral link
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <code className={`flex-1 min-w-[240px] rounded-lg px-4 py-3 font-mono text-sm ${
            isDark ? "bg-slate-950 text-blue-300" : "bg-slate-100 text-slate-700"
          }`}>
            {refLink}
          </code>
          <button
            onClick={() => navigator.clipboard.writeText(refLink)}
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Copy link
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi isDark={isDark} label="This month pending" value={formatMoney(kpis.pendingCents)} accent="from-blue-500 to-cyan-500" />
        <Kpi isDark={isDark} label="Active referrals" value={String(kpis.activeReferrals)} accent="from-purple-500 to-pink-500" />
        <Kpi isDark={isDark} label="Clicks (30d)" value={kpis.clicks30d.toLocaleString()} accent="from-emerald-500 to-teal-500" />
        <Kpi isDark={isDark} label="Conversion" value={`${kpis.conversion}%`} accent="from-amber-500 to-orange-500" />
      </div>

      {/* Referrals table */}
      <Section isDark={isDark} title="Recent referrals" hint={`${referrals.length} shown`}>
        {referrals.length === 0 ? (
          <Empty isDark={isDark}>No referrals yet — share your link to get started.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={isDark ? "text-white/50" : "text-slate-500"}>
                  <Th>Customer</Th>
                  <Th>Plan</Th>
                  <Th>MRR</Th>
                  <Th>Status</Th>
                  <Th>Signed up</Th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r: any) => (
                  <tr
                    key={r.id}
                    className={`border-t ${isDark ? "border-white/5" : "border-slate-100"}`}
                  >
                    <Td isDark={isDark}>{maskEmail(r.customer_email)}</Td>
                    <Td isDark={isDark}>{r.plan || "—"}</Td>
                    <Td isDark={isDark}>{formatMoney(r.mrr_cents)}/mo</Td>
                    <Td isDark={isDark}>
                      <StatusPill isDark={isDark} status={r.status} />
                    </Td>
                    <Td isDark={isDark}>{new Date(r.created_at).toLocaleDateString()}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Commissions */}
      <Section isDark={isDark} title="Commissions by month">
        {commissions.length === 0 ? (
          <Empty isDark={isDark}>No commissions yet. They appear on the 1st of each month.</Empty>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {commissions.slice(0, 8).map((c: any) => (
              <div
                key={c.id}
                className={`rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}
              >
                <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-white/50" : "text-slate-500"}`}>
                  {c.period}
                </div>
                <div className={`mt-1 text-xl font-semibold tabular-nums ${isDark ? "text-white" : "text-slate-900"}`}>
                  {formatMoney(c.amount_cents)}
                </div>
                <div className="mt-2">
                  <StatusPill isDark={isDark} status={c.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Payouts */}
      <Section isDark={isDark} title="Payouts">
        {payouts.length === 0 ? (
          <Empty isDark={isDark}>No payouts yet.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={isDark ? "text-white/50" : "text-slate-500"}>
                  <Th>Amount</Th>
                  <Th>Method</Th>
                  <Th>Period</Th>
                  <Th>Status</Th>
                  <Th>Paid at</Th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p: any) => (
                  <tr key={p.id} className={`border-t ${isDark ? "border-white/5" : "border-slate-100"}`}>
                    <Td isDark={isDark}>{formatMoney(p.amount_cents)}</Td>
                    <Td isDark={isDark}>{p.method}</Td>
                    <Td isDark={isDark}>{p.period_start ? `${p.period_start} → ${p.period_end}` : "—"}</Td>
                    <Td isDark={isDark}>
                      <StatusPill isDark={isDark} status={p.status} />
                    </Td>
                    <Td isDark={isDark}>{p.paid_at ? new Date(p.paid_at).toLocaleDateString() : "—"}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

function Kpi({ isDark, label, value, accent }: { isDark: boolean; label: string; value: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
      <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? "text-white/50" : "text-slate-500"}`}>
        {label}
      </div>
      <div className={`mt-2 text-3xl font-semibold tabular-nums bg-gradient-to-br ${accent} bg-clip-text text-transparent`}>
        {value}
      </div>
    </div>
  );
}

function Section({ isDark, title, hint, children }: { isDark: boolean; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h2>
        {hint && <span className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left font-semibold uppercase tracking-wider text-[10px] py-2 px-2">{children}</th>;
}
function Td({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return <td className={`py-3 px-2 ${isDark ? "text-white/80" : "text-slate-700"}`}>{children}</td>;
}
function Empty({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`text-center py-10 text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>{children}</div>
  );
}
function StatusPill({ isDark, status }: { isDark: boolean; status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    trialing: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    cancelled: "bg-red-500/15 text-red-500 border-red-500/30",
    refunded: "bg-red-500/15 text-red-500 border-red-500/30",
    paid: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    approved: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    pending: "bg-cyan-400mber-500/15 text-amber-500 border-amber-500/30",
    processing: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    failed: "bg-red-500/15 text-red-500 border-red-500/30",
    reversed: "bg-slate-500/15 text-slate-500 border-slate-500/30",
  };
  const c = map[status] || "bg-slate-500/15 text-slate-500";
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${c}`}>{status}</span>;
}
function maskEmail(e: string) {
  const [u, d] = e.split("@");
  if (!d) return e;
  return `${u.slice(0, 2)}***@${d}`;
}
