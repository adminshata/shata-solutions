"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSite } from "@/lib/supermarket1/context";
import { themeVars } from "@/lib/supermarket1/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  const config = useSite();
  return (
    <div style={themeVars(config.theme) as CSSProperties}>
      {children}
    </div>
  );
}
