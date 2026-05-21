"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ─── Icons ────────────────────────────────────────────────────────────────────

function EnvelopeIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function HeadsetIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  );
}

function BriefcaseIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function CreditCardIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Contact Department Data ──────────────────────────────────────────────────

const DEPARTMENTS = [
  {
    icon: <EnvelopeIcon className="h-5 w-5" />,
    dept: "General Inquiries",
    desc: "Questions about our company, platform, or services",
    email: "info@shatasolutions.com",
    response: "Within 24 hours",
    accent: "blue",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-400",
    border: "hover:border-blue-500/30",
  },
  {
    icon: <HeadsetIcon className="h-5 w-5" />,
    dept: "Customer Support",
    desc: "Help with your active project, account, or technical issues",
    email: "support@shatasolutions.com",
    response: "Within 4 hours",
    accent: "green",
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
    badgeBg: "bg-green-500/10 text-green-400",
    border: "hover:border-green-500/30",
  },
  {
    icon: <BriefcaseIcon className="h-5 w-5" />,
    dept: "Sales Inquiries",
    desc: "Custom packages, enterprise quotes, partnerships, and pricing",
    email: "sales@shatasolutions.com",
    response: "Within 2 hours",
    accent: "purple",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-400",
    border: "hover:border-purple-500/30",
  },
  {
    icon: <CreditCardIcon className="h-5 w-5" />,
    dept: "Billing Inquiries",
    desc: "Payment issues, invoices, receipts, and refund requests",
    email: "billing@shatasolutions.com",
    response: "Within 24 hours",
    accent: "orange",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-400",
    border: "hover:border-orange-500/30",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const typeKey = (type || "").toLowerCase();

  const typeLabel =
    typeKey === "legal" ? "Legal Support" :
    typeKey === "privacy" ? "Privacy Request" :
    typeKey === "security" ? "Security Report" : null;

  const subject =
    typeKey === "legal" ? "Legal inquiry" :
    typeKey === "privacy" ? "Privacy request" :
    typeKey === "security" ? "Security report" : "General inquiry";

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Please fill required fields");
    setLoading(true);
    try {
      const endpoint =
        typeKey === "legal" ? "/api/support/legal" :
        typeKey === "privacy" ? "/api/support/privacy" :
        typeKey === "security" ? "/api/support/security" :
        "/api/support/general";

      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          type: typeKey || "general",
          message: `New ${subject}:\nType: ${typeKey || "general"}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`,
          email: form.email,
          phone: form.phone,
        }),
      });

      alert("Submitted successfully");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      alert("Error submitting form");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            {typeLabel ? typeLabel : "Get in Touch"}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            {typeLabel ? `Contact · ${typeLabel}` : "How can we help?"}
          </h1>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto text-lg">
            {typeLabel
              ? "Share the details below — our team will route your request to the right specialist."
              : "Reach the right team directly. Every inquiry goes to a dedicated specialist."}
          </p>
        </div>
      </section>

      {/* Department Contact Cards */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Contact the right team</h2>
          <p className="mt-2 text-white/50 text-sm">All emails are monitored by dedicated specialists.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPARTMENTS.map((d) => (
            <a
              key={d.email}
              href={`mailto:${d.email}`}
              className={`group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.06] ${d.border}`}
            >
              {/* Icon */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${d.iconBg} ${d.iconColor}`}>
                {d.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{d.dept}</p>
                <p className="mt-1 text-xs text-white/50 leading-relaxed">{d.desc}</p>
              </div>

              {/* Email */}
              <div>
                <p className={`text-xs font-semibold break-all ${d.iconColor}`}>{d.email}</p>
                <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${d.badgeBg}`}>
                  <ClockIcon />
                  {d.response}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Send a message</h2>
          <p className="mt-2 text-white/50 text-sm">
            Or email us directly at{" "}
            <a href="mailto:info@shatasolutions.com" className="text-blue-400 hover:underline">
              info@shatasolutions.com
            </a>
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4">
          {typeLabel && (
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {typeLabel}
            </div>
          )}

          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
          <input
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
          <textarea
            rows={5}
            placeholder={
              typeKey === "legal" ? "Describe your legal question or concern" :
              typeKey === "privacy" ? "Request data access, update, or deletion" :
              typeKey === "security" ? "Report a security issue or vulnerability" :
              "How can we help you? Describe your request..."
            }
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-white/90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : typeLabel ? `Send ${typeLabel}` : "Send Message"}
          </button>

          <p className="text-center text-xs text-white/30">
            By submitting, you agree to our{" "}
            <a href="/legal/terms" className="hover:text-white/60 underline">Terms</a> and{" "}
            <a href="/legal/privacy" className="hover:text-white/60 underline">Privacy Policy</a>.
          </p>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 to-white/[0.02] p-10 text-center">
          <h2 className="text-2xl font-semibold">Prefer a faster response?</h2>
          <p className="mt-3 text-white/60 max-w-md mx-auto">
            Chat with our team on WhatsApp for real-time assistance.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/201010255736?text=Hi%20I%20want%20to%20get%20started"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black rounded-full font-semibold hover:bg-green-400 transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.94 14.47L2 22l5.7-1.5A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.12l-.29-.17-3.38.89.9-3.3-.19-.3A8 8 0 1 1 12 20Zm4.43-5.57c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94c-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.2-1.4-1.34-1.64-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.52.58.18 1.1.15 1.52.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="mailto:support@shatasolutions.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition"
            >
              <EnvelopeIcon className="h-4 w-4" />
              Email Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
