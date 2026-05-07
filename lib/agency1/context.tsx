"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AGENCY1_DEFAULTS, AGENCY1_STORAGE_KEY } from "./defaults";
import type { Agency1Config } from "./types";

type Agency1ContextValue = {
  config: Agency1Config;
  setConfig: React.Dispatch<React.SetStateAction<Agency1Config>>;
  patch: (delta: Partial<Agency1Config>) => void;
  resetToDefaults: () => void;
};

const Agency1Context = createContext<Agency1ContextValue | null>(null);

function safeParse(raw: string | null): Agency1Config | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Agency1Config>;
    // Shallow-merge to tolerate old drafts when structure evolves.
    const merged: Agency1Config = {
      ...AGENCY1_DEFAULTS,
      ...parsed,
      brand: { ...AGENCY1_DEFAULTS.brand, ...(parsed.brand ?? {}) },
      theme: { ...AGENCY1_DEFAULTS.theme, ...(parsed.theme ?? {}) },
      header: { ...AGENCY1_DEFAULTS.header, ...(parsed.header ?? {}) },
      hero: { ...AGENCY1_DEFAULTS.hero, ...(parsed.hero ?? {}) },
      footer: { ...AGENCY1_DEFAULTS.footer, ...(parsed.footer ?? {}) },
      contact: { ...AGENCY1_DEFAULTS.contact, ...(parsed.contact ?? {}) },
      blogPosts: (parsed.blogPosts ?? parsed.blog ?? AGENCY1_DEFAULTS.blogPosts) as Agency1Config["blogPosts"],
      pages: (parsed.pages ?? AGENCY1_DEFAULTS.pages) as Agency1Config["pages"],
    };
    return merged;
  } catch {
    return null;
  }
}

export function Agency1Provider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Agency1Config>(AGENCY1_DEFAULTS);

  // Load draft on mount.
  useEffect(() => {
    const parsed = safeParse(window.localStorage.getItem(AGENCY1_STORAGE_KEY));
    if (parsed) setConfig(parsed);
  }, []);

  // Keep in sync with admin changes (iframe or another tab).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== AGENCY1_STORAGE_KEY) return;
      const parsed = safeParse(e.newValue);
      if (parsed) setConfig(parsed);
      else setConfig(AGENCY1_DEFAULTS);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const patch = useCallback((delta: Partial<Agency1Config>) => {
    setConfig((prev) => ({ ...prev, ...delta }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(AGENCY1_DEFAULTS);
  }, []);

  const value = useMemo<Agency1ContextValue>(
    () => ({ config, setConfig, patch, resetToDefaults }),
    [config, patch, resetToDefaults]
  );

  return <Agency1Context.Provider value={value}>{children}</Agency1Context.Provider>;
}

export function useAgency1() {
  const ctx = useContext(Agency1Context);
  if (!ctx) throw new Error("useAgency1 must be used within Agency1Provider");
  return ctx;
}

