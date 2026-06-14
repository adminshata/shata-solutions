import { cn } from "@shata/ui";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90",
  secondary: "bg-secondary text-primary-dark hover:bg-secondary/80",
  accent: "bg-accent text-foreground shadow-lg shadow-accent/30 hover:bg-accent/90",
  ghost: "bg-transparent border border-border text-foreground hover:bg-muted/50",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
}
