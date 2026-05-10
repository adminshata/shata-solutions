"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { JewelryShop1Config } from "./types";
import { defaultJewelryShop1Config } from "./defaults";

const STORAGE_KEY = "jewelryShop1_draft";

interface JewelryShop1ContextValue {
  config: JewelryShop1Config;
  setConfig: (config: JewelryShop1Config) => void;
  resetConfig: () => void;
  isDirty: boolean;
}

const JewelryShop1Context = createContext<JewelryShop1ContextValue | null>(null);

export function JewelryShop1Provider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<JewelryShop1Config>(defaultJewelryShop1Config);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setConfigState(JSON.parse(stored) as JewelryShop1Config);
        setIsDirty(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const setConfig = (next: JewelryShop1Config) => {
    setConfigState(next);
    setIsDirty(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const resetConfig = () => {
    setConfigState(defaultJewelryShop1Config);
    setIsDirty(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <JewelryShop1Context.Provider value={{ config, setConfig, resetConfig, isDirty }}>
      {children}
    </JewelryShop1Context.Provider>
  );
}

export function useJewelryShop1() {
  const ctx = useContext(JewelryShop1Context);
  if (!ctx) throw new Error("useJewelryShop1 must be used within JewelryShop1Provider");
  return ctx;
}
