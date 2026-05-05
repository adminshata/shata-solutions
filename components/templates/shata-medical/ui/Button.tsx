"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "white";
type Size    = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[color:var(--med-primary)] text-[color:var(--med-primary-fg)] hover:opacity-90 rounded-[var(--med-radius)] focus-visible:ring-[color:var(--med-primary)]",
  outline:
    "border border-[color:var(--med-primary)] text-[color:var(--med-primary)] bg-transparent hover:bg-[color:var(--med-primary)] hover:text-white rounded-[var(--med-radius)] focus-visible:ring-[color:var(--med-primary)]",
  ghost:
    "text-[color:var(--med-primary)] hover:bg-[color:var(--med-surface)] rounded-[var(--med-radius)] focus-visible:ring-[color:var(--med-primary)]",
  white:
    "bg-white text-[color:var(--med-primary)] hover:bg-blue-50 rounded-[var(--med-radius)] focus-visible:ring-white",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${full ? "w-full" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = Omit<ButtonProps, "type" | "onClick"> & { href: string };

export function LinkButton({
  children,
  href,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
