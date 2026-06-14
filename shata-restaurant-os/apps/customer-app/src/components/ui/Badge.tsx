import { cn } from "@shata/ui";
import type { HTMLAttributes } from "react";

export type BadgeVariant = "primary" | "accent" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-foreground",
  outline: "bg-secondary/60 text-primary-dark border border-secondary",
};

export function Badge({ variant = "outline", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
}
