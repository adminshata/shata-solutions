"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { formatCurrency } from "@shata/ui";

interface CartBarProps {
  token: string;
  itemCount: number;
  total: number;
  currency: string;
  locale: string;
}

export function CartBar({ token, itemCount, total, currency, locale }: CartBarProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 inset-x-0 z-30 pb-safe px-4 pb-4"
    >
      <button
        onClick={() => router.push(`/t/${token}/cart`)}
        className="w-full flex items-center justify-between rounded-2xl bg-brand px-5 py-3.5 text-white shadow-[0_8px_30px_rgba(255,69,0,0.4)] hover:bg-brand-dark active:scale-[0.98] transition-all"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
          {itemCount}
        </span>
        <span className="font-semibold">View Cart</span>
        <span className="font-bold">{formatCurrency(total, currency, locale)}</span>
      </button>
    </motion.div>
  );
}
