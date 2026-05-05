import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[color:var(--store-primary)] text-[color:var(--store-primary-fg)] hover:opacity-90 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.35)]",
  secondary:
    "bg-[color:var(--store-surface)] text-[color:var(--store-fg)] border border-[color:var(--store-border)] hover:bg-black/[0.03]",
  outline:
    "bg-transparent text-[color:var(--store-fg)] border border-[color:var(--store-border)] hover:bg-black/[0.04]",
  ghost:
    "bg-transparent text-[color:var(--store-fg)] hover:bg-black/[0.04]",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  full,
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--store-radius)] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT[variant]} ${SIZE[size]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  full,
  className = "",
  children,
  target,
}: CommonProps & { href: string; target?: string }) {
  return (
    <Link
      href={href}
      target={target}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--store-radius)] font-semibold transition ${VARIANT[variant]} ${SIZE[size]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
