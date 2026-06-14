"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface StampCardProps {
  stamps?: number | null;
  stampsRequired?: number | null;
  rewardType: string;
  completedAt: string | null;
  isRedeemed: boolean;
}

const DEFAULT_STAMPS_REQUIRED = 10;

// Coerces possibly-missing/non-numeric loyalty values to a safe non-negative
// integer so the UI never renders NaN/undefined when the loyalty fetch
// returns partial or empty data.
function toSafeCount(value: number | null | undefined, fallback: number): number {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 ? Math.floor(num) : fallback;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

function Stamp({ filled, index }: { filled: boolean; index: number }) {
  return (
    <AnimatePresence>
      <motion.div
        key={filled ? "filled" : "empty"}
        initial={filled ? { scale: 0.4, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.03 }}
        className={`flex aspect-square items-center justify-center rounded-full border-2 transition-colors ${
          filled
            ? "border-accent bg-accent text-foreground"
            : "border-border bg-muted text-muted-foreground/30"
        }`}
      >
        {filled ? <StarIcon /> : <div className="h-2 w-2 rounded-full bg-current" />}
      </motion.div>
    </AnimatePresence>
  );
}

function rewardLabel(rewardType: string) {
  if (rewardType === "FREE_ITEM") return "a free item";
  if (rewardType === "PERCENTAGE_DISCOUNT") return "a discount";
  return "a reward";
}

export function StampCard({
  stamps,
  stampsRequired,
  rewardType,
  completedAt,
  isRedeemed,
}: StampCardProps) {
  const completed = !!completedAt && !isRedeemed;
  const required = toSafeCount(stampsRequired, DEFAULT_STAMPS_REQUIRED);
  const current = toSafeCount(stamps, 0);
  const progress = Math.min(current, required);
  const remaining = Math.max(required - progress, 0);
  const percent = required > 0 ? Math.round((progress / required) * 100) : 0;

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-bold text-foreground">Loyalty Card</p>
        <p className="text-xs font-bold text-primary-dark">
          {progress}/{required} stamps
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Stamp grid — 5 columns x 2 rows */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: required }).map((_, i) => (
          <Stamp key={i} index={i} filled={i < progress} />
        ))}
      </div>

      {/* Reward banner */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl bg-gradient-to-r from-accent to-accent-light px-3 py-2 text-center">
              <p className="text-sm font-bold text-foreground">
                You&apos;ve earned {rewardLabel(rewardType)}!
              </p>
              <p className="mt-0.5 text-xs text-foreground/70">Show this to your server to redeem.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!completed && (
        <p className="mt-2 text-xs text-muted-foreground">
          {remaining === 0
            ? `One more order to earn ${rewardLabel(rewardType)}!`
            : `${remaining} more order${remaining !== 1 ? "s" : ""} to earn ${rewardLabel(rewardType)}`}
        </p>
      )}
    </Card>
  );
}
