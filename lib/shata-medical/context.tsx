"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { SHATA_MEDICAL_DEFAULTS } from "./defaults";
import type { SiteConfig } from "./types";

/* ------------------------------------------------------------------ */
/* Site Config Context                                                  */
/* ------------------------------------------------------------------ */

const SiteContext = createContext<SiteConfig | null>(null);

export function useSite(): SiteConfig {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

const STORAGE_KEY = "shata-medical/config-draft";

export function SiteProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  const [value, setValue] = useState<SiteConfig>(config ?? SHATA_MEDICAL_DEFAULTS);

  // Hydrate from localStorage draft (Tier 1 editing)
  useEffect(() => {
    if (config) return; // explicit config overrides localStorage
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SiteConfig;
      if (parsed && parsed.slug) setValue(parsed);
    } catch { /* ignore */ }
  }, [config]);

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Appointment Draft Context                                            */
/* ------------------------------------------------------------------ */

export type AppointmentDraft = {
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  notes: string;
};

const EMPTY_DRAFT: AppointmentDraft = {
  name: "", email: "", phone: "", service: "", doctor: "", date: "", time: "", notes: "",
};

type AppointmentDraftCtx = {
  draft: AppointmentDraft;
  setDraft: (d: Partial<AppointmentDraft>) => void;
  clearDraft: () => void;
};

const AppointmentDraftContext = createContext<AppointmentDraftCtx | null>(null);

export function useAppointmentDraft(): AppointmentDraftCtx {
  const ctx = useContext(AppointmentDraftContext);
  if (!ctx) throw new Error("useAppointmentDraft must be used inside <SiteProvider>");
  return ctx;
}

// AppointmentDraftProvider is embedded inside SiteProvider for convenience
function AppointmentDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<AppointmentDraft>(EMPTY_DRAFT);
  function setDraft(delta: Partial<AppointmentDraft>) {
    setDraftState((prev) => ({ ...prev, ...delta }));
  }
  function clearDraft() { setDraftState(EMPTY_DRAFT); }
  return (
    <AppointmentDraftContext.Provider value={{ draft, setDraft, clearDraft }}>
      {children}
    </AppointmentDraftContext.Provider>
  );
}

// Re-export combined provider
export function MedicalProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: SiteConfig;
}) {
  return (
    <SiteProvider config={config}>
      <AppointmentDraftProvider>{children}</AppointmentDraftProvider>
    </SiteProvider>
  );
}
