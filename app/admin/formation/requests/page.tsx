import Link from "next/link";
import { listRequests, getStats } from "@/lib/formation/store";
import { formatUSD, getPackage, getState } from "@/lib/formation/catalog";
import { STATUS_LABEL, STATUS_PIPELINE } from "@/lib/formation/types";
import type { FormationStatus } from "@/lib/formation/types";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ status?: string; q?: string }>;

const FILTER_TABS: (FormationStatus | "all")[] = [
  "all",
  ...STATUS_PIPELINE,
  "needs_info",
  "cancelled",
];

export default async function RequestsListPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = (params.status as FormationStatus | "all" | undefined) ?? "all";
  const q = params.q ?? "";
  const [items, stats] = await Promise.all([listRequests({ status, query: q }), getStats()]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
            Requests
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">All formation requests</h1>
          <p className="mt-1 text-sm text-white/60 dark:text-white/60 [.dark_&]:text-white/60">
            {items.length} of {stats.total} matched · {stats.pendingReview} pending review
          </p>
        </div>
        <SearchForm initialStatus={status} initialQuery={q} />
      </header>

      {/* Status tabs */}
      <nav className="flex flex-wrap gap-2">
        {FILTER_TABS.map((s) => {
          const count = s === "all" ? stats.total : stats.byStatus[s];
          const active = s === status;
          const href = s === "all" ? "/admin/formation/requests" : `/admin/formation/requests?status=${s}`;
          return (
            <Link
              key={s}
              href={q ? `${href}${href.includes("?") ? "&" : "?"}q=${encodeURIComponent(q)}` : href}
              className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-transparent bg-gradient-to-r from-[#635bff] to-cyan-400 text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
                  : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
              }`}
            >
              <span>{s === "all" ? "All" : STATUS_LABEL[s]}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${active ? "bg-white/20 text-white" : "bg-white/[0.06] text-white/55"}`}>{count}</span>
            </Link>
          );
        })}
      </nav>

      {/* Table */}
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="hidden border-b border-white/10 bg-white/[0.02] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 md:grid md:grid-cols-[140px_1.4fr_1fr_140px_120px_100px]">
              <span>Reference</span>
              <span>Company</span>
              <span>Owner</span>
              <span>State / Pkg</span>
              <span>Status</span>
              <span className="text-right">Total</span>
            </div>
            <ul className="divide-y divide-white/5">
              {items.map((r) => {
                const pkg = getPackage(r.input.packageId);
                const state = getState(r.input.state);
                const total = r.pricing.packagePrice + r.pricing.stateFee + r.pricing.addOnsOneTime;
                return (
                  <li key={r.code}>
                    <Link
                      href={`/admin/formation/requests/${r.code}`}
                      className="grid grid-cols-1 gap-2 px-4 py-4 transition hover:bg-white/[0.04] md:grid-cols-[140px_1.4fr_1fr_140px_120px_100px] md:items-center md:gap-4 md:px-6 md:py-3.5"
                    >
                      <div className="font-mono text-xs font-semibold text-white">{r.code}</div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-white">{r.input.companyName || "—"}</div>
                        <div className="truncate text-[11px] text-white/50">{r.input.businessActivity || r.input.businessCategory || "—"}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm text-white/85">{r.input.ownerFullName || "—"}</div>
                        <div className="truncate text-[11px] text-white/45">{r.input.ownerEmail || ""}</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/85">{state?.id ?? "—"}</div>
                        <div className="text-[11px] text-white/50">{pkg?.name ?? "—"}</div>
                      </div>
                      <div>
                        <StatusPill status={r.status} />
                        <div className="mt-1 text-[10px] text-white/40">{relativeTime(r.updatedAt)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{formatUSD(total)}</div>
                        <div className="text-[10px] text-white/40">{r.pricing.addOnsRecurring > 0 ? `+ ${formatUSD(r.pricing.addOnsRecurring)}/mo` : "no MRR"}</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Local components                                                    */
/* ------------------------------------------------------------------ */

function SearchForm({ initialStatus, initialQuery }: { initialStatus: string; initialQuery: string }) {
  return (
    <form method="get" action="/admin/formation/requests" className="flex w-full items-center gap-2 md:w-auto">
      {initialStatus !== "all" && <input type="hidden" name="status" value={initialStatus} />}
      <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-xl md:w-[320px]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white/45">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          name="q"
          defaultValue={initialQuery}
          placeholder="Search code, company, owner, email…"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>
      <button type="submit" className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-2 text-xs font-semibold text-white">
        Search
      </button>
    </form>
  );
}

function StatusPill({ status }: { status: FormationStatus }) {
  const dot = statusDotClass(status);
  const tone = statusToneClass(status);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}

function statusDotClass(s: FormationStatus): string {
  switch (s) {
    case "new":          return "bg-[#635bff]";
    case "reviewing":    return "bg-cyan-400";
    case "quoted":       return "bg-amber-300";
    case "paid":         return "bg-emerald-400";
    case "filing":       return "bg-blue-400";
    case "completed":    return "bg-gradient-to-br from-[#635bff] to-cyan-400";
    case "cancelled":    return "bg-slate-400";
    case "needs_info":   return "bg-rose-400";
    default:             return "bg-white/40";
  }
}

function statusToneClass(s: FormationStatus): string {
  switch (s) {
    case "new":         return "border-[#635bff]/30 bg-[#635bff]/10 text-[#a3a0ff]";
    case "reviewing":   return "border-cyan-400/30 bg-cyan-400/10 text-cyan-200";
    case "quoted":      return "border-amber-300/30 bg-amber-300/10 text-amber-200";
    case "paid":        return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
    case "filing":      return "border-blue-400/30 bg-blue-400/10 text-blue-200";
    case "completed":   return "border-[#635bff]/30 bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10 text-white";
    case "cancelled":   return "border-white/10 bg-white/[0.04] text-white/55";
    case "needs_info":  return "border-rose-400/30 bg-rose-400/10 text-rose-200";
    default:            return "border-white/10 bg-white/[0.04] text-white/55";
  }
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" />
        </svg>
      </div>
      <div className="mt-4 text-base font-semibold text-white">No requests match.</div>
      <div className="mt-1 max-w-sm text-sm text-white/55">Try clearing the search or pick a different status. New submissions appear here automatically.</div>
      <Link href="/admin/formation/requests" className="mt-5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white">
        Reset filters
      </Link>
    </div>
  );
}

function relativeTime(iso: string): string {
  const diff = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}
