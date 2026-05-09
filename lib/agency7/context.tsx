"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY7_DEFAULTS, AGENCY7_STORAGE_KEY } from "./defaults";
import type { Agency7Config } from "./types";

type Agency7ContextValue = {
  config: Agency7Config;
  setConfig: Dispatch<SetStateAction<Agency7Config>>;
  resetConfig: () => void;
};

const Agency7Context = createContext<Agency7ContextValue | null>(null);

export function Agency7Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency7Config>(AGENCY7_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY7_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency7Config);
      }
    } catch {
      setConfig(AGENCY7_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY7_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY7_DEFAULTS),
    }),
    [config],
  );

  return <Agency7Context.Provider value={value}>{children}</Agency7Context.Provider>;
}

export function useAgency7() {
  const value = useContext(Agency7Context);
  if (!value) {
    throw new Error("useAgency7 must be used within Agency7Provider");
  }
  return value;
}
