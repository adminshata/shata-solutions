"use client";

import { Suspense, useEffect, useState } from "react";
import { useSite } from "@/lib/shata-medical/context";
import { Container } from "@/components/templates/shata-medical/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-medical/ui/Button";

type LastAppointment = {
  name: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  ref: string;
  ts: number;
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
  const [appt, setAppt] = useState<LastAppointment | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem("shata-medical/last-appointment");
      if (raw) setAppt(JSON.parse(raw) as LastAppointment);
    } catch { /* ignore */ }
  }, []);

  const serviceName = appt?.service
    ? config.services.find((s) => s.handle === appt.service)?.name ?? appt.service
    : null;
  const doctorName = appt?.doctor
    ? config.doctors.find((d) => d.handle === appt.doctor)?.name ?? appt.doctor
    : null;

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-8 text-center md:p-12">
        {/* Check icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--med-primary)] text-white text-2xl">
          ✓
        </div>

        <h1 className="mt-5 text-3xl font-bold text-[color:var(--med-fg)]">
          Appointment Request Sent!
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-[color:var(--med-muted)] leading-6">
          Thank you, {appt?.name || "valued patient"}. Our team will confirm your appointment within 30 minutes during working hours.
        </p>

        {/* Ref badge */}
        {appt?.ref && (
          <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded border border-[color:var(--med-border)] bg-white px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--med-muted)]">Reference</span>
            <span className="font-mono text-base font-bold text-[color:var(--med-primary)] tracking-tight">{appt.ref}</span>
          </div>
        )}

        {/* Details */}
        {appt && (
          <div className="mt-6 rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-white p-5 text-left text-sm space-y-2">
            {appt.email && <Row label="Email" value={appt.email} />}
            {serviceName && <Row label="Service" value={serviceName} />}
            {doctorName && <Row label="Doctor" value={doctorName} />}
            {appt.date && <Row label="Preferred Date" value={new Date(appt.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} />}
            {appt.time && <Row label="Preferred Time" value={appt.time} />}
          </div>
        )}

        {/* Emergency note */}
        {config.contact.emergencyPhone && (
          <div className="mt-5 rounded border border-red-100 bg-red-50 p-3 text-sm text-red-700">
            For urgent medical needs, call our emergency line:{" "}
            <a href={`tel:${config.contact.emergencyPhone}`} className="font-bold hover:underline">
              {config.contact.emergencyPhone}
            </a>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/templates/medical-center-1/preview" variant="outline">
            ← Back to Home
          </LinkButton>
          <LinkButton href="/templates/medical-center-1/preview/services">
            Browse Services →
          </LinkButton>
        </div>

        <p className="mt-6 text-[11px] text-[color:var(--med-muted)]">
          Demo form — no real appointment was booked. In production, this triggers a confirmation email and database entry.
        </p>
      </div>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-[color:var(--med-muted)] shrink-0">{label}</dt>
      <dd className="font-medium text-[color:var(--med-fg)] text-right">{value}</dd>
    </div>
  );
}
