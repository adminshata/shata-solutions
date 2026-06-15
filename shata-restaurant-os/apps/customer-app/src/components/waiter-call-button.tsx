"use client";

import { useEffect, useRef, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

const CALL_TYPES = [
  { type: "ASSISTANCE",   en: "Help",    ar: "مساعدة",  icon: "🙋" },
  { type: "CHECK_PLEASE", en: "Bill",    ar: "الحساب",  icon: "🧾" },
  { type: "WATER",        en: "Water",   ar: "مياه",    icon: "💧" },
  { type: "MORE_NAPKINS", en: "Napkins", ar: "مناديل",  icon: "🧻" },
] as const;

type CallType = (typeof CALL_TYPES)[number]["type"];
type CallStatus = "idle" | "sent" | "acknowledged" | "resolved";

interface Props {
  sessionToken: string;
  isArabic?: boolean;
}

const TEXT = {
  en: {
    sheetTitle: "How can we help?",
    sentTitle: "Request sent",
    sentSubtitle: "Someone will be with you shortly",
    cancel: "Cancel",
    statusSent: "Request sent",
    statusAcknowledged: "On the way",
    statusResolved: "Resolved",
    label: "Call waiter",
    dismiss: "Dismiss",
  },
  ar: {
    sheetTitle: "كيف يمكننا مساعدتك؟",
    sentTitle: "تم الإبلاغ",
    sentSubtitle: "سيتم الوصول إليك قريبًا",
    cancel: "إلغاء",
    statusSent: "تم الإبلاغ",
    statusAcknowledged: "في الطريق",
    statusResolved: "تم الوصول",
    label: "نداء النادل",
    dismiss: "إغلاق",
  },
};

export function WaiterCallButton({ sessionToken, isArabic = false }: Props) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [status, setStatus] = useState<CallStatus>("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = isArabic ? TEXT.ar : TEXT.en;

  // Poll for acknowledgment every 10s after a call is placed
  useEffect(() => {
    if (!callId || status === "resolved") return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API}/api/dashboard/waiter-calls/active?sessionCallId=${callId}`, { cache: "no-store" });
        if (!res.ok) return;
        const calls = await res.json() as Array<{ id: string; status: string }>;
        const mine = calls.find((c) => c.id === callId);
        if (!mine) {
          // No longer in active → resolved
          setStatus("resolved");
          clearInterval(pollRef.current!);
          setTimeout(() => { setStatus("idle"); setCallId(null); }, 3000);
        } else if (mine.status === "ACKNOWLEDGED" && status === "sent") {
          setStatus("acknowledged");
        }
      } catch { /* network error — silently ignore */ }
    }, 10_000);

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [callId, status]);

  async function call(type: CallType) {
    setSending(true);
    try {
      const res = await fetch(`${API}/api/sessions/${sessionToken}/waiter-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      if (res.ok) {
        const data = await res.json() as { callId: string };
        setCallId(data.callId);
        setStatus("sent");
      }
    } finally {
      setSending(false);
      // Close sheet after brief delay so user sees confirmation
      setTimeout(() => setOpen(false), 1500);
    }
  }

  function dismiss() {
    setStatus("idle");
    setCallId(null);
    if (pollRef.current) clearInterval(pollRef.current);
  }

  const statusMessages: Record<CallStatus, { text: string; icon: string } | null> = {
    idle: null,
    sent: { text: t.statusSent, icon: "✓" },
    acknowledged: { text: t.statusAcknowledged, icon: "🚶" },
    resolved: { text: t.statusResolved, icon: "✅" },
  };
  const statusMsg = statusMessages[status];

  return (
    <>
      {/* Status toast — appears after call is placed */}
      {statusMsg && (
        <div className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2A24] shadow-[0_4px_16px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.05]">
          <span className="text-[#0F8A5F]">{statusMsg.icon}</span>
          {statusMsg.text}
          {status !== "idle" && (
            <button onClick={dismiss} className="ml-1 text-[#9AA8A1] hover:text-[#1F2A24]" aria-label={t.dismiss}>
              ✕
            </button>
          )}
        </div>
      )}

      {/* Floating trigger — sits above the cart bar / bottom nav, never overlapping product cards */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-40 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0F8A5F] shadow-[0_4px_14px_rgba(15,138,95,0.2)] ring-1 ring-black/[0.05] transition-transform active:scale-95"
        aria-label={t.label}
      >
        {status !== "idle" ? (
          <span className="text-base">{statusMsg?.icon}</span>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        )}
      </button>

      {/* Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative w-full rounded-t-3xl bg-white p-6 shadow-2xl"
            dir={isArabic ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0F8A5F]/10 text-3xl text-[#0F8A5F]">✓</div>
                <p className="text-base font-bold text-[#1F2A24]">{t.sentTitle}</p>
                <p className="text-sm text-[#9AA8A1]">{t.sentSubtitle}</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-center text-base font-bold text-[#1F2A24]">{t.sheetTitle}</p>
                <div className="grid grid-cols-2 gap-3">
                  {CALL_TYPES.map((ct) => (
                    <button
                      key={ct.type}
                      onClick={() => call(ct.type)}
                      disabled={sending}
                      className="flex flex-col items-center gap-2 rounded-2xl bg-[#F6F8F6] p-4 ring-1 ring-black/[0.04] transition-colors hover:bg-[#0F8A5F]/10 active:scale-95 disabled:opacity-50"
                    >
                      <span className="text-2xl">{ct.icon}</span>
                      <span className="text-sm font-semibold text-[#1F2A24]">{isArabic ? ct.ar : ct.en}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setOpen(false)} className="mt-4 w-full py-2 text-sm font-semibold text-[#9AA8A1]">
                  {t.cancel}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
