"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY4_DEFAULTS, AGENCY4_STORAGE_KEY } from "./defaults";
import type { Agency4Config } from "./types";

type Agency4ContextValue = {
  config: Agency4Config;
  setConfig: Dispatch<SetStateAction<Agency4Config>>;
  resetConfig: () => void;
};

const Agency4Context = createContext<Agency4ContextValue | null>(null);

export function Agency4Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency4Config>(AGENCY4_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY4_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency4Config);
      }
    } catch {
      setConfig(AGENCY4_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY4_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY4_DEFAULTS),
    }),
    [config],
  );

  return <Agency4Context.Provider value={value}>{children}</Agency4Context.Provider>;
}

export function useAgency4() {
  const value = useContext(Agency4Context);
  if (!value) {
    throw new Error("useAgency4 must be used within Agency4Provider");
  }
  return value;
}
