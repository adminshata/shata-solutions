"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";
import { submitFormationRequest } from "./actions";
import type { FormationInput } from "@/lib/formation/types";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type EntityType = "LLC" | "Corporation" | "Nonprofit";
type FormationState =
  | "Wyoming"
  | "Delaware"
  | "Florida"
  | "California"
  | "Texas"
  | "New Mexico"
  | "Other";
type Residency = "us" | "non-us";
type OwnerCount = "1" | "2+";
type PackageId = "starter" | "smart" | "stack";
type EinChoice = "yes" | "no" | "unsure";
type YesNo = "yes" | "no";
type SsnStatus = "has" | "none" | "unsure";
type Role = "Member" | "Manager";

type AddOnId =
  | "registered-agent"
  | "business-address"
  | "operating-agreement"
  | "banking-resolution"
  | "compliance-alerts"
  | "domain"
  | "business-email"
  | "website-platform"
  | "stripe-setup"
  | "branding"
  | "accounting";

type FormData = {
  entityType: EntityType | null;
  state: FormationState | null;
  residency: Residency | null;
  ownerCount: OwnerCount | null;

  companyName: string;
  altName1: string;
  altName2: string;
  businessActivity: string;
  businessCategory: string;
  website: string;
  businessPhone: string;

  packageId: PackageId | null;

  ownerFullName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerCountry: string;
  ownerStreet: string;
  ownerCity: string;
  ownerState: string;
  ownerPostal: string;
  ownerOwnership: string;
  ownerRole: Role | null;
  ownerSsnStatus: SsnStatus | null;

  needEin: EinChoice | null;
  hasSsnItin: YesNo | null;
  needIrsSupport: YesNo | null;
  needSCorp: EinChoice | null;

  addOns: AddOnId[];
};

type StepDef = { id: number; key: string; label: string; hint: string };

type PackageDef = {
  id: PackageId;
  name: string;
  tagline: string;
  priceLabel: string;       // e.g. "$399"
  priceNumeric: number;     // e.g. 399
  timeline: string;         // e.g. "3–5 business days"
  features: string[];
  recommended?: boolean;
};

type AddOnDef = {
  id: AddOnId;
  name: string;
  copy: string;
  category: "Compliance" | "Identity" | "Launch" | "Brand";
  recurring: boolean;       // true => billed on a recurring cycle, false => one-time
};

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */

const STEPS: StepDef[] = [
  { id: 1, key: "entity", label: "Entity & State", hint: "Pick the company structure and where to file." },
  { id: 2, key: "business", label: "Business Info", hint: "Name your company and describe what you do." },
  { id: 3, key: "package", label: "Package", hint: "Choose how much we handle for you." },
  { id: 4, key: "owner", label: "Owner / Member", hint: "Who is the primary owner of this company." },
  { id: 5, key: "ein", label: "EIN / IRS", hint: "Tax ID, IRS support, and S-Corp election." },
  { id: 6, key: "addons", label: "Add-ons", hint: "Identity, launch, and brand services to bundle." },
  { id: 7, key: "review", label: "Review", hint: "Confirm before sending to our team." },
];

const ENTITIES: { id: EntityType; tagline: string; copy: string }[] = [
  { id: "LLC", tagline: "Most popular", copy: "Flexible structure, pass-through tax, simpler compliance." },
  { id: "Corporation", tagline: "Best for fundraising", copy: "Stock issuance, board structure, investor-ready." },
  { id: "Nonprofit", tagline: "501(c) ready", copy: "Mission-driven entity with tax-exempt application support." },
];

/** Temporary state filing fees — these are the fees charged by the state, not Shata.
 * Update here when official fees change. Final fee is confirmed before filing. */
type StateRow = {
  id: FormationState;
  tagline: string;
  fee: string;
  feeNumeric: number;
  timeline: string;
};

const STATES: StateRow[] = [
  { id: "Wyoming",    tagline: "Privacy + low fees",      fee: "$104", feeNumeric: 104, timeline: "1–3 business days" },
  { id: "Delaware",   tagline: "Investor standard",       fee: "$110", feeNumeric: 110, timeline: "2–5 business days" },
  { id: "Florida",    tagline: "No state income tax",     fee: "$125", feeNumeric: 125, timeline: "2–4 business days" },
  { id: "California", tagline: "If you operate here",     fee: "$70",  feeNumeric: 70,  timeline: "5–10 business days" },
  { id: "Texas",      tagline: "Strong economy",          fee: "$300", feeNumeric: 300, timeline: "2–4 business days" },
  { id: "New Mexico", tagline: "Lowest cost",             fee: "$50",  feeNumeric: 50,  timeline: "1–3 business days" },
  { id: "Other",      tagline: "Pick during onboarding",  fee: "TBD",  feeNumeric: 0,   timeline: "Confirmed during call" },
];

/** Temporary launch pricing for the Shata service portion only.
 * State filing fees are separate. Final pricing is confirmed before filing. */
const PACKAGES: PackageDef[] = [
  {
    id: "starter",
    name: "Starter Filing",
    tagline: "Simple filing handled for you.",
    priceLabel: "$200",
    priceNumeric: 200,
    timeline: "5–7 business days",
    features: ["State filing preparation", "Name check", "Digital dashboard", "Basic document checklist"],
  },
  {
    id: "smart",
    name: "Smart Launch",
    tagline: "Most popular for new founders.",
    priceLabel: "$399",
    priceNumeric: 399,
    timeline: "3–5 business days",
    recommended: true,
    features: [
      "Formation filing preparation",
      "EIN support",
      "Operating Agreement",
      "Banking Resolution",
      "Compliance reminders",
    ],
  },
  {
    id: "stack",
    name: "Business Stack",
    tagline: "Company plus full launch stack.",
    priceLabel: "$499",
    priceNumeric: 499,
    timeline: "3–7 business days",
    features: [
      "Formation filing preparation",
      "EIN support",
      "Operating Agreement",
      "Business address option",
      "Domain registration",
      "Business email",
      "Website Platform",
      "Stripe setup support",
    ],
  },
];

const ADDONS: AddOnDef[] = [
  { id: "registered-agent",    name: "Registered Agent",            copy: "We receive legal mail on your behalf in the formation state.",        category: "Compliance", recurring: true  },
  { id: "business-address",    name: "Business Address / Mailbox",  copy: "Real U.S. business address with mail scanning.",                      category: "Identity",   recurring: true  },
  { id: "operating-agreement", name: "Operating Agreement",         copy: "Owner rules, ownership splits, and decision-making.",                 category: "Compliance", recurring: false },
  { id: "banking-resolution",  name: "Banking Resolution",          copy: "Document banks request to open your business account.",               category: "Compliance", recurring: false },
  { id: "compliance-alerts",   name: "Compliance Alerts",           copy: "Annual report and state filing reminders.",                           category: "Compliance", recurring: true  },
  { id: "domain",              name: "Domain Registration",         copy: "Find, register, and connect a business domain.",                      category: "Identity",   recurring: false },
  { id: "business-email",      name: "Business Email",              copy: "Professional email like info@yourbrand.com with deliverability setup.", category: "Identity", recurring: true  },
  { id: "website-platform",    name: "Website Platform",            copy: "Premium website on your domain with hosting, SSL, and dashboard.",    category: "Launch",     recurring: true  },
  { id: "stripe-setup",        name: "Stripe Setup",                copy: "Configure Stripe for accepting U.S. payments online.",                category: "Launch",     recurring: false },
  { id: "branding",            name: "Branding",                    copy: "Logo system, visual identity, and brand portal.",                     category: "Brand",      recurring: false },
  { id: "accounting",          name: "Accounting / Tax Consultation", copy: "Intro consultation with a tax-aware accounting partner.",           category: "Launch",     recurring: false },
];

