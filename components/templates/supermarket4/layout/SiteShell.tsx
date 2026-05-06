"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSite } from "@/lib/supermarket4/context";
import { themeVars } from "@/lib/supermarket4/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  const config = useSite();
  return (
    <div style={themeVars(config.theme) as CSSProperties}>
      {children}
    </div>
  );
}
