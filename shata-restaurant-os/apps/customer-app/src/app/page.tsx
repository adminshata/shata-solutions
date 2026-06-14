"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Lang = "en" | "ar";

const COPY: Record<
  Lang,
  { tagline: string; chip: string; startTitle: string; startSubtitle: string; startCta: string; startHelper: string }
> = {
  en: {
    tagline: "Order. Pay. Enjoy.",
    chip: "Table ordering made simple",
    startTitle: "Start your order",
    startSubtitle: "Scan your table QR code or open your table menu.",
    startCta: "View Menu",
    startHelper: "Fast table ordering from your seat.",
  },
  ar: {
    tagline: "اطلب. ادفع. استمتع.",
    chip: "طلب من الطاولة بسهولة",
    startTitle: "ابدأ طلبك",
    startSubtitle: "امسح QR كود الطاولة أو افتح منيو طاولتك.",
    startCta: "عرض المنيو",
    startHelper: "طلب سريع من مكانك.",
  },
};

const QUICK_ACTIONS: { label: string; Icon: React.ComponentType }[] = [
  { label: "View Menu", Icon: MenuIcon },
  { label: "Reorder", Icon: ReorderIcon },
  { label: "Loyalty", Icon: LoyaltyIcon },
  { label: "Call Waiter", Icon: BellIcon },
];

const POPULAR_ITEMS: { name: string; price: string; gradient: string }[] = [
  { name: "Iced Latte", price: "$4.50", gradient: "linear-gradient(135deg, #4A2E1F 0%, #B9824A 100%)" },
  { name: "Croissant", price: "$3.25", gradient: "linear-gradient(135deg, #B9824A 0%, #EAD7C0 100%)" },
  { name: "Cappuccino", price: "$4.00", gradient: "linear-gradient(135deg, #2A1810 0%, #7A4F30 100%)" },
  { name: "Breakfast Toast", price: "$5.50", gradient: "linear-gradient(135deg, #EAD7C0 0%, #B9824A 100%)" },
];

function QrIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 text-primary-dark">
      <rect x="4" y="4" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="3" />
      <rect x="30" y="4" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="3" />
      <rect x="4" y="30" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="3" />
      <rect x="9" y="9" width="4" height="4" fill="currentColor" />
      <rect x="35" y="9" width="4" height="4" fill="currentColor" />
      <rect x="9" y="35" width="4" height="4" fill="currentColor" />
      <rect x="30" y="30" width="6" height="6" fill="currentColor" />
      <rect x="40" y="30" width="4" height="4" fill="currentColor" />
      <rect x="30" y="40" width="4" height="4" fill="currentColor" />
      <rect x="38" y="38" width="6" height="6" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 ${flip ? "rotate-180" : ""}`}
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

function ReorderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.5 9a8 8 0 0 1 14-3.5M19.5 15a8 8 0 0 1-14 3.5" />
    </svg>
  );
}

function LoyaltyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
}

/** Stacked-card QR icon — layered panels with real translateZ depth that fan out on hover. */
function QrIconStack() {
  return (
    <div className="relative mx-auto h-16 w-16" style={{ perspective: "700px" }}>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-accent-light"
        style={{ transform: "translate3d(7px, 7px, -24px)" }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-secondary"
        style={{ transform: "translate3d(3.5px, 3.5px, -12px)" }}
      />
      <motion.div
        whileHover={{ rotateY: 14, rotateX: -10, translateZ: 6 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_-8px_rgba(31,41,51,0.25)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <QrIcon />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const isAr = lang === "ar";
  const copy = COPY[lang];

  // Ambient parallax for background blobs — follows pointer on desktop.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const bx = useSpring(px, { stiffness: 40, damping: 20 });
  const by = useSpring(py, { stiffness: 40, damping: 20 });
  const blobAX = useTransform(bx, (v) => v * 1);
  const blobAY = useTransform(by, (v) => v * 1);
  const blobBX = useTransform(bx, (v) => v * -1.4);
  const blobBY = useTransform(by, (v) => v * -1.4);

  function handlePageMove(e: React.MouseEvent<HTMLElement>) {
    const w = typeof window !== "undefined" ? window.innerWidth : 1;
    const h = typeof window !== "undefined" ? window.innerHeight : 1;
    px.set((e.clientX / w - 0.5) * 26);
    py.set((e.clientY / h - 0.5) * 26);
  }

  // 3D tilt + glare for the "Start your order" card.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(useTransform(ty, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(tx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(tx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(ty, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55), transparent 60%)`;

  function handleCardMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - rect.left) / rect.width - 0.5);
    ty.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleCardLeave() {
    tx.set(0);
    ty.set(0);
  }

  return (
    <main
      onMouseMove={handlePageMove}
      className="relative flex min-h-screen flex-col overflow-hidden bg-cream"
    >
      {/* Ambient parallax blobs */}
      <motion.div
        style={{ x: blobAX, y: blobAY }}
        className="pointer-events-none absolute -bottom-10 -left-16 h-48 w-48 rounded-full bg-secondary/70 blur-2xl"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: blobBX, y: blobBY }}
        className="pointer-events-none absolute top-1/2 -right-12 h-36 w-36 rounded-full bg-accent/30 blur-2xl"
        aria-hidden="true"
      />

      {/* Hero brand card — slightly shorter so more content sits above the fold */}
      <div className="relative px-4 pt-4">
        {/* Elevation shadow puddle */}
        <div className="absolute inset-x-8 top-8 h-16 rounded-[50%] bg-primary/30 blur-2xl" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, rotateX: 14, y: 24 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            backgroundImage:
              "radial-gradient(circle at 22% 18%, rgba(234,215,192,0.35), transparent 45%), radial-gradient(circle at 88% 78%, rgba(185,130,74,0.55), transparent 50%), linear-gradient(155deg, #2A1810 0%, #4A2E1F 50%, #7A4F30 100%)",
          }}
          className="relative overflow-hidden rounded-[32px] px-6 pb-12 pt-7 text-center shadow-[0_20px_50px_-15px_rgba(74,46,31,0.5)]"
        >
          {/* Decorative floating shapes — warm "café light" glow */}
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-10 right-4 h-24 w-24 rounded-full bg-accent/25 blur-md" aria-hidden="true" />

          {/* Bottom vignette for text legibility over the photo-style backdrop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(42,24,16,0.55) 100%)" }}
            aria-hidden="true"
          />

          {/* Gentle animated shimmer sweep */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-[420px] flex-col items-center">
            {/* Language toggle — glassy, animated sliding pill */}
            <div className="relative mb-5 inline-flex gap-1 rounded-full border border-white/20 bg-white/15 p-1 shadow-inner shadow-black/5 backdrop-blur-md">
              {(["en", "ar"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-bold transition-colors duration-200 ${
                    lang === l ? "text-primary-dark" : "text-white/70"
                  }`}
                >
                  {lang === l && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(31,41,51,0.18)]"
                      transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative z-10">{l === "en" ? "EN" : "عربي"}</span>
                </button>
              ))}
            </div>

            {/* Wordmark with radial glow */}
            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-2xl" aria-hidden="true" />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex items-baseline"
              >
                <span className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(31,41,51,0.18)]">
                  Shata
                </span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="ml-1.5 inline-block h-3 w-3 -translate-y-3 rounded-full bg-accent ring-2 ring-white/50"
                />
              </motion.div>
            </div>

            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span dir={isAr ? "rtl" : "ltr"} className={isAr ? "font-cairo" : ""}>
                {copy.chip}
              </span>
            </motion.div>

            {/* Tagline */}
            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                dir={isAr ? "rtl" : "ltr"}
                className={`mt-4 text-xl font-bold text-cream ${isAr ? "font-cairo" : ""}`}
              >
                {copy.tagline}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Content below the hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-[420px] flex-1 flex-col gap-6 px-4 pb-32" style={{ perspective: 1200 }}>
        {/* Start your order — main action card, 3D tilt on pointer move */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="-mt-8 cursor-pointer rounded-[28px] bg-surface p-6 text-center shadow-[0_24px_60px_-20px_rgba(31,41,51,0.18)] transition-shadow duration-300 hover:shadow-[0_32px_70px_-18px_rgba(185,130,74,0.35)]"
        >
          {/* Pointer-tracking glare */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{ background: glareBg }}
            aria-hidden="true"
          />

          <div style={{ transform: "translateZ(20px)" }}>
            <QrIconStack />

            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <p
                  dir={isAr ? "rtl" : "ltr"}
                  className={`mt-4 text-lg font-bold text-foreground ${isAr ? "font-cairo" : ""}`}
                >
                  {copy.startTitle}
                </p>
                <p
                  dir={isAr ? "rtl" : "ltr"}
                  className={`mt-1.5 text-sm text-muted-foreground ${isAr ? "font-cairo" : ""}`}
                >
                  {copy.startSubtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Thin divider */}
            <div className="my-5 h-px w-full bg-border" />

            {/* Primary CTA */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              dir={isAr ? "rtl" : "ltr"}
              className={`flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(74,46,31,0.45)] transition-colors duration-200 hover:bg-primary/90 ${isAr ? "font-cairo" : ""}`}
            >
              {isAr ? (
                <>
                  <ArrowIcon flip />
                  {copy.startCta}
                </>
              ) : (
                <>
                  {copy.startCta}
                  <ArrowIcon />
                </>
              )}
            </motion.button>

            <p dir={isAr ? "rtl" : "ltr"} className={`mt-3 text-xs text-muted-foreground ${isAr ? "font-cairo" : ""}`}>
              {copy.startHelper}
            </p>
          </div>
        </motion.div>

        {/* Quick actions */}
        <div>
          <h2 className="mb-3 px-1 text-sm font-bold text-foreground">Quick actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map(({ label, Icon }) => (
              <motion.div
                key={label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center gap-2 rounded-2xl bg-surface p-4 text-center shadow-[0_10px_24px_-16px_rgba(74,46,31,0.35)] transition-shadow duration-200 hover:shadow-[0_14px_28px_-16px_rgba(74,46,31,0.4)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-primary">
                  <Icon />
                </div>
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="text-[10px] font-medium text-muted-foreground">Scan QR first</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular today — static preview content, no API calls */}
        <div>
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-foreground">Popular today</h2>
            <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[10px] font-bold text-primary">
              Preview
            </span>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {POPULAR_ITEMS.map((item) => (
              <div
                key={item.name}
                className="w-32 shrink-0 overflow-hidden rounded-2xl bg-surface shadow-[0_10px_24px_-16px_rgba(74,46,31,0.3)]"
              >
                <div className="relative h-20 w-full" style={{ backgroundImage: item.gradient }}>
                  <div className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-white/15 blur-xl" aria-hidden="true" />
                </div>
                <div className="p-2.5">
                  <p className="truncate text-sm font-bold text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-xs font-bold text-accent">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-30 px-4 pb-4">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="mx-auto flex max-w-[420px] cursor-pointer items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-white shadow-[0_8px_30px_rgba(74,46,31,0.35)]"
        >
          <div className="text-left">
            <p className="text-sm font-bold">Scan QR to start</p>
            <p className="text-xs text-white/70">Open your table menu in seconds</p>
          </div>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15"
          >
            <ArrowIcon />
          </motion.span>
        </motion.div>
      </div>
    </main>
  );
}
