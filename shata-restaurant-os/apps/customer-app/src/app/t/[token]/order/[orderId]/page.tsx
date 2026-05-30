"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { StatusTracker, formatCurrency } from "@shata/ui";
import type { OrderStatus } from "@shata/types";

interface OrderState {
  id: string;
  status: OrderStatus;
  total: number;
  currency: string;
  items: Array<{ id: string; quantity: number; product: { name: string }; totalPrice: number }>;
}

export default function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderState | null>(null);

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";

    // Initial fetch
    fetch(`${apiUrl}/api/orders/${orderId}`)
      .then((r) => r.json())
      .then(setOrder)
      .catch(console.error);

    // SSE for live status updates
    const es = new EventSource(`${apiUrl}/api/orders/${orderId}/stream`);
    es.onmessage = (e: MessageEvent<string>) => {
      const data = JSON.parse(e.data) as { status: OrderStatus };
      setOrder((prev) => prev ? { ...prev, status: data.status } : prev);
    };
    es.onerror = () => es.close();
    return () => es.close();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  const isDone = order.status === "SERVED";

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {isDone ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-4xl"
            >
              ✓
            </motion.div>
            <h1 className="text-2xl font-bold text-success">Enjoy your meal!</h1>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Order #{orderId.slice(-4).toUpperCase()}</h1>
            <p className="mt-1 text-muted-foreground">We're working on it</p>
          </>
        )}
      </motion.div>

      <div className="mt-10">
        <StatusTracker status={order.status} />
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-semibold">Your order</h2>
        <ul className="space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.quantity}× {item.product.name}</span>
              <span className="font-semibold">
                {formatCurrency(item.totalPrice, order.currency)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t pt-3 font-bold">
          <span>Total</span>
          <span>{formatCurrency(order.total, order.currency)}</span>
        </div>
      </div>
    </div>
  );
}
