"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/* ----------------------------- Container ------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* --------------------------- Section Heading --------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const textAlign = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-2 ${textAlign}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--cafe-accent)]">
          <span className="h-px w-5 bg-[color:var(--cafe-accent)]" />
          {eyebrow}
          <span className="h-px w-5 bg-[color:var(--cafe-accent)]" />
        </span>
      )}
      <h2
        className={`text-2xl font-bold leading-tight md:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-[color:var(--cafe-fg)]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-1 max-w-2xl text-base leading-7 ${
            light ? "text-white/80" : "text-[color:var(--cafe-muted)]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ------------------------------- Rating -------------------------------- */

export function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5 text-sm">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < value ? "text-amber-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

/* ------------------------------- Badge --------------------------------- */

const BADGE_STYLES: Record<string, string> = {
  popular:      "bg-[color:var(--cafe-accent)] text-white",
  "chef's pick": "bg-[color:var(--cafe-primary)] text-white",
  new:          "bg-emerald-500 text-white",
  seasonal:     "bg-orange-500 text-white",
};

export function MenuBadge({ kind }: { kind: string }) {
  const style = BADGE_STYLES[kind] ?? "bg-gray-200 text-gray-700";
  return (
    <span className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style}`}>
      {kind}
    </span>
  );
}

/* ----------------------------- Page Banner ----------------------------- */

export function PageBanner({
  title,
  subtitle,
  crumbs,
  bg,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
  bg?: string;
}) {
  return (
    <section
      className="relative py-14 md:py-20 overflow-hidden"
      style={
        bg
          ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { background: "var(--cafe-primary)" }
      }
    >
      <div className="absolute inset-0 bg-[color:var(--cafe-primary)]/82" />
      <Container className="relative z-10 text-white">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-base text-white/75">{subtitle}</p>}
        {crumbs && (
          <nav className="mt-3 flex items-center gap-2 text-[13px] text-white/60">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </Container>
    </section>
  );
}

/* ------------------------------ Empty State ---------------------------- */

export function EmptyState({
  title,
  copy,
  action,
}: {
  title: string;
  copy?: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-8 py-16 text-center rounded-[var(--cafe-radius)]">
      <div className="text-4xl text-[color:var(--cafe-border)]">☕</div>
      <div className="mt-3 text-base font-semibold text-[color:var(--cafe-fg)]">{title}</div>
      {copy && <p className="mt-1 text-sm text-[color:var(--cafe-muted)]">{copy}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

