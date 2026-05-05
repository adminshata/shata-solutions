"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const features = [
  {
    icon: "🔐",
    title: "Security architecture",
    desc: "Face ID, encrypted sessions, permission layers, and secure API patterns designed for sensitive workflows.",
  },
  {
    icon: "⚡",
    title: "Native-speed experience",
    desc: "Fluid interactions, optimistic states, fast screens, and polished motion designed for daily use.",
  },
  {
    icon: "🔗",
    title: "Connected operating system",
    desc: "Payments, CRM, notifications, admin dashboards, analytics, and AI workflows connected into one product.",
  },
  {
    icon: "📊",
    title: "Decision-ready analytics",
    desc: "Beautiful dashboards that turn usage, revenue, activity, and customer signals into clear next steps.",
  },
];

const designSystem = [
  "SF Pro-style typography with tight tracking and generous line height",
  "Deep obsidian neutrals, pure white surfaces, and Stripe Indigo accents",
  "80px+ section spacing for premium breathing room",
  "Frosted glass cards, soft global illumination, and gradient mesh depth",
];

const showcaseScreens = [
  {
    label: "Command center",
    title: "Dashboard",
    metric: "$128.4K",
    hint: "Live revenue view",
  },
  {
    label: "Secure access",
    title: "Identity",
    metric: "98%",
    hint: "Security score",
  },
  {
    label: "Growth signals",
    title: "Analytics",
    metric: "+24%",
    hint: "Month-over-month",
  },
];

const process = [
  {
    step: "01",
    title: "Product strategy",
    desc: "We define the user journey, core screens, monetization flow, data model, and launch roadmap before design starts.",
  },
  {
    step: "02",
    title: "High-fidelity UI system",
    desc: "We create a polished interface system with reusable components, motion states, empty states, and mobile-first layouts.",
  },
  {
    step: "03",
    title: "Build, integrate, launch",
    desc: "We connect backend, payments, analytics, notifications, and admin tools so the app is ready for real customers.",
  },
];

