"use client";

import type { ReactNode } from "react";
import Link from "next/link";

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
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--med-primary)]">
          <span className="h-px w-6 bg-[color:var(--med-primary)]" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl font-bold leading-tight md:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-[color:var(--med-fg)]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-1 max-w-2xl text-base leading-7 ${
            light ? "text-blue-100" : "text-[color:var(--med-muted)]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
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
      className="relative py-14 md:py-20"
      style={
        bg
          ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { background: "var(--med-primary)" }
      }
    >
      <div className="absolute inset-0 bg-[color:var(--med-primary)]/80" />
      <Container className="relative z-10 text-white">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-base text-blue-100">{subtitle}</p>}
        {crumbs && (
          <nav className="mt-3 flex items-center gap-2 text-[13px] text-blue-200">
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

/* ----------------------------- Breadcrumbs ----------------------------- */

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-2 text-sm text-[color:var(--med-muted)]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-[color:var(--med-border)]">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[color:var(--med-primary)] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[color:var(--med-fg)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ------------------------------- Rating -------------------------------- */

export function StarRating({
  value,
  max = 5,
  size = "sm",
}: {
  value: number;
  max?: number;
  size?: "sm" | "md";
}) {
  return (
    <div className={`flex gap-0.5 ${size === "md" ? "text-lg" : "text-sm"}`}>
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
  popular:  "bg-[color:var(--med-accent)] text-white",
  featured: "bg-[color:var(--med-primary)] text-white",
  new:      "bg-emerald-500 text-white",
};

export function ServiceBadge({ kind }: { kind: string }) {
  const style = BADGE_STYLES[kind] ?? "bg-gray-200 text-gray-700";
  return (
    <span className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style}`}>
      {kind}
    </span>
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
    <div className="border border-dashed border-[color:var(--med-border)] bg-[color:var(--med-surface)] px-8 py-16 text-center">
      <div className="text-4xl text-[color:var(--med-border)]">🏥</div>
      <div className="mt-3 text-base font-semibold text-[color:var(--med-fg)]">{title}</div>
      {copy && <p className="mt-1 text-sm text-[color:var(--med-muted)]">{copy}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
