"use client";

interface Props {
  isDark: boolean;
}

const STORIES = [
  {
    name: "Maya Chen",
    handle: "@mayabuilds",
    role: "SaaS YouTube creator · 180K subs",
    avatar: "MC",
    earning: "$8,240",
    period: "/month",
    quote:
      "I was already recommending Shata in my 'Start an LLC as a non-US founder' videos. Joining the partner program turned that goodwill into a second income — I hit Elite tier in month two.",
    gradient: "from-blue-500 to-cyan-500",
    since: "Partner since Jan 2025",
    tier: "Elite",
  },
  {
    name: "Jonas Weber",
    handle: "@jonasweber",
    role: "Agency founder · Weber Growth",
    avatar: "JW",
    earning: "$14,120",
    period: "/month",
    quote:
      "We formed 40+ LLCs for our clients through Shata last quarter. The co-branded landing page and dedicated partner manager made it a no-brainer to consolidate all our company-formation referrals here.",
    gradient: "from-purple-500 to-pink-500",
    since: "Partner since Sep 2024",
    tier: "Diamond",
    featured: true,
  },
  {
    name: "Priya Nair",
    handle: "@priya.builds",
    role: "Indie hacker · 45K newsletter",
    avatar: "PN",
    earning: "$23,847",
    period: "/month",
    quote:
      "Shata is the only thing I promote that converts cold email subscribers into paying customers within 48 hours. Recurring commissions mean every subscriber compounds — this is my highest-ROI partnership.",
    gradient: "from-amber-400 to-orange-500",
    since: "Partner since Mar 2024",
    tier: "Diamond",
  },
];

export default function PartnerTestimonials({ isDark }: Props) {
  return (
    <section
      className={`relative py-24 ${
        isDark
          ? "bg-gradient-to-b from-transparent via-slate-900/30 to-transparent"
          : "bg-gradient-to-b from-transparent via-slate-50 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Real partner income
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Partners earning life-changing income
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Real numbers, real people. Every partner below opted in to share their story (and screenshots).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STORIES.map((s, i) => (
            <div
              key={s.name}
              className={`group relative rounded-2xl p-7 sm:p-8 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] ${
                s.featured ? "md:-translate-y-4 md:scale-[1.02]" : ""
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.12}s both`,
              }}
            >
              {/* gradient border for featured */}
              {s.featured && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.gradient} p-[2px] shadow-[0_0_40px_rgba(168,85,247,0.5)]`}
                >
                  <div
                    className={`h-full w-full rounded-[14px] ${
                      isDark ? "bg-slate-950" : "bg-white"
                    }`}
                  />
                </div>
              )}

              <div
                className={`relative h-full rounded-2xl p-7 sm:p-8 ${
                  s.featured
                    ? ""
                    : isDark
                    ? "border border-white/10 bg-white/5 backdrop-blur-xl"
                    : "border border-slate-200 bg-white shadow-sm text-slate-900"
                }`}
              >
                {/* earnings headline */}
                <div
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    isDark ? "text-white/50" : "text-white/60"
                  }`}
                >
                  Earning now
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <div
                    className={`text-4xl sm:text-5xl font-semibold tabular-nums bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent`}
                  >
                    {s.earning}
                  </div>
                  <div
                    className={`text-lg ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    {s.period}
                  </div>
                </div>

                {/* tier pill */}
                <div className="mt-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${s.gradient} px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-md`}
                  >
                    {s.tier} tier
                  </span>
                </div>

                <div
                  className={`my-6 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                />

                {/* quote */}
                <blockquote
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-white/80" : "text-slate-700"
                  }`}
                >
                  "{s.quote}"
                </blockquote>

                {/* attribution */}
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${s.gradient} shadow-lg`}
                  >
                    {s.avatar}
                  </div>
                  <div>
                    <div
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {s.name}
                    </div>
                    <div
                      className={`text-xs ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      {s.role}
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-4 text-[11px] ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  {s.since} · {s.handle}
                </div>
              </div>
              <div className={`absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-[90%] h-10 blur-2xl rounded-full opacity-70 group-hover:opacity-90 transition bg-gradient-to-r ${s.gradient}`} />
            </div>
          ))}
        </div>

        <div
          className={`mt-12 text-center text-sm ${
            isDark ? "text-white/50" : "text-slate-500"
          }`}
        >
          Individual results vary. Featured earnings reflect the top 10% of partners in their tier.
        </div>
      </div>
    </section>
  );
}
