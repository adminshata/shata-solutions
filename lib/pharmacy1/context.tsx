"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { PHARMACY1_DEFAULTS, PHARMACY1_STORAGE_KEY } from "./defaults";
import type { Pharmacy1Config } from "./types";

type Pharmacy1ContextValue = {
  config: Pharmacy1Config;
  setConfig: Dispatch<SetStateAction<Pharmacy1Config>>;
  resetConfig: () => void;
};

const Pharmacy1Context = createContext<Pharmacy1ContextValue | null>(null);

export function Pharmacy1Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Pharmacy1Config>(PHARMACY1_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PHARMACY1_STORAGE_KEY);
      if (saved) setConfig(JSON.parse(saved) as Pharmacy1Config);
    } catch {
      setConfig(PHARMACY1_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PHARMACY1_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(PHARMACY1_DEFAULTS),
    }),
    [config],
  );

  return <Pharmacy1Context.Provider value={value}>{children}</Pharmacy1Context.Provider>;
}

export function usePharmacy1() {
  const value = useContext(Pharmacy1Context);
  if (!value) throw new Error("usePharmacy1 must be used within Pharmacy1Provider");
  return value;
}
