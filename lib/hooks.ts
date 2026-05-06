"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabaseBrowser } from "./supabase";
const supabase = supabaseBrowser();
import { ELEVENLABS_VOICE_ID, MAKE_WEBHOOK_URL } from "./constants";
import type { ChatMessage, CtaType } from "./types";

/* ============================================================
   Theme hook — localStorage + document class sync
   ============================================================ */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("shata-theme");
    const next = saved === "dark";
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      window.localStorage.setItem("shata-theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
}

/* ============================================================
   Session hook — persistent session id
   ============================================================ */
export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("session_id") || crypto.randomUUID();
    localStorage.setItem("session_id", id);
    setSessionId(id);
  }, []);

  return sessionId;
}

/* ============================================================
   Cursor glow — tracks mouse for background glow
   ============================================================ */
export function useCursorGlow() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const glow = document.getElementById("cursor-glow");
      if (glow) {
        glow.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
}

/* ============================================================
   Body scroll lock — while modal is open
   ============================================================ */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}

/* ============================================================
   Blink + idle bob — avatar micro-animations
   ============================================================ */
export function useAvatarAnimations() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [idleOffset, setIdleOffset] = useState(0);

  useEffect(() => {
    const schedule = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    };
    const interval = setInterval(schedule, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame = 0;
    let t = 0;
    const animate = () => {
      t += 0.05;
      setIdleOffset(Math.sin(t) * 2);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return { isBlinking, idleOffset };
}

/* ============================================================
   Audio analysis hook — mic visualizer level 0..1
   ============================================================ */
export function useAudioAnalysis() {
  const [audioLevel, setAudioLevel] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const smoothLevelRef = useRef(0);

  const startAudioAnalysis = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const Ctor =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioCtx: AudioContext = new Ctor();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const mic = audioCtx.createMediaStreamSource(stream);
      mic.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const update = () => {
        if (!analyserRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const raw = avg / 255;
        smoothLevelRef.current =
          smoothLevelRef.current + (raw - smoothLevelRef.current) * 0.2;
        setAudioLevel(smoothLevelRef.current);
        rafRef.current = requestAnimationFrame(update);
      };
      update();
    } catch (err) {
      console.error("Audio analysis failed:", err);
    }
  }, []);

  const stopAudioAnalysis = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    analyserRef.current = null;
    setAudioLevel(0);
    smoothLevelRef.current = 0;
  }, []);

  return { audioLevel, startAudioAnalysis, stopAudioAnalysis };
}

/* ============================================================
   ElevenLabs TTS — speaks a string, sets isSpeaking flag
   NOTE: For production, move the API call to /api/tts
   ============================================================ */
export function useElevenLabsTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(async (text: string) => {
    if (typeof window === "undefined" || !text) return;
    try {
      setIsSpeaking(true);
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.8 },
          }),
        }
      );
      if (!res.ok) {
        console.error("ElevenLabs failed:", await res.text());
        setIsSpeaking(false);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } catch (err) {
      console.error("ElevenLabs error", err);
      setIsSpeaking(false);
    }
  }, []);

  return { isSpeaking, speak };
}

/* ============================================================
   Supabase lead saver — upsert by sessionId
   ============================================================ */
