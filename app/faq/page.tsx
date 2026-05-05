"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "What services do you offer?",
    a: "We help you start and grow your business with LLC formation, EIN filing, payment setup, websites, SaaS systems, and automation — all done for you.",
  },
  {
    q: "Do I need to be in the U.S. to start a company?",
    a: "No. We help international clients start and operate U.S. businesses from anywhere in the world.",
  },
  {
    q: "How long does it take to form an LLC?",
    a: "Most LLC setups are completed within a few days depending on the state and requirements.",
  },
  {
    q: "Do you handle EIN registration?",
    a: "Yes, we guide and handle the EIN process so your business can operate legally and open payment accounts.",
  },
  {
    q: "Can you set up Stripe or PayPal for me?",
    a: "Yes. We configure your payment systems so you can accept payments in USD globally.",
  },
  {
    q: "Do you build websites?",
    a: "Yes. We create fast, modern, conversion-focused websites tailored to your business.",
  },
  {
    q: "What is included in automation systems?",
    a: "Lead capture, chatbot, CRM dashboard, follow-ups, and AI responses — all working automatically.",
  },
  {
    q: "Do you offer full packages?",
    a: "Yes. Our full system package includes LLC, EIN, payments, website, and automation — everything in one.",
  },
  {
    q: "How do I get started?",
    a: "Simply go to the contact page, submit your request, or message us on WhatsApp and we’ll guide you step by step.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Everything you need to know before getting started.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20 space-y-4">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center"
              >
                <span className="text-lg font-semibold">{item.q}</span>
                <span className="text-white/40">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-white/60 text-sm leading-7">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-semibold text-center">
          Browse by topic
        </h2>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/faq/llc" className="p-4 border border-white/10 rounded-xl hover:bg-white/10 text-center">
            LLC
          </Link>

          <Link href="/faq/ein" className="p-4 border border-white/10 rounded-xl hover:bg-white/10 text-center">
            EIN
          </Link>

          <Link href="/faq/stripe" className="p-4 border border-white/10 rounded-xl hover:bg-white/10 text-center">
            Payments
          </Link>

          <Link href="/faq/automation" className="p-4 border border-white/10 rounded-xl hover:bg-white/10 text-center">
            Automation
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl font-semibold">
            Why clients trust us
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            We don’t just offer services — we build complete systems that help you start faster,
            operate smoother, and scale with confidence.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/[0.02] p-10">
          <h2 className="text-3xl font-semibold">
            Ready to start your business?
          </h2>
          <p className="mt-4 text-white/60">
            Let’s build your system and get you operating fast.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 border border-white/20 rounded-full text-sm hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}