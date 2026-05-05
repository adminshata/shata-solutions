"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import {
  useAudioAnalysis,
  useAvatarAnimations,
  useElevenLabsTTS,
  useChat,
  saveLead,
} from "@/lib/hooks";
import type { ChatMessage } from "@/lib/types";

interface Props {
  isDark: boolean;
  sessionId: string;
}

type Lang = "en" | "ar";

export default function AIChat({ isDark, sessionId }: Props) {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<Lang>("en");
  const [listening, setListening] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const { isBlinking, idleOffset } = useAvatarAnimations();
  const { audioLevel, startAudioAnalysis, stopAudioAnalysis } = useAudioAnalysis();
  const { isSpeaking, speak } = useElevenLabsTTS();

  const safeSpeak = (text: string) => {
    if (!process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY) {
      console.warn("Missing ElevenLabs API key");
      return;
    }
    speak(text);
  };
  const {
    messages,
    isTyping,
    streamText,
    expression,
    handleSend,
    ctaType,
    showCTA,
    leadCaptured,
    setLeadCaptured,
  } = useChat(sessionId, safeSpeak);

  // Auto-scroll chat on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamText, isTyping]);

  // Keyboard send
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const val = input.trim();
    if (!val || isTyping) return;
    setInput("");
    handleSend(val);
  }

  // Speech recognition
  function toggleVoice() {
    const SR =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    if (!SR) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      stopAudioAnalysis();
      setListening(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = lang === "ar" ? "ar-EG" : "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");

      recognitionRef.current.lastTranscript = transcript;
      setInput(transcript);

      if (e.results[0].isFinal) {
        recognition.stop();
      }
    };
    recognition.onend = () => {
      setListening(false);
      stopAudioAnalysis();

      const transcript = recognitionRef.current?.lastTranscript || "";

      if (transcript.trim()) {
        handleSend(transcript.trim());
      }

      // reset to prevent duplicate sends on next start
      if (recognitionRef.current) {
        recognitionRef.current.lastTranscript = "";
      }
    };
    recognition.onerror = () => {
      setListening(false);
      stopAudioAnalysis();
    };
    recognitionRef.current = recognition;
    startAudioAnalysis();
    recognition.start();
    setListening(true);
  }

  async function captureEmail() {
    if (!emailDraft) return;
    await saveLead({ email: emailDraft.toLowerCase() }, messages as ChatMessage[], sessionId);
    setLeadCaptured(true);
    setEmailDraft("");
  }

  // Expression emoji on avatar
  const expressionEmoji = {
    happy: "😊",
    sad: "😔",
    thinking: "🤔",
    neutral: "",
  }[expression];

  return (
    <section
      id="ai-chat"
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-b from-white via-blue-50/40 to-white"
      }`}
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Meet Shata AI
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-5xl font-semibold leading-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Talk to an AI that actually knows your business
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Ask anything about LLC formation, EIN, banking, Stripe — in English or Arabic.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* AVATAR */}
          <div className="relative flex justify-center">
            <div
              className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border shadow-2xl"
              style={{
                transform: `translateY(${idleOffset}px)`,
                transition: "transform 0.1s linear",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)",
              }}
            >
              {/* background glow frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-2xl -z-10" />

              {/* avatar video */}
              <video
                src="/avatar.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* blink overlay */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-100 pointer-events-none ${
                  isBlinking ? "opacity-20" : "opacity-0"
                }`}
              />

              {/* speaking ring */}
              {isSpeaking && (
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 0 ${8 + audioLevel * 24}px rgba(59,130,246,0.25) inset`,
                  }}
                />
              )}

              {/* expression badge */}
              {expressionEmoji && (
                <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-2xl shadow-lg animate-[scaleIn_0.3s_ease]">
                  {expressionEmoji}
                </div>
              )}

              {/* status strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                <div className="flex items-center gap-3 text-white">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      isTyping || isSpeaking
                        ? "bg-green-400 animate-pulse"
                        : "bg-white/60"
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {isSpeaking
                      ? "Speaking…"
                      : isTyping
                      ? "Thinking…"
                      : listening
                      ? "Listening…"
                      : "Online"}
                  </span>
                  <span className="ml-auto text-xs text-white/70">
                    Shata AI · v2.1
                  </span>
                </div>
              </div>
            </div>

            {/* mic level ring (when listening) */}
            {listening && (
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{
                  boxShadow: `0 0 ${40 + audioLevel * 80}px ${
                    10 + audioLevel * 30
                  }px rgba(239,68,68,0.5)`,
                }}
              />
            )}
          </div>

          {/* CHAT PANEL */}
          <div
            className={`relative rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
              isDark
                ? "bg-slate-900/80 border-white/10 backdrop-blur-xl"
                : "bg-white/90 border-slate-200 backdrop-blur-xl"
            }`}
            style={{ height: 560 }}
          >
            {/* header */}
            <div
              className={`flex items-center gap-3 px-5 py-4 border-b ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                S
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold text-sm ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Shata AI Assistant
                </p>
                <p
                  className={`text-xs flex items-center gap-1.5 ${
                    isDark ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online · avg reply 2s
                </p>
              </div>
              <div
                role="group"
                aria-label="Language"
                className={`flex text-xs rounded-full p-1 ${
                  isDark ? "bg-white/5" : "bg-slate-100"
                }`}
              >
                <button
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                  className={`px-3 py-1 rounded-full font-medium transition ${
                    lang === "en"
                      ? "bg-blue-600 text-white"
                      : isDark
                      ? "text-white/70"
                      : "text-slate-600"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ar")}
                  aria-pressed={lang === "ar"}
                  className={`px-3 py-1 rounded-full font-medium transition ${
                    lang === "ar"
                      ? "bg-blue-600 text-white"
                      : isDark
                      ? "text-white/70"
                      : "text-slate-600"
                  }`}
                >
                  AR
                </button>
              </div>
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              className={`flex-1 overflow-y-auto px-5 py-4 space-y-3 ${
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
                  {m.role === "bot" && (
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0">
                      S
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm shadow-md"
                        : isDark
                        ? "bg-slate-800 text-white/90 rounded-bl-sm"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                    }`}
                  >
                    {m.message}
                  </div>
                </div>
              ))}

              {/* live stream (assistant typing in real time) */}
              {streamText && (
                <div className="flex justify-start">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0">
                    S
                  </div>
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap rounded-bl-sm ${
                      isDark
                        ? "bg-slate-800 text-white/90"
                        : "bg-white text-slate-800 border border-slate-200"
                    }`}
                  >
                    {streamText}
                    <span className="ml-0.5 inline-block w-1.5 h-4 align-[-2px] bg-blue-500 animate-pulse" />
                  </div>
                </div>
              )}

              {/* typing indicator */}
              {isTyping && !streamText && (
                <div className="flex justify-start">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0">
                    S
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl rounded-bl-sm ${
                      isDark
                        ? "bg-slate-800"
                        : "bg-white border border-slate-200"
                    }`}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full ${
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

              {/* Smart CTA */}
              {showCTA && !leadCaptured && (
                <div
                  className={`mt-3 rounded-2xl p-4 border ${
                    isDark
                      ? "bg-blue-950/40 border-blue-500/30"
                      : "bg-blue-50 border-blue-200"
                  } animate-[fadeUp_0.4s_ease]`}
                >
                  {ctaType === "whatsapp" ? (
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Ready to chat with a real human?
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        Our team replies on WhatsApp in minutes.
                      </p>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        className="mt-3 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
                        onClick={() => setLeadCaptured(true)}
                      >
                        Continue on WhatsApp →
                      </a>
                    </div>
                  ) : (
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Want a personalized quote by email?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <input
                          type="email"
                          value={emailDraft}
                          onChange={(e) => setEmailDraft(e.target.value)}
                          placeholder="you@company.com"
                          className={`flex-1 rounded-full border px-3 py-2 text-sm outline-none ${
                            isDark
                              ? "bg-slate-900 border-white/10 text-white placeholder-white/40"
                              : "bg-white border-slate-300 text-slate-900"
                          }`}
                        />
                        <button
                          onClick={captureEmail}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {leadCaptured && (
                <div
                  className={`mt-2 text-center text-xs py-2 rounded-full ${
                    isDark
                      ? "bg-green-500/10 text-green-400"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  ✓ We&apos;ll be in touch shortly.
                </div>
              )}
            </div>

            {/* input bar */}
            <div
              className={`px-4 py-3 border-t ${
                isDark ? "border-white/10 bg-slate-900/60" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={toggleVoice}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop voice input" : "Start voice input"}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition shrink-0 ${
                    listening
                      ? "bg-red-500 text-white animate-[chat-pulse_1s_ease-in-out_infinite]"
                      : isDark
                      ? "bg-white/10 text-white/80 hover:bg-white/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {listening ? "■" : "🎙"}
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={lang === "ar" ? "اكتب رسالتك…" : "Type your message…"}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  className={`flex-1 rounded-full border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-950 border-white/10 text-white placeholder-white/40"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                  }`}
                />

                <button
                  type="button"
                  onClick={submit}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send"
                  className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95"
                >
                  ➤
                </button>
              </div>
              <p
                className={`mt-2 text-[10px] text-center ${
                  isDark ? "text-white/40" : "text-slate-400"
                }`}
              >
                Powered by GPT-4 + ElevenLabs · responses may be imperfect
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
