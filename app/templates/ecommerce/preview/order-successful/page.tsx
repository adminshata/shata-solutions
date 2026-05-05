"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useStore } from "@/lib/shata-store/context";
import { Container } from "@/components/templates/shata-store/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-store/ui/Button";

type LastOrder = {
  orderRef: string;
  email: string;
  name: string;
  total: number;
  items: number;
  ts: number;
};

export default function OrderSuccessfulPage() {
  return (
    <Suspense fallback={null}>
      <Body />
    </Suspense>
  );
}

function Body() {
  const sp = useSearchParams();
  const refFromQuery = sp?.get("ref") ?? null;
  const config = useStore();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem("shata-store/last-order");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch { /* ignore */ }
  }, []);

  const ref = order?.orderRef ?? refFromQuery ?? "—";

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-8 text-center md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--store-accent)] text-white">
          <span className="text-2xl font-semibold">✓</span>
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Thank you, your order is in.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[color:var(--store-muted)] md:text-base">
          We've sent a confirmation to {order?.email || "your email"}. You'll get another note when it ships.
        </p>

        <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">Order</span>
          <span className="font-mono text-base font-semibold tracking-tight">{ref}</span>
        </div>

        {order && (
          <div className="mt-6 grid gap-2 rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] p-5 text-left text-sm">
            <Row k="Customer" v={order.name || "—"} />
            <Row k="Items" v={order.items.toString()} />
            <Row k="Order total" v={`$${(order.total / 100).toFixed(2)}`} />
            <Row k="Placed" v={new Date(order.ts).toLocaleString()} />
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/templates/ecommerce/preview" variant="outline">← Back to {config.name}</LinkButton>
          <LinkButton href="/templates/ecommerce/preview/shop">Continue shopping →</LinkButton>
        </div>

        <p className="mt-6 text-[11px] text-[color:var(--store-muted)]">Demo order. No payment was collected. In production this page also sends a transactional email and writes the order to your database.</p>
      </div>
    </Container>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[color:var(--store-muted)]">{k}</dt>
      <dd className="font-medium text-[color:var(--store-fg)]">{v}</dd>
    </div>
  );
}
