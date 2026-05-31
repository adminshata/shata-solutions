"use client";

import { useEffect, useRef, useState } from "react";
import { flushQueue, listQueued } from "./offline-queue";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [flushing, setFlushing] = useState(false);
  const flushingRef = useRef(false);

  const refresh = async () => {
    const q = await listQueued();
    setPendingCount(q.length);
  };

  const flush = async () => {
    if (flushingRef.current) return;
    flushingRef.current = true;
    setFlushing(true);
    await flushQueue(API, () => refresh(), () => {});
    await refresh();
    setFlushing(false);
    flushingRef.current = false;
  };

  useEffect(() => {
    setIsOnline(navigator.onLine);
    refresh();

    const handleOnline = () => {
      setIsOnline(true);
      // Auto-flush when connectivity restored
      void flush();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, pendingCount, flushing, flush };
}
