"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { AGENCY2_DEFAULTS, AGENCY2_STORAGE_KEY } from "./defaults";
import type { Agency2Config } from "./types";

type Agency2ContextValue = {
  config: Agency2Config;
  setConfig: Dispatch<SetStateAction<Agency2Config>>;
  resetConfig: () => void;
};

const Agency2Context = createContext<Agency2ContextValue | null>(null);

export function Agency2Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Agency2Config>(AGENCY2_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGENCY2_STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved) as Agency2Config);
      }
    } catch {
      setConfig(AGENCY2_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AGENCY2_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(AGENCY2_DEFAULTS),
    }),
    [config],
  );

  return <Agency2Context.Provider value={value}>{children}</Agency2Context.Provider>;
}

export function useAgency2() {
  const value = useContext(Agency2Context);
  if (!value) {
    throw new Error("useAgency2 must be used within Agency2Provider");
  }
  return value;
}
