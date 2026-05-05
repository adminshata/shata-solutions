"use client";

import { Suspense, useEffect, useState } from "react";
import { useSite } from "@/lib/cafe1/context";
import { Container } from "@/components/templates/cafe1/ui/Atoms";
import { LinkButton } from "@/components/templates/cafe1/ui/Button";

const BASE = "/templates/cafe-1/preview";

type LastReservation = {
  name: string; email: string; phone: string;
  date: string; time: string; guests: string; notes: string;
  ref: string; ts: number;
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <Body />
    </Suspense>
  );
}

function Body() {
  const config = useSite();
  const [res, setRes] = useState<LastReservation | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("cafe1/last-reservation");
      if (raw) setRes(JSON.parse(raw) as LastReservation);
    } catch { /* ignore */ }
  }, []);

  return (
    <Container className="py-24">
      <div className="mx-auto max-w-lg rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-white p-9 text-center md:p-12">
        {/* Check */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--c1-accent)] text-white text-2xl shadow-lg">
          ✓
        </div>

        <h1
          className="mt-6 text-3xl font-bold text-[color:var(--c1-header)]"
          style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
        >
          Reservation Received!
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-[color:var(--c1-body)] leading-6">
          Thank you{res?.name ? `, ${res.name}` : ""}. We&apos;ll confirm your table within 2 hours during opening hours.
        </p>

        {/* Reference */}
        {res?.ref && (
          <div className="mx-auto mt-6 inline-flex items-center gap-4 rounded border border-[color:var(--c1-primary)] px-5 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--c1-body)] opacity-60">Reference</span>
            <span className="font-mono text-base font-bold text-[color:var(--c1-accent)]">{res.ref}</span>
          </div>
        )}

        {/* Details */}
        {res && (
          <div className="mt-6 rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] p-5 text-left text-sm space-y-2">
            {res.email  && <Row label="Email"  value={res.email} />}
            {res.date   && <Row label="Date"   value={new Date(res.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} />}
            {res.time   && <Row label="Time"   value={res.time} />}
            {res.guests && <Row label="Guests" value={`${res.guests} ${parseInt(res.guests) === 1 ? "guest" : "guests"}`} />}
          </div>
        )}

        {/* Call note */}
        <div className="mt-5 rounded border border-[color:var(--c1-primary)] bg-[color:var(--c1-light)] p-3 text-sm text-[color:var(--c1-body)]">
          For same-day bookings or changes, call us:{" "}
          <a
            href={`tel:${config.contact.phone}`}
            className="font-bold text-[color:var(--c1-header)] hover:text-[color:var(--c1-accent)] transition-colors"
          >
            {config.contact.phone}
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <LinkButton href={BASE} variant="outline">← Back to Home</LinkButton>
          <LinkButton href={`${BASE}/menu`} variant="accent">Explore the Menu →</LinkButton>
        </div>

        <p className="mt-6 text-[11px] text-[color:var(--c1-body)] opacity-50">
          Demo only — no real reservation was submitted.
        </p>
      </div>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-[color:var(--c1-body)] opacity-60 shrink-0">{label}</dt>
      <dd className="font-medium text-[color:var(--c1-header)] text-right">{value}</dd>
    </div>
  );
}
