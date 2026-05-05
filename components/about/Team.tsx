"use client";

interface Props {
  isDark: boolean;
}

const TEAM = [
  {
    name: "Dr. M. Shata",
    role: "Founder & CEO",
    bio: "Medical doctor turned entrepreneur. Building the infrastructure he wished existed when he started his own company.",
    location: "San Diego, CA",
    gradient: "from-blue-500 via-blue-600 to-purple-600",
    initials: "MS",
  },
  {
    name: "Filings Team",
    role: "Registered Agents",
    bio: "A licensed team with 10+ years of combined Delaware and Wyoming filings experience, based in both states.",
    location: "Wyoming / Delaware",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    initials: "FT",
  },
  {
    name: "Platform Engineering",
    role: "AI & Product",
    bio: "Ex-fintech and ex-SaaS engineers obsessed with making hard, paperwork-heavy things feel invisible.",
    location: "Remote · Global",
    gradient: "from-orange-500 via-rose-500 to-red-600",
    initials: "PE",
  },
  {
    name: "Founder Success",
    role: "24/7 Customer Support",
    bio: "Multilingual specialists spanning three continents so someone is always awake and responding within minutes.",
    location: "Cairo · San Diego",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-600",
    initials: "FS",
  },
];

export default function Team({ isDark }: Props) {
  return (
    <section
      className={`relative py-24 border-y ${
        isDark
          ? "bg-slate-900/30 border-white/5"
          : "bg-slate-50/70 border-slate-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className={`text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            The people
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Small team, global reach
          </h2>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            Operators, engineers, and compliance specialists spanning Wyoming, San Diego, and Cairo — working around the clock so you don&apos;t have to.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TEAM.map((person, i) => (
            <div
              key={person.name}
              className={`group relative rounded-2xl border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/40"
                  : "border-slate-200 bg-white hover:border-blue-400"
              }`}
              style={{
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}
            >
              <div
                className={`mx-auto h-24 w-24 rounded-full bg-gradient-to-br ${person.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ${
                  isDark ? "ring-slate-900/50" : "ring-white"
                }`}
              >
                {person.initials}
              </div>

              <h3
                className={`mt-5 text-lg font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {person.name}
              </h3>
              <div
                className={`text-sm font-semibold ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {person.role}
              </div>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                {person.bio}
              </p>

              <div
                className={`mt-4 pt-4 border-t text-xs font-semibold tracking-wide ${
                  isDark
                    ? "border-white/10 text-white/50"
                    : "border-slate-100 text-slate-500"
                }`}
              >
                📍 {person.location}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div
            className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-slate-200 bg-white"
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span
              className={`text-sm ${
                isDark ? "text-white/80" : "text-slate-700"
              }`}
            >
              We&apos;re hiring senior engineers and compliance leads.
            </span>
            <a
              href="mailto:careers@shata.solutions"
              className={`text-sm font-semibold ${
                isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              View open roles →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
