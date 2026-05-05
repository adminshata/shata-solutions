"use client";

import { useState } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { Container, PageBanner } from "@/components/templates/shata-medical/ui/Atoms";
import { Button, LinkButton } from "@/components/templates/shata-medical/ui/Button";

const BASE_PATH = "/templates/medical-center-1/preview";

export default function ContactPage() {
  const config = useSite();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
  }

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We're here to help. Reach out by phone, email, or the form below."
        crumbs={[
          { label: "Home", href: BASE_PATH },
          { label: "Contact" },
        ]}
        bg="/templates/shata-medical/bg/page_heading_bg.jpg"
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_380px]">
          {/* Form */}
          <form onSubmit={submit} className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-6">
            <h2 className="text-lg font-bold text-[color:var(--med-fg)] mb-5">Send Us a Message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputCls} />
              </Field>
              <Field label="Email">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={inputCls} />
              </Field>
              <Field label="Phone (optional)">
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className={inputCls} />
              </Field>
              <Field label="Subject">
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls}>
                  <option value="">— Select a topic —</option>
                  <option>Appointment inquiry</option>
                  <option>Service information</option>
                  <option>Billing & insurance</option>
                  <option>Medical records request</option>
                  <option>General feedback</option>
                  <option>Other</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message">
                  <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help you?" className={inputCls} />
                </Field>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-[11px] text-[color:var(--med-muted)]">
                By submitting you agree to our privacy policy.
              </p>
              <Button type="submit" size="md">
                {sent ? "Message Sent ✓" : "Send Message →"}
              </Button>
            </div>
          </form>

          {/* Info cards */}
          <aside className="space-y-4">
            <InfoCard
              icon="📞"
              title="Phone"
              lines={[
                { text: config.contact.phone, href: `tel:${config.contact.phone}` },
                ...(config.contact.emergencyPhone
                  ? [{ text: `Emergency: ${config.contact.emergencyPhone}`, href: `tel:${config.contact.emergencyPhone}`, red: true }]
                  : []),
              ]}
            />
            <InfoCard
              icon="📧"
              title="Email"
              lines={[{ text: config.contact.email, href: `mailto:${config.contact.email}` }]}
            />
            <InfoCard
              icon="📍"
              title="Address"
              lines={[{ text: config.contact.address }]}
            />
            {config.contact.hours && (
              <InfoCard
                icon="🕐"
                title="Opening Hours"
                lines={[{ text: config.contact.hours }]}
              />
            )}
            <div className="pt-2">
              <LinkButton href={`${BASE_PATH}/appointment/request`} full size="lg">
                Book an Appointment →
              </LinkButton>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

const inputCls =
  "w-full rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--med-fg)] outline-none focus:border-[color:var(--med-primary)] focus:ring-2 focus:ring-[color:var(--med-primary)]/15 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--med-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: string;
  title: string;
  lines: { text: string; href?: string; red?: boolean }[];
}) {
  return (
    <div className="rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--med-muted)]">{title}</span>
      </div>
      {lines.map((l, i) =>
        l.href ? (
          <a key={i} href={l.href} className={`block text-sm font-semibold hover:underline ${l.red ? "text-red-600" : "text-[color:var(--med-fg)]"}`}>
            {l.text}
          </a>
        ) : (
          <p key={i} className="text-sm text-[color:var(--med-fg)]">{l.text}</p>
        )
      )}
    </div>
  );
}
