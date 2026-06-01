"use client";

import { useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";

const CALL_TYPES = [
  { type: "ASSISTANCE",   en: "Help",    ar: "مساعدة",  icon: "🙋" },
  { type: "CHECK_PLEASE", en: "Bill",    ar: "الحساب",  icon: "🧾" },
  { type: "WATER",        en: "Water",   ar: "مياه",    icon: "💧" },
  { type: "MORE_NAPKINS", en: "Napkins", ar: "مناديل",  icon: "🧻" },
] as const;

type CallType = (typeof CALL_TYPES)[number]["type"];

interface Props { sessionToken: string }

export function WaiterCallButton({ sessionToken }: Props) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<CallType | null>(null);
  const [sending, setSending] = useState(false);

  async function call(type: CallType) {
    setSending(true);
    try {
      await fetch(`${API}/api/v1/sessions/${sessionToken}/waiter-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      setSent(type);
      setTimeout(() => { setSent(null); setOpen(false); }, 2500);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-transform"
        aria-label="Call waiter"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      </button>

      {/* Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div
            className="w-full rounded-t-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
                <p className="text-base font-bold text-green-700">تم الإبلاغ ✓</p>
                <p className="text-sm text-slate-500">On the way!</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-center text-base font-semibold text-slate-700">كيف يمكننا مساعدتك؟</p>
                <div className="grid grid-cols-2 gap-3">
                  {CALL_TYPES.map((ct) => (
                    <button
                      key={ct.type}
                      onClick={() => call(ct.type)}
                      disabled={sending}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-brand/5 hover:border-brand/30 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <span className="text-2xl">{ct.icon}</span>
                      <span className="text-sm font-semibold text-slate-800">{ct.ar}</span>
                      <span className="text-xs text-slate-400">{ct.en}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setOpen(false)} className="mt-4 w-full py-2 text-sm text-slate-400">
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
