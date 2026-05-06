"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { SiteShell } from "@/components/templates/supermarket4/layout/SiteShell";
import { Header } from "@/components/templates/supermarket4/layout/Header";
import { Footer } from "@/components/templates/supermarket4/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket4/layout/CartDrawer";

const BASE_PATH = "/templates/supermarket-4/preview";

type OrderData = {
  ref: string;
  name: string;
  email: string;
  address: string;
  total: number;
  itemCount: number;
  store: string;
};

function formatPrice(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}

function OrderContent() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("sm4/order");
      if (raw) setOrder(JSON.parse(raw) as OrderData);
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white rounded border border-gray-200 p-8 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-5 text-white"
        style={{ background: "#EA580C" }}
      >
        <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="text-2xl font-extrabold text-gray-800">Order Confirmed!</h1>
      <p className="mt-2 text-gray-500">
        Thank you for your order{order?.name ? `, ${order.name}` : ""}. We will prepare it right away.
      </p>

      {order && (
        <div className="mt-6 text-left border border-gray-100 rounded p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Reference</span>
            <span className="font-bold text-gray-800">{order.ref}</span>
          </div>
          {order.email && (
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-semibold text-gray-700">{order.email}</span>
            </div>
          )}
          {order.address && (
            <div className="flex justify-between gap-4">
              <span className="text-gray-500 shrink-0">Delivery to</span>
              <span className="font-semibold text-gray-700 text-right">{order.address}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Items</span>
            <span className="font-semibold text-gray-700">{order.itemCount}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-2 mt-2">
            <span>Total Paid</span>
            <span style={{ color: "#EA580C" }}>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={BASE_PATH}
          className="rounded px-5 py-2.5 text-sm font-bold text-white"
          style={{ background: "#EA580C" }}
        >
          Back to Home
        </Link>
        <Link
          href={`${BASE_PATH}/shop`}
          className="rounded border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:border-[#EA580C] hover:text-[#EA580C] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessfulPage() {
  return (
    <SiteShell>
      <Header />
      <main className="py-14" style={{ background: "#F3F4F6" }}>
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="text-center text-gray-400 py-10">Loading...</div>}>
            <OrderContent />
          </Suspense>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}
