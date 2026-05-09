"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { SiteConfig } from "./types";
import { R1_DEFAULTS } from "./defaults";

const STORAGE_KEY = "r1_draft";

const R1Context = createContext<SiteConfig>(R1_DEFAULTS);

export function Restaurant1Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(R1_DEFAULTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setConfig(JSON.parse(saved) as SiteConfig);
    } catch {}
  }, []);

  return <R1Context.Provider value={config}>{children}</R1Context.Provider>;
}

export function useSite(): SiteConfig {
  return useContext(R1Context);
}

export function useUpdateSite() {
  const [, forceUpdate] = useState(0);

  function update(patch: Partial<SiteConfig>) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const current: SiteConfig = saved ? (JSON.parse(saved) as SiteConfig) : R1_DEFAULTS;
      const next = { ...current, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      forceUpdate((n) => n + 1);
      window.location.reload();
    } catch {}
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  return { update, reset };
}
