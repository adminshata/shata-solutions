"use client";

import Image from "next/image";
import { useStore } from "@/lib/shata-store/context";
import { Breadcrumbs, Container, SectionHeading } from "@/components/templates/shata-store/ui/Atoms";
import { LinkButton } from "@/components/templates/shata-store/ui/Button";

export default function AboutPage() {
  const config = useStore();
  const a = config.about;
  const heroImg = config.products[0]?.images[0];

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/templates/ecommerce/preview" }, { label: "About" }]} />
      </Container>

      <section className="border-b border-[color:var(--store-border)]">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--store-accent)]" />
              About {config.name}
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">{a.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--store-muted)] md:text-lg">{a.subtitle}</p>
          </div>
          {heroImg && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--store-radius)] border border-[color:var(--store-border)]">
              <Image src={heroImg} alt="" fill className="object-cover" unoptimized sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          )}
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <article className="text-base leading-8 text-[color:var(--store-fg)]">
            <SectionHeading title="Our story" />
            <p className="mt-6 whitespace-pre-line text-[color:var(--store-fg)]/85">{a.story}</p>
          </article>
          {a.stats && a.stats.length > 0 && (
            <aside className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">By the numbers</div>
              <ul className="mt-4 grid grid-cols-2 gap-4">
                {a.stats.map((s) => (
                  <li key={s.label}>
                    <div className="text-2xl font-semibold tracking-[-0.02em]">{s.value}</div>
                    <div className="text-xs text-[color:var(--store-muted)]">{s.label}</div>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </Container>

      <section className="border-t border-[color:var(--store-border)] bg-[color:var(--store-surface)]">
        <Container className="py-14">
          <SectionHeading title="What we believe" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {a.values.map((v) => (
              <li key={v.title} className="rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-bg)] p-6">
                <div className="text-base font-semibold">{v.title}</div>
                <p className="mt-2 text-sm text-[color:var(--store-muted)]">{v.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-14 text-center">
        <SectionHeading title="Ready to shop?" align="center" />
        <div className="mt-6 flex justify-center gap-3">
          <LinkButton href="/templates/ecommerce/preview/shop">Browse the shop →</LinkButton>
          <LinkButton href="/templates/ecommerce/preview/contact" variant="outline">Contact us</LinkButton>
        </div>
      </Container>
    </>
  );
}
