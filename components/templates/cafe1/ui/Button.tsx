import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "accent";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-[color:var(--c1-header)] text-white hover:opacity-90",
  outline: "border border-[color:var(--c1-header)] text-[color:var(--c1-header)] hover:bg-[color:var(--c1-header)] hover:text-white",
  accent:  "bg-[color:var(--c1-accent)] text-white hover:opacity-90",
};

const BASE =
  "inline-flex items-center justify-center px-7 py-2.5 text-xs font-bold tracking-[0.18em] uppercase transition-all rounded-[var(--c1-radius,4px)]";

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: { variant?: Variant; children: ReactNode; className?: string } & ComponentProps<"button">) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
