"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSite } from "@/lib/supermarket2/context";
import { themeVars } from "@/lib/supermarket2/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  const config = useSite();
  return (
    <div style={themeVars(config.theme) as CSSProperties}>
      {children}
    </div>
  );
}
