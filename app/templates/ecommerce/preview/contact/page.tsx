"use client";

import { useState } from "react";
import { useStore } from "@/lib/shata-store/context";
import { Breadcrumbs, Container, SectionHeading } from "@/components/templates/shata-store/ui/Atoms";
import { Button } from "@/components/templates/shata-store/ui/Button";

export default function ContactPage() {
  const config = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName(""); setEmail(""); setSubject(""); setMessage("");
  }

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/templates/ecommerce/preview" }, { label: "Contact" }]} />
      </Container>

      <Container className="py-10">
        <SectionHeading
          eyebrow="We're here to help"
          title="Get in touch"
          subtitle="We reply to every message — usually within one business day."
        />
      </Container>

      <Container className="grid gap-8 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Your name">
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20" />
            </Field>
            <Field label="Email">
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Subject">
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)]">
                  <option value="">Pick one</option>
                  <option>Question about an order</option>
                  <option>Product question</option>
                  <option>Returns & exchanges</option>
                  <option>Wholesale inquiry</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Message">
                <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-3.5 py-2.5 text-sm outline-none focus:border-[color:var(--store-accent)] focus:ring-2 focus:ring-[color:var(--store-accent)]/20" />
              </Field>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-[11px] text-[color:var(--store-muted)]">By sending you agree to our privacy policy.</p>
            <Button type="submit">{sent ? "Message sent ✓" : "Send message →"}</Button>
          </div>
        </form>

        <aside className="space-y-3">
          <InfoCard title="Email" value={config.contact.email} href={`mailto:${config.contact.email}`} />
          <InfoCard title="Phone" value={config.contact.phone} href={`tel:${config.contact.phone}`} />
          <InfoCard title="Address" value={config.contact.address} />
          {config.contact.hours && <InfoCard title="Hours" value={config.contact.hours} />}
        </aside>
      </Container>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--store-muted)]">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
function InfoCard({ title, value, href }: { title: string; value: string; href?: string }) {
  return (
    <div className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">{title}</div>
      {href ? (
        <a href={href} className="mt-1 block text-sm font-semibold text-[color:var(--store-fg)] hover:underline">{value}</a>
      ) : (
        <div className="mt-1 text-sm font-semibold text-[color:var(--store-fg)]">{value}</div>
      )}
    </div>
  );
}
