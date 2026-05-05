import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/lib/shata-store/types";
import { discountPercent, formatPrice } from "@/lib/shata-store/utils";

/* ------------------------------------------------------------------ */
/* Container                                                           */
/* ------------------------------------------------------------------ */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const isCenter = align === "center";
  return (
    <header className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between ${isCenter ? "md:items-center md:flex-col" : ""}`}>
      <div className={isCenter ? "text-center" : ""}>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--store-muted)]">
            <span className="h-1 w-1 rounded-full bg-[color:var(--store-accent)]" />
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-[-0.02em] text-[color:var(--store-fg)] md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-2 max-w-xl text-sm leading-6 text-[color:var(--store-muted)] md:text-base ${isCenter ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="md:flex-none">{action}</div>}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Price                                                               */
/* ------------------------------------------------------------------ */

export function Price({
  product,
  size = "md",
  className = "",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const off = discountPercent(product);
  const sizes = {
    sm: { current: "text-sm", was: "text-xs" },
    md: { current: "text-base", was: "text-sm" },
    lg: { current: "text-2xl", was: "text-base" },
  } as const;
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`font-semibold text-[color:var(--store-fg)] ${sizes[size].current}`}>
        {formatPrice(product.price)}
      </span>
      {product.compareAtPrice && product.compareAtPrice > product.price && (
        <>
          <span className={`text-[color:var(--store-muted)] line-through ${sizes[size].was}`}>
            {formatPrice(product.compareAtPrice)}
          </span>
          {off !== null && (
            <span className="rounded-full bg-[color:var(--store-accent)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--store-accent)]">
              {off}% off
            </span>
          )}
        </>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Rating                                                              */
/* ------------------------------------------------------------------ */

export function Rating({ value, count, size = "sm" }: { value?: number; count?: number; size?: "sm" | "md" }) {
  if (value === undefined) return null;
  const stars = [1, 2, 3, 4, 5];
  return (
    <span className={`inline-flex items-center gap-1.5 ${size === "md" ? "text-sm" : "text-xs"} text-[color:var(--store-muted)]`}>
      <span className="flex gap-0.5">
        {stars.map((s) => (
          <Star key={s} filled={s <= Math.round(value)} />
        ))}
      </span>
      <span>{value.toFixed(1)}</span>
      {count !== undefined && <span>· {count}</span>}
    </span>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "var(--store-accent)" : "transparent"} stroke="var(--store-accent)" strokeWidth={1.5} aria-hidden>
      <path d="M12 2l2.92 6.04 6.66.97-4.82 4.7 1.14 6.64L12 17.27 6.1 20.35l1.14-6.64-4.82-4.7 6.66-.97L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */

export function ProductBadge({ kind }: { kind: NonNullable<Product["badge"]> }) {
  const map: Record<typeof kind, string> = {
    new: "bg-[color:var(--store-accent)] text-white",
    sale: "bg-rose-500 text-white",
    bestseller: "bg-amber-400 text-slate-950",
    limited: "bg-[color:var(--store-fg)] text-[color:var(--store-bg)]",
  };
  const label = { new: "New", sale: "Sale", bestseller: "Best seller", limited: "Limited" }[kind];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[kind]}`}>
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-[color:var(--store-muted)]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-[color:var(--store-fg)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[color:var(--store-fg)]">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="opacity-40">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Quantity stepper                                                    */
/* ------------------------------------------------------------------ */

export function Quantity({
  value,
  onChange,
  min = 1,
  max = 99,
  className = "",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center rounded-[var(--store-radius)] border border-[color:var(--store-border)] bg-[color:var(--store-surface)] ${className}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
        className="h-10 w-10 text-base text-[color:var(--store-fg)] hover:bg-black/[0.03]"
      >
        −
      </button>
      <span className="min-w-[2ch] px-1 text-center text-sm font-semibold tabular-nums text-[color:var(--store-fg)]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
        className="h-10 w-10 text-base text-[color:var(--store-fg)] hover:bg-black/[0.03]"
      >
        +
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */

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
    <div className="flex flex-col items-center justify-center rounded-[var(--store-radius)] border border-dashed border-[color:var(--store-border)] bg-[color:var(--store-surface)] px-6 py-14 text-center">
      <div className="text-base font-semibold text-[color:var(--store-fg)]">{title}</div>
      {copy && <p className="mt-1 max-w-sm text-sm text-[color:var(--store-muted)]">{copy}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
