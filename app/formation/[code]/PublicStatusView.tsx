"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";
import {
  STATUS_LABEL,
  STATUS_PIPELINE,
  type FormationRequest,
  type FormationStatus,
} from "@/lib/formation/types";
import { ADDON_CATALOG, PACKAGE_CATALOG, STATE_CATALOG, formatUSD } from "@/lib/formation/catalog";

type PublicReq = Omit<FormationRequest, "notes">;

export default function PublicStatusView({ request }: { request: PublicReq }) {
  const { isDark, toggleTheme } = useTheme();

  const pkg = PACKAGE_CATALOG.find((p) => p.id === request.input.packageId) ?? null;
  const state = STATE_CATALOG.find((s) => s.id === request.input.state) ?? null;
  const addOns = request.input.addOns
    .map((id) => ADDON_CATALOG.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => !!a);
  const total = request.pricing.packagePrice + request.pricing.stateFee + request.pricing.addOnsOneTime;

  const idx = STATUS_PIPELINE.indexOf(request.status);
  const isCancelled = request.status === "cancelled";

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#050b16] text-white" : "bg-[#f6f9ff] text-slate-950"}`}>
      <GlobalStyles />
      <PageBackground isDark={isDark} />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative pt-28">
        <section className="mx-auto max-w-4xl px-4 pb-24 md:px-8">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              Your formation request
            </span>
            <h1 className={`mt-5 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              {pkg?.name ?? "Setup request"}
              <span className={`block text-base font-medium ${isDark ? "text-white/55" : "text-slate-500"}`}>
                <span className="font-mono">{request.code}</span> · submitted {new Date(request.createdAt).toLocaleString()}
              </span>
            </h1>
          </div>

          {/* Status pipeline */}
          <div className={`mt-10 overflow-hidden rounded-[1.75rem] border ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/85"} backdrop-blur-xl`}>
            <div className="p-6 md:p-8">
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Current status</div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <CurrentBadge status={request.status} isDark={isDark} />
                {request.paymentLinkUrl && !request.paidAt && (
                  <a
                    href={request.paymentLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5"
                  >
                    Open secure payment link →
                  </a>
                )}
              </div>
              <p className={`mt-3 max-w-xl text-sm leading-6 ${isDark ? "text-white/65" : "text-slate-600"}`}>
                {nextStepMessage(request)}
              </p>

              {/* Pipeline steps */}
              {!isCancelled && (
                <ol className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {STATUS_PIPELINE.map((s, i) => {
                    const done = i < idx;
                    const current = i === idx;
                    return (
                      <li
                        key={s}
                        className={`relative overflow-hidden rounded-2xl border p-4 transition ${
                          current
                            ? "border-transparent bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)]"
                            : done
                            ? isDark ? "border-cyan-400/30 bg-cyan-400/8 text-cyan-100" : "border-cyan-400/30 bg-cyan-50 text-cyan-700"
                            : isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">Step {String(i + 1).padStart(2, "0")}</div>
                          {(done || current) && <span className="text-xs font-semibold">{current ? "•" : "✓"}</span>}
                        </div>
                        <div className="mt-2 text-sm font-semibold">{STATUS_LABEL[s]}</div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>

          {/* Selection summary + activity */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className={`rounded-[1.5rem] border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/85"}`}>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Your selections</div>
              <dl className="mt-4 space-y-2 text-sm">
                <Row isDark={isDark} k="Package" v={pkg?.name ?? "—"} />
                <Row isDark={isDark} k="Service price" v={pkg ? `${formatUSD(pkg.priceUSD)} one-time` : "—"} />
                <Row isDark={isDark} k="State" v={state ? `${state.id} · ${state.tagline}` : "—"} />
                <Row isDark={isDark} k="State filing fee" v={state && state.feeUSD > 0 ? formatUSD(state.feeUSD) : "Confirmed during call"} />
                <Row isDark={isDark} k="Owners" v={request.input.ownerCount ?? "—"} />
                <Row isDark={isDark} k="EIN" v={labelChoice(request.input.needEin)} />
                <Row isDark={isDark} k="Add-ons" v={addOns.length === 0 ? "None" : `${addOns.length} selected`} />
              </dl>
              {addOns.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {addOns.map((a) => (
                    <span key={a.id} className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                      isDark ? "border-[#635bff]/30 bg-[#635bff]/10 text-[#a3a0ff]" : "border-[#635bff]/30 bg-[#635bff]/5 text-[#635bff]"
                    }`}>
                      {a.name}{a.recurring ? " · recurring" : ""}
                    </span>
                  ))}
                </div>
              )}
              <div className={`mt-5 rounded-xl border p-3 text-[11px] leading-5 ${isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
                <div className="font-semibold uppercase tracking-[0.18em]">Estimated due at checkout</div>
                <div className={`mt-1 text-base font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{formatUSD(total)}</div>
                {request.pricing.addOnsRecurring > 0 && (
                  <div className="mt-1">Then {formatUSD(request.pricing.addOnsRecurring)}/mo for recurring add-ons.</div>
                )}
              </div>
            </div>

            <div className={`rounded-[1.5rem] border p-6 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/85"}`}>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Recent updates</div>
              <ol className="relative mt-4 space-y-0.5">
                <span className={`absolute left-[10px] top-2 bottom-2 w-px bg-gradient-to-b from-[#635bff]/40 via-cyan-400/30 to-transparent`} />
                {request.activity.slice(0, 6).map((e) => (
                  <li key={e.id} className="relative flex items-start gap-3 py-2.5">
                    <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ring-4 ${isDark ? "ring-[#070d1c]" : "ring-white"} ${
                      e.actor === "system" ? "bg-cyan-400" : e.actor === "ops" ? "bg-gradient-to-br from-[#635bff] to-cyan-400" : "bg-amber-300"
                    }`} />
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs ${isDark ? "text-white/85" : "text-slate-700"}`}>{customerSafeMessage(e.message)}</div>
                      <div className={`mt-0.5 text-[10px] ${isDark ? "text-white/45" : "text-slate-500"}`}>{new Date(e.ts).toLocaleString()}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className={`mt-5 rounded-xl border p-3 text-[11px] leading-5 ${isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
                Bookmark this page or save your code <span className="font-mono font-semibold">{request.code}</span> to check status anytime.
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/services" className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"}`}>
              ← Back to Services
            </Link>
            <Link href="/services/llc" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5">
              Start another request →
            </Link>
          </div>

          <div className={`mt-6 rounded-2xl border p-4 text-[11px] leading-5 ${isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
            Shata Solutions is not a law firm and does not provide legal advice. We provide business setup support, filing assistance, and operational launch services.
          </div>
        </section>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function PageBackground({ isDark }: { isDark: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[linear-gradient(to_right,rgba(99,91,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.07)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.05)_1px,transparent_1px)]"
        } bg-[size:72px_72px]`}
      />
      <div className="absolute -left-32 top-[-10%] h-[460px] w-[460px] rounded-full bg-[#635bff]/25 blur-[140px] opacity-50" />
      <div className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px] opacity-50" />
      <div className={`absolute inset-0 ${isDark ? "bg-[#050b16]/40" : "bg-[#f6f9ff]/40"}`} />
    </div>
  );
}

function CurrentBadge({ status, isDark }: { status: FormationStatus; isDark: boolean }) {
  const dot = (() => {
    switch (status) {
      case "new": return "bg-[#635bff]";
      case "reviewing": return "bg-cyan-400";
      case "quoted": return "bg-amber-300";
      case "paid": return "bg-emerald-400";
      case "filing": return "bg-blue-400";
      case "completed": return "bg-gradient-to-br from-[#635bff] to-cyan-400";
      case "cancelled": return "bg-slate-400";
      case "needs_info": return "bg-rose-400";
    }
  })();
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
      isDark ? "border-white/10 bg-white/[0.04] text-white" : "border-slate-200 bg-white text-slate-900"
    }`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}

function Row({ isDark, k, v }: { isDark: boolean; k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className={isDark ? "text-white/55" : "text-slate-500"}>{k}</span>
      <span className={`text-right font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{v}</span>
    </div>
  );
}

function nextStepMessage(r: PublicReq): string {
  switch (r.status) {
    case "new":
      return "Your request was received. Our team will review it and confirm pricing within one business day.";
    case "reviewing":
      return "We're reviewing your selections and locking final pricing. You'll get a secure payment link by email shortly.";
    case "quoted":
      return r.paymentLinkUrl
        ? "Your secure Stripe payment link is ready. Open it to complete payment — your filing starts as soon as the payment clears."
        : "We're preparing your secure payment link.";
    case "paid":
      return "Payment received. Your filing is being prepared and submitted to the state.";
    case "filing":
      return "Filing in progress with the state. We'll update you the moment it's accepted.";
    case "completed":
      return "Your formation is complete. Your launch documents and dashboard access were delivered to your email.";
    case "needs_info":
      return "We need a small piece of information to continue. Check your email — we sent details there.";
    case "cancelled":
      return "This request was cancelled. If this was a mistake, contact us and we'll restore it.";
    default:
      return "";
  }
}

function customerSafeMessage(msg: string): string {
  // Drop internal notes from customer view; the public page already filters notes,
  // but defense-in-depth on the activity stream as well.
  return msg.replace(/^Note added:.*$/i, "Operator added an internal note.");
}

function labelChoice(v: "yes" | "no" | "unsure" | null): string {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  if (v === "unsure") return "Not sure";
  return "—";
}
