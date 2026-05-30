"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StampCardProps {
  stamps: number;
  stampsRequired: number;
  rewardType: string;
  completedAt: string | null;
  isRedeemed: boolean;
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
            ? "border-brand bg-brand text-white"
            : "border-muted bg-background text-muted-foreground"
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
  const progress = Math.min(stamps, stampsRequired);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold">Loyalty Card</p>
        <p className="text-xs text-muted-foreground">
          {progress}/{stampsRequired} stamps
        </p>
      </div>

      {/* Stamp grid */}
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: stampsRequired }).map((_, i) => (
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
          {stampsRequired - progress} more order{stampsRequired - progress !== 1 ? "s" : ""} to earn {rewardLabel(rewardType)}
        </p>
      )}
    </div>
  );
}
