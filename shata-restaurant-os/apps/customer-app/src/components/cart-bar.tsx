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

  const isArabic = locale.toLowerCase().startsWith("ar");

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="fixed inset-x-0 bottom-24 z-30 flex justify-center px-4"
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push(`/t/${token}/cart`)}
        className="flex w-full max-w-[430px] items-center justify-between rounded-2xl bg-[#16A36B] px-5 py-3.5 text-white shadow-[0_12px_32px_rgba(22,163,107,0.35)] transition-colors hover:bg-[#129463] active:scale-[0.98]"
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

        <span className="font-semibold">{isArabic ? "عرض السلة" : "View Cart"}</span>

        {/* Spring-animated total */}
        <span className="font-bold tabular-nums text-[#F4C570]">
          {formatCurrency(displayTotal, currency, locale)}
        </span>
      </motion.button>
    </motion.div>
  );
}
