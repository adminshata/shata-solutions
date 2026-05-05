"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_ONBOARDING_DATA,
  ONBOARDING_STEPS,
  PLANS,
  SERVICE_OPTIONS,
} from "@/lib/constants";
import { saveLead, useScrollLock } from "@/lib/hooks";
import type { OnboardingData, PlanId } from "@/lib/types";

interface Props {
  isDark: boolean;
  open: boolean;
  onClose: () => void;
  initialPlan: PlanId;
  sessionId: string;
}

export default function OnboardingModal({
  isDark,
  open,
  onClose,
  initialPlan,
  sessionId,
}: Props) {
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(DEFAULT_ONBOARDING_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useScrollLock(open);

  // Reset when opened with a new plan
  useEffect(() => {
    if (open) {
      setPlan(initialPlan);
      setStep(1);
      setDone(false);
    }
  }, [open, initialPlan]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const currentPlan = useMemo(() => PLANS.find((p) => p.id === plan)!, [plan]);

  // Step-level validity
  const canContinue = useMemo(() => {
    if (step === 1) return !!plan;
    if (step === 2) return data.businessName && data.state && data.industry;
    if (step === 3)
      return (
        data.ownerName &&
        data.ownerEmail &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.ownerEmail)
      );
    if (step === 4) return data.services.llc;
    if (step === 5) return true;
    return false;
  }, [step, plan, data]);

  function updateField<K extends keyof OnboardingData>(
    k: K,
    v: OnboardingData[K]
  ) {
    setData((prev) => ({ ...prev, [k]: v }));
  }

  function updateService(k: keyof OnboardingData["services"], v: boolean) {
    setData((prev) => ({ ...prev, services: { ...prev.services, [k]: v } }));
  }

  async function submit() {
    setSubmitting(true);
    try {
      await saveLead(
        { email: data.ownerEmail, phone: data.ownerPhone },
        [
          {
            role: "user",
            message: `Onboarding (plan: ${plan}) - ${JSON.stringify(data)}`,
          },
        ],
        sessionId
      );
      setDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Onboarding wizard"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-[fadeIn_0.25s_ease]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col sm:flex-row ${
          isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* LEFT — Stripe-style sidebar */}
        <aside
          className={`sm:w-72 shrink-0 p-6 flex flex-col justify-between ${
            isDark
              ? "bg-gradient-to-br from-blue-700 via-blue-800 to-purple-900 text-white"
              : "bg-gradient-to-br from-blue-600 to-purple-700 text-white"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center font-bold">
                S
              </div>
              <span className="font-semibold">Shata Solutions</span>
            </div>

            <ol className="space-y-4">
              {ONBOARDING_STEPS.map((s) => {
                const active = step === s.id;
                const complete = step > s.id;
                return (
                  <li key={s.id} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                        complete
                          ? "bg-green-400 text-green-900"
                          : active
                          ? "bg-white text-blue-700"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {complete ? "✓" : s.id}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          active ? "text-white" : "text-white/80"
                        }`}
                      >
                        {s.title}
                      </p>
                      <p className="text-xs text-white/60">{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-8 rounded-xl bg-white/10 backdrop-blur p-4 text-xs">
            <p className="font-semibold mb-1">🔒 Secure checkout</p>
            <p className="text-white/80 leading-relaxed">
              Your information is encrypted and never shared. Powered by
              Stripe.
            </p>
          </div>
        </aside>

        {/* RIGHT — form content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <div>
              <p
                className={`text-xs uppercase tracking-widest ${
                  isDark ? "text-white/50" : "text-slate-400"
                }`}
              >
                Step {step} of {ONBOARDING_STEPS.length}
              </p>
              <p
                className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {ONBOARDING_STEPS[step - 1].title}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className={`h-9 w-9 rounded-full flex items-center justify-center transition ${
                isDark
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              ×
            </button>
          </div>

          {/* Progress bar */}
          <div
            className={`h-1 ${
              isDark ? "bg-white/10" : "bg-slate-200"
            } relative overflow-hidden`}
          >
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(step / ONBOARDING_STEPS.length) * 100}%` }}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {done ? (
              <div className="text-center py-12 animate-[scaleIn_0.4s_ease]">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-3xl text-white mb-6 shadow-[0_10px_30px_rgba(34,197,94,0.4)]">
                  ✓
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  You&apos;re all set!
                </h3>
                <p
                  className={`max-w-md mx-auto ${
                    isDark ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  We&apos;ve received your info. A specialist will reach out
                  within 24 hours to finalize your {currentPlan.name} plan.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* STEP 1 — Plan */}
                {step === 1 && (
                  <div className="grid gap-4">
                    {PLANS.map((p) => {
                      const selected = p.id === plan;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setPlan(p.id)}
                          className={`text-left rounded-2xl p-5 border-2 transition ${
                            selected
                              ? "border-blue-500 bg-blue-500/5 shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                              : isDark
                              ? "border-white/10 hover:border-white/20"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{p.name}</h4>
                                {p.badge && (
                                  <span className="text-[10px] bg-blue-500 text-white font-bold px-2 py-0.5 rounded-full">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-sm mt-1 ${
                                  isDark ? "text-white/60" : "text-slate-500"
                                }`}
                              >
                                {p.tagline}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                ${p.priceMonthly}
                                <span
                                  className={`text-sm font-normal ${
                                    isDark ? "text-white/60" : "text-slate-500"
                                  }`}
                                >
                                  /mo
                                </span>
                              </p>
                              <p
                                className={`text-xs ${
                                  isDark ? "text-white/50" : "text-slate-400"
                                }`}
                              >
                                + ${p.oneTime} setup
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* STEP 2 — Business */}
                {step === 2 && (
                  <div className="grid gap-4">
                    <Field
                      label="Business name"
                      value={data.businessName}
                      onChange={(v) => updateField("businessName", v)}
                      placeholder="Acme Holdings LLC"
                      isDark={isDark}
                      required
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Select
                        label="Entity type"
                        value={data.businessType}
                        onChange={(v) => updateField("businessType", v)}
                        options={["LLC", "Corporation (C-Corp)"]}
                        isDark={isDark}
                      />
                      <Select
                        label="State"
                        value={data.state}
                        onChange={(v) => updateField("state", v)}
                        options={[
                          "Wyoming",
                          "Delaware",
                          "New Mexico",
                          "Florida",
                          "Texas",
                          "Nevada",
                        ]}
                        isDark={isDark}
                      />
                    </div>
                    <Field
                      label="Industry"
                      value={data.industry}
                      onChange={(v) => updateField("industry", v)}
                      placeholder="E-commerce, SaaS, Consulting…"
                      isDark={isDark}
                      required
                    />
                  </div>
                )}

                {/* STEP 3 — Owner */}
                {step === 3 && (
                  <div className="grid gap-4">
                    <Field
                      label="Full name"
                      value={data.ownerName}
                      onChange={(v) => updateField("ownerName", v)}
                      placeholder="Jane Founder"
                      isDark={isDark}
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={data.ownerEmail}
                      onChange={(v) => updateField("ownerEmail", v)}
                      placeholder="jane@company.com"
                      isDark={isDark}
                      required
                    />
                    <Field
                      label="WhatsApp / phone"
                      value={data.ownerPhone}
                      onChange={(v) => updateField("ownerPhone", v)}
                      placeholder="+1 619 776 1122"
                      isDark={isDark}
                    />
                    <Field
                      label="Current address"
                      value={data.address}
                      onChange={(v) => updateField("address", v)}
                      placeholder="Cairo, Egypt"
                      isDark={isDark}
                    />
                  </div>
                )}

                {/* STEP 4 — Services */}
                {step === 4 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((s) => {
                      const checked =
                        data.services[s.key as keyof typeof data.services];
                      return (
                        <label
                          key={s.key}
                          className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                            checked
                              ? "border-blue-500 bg-blue-500/5"
                              : isDark
                              ? "border-white/10 hover:border-white/20"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={s.required}
                            onChange={(e) =>
                              updateService(
                                s.key as keyof typeof data.services,
                                e.target.checked
                              )
                            }
                            className="mt-1 h-4 w-4 accent-blue-600"
                          />
                          <div>
                            <p className="flex items-center gap-2 font-semibold">
                              <span>{s.icon}</span>
                              {s.label}
                              {s.required && (
                                <span className="text-[10px] bg-blue-500/20 text-blue-500 px-1.5 py-0.5 rounded-full">
                                  REQUIRED
                                </span>
                              )}
                            </p>
                            <p
                              className={`text-xs mt-1 ${
                                isDark ? "text-white/60" : "text-slate-500"
                              }`}
                            >
                              {s.desc}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* STEP 5 — Review */}
                {step === 5 && (
                  <div className="grid gap-5">
                    <div
                      className={`rounded-2xl p-5 border ${
                        isDark
                          ? "bg-slate-900 border-white/10"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <p
                        className={`text-xs uppercase tracking-widest font-semibold mb-2 ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Plan
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{currentPlan.name}</p>
                          <p
                            className={`text-sm ${
                              isDark ? "text-white/70" : "text-slate-600"
                            }`}
                          >
                            {currentPlan.tagline}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            ${currentPlan.oneTime + currentPlan.priceMonthly}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-white/60" : "text-slate-500"
                            }`}
                          >
                            setup + 1st month
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`grid sm:grid-cols-2 gap-4 rounded-2xl p-5 border ${
                        isDark
                          ? "bg-slate-900 border-white/10"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <ReviewRow
                        label="Business"
                        value={data.businessName || "—"}
                      />
                      <ReviewRow
                        label="State"
                        value={`${data.state}, USA`}
                      />
                      <ReviewRow label="Industry" value={data.industry || "—"} />
                      <ReviewRow
                        label="Owner"
                        value={data.ownerName || "—"}
                      />
                      <ReviewRow
                        label="Email"
                        value={data.ownerEmail || "—"}
                      />
                      <ReviewRow
                        label="Phone"
                        value={data.ownerPhone || "—"}
                      />
                    </div>

                    <p
                      className={`text-xs text-center ${
                        isDark ? "text-white/50" : "text-slate-400"
                      }`}
                    >
                      By continuing, you agree to our Terms & Privacy Policy.
                      Payment is securely processed by Stripe.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!done && (
            <div
              className={`flex items-center justify-between px-6 py-4 border-t ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  isDark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {step === 1 ? "Cancel" : "← Back"}
              </button>
              {step < ONBOARDING_STEPS.length ? (
                <button
                  disabled={!canContinue}
                  onClick={() => setStep(step + 1)}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 font-semibold transition hover:scale-[1.03] active:scale-95"
                >
                  Continue →
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={submit}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white px-8 py-2.5 font-semibold shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition"
                >
                  {submitting ? "Processing…" : "Complete & pay"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  isDark,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  isDark: boolean;
}) {
  return (
    <div>
      <label
        className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${
          isDark ? "text-white/60" : "text-slate-500"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
          isDark
            ? "bg-slate-900 border-white/10 text-white placeholder-white/40"
            : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
        }`}
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  isDark,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  isDark: boolean;
}) {
  return (
    <div>
      <label
        className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${
          isDark ? "text-white/60" : "text-slate-500"
        }`}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
          isDark
            ? "bg-slate-900 border-white/10 text-white"
            : "bg-white border-slate-300 text-slate-900"
        }`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
        {label}
      </p>
      <p className="text-sm mt-1 font-medium break-words">{value}</p>
    </div>
  );
}
