"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY5_DEFAULTS, AGENCY5_STORAGE_KEY } from "./defaults";
import type { Agency5Config } from "./types";

type Agency5ContextValue = {
  config: Agency5Config;
  setConfig: Dispatch<SetStateAction<Agency5Config>>;
  resetConfig: () => void;
};

const Agency5Context = createContext<Agency5ContextValue | null>(null);

export function Agency5Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency5Config>(AGENCY5_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY5_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency5Config);
      }
    } catch {
      setConfig(AGENCY5_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY5_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY5_DEFAULTS),
    }),
    [config],
  );

  return <Agency5Context.Provider value={value}>{children}</Agency5Context.Provider>;
}

export function useAgency5() {
  const value = useContext(Agency5Context);
  if (!value) {
    throw new Error("useAgency5 must be used within Agency5Provider");
  }
  return value;
}
