"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY3_DEFAULTS, AGENCY3_STORAGE_KEY } from "./defaults";
import type { Agency3Config } from "./types";

type Agency3ContextValue = {
  config: Agency3Config;
  setConfig: Dispatch<SetStateAction<Agency3Config>>;
  resetConfig: () => void;
};

const Agency3Context = createContext<Agency3ContextValue | null>(null);

export function Agency3Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency3Config>(AGENCY3_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY3_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency3Config);
      }
    } catch {
      setConfig(AGENCY3_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY3_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY3_DEFAULTS),
    }),
    [config],
  );

  return <Agency3Context.Provider value={value}>{children}</Agency3Context.Provider>;
}

export function useAgency3() {
  const value = useContext(Agency3Context);
  if (!value) {
    throw new Error("useAgency3 must be used within Agency3Provider");
  }
  return value;
}
