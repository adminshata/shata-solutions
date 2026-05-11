"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const typeKey = (type || "").toLowerCase();
  const typeLabel =
    typeKey === "legal"
      ? "Legal support"
      : typeKey === "privacy"
      ? "Privacy request"
      : typeKey === "security"
      ? "Security report"
      : null;

  const subject =
    typeKey === "legal"
      ? "Legal inquiry"
      : typeKey === "privacy"
      ? "Privacy request"
      : typeKey === "security"
      ? "Security report"
      : "General inquiry";

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Please fill required fields");

    setLoading(true);

    try {
      const endpoint =
        typeKey === "legal"
          ? "/api/support/legal"
          : typeKey === "privacy"
          ? "/api/support/privacy"
          : typeKey === "security"
          ? "/api/support/security"
          : "/api/support/general";
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (err) {
      alert("Error submitting form");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            {typeLabel ? `Contact · ${typeLabel}` : "Let’s build your business."}
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            {typeLabel
              ? "Share the details below — our team will route your request to the right specialist."
              : "Tell us what you need — we’ll guide you and handle the setup."}
          </p>
          {typeLabel && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {typeLabel}
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none"
          />

          <input
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none"
          />
          {typeLabel && (
            <div className="text-xs text-white/40">
              This will be used to follow up on your {typeLabel.toLowerCase()}.
            </div>
          )}

          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none"
          />
          {typeLabel && !form.message && (
            <div className="text-xs text-white/40">
              Tip: Start with key details (account, date, links, screenshots).
            </div>
          )}
          <textarea
            placeholder={
              typeKey === "legal"
                ? "Ask about terms, policies, or agreements"
                : typeKey === "privacy"
                ? "Request data access, update, or deletion"
                : typeKey === "security"
                ? "Report a security issue or vulnerability"
                : "What do you need help with?"
            }
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none h-32"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-white/90 transition"
          >
            {loading ? "Submitting..." : typeLabel ? `Send ${typeLabel}` : "Submit Request"}
          </button>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 to-white/[0.02] p-10">
          <h2 className="text-2xl font-semibold">Prefer WhatsApp?</h2>
          <p className="mt-3 text-white/60">
            Chat with us directly and get a faster response.
          </p>

          <a
            href="https://wa.me/201010255736?text=Hi%20I%20want%20to%20start"
            target="_blank"
            className="inline-block mt-6 px-6 py-3 bg-green-500 text-black rounded-full font-medium hover:bg-green-400"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}