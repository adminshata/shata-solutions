"use client";

import { useState } from "react";

interface Props {
  isDark: boolean;
}

const FAQS = [
  {
    q: "How long is the tracking cookie?",
    a: "30 days from the first click. If someone clicks your link today and signs up any time in the next 30 days — even from a different device, as long as they're on the same email — you get the commission. We use first-party fingerprinting + email match, not just cookies, so even private-browsing visitors are tracked.",
  },
  {
    q: "When and how do I get paid?",
    a: "Every 1st of the month for all commissions earned in the previous month. Minimum payout is $50 (rolls over if under). We pay via Stripe Connect (instant, free), PayPal (free, 24h), or international wire ($15 fee, 2–3 business days). You'll need to submit a W-9 (US) or W-8BEN (international) before your first payout.",
  },
  {
    q: "Is there a minimum audience size to apply?",
    a: "No. We approve partners based on fit, not follower count. If you have an engaged newsletter of 500 people, an active Discord, a niche YouTube channel, or you just talk to 50 founders per month in DMs — you're a great candidate. We reject applications from coupon/deal sites and MLM-style chains.",
  },
  {
    q: "What counts as 'lifetime recurring' commission?",
    a: "As long as the customer you referred keeps paying Shata, you keep earning. If they subscribe for 6 months, you earn for 6 months. If they subscribe for 4 years, you earn for 4 years. No expiration, no renewal gymnastics. The only way it stops is if they cancel or if you terminate your partner account.",
  },
  {
    q: "Can I promote Shata on paid ads (Google, Meta, TikTok)?",
    a: "Yes — with two rules. (1) No bidding on Shata's branded keywords or trademark variants in search ads. (2) No direct-to-checkout ads; you must send traffic to your own landing page, review, or content first. We'll share a paid-media playbook once you're approved. Most Diamond partners run paid funnels profitably at 3–5x ROAS.",
  },
  {
    q: "How fast is the application review?",
    a: "Most applications are reviewed within 24 hours, and 48 hours max on weekends. You'll hear from us by email with either an approval + dashboard link, a request for more info, or a decline with reasoning. We read every application — no auto-cyan-400ccept, no auto-reject.",
  },
];

export default function PartnerFAQ({ isDark }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-14">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Frequently asked
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Everything you're about to ask
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Still have questions? Email{" "}
            <a
              href="mailto:partners@shata.io"
              className={`font-semibold underline decoration-dotted underline-offset-4 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              partners@shata.io
            </a>{" "}
            — we reply within 12 hours.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isDark
                    ? isOpen
                      ? "border-blue-500/30 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/5"
                    : isOpen
                    ? "border-blue-300 bg-blue-50/40 shadow-lg"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    } ${
                      isDark
                        ? "border-white/15 text-white/70 bg-white/5"
                        : "border-slate-300 text-slate-600 bg-white"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-6 pb-6 text-sm sm:text-[15px] leading-relaxed ${
                        isDark ? "text-white/75" : "text-slate-600"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
