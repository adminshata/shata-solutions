"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY8_DEFAULTS, AGENCY8_STORAGE_KEY } from "./defaults";
import type { Agency8Config } from "./types";

type Agency8ContextValue = {
  config: Agency8Config;
  setConfig: Dispatch<SetStateAction<Agency8Config>>;
  resetConfig: () => void;
};

const Agency8Context = createContext<Agency8ContextValue | null>(null);

export function Agency8Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency8Config>(AGENCY8_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY8_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency8Config);
      }
    } catch {
      setConfig(AGENCY8_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY8_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY8_DEFAULTS),
    }),
    [config],
  );

  return <Agency8Context.Provider value={value}>{children}</Agency8Context.Provider>;
}

export function useAgency8() {
  const value = useContext(Agency8Context);
  if (!value) {
    throw new Error("useAgency8 must be used within Agency8Provider");
  }
  return value;
}
