"use client";

import { motion, AnimatePresence } from "framer-motion";

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

function Stamp({ filled, index }: { filled: boolean; index: number }) {
  return (
    <AnimatePresence>
      <motion.div
        key={filled ? "filled" : "empty"}
        initial={filled ? { scale: 0.4, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.03 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
          filled
            ? "border-success bg-success text-white"
            : "border-success/20 bg-success/5 text-success/40"
        }`}
      >
        {filled ? "✓" : ""}
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
    <div className="rounded-2xl border border-success/20 bg-[#FFFCF5] p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold">Loyalty Card</p>
        <p className="text-xs font-medium text-success">
          {progress}/{required} stamps
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-success/10">
        <motion.div
          className="h-full rounded-full bg-success"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Stamp grid */}
      <div className="flex flex-wrap gap-1.5">
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
            <div className="mt-3 rounded-xl bg-success/10 px-3 py-2 text-center">
              <p className="text-sm font-bold text-success">
                You&apos;ve earned {rewardLabel(rewardType)}!
              </p>
              <p className="mt-0.5 text-xs text-success/80">Show this to your server to redeem.</p>
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
    </div>
  );
}
