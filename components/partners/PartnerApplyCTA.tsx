"use client";

import { useState } from "react";

interface Props {
  isDark: boolean;
  sessionId: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const CHANNELS = [
  "YouTube",
  "Newsletter",
  "Twitter / X",
  "LinkedIn",
  "Instagram",
  "TikTok",
  "Podcast",
  "Blog / SEO",
  "Discord / Community",
  "Agency clients",
  "Other",
];

export default function PartnerApplyCTA({ isDark, sessionId }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    audience: "",
    channels: [] as string[],
    pitch: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const toggleChannel = (c: string) => {
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(c)
        ? f.channels.filter((x) => x !== c)
        : [...f.channels, c],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sessionId }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const isValid =
    form.name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.audience.trim().length > 0 &&
    form.channels.length > 0 &&
    form.pitch.trim().length > 20;

  return (
    <section
      id="partner-apply"
      className="relative py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div
          className={`relative rounded-3xl overflow-hidden border ${
            isDark
              ? "border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40"
              : "border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30"
          } shadow-[0_30px_80px_-20px_rgba(99,102,241,0.3)]`}
        >
          {/* background accents */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/25 blur-[100px]" />

          <div className="relative p-8 sm:p-12">
            <div className="text-center mb-10 max-w-xl mx-auto">
              <div
                className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Apply to the partner program
              </div>
              <h2
                className={`text-3xl sm:text-4xl font-semibold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Takes 2 minutes. We reply in 24h.
              </h2>
              <p
                className={`mt-3 text-base ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                Tell us about your audience. We review every application personally — no bots, no form rejects.
              </p>
            </div>

            {status === "success" ? (
              <SuccessState isDark={isDark} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    isDark={isDark}
                    label="Full name"
                    required
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Jane Builder"
                  />
                  <Field
                    isDark={isDark}
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="you@brand.com"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    isDark={isDark}
                    label="Website / main channel"
                    value={form.website}
                    onChange={(v) => setForm((f) => ({ ...f, website: v }))}
                    placeholder="https://youtube.com/@..."
                  />
                  <Field
                    isDark={isDark}
                    label="Audience size"
                    required
                    value={form.audience}
                    onChange={(v) => setForm((f) => ({ ...f, audience: v }))}
                    placeholder="e.g. 50K newsletter + 12K X"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Where will you promote Shata?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CHANNELS.map((c) => {
                      const active = form.channels.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleChannel(c)}
                          className={`rounded-full px-4 py-2 text-sm font-medium border transition-all ${
                            active
                              ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-[1.02]"
                              : isDark
                              ? "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/25"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Why Shata? Who's your audience?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.pitch}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pitch: e.target.value }))
                    }
                    placeholder="I help non-US founders launch US businesses. My audience is 20K founders in India, UAE, and LATAM — they already ask me weekly about LLC formation. Shata is a perfect fit because..."
                    className={`w-full rounded-xl border px-4 py-3 text-sm resize-none transition-colors outline-none ${
                      isDark
                        ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-blue-500 focus:bg-white/10"
                        : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                    }`}
                  />
                  <div
                    className={`mt-1.5 text-xs ${
                      isDark ? "text-white/40" : "text-slate-400"
                    }`}
                  >
                    {form.pitch.length} / min 20 characters
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isValid || status === "submitting"}
                    className={`group relative w-full overflow-hidden rounded-full px-6 py-4 font-semibold text-white transition-all ${
                      isValid && status !== "submitting"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_10px_40px_rgba(99,102,241,0.45)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.65)] hover:scale-[1.01] active:scale-[0.99]"
                        : "bg-slate-400 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {status === "submitting"
                      ? "Submitting..."
                      : "Submit application →"}
                  </button>

                  {status === "error" && (
                    <div className="mt-3 text-center text-sm text-red-500">
                      Something went wrong. Please try again or email
                      partners@shata.io directly.
                    </div>
                  )}

                  <div
                    className={`mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    <span>🔒 Your info stays private</span>
                    <span>⚡ 24h response guaranteed</span>
                    <span>✉️ Reply from a real human</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  isDark,
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  isDark: boolean;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label
        className={`block text-sm font-semibold mb-2 ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none ${
          isDark
            ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-blue-500 focus:bg-white/10"
            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
        }`}
      />
    </div>
  );
}

function SuccessState({ isDark }: { isDark: boolean }) {
  return (
    <div className="text-center py-10">
      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_20px_60px_rgba(16,185,129,0.4)]">
        <svg
          className="h-10 w-10 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h3
        className={`mt-6 text-2xl font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        Application received 🎉
      </h3>
      <p
        className={`mt-3 max-w-md mx-auto text-sm ${
          isDark ? "text-white/70" : "text-slate-600"
        }`}
      >
        Thanks for applying to the Shata Partner Program. We'll review your
        application and reply within 24 hours from{" "}
        <span className="font-semibold">partners@shata.io</span>. Check your
        spam folder just in case.
      </p>

      <div
        className={`mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${
          isDark
            ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
            : "border-blue-100 bg-blue-50 text-blue-700"
        }`}
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        Status: Pending review
      </div>
    </div>
  );
}