const COUNTRIES = [
  "United States", "Egypt", "United Arab Emirates", "Saudi Arabia", "Canada",
  "United Kingdom", "Germany", "France", "India", "Pakistan", "Nigeria", "Other",
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const INITIAL: FormData = {
  entityType: null,
  state: null,
  residency: null,
  ownerCount: null,
  companyName: "",
  altName1: "",
  altName2: "",
  businessActivity: "",
  businessCategory: "",
  website: "",
  businessPhone: "",
  packageId: "smart",
  ownerFullName: "",
  ownerEmail: "",
  ownerPhone: "",
  ownerCountry: "",
  ownerStreet: "",
  ownerCity: "",
  ownerState: "",
  ownerPostal: "",
  ownerOwnership: "100",
  ownerRole: null,
  ownerSsnStatus: null,
  needEin: null,
  hasSsnItin: null,
  needIrsSupport: null,
  needSCorp: null,
  addOns: ["registered-agent", "operating-agreement"],
};

export default function LLCPage() {
  const { isDark, toggleTheme } = useTheme();

  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const [savedAt, setSavedAt] = useState<Date>(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-update "saved" timestamp whenever data changes (visual only)
  useEffect(() => {
    setSavedAt(new Date());
  }, [data]);

  const totalSteps = STEPS.length;
  const completion = useMemo(() => completionPercent(data, step, submitted), [data, step, submitted]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleAddOn(id: AddOnId) {
    setData((d) => ({
      ...d,
      addOns: d.addOns.includes(id) ? d.addOns.filter((x) => x !== id) : [...d.addOns, id],
    }));
  }

  async function goNext() {
    if (step < totalSteps) {
      setStep(step + 1);
      scrollToTop();
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await submitFormationRequest(data as unknown as FormationInput);
      if (result.ok) {
        setReferenceCode(result.code);
        setSubmittedAt(new Date());
        setSubmitted(true);
        scrollToTop();
      } else {
        setSubmitError(result.error || "Could not submit your request. Please try again.");
      }
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  function goPrev() {
    if (step > 1) {
      setStep(step - 1);
      scrollToTop();
    }
  }
  function jumpTo(target: number) {
    if (target >= 1 && target <= totalSteps) {
      setStep(target);
      scrollToTop();
    }
  }
  function reset() {
    setData(INITIAL);
    setStep(1);
    setSubmitted(false);
    setReferenceCode(null);
    setSubmittedAt(null);
    scrollToTop();
  }

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
        {submitted ? (
          <SuccessState
            data={data}
            isDark={isDark}
            onReset={reset}
            referenceCode={referenceCode ?? "SHATA-LLC-PENDING"}
            submittedAt={submittedAt ?? new Date()}
          />
        ) : (
          <>
            <PageHeader isDark={isDark} step={step} total={totalSteps} completion={completion} savedAt={savedAt} />
            <Stepper isDark={isDark} step={step} onJump={jumpTo} />

            <section className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:px-8 lg:px-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className={`relative overflow-hidden rounded-[1.5rem] border ${
                  isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/85"
                } backdrop-blur-xl`}
                >
                  <StepShell step={step} isDark={isDark}>
                    {step === 1 && <Step1 data={data} update={update} isDark={isDark} />}
                    {step === 2 && <Step2 data={data} update={update} isDark={isDark} />}
                    {step === 3 && <Step3 data={data} update={update} isDark={isDark} />}
                    {step === 4 && <Step4 data={data} update={update} isDark={isDark} />}
                    {step === 5 && <Step5 data={data} update={update} isDark={isDark} />}
                    {step === 6 && <Step6 data={data} toggleAddOn={toggleAddOn} isDark={isDark} />}
                    {step === 7 && <Step7 data={data} isDark={isDark} onJump={jumpTo} />}
                  </StepShell>

                  <StepNav
                    step={step}
                    total={totalSteps}
                    onPrev={goPrev}
                    onNext={goNext}
                    isDark={isDark}
                    submitting={submitting}
                    error={submitError}
                  />
                </div>

                <OrderSummary data={data} isDark={isDark} step={step} total={totalSteps} completion={completion} onJump={jumpTo} />
              </div>
            </section>
          </>
        )}
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Background + page header                                            */
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

function PageHeader({
  isDark,
  step,
  total,
  completion,
  savedAt,
}: {
  isDark: boolean;
  step: number;
  total: number;
  completion: number;
  savedAt: Date;
}) {
  const current = STEPS[step - 1];
  return (
    <header className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a84ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
              U.S. Company Formation
            </span>
            <h1 className={`mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Start your U.S. company.
            </h1>
            <p className={`mt-2 max-w-2xl text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Choose your entity, state, documents, EIN, and business launch add-ons in one guided flow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ProgressDial isDark={isDark} value={completion} />
            <div className={`rounded-2xl border px-4 py-2 text-right ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-slate-500"}`}>
                Step {step} of {total}
              </div>
              <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{current.label}</div>
              <div className={`mt-0.5 text-[10px] ${isDark ? "text-white/45" : "text-slate-500"}`}>
                Saved {timeAgo(savedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProgressDial({ isDark, value }: { isDark: boolean; value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (c * value) / 100;
  return (
    <div className="relative flex h-[60px] w-[60px] items-center justify-center">
      <svg width="60" height="60" className="-rotate-90">
        <circle cx="30" cy="30" r={r} stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"} strokeWidth="4" fill="none" />
        <defs>
          <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#635bff" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r={r} stroke="url(#dialGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} fill="none" />
      </svg>
      <div className={`absolute text-[11px] font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{value}%</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stepper                                                             */
/* ------------------------------------------------------------------ */

function Stepper({ isDark, step, onJump }: { isDark: boolean; step: number; onJump: (n: number) => void }) {
  return (
    <nav aria-label="Form progress" className="relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Desktop */}
        <ol className={`mt-6 hidden overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"} md:grid md:grid-cols-7`}>
          {STEPS.map((s) => {
            const state = s.id < step ? "done" : s.id === step ? "current" : "todo";
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onJump(s.id)}
                  className={`group flex h-full w-full items-center gap-3 px-4 py-3 text-left transition ${
                    state === "current"
                      ? isDark ? "bg-gradient-to-br from-[#635bff]/15 to-cyan-400/10" : "bg-gradient-to-br from-[#635bff]/10 to-cyan-400/5"
                      : ""
                  }`}
                >
                  <span
                    className={`inline-flex h-7 w-7 flex-none items-center justify-center rounded-full text-[11px] font-semibold transition ${
                      state === "done"
                        ? "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white"
                        : state === "current"
                        ? "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_8px_20px_-8px_rgba(99,91,255,0.7)]"
                        : isDark ? "border border-white/15 bg-white/[0.04] text-white/55" : "border border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    {state === "done" ? "✓" : s.id}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-slate-500"}`}>Step {s.id}</span>
                    <span className={`block truncate text-sm font-semibold ${state === "current" ? (isDark ? "text-white" : "text-slate-950") : isDark ? "text-white/75" : "text-slate-700"}`}>{s.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Mobile — scrollable pills */}
        <div className="mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:hidden">
          {STEPS.map((s) => {
            const state = s.id < step ? "done" : s.id === step ? "current" : "todo";
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onJump(s.id)}
                className={`flex flex-none items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  state === "current"
                    ? "border-transparent bg-gradient-to-r from-[#635bff] to-cyan-400 text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
                    : isDark ? "border-white/10 bg-white/[0.04] text-white/70" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${state === "current" ? "bg-white text-[#635bff]" : state === "done" ? "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white" : isDark ? "bg-white/10 text-white/60" : "bg-slate-100 text-slate-500"}`}>
                  {state === "done" ? "✓" : s.id}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Step shell + nav                                                    */
/* ------------------------------------------------------------------ */

function StepShell({ step, isDark, children }: { step: number; isDark: boolean; children: ReactNode }) {
  const def = STEPS[step - 1];
  return (
    <div className="p-6 md:p-9">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Step {step} of {STEPS.length}</div>
          <h2 className={`mt-2 text-2xl font-semibold tracking-tight md:text-3xl ${isDark ? "text-white" : "text-slate-950"}`}>{def.label}</h2>
          <p className={`mt-2 max-w-xl text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{def.hint}</p>
        </div>
        <span className={`hidden rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] md:inline-flex ${isDark ? "border-white/10 bg-white/[0.04] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
          ~ {timelineFor(step)}
        </span>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function StepNav({
  step,
  total,
  onPrev,
  onNext,
  isDark,
  submitting,
  error,
}: {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  isDark: boolean;
  submitting?: boolean;
  error?: string | null;
}) {
  const last = step === total;
  return (
    <div className={`flex flex-col items-stretch gap-3 border-t px-6 py-5 md:px-9 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white/60"}`}>
      {error && (
        <div className={`rounded-xl border px-3 py-2 text-xs ${isDark ? "border-amber-300/30 bg-amber-300/10 text-amber-100" : "border-amber-300 bg-amber-50 text-amber-900"}`} role="alert">
          {error}
        </div>
      )}
      <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 1 || submitting}
        className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
          step === 1 || submitting
            ? isDark ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-white/30" : "cursor-not-allowed border-slate-100 bg-white text-slate-300"
            : isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
        }`}
      >
        ← Previous
      </button>
      <div className={`hidden text-[11px] font-semibold uppercase tracking-[0.22em] md:block ${isDark ? "text-white/45" : "text-slate-500"}`}>
        Step {step} of {total}
      </div>
      <button
        type="button"
        disabled={submitting}
        onClick={onNext}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)] transition ${
          submitting ? "cursor-wait opacity-70" : "hover:-translate-y-0.5"
        }`}
      >
        {submitting ? (
          <>
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting…
          </>
        ) : (
          <>{last ? "Submit company setup request" : "Continue"} →</>
        )}
      </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Entity & State                                              */
/* ------------------------------------------------------------------ */

function Step1({ data, update, isDark }: { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void; isDark: boolean }) {
  return (
    <div className="space-y-10">
      <FieldGroup
        isDark={isDark}
        label="Entity Type"
        helper="Most founders pick LLC. Pick Corporation if you plan to raise from VCs."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {ENTITIES.map((e) => (
            <EntityCard
              key={e.id}
              isDark={isDark}
              selected={data.entityType === e.id}
              onClick={() => update("entityType", e.id)}
              id={e.id}
              tagline={e.tagline}
              copy={e.copy}
            />
          ))}
        </div>
        <NotSureChip isDark={isDark} text="Not sure? Pick LLC and we'll review during onboarding." />
      </FieldGroup>

      <FieldGroup
        isDark={isDark}
        label="State of Formation"
        helper="Wyoming and Delaware are the most popular. Search or pick from the list — we'll confirm the final state fee before filing."
      >
        <StateCombobox
          isDark={isDark}
          value={data.state}
          onChange={(v) => update("state", v)}
        />
        <p className={`mt-3 text-[11px] leading-5 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          State filing fees are separate and may change. Final state fee is confirmed before filing.
        </p>
      </FieldGroup>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldGroup isDark={isDark} label="Owner Residency" helper="Non-U.S. residents can still form a U.S. company.">
          <div className="grid gap-2">
            <ChoiceCard isDark={isDark} selected={data.residency === "us"} onClick={() => update("residency", "us")} title="U.S. resident" subtitle="With SSN or ITIN" compact />
            <ChoiceCard isDark={isDark} selected={data.residency === "non-us"} onClick={() => update("residency", "non-us")} title="Non-U.S. resident" subtitle="International founder" compact />
          </div>
        </FieldGroup>

        <FieldGroup isDark={isDark} label="Number of Owners" helper="You can update this later before filing.">
          <div className="grid gap-2">
            <ChoiceCard isDark={isDark} selected={data.ownerCount === "1"} onClick={() => update("ownerCount", "1")} title="1 owner" subtitle="Single-member" compact />
            <ChoiceCard isDark={isDark} selected={data.ownerCount === "2+"} onClick={() => update("ownerCount", "2+")} title="2 or more owners" subtitle="Multi-member" compact />
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}

/* Premium entity selection card — used by Step1 only */
function EntityCard({
  isDark,
  selected,
  onClick,
  id,
  tagline,
  copy,
}: {
  isDark: boolean;
  selected: boolean;
  onClick: () => void;
  id: EntityType;
  tagline: string;
  copy: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-5 text-left transition will-change-transform hover:-translate-y-0.5 ${
        selected
          ? "border-transparent bg-[linear-gradient(160deg,rgba(99,91,255,0.18),rgba(6,182,212,0.10))] shadow-[0_22px_50px_-22px_rgba(99,91,255,0.6)]"
          : isDark
          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
          : "border-slate-200 bg-white/85 hover:bg-white"
      }`}
    >
      {selected && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#635bff]/60" />
      )}
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={`text-base font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{id}</div>
          <div
            className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
              selected
                ? "bg-gradient-to-r from-[#635bff]/20 to-cyan-400/15 text-[#a3a0ff]"
                : isDark
                ? "bg-white/[0.04] text-white/55"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
            {tagline}
          </div>
        </div>
        <span
          className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[12px] font-semibold transition ${
            selected
              ? "border-transparent bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_8px_18px_-6px_rgba(99,91,255,0.7)]"
              : isDark
              ? "border-white/20 bg-white/[0.04] text-transparent"
              : "border-slate-300 bg-white text-transparent"
          }`}
          aria-hidden
        >
          {selected ? "✓" : ""}
        </span>
      </div>
      <p className={`relative mt-4 text-[13px] leading-5 ${isDark ? "text-white/65" : "text-slate-600"}`}>{copy}</p>
    </button>
  );
}

/* Searchable state-of-formation combobox with fee + timeline metadata */
function StateCombobox({
  isDark,
  value,
  onChange,
}: {
  isDark: boolean;
  value: FormationState | null;
  onChange: (v: FormationState | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selected = value ? STATES.find((s) => s.id === value) ?? null : null;
  const filtered = STATES.filter((s) => s.id.toLowerCase().includes(query.trim().toLowerCase()));

  function pick(id: FormationState) {
    onChange(id);
    setQuery("");
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filtered[active];
      if (target) pick(target.id);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      {/* Search input */}
      <div
        className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 transition focus-within:border-[#635bff] focus-within:ring-2 focus-within:ring-[#635bff]/20 ${
          isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className={isDark ? "text-white/45" : "text-slate-400"}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          placeholder={selected ? "Change state…" : "Search a state — Wyoming, Delaware…"}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKey}
          aria-label="Search U.S. state"
          aria-expanded={open}
          aria-controls="state-listbox"
          className={`w-full bg-transparent text-sm outline-none ${isDark ? "text-white placeholder:text-white/40" : "text-slate-950 placeholder:text-slate-400"}`}
        />
        {selected && (
          <span
            className={`flex-none rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              isDark ? "border-white/10 bg-white/[0.04] text-white/65" : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {selected.fee} state fee
          </span>
        )}
      </div>

      {/* Dropdown listbox */}
      {open && (
        <ul
          id="state-listbox"
          role="listbox"
          className={`absolute z-30 mt-2 max-h-[340px] w-full overflow-y-auto rounded-2xl border p-1 shadow-[0_30px_80px_-30px_rgba(2,6,23,0.6)] backdrop-blur-xl ${
            isDark ? "border-white/10 bg-[#0b1226]/95" : "border-slate-200 bg-white/95"
          }`}
        >
          {filtered.length === 0 && (
            <li className={`px-3 py-3 text-sm ${isDark ? "text-white/55" : "text-slate-500"}`}>No states match — try “Other”.</li>
          )}
          {filtered.map((s, idx) => {
            const isActive = idx === active;
            const isSelected = selected?.id === s.id;
            return (
              <li
                key={s.id}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => { e.preventDefault(); pick(s.id); }}
                onMouseEnter={() => setActive(idx)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition ${
                  isActive
                    ? isDark ? "bg-gradient-to-r from-[#635bff]/15 to-cyan-400/10" : "bg-gradient-to-r from-[#635bff]/10 to-cyan-400/5"
                    : ""
                }`}
              >
                <div className="min-w-0">
                  <div className={`flex items-center gap-2 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                    <span>{s.id}</span>
                    {isSelected && (
                      <span className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className={`mt-0.5 truncate text-[11px] ${isDark ? "text-white/55" : "text-slate-500"}`}>
                    {s.tagline} · {s.timeline}
                  </div>
                </div>
                <div className={`flex-none text-right ${isDark ? "text-white/80" : "text-slate-700"}`}>
                  <div className="text-sm font-semibold">{s.fee}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-slate-400"}`}>State fee</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Selected state summary card */}
      {selected && (
        <div
          className={`mt-3 overflow-hidden rounded-2xl border ${
            isDark ? "border-[#635bff]/30 bg-[#635bff]/8" : "border-[#635bff]/30 bg-[#635bff]/5"
          }`}
        >
          <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center">
            <div>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#a3a0ff]" : "text-[#635bff]"}`}>Selected state</div>
              <div className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{selected.id}</div>
              <div className={`mt-0.5 text-xs ${isDark ? "text-white/60" : "text-slate-600"}`}>{selected.tagline}</div>
            </div>
            <div className={`rounded-xl border p-3 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
              <div className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/45" : "text-slate-500"}`}>State filing fee</div>
              <div className="mt-1 bg-gradient-to-r from-[#635bff] to-cyan-400 bg-clip-text text-base font-semibold text-transparent">{selected.fee}</div>
            </div>
            <div className={`rounded-xl border p-3 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
              <div className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? "text-white/45" : "text-slate-500"}`}>Filing timeline</div>
              <div className={`mt-1 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{selected.timeline}</div>
            </div>
          </div>
          <div className={`flex flex-col items-stretch justify-between gap-2 border-t px-4 py-3 text-[11px] sm:flex-row sm:items-center ${isDark ? "border-white/10 bg-white/[0.02] text-white/55" : "border-slate-200 bg-white/60 text-slate-500"}`}>
            <span>State filing fee is paid to the state, not Shata. Final fee is confirmed before filing.</span>
            <button
              type="button"
              onClick={() => { onChange(null); setQuery(""); setOpen(true); }}
              className={`self-start rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${isDark ? "text-[#a3a0ff] hover:text-white" : "text-[#635bff] hover:text-slate-900"}`}
            >
              Change state
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Business Information                                       */
/* ------------------------------------------------------------------ */

function Step2({ data, update, isDark }: { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void; isDark: boolean }) {
  return (
    <div className="space-y-8">
      <FieldGroup isDark={isDark} label="Company Name" helper="Add two backup names — many states reject the first choice.">
        <div className="grid gap-3">
          <Input isDark={isDark} value={data.companyName} onChange={(v) => update("companyName", v)} label="Desired Company Name" placeholder="e.g. Atlas Holdings LLC" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input isDark={isDark} value={data.altName1} onChange={(v) => update("altName1", v)} label="Alternative Name 1" placeholder="Backup name 1" />
            <Input isDark={isDark} value={data.altName2} onChange={(v) => update("altName2", v)} label="Alternative Name 2" placeholder="Backup name 2" />
          </div>
        </div>
      </FieldGroup>

      <FieldGroup isDark={isDark} label="What does the business do?" helper="Plain-English description helps banks, the IRS, and Stripe.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input isDark={isDark} value={data.businessActivity} onChange={(v) => update("businessActivity", v)} label="Business Activity" placeholder="What you sell or provide" />
          <Select isDark={isDark} value={data.businessCategory} onChange={(v) => update("businessCategory", v)} label="Business Category" options={[
            "Software / SaaS",
            "Ecommerce",
            "Consulting / Agency",
            "Professional Services",
            "Real Estate",
            "Healthcare / Wellness",
            "Education / Coaching",
            "Other",
          ]} />
        </div>
      </FieldGroup>

      <FieldGroup isDark={isDark} label="Optional details" helper="Skip if you don't have these yet. We can register a domain and business email later.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input isDark={isDark} value={data.website} onChange={(v) => update("website", v)} label="Existing Website" placeholder="https://" type="url" />
          <Input isDark={isDark} value={data.businessPhone} onChange={(v) => update("businessPhone", v)} label="Business Phone" placeholder="+1 (___) ___-____" type="tel" />
        </div>
      </FieldGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Package                                                    */
/* ------------------------------------------------------------------ */

function Step3({ data, update, isDark }: { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void; isDark: boolean }) {
  const stateRow = data.state ? STATES.find((s) => s.id === data.state) ?? null : null;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <PackageCard
            key={p.id}
            isDark={isDark}
            pkg={p}
            stateRow={stateRow}
            selected={data.packageId === p.id}
            onClick={() => update("packageId", p.id)}
          />
        ))}
      </div>
      <div className={`rounded-2xl border p-4 text-xs leading-6 ${isDark ? "border-white/10 bg-white/[0.03] text-white/60" : "border-slate-200 bg-white/80 text-slate-600"}`}>
        Temporary launch pricing is shown for the Shata service package only. State filing fees are separate and final pricing is confirmed before filing.
      </div>
    </div>
  );
}

function PackageCard({
  pkg,
  selected,
  onClick,
  isDark,
  stateRow,
}: {
  pkg: PackageDef;
  selected: boolean;
  onClick: () => void;
  isDark: boolean;
  stateRow: StateRow | null;
}) {
  const hasFee = !!stateRow && stateRow.feeNumeric > 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex h-full flex-col overflow-visible rounded-[1.5rem] border p-6 pt-8 text-left transition hover:-translate-y-0.5 ${
        selected
          ? "border-transparent bg-[linear-gradient(160deg,#635bff_0%,#2563eb_45%,#06b6d4_100%)] text-white shadow-[0_30px_70px_-20px_rgba(99,91,255,0.7)]"
          : isDark
          ? "border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]"
          : "border-slate-200 bg-white/80 text-slate-950 hover:bg-white"
      }`}
    >
      {pkg.recommended && !selected && (
        <span className="absolute top-3 left-6 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]">
          Recommended
        </span>
      )}
      {selected && (
        <span className="absolute top-3 left-6 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#635bff]">
          Selected
        </span>
      )}

      <div className="text-lg font-semibold tracking-tight">{pkg.name}</div>
      <div className={`mt-1 text-sm ${selected ? "text-white/85" : isDark ? "text-white/60" : "text-slate-600"}`}>{pkg.tagline}</div>

      {/* Price block */}
      <div className="mt-5">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight">{pkg.priceLabel}</span>
          <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${selected ? "text-white/75" : isDark ? "text-white/45" : "text-slate-500"}`}>
            one-time
          </span>
        </div>
        <div
          className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            selected
              ? "bg-white/15 text-white"
              : isDark
              ? "bg-white/[0.05] text-white/65"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <span>+</span>
          <span>
            {hasFee && stateRow ? `${stateRow.fee} ${stateRow.id} state fee` : "state fee"}
          </span>
        </div>
        <div className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${selected ? "text-white/70" : isDark ? "text-white/40" : "text-slate-500"}`}>
          Filing in {pkg.timeline}
        </div>
      </div>

      <ul className="mt-5 flex-1 space-y-2">
        {pkg.features.map((f) => (
          <li key={f} className={`flex items-start gap-2 text-sm ${selected ? "text-white" : isDark ? "text-white/80" : "text-slate-700"}`}>
            <span className={`mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full text-[10px] font-semibold ${
              selected ? "bg-white text-[#635bff]" : "bg-gradient-to-br from-[#635bff] to-cyan-400 text-white"
            }`}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <div className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${
        selected ? "bg-white text-[#635bff]" : isDark ? "bg-white/[0.06] text-white" : "bg-slate-100 text-slate-900"
      }`}>
        {selected ? "Selected" : "Choose plan"}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 — Owner / Member                                             */
/* ------------------------------------------------------------------ */

function Step4({ data, update, isDark }: { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void; isDark: boolean }) {
  return (
    <div className="space-y-8">
      <FieldGroup isDark={isDark} label="Primary owner" helper="Use the legal name as it appears on government ID.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input isDark={isDark} value={data.ownerFullName} onChange={(v) => update("ownerFullName", v)} label="Full Legal Name" placeholder="As on ID" />
          <Input isDark={isDark} value={data.ownerEmail} onChange={(v) => update("ownerEmail", v)} label="Email" placeholder="you@yourdomain.com" type="email" />
          <Input isDark={isDark} value={data.ownerPhone} onChange={(v) => update("ownerPhone", v)} label="Phone" placeholder="+__ ___ ___ ____" type="tel" />
          <Select isDark={isDark} value={data.ownerCountry} onChange={(v) => update("ownerCountry", v)} label="Country" options={COUNTRIES} />
        </div>
      </FieldGroup>

      <FieldGroup isDark={isDark} label="Mailing address" helper="Personal address — we'll cover the U.S. business address separately.">
        <div className="grid gap-3 sm:grid-cols-6">
          <div className="sm:col-span-3"><Input isDark={isDark} value={data.ownerStreet} onChange={(v) => update("ownerStreet", v)} label="Street Address" placeholder="Street + number" /></div>
          <div className="sm:col-span-3"><Input isDark={isDark} value={data.ownerCity} onChange={(v) => update("ownerCity", v)} label="City" placeholder="City" /></div>
          <div className="sm:col-span-2"><Input isDark={isDark} value={data.ownerState} onChange={(v) => update("ownerState", v)} label="State / Province" placeholder="State / Province" /></div>
          <div className="sm:col-span-2"><Input isDark={isDark} value={data.ownerPostal} onChange={(v) => update("ownerPostal", v)} label="Postal Code" placeholder="ZIP / Postal" /></div>
          <div className="sm:col-span-2"><Input isDark={isDark} value={data.ownerOwnership} onChange={(v) => update("ownerOwnership", v)} label="Ownership %" placeholder="100" type="number" /></div>
        </div>
      </FieldGroup>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldGroup isDark={isDark} label="Role">
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceCard isDark={isDark} selected={data.ownerRole === "Member"} onClick={() => update("ownerRole", "Member")} title="Member" subtitle="Owner only" compact />
            <ChoiceCard isDark={isDark} selected={data.ownerRole === "Manager"} onClick={() => update("ownerRole", "Manager")} title="Manager" subtitle="Owner + manager" compact />
          </div>
        </FieldGroup>

        <FieldGroup isDark={isDark} label="SSN / ITIN status" helper="Used only to plan EIN and tax setup. We never share this.">
          <div className="grid gap-2">
            <ChoiceCard isDark={isDark} selected={data.ownerSsnStatus === "has"} onClick={() => update("ownerSsnStatus", "has")} title="Has SSN or ITIN" compact />
            <ChoiceCard isDark={isDark} selected={data.ownerSsnStatus === "none"} onClick={() => update("ownerSsnStatus", "none")} title="No SSN/ITIN" subtitle="We will guide you" compact />
            <ChoiceCard isDark={isDark} selected={data.ownerSsnStatus === "unsure"} onClick={() => update("ownerSsnStatus", "unsure")} title="Not sure" subtitle="We will explain in onboarding" compact />
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 5 — EIN / IRS                                                  */
/* ------------------------------------------------------------------ */

function Step5({ data, update, isDark }: { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void; isDark: boolean }) {
  return (
    <div className="space-y-8">
      <div className={`rounded-2xl border p-4 text-xs leading-6 ${isDark ? "border-[#635bff]/30 bg-[#635bff]/10 text-white/80" : "border-[#635bff]/30 bg-[#635bff]/5 text-slate-700"}`}>
        Your EIN is the U.S. tax ID for your company. You need it to open a bank account, hire, or accept Stripe payments. We can prepare it for you whether or not you have an SSN/ITIN.
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldGroup isDark={isDark} label="Need an EIN?">
          <Trio isDark={isDark} value={data.needEin} onChange={(v) => update("needEin", v)} options={[["yes","Yes"],["no","No"],["unsure","Not sure"]]} />
        </FieldGroup>

        <FieldGroup isDark={isDark} label="Do you have SSN or ITIN?">
          <Duo isDark={isDark} value={data.hasSsnItin} onChange={(v) => update("hasSsnItin", v)} options={[["yes","Yes"],["no","No"]]} />
        </FieldGroup>

        <FieldGroup isDark={isDark} label="Need IRS fax / call support?" helper="For non-US residents, EIN by fax can be faster.">
          <Duo isDark={isDark} value={data.needIrsSupport} onChange={(v) => update("needIrsSupport", v)} options={[["yes","Yes"],["no","No"]]} />
        </FieldGroup>

        <FieldGroup isDark={isDark} label="Need S-Corp election?" helper="Tax treatment for some U.S.-resident owners. We'll review with you.">
          <Trio isDark={isDark} value={data.needSCorp} onChange={(v) => update("needSCorp", v)} options={[["yes","Yes"],["no","No"],["unsure","Not sure"]]} />
        </FieldGroup>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 6 — Add-ons                                                    */
/* ------------------------------------------------------------------ */

function Step6({ data, toggleAddOn, isDark }: { data: FormData; toggleAddOn: (id: AddOnId) => void; isDark: boolean }) {
  const groups: Record<AddOnDef["category"], AddOnDef[]> = {
    Compliance: [],
    Identity: [],
    Launch: [],
    Brand: [],
  };
  ADDONS.forEach((a) => groups[a.category].push(a));

  return (
    <div className="space-y-8">
      <div className={`rounded-2xl border p-4 text-xs leading-6 ${isDark ? "border-white/10 bg-white/[0.03] text-white/65" : "border-slate-200 bg-white/80 text-slate-600"}`}>
        Pick anything that helps your business launch faster. Add-ons can be removed before billing.
      </div>

      {(Object.keys(groups) as (keyof typeof groups)[]).map((cat) => (
        <FieldGroup key={cat} isDark={isDark} label={cat}>
          <div className="grid gap-3 sm:grid-cols-2">
            {groups[cat].map((a) => (
              <AddOnCard
                key={a.id}
                isDark={isDark}
                addon={a}
                selected={data.addOns.includes(a.id)}
                onToggle={() => toggleAddOn(a.id)}
              />
            ))}
          </div>
        </FieldGroup>
      ))}
    </div>
  );
}

function AddOnCard({ addon, selected, onToggle, isDark }: { addon: AddOnDef; selected: boolean; onToggle: () => void; isDark: boolean }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${
        selected
          ? "border-[#635bff] bg-[#635bff]/10 shadow-[0_18px_40px_-18px_rgba(99,91,255,0.6)]"
          : isDark
          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
          : "border-slate-200 bg-white/80 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={`text-sm font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{addon.name}</div>
          <p className={`mt-1 text-xs leading-5 ${isDark ? "text-white/60" : "text-slate-600"}`}>{addon.copy}</p>
        </div>
        <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[11px] font-semibold transition ${
          selected
            ? "border-transparent bg-gradient-to-br from-[#635bff] to-cyan-400 text-white"
            : isDark ? "border-white/15 bg-white/[0.04] text-white/40" : "border-slate-200 bg-white text-slate-400"
        }`}>
          {selected ? "✓" : "+"}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Step 7 — Review                                                     */
/* ------------------------------------------------------------------ */

function Step7({ data, isDark, onJump }: { data: FormData; isDark: boolean; onJump: (n: number) => void }) {
  const missing = collectMissing(data);
  const pkg = PACKAGES.find((p) => p.id === data.packageId);
  const selectedAddons = ADDONS.filter((a) => data.addOns.includes(a.id));

  return (
    <div className="space-y-6">
      {missing.length > 0 && (
        <div className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${isDark ? "border-amber-300/30 bg-amber-300/10 text-amber-100" : "border-amber-300 bg-amber-50 text-amber-900"}`}>
          <div>
            <div className="text-sm font-semibold">A few details still missing</div>
            <div className="mt-1 text-xs leading-5">You can submit anyway and add them during onboarding, or jump back to fill them now.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {missing.map((m) => (
              <button key={m.label} type="button" onClick={() => onJump(m.step)} className="rounded-full border border-amber-400/40 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider hover:-translate-y-0.5">
                Add {m.label} →
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewCard isDark={isDark} title="Entity & State" step={1} onEdit={onJump} items={[
          ["Entity", data.entityType ?? "—"],
          ["State", data.state ?? "—"],
          ["Residency", data.residency ? (data.residency === "us" ? "U.S. resident" : "Non-U.S. resident") : "—"],
          ["Owners", data.ownerCount ?? "—"],
        ]} />

        <ReviewCard isDark={isDark} title="Business" step={2} onEdit={onJump} items={[
          ["Name", data.companyName || "—"],
          ["Backup 1", data.altName1 || "—"],
          ["Activity", data.businessActivity || "—"],
          ["Category", data.businessCategory || "—"],
        ]} />

        <ReviewCard isDark={isDark} title="Package" step={3} onEdit={onJump} items={[
          ["Plan", pkg?.name ?? "—"],
          ["Includes", pkg ? `${pkg.features.length} services` : "—"],
        ]} />

        <ReviewCard isDark={isDark} title="Owner" step={4} onEdit={onJump} items={[
          ["Name", data.ownerFullName || "—"],
          ["Email", data.ownerEmail || "—"],
          ["Country", data.ownerCountry || "—"],
          ["Role", data.ownerRole ?? "—"],
        ]} />

        <ReviewCard isDark={isDark} title="EIN / IRS" step={5} onEdit={onJump} items={[
          ["EIN needed", labelChoice(data.needEin)],
          ["SSN/ITIN", labelYesNo(data.hasSsnItin)],
          ["IRS support", labelYesNo(data.needIrsSupport)],
          ["S-Corp", labelChoice(data.needSCorp)],
        ]} />

        <ReviewCard isDark={isDark} title="Add-ons" step={6} onEdit={onJump} items={
          selectedAddons.length === 0
            ? [["Selected", "None — you can add later"]]
            : selectedAddons.slice(0, 6).map<[string, string]>((a) => [a.name, "Included"])
        } />
      </div>

      <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
        <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>What happens next</div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Confirmation call", "We review your selections and confirm next steps within one business day."],
            ["Filing prepared", "We prepare formation documents, EIN packet, and selected add-ons."],
            ["Launch handoff", "You receive your formation pack and dashboard access for ongoing support."],
          ].map(([t, c], i) => (
            <li key={t} className={`rounded-xl border p-4 text-sm ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
              <div className={`bg-gradient-to-r from-[#635bff] to-cyan-400 bg-clip-text text-xs font-semibold text-transparent`}>STEP 0{i + 1}</div>
              <div className={`mt-1 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{t}</div>
              <p className={`mt-1 text-xs leading-5 ${isDark ? "text-white/60" : "text-slate-600"}`}>{c}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ReviewCard({
  isDark,
  title,
  step,
  items,
  onEdit,
}: {
  isDark: boolean;
  title: string;
  step: number;
  items: [string, string][];
  onEdit: (n: number) => void;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/80"}`}>
      <div className="flex items-center justify-between">
        <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
        <button type="button" onClick={() => onEdit(step)} className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-[#8a84ff] hover:text-white" : "text-[#635bff] hover:text-slate-900"}`}>Edit →</button>
      </div>
      <dl className="mt-3 space-y-1.5 text-sm">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-3">
            <dt className={isDark ? "text-white/55" : "text-slate-500"}>{k}</dt>
            <dd className={`text-right font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Order summary                                                       */
/* ------------------------------------------------------------------ */

function OrderSummary({
  data,
  isDark,
  step,
  total,
  completion,
  onJump,
}: {
  data: FormData;
  isDark: boolean;
  step: number;
  total: number;
  completion: number;
  onJump: (n: number) => void;
}) {
  const pkg = PACKAGES.find((p) => p.id === data.packageId);
  const addOnNames = ADDONS.filter((a) => data.addOns.includes(a.id)).map((a) => a.name);

  return (
    <aside className={`relative rounded-[1.5rem] border ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white/85"} backdrop-blur-xl lg:sticky lg:top-28 lg:h-fit`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Order summary</div>
          <div className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-slate-500"}`}>Step {step}/{total}</div>
        </div>

        {/* Completion bar */}
        <div className={`mt-4 h-1.5 w-full overflow-hidden rounded-full ${isDark ? "bg-white/[0.06]" : "bg-slate-100"}`}>
          <div className="h-full rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 transition-all duration-500" style={{ width: `${completion}%` }} />
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <SummaryLine isDark={isDark} k="Entity" v={data.entityType ?? "—"} onEdit={() => onJump(1)} />
          <SummaryLine isDark={isDark} k="State" v={data.state ?? "—"} onEdit={() => onJump(1)} />
          <SummaryLine isDark={isDark} k="Owners" v={data.ownerCount ? `${data.ownerCount} owner${data.ownerCount === "2+" ? "s" : ""}` : "—"} onEdit={() => onJump(1)} />
          <SummaryLine isDark={isDark} k="Package" v={pkg?.name ?? "—"} onEdit={() => onJump(3)} highlighted={!!pkg?.recommended && data.packageId === pkg.id} />
          <SummaryLine isDark={isDark} k="EIN" v={data.needEin ? labelChoice(data.needEin) : "—"} onEdit={() => onJump(5)} />
        </div>

        <div className="mt-6">
          <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-slate-500"}`}>
            Add-ons ({addOnNames.length})
          </div>
          {addOnNames.length === 0 ? (
            <div className={`mt-2 rounded-xl border p-3 text-xs ${isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
              No add-ons selected yet.
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {addOnNames.map((n) => (
                <span key={n} className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${isDark ? "border-[#635bff]/30 bg-[#635bff]/10 text-[#a3a0ff]" : "border-[#635bff]/30 bg-[#635bff]/5 text-[#635bff]"}`}>
                  {n}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={`mt-6 rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
          <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Estimated timeline</div>
          <div className={`mt-2 text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{estimatedTimeline(data)}</div>
          <div className={`mt-1 text-xs ${isDark ? "text-white/55" : "text-slate-500"}`}>Final timing depends on the chosen state and EIN method.</div>
        </div>

        <div className={`mt-6 rounded-2xl border p-4 text-[11px] leading-5 ${isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
          Shata Solutions is not a law firm and does not provide legal advice. We provide business setup support, filing assistance, and operational launch services.
        </div>
      </div>
    </aside>
  );
}

function SummaryLine({
  isDark,
  k,
  v,
  onEdit,
  highlighted,
}: {
  isDark: boolean;
  k: string;
  v: string;
  onEdit?: () => void;
  highlighted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className={`${isDark ? "text-white/55" : "text-slate-500"}`}>{k}</span>
      <span className="flex items-center gap-2">
        <span className={`text-right font-semibold ${highlighted ? (isDark ? "text-cyan-300" : "text-[#635bff]") : isDark ? "text-white" : "text-slate-900"}`}>{v}</span>
        {onEdit && (
          <button type="button" onClick={onEdit} className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}>edit</button>
        )}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success state                                                       */
/* ------------------------------------------------------------------ */

function SuccessState({
  data,
  isDark,
  onReset,
  referenceCode,
  submittedAt,
}: {
  data: FormData;
  isDark: boolean;
  onReset: () => void;
  referenceCode: string;
  submittedAt: Date;
}) {
  const pkg = PACKAGES.find((p) => p.id === data.packageId);
  const stateRow = data.state ? STATES.find((s) => s.id === data.state) ?? null : null;
  const selectedAddons = ADDONS.filter((a) => data.addOns.includes(a.id));
  const recurring = selectedAddons.filter((a) => a.recurring);
  const oneTime = selectedAddons.filter((a) => !a.recurring);
  const reviewBy = new Date(submittedAt.getTime() + 24 * 60 * 60 * 1000); // +1 business day target

  return (
    <section className="mx-auto max-w-4xl px-4 pb-32 pt-10 md:px-8">
      <div className={`relative overflow-hidden rounded-[2rem] border ${isDark ? "border-white/10 bg-[#070d1c]" : "border-slate-200 bg-white"} shadow-[0_40px_120px_-30px_rgba(2,6,23,0.6)]`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,91,255,0.30),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.25),transparent_50%)]" />

        <div className="relative px-6 pb-2 pt-10 text-center md:px-12 md:pt-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-[0_20px_50px_-15px_rgba(99,91,255,0.7)]">
            <span className="text-2xl font-semibold">✓</span>
          </div>
          <h1 className={`mt-6 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
            Your setup request is ready.
          </h1>
          <p className={`mx-auto mt-3 max-w-xl text-sm leading-6 ${isDark ? "text-white/65" : "text-slate-600"}`}>
            Our team will review your request, confirm final pricing, and send a secure payment link. You don&apos;t need to pay anything yet.
          </p>

          {/* Reference code card */}
          <div className={`mx-auto mt-7 inline-flex items-center gap-3 rounded-2xl border px-4 py-3 ${isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white"}`}>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-slate-500"}`}>Reference code</span>
            <span className={`font-mono text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{referenceCode}</span>
          </div>
          <div className={`mt-2 text-[11px] ${isDark ? "text-white/45" : "text-slate-500"}`}>Submitted {submittedAt.toLocaleString()}</div>
          <Link
            href={`/formation/${referenceCode}`}
            className={`mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-[#a3a0ff] hover:text-white" : "text-[#635bff] hover:text-slate-900"}`}
          >
            Track this request →
          </Link>
        </div>

        {/* Body */}
        <div className="relative grid gap-4 px-6 pb-6 pt-8 md:grid-cols-2 md:px-12 md:pb-10">
          {/* Selection summary */}
          <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
            <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Your request</div>
            <dl className="mt-4 space-y-2 text-sm">
              <Row isDark={isDark} k="Package" v={pkg?.name ?? "—"} />
              <Row isDark={isDark} k="Shata service price" v={pkg ? `${pkg.priceLabel} one-time` : "—"} />
              <Row isDark={isDark} k="State" v={data.state ?? "—"} />
              <Row isDark={isDark} k="State filing fee" v={stateRow ? (stateRow.feeNumeric > 0 ? `${stateRow.fee} (paid to state)` : "Confirmed during call") : "—"} />
              <Row isDark={isDark} k="Owners" v={data.ownerCount ?? "—"} />
              <Row isDark={isDark} k="EIN" v={labelChoice(data.needEin)} />
              <Row isDark={isDark} k="Add-ons" v={selectedAddons.length === 0 ? "None" : `${selectedAddons.length} selected`} />
            </dl>
            {selectedAddons.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selectedAddons.map((a) => (
                  <span key={a.id} className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${isDark ? "border-[#635bff]/30 bg-[#635bff]/10 text-[#a3a0ff]" : "border-[#635bff]/30 bg-[#635bff]/5 text-[#635bff]"}`}>
                    {a.name}{a.recurring ? " · recurring" : ""}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Payment status + plan preview */}
          <div className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center justify-between">
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-[#8a84ff]" : "text-[#635bff]"}`}>Payment status</div>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                isDark ? "border-amber-300/30 bg-amber-300/10 text-amber-100" : "border-amber-300 bg-amber-50 text-amber-800"
              }`}>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Pending review
              </span>
            </div>
            <div className={`mt-3 text-sm leading-6 ${isDark ? "text-white/70" : "text-slate-700"}`}>
              We&apos;ll review your selections and confirm final pricing before sending a secure Stripe payment link to your email.
            </div>

            {/* Plan preview */}
            <div className={`mt-4 rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
              <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/55" : "text-slate-500"}`}>Estimated plan</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className={isDark ? "text-white/65" : "text-slate-600"}>Shata package</span>
                  <span className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{pkg ? `${pkg.priceLabel}` : "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? "text-white/65" : "text-slate-600"}>State filing fee</span>
                  <span className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{stateRow && stateRow.feeNumeric > 0 ? stateRow.fee : "TBD"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? "text-white/65" : "text-slate-600"}>Add-ons (one-time)</span>
                  <span className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{oneTime.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? "text-white/65" : "text-slate-600"}>Add-ons (recurring)</span>
                  <span className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{recurring.length}</span>
                </div>
              </div>
              <div className={`mt-3 rounded-lg border p-2.5 text-[11px] leading-5 ${isDark ? "border-white/10 bg-white/[0.02] text-white/55" : "border-slate-100 bg-slate-50 text-slate-500"}`}>
                One-time services billed once at checkout. Recurring services renew on a schedule and can be cancelled anytime before renewal.
              </div>
            </div>

            {/* Disabled premium payment button */}
            <button
              type="button"
              disabled
              aria-disabled
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                isDark
                  ? "cursor-not-allowed border border-white/10 bg-white/[0.04] text-white/55"
                  : "cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-400"
              }`}
              title="A secure Stripe payment link will be sent after review"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 17v.01M12 14a2 2 0 0 0 2-2 2 2 0 1 0-4 0M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Payment link pending review
            </button>
            <div className={`mt-2 text-center text-[11px] ${isDark ? "text-white/45" : "text-slate-500"}`}>
              Target review: by {reviewBy.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="relative px-6 pb-10 md:px-12">
          <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/55" : "text-slate-500"}`}>What happens next</div>
          <ol className="mt-3 grid gap-3 sm:grid-cols-4">
            {[
              ["01", "Submitted", "We received your request and saved it for review."],
              ["02", "Operator review", "We confirm details and lock in final pricing within one business day."],
              ["03", "Payment link", "You receive a secure Stripe link by email — pay only after review."],
              ["04", "Filing & launch", "We file with the state and start your selected add-ons."],
            ].map(([k, t, c], i) => (
              <li key={t} className={`rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
                <div className="bg-gradient-to-r from-[#635bff] to-cyan-400 bg-clip-text text-xs font-semibold text-transparent">STEP {k}</div>
                <div className={`mt-1 text-sm font-semibold ${i === 0 ? "" : ""} ${isDark ? "text-white" : "text-slate-950"}`}>{t}</div>
                <p className={`mt-1 text-[11px] leading-5 ${isDark ? "text-white/55" : "text-slate-500"}`}>{c}</p>
                {i === 0 && (
                  <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] ${isDark ? "bg-cyan-400/15 text-cyan-200" : "bg-cyan-100 text-cyan-700"}`}>
                    <span className="h-1 w-1 rounded-full bg-cyan-400" /> Done
                  </span>
                )}
              </li>
            ))}
          </ol>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/services" className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? "border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"}`}>
              ← Back to Services
            </Link>
            <button type="button" onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-15px_rgba(99,91,255,0.7)] transition hover:-translate-y-0.5">
              Start another request →
            </button>
          </div>

          <div className={`mt-6 rounded-2xl border p-4 text-[11px] leading-5 ${isDark ? "border-white/10 bg-white/[0.03] text-white/55" : "border-slate-200 bg-white text-slate-500"}`}>
            Keep your reference code <span className="font-mono font-semibold">{referenceCode}</span> for any follow-up. Shata Solutions is not a law firm and does not provide legal advice. We provide business setup support, filing assistance, and operational launch services.
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ isDark, k, v }: { isDark: boolean; k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className={isDark ? "text-white/55" : "text-slate-500"}>{k}</dt>
      <dd className={`text-right font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{v}</dd>
    </div>
  );
}

function SummaryStat({ isDark, k, v }: { isDark: boolean; k: string; v: string }) {
  return (
    <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
      <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-slate-500"}`}>{k}</div>
      <div className={`mt-1 text-base font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{v}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Generic UI primitives                                               */
/* ------------------------------------------------------------------ */

function FieldGroup({ isDark, label, helper, children }: { isDark: boolean; label: string; helper?: string; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{label}</label>
      </div>
      {helper && <p className={`mt-1 text-xs leading-5 ${isDark ? "text-white/55" : "text-slate-500"}`}>{helper}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Input({
  isDark,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  isDark: boolean;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/55" : "text-slate-500"}`}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20 ${
          isDark ? "border-white/10 bg-white/[0.04] text-white placeholder:text-white/30" : "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400"
        }`}
      />
    </label>
  );
}

function Select({
  isDark,
  label,
  value,
  onChange,
  options,
}: {
  isDark: boolean;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-white/55" : "text-slate-500"}`}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20 ${
          isDark ? "border-white/10 bg-white/[0.04] text-white" : "border-slate-200 bg-white text-slate-950"
        }`}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function ChoiceCard({
  isDark,
  selected,
  onClick,
  title,
  subtitle,
  copy,
  compact,
}: {
  isDark: boolean;
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  copy?: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex h-full w-full flex-col rounded-2xl border ${compact ? "p-4" : "p-5"} text-left transition hover:-translate-y-0.5 ${
        selected
          ? "border-[#635bff] bg-[#635bff]/10 shadow-[0_18px_40px_-18px_rgba(99,91,255,0.6)]"
          : isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "border-slate-200 bg-white/80 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={`text-sm font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
          {subtitle && <div className={`mt-0.5 text-[11px] font-semibold uppercase tracking-wider ${selected ? (isDark ? "text-[#a3a0ff]" : "text-[#635bff]") : isDark ? "text-white/45" : "text-slate-500"}`}>{subtitle}</div>}
        </div>
        <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[11px] font-semibold transition ${
          selected ? "border-transparent bg-gradient-to-br from-[#635bff] to-cyan-400 text-white" : isDark ? "border-white/15 bg-white/[0.04] text-white/40" : "border-slate-200 bg-white text-slate-400"
        }`}>
          {selected ? "✓" : ""}
        </span>
      </div>
      {copy && <p className={`mt-3 text-xs leading-5 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>}
    </button>
  );
}

function NotSureChip({ isDark, text }: { isDark: boolean; text: string }) {
  return (
    <div className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${isDark ? "border-white/10 bg-white/[0.03] text-white/65" : "border-slate-200 bg-white text-slate-600"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#635bff] to-cyan-400" />
      {text}
    </div>
  );
}

function Trio({
  isDark,
  value,
  onChange,
  options,
}: {
  isDark: boolean;
  value: EinChoice | null;
  onChange: (v: EinChoice) => void;
  options: [EinChoice, string][];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {options.map(([id, label]) => (
        <ChoiceCard key={id} isDark={isDark} selected={value === id} onClick={() => onChange(id)} title={label} compact />
      ))}
    </div>
  );
}

function Duo({
  isDark,
  value,
  onChange,
  options,
}: {
  isDark: boolean;
  value: YesNo | null;
  onChange: (v: YesNo) => void;
  options: [YesNo, string][];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(([id, label]) => (
        <ChoiceCard key={id} isDark={isDark} selected={value === id} onClick={() => onChange(id)} title={label} compact />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function labelChoice(v: EinChoice | null): string {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  if (v === "unsure") return "Not sure";
  return "—";
}

function labelYesNo(v: YesNo | null): string {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  return "—";
}

function timelineFor(step: number): string {
  if (step === 1) return "1 minute";
  if (step === 2) return "2 minutes";
  if (step === 3) return "30 seconds";
  if (step === 4) return "2 minutes";
  if (step === 5) return "1 minute";
  if (step === 6) return "1 minute";
  return "30 seconds";
}

function estimatedTimeline(data: FormData): string {
  if (!data.state) return "Set after state choice";
  if (data.state === "Wyoming" || data.state === "New Mexico") return "Filing in 1–3 business days";
  if (data.state === "Delaware") return "Filing in 2–5 business days";
  if (data.state === "Florida" || data.state === "Texas") return "Filing in 2–4 business days";
  if (data.state === "California") return "Filing in 5–10 business days";
  return "Reviewed during onboarding call";
}

function completionPercent(data: FormData, step: number, submitted: boolean): number {
  if (submitted) return 100;
  let score = 0;
  let total = 0;
  const add = (filled: boolean, weight = 1) => { total += weight; if (filled) score += weight; };

  add(!!data.entityType);
  add(!!data.state);
  add(!!data.residency);
  add(!!data.ownerCount);
  add(data.companyName.trim().length > 0, 2);
  add(data.businessActivity.trim().length > 0);
  add(data.businessCategory.trim().length > 0);
  add(!!data.packageId);
  add(data.ownerFullName.trim().length > 0, 2);
  add(data.ownerEmail.trim().length > 0);
  add(!!data.ownerCountry);
  add(!!data.ownerRole);
  add(!!data.ownerSsnStatus);
  add(!!data.needEin);
  add(!!data.hasSsnItin);
  add(!!data.needIrsSupport);
  add(!!data.needSCorp);
  add(data.addOns.length > 0);

  // Floor based on step traversal so the dial always moves forward
  const stepFloor = Math.round(((step - 1) / (STEPS.length - 1)) * 80);
  const pct = Math.round((score / total) * 100);
  return Math.min(100, Math.max(stepFloor, pct));
}

function collectMissing(data: FormData): { label: string; step: number }[] {
  const out: { label: string; step: number }[] = [];
  if (!data.entityType || !data.state || !data.residency || !data.ownerCount) out.push({ label: "Entity & State", step: 1 });
  if (!data.companyName.trim()) out.push({ label: "Company Name", step: 2 });
  if (!data.businessActivity.trim() || !data.businessCategory.trim()) out.push({ label: "Business Activity", step: 2 });
  if (!data.packageId) out.push({ label: "Package", step: 3 });
  if (!data.ownerFullName.trim() || !data.ownerEmail.trim()) out.push({ label: "Owner Info", step: 4 });
  if (!data.needEin || !data.hasSsnItin) out.push({ label: "EIN / IRS", step: 5 });
  return out;
}

function timeAgo(d: Date): string {
  const diff = Math.max(1, Math.round((Date.now() - d.getTime()) / 1000));
  if (diff < 60) return `${diff}s ago`;
  const m = Math.round(diff / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.round(m / 60)}h ago`;
}

/** SHATA-LLC-XXXX — short, unambiguous reference code (no 0/O/1/I) */
function generateReferenceCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `SHATA-LLC-${code}`;
}

