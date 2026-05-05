"use client";

import { Container } from "@/components/templates/shata-medical/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-medical/ui/Button";

export default function MedicalNotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-lg rounded-[var(--med-radius)] border border-[color:var(--med-border)] bg-[color:var(--med-surface)] p-10 text-center">
        <div className="text-7xl font-black text-[color:var(--med-primary)] opacity-20 leading-none">404</div>
        <h1 className="mt-4 text-2xl font-bold text-[color:var(--med-fg)]">Page Not Found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[color:var(--med-muted)]">
          The page you were looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <LinkButton href="/templates/medical-center-1/preview">← Back to Home</LinkButton>
          <LinkButton href="/templates/medical-center-1/preview/services" variant="outline">
            Browse Services
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
