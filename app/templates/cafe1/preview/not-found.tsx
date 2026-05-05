"use client";

import { Container } from "@/components/templates/shata-cafe/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-cafe/ui/Button";

const BASE = "/templates/cafe1/preview";

export default function Cafe1NotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-lg rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] p-10 text-center">
        <div className="text-7xl font-black text-[color:var(--cafe-primary)] opacity-20 leading-none">404</div>
        <h1 className="mt-4 text-2xl font-bold text-[color:var(--cafe-fg)]">Page Not Found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[color:var(--cafe-muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href={BASE}>← Back to Home</LinkButton>
          <LinkButton href={`${BASE}/menu`} variant="outline">Browse the Menu</LinkButton>
        </div>
      </div>
    </Container>
  );
}
