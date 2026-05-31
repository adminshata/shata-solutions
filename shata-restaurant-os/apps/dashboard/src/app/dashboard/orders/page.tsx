"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, formatElapsed } from "@shata/ui";
import type { Order } from "@shata/types";
import { io } from "socket.io-client";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-orange-100 text-orange-800",
  COOKING: "bg-orange-200 text-orange-900",
  READY: "bg-green-100 text-green-800",
  SERVED: "bg-slate-100 text-slate-600",
};

export default function LiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [connected, setConnected] = useState(false);

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    await fetch(`${apiUrl}/api/dashboard/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, restaurantId: "REPLACE_WITH_RESTAURANT_ID" }),
    });
  }, []);

  useEffect(() => {
    const wsUrl = process.env["NEXT_PUBLIC_WS_URL"] ?? "";
    const socket = io(`${wsUrl}/dashboard`, { transports: ["websocket"] });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_dashboard", { restaurantId: "REPLACE_WITH_RESTAURANT_ID" });
    });
    socket.on("disconnect", () => setConnected(false));

    socket.on("new_order", (order: Order) => {
      setOrders((prev) => [order, ...prev]);
      // Play sound
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    });

    socket.on("order_updated", (updated: Order) => {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    });

    return () => { socket.disconnect(); };
  }, []);

  const liveOrders = orders.filter((o) => !["SERVED", "CANCELLED"].includes(o.status));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="font-bold text-slate-900">Live Orders</h1>
          <p className="text-xs text-slate-500">{liveOrders.length} active orders</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders/new"
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
          >
            + Manual Order
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            {connected ? "Connected" : "Reconnecting…"}
          </div>
        </div>
      </div>

      {/* Orders grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {liveOrders.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-slate-400 text-sm">
            No active orders — waiting for orders…
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {liveOrders.map((order) => {
                const elapsed = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 1000);
                const isUrgent = elapsed > 600;
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-2xl border bg-white p-4 shadow-sm ${isUrgent ? "border-danger" : "border-slate-200"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold">#{order.id.slice(-4).toUpperCase()}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status] ?? "bg-slate-100"}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      {formatElapsed(elapsed)} ago
                    </p>
                    <div className="mt-3 flex justify-between border-t pt-3">
                      <span className="text-sm font-bold">
                        {formatCurrency(order.total, order.currency)}
                      </span>
                      {order.status === "PENDING" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "CONFIRMED")}
                          className="rounded-lg bg-brand px-3 py-1 text-xs font-bold text-white hover:bg-brand-dark"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
