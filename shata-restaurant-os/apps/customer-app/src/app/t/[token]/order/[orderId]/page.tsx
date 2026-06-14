"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@shata/ui";
import type { OrderStatus } from "@shata/types";
import { OrderStatusStepper } from "@/components/order-status-stepper";
import { StampCard } from "@/components/stamp-card";
import { WaiterCallButton } from "@/components/waiter-call-button";
import { Card } from "@/components/ui/Card";

interface OrderState {
  id: string;
  status: OrderStatus;
  total: number;
  currency: string;
  items: Array<{ id: string; quantity: number; product: { name: string }; totalPrice: number }>;
}

interface StampCardState {
  stamps: number;
  stampsRequired: number;
  rewardType: string;
  completedAt: string | null;
  isRedeemed: boolean;
}

interface EtaState {
  estimatedMinutes: number;
  activeTicketsAhead: number;
  fetchedAt: number;
}

const ETA_STATUSES: string[] = ["PREPARING", "COOKING"];
const READY_STATUSES: string[] = ["READY", "SERVED"];

function AnimatedSuccessCircle() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 200 }}
      className="mx-auto mb-4 flex h-20 w-20 items-center justify-center"
    >
      <svg viewBox="0 0 56 56" fill="none" className="h-20 w-20">
        <motion.circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary-dark"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M16 29l8 8 16-16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-dark"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.45 }}
        />
      </svg>
    </motion.div>
  );
}

function ReadyBell() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 9, stiffness: 200 }}
      className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent-light"
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-10 w-10 text-accent"
        stroke="currentColor"
        strokeWidth={1.5}
        animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </motion.svg>
    </motion.div>
  );
}

function CountdownTimer({ eta }: { eta: EtaState }) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remainingSeconds = Math.max(
    0,
    eta.estimatedMinutes * 60 - Math.floor((now - eta.fetchedAt) / 1000)
  );
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const readySoon = remainingSeconds <= 120 && remainingSeconds > 0;
  const done = remainingSeconds === 0;

  return (
    <AnimatePresence mode="wait">
      {done ? null : (
        <motion.div
          key="countdown"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className={`mt-6 flex flex-col items-center rounded-2xl px-6 py-4 ${
            readySoon ? "bg-secondary/50" : "bg-muted"
          }`}
        >
          {readySoon ? (
            <>
              <motion.p
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="text-sm font-bold text-primary-dark"
              >
                Ready soon!
              </motion.p>
              <p className="mt-1 tabular-nums text-2xl font-black text-primary-dark">
                {mins}:{String(secs).padStart(2, "0")}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">Estimated wait</p>
              <p className="mt-1 tabular-nums text-3xl font-black text-foreground">
                {mins}:{String(secs).padStart(2, "0")}
              </p>
              {eta.activeTicketsAhead > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {eta.activeTicketsAhead} order{eta.activeTicketsAhead !== 1 ? "s" : ""} ahead of yours
                </p>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OrderTrackingPage() {
  const { token, orderId } = useParams<{ token: string; orderId: string }>();
  const [order, setOrder] = useState<OrderState | null>(null);
  const [eta, setEta] = useState<EtaState | null>(null);
  const [stampCard, setStampCard] = useState<StampCardState | null>(null);
  const prevStatusRef = useRef<OrderStatus | null>(null);

  // Fetch ETA whenever order enters a cooking status
  const fetchEta = async () => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    try {
      const res = await fetch(`${apiUrl}/api/orders/${orderId}/eta`);
      if (res.ok) {
        const data = await res.json() as { estimatedMinutes: number; activeTicketsAhead: number };
        setEta({ ...data, fetchedAt: Date.now() });
      }
    } catch { /* non-critical */ }
  };

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";

    fetch(`${apiUrl}/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((data: OrderState) => {
        setOrder(data);
        if (ETA_STATUSES.includes(data.status)) fetchEta();
      })
      .catch(console.error);

    // Fetch loyalty card (non-critical, suppress errors)
    if (token) {
      fetch(`${apiUrl}/api/sessions/${token}/loyalty`)
        .then((r) => r.ok ? r.json() : null)
        .then((data: StampCardState | null) => { if (data) setStampCard(data); })
        .catch(() => {/* non-critical */});
    }

    const es = new EventSource(`${apiUrl}/api/orders/${orderId}/stream`);
    es.onmessage = (e: MessageEvent<string>) => {
      const data = JSON.parse(e.data) as { status: OrderStatus };
      setOrder((prev) => prev ? { ...prev, status: data.status } : prev);
    };
    es.onerror = () => es.close();
    return () => es.close();
  }, [orderId]);

  // Haptic + confetti + re-fetch ETA on status transition
  useEffect(() => {
    if (!order) return;

    if (prevStatusRef.current !== null && prevStatusRef.current !== order.status) {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([50]);
      }

      if (ETA_STATUSES.includes(order.status)) {
        fetchEta();
      }

      if (order.status === "SERVED") {
        import("canvas-confetti").then(({ default: confetti }) => {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          setTimeout(() => {
            confetti({ particleCount: 60, spread: 120, origin: { x: 0.2, y: 0.7 } });
            confetti({ particleCount: 60, spread: 120, origin: { x: 0.8, y: 0.7 } });
          }, 400);
        });
      }
    }

    prevStatusRef.current = order.status;
  }, [order?.status]);

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-dark border-t-transparent" />
      </div>
    );
  }

  const isServed = order.status === "SERVED";
  const isReady = READY_STATUSES.includes(order.status);
  const showEta = eta !== null && ETA_STATUSES.includes(order.status);

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {isServed ? (
          <>
            <AnimatedSuccessCircle />
            <h1 className="text-2xl font-bold text-primary-dark">Enjoy your meal!</h1>
          </>
        ) : isReady ? (
          <>
            <ReadyBell />
            <h1 className="text-2xl font-bold text-primary-dark">Your order is ready!</h1>
            <p className="mt-1 font-cairo text-sm text-muted-foreground" dir="rtl">طلبك جاهز!</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">Order #{orderId.slice(-4).toUpperCase()}</h1>
            <p className="mt-1 text-muted-foreground">We&apos;re preparing your order</p>
          </>
        )}
      </motion.div>

      {showEta && <CountdownTimer eta={eta} />}

      <div className="mt-10">
        <OrderStatusStepper status={order.status} />
      </div>

      <Card className="mt-8">
        <h2 className="mb-3 font-bold text-foreground">Your order</h2>
        <ul className="space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between text-muted-foreground">
              <span>{item.quantity}× {item.product.name}</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(item.totalPrice, order.currency)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border pt-3 font-bold">
          <span className="text-foreground">Total</span>
          <span className="text-accent">{formatCurrency(order.total, order.currency)}</span>
        </div>
      </Card>

      {stampCard && (
        <div className="mt-4">
          <StampCard
            stamps={stampCard.stamps}
            stampsRequired={stampCard.stampsRequired}
            rewardType={stampCard.rewardType}
            completedAt={stampCard.completedAt}
            isRedeemed={stampCard.isRedeemed}
          />
        </div>
      )}
      <WaiterCallButton sessionToken={token} />
    </div>
  );
}
