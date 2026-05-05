"use client";

interface Props {
  isDark: boolean;
}

const STEPS = [
  {
    number: "01",
    icon: "✍️",
    title: "Apply in 2 minutes",
    desc: "Tell us about your audience, platforms, and promotional channels. We review every application within 24 hours to keep the program high-quality.",
    detail: "No minimum audience size required",
  },
  {
    number: "02",
    icon: "🔗",
    title: "Share your custom link",
    desc: "Get a personalized dashboard with referral links, tracking pixels, a full media kit, and pre-written copy tested across 10,000+ campaigns.",
    detail: "Links auto-track across devices",
  },
  {
    number: "03",
    icon: "💸",
    title: "Earn recurring payouts",
    desc: "Get paid every 1st of the month via Stripe, PayPal, or international wire. Commissions are lifetime — you earn as long as your referral stays.",
    detail: "Paid monthly, 35% max rate",
  },
];

export default function HowItWorks({ isDark }: Props) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            How it works
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Three steps to recurring income
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            No technical setup, no inventory, no customer support burden. We handle the product — you share the link.
          </p>
        </div>

        <div className="relative">
          {/* connector line */}
          <div
            className={`hidden md:block absolute top-24 left-[16.66%] right-[16.66%] h-px ${
              isDark
                ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
            }`}
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative"
                style={{
                  animation: `fadeUp 0.6s ease ${i * 0.15}s both`,
                }}
              >
                {/* numbered bubble */}
                <div className="relative flex justify-center mb-6">
                  <div
                    className={`relative h-16 w-16 rounded-2xl flex items-center justify-center text-2xl border-2 backdrop-blur-xl ${
                      isDark
                        ? "border-blue-500/30 bg-slate-900 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                        : "border-blue-200 bg-white shadow-xl"
                    }`}
                  >
                    {step.icon}
                    <div
                      className={`absolute -top-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDark
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : "bg-gradient-to-br from-blue-600 to-purple-700 text-white"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* card */}
                <div
                  className={`rounded-2xl border p-6 sm:p-8 text-center transition-all hover:-translate-y-1 ${
                    isDark
                      ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30"
                      : "border-slate-200 bg-white hover:shadow-xl hover:border-blue-300"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isDark ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    {step.desc}
                  </p>
                  <div
                    className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      isDark
                        ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                        : "border-blue-100 bg-blue-50 text-blue-700"
                    }`}
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
