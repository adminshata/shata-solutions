"use client";

import { Container } from "@/components/templates/cafe1/ui/Atoms";
import { LinkButton } from "@/components/templates/cafe1/ui/Button";

const BASE = "/templates/cafe-1/preview";

export default function Cafe1NotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-md rounded-[var(--c1-radius,4px)] border border-[color:var(--c1-primary)] bg-white p-10 text-center">
        <div className="text-8xl font-black text-[color:var(--c1-accent)] opacity-20 leading-none">
          404
        </div>
        <h1
          className="mt-4 text-2xl font-bold text-[color:var(--c1-header)]"
          style={{ fontFamily: "var(--font-c1-accent, 'Raleway', serif)" }}
        >
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-[color:var(--c1-body)]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href={BASE}>← Back to Home</LinkButton>
          <LinkButton href={`${BASE}/menu`} variant="outline">
            Browse the Menu
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