export default function MobileAppDevelopmentPage() {
  const { isDark, toggleTheme } = useTheme();

  const techLayers = [
    { label: "Frontend", value: "React Native / Expo", detail: "Fast iteration, native feel, shared codebase" },
    { label: "Backend", value: "Supabase / Node", detail: "Auth, database, APIs, admin workflows" },
    { label: "Payments", value: "Stripe-ready", detail: "Subscriptions, invoices, checkout, Apple Pay" },
    { label: "Automation", value: "AI + workflows", detail: "Alerts, CRM sync, lifecycle events" },
  ];

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        isDark ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-[#0b1020] to-indigo-950/40"
              : "bg-gradient-to-br from-white via-indigo-50/50 to-blue-50/40"
          }`}
        />
        <div className="absolute top-16 -left-24 h-[520px] w-[520px] rounded-full bg-[#635bff]/25 blur-[130px] animate-pulse" />
        <div
          className="absolute top-48 -right-24 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[130px] animate-pulse"
          style={{ animationDelay: "1.4s" }}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.05]" : "opacity-[0.06]"}`}
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div
        className={`relative min-h-screen transition-colors duration-300 ${
          isDark ? "text-white" : "text-slate-950"
        }`}
      >
        <GlobalStyles />
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          openOnboarding={() => {}}
          openDashboard={() => {}}
        />

        <main className="relative z-10 pt-32 pb-24 [transform-style:preserve-3d]">
          {/* HERO */}
          <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] [transform-style:preserve-3d]">
            <div className="text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/80"
                    : "border-slate-200 bg-white/70 text-slate-700"
                }`}
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#635bff] animate-pulse" />
                Mobile App Development
                <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
                High-trust SaaS & FinTech UI
              </div>

              <h1
                className={`mt-8 text-5xl sm:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.04em] ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                Mobile apps that feel
                <span className="block bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  premium, secure, and fast.
                </span>
              </h1>

              <p
                className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                  isDark ? "text-white/70" : "text-slate-600"
                } mx-auto lg:mx-0`}
              >
                We design and build premium iOS and Android products for founders who need trust, speed, payments, dashboards, and a launch-ready system — not just screens.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/contact?type=mobile-app-development"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#635bff] to-blue-600 px-8 py-3.5 text-white font-semibold shadow-[0_20px_60px_rgba(99,91,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="relative z-10">Start your app build →</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <a
                  href="#design-system"
                  className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                    isDark
                      ? "border-white/15 text-white hover:bg-white/10"
                      : "border-slate-300 text-slate-700 hover:bg-white"
                  }`}
                >
                  View design system
                </a>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                <TrustChip isDark={isDark} label="256-bit encryption ready" />
                <TrustChip isDark={isDark} label="Apple Pay flows" />
                <TrustChip isDark={isDark} label="Secure API design" />
              </div>
            </div>
            <DeviceShowcase isDark={isDark} />
          </section>
          {/* PRODUCT SHOWCASE */}
          <section className="mx-auto mt-28 max-w-7xl px-6">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div
                className={`relative overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#635bff]/20 blur-[90px]" />
                <div className="relative">
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
                    Product experience
                  </div>
                  <h2 className={`mt-4 max-w-2xl text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    Every screen is designed to feel calm, fast, and trustworthy.
                  </h2>
                  <p className={`mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                    We design the full app experience: onboarding, authentication, dashboards, payments, settings, notifications, and admin flows — with the same level of polish across every state.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {showcaseScreens.map((screen) => (
                      <ScreenPreview key={screen.title} isDark={isDark} {...screen} />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`relative overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-[80px]" />
                <div className="relative">
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-cyan-300" : "text-cyan-600"}`}>
                    Trust layer
                  </div>
                  <h3 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    Built for serious products.
                  </h3>
                  <div className="mt-6 space-y-3">
                    <Requirement isDark={isDark} label="Authentication and secure user sessions" />
                    <Requirement isDark={isDark} label="Stripe-ready subscription and checkout flows" />
                    <Requirement isDark={isDark} label="Admin dashboard and operational workflows" />
                    <Requirement isDark={isDark} label="Analytics events and product usage tracking" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* TECH STACK */}
          <section className="mx-auto mt-24 max-w-7xl px-6">
            <div
              className={`relative overflow-hidden rounded-[2.5rem] border p-8 md:p-10 backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white/80 shadow-[0_40px_120px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#635bff]/20 blur-[110px]" />
              <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
                    Technical architecture
                  </div>
                  <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    A launch-ready stack behind the beautiful interface.
                  </h2>
                  <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                    We design the product layer, data layer, payment layer, and automation layer together — so the app feels premium while staying practical to ship and operate.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {techLayers.map((layer, index) => (
                    <TechLayerCard key={layer.label} isDark={isDark} index={index} {...layer} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="mx-auto mt-24 max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div
                className={`rounded-[2rem] border p-8 backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
                  Build process
                </div>
                <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  From idea to launch-ready app.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  We work like a product team: strategy first, then design system, then build, integrate, test, and launch.
                </p>
              </div>

              <div className="space-y-4">
                {process.map((item) => (
                  <ProcessCard key={item.step} isDark={isDark} {...item} />
                ))}
              </div>
            </div>
          </section>

          {/* DESIGN SYSTEM */}
          <section id="design-system" className="mx-auto mt-24 max-w-6xl px-6">
            <div
              className={`rounded-[2rem] border p-8 backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
                    Design system
                  </div>
                  <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    Clean like Apple. Dynamic like Stripe. Built for trust.
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {designSystem.map((item) => (
                    <Requirement key={item} isDark={isDark} label={item} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* BENTO FEATURE GRID */}
          <section className="mx-auto mt-24 max-w-7xl px-6">
            <div className="text-center">
              <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
                Bento feature grid
              </div>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Four pillars of a trusted mobile product.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <BentoCard key={feature.title} isDark={isDark} index={index} {...feature} />
              ))}
            </div>
          </section>

          {/* TRUST BAR */}
          <section className="mx-auto mt-24 max-w-6xl px-6">
            <div
              className={`rounded-3xl border px-6 py-5 backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80 shadow-sm"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-6 text-sm">
                <div className={isDark ? "text-white/50" : "text-slate-500"}>Secured by</div>
                <div className="flex flex-wrap items-center gap-3 font-semibold">
                  <Badge isDark={isDark}>SOC 2-ready controls</Badge>
                  <Badge isDark={isDark}>256-bit encryption</Badge>
                  <Badge isDark={isDark}>PCI-aware flows</Badge>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-amber-400">★★★★★</span>
                  <span className={isDark ? "text-white/70" : "text-slate-700"}>5.0 client rating</span>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
            <div
              className={`rounded-[2rem] border p-10 backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>
                Subscription-ready checkout
              </div>
              <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Launch with a Stripe-style payment experience.
              </h2>
              <div
                className={`mx-auto mt-8 max-w-sm rounded-3xl border p-6 text-left ${
                  isDark ? "border-white/10 bg-slate-950/60" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Premium App Build</div>
                    <div className={isDark ? "text-white/50 text-sm" : "text-slate-500 text-sm"}>Product strategy + UI + build plan</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold">Custom</div>
                    <div className={isDark ? "text-white/40 text-xs" : "text-slate-400 text-xs"}>proposal</div>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-full bg-black px-5 py-3 font-semibold text-white transition hover:scale-[1.02]">
                   Pay with Apple Pay
                </button>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter isDark={isDark} />
      </div>
    </div>
  );
}

function DeviceShowcase({ isDark }: { isDark: boolean }) {
  return (
    <div className="group relative mx-auto h-[680px] w-full max-w-[560px] perspective-[1600px]">
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/25 blur-[120px] transition duration-700 group-hover:scale-110" />
      <div className="absolute left-8 top-20 h-64 w-64 rounded-full bg-cyan-400/15 blur-[90px]" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />

      <div className="absolute left-3 top-28 h-[520px] w-[260px] rotate-[-12deg] skew-y-[5deg] rounded-[3rem] border-[10px] border-slate-950 bg-slate-950 shadow-[0_50px_150px_rgba(15,23,42,0.48)] transition duration-700 group-hover:translate-y-[-10px] group-hover:rotate-[-15deg]">
        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full overflow-hidden rounded-[2.35rem] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 text-white">
          <div className="mt-10 flex items-center justify-between">
            <div>
              <div className="text-xs text-white/40">Balance</div>
              <div className="text-2xl font-semibold">$128,420</div>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-xl">Live</div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>AI allocation</span>
              <span>Optimized</span>
            </div>
            <div className="mt-4 h-28 rounded-2xl bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400 opacity-90 shadow-[0_20px_60px_rgba(99,91,255,0.35)]" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniStat label="Risk" value="Low" />
            <MiniStat label="Return" value="+18%" />
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm">
              <span>Security score</span>
              <span className="text-cyan-300">98%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[98%] rounded-full bg-cyan-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-6 h-[575px] w-[290px] rotate-[8deg] skew-y-[-4deg] rounded-[3.35rem] border-[10px] border-slate-950 bg-slate-950 shadow-[0_60px_180px_rgba(15,23,42,0.52)] transition duration-700 group-hover:translate-y-[-18px] group-hover:rotate-[11deg]">
        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-5 text-slate-950">
          <div className="mt-10 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Today</div>
              <div className="text-2xl font-semibold">Command Center</div>
            </div>
            <div className="rounded-full bg-white/70 px-3 py-1 text-xs shadow-sm backdrop-blur-xl">Pro</div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-xl backdrop-blur-xl">
            <div className="text-xs font-medium text-slate-500">Revenue</div>
            <div className="mt-2 text-3xl font-semibold">$42.8K</div>
            <div className="mt-4 flex h-24 items-end gap-2">
              {[40, 70, 55, 88, 62, 96, 78].map((h, i) => (
                <div key={i} className="flex-1 rounded-full bg-gradient-to-t from-[#635bff] to-cyan-400 transition-all duration-500 group-hover:opacity-90" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <LightStat label="Users" value="12.4K" />
            <LightStat label="MRR" value="+31%" />
          </div>

          <div className="mt-4 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-xl backdrop-blur-xl">
            <div className="text-sm font-semibold">Next action</div>
            <div className="mt-2 text-xs leading-5 text-slate-500">Send renewal reminder to high-intent accounts.</div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-24 left-0 rounded-2xl border p-4 backdrop-blur-2xl transition duration-700 group-hover:translate-x-[-8px] group-hover:translate-y-[-6px] ${isDark ? "border-white/10 bg-white/10 text-white" : "border-white/70 bg-white/70 text-slate-900 shadow-xl"}`}>
        <div className="text-xs opacity-60">Conversion</div>
        <div className="mt-1 text-2xl font-semibold">+37%</div>
      </div>

      <div className={`absolute right-2 bottom-10 rounded-2xl border p-4 backdrop-blur-2xl transition duration-700 group-hover:translate-x-[10px] group-hover:translate-y-[-10px] ${isDark ? "border-white/10 bg-white/10 text-white" : "border-white/70 bg-white/70 text-slate-900 shadow-xl"}`}>
        <div className="text-xs opacity-60">Latency</div>
        <div className="mt-1 text-2xl font-semibold">42ms</div>
      </div>
    </div>
  );
}

function TechLayerCard({ isDark, index, label, value, detail }: { isDark: boolean; index: number; label: string; value: string; detail: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:scale-[1.03] ${isDark ? "border-white/10 bg-slate-950/50" : "border-slate-200 bg-white"}`}>
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#635bff]/20 blur-2xl transition group-hover:scale-125" />
      <div className="relative">
        <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/35" : "text-slate-400"}`}>Layer 0{index + 1}</div>
        <div className={`mt-3 text-sm font-semibold ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>{label}</div>
        <div className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{value}</div>
        <p className={`mt-2 text-xs leading-5 ${isDark ? "text-white/50" : "text-slate-500"}`}>{detail}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
      <div className="text-[10px] text-white/40">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function LightStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/75 p-3 shadow-sm backdrop-blur-xl">
      <div className="text-[10px] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function ScreenPreview({ isDark, label, title, metric, hint }: { isDark: boolean; label: string; title: string; metric: string; hint: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border p-4 ${isDark ? "border-white/10 bg-slate-950/50" : "border-slate-200 bg-white"}`}>
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#635bff]/20 blur-2xl" />
      <div className="relative">
        <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-500"}>{label}</div>
        <div className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
        <div className="mt-6 text-3xl font-semibold bg-gradient-to-br from-[#635bff] to-cyan-400 bg-clip-text text-transparent">{metric}</div>
        <div className={isDark ? "mt-1 text-xs text-white/40" : "mt-1 text-xs text-slate-500"}>{hint}</div>
      </div>
    </div>
  );
}

function ProcessCard({ isDark, step, title, desc }: { isDark: boolean; step: string; title: string; desc: string }) {
  return (
    <div className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] ${isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white/80 hover:shadow-xl"}`}>
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#635bff] to-blue-500 text-sm font-bold text-white shadow-lg">
          {step}
        </div>
        <div>
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function TrustChip({ isDark, label }: { isDark: boolean; label: string }) {
  return (
    <div className={`rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-xl ${isDark ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-700"}`}>
      {label}
    </div>
  );
}

function BentoCard({ isDark, icon, title, desc, index }: { isDark: boolean; icon: string; title: string; desc: string; index: number }) {
  return (
    <div className={`group relative min-h-[260px] overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/80"}`}>
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-[#635bff]/10 to-cyan-400/10 blur-xl" />
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-blue-500 text-3xl shadow-lg">
          {icon}
        </div>
        <div className={`mt-8 text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-white/35" : "text-slate-400"}`}>Feature 0{index + 1}</div>
        <h3 className={`mt-3 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
      </div>
    </div>
  );
}

function Badge({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-full border px-3 py-1 text-xs ${isDark ? "border-white/10 bg-white/5 text-white/70" : "border-slate-200 bg-white text-slate-600"}`}>
      {children}
    </div>
  );
}

function Requirement({ isDark, label }: { isDark: boolean; label: string }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${isDark ? "border-white/10 bg-white/5 text-white/80" : "border-slate-200 bg-white text-slate-700"}`}>
      <span className={isDark ? "text-indigo-300" : "text-[#635bff]"}>✓</span> {label}
    </div>
  );
}