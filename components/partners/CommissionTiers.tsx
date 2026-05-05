"use client";

interface Props {
  isDark: boolean;
  scrollToApply: () => void;
}

type Tier = {
  name: string;
  commission: string;
  sales: string;
  description: string;
  perks: string[];
  featured?: boolean;
  badge?: string;
  accent: string;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    commission: "20%",
    sales: "5 – 25 sales / month",
    description: "Everyone starts here. Lifetime 20% recurring on every referral you send, from day one.",
    perks: [
      "20% lifetime recurring commission",
      "Real-time tracking dashboard",
      "Marketing kit & banners",
      "Monthly payouts (Stripe / PayPal)",
    ],
    accent: "from-slate-500 to-slate-600",
  },
  {
    name: "Pro",
    commission: "25%",
    sales: "25 – 50 sales / month",
    description: "Active partners who consistently bring in new founders. Higher payout, priority support.",
    perks: [
      "25% lifetime recurring commission",
      "Priority email support",
      "Custom coupon codes",
      "Quarterly performance review",
    ],
    accent: "from-blue-500 to-cyan-500",
  },
  {
    name: "Elite",
    commission: "30%",
    sales: "50 – 75 sales / month",
    description: "Professional affiliates and agencies. Dedicated success manager and co-marketing.",
    perks: [
      "30% lifetime recurring commission",
      "Dedicated partner manager",
      "Co-branded landing pages",
      "Early access to new products",
      "Featured in founder newsletter",
    ],
    featured: true,
    badge: "Most partners aim here",
    accent: "from-blue-600 via-purple-600 to-pink-600",
  },
  {
    name: "Diamond",
    commission: "35% + bonus",
    sales: "75 – 100 sales / month",
    description: "Top 1% of the program. White-glove service, revenue-share overrides, and annual retreat invitation.",
    perks: [
      "35% lifetime recurring commission",
      "$500 quarterly performance bonus",
      "Annual partner retreat invitation",
      "Equity-track partnership available",
      "Direct line to Shata leadership",
    ],
    accent: "from-amber-400 via-orange-500 to-pink-500",
  },
];

export default function CommissionTiers({ isDark, scrollToApply }: Props) {
  return (
    <section
      className={`relative py-24 border-y ${
        isDark
          ? "border-white/5 bg-slate-900/30"
          : "border-slate-100 bg-slate-50/50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Commission tiers
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            The more you refer, the more you earn
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Tiers are automatic — we calculate your rate every 1st of the month based on the previous 90 days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl ${
                tier.featured ? "lg:-translate-y-4 lg:scale-[1.02]" : ""
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}
            >
              {/* gradient border for featured */}
              {tier.featured && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tier.accent} p-[2px]`}
                >
                  <div
                    className={`h-full w-full rounded-[14px] ${
                      isDark ? "bg-slate-950" : "bg-white"
                    }`}
                  />
                </div>
              )}

              <div
                className={`relative h-full rounded-2xl p-7 ${
                  tier.featured
                    ? ""
                    : isDark
                    ? "border border-white/10 bg-white/5"
                    : "border border-slate-200 bg-white"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div
                      className={`rounded-full bg-gradient-to-r ${tier.accent} px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-lg`}
                    >
                      ⭐ {tier.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r ${tier.accent} bg-clip-text text-transparent`}
                >
                  {tier.name}
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <div
                    className={`text-5xl font-semibold tabular-nums ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {tier.commission}
                  </div>
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  recurring · {tier.sales}
                </div>

                <p
                  className={`mt-5 text-sm leading-relaxed ${
                    isDark ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  {tier.description}
                </p>

                <div
                  className={`my-6 h-px ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                />

                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={isDark ? "text-white/80" : "text-slate-700"}
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={scrollToApply}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-white font-semibold shadow-[0_10px_40px_rgba(99,102,241,0.45)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.65)] hover:scale-105 active:scale-95 transition-all"
          >
            Start at Starter — apply now →
          </button>
        </div>
      </div>
    </section>
  );
}
