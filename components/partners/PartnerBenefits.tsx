"use client";

import { BarChart3, Palette, UserCheck, Globe, Handshake, Gem } from "lucide-react";

interface Props {
  isDark: boolean;
}

const BENEFITS = [
  {
    icon: "📊",
    title: "Real-time tracking dashboard",
    desc: "Live clicks, signups, conversions, MRR, and payouts. Export to CSV. Filter by campaign and link.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🎨",
    title: "Full marketing kit",
    desc: "Banners, logos, demo videos, email templates, social copy, and case studies — all A/B tested.",
    accent: "from-purple-500 to-pink-500",
  },
  {
    icon: "🧑‍💼",
    title: "Dedicated partner manager",
    desc: "Elite+ partners get a direct Slack channel with a real human who replies within 2 business hours.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: "🌐",
    title: "Co-branded landing pages",
    desc: "We spin up a custom Shata × Your Brand page with your testimonials, audience messaging, and pricing.",
    accent: "from-orange-500 to-red-500",
  },
  {
    icon: "🤝",
    title: "Co-marketing & webinars",
    desc: "Joint webinars, podcast trades, YouTube collabs, and featured placement in our founder newsletter.",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    icon: "💎",
    title: "Equity-track partnerships",
    desc: "Top Diamond partners get invited to our revenue-share program with equity upside on agency-level deals.",
    accent: "from-amber-400 to-pink-500",
  },
];

export default function PartnerBenefits({ isDark }: Props) {

  const renderIcon = (title: string, accent: string) => {
    let Icon: any = BarChart3;
    if (title.includes("tracking")) Icon = BarChart3;
    else if (title.includes("marketing kit")) Icon = Palette;
    else if (title.includes("partner manager")) Icon = UserCheck;
    else if (title.includes("landing pages")) Icon = Globe;
    else if (title.includes("Co-marketing")) Icon = Handshake;
    else if (title.includes("Equity")) Icon = Gem;

    return (
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]`}>
        <Icon size={22} />
      </div>
    );
  };

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            What you actually get
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            More than just a commission link
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            We treat partners like cofounders. Everything below is included — no upsells, no paid tiers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1200px]">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={`group relative rounded-2xl border p-7 transition-all duration-300 transform-gpu shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:rotate-x-2 hover:rotate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)] ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  : "border-slate-200 bg-white hover:shadow-2xl hover:border-slate-300"
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
              }}
            >
              {/* accent bar */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-300 bg-gradient-to-br ${b.accent} blur-2xl -z-10`} />
              <div
                className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${b.accent} opacity-0 group-hover:opacity-100 transition-all duration-300`}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              {renderIcon(b.title, b.accent)}

              <h3
                className={`mt-5 text-lg font-semibold transition-colors group-hover:text-blue-500 group-hover:translate-y-[-2px] ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {b.title}
              </h3>

              <p
                className={`mt-3 text-sm leading-relaxed transition-opacity group-hover:opacity-90 group-hover:translate-y-[2px] ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                {b.desc}
              </p>
              <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/10 blur-xl rounded-full opacity-60 group-hover:opacity-80 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
