"use client";

import { Container } from "@/components/templates/shata-store/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-store/ui/Button";

export default function StoreNotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-10 text-center">
        <div className="bg-gradient-to-r from-[color:var(--store-fg)] to-[color:var(--store-accent)] bg-clip-text text-7xl font-semibold tracking-tight text-transparent">404</div>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[color:var(--store-muted)]">
          The page you were looking for has moved or no longer exists.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <LinkButton href="/templates/ecommerce/preview">← Back home</LinkButton>
          <LinkButton href="/templates/ecommerce/preview/shop" variant="outline">Browse the shop</LinkButton>
        </div>
      </div>
    </Container>
  );
}