export async function saveLead(
  lead: { email?: string; phone?: string },
  messages: ChatMessage[],
  sessionId: string
) {
  try {
    const { data: existing } = await supabase
      .from("leads")
      .select("id, email, phone")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("leads")
        .update({
          email: lead.email ?? existing.email,
          phone: lead.phone ?? existing.phone,
          messages,
          created_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("leads").insert([
        {
          email: lead.email || null,
          phone: lead.phone || null,
          messages,
          session_id: sessionId,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  } catch (err) {
    console.error("Error saving lead", err);
  }
}

/* ============================================================
   Intent score helper
   ============================================================ */
export function evaluateIntent(msg: string): number {
  const lower = msg.toLowerCase();
  let score = 0;
  if (lower.includes("price") || lower.includes("cost")) score += 2;
  if (lower.includes("start") || lower.includes("begin")) score += 2;
  if (lower.includes("help") || lower.includes("how")) score += 1;
  if (lower.includes("now") || lower.includes("asap")) score += 2;
  return score;
}

/* ============================================================
   Chat hook — encapsulates messages, streaming, WhatsApp flow
   ============================================================ */
export function useChat(sessionId: string, speak: (t: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", message: "Hi 👋 I'm Shata. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [expression, setExpression] = useState<"happy" | "sad" | "thinking" | "neutral">("neutral");
  const [intentScore, setIntentScore] = useState(0);
  const [lastPhone, setLastPhone] = useState<string | null>(null);
  const [ctaType, setCtaType] = useState<CtaType>("none");
  const [showCTA, setShowCTA] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Persist chat history
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chat-history") || "[]");
    if (Array.isArray(saved) && saved.length) setMessages(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
  }, [messages]);

  const handleSend = useCallback(
    async (message: string) => {
      if (!message.trim() || isTyping) return;
      setShowCTA(false);
      setCtaType("none");

      const score = evaluateIntent(message);
      setIntentScore((p) => p + score);

      setMessages((prev) => [...prev, { role: "user", message }]);

      // Phone detection + WhatsApp automation
      const phoneMatch = message.match(/(\+?\d[\d\s\-]{7,}\d)/);
      if (phoneMatch) {
        const phone = phoneMatch[0];
        setLastPhone(phone);

        await saveLead({ phone }, [...messages, { role: "user", message }], sessionId);

        // detect name
        let name = "";
        const rx = /my name is\s+([a-zA-Z]+)/i;
        const m = message.match(rx);
        if (m) name = m[1];
        else {
          for (let i = messages.length - 1; i >= 0; i--) {
            const mm = messages[i].message.match(rx);
            if (mm) {
              name = mm[1];
              break;
            }
          }
        }
        const title = name ? `Mr./Ms. ${name}` : "Sir/Madam";

        // detect service
        let service = "your request";
        const l = message.toLowerCase();
        if (l.includes("llc") || l.includes("company") || l.includes("formation"))
          service = "LLC formation";
        else if (l.includes("ein") || l.includes("tax id"))
          service = "EIN registration";
        else if (l.includes("automation") || l.includes("ai"))
          service = "AI automation";
        else if (l.includes("setup") || l.includes("business"))
          service = "business setup";

        // AI-generated WhatsApp message
        let finalMessage = "";
        try {
          const ai = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: `You are a professional sales assistant for Shata Solutions. Write a short, elegant WhatsApp message to ${title} regarding ${service}. Keep information minimal, focus on trust, end with a polite question.`,
              history: [],
              sessionId,
            }),
          });
          const d = await ai.json();
          finalMessage = d.reply;
        } catch {
          finalMessage = `Hello ${title},\n\nThis is Shata Solutions. We received your request regarding ${service}. Our team will assist you shortly.`;
        }

        // Trigger WhatsApp webhook
        try {
          await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, message: finalMessage }),
          });
        } catch (err) {
          console.error("WhatsApp trigger failed", err);
        }
      }

      // Email detection
      const emailMatch = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      if (emailMatch) {
        await saveLead(
          { email: emailMatch[0].toLowerCase() },
          [...messages, { role: "user", message }],
          sessionId
        );
      }

      setStreamText("");
      setIsTyping(true);

      let data: any;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history: messages, sessionId }),
        });
        if (!res.ok) throw new Error("API error");
        data = await res.json();
      } catch (err) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "bot", message: "⚠️ Server not responding. Try again." },
        ]);
        return;
      }

      setIsTyping(false);
      const text = data.reply || "";
      const lower = text.toLowerCase();
      if (lower.includes("welcome") || lower.includes("great") || lower.includes("awesome"))
        setExpression("happy");
      else if (lower.includes("sorry") || lower.includes("issue") || lower.includes("problem"))
        setExpression("sad");
      else if (lower.includes("?")) setExpression("thinking");
      else setExpression("neutral");

      // stream chars
      let i = 0;
      const stream = async () => {
        if (i < text.length) {
          setStreamText((p) => p + text.charAt(i));
          i++;
          setTimeout(stream, 10);
        } else {
          setMessages((prev) => [...prev, { role: "bot", message: text }]);
          setStreamText("");

          if (lastPhone) {
            try {
              await fetch(MAKE_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: lastPhone, message: text }),
              });
            } catch (err) {
              console.error("WhatsApp AI reply failed", err);
            }
          }

          speak(text);

          const total = intentScore + score;
          if (total >= 3 && !leadCaptured) {
            setShowCTA(true);
            setCtaType(total >= 5 ? "whatsapp" : "email");
          }
        }
      };
      stream();
    },
    [isTyping, messages, sessionId, speak, intentScore, leadCaptured, lastPhone]
  );

  return {
    messages,
    setMessages,
    isTyping,
    streamText,
    expression,
    handleSend,
    ctaType,
    showCTA,
    leadCaptured,
    setLeadCaptured,
  };
}
