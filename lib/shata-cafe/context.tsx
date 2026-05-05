"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { SHATA_CAFE_DEFAULTS } from "./defaults";
import type { SiteConfig } from "./types";

const SiteContext = createContext<SiteConfig | null>(null);

export function useSite(): SiteConfig {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <CafeProvider>");
  return ctx;
}

const STORAGE_KEY = "shata-cafe/config-draft";

export function CafeProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  const [value, setValue] = useState<SiteConfig>(config ?? SHATA_CAFE_DEFAULTS);

  useEffect(() => {
    if (config) return;
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SiteConfig;
      if (parsed && parsed.slug) setValue(parsed);
    } catch { /* ignore */ }
  }, [config]);

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}
