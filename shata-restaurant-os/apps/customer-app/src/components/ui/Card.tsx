import { cn } from "@shata/ui";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-3xl border border-border/60 bg-surface p-4 shadow-[0_2px_16px_rgba(15,23,42,0.04)]", className)}
      {...props}
    />
  );
}
