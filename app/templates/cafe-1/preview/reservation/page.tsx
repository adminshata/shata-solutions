"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/lib/cafe1/context";
import { Container, PageBanner } from "@/components/templates/cafe1/ui/Atoms";
import { Button } from "@/components/templates/cafe1/ui/Button";

const BASE = "/templates/cafe-1/preview";

const TIMES = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"];

export default function ReservationPage() {
  const config = useSite();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: "", time: "", guests: "2", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function patch(delta: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...delta }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      window.sessionStorage.setItem("cafe1/last-reservation", JSON.stringify({
        ...form,
        ref: `CFT-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        ts: Date.now(),
      }));
    } catch { /* ignore */ }
    router.push(`${BASE}/reservation/thank-you`);
  }

  const r = config.sections.booking;

  return (
    <>
      <PageBanner
        title="Reservations"
        crumbs={[{ label: "Home", href: BASE }, { label: "Reservations" }]}
      />

      <section className="py-16 bg-[color:var(--c1-light)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-white p-7 md:p-10"
            >
              <h2
                className="text-xl font-bold text-[color:var(--c1-header)] mb-6"
                style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
              >
                Reservation Request
              </h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input required value={form.name} onChange={(e) => patch({ name: e.target.value })} placeholder="Your name" className={inputCls} />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} placeholder="+1 (555) ..." className={inputCls} />
                  </Field>
                </div>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} placeholder="you@email.com" className={inputCls} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Date">
                    <input
                      required
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => patch({ date: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Time">
                    <select required value={form.time} onChange={(e) => patch({ time: e.target.value })} className={inputCls}>
                      <option value="">Select</option>
                      {TIMES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Guests">
                    <select value={form.guests} onChange={(e) => patch({ guests: e.target.value })} className={inputCls}>
                      {[1,2,3,4,5,6,7,8].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                      <option value="9+">9+ guests</option>
                    </select>
                  </Field>
                </div>
                <Field label={<>Special Requests <span className="font-normal opacity-60">(optional)</span></>}>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => patch({ notes: e.target.value })}
                    placeholder="Allergies, celebrations, dietary needs..."
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-[11px] text-[color:var(--c1-body)] opacity-60">
                  We confirm within 2 hours. For same-day, please call.
                </p>
                <Button type="submit" variant="accent" disabled={submitting}>
                  {submitting ? "Sending…" : "Request →"}
                </Button>
              </div>
            </form>

            {/* Sidebar */}
            <aside className="space-y-4">
              <InfoCard title="Phone">
                <a href={`tel:${config.contact.phone}`} className="block text-sm font-semibold text-[color:var(--c1-body)] hover:text-[color:var(--c1-accent)] transition-colors">
                  {config.contact.phone}
                </a>
                {config.contact.phone2 && (
                  <a href={`tel:${config.contact.phone2}`} className="block text-sm text-[color:var(--c1-body)] opacity-70 hover:text-[color:var(--c1-accent)] transition-colors mt-1">
                    {config.contact.phone2}
                  </a>
                )}
              </InfoCard>
              <InfoCard title="Address">
                <p className="text-sm text-[color:var(--c1-body)]">{config.contact.address}</p>
              </InfoCard>
              <InfoCard title="Opening Hours">
                <ul className="space-y-1.5">
                  {config.contact.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 text-sm text-[color:var(--c1-body)]">
                      <span className="font-medium">{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--c1-body)] mb-1">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-white p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--c1-accent)] mb-3">{title}</p>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-[color:var(--c1-light)] px-3.5 py-2.5 text-sm text-[color:var(--c1-body)] outline-none focus:border-[color:var(--c1-accent)] focus:ring-2 focus:ring-[color:var(--c1-accent)]/10 transition";
