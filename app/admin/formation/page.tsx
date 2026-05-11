import Link from "next/link";
import { listRequests, getStats } from "@/lib/formation/store";
import { formatUSD, getPackage, getState } from "@/lib/formation/catalog";
import { STATUS_LABEL, STATUS_PIPELINE } from "@/lib/formation/types";
import type { FormationStatus } from "@/lib/formation/types";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const [stats, recent] = await Promise.all([getStats(), listRequests()]);
  const top = recent.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,#070d1c_0%,#0a1224_55%,#070d1c_100%)] p-8 text-white shadow-[0_40px_100px_-40px_rgba(2,6,23,0.6)] md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,91,255,0.30),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(6,182,212,0.25),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Floating 3D-ish status orbs */}
        <div className="pointer-events-none absolute right-10 top-8 hidden md:block" style={{ perspective: "900px" }}>
          <div className="relative h-[160px] w-[260px]" style={{ transformStyle: "preserve-3d", transform: "rotateY(-12deg) rotateX(8deg)" }}>
            {STATUS_PIPELINE.map((s, i) => (
              <div
                key={s}
                className="absolute rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-xl"
                style={{ transform: `translate3d(${i * 22}px, ${i * 12}px, ${i * 18}px)`, opacity: 0.3 + i * 0.12 }}
              >
                {STATUS_LABEL[s]} · {stats.byStatus[s]}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
            Operator dashboard
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
            <span>Welcome back. </span>
            <span className="bg-gradient-to-r from-[#a3a0ff] via-cyan-300 to-white bg-clip-text text-transparent">{stats.pendingReview} requests await review.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
            Triage new submissions, send Stripe payment links, and track filings — every step in one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/admin/formation/requests?status=new" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5">
              Review new requests →
            </Link>
            <Link href="/admin/formation/requests?status=quoted" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/[0.10]">
              Awaiting payment ({stats.byStatus.quoted})
            </Link>
            <Link href="/admin/formation/requests?status=filing" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/[0.10]">
              In filing ({stats.byStatus.filing})
            </Link>
          </div>
        </div>
      </section>

      {/* Stat tiles */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Total requests"
          value={stats.total.toString()}
          sub={`${stats.byStatus.new} new today`}
          accent="from-[#635bff] to-cyan-400"
        />
        <StatTile
          label="Pending review"
          value={stats.pendingReview.toString()}
          sub="New + reviewing + needs info"
          accent="from-amber-300 to-[#635bff]"
        />
        <StatTile
          label="Paid revenue"
          value={formatUSD(stats.paidRevenueUSD)}
          sub={`${stats.completed} completed setups`}
          accent="from-cyan-400 to-emerald-300"
        />
        <StatTile
          label="MRR (recurring add-ons)"
          value={formatUSD(stats.monthlyRecurringUSD) + "/mo"}
          sub="Registered Agent, Mailbox, Email…"
          accent="from-[#635bff] to-blue-500"
        />
      </section>

      {/* Pipeline mini-kanban */}
      <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl dark:bg-white/[0.03]">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">Pipeline</div>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Requests by stage</h2>
          </div>
          <Link href="/admin/formation/requests" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a84ff] hover:underline">
            View all →
          </Link>
        </header>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {STATUS_PIPELINE.map((s) => (
            <PipelineColumn key={s} status={s} count={stats.byStatus[s]} />
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <RecentRequestsTable items={top} />
        <RecentActivity items={recent} />
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat tile                                                           */
/* ------------------------------------------------------------------ */

function StatTile({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-0.5 dark:bg-white/[0.04]">
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} opacity-25 blur-2xl transition group-hover:opacity-50`} />
      <div className="relative">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 dark:text-white/45 [.dark_&]:text-white/45">{label}</div>
        <div className={`mt-2 bg-gradient-to-br ${accent} bg-clip-text text-3xl font-semibold tracking-tight text-transparent`}>{value}</div>
        <div className="mt-1 text-[11px] text-white/60 dark:text-white/60 [.dark_&]:text-white/60">{sub}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pipeline column                                                     */
/* ------------------------------------------------------------------ */

function PipelineColumn({ status, count }: { status: FormationStatus; count: number }) {
  return (
    <Link
      href={`/admin/formation/requests?status=${status}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${statusDotClass(status)}`} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{STATUS_LABEL[status]}</span>
      </div>
      <div className="mt-3 bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">{count}</div>
      <div className="mt-1 text-[10px] text-white/40">Open requests</div>
    </Link>
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

/* ------------------------------------------------------------------ */
/* Recent requests + activity                                          */
/* ------------------------------------------------------------------ */

async function RecentRequestsTable({ items }: { items: Awaited<ReturnType<typeof listRequests>> }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">Recent requests</div>
          <h2 className="mt-1 text-base font-semibold tracking-tight">Last 6 submissions</h2>
        </div>
        <Link href="/admin/formation/requests" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a84ff] hover:underline">All →</Link>
      </header>
      <ul className="divide-y divide-white/5">
        {items.map((r) => {
          const pkg = getPackage(r.input.packageId);
          const state = getState(r.input.state);
          return (
            <li key={r.code}>
              <Link href={`/admin/formation/requests/${r.code}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3.5 transition hover:bg-white/[0.04]">
                <span className={`h-2 w-2 flex-none rounded-full ${statusDotClass(r.status)}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-white">{r.code}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/65">{STATUS_LABEL[r.status]}</span>
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-white/55">
                    {r.input.companyName || "—"} · {state?.id ?? "—"} · {pkg?.name ?? "—"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">{formatUSD(r.pricing.packagePrice + r.pricing.stateFee + r.pricing.addOnsOneTime)}</div>
                  <div className="text-[10px] text-white/40">{relativeTime(r.updatedAt)}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RecentActivity({ items }: { items: Awaited<ReturnType<typeof listRequests>> }) {
  // Flatten to a single ordered activity stream
  const stream = items
    .flatMap((r) => r.activity.map((e) => ({ ...e, code: r.code, company: r.input.companyName })))
    .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
    .slice(0, 8);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">Activity</div>
        <h2 className="mt-1 text-base font-semibold tracking-tight">Live event feed</h2>
      </header>
      <ol className="relative space-y-0.5 px-6 py-4">
        <span className="absolute left-[34px] top-6 bottom-6 w-px bg-gradient-to-b from-[#635bff]/40 via-cyan-400/30 to-transparent" />
        {stream.map((e) => (
          <li key={e.id} className="relative flex items-start gap-3 py-2.5">
            <span className={`relative mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full ring-4 ring-[#050b16] ${actorDot(e.actor)}`} />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-white/80">{e.message}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-white/45">
                <span className="font-mono">{e.code}</span>
                <span>·</span>
                <span>{relativeTime(e.ts)}</span>
                <span>·</span>
                <span className="uppercase tracking-wider">{e.actor}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function actorDot(actor: "system" | "ops" | "customer"): string {
  if (actor === "system") return "bg-cyan-400";
  if (actor === "ops") return "bg-gradient-to-br from-[#635bff] to-cyan-400";
  return "bg-amber-300";
}

function relativeTime(iso: string): string {
  const diff = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}
