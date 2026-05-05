"use client";

import { useState } from "react";
import { saveLead } from "@/lib/hooks";

interface Props {
  isDark: boolean;
  sessionId: string;
}

export default function LeadForm({ isDark, sessionId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("LLC Formation");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) return;
    setStatus("saving");
    try {
      await saveLead(
        { email },
        [{ role: "user", message: `Name: ${name}. Service: ${service}.` }],
        sessionId
      );
      setStatus("ok");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className={`py-24 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-950"
          : "bg-gradient-to-b from-white to-slate-50"
      }`}
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Get in touch
          </p>
          <h2
            className={`mt-4 text-3xl sm:text-4xl font-semibold ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Talk to our team
          </h2>
          <p
            className={`mt-3 ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Leave your details and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-3xl p-8 border shadow-xl ${
            isDark
              ? "bg-slate-900 border-white/10"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="lf-name"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-white/80" : "text-slate-700"
                }`}
              >
                Your name
              </label>
              <input
                id="lf-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Founder"
                required
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-slate-950 border-white/10 text-white placeholder-white/40"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="lf-email"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-white/80" : "text-slate-700"
                }`}
              >
                Email
              </label>
              <input
                id="lf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-slate-950 border-white/10 text-white placeholder-white/40"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="lf-service"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-white/80" : "text-slate-700"
                }`}
              >
                What do you need?
              </label>
              <select
                id="lf-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-slate-950 border-white/10 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                <option>LLC Formation</option>
                <option>EIN Registration</option>
                <option>US Bank Account</option>
                <option>Stripe Setup</option>
                <option>AI Automation</option>
                <option>Full Business Setup</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "saving"}
              className="mt-2 w-full rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] active:scale-95"
            >
              {status === "saving" ? "Sending..." : "Send message"}
            </button>

            {status === "ok" && (
              <p className="text-center text-sm text-green-500 font-medium">
                ✓ Thanks! We&apos;ll be in touch within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-500 font-medium">
                ⚠️ Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
