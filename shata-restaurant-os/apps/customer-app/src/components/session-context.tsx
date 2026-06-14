"use client";

import { createContext, useContext } from "react";

export interface SessionInfo {
  restaurantName: string | null;
  tableNumber: string | null;
}

const SessionInfoContext = createContext<SessionInfo>({
  restaurantName: null,
  tableNumber: null,
});

export function SessionInfoProvider({
  value,
  children,
}: {
  value: SessionInfo;
  children: React.ReactNode;
}) {
  return (
    <SessionInfoContext.Provider value={value}>{children}</SessionInfoContext.Provider>
  );
}

export function useSessionInfo() {
  return useContext(SessionInfoContext);
}
