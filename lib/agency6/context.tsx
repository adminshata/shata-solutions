"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY6_DEFAULTS, AGENCY6_STORAGE_KEY } from "./defaults";
import type { Agency6Config } from "./types";

type Agency6ContextValue = {
  config: Agency6Config;
  setConfig: Dispatch<SetStateAction<Agency6Config>>;
  resetConfig: () => void;
};

const Agency6Context = createContext<Agency6ContextValue | null>(null);

export function Agency6Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency6Config>(AGENCY6_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY6_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency6Config);
      }
    } catch {
      setConfig(AGENCY6_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY6_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY6_DEFAULTS),
    }),
    [config],
  );

  return <Agency6Context.Provider value={value}>{children}</Agency6Context.Provider>;
}

export function useAgency6() {
  const value = useContext(Agency6Context);
  if (!value) {
    throw new Error("useAgency6 must be used within Agency6Provider");
  }
  return value;
}
