"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useSpring, useMotionValueEvent } from "framer-motion";
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

  // Smooth animated total via spring
  const spring = useSpring(total, { stiffness: 120, damping: 20 });
  const [displayTotal, setDisplayTotal] = useState(total);

  useMotionValueEvent(spring, "change", (v) => setDisplayTotal(v));

  useEffect(() => {
    spring.set(total);
  }, [total, spring]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 inset-x-0 z-30 flex justify-center pb-safe px-4 pb-4"
    >
      <button
        onClick={() => router.push(`/t/${token}/cart`)}
        className="flex w-full max-w-[430px] items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-white shadow-[0_8px_30px_rgba(74,46,31,0.35)] hover:bg-primary/90 active:scale-[0.98] transition-all"
      >
        {/* Badge with rolling number */}
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={itemCount}
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 14, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute"
            >
              {itemCount}
            </motion.span>
          </AnimatePresence>
        </span>

        <span className="font-semibold">View Cart</span>

        {/* Spring-animated total */}
        <span className="font-bold tabular-nums text-accent">
          {formatCurrency(displayTotal, currency, locale)}
        </span>
      </button>
    </motion.div>
  );
}
