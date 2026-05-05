"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useChat, useElevenLabsTTS } from "@/lib/hooks";

interface Props {
  isDark: boolean;
  sessionId: string;
}

export default function ChatWidget({ isDark, sessionId }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { speak } = useElevenLabsTTS();
  const {
    messages,
    isTyping,
    streamText,
    handleSend,
    ctaType,
    showCTA,
    leadCaptured,
  } = useChat(sessionId, speak);

  // Auto-scroll on updates
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamText, isTyping, open]);

  // Flag unread if a new bot message comes in while closed
  useEffect(() => {
    if (!open && messages.length > 1) {
      const last = messages[messages.length - 1];
      if (last.role === "bot") setUnread(true);
    }
  }, [messages, open]);

  function submit() {
    const val = input.trim();
    if (!val) return;
    setInput("");
    handleSend(val);
  }

  function toggle() {
    setOpen((v) => !v);
    if (!open) setUnread(false);
  }

  return (
    <>
      {/* FLOATING BUBBLE */}
      <button
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-40 group"
      >
        <div
          className={`relative h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-[0_15px_40px_rgba(59,130,246,0.5)] transition-all duration-300 ${
            open ? "rotate-180 scale-95" : "hover:scale-110"
          }`}
        >
          <span className="text-2xl">{open ? "×" : "💬"}</span>
          {unread && !open && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white text-[10px] flex items-center justify-center font-bold animate-bounce">
              1
            </span>
          )}
          {!open && (
            <span className="absolute inset-0 rounded-full bg-blue-400/50 animate-ping" />
          )}
        </div>
      </button>

      {/* POPUP */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Shata AI"
          className={`fixed bottom-24 right-6 z-40 w-[90vw] max-w-sm rounded-3xl border shadow-2xl overflow-hidden flex flex-col animate-[fadeUp_0.3s_ease] ${
            isDark
              ? "bg-slate-900 border-white/10"
              : "bg-white border-slate-200"
          }`}
          style={{ height: 520 }}
        >
          {/* header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold">
                S
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Shata AI</p>
                <p className="text-xs text-white/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  We typically reply in seconds
                </p>
              </div>
              <button
                onClick={toggle}
                aria-label="Close chat"
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className={`flex-1 overflow-y-auto p-4 space-y-3 ${
              isDark ? "bg-slate-950/40" : "bg-slate-50/40"
            }`}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : isDark
                      ? "bg-slate-800 text-white/90 rounded-bl-sm"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            ))}

            {streamText && (
              <div className="flex justify-start">
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl rounded-bl-sm text-sm whitespace-pre-wrap ${
                    isDark
                      ? "bg-slate-800 text-white/90"
                      : "bg-white text-slate-800 border border-slate-200"
                  }`}
                >
                  {streamText}
                  <span className="ml-0.5 inline-block w-1.5 h-3.5 align-[-2px] bg-blue-500 animate-pulse" />
                </div>
              </div>
            )}

            {isTyping && !streamText && (
              <div className="flex justify-start">
                <div
                  className={`px-3 py-2 rounded-2xl rounded-bl-sm ${
                    isDark ? "bg-slate-800" : "bg-white border border-slate-200"
                  }`}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${
                          isDark ? "bg-white/60" : "bg-slate-400"
                        }`}
                        style={{
                          animation: `bounce 0.6s ${i * 0.12}s ease infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showCTA && !leadCaptured && ctaType === "whatsapp" && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="block text-center mt-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
              >
                Continue on WhatsApp →
              </a>
            )}
          </div>

          {/* input */}
          <div
            className={`p-3 border-t flex items-center gap-2 ${
              isDark
                ? "border-white/10 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Type a message…"
              className={`flex-1 rounded-full border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-slate-950 border-white/10 text-white placeholder-white/40"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
              }`}
            />
            <button
              onClick={submit}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
