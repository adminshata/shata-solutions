"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import {
  opsAddNote,
  opsGeneratePaymentLink,
  opsMarkPaid,
  opsSetStatus,
} from "@/app/services/llc/actions";
import type {
  AddOnCatalog,
  PackageCatalog,
  StateCatalog,
} from "@/lib/formation/catalog";
import { formatUSD } from "@/lib/formation/catalog";
import {
  STATUS_LABEL,
  STATUS_PIPELINE,
  type FormationRequest,
  type FormationStatus,
} from "@/lib/formation/types";

type Catalogs = {
  packages: PackageCatalog[];
  states: StateCatalog[];
  addOns: AddOnCatalog[];
};

export default function RequestDetail({ request, catalogs }: { request: FormationRequest; catalogs: Catalogs }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<"overview" | "owner" | "pricing" | "timeline" | "notes">("overview");
  const [flash, setFlash] = useState<string | null>(null);

  const pkg = catalogs.packages.find((p) => p.id === request.input.packageId) ?? null;
  const state = catalogs.states.find((s) => s.id === request.input.state) ?? null;
  const addOns = request.input.addOns
    .map((id) => catalogs.addOns.find((a) => a.id === id))
    .filter((a): a is AddOnCatalog => !!a);
  const oneTime = addOns.filter((a) => !a.recurring);
  const recurring = addOns.filter((a) => a.recurring);
  const total = request.pricing.packagePrice + request.pricing.stateFee + request.pricing.addOnsOneTime;

  function flashMsg(m: string) {
    setFlash(m);
    window.setTimeout(() => setFlash(null), 2200);
  }

  function setStatus(next: FormationStatus, message?: string) {
    startTransition(async () => {
      await opsSetStatus(request.code, next, message);
      flashMsg(`Status: ${STATUS_LABEL[next]}`);
      router.refresh();
    });
  }
  function generateLink() {
    startTransition(async () => {
      await opsGeneratePaymentLink(request.code);
      flashMsg("Payment link generated.");
      router.refresh();
    });
  }
  function markPaid() {
    startTransition(async () => {
      await opsMarkPaid(request.code);
      flashMsg("Marked as paid.");
      router.refresh();
    });
  }
  function submitNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    const body = note;
    setNote("");
    startTransition(async () => {
      await opsAddNote(request.code, body);
      flashMsg("Note added.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {/* Flash toast */}
      {flash && (
        <div className="fixed right-4 top-20 z-50 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {flash}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <Link href="/admin/formation/requests" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff] hover:underline">
            ← All requests
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-2xl font-semibold tracking-tight text-white">{request.code}</span>
            <StatusPill status={request.status} />
          </div>
          <div className="mt-1 text-sm text-white/65">
            {request.input.companyName || "—"} · submitted {new Date(request.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/formation/${request.code}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.08]"
          >
            View customer page →
          </Link>
        </div>
      </header>

      {/* Action bar */}
      <ActionBar
        request={request}
        pending={pending}
        onSetStatus={setStatus}
        onGenerateLink={generateLink}
        onMarkPaid={markPaid}
      />

      {/* Body */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Left — tabs */}
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <nav className="flex gap-1 border-b border-white/10 px-4 py-3">
            {(["overview", "owner", "pricing", "timeline", "notes"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                  tab === t
                    ? "bg-gradient-to-r from-[#635bff] to-cyan-400 text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
                    : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {t === "notes" ? `Notes · ${request.notes.length}` : t}
              </button>
            ))}
          </nav>

          <div className="p-6">
            {tab === "overview" && (
              <OverviewTab request={request} pkg={pkg} state={state} addOns={addOns} />
            )}
            {tab === "owner" && <OwnerTab request={request} />}
            {tab === "pricing" && (
              <PricingTab
                request={request}
                pkg={pkg}
                state={state}
                oneTime={oneTime}
                recurring={recurring}
                total={total}
              />
            )}
            {tab === "timeline" && <TimelineTab request={request} />}
            {tab === "notes" && (
              <NotesTab
                request={request}
                note={note}
                setNote={setNote}
                submitNote={submitNote}
                pending={pending}
              />
            )}
          </div>
        </div>

        {/* Right — sticky ops rail */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <PaymentCard request={request} />
          <CustomerCard request={request} />
          <SnapshotCard request={request} pkg={pkg} state={state} addOns={addOns} total={total} />
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Action bar — status pipeline + smart actions                        */
/* ------------------------------------------------------------------ */

function ActionBar({
  request,
  pending,
  onSetStatus,
  onGenerateLink,
  onMarkPaid,
}: {
  request: FormationRequest;
  pending: boolean;
  onSetStatus: (s: FormationStatus, message?: string) => void;
  onGenerateLink: () => void;
  onMarkPaid: () => void;
}) {
  const idx = STATUS_PIPELINE.indexOf(request.status);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      {/* Pipeline progress */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {STATUS_PIPELINE.map((s, i) => {
          const done = i < idx;
          const current = i === idx;
          return (
            <button
              key={s}
              type="button"
              disabled={pending}
              onClick={() => onSetStatus(s)}
              className={`group relative overflow-hidden rounded-xl border p-2.5 text-left transition ${
                current
                  ? "border-transparent bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)]"
                  : done
                  ? "border-cyan-400/30 bg-cyan-400/5 text-cyan-100"
                  : "border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/[0.08]"
              }`}
            >
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] opacity-80">Stage {String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-xs font-semibold">{STATUS_LABEL[s]}</div>
              {(done || current) && (
                <span className="absolute right-2 top-2 text-[10px]">{current ? "•" : "✓"}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {request.status === "new" && (
          <PrimaryAction onClick={() => onSetStatus("reviewing")} disabled={pending} label="Start review →" />
        )}
        {(request.status === "new" || request.status === "reviewing") && !request.paymentLinkUrl && (
          <PrimaryAction onClick={onGenerateLink} disabled={pending} label="Generate payment link" />
        )}
        {request.status === "quoted" && !request.paidAt && (
          <PrimaryAction onClick={onMarkPaid} disabled={pending} label="Mark as paid" />
        )}
        {request.status === "paid" && (
          <PrimaryAction onClick={() => onSetStatus("filing", "Filing started with the state.")} disabled={pending} label="Start filing" />
        )}
        {request.status === "filing" && (
          <PrimaryAction onClick={() => onSetStatus("completed", "Filing accepted. Customer onboarded.")} disabled={pending} label="Mark complete" />
        )}

        <SecondaryAction onClick={() => onSetStatus("needs_info", "Awaiting customer info.")} disabled={pending} label="Needs info" />
        <SecondaryAction onClick={() => onSetStatus("cancelled", "Request cancelled.")} disabled={pending} label="Cancel" danger />
      </div>
    </div>
  );
}

function PrimaryAction({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
    >
      {disabled && <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
      {label}
    </button>
  );
}

function SecondaryAction({ onClick, disabled, label, danger }: { onClick: () => void; disabled: boolean; label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition disabled:opacity-60 ${
        danger
          ? "border-rose-400/30 bg-rose-400/5 text-rose-200 hover:bg-rose-400/10"
          : "border-white/15 bg-white/[0.04] text-white/85 hover:bg-white/[0.08]"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

function OverviewTab({
  request,
  pkg,
  state,
  addOns,
}: {
  request: FormationRequest;
  pkg: PackageCatalog | null;
  state: StateCatalog | null;
  addOns: AddOnCatalog[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Pane title="Entity">
        <Row k="Type" v={request.input.entityType ?? "—"} />
        <Row k="State" v={state ? `${state.id} · ${state.tagline}` : "—"} />
        <Row k="Residency" v={request.input.residency === "us" ? "U.S. resident" : request.input.residency === "non-us" ? "Non-U.S. resident" : "—"} />
        <Row k="Owners" v={request.input.ownerCount ?? "—"} />
      </Pane>
      <Pane title="Business">
        <Row k="Name" v={request.input.companyName || "—"} />
        <Row k="Backup 1" v={request.input.altName1 || "—"} />
        <Row k="Backup 2" v={request.input.altName2 || "—"} />
        <Row k="Activity" v={request.input.businessActivity || "—"} />
        <Row k="Category" v={request.input.businessCategory || "—"} />
      </Pane>
      <Pane title="Package">
        <Row k="Plan" v={pkg?.name ?? "—"} />
        <Row k="Service price" v={pkg ? formatUSD(pkg.priceUSD) + " one-time" : "—"} />
        <Row k="Filing target" v={pkg?.timeline ?? "—"} />
      </Pane>
      <Pane title="EIN / IRS">
        <Row k="EIN needed" v={labelChoice(request.input.needEin)} />
        <Row k="SSN/ITIN" v={labelYesNo(request.input.hasSsnItin)} />
        <Row k="IRS support" v={labelYesNo(request.input.needIrsSupport)} />
        <Row k="S-Corp election" v={labelChoice(request.input.needSCorp)} />
      </Pane>
      <Pane title={`Add-ons · ${addOns.length}`} className="sm:col-span-2">
        {addOns.length === 0 ? (
          <div className="text-sm text-white/55">No add-ons selected.</div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {addOns.map((a) => (
              <span key={a.id} className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${a.recurring ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border-[#635bff]/30 bg-[#635bff]/10 text-[#a3a0ff]"}`}>
                {a.name}{a.recurring ? ` · ${formatUSD(a.monthlyUSD)}/mo` : a.oneTimeUSD > 0 ? ` · ${formatUSD(a.oneTimeUSD)}` : ""}
              </span>
            ))}
          </div>
        )}
      </Pane>
    </div>
  );
}

function OwnerTab({ request }: { request: FormationRequest }) {
  const i = request.input;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Pane title="Identity">
        <Row k="Full legal name" v={i.ownerFullName || "—"} />
        <Row k="Email" v={i.ownerEmail || "—"} />
        <Row k="Phone" v={i.ownerPhone || "—"} />
        <Row k="Country" v={i.ownerCountry || "—"} />
        <Row k="Role" v={i.ownerRole ?? "—"} />
        <Row k="Ownership" v={i.ownerOwnership ? `${i.ownerOwnership}%` : "—"} />
        <Row k="SSN/ITIN status" v={i.ownerSsnStatus === "has" ? "Has SSN/ITIN" : i.ownerSsnStatus === "none" ? "None" : i.ownerSsnStatus === "unsure" ? "Unsure" : "—"} />
      </Pane>
      <Pane title="Mailing address">
        <Row k="Street" v={i.ownerStreet || "—"} />
        <Row k="City" v={i.ownerCity || "—"} />
        <Row k="State / Province" v={i.ownerState || "—"} />
        <Row k="Postal" v={i.ownerPostal || "—"} />
        <Row k="Business phone" v={i.businessPhone || "—"} />
        <Row k="Existing website" v={i.website || "—"} />
      </Pane>
    </div>
  );
}

function PricingTab({
  request,
  pkg,
  state,
  oneTime,
  recurring,
  total,
}: {
  request: FormationRequest;
  pkg: PackageCatalog | null;
  state: StateCatalog | null;
  oneTime: AddOnCatalog[];
  recurring: AddOnCatalog[];
  total: number;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Pane title="Line items">
        <ul className="divide-y divide-white/5 text-sm">
          <PricingRow k={pkg?.name ?? "Service package"} v={formatUSD(request.pricing.packagePrice)} sub="One-time, billed at checkout" />
          <PricingRow k={state ? `${state.id} state filing fee` : "State filing fee"} v={state && state.feeUSD > 0 ? formatUSD(state.feeUSD) : "TBD"} sub="Paid to the state, not Shata" />
          {oneTime.map((a) => (
            <PricingRow key={a.id} k={a.name} v={a.oneTimeUSD > 0 ? formatUSD(a.oneTimeUSD) : "Included"} sub="One-time" />
          ))}
          {recurring.map((a) => (
            <PricingRow key={a.id} k={a.name} v={`${formatUSD(a.monthlyUSD)}/mo`} sub="Recurring · cancel anytime" recurring />
          ))}
        </ul>
      </Pane>

      <Pane title="Totals">
        <div className="space-y-2 text-sm">
          <Row k="Due at checkout" v={<span className="bg-gradient-to-br from-white to-cyan-200 bg-clip-text font-semibold text-transparent">{formatUSD(total)}</span>} />
          <Row k="Then monthly" v={request.pricing.addOnsRecurring > 0 ? `${formatUSD(request.pricing.addOnsRecurring)}/mo` : "—"} />
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[11px] leading-5 text-white/55">
          Operator-controlled pricing. Adjust catalog values in <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">lib/formation/catalog.ts</code> before sending the link.
        </div>
      </Pane>
    </div>
  );
}

function TimelineTab({ request }: { request: FormationRequest }) {
  return (
    <ol className="relative space-y-0.5">
      <span className="absolute left-[10px] top-2 bottom-2 w-px bg-gradient-to-b from-[#635bff]/40 via-cyan-400/30 to-transparent" />
      {request.activity.map((e) => (
        <li key={e.id} className="relative flex items-start gap-3 py-3">
          <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ring-4 ring-[#070d1c] ${actorDot(e.actor)}`} />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-white/85">{e.message}</div>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-white/45">
              <span>{new Date(e.ts).toLocaleString()}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{e.actor}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{e.type.replace(/_/g, " ")}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function NotesTab({
  request,
  note,
  setNote,
  submitNote,
  pending,
}: {
  request: FormationRequest;
  note: string;
  setNote: (v: string) => void;
  submitNote: (e: React.FormEvent) => void;
  pending: boolean;
}) {
  return (
    <div className="space-y-4">
      <form onSubmit={submitNote} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Internal note — visible to operators only."
          className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={pending || !note.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)] disabled:opacity-50"
          >
            {pending ? "Saving…" : "Add note"}
          </button>
        </div>
      </form>

      {request.notes.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/55">
          No notes yet. Operator notes stay internal and never leave Shata.
        </div>
      ) : (
        <ul className="space-y-2">
          {request.notes.map((n) => (
            <li key={n.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm text-white/85">{n.body}</div>
              <div className="mt-2 text-[10px] uppercase tracking-wider text-white/45">{n.author} · {new Date(n.ts).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right rail cards                                                    */
/* ------------------------------------------------------------------ */

function PaymentCard({ request }: { request: FormationRequest }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Payment</div>
      {request.paidAt ? (
        <>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Paid
          </div>
          <div className="mt-3 text-sm text-white/85">{new Date(request.paidAt).toLocaleString()}</div>
        </>
      ) : request.paymentLinkUrl ? (
        <>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Link sent · awaiting payment
          </div>
          <div className="mt-3 break-all rounded-lg border border-white/10 bg-white/[0.04] p-2 font-mono text-[10px] text-white/70">
            {request.paymentLinkUrl}
          </div>
          <div className="mt-2 text-[10px] text-white/45">Sent {request.paymentLinkSentAt ? new Date(request.paymentLinkSentAt).toLocaleString() : ""}</div>
        </>
      ) : (
        <>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-white/65">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            No payment link yet
          </div>
          <div className="mt-3 text-[11px] leading-5 text-white/55">
            Use the action bar above to generate a Stripe Checkout Session and email the link to the customer.
          </div>
        </>
      )}
    </div>
  );
}

function CustomerCard({ request }: { request: FormationRequest }) {
  const i = request.input;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Customer</div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-sm font-semibold text-white">
          {(i.ownerFullName || "?").slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{i.ownerFullName || "—"}</div>
          <div className="truncate text-[11px] text-white/55">{i.ownerCountry || ""}</div>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs">
        {i.ownerEmail && (
          <a href={`mailto:${i.ownerEmail}`} className="block truncate text-cyan-300 hover:underline">
            {i.ownerEmail}
          </a>
        )}
        {i.ownerPhone && (
          <a href={`tel:${i.ownerPhone}`} className="block truncate text-white/85 hover:underline">
            {i.ownerPhone}
          </a>
        )}
      </div>
    </div>
  );
}

function SnapshotCard({
  request,
  pkg,
  state,
  addOns,
  total,
}: {
  request: FormationRequest;
  pkg: PackageCatalog | null;
  state: StateCatalog | null;
  addOns: AddOnCatalog[];
  total: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Snapshot</div>
      <dl className="mt-3 space-y-1.5 text-sm">
        <Row k="Package" v={pkg?.name ?? "—"} />
        <Row k="State" v={state?.id ?? "—"} />
        <Row k="Add-ons" v={addOns.length === 0 ? "None" : `${addOns.length} selected`} />
        <Row k="Due now" v={<span className="font-semibold">{formatUSD(total)}</span>} />
        <Row k="Then monthly" v={request.pricing.addOnsRecurring > 0 ? `${formatUSD(request.pricing.addOnsRecurring)}/mo` : "—"} />
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function Pane({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${className}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">{title}</div>
      <div className="mt-3 space-y-1.5">{children}</div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-white/55">{k}</span>
      <span className="text-right font-medium text-white">{v}</span>
    </div>
  );
}

function PricingRow({ k, v, sub, recurring }: { k: string; v: string; sub: string; recurring?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <div className="text-sm text-white">{k}</div>
        <div className={`text-[11px] ${recurring ? "text-cyan-300" : "text-white/45"}`}>{sub}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-white">{v}</div>
      </div>
    </li>
  );
}

function StatusPill({ status }: { status: FormationStatus }) {
  const tone = statusToneClass(status);
  const dot = statusDotClass(status);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${tone}`}>
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

function actorDot(actor: "system" | "ops" | "customer"): string {
  if (actor === "system") return "bg-cyan-400";
  if (actor === "ops") return "bg-gradient-to-br from-[#635bff] to-cyan-400";
  return "bg-amber-300";
}

function labelChoice(v: "yes" | "no" | "unsure" | null): string {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  if (v === "unsure") return "Not sure";
  return "—";
}
function labelYesNo(v: "yes" | "no" | null): string {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  return "—";
}
