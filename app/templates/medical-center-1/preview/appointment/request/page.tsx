"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { Container, PageBanner } from "@/components/templates/shata-medical/ui/Atoms";
import { Button } from "@/components/templates/shata-medical/ui/Button";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function AppointmentRequestPage() {
  return (
    <Suspense fallback={null}>
      <Body />
    </Suspense>
  );
}

function Body() {
  const config = useSite();
  const router = useRouter();
  const sp = useSearchParams();
  const prefilledService = sp?.get("service") ?? "";
  const prefilledDoctor  = sp?.get("doctor")  ?? "";

  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    service: prefilledService,
    doctor:  prefilledDoctor,
    date:    "",
    time:    "",
    notes:   "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  function patch(delta: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...delta }));
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("shata-medical/last-appointment", JSON.stringify({
          ...form,
          ref: `SMC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
          ts: Date.now(),
        }));
      } catch { /* ignore */ }
    }
    router.push(`${BASE_PATH}/thank-you`);
  }

  const activeServices = config.services.filter((s) => s.active !== false);
  const activeDoctors  = config.doctors.filter((d) => d.active !== false);

  const TIME_SLOTS = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM", "1:30 PM", "2:00 PM",
    "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
  ];

  return (
    <>
      <PageBanner
        title="Book an Appointment"
        subtitle="Schedule a consultation with one of our specialists. Same-day slots often available."
        crumbs={[
          { label: "Home", href: BASE_PATH },
          { label: "Appointment" },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_380px]">
          {/* Form */}
          <form onSubmit={submitForm} className="space-y-6">
            <h2 className="text-xl font-bold text-[color:var(--med-fg)]">Appointment Details</h2>

            {/* Stepper */}
            <div className="flex gap-2">
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${
                  n === step
                    ? "border-[color:var(--med-primary)] bg-[color:var(--med-surface)] text-[color:var(--med-primary)]"
                    : n < step
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-[color:var(--med-border)] text-[color:var(--med-muted)]"
                }`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    n < step ? "bg-emerald-500 text-white" : n === step ? "bg-[color:var(--med-primary)] text-white" : "bg-[color:var(--med-border)] text-white"
                  }`}>
                    {n < step ? "✓" : n}
                  </span>
                  {["Personal Info", "Service & Doctor", "Date & Time"][n - 1]}
                </div>
              ))}
            </div>

            {/* Step 1: Personal info */}
            {step === 1 && (
              <StepCard title="Your Information">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input required value={form.name} onChange={(e) => patch({ name: e.target.value })} placeholder="John Smith" className={inputCls} />
                  </Field>
                  <Field label="Email">
                    <input required type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} placeholder="john@example.com" className={inputCls} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Phone Number">
                      <input required type="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} placeholder="+1 (555) 000-0000" className={inputCls} />
                    </Field>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button type="button" onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.phone}>
                    Continue →
                  </Button>
                </div>
              </StepCard>
            )}

            {/* Step 2: Service + Doctor */}
            {step === 2 && (
              <StepCard title="Service & Preferred Doctor">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Service / Department">
                      <select value={form.service} onChange={(e) => patch({ service: e.target.value })} className={inputCls}>
                        <option value="">— Select a service —</option>
                        {activeServices.map((s) => (
                          <option key={s.id} value={s.handle}>{s.name}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Preferred Doctor (optional)">
                      <select value={form.doctor} onChange={(e) => patch({ doctor: e.target.value })} className={inputCls}>
                        <option value="">— No preference —</option>
                        {activeDoctors.map((d) => (
                          <option key={d.id} value={d.handle}>{d.name} — {d.specialty}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-[color:var(--med-muted)] hover:text-[color:var(--med-fg)] font-medium">
                    ← Back
                  </button>
                  <Button type="button" onClick={() => setStep(3)} disabled={!form.service}>
                    Continue →
                  </Button>
                </div>
              </StepCard>
            )}

            {/* Step 3: Date + Time */}
            {step === 3 && (
              <StepCard title="Preferred Date & Time">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Preferred Date">
                    <input
                      required
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => patch({ date: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Preferred Time">
                    <select value={form.time} onChange={(e) => patch({ time: e.target.value })} className={inputCls}>
                      <option value="">— Select time —</option>
                      {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Notes / Symptoms (optional)">
                      <textarea
                        rows={4}
                        value={form.notes}
                        onChange={(e) => patch({ notes: e.target.value })}
                        placeholder="Briefly describe your concern or symptoms…"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={() => setStep(2)} className="text-sm text-[color:var(--med-muted)] hover:text-[color:var(--med-fg)] font-medium">
                    ← Back
                  </button>
                  <Button type="submit" disabled={submitting || !form.date} size="lg">
                    {submitting ? "Submitting…" : "Confirm Appointment →"}
                  </Button>
                </div>
              </StepCard>
            )}
          </form>

          {/* Info sidebar */}
          <aside className="space-y-5">
            <div className="rounded-lg border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)] mb-3">
                Need Immediate Help?
              </div>
              <a href={`tel:${config.contact.phone}`} className="text-lg font-bold text-[color:var(--med-primary)] hover:underline block">
                {config.contact.phone}
              </a>
              {config.contact.emergencyPhone && (
                <a href={`tel:${config.contact.emergencyPhone}`} className="mt-1.5 text-base font-bold text-red-600 hover:underline block">
                  Emergency: {config.contact.emergencyPhone}
                </a>
              )}
              {config.contact.hours && (
                <p className="mt-2 text-[12px] text-[color:var(--med-muted)]">{config.contact.hours}</p>
              )}
            </div>

            <div className="rounded-lg border border-[color:var(--med-border)] bg-white p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)] mb-3">
                What to Expect
              </div>
              <ul className="space-y-2.5 text-sm text-[color:var(--med-fg)]">
                {[
                  "Confirmation email within 30 minutes",
                  "Reminder sent 24 hours before your visit",
                  "Arrive 10 minutes early for paperwork",
                  "Bring any previous medical records",
                  "Insurance card and ID required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[color:var(--med-primary)] text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

const inputCls =
  "w-full rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--med-fg)] outline-none focus:border-[color:var(--med-primary)] focus:ring-2 focus:ring-[color:var(--med-primary)]/15 transition";

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-6">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--med-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}
