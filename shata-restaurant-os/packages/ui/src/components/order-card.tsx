"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn, formatElapsed, getTimeBand } from "../lib/utils";
import type { KitchenTicketDto } from "@shata/types";

interface OrderCardProps {
  ticket: KitchenTicketDto;
  onBump: (ticketId: string) => void;
  onExpand?: (ticketId: string) => void;
  className?: string;
}

const bandColors = {
  green: "bg-success",
  yellow: "bg-warning",
  red: "bg-danger animate-pulse",
} as const;

const cardBorder = {
  green: "border-success/30",
  yellow: "border-warning/30",
  red: "border-danger/40",
} as const;

export function OrderCard({ ticket, onBump, onExpand, className }: OrderCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const band = getTimeBand(ticket.elapsedSeconds);

  function handleExpand() {
    setExpanded((p) => !p);
    onExpand?.(ticket.id);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-md dark:bg-zinc-900",
        cardBorder[band],
        className
      )}
    >
      {/* Time band */}
      <div className={cn("h-1.5 w-full", bandColors[band])} />

      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between px-4 pt-3 pb-2"
        onClick={handleExpand}
      >
        <div>
          <p className="text-lg font-bold leading-none">#{ticket.orderNumber}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Table {ticket.tableNumber}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold",
              band === "green" && "bg-success/10 text-success",
              band === "yellow" && "bg-warning/10 text-amber-700",
              band === "red" && "bg-danger/10 text-danger"
            )}
          >
            {formatElapsed(ticket.elapsedSeconds)}
          </span>
          {ticket.station && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              {ticket.station}
            </span>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 px-4 pb-2 text-sm space-y-1">
        {ticket.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-0.5 min-w-[1.25rem] text-center font-bold text-brand">
              {item.quantity}×
            </span>
            <div className="flex-1">
              <p className="font-medium leading-snug">{item.name}</p>
              {expanded && item.modifiers.length > 0 && (
                <ul className="mt-0.5 space-y-0.5 text-xs text-muted-foreground">
                  {item.modifiers.map((m, mi) => (
                    <li key={mi}>+ {m}</li>
                  ))}
                </ul>
              )}
              {item.notes && expanded && (
                <p className="mt-0.5 text-xs italic text-muted-foreground">"{item.notes}"</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* BUMP button */}
      <div className="px-3 pb-3 pt-1">
        <button
          onClick={() => onBump(ticket.id)}
          className={cn(
            "w-full rounded-xl py-2.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all active:scale-95",
            ticket.status === "PENDING" && "bg-brand hover:bg-brand-dark",
            ticket.status === "IN_PROGRESS" && "bg-success hover:bg-success/90",
            ticket.status === "READY" && "bg-zinc-400 cursor-default"
          )}
          disabled={ticket.status === "READY"}
        >
          {ticket.status === "PENDING" && "START"}
          {ticket.status === "IN_PROGRESS" && "BUMP — READY"}
          {ticket.status === "READY" && "SERVED"}
        </button>
      </div>
    </motion.div>
  );
}
