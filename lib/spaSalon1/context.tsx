"use client";
// lib/spaSalon1/context.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { SpaSalon1Config } from "./types";
import { defaultSpaSalon1Config } from "./defaults";

const STORAGE_KEY = "spaSalon1_draft";

interface SpaSalon1ContextValue {
  config: SpaSalon1Config;
  setConfig: (config: SpaSalon1Config) => void;
  updateConfig: (partial: Partial<SpaSalon1Config>) => void;
  resetConfig: () => void;
  isDirty: boolean;
}

const SpaSalon1Context = createContext<SpaSalon1ContextValue | null>(null);

export function SpaSalon1Provider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<SpaSalon1Config>(defaultSpaSalon1Config);
  const [isDirty, setIsDirty] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SpaSalon1Config;
        setConfigState(parsed);
        setIsDirty(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const setConfig = useCallback((newConfig: SpaSalon1Config) => {
    setConfigState(newConfig);
    setIsDirty(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  }, []);

  const updateConfig = useCallback((partial: Partial<SpaSalon1Config>) => {
    setConfigState((prev) => {
      const next = { ...prev, ...partial };
      setIsDirty(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(defaultSpaSalon1Config);
    setIsDirty(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <SpaSalon1Context.Provider value={{ config, setConfig, updateConfig, resetConfig, isDirty }}>
      {children}
    </SpaSalon1Context.Provider>
  );
}

export function useSpaSalon1() {
  const ctx = useContext(SpaSalon1Context);
  if (!ctx) throw new Error("useSpaSalon1 must be used inside SpaSalon1Provider");
  return ctx;
}
