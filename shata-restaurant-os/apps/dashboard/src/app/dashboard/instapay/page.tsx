"use client";

import { useEffect, useState, useCallback } from "react";

interface PendingConfirmation {
  id: string;
  orderId: string;
  amount: number;
  expiresAt: string;
  createdAt: string;
}

const RESTAURANT_ID = "REPLACE_WITH_RESTAURANT_ID";
const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

export default function InstapayPage() {
  const [pending, setPending] = useState<PendingConfirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  // Update countdown every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const load = useCallback(async () => {
    const res = await fetch(`${API}/api/dashboard/instapay/pending?restaurantId=${RESTAURANT_ID}`);
    if (res.ok) setPending(await res.json() as PendingConfirmation[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    // Poll every 10 seconds for new arrivals
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, [load]);

  const confirm = async (orderId: string) => {
    setConfirming(orderId);
    await fetch(`${API}/api/dashboard/orders/${orderId}/instapay/confirm?restaurantId=${RESTAURANT_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmedBy: "current-staff-id" }),
    });
    setConfirming(null);
    load();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">InstaPay Confirmations</h1>
        <span className="text-sm text-slate-500">{pending.length} pending</span>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : pending.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-slate-400 gap-2">
            <p className="text-4xl">📲</p>
            <p className="text-sm font-semibold">No pending InstaPay confirmations</p>
          </div>
        ) : (
          <div className="space-y-3 max-w-xl">
            {pending.map((item) => {
              const msLeft = Math.max(0, new Date(item.expiresAt).getTime() - now);
              const minutes = Math.floor(msLeft / 60000);
              const seconds = Math.floor((msLeft % 60000) / 1000);
              const progress = msLeft / (15 * 60 * 1000);
              const urgent = minutes < 3;

              return (
                <div key={item.id} className={`rounded-xl border bg-white p-5 space-y-4 ${urgent ? "border-red-300" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Order #{item.orderId.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Requested {new Date(item.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className={`text-2xl font-black ${urgent ? "text-red-600" : "text-slate-900"}`}>
                      {Number(item.amount).toFixed(2)} EGP
                    </p>
                  </div>

                  {/* Countdown bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Time remaining</span>
                      <span className={`font-bold tabular-nums ${urgent ? "text-red-500" : "text-slate-600"}`}>
                        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${urgent ? "bg-red-500" : "bg-green-500"}`}
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => confirm(item.orderId)}
                    disabled={confirming === item.orderId}
                    className="w-full rounded-xl bg-green-600 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {confirming === item.orderId ? "Confirming…" : "Confirm Payment Received"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
