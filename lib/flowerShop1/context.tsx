"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { FLOWER_SHOP1_DEFAULTS, FLOWER_SHOP1_STORAGE_KEY } from "./defaults";
import type { FlowerShop1Config } from "./types";

type FlowerShop1ContextValue = {
  config: FlowerShop1Config;
  setConfig: Dispatch<SetStateAction<FlowerShop1Config>>;
  resetConfig: () => void;
};

const FlowerShop1Context = createContext<FlowerShop1ContextValue | null>(null);

export function FlowerShop1Provider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FlowerShop1Config>(FLOWER_SHOP1_DEFAULTS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(FLOWER_SHOP1_STORAGE_KEY);
      if (saved) setConfig(JSON.parse(saved) as FlowerShop1Config);
    } catch {
      setConfig(FLOWER_SHOP1_DEFAULTS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FLOWER_SHOP1_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      resetConfig: () => setConfig(FLOWER_SHOP1_DEFAULTS),
    }),
    [config],
  );

  return <FlowerShop1Context.Provider value={value}>{children}</FlowerShop1Context.Provider>;
}

export function useFlowerShop1() {
  const value = useContext(FlowerShop1Context);
  if (!value) throw new Error("useFlowerShop1 must be used within FlowerShop1Provider");
  return value;
}
