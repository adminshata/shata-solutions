import { cn } from "@shata/ui";
import type { HTMLAttributes } from "react";

export function BottomBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sticky bottom-0 inset-x-0 z-30 border-t border-border bg-surface px-4 pb-safe pt-3",
        className
      )}
      {...props}
    />
  );
}
