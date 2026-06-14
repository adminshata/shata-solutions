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

interface Props { sessionToken: string }

export function WaiterCallButton({ sessionToken }: Props) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [status, setStatus] = useState<CallStatus>("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const statusMessages: Record<CallStatus, { text: string; color: string; bg: string } | null> = {
    idle: null,
    sent: { text: "تم الإبلاغ ✓", color: "text-primary-dark", bg: "bg-secondary/60 border-secondary" },
    acknowledged: { text: "في الطريق ✓", color: "text-foreground", bg: "bg-accent-light border-accent/30" },
    resolved: { text: "تم الوصول ✓", color: "text-muted-foreground", bg: "bg-muted border-border" },
  };
  const statusMsg = statusMessages[status];

  return (
    <>
      {/* Status toast — appears after call is placed */}
      {statusMsg && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl border px-4 py-2.5 shadow-lg text-sm font-semibold ${statusMsg.bg} ${statusMsg.color}`}>
          {statusMsg.text}
          {status !== "idle" && (
            <button onClick={dismiss} className="ml-2 opacity-50 hover:opacity-100 text-xs">✕</button>
          )}
        </div>
      )}

      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-lg border border-border text-foreground hover:bg-secondary/30 active:scale-95 transition-transform"
        aria-label="Call waiter"
      >
        {status !== "idle" ? (
          <span className="text-base">
            {status === "sent" ? "✓" : status === "acknowledged" ? "🚶" : "✅"}
          </span>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        )}
      </button>

      {/* Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div
            className="w-full rounded-t-3xl bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-3xl text-primary-dark">✓</div>
                <p className="text-base font-bold text-primary-dark">تم الإبلاغ ✓</p>
                <p className="text-sm text-muted-foreground">Someone will be with you shortly</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-center text-base font-semibold text-foreground">كيف يمكننا مساعدتك؟</p>
                <div className="grid grid-cols-2 gap-3">
                  {CALL_TYPES.map((ct) => (
                    <button
                      key={ct.type}
                      onClick={() => call(ct.type)}
                      disabled={sending}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-muted/50 p-4 hover:bg-secondary/40 hover:border-primary/30 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <span className="text-2xl">{ct.icon}</span>
                      <span className="text-sm font-semibold text-foreground">{ct.ar}</span>
                      <span className="text-xs text-muted-foreground">{ct.en}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setOpen(false)} className="mt-4 w-full py-2 text-sm text-muted-foreground">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
