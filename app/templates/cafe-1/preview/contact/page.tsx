"use client";

import { useState } from "react";
import { useSite } from "@/lib/cafe1/context";
import { Container, PageBanner } from "@/components/templates/cafe1/ui/Atoms";
import { Button } from "@/components/templates/cafe1/ui/Button";

const BASE = "/templates/cafe-1/preview";

export default function ContactPage() {
  const config = useSite();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function patch(delta: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...delta }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageBanner
        title="Contact Us"
        crumbs={[{ label: "Home", href: BASE }, { label: "Contact" }]}
      />

      {/* Info + image row */}
      <section className="py-16 bg-[color:var(--c1-light)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Info list */}
            <div className="space-y-8">
              <InfoRow label="Address" value={config.contact.address} />
              <InfoRow
                label="Phone"
                value={
                  <div className="space-y-1">
                    <a href={`tel:${config.contact.phone}`} className="block font-semibold text-[color:var(--c1-body)] hover:text-[color:var(--c1-accent)] transition-colors">
                      {config.contact.phone}
                    </a>
                    {config.contact.phone2 && (
                      <a href={`tel:${config.contact.phone2}`} className="block font-semibold text-[color:var(--c1-body)] hover:text-[color:var(--c1-accent)] transition-colors">
                        {config.contact.phone2}
                      </a>
                    )}
                  </div>
                }
              />
              <InfoRow
                label="Opening Hours"
                value={
                  <ul className="space-y-1">
                    {config.contact.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-8 text-[color:var(--c1-body)]">
                        <span className="font-semibold">{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>

            {/* Contact form */}
            {sent ? (
              <div className="rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-white p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[color:var(--c1-accent)] text-white flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <h3
                  className="text-xl font-bold text-[color:var(--c1-header)]"
                  style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
                >
                  Message Received!
                </h3>
                <p className="mt-2 text-sm text-[color:var(--c1-body)]">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-white p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name">
                    <input required value={form.firstName} onChange={(e) => patch({ firstName: e.target.value })} placeholder="First name" className={inputCls} />
                  </Field>
                  <Field label="Last Name">
                    <input required value={form.lastName} onChange={(e) => patch({ lastName: e.target.value })} placeholder="Last name" className={inputCls} />
                  </Field>
                </div>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} placeholder="you@email.com" className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input type="tel" value={form.phone} onChange={(e) => patch({ phone: e.target.value })} placeholder="+1 (555) ..." className={inputCls} />
                </Field>
                <Field label="Message">
                  <textarea required rows={4} value={form.message} onChange={(e) => patch({ message: e.target.value })} placeholder="How can we help you?" className={`${inputCls} resize-none`} />
                </Field>
                <div className="pt-2">
                  <Button type="submit" variant="accent" className="w-full justify-center">
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--c1-accent)] mb-2">{label}</h4>
      <div className="text-sm text-[color:var(--c1-body)]">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--c1-body)] mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-[color:var(--c1-light)] px-3.5 py-2.5 text-sm text-[color:var(--c1-body)] outline-none focus:border-[color:var(--c1-accent)] focus:ring-2 focus:ring-[color:var(--c1-accent)]/10 transition";
