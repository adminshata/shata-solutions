"use client";

import { WifiOff } from "lucide-react";
import { cn } from "../lib/utils";

interface OfflineBannerProps {
  className?: string;
}

export function OfflineBanner({ className }: OfflineBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        "sticky top-0 z-50 flex items-center justify-center gap-2 bg-danger px-4 py-2.5 text-sm font-semibold text-white shadow-lg",
        className
      )}
    >
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>No internet connection — orders are paused. Reconnecting…</span>
    </div>
  );
}
