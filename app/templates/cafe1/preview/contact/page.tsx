"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/lib/shata-cafe/context";
import { Container, PageBanner } from "@/components/templates/shata-cafe/ui/Atoms";
import { Button } from "@/components/templates/shata-cafe/ui/Button";

const BASE = "/templates/cafe1/preview";

export default function ContactPage() {
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
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem("cafe1/last-reservation", JSON.stringify({
          ...form,
          ref: `AVE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
          ts: Date.now(),
        }));
      } catch { /* ignore */ }
    }
    router.push(`${BASE}/reservation/thank-you`);
  }

  const r = config.sections.reservation;

  return (
    <>
      <PageBanner
        title="Reserve a Table"
        subtitle="Book online or call us — walk-ins always welcome."
        crumbs={[
          { label: "Home", href: BASE },
          { label: "Contact & Reservations" },
        ]}
        bg="/templates/shata-cafe/bg/contact_bg.jpg"
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_360px]">
          {/* Reservation form */}
          <form onSubmit={handleSubmit} className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] p-6 md:p-8">
            <h2 className="text-lg font-bold text-[color:var(--cafe-fg)] mb-5">Reservation Request</h2>
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
                    {["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Guests">
                  <select value={form.guests} onChange={(e) => patch({ guests: e.target.value })} className={inputCls}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                    <option value="9+">9+ guests</option>
                  </select>
                </Field>
              </div>
              <Field label={<>Special Requests <span className="font-normal text-[color:var(--cafe-muted)]">(optional)</span></>}>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => patch({ notes: e.target.value })}
                  placeholder="Allergies, celebrations, high chair, dietary needs..."
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-[11px] text-[color:var(--cafe-muted)]">
                We confirm within 2 hours. For same-day, please call.
              </p>
              <Button type="submit" variant="accent" disabled={submitting}>
                {submitting ? "Sending…" : "Request Reservation →"}
              </Button>
            </div>
          </form>

          {/* Info sidebar */}
          <aside className="space-y-4">
            <InfoCard title="Phone" icon="✆">
              <a href={`tel:${config.contact.phone}`} className="text-sm font-semibold text-[color:var(--cafe-fg)] hover:text-[color:var(--cafe-accent)] transition-colors block">
                {config.contact.phone}
              </a>
              {config.contact.reservationPhone && (
                <a href={`tel:${config.contact.reservationPhone}`} className="text-sm text-[color:var(--cafe-muted)] hover:text-[color:var(--cafe-accent)] transition-colors block mt-1">
                  Reservations: {config.contact.reservationPhone}
                </a>
              )}
            </InfoCard>
            <InfoCard title="Email" icon="✉">
              <a href={`mailto:${config.contact.email}`} className="text-sm font-semibold text-[color:var(--cafe-fg)] hover:text-[color:var(--cafe-accent)] transition-colors">
                {config.contact.email}
              </a>
            </InfoCard>
            <InfoCard title="Address" icon="◎">
              <p className="text-sm text-[color:var(--cafe-fg)]">{config.contact.address}</p>
            </InfoCard>
            <InfoCard title="Opening Hours" icon="◷">
              <ul className="space-y-1.5 mt-1">
                {r.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 text-sm">
                    <span className="text-[color:var(--cafe-muted)]">{h.day}</span>
                    <span className="font-medium text-[color:var(--cafe-fg)]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </aside>
        </div>
      </Container>
    </>
  );
}

const inputCls =
  "w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-2 focus:ring-[color:var(--cafe-accent)]/15 transition";

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--cafe-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[color:var(--cafe-accent)]">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--cafe-muted)]">{title}</span>
      </div>
      {children}
    </div>
  );
}
