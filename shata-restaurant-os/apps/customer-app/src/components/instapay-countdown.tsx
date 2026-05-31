"use client";

import { useEffect, useState, useCallback } from "react";

interface InstapayStatus {
  confirmed: boolean;
  expired: boolean;
  msLeft: number;
  amount: number;
  confirmedBy?: string | null;
}

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const INSTAPAY_ACCOUNT = process.env["NEXT_PUBLIC_INSTAPAY_ACCOUNT"] ?? "restaurant@instapay";

export function InstapayCountdown({ orderId, amount }: { orderId: string; amount: number }) {
  const [status, setStatus] = useState<InstapayStatus | null>(null);
  const [msLeft, setMsLeft] = useState(15 * 60 * 1000);

  const poll = useCallback(async () => {
    const res = await fetch(`${API}/api/orders/${orderId}/instapay/status`);
    if (res.ok) {
      const data = await res.json() as InstapayStatus;
      setStatus(data);
      setMsLeft(data.msLeft);
    }
  }, [orderId]);

  // Poll every 5 seconds
  useEffect(() => {
    poll();
    const id = setInterval(poll, 5000);
    return () => clearInterval(id);
  }, [poll]);

  // Countdown timer
  useEffect(() => {
    if (!status || status.confirmed || status.expired) return;
    const id = setInterval(() => setMsLeft((m) => Math.max(0, m - 1000)), 1000);
    return () => clearInterval(id);
  }, [status]);

  const minutes = Math.floor(msLeft / 60000);
  const seconds = Math.floor((msLeft % 60000) / 1000);
  const progress = msLeft / (15 * 60 * 1000);

  if (status?.confirmed) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center space-y-2">
        <p className="text-3xl">✅</p>
        <p className="font-bold text-green-800">Payment Confirmed</p>
        <p className="text-sm text-green-600">Your order has been confirmed</p>
      </div>
    );
  }

  if (status?.expired || msLeft === 0) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-center space-y-2">
        <p className="text-3xl">⏰</p>
        <p className="font-bold text-red-800">Confirmation Expired</p>
        <p className="text-sm text-red-600">The payment window has closed. Please contact staff.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border p-6 space-y-5 shadow-sm">
      <div className="text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">InstaPay</p>
        <p className="text-2xl font-black text-slate-900">{amount.toFixed(2)} EGP</p>
      </div>

      {/* Transfer details */}
      <div className="rounded-xl bg-slate-50 border px-4 py-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Send to</span>
          <span className="font-bold text-slate-800 font-mono">{INSTAPAY_ACCOUNT}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Amount</span>
          <span className="font-bold text-brand">{amount.toFixed(2)} EGP</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Reference</span>
          <span className="font-mono text-xs text-slate-600">{orderId.slice(-8).toUpperCase()}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Confirmation window</span>
          <span className={`font-bold tabular-nums ${minutes < 2 ? "text-red-500" : "text-slate-700"}`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${minutes < 2 ? "bg-red-500" : "bg-brand"}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Staff will confirm receipt of your InstaPay transfer. Keep this page open.
      </p>
    </div>
  );
}
