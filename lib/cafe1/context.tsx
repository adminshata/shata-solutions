"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteConfig } from "./types";
import { CAFE1_DEFAULTS } from "./defaults";

const SiteContext = createContext<SiteConfig>(CAFE1_DEFAULTS);

export function useSite(): SiteConfig {
  return useContext(SiteContext);
}

export function Cafe1Provider({
  children,
  config,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  return (
    <SiteContext.Provider value={config ?? CAFE1_DEFAULTS}>
      {children}
    </SiteContext.Provider>
  );
}
