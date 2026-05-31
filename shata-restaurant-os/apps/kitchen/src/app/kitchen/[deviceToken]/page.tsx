"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { OrderCard, OfflineBanner } from "@shata/ui";
import { TicketStatus } from "@shata/types";
import type { KitchenTicketDto } from "@shata/types";
import { io, Socket } from "socket.io-client";

const STATIONS = ["ALL", "GRILL", "BAR", "COLD", "PASTRY"] as const;
type Station = (typeof STATIONS)[number];

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 960;
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // AudioContext blocked before user gesture — silently skip
  }
}

export default function KitchenPage({
  params,
}: {
  params: { deviceToken: string };
}) {
  const [tickets, setTickets] = useState<KitchenTicketDto[]>([]);
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState(true);
  const [station, setStation] = useState<Station>("ALL");
  const [recoveredCount, setRecoveredCount] = useState<number | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Tick elapsed seconds every second
  useEffect(() => {
    const id = setInterval(() => {
      setTickets((prev) =>
        prev.map((t) => ({ ...t, elapsedSeconds: t.elapsedSeconds + 1 }))
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Online/offline detection
  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // WebSocket connection
  useEffect(() => {
    const wsUrl = process.env["NEXT_PUBLIC_WS_URL"] ?? "";
    const socket = io(`${wsUrl}/kitchen`, {
      transports: ["websocket"],
      auth: { deviceToken: params.deviceToken },
    });
    socketRef.current = socket;

    socket.on("connect", async () => {
      setConnected(true);
      // Re-hydrate from REST on every (re)connect to recover stale tickets
      const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
      try {
        const res = await fetch(
          `${apiUrl}/api/kitchen/tickets?deviceToken=${params.deviceToken}`
        );
        if (res.ok) {
          const data: KitchenTicketDto[] = await res.json();
          const fresh = data.filter((t) => t.status !== "READY");
          setTickets((prev) => {
            // Merge: add tickets not already in local state
            const existingIds = new Set(prev.map((t) => t.id));
            const newTickets = fresh.filter((t) => !existingIds.has(t.id));
            if (newTickets.length > 0) setRecoveredCount(newTickets.length);
            return [...newTickets, ...prev.filter((t) => fresh.find((f) => f.id === t.id))];
          });
          // Clear recovered notification after 4 seconds
          setTimeout(() => setRecoveredCount(null), 4000);
        }
      } catch {
        // Non-fatal: will hydrate from socket events
      }
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("new_ticket", (ticket: KitchenTicketDto) => {
      setTickets((prev) => {
        if (prev.find((t) => t.id === ticket.id)) return prev;
        playBeep();
        return [ticket, ...prev];
      });
    });

    socket.on("ticket_updated", (updated: KitchenTicketDto) => {
      setTickets((prev) =>
        updated.status === "READY"
          ? prev.filter((t) => t.id !== updated.id)
          : prev.map((t) => (t.id === updated.id ? updated : t))
      );
    });

    socket.on("ticket_removed", (ticketId: string) => {
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
    });

    return () => {
      socket.disconnect();
    };
  }, [params.deviceToken]);

  const handleBump = useCallback(
    async (ticketId: string) => {
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket) return;

      const nextStatus =
        ticket.status === TicketStatus.PENDING
          ? TicketStatus.IN_PROGRESS
          : TicketStatus.READY;

      // Optimistic update
      setTickets((prev) =>
        nextStatus === TicketStatus.READY
          ? prev.filter((t) => t.id !== ticketId)
          : prev.map((t) =>
              t.id === ticketId ? { ...t, status: nextStatus } : t
            )
      );

      const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
      try {
        await fetch(`${apiUrl}/api/kitchen/tickets/${ticketId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: nextStatus,
            deviceToken: params.deviceToken,
          }),
        });
      } catch {
        // Revert optimistic update on failure
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? ticket : t))
        );
      }
    },
    [tickets, params.deviceToken]
  );

  const filtered =
    station === "ALL"
      ? tickets
      : tickets.filter(
          (t) => t.station?.toUpperCase() === station
        );

  return (
    <div className="flex h-screen flex-col bg-slate-950">
      {!online && <OfflineBanner />}
      {recoveredCount !== null && (
        <div className="bg-green-900 text-green-200 text-xs font-semibold text-center py-1.5 animate-pulse">
          Reconnected — {recoveredCount} stale ticket{recoveredCount !== 1 ? "s" : ""} recovered
        </div>
      )}

      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-5">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm font-bold">
            K
          </span>
          <span className="font-bold text-slate-100">Kitchen Display</span>
        </div>

        {/* Station filter */}
        <div className="flex items-center gap-1.5">
          {STATIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStation(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                station === s
                  ? "bg-brand text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Connection status */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span
            className={`h-2 w-2 rounded-full ${
              connected ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          <span>{connected ? "Live" : "Reconnecting…"}</span>
          <span className="ml-2 rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-500">
            {filtered.length} tickets
          </span>
        </div>
      </header>

      {/* Tickets grid */}
      <main className="flex-1 overflow-y-auto p-4">
        {filtered.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-black text-slate-800">ALL CLEAR</p>
              <p className="mt-2 text-sm text-slate-600">
                {connected
                  ? "No active tickets — waiting for orders"
                  : "Connecting to kitchen…"}
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((ticket) => (
                <OrderCard
                  key={ticket.id}
                  ticket={ticket}
                  onBump={handleBump}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
