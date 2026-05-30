"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import { OrderStatus } from "@shata/types";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: OrderStatus.CONFIRMED, label: "Confirmed" },
  { status: OrderStatus.PREPARING, label: "Preparing" },
  { status: OrderStatus.COOKING, label: "Cooking" },
  { status: OrderStatus.READY, label: "Ready" },
  { status: OrderStatus.SERVED, label: "Served" },
];

const ORDER_INDEX: Partial<Record<OrderStatus, number>> = {
  [OrderStatus.PENDING]: -1,
  [OrderStatus.CONFIRMED]: 0,
  [OrderStatus.PREPARING]: 1,
  [OrderStatus.COOKING]: 2,
  [OrderStatus.READY]: 3,
  [OrderStatus.SERVED]: 4,
};

interface StatusTrackerProps {
  status: OrderStatus;
  className?: string;
}

export function StatusTracker({ status, className }: StatusTrackerProps) {
  const currentIndex = ORDER_INDEX[status] ?? -1;

  if (status === OrderStatus.CANCELLED || status === OrderStatus.REFUNDED) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="rounded-2xl bg-danger/10 px-6 py-4 text-center text-danger">
          <p className="text-lg font-bold">Order {status === OrderStatus.CANCELLED ? "Cancelled" : "Refunded"}</p>
          <p className="mt-1 text-sm opacity-75">Please contact staff if you need help.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-start justify-between">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-muted">
          <motion.div
            className="h-full bg-brand"
            initial={{ width: "0%" }}
            animate={{
              width: currentIndex < 0 ? "0%" : `${(currentIndex / (STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;

          return (
            <div key={step.status} className="relative flex flex-col items-center gap-2 flex-1">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: active ? 1.15 : 1 }}
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  done && "border-brand bg-brand text-white",
                  active && "border-brand bg-white shadow-[0_0_0_4px_rgba(255,69,0,0.15)]",
                  !done && !active && "border-muted bg-background"
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : active ? (
                  <motion.div
                    className="h-2.5 w-2.5 rounded-full bg-brand"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                ) : (
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                )}
              </motion.div>
              <span
                className={cn(
                  "text-center text-[10px] font-semibold leading-tight",
                  active ? "text-brand" : done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
