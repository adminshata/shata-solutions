"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const foundationCards = [
  {
    title: "Business Structure",
    description: "Define the right operating model, service lines, departments, ownership logic, and launch roadmap before building systems.",
    stat: "01",
  },
  {
    title: "Operational Blueprint",
    description: "Turn the idea into repeatable workflows for sales, onboarding, delivery, billing, support, and reporting.",
    stat: "02",
  },
  {
    title: "Tools & Systems Setup",
    description: "Select and configure the tools your team needs: CRM, email, payments, documents, automation, analytics, and communication.",
    stat: "03",
  },
  {
    title: "Launch-Ready Assets",
    description: "Prepare the assets that make the business usable on day one: email, forms, service pages, intake flows, and client handover logic.",
    stat: "04",
  },
  {
    title: "Automation Recommendations",
    description: "Identify which workflows should be automated first so the business saves time without becoming complex too early.",
    stat: "05",
  },
  {
    title: "Growth Foundation",
    description: "Build the foundation for future expansion into marketing, sales systems, dashboards, operations, and AI-enabled workflows.",
    stat: "06",
  },
];

const setupStack = [
  ["Identity", "Domain, business email, brand basics, public trust signals"],
  ["Operations", "Client intake, task flow, delivery process, documentation"],
  ["Revenue", "Offers, pricing logic, CRM, payment links, lead routing"],
  ["Automation", "Follow-ups, notifications, reporting, form-to-workflow systems"],
  ["Analytics", "Basic KPIs, pipeline visibility, service performance tracking"],
  ["Governance", "Access rules, ownership, handover docs, admin controls"],
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Business Map",
    copy: "We understand your offer, customers, workflow, tools, constraints, and target launch timeline.",
  },
  {
    number: "02",
    title: "Operating System Design",
    copy: "We design the structure: services, client journey, team roles, tool stack, and core automations.",
  },
  {
    number: "03",
    title: "Setup & Integration",
    copy: "We configure the key systems — email, CRM, forms, payments, documentation, automations, and dashboards.",
  },
  {
    number: "04",
    title: "Launch & Handover",
    copy: "We test the workflow, document the system, and hand over a launch-ready business foundation.",
  },
];

const useCases = [
  {
    title: "New Founder",
    description: "You have the idea and need a clean structure, tools, email, intake flow, and launch plan before going live.",
    points: ["Business model clarity", "Launch checklist", "Tool selection"],
  },
  {
    title: "Service Business",
    description: "You need a professional system for leads, bookings, client communication, delivery, invoices, and follow-up.",
    points: ["Client intake", "Workflow setup", "Delivery system"],
  },
  {
    title: "Scaling Team",
    description: "You already operate but need cleaner ownership, automation, dashboards, and team-ready processes.",
    points: ["Team roles", "Automation priority", "KPI visibility"],
  },
];

const tiers = [
  {
    name: "Setup Starter",
    label: "Foundation",
    description: "For solo founders and small businesses that need the basics built correctly.",
    items: ["Business structure map", "Email and domain guidance", "Basic tool stack", "Launch checklist", "Handover notes"],
  },
  {
    name: "Business Operating System",
    label: "Most requested",
    description: "For companies that need a complete operational foundation with workflows and integrations.",
    items: ["Workflow architecture", "CRM and intake setup", "Payment and form routing", "Automation recommendations", "Dashboard-ready structure"],
    featured: true,
  },
  {
    name: "Scale Architecture",
    label: "Advanced",
    description: "For growing teams that need governance, automation, reporting, and scalable operations.",
    items: ["Team roles and permissions", "Advanced automation plan", "KPI dashboard logic", "SOP documentation", "Growth roadmap"],
  },
];

const faq = [
  {
    q: "Do I need to already have a business registered?",
    a: "No. We can help you structure the operational side before or after registration. If you also need formation, EIN, domain, or email setup, we can connect those services into one launch plan.",
  },
  {
    q: "Can you choose the tools for my business?",
    a: "Yes. We recommend tools based on your budget, business model, team size, and growth stage. The goal is to avoid overbuilding while making sure the system can scale.",
  },
  {
    q: "Can this include automation?",
    a: "Yes. We identify the highest-impact automations first, such as lead routing, client onboarding, invoice reminders, email notifications, reporting, and form-to-task workflows.",
  },
  {
    q: "Will I own the systems after setup?",
    a: "Yes. The accounts, tools, documentation, and workflows belong to your business. We build the foundation and provide a clear handover so you can operate independently.",
  },
];

export default function BusinessSetup() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#070b12] text-white" : "bg-[#f7fbff] text-slate-950"}`}>
      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative min-h-screen overflow-hidden pt-32">
        <div
          className={`pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:80px_80px] ${isDark ? "opacity-20" : "opacity-60"}`}
        />
        <div className="pointer-events-none fixed left-[-15%] top-[-20%] h-[560px] w-[560px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none fixed right-[-15%] top-[15%] h-[560px] w-[560px] rounded-full bg-cyan-400/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          {/* HERO */}
          <section className="grid items-center gap-12 [perspective:1600px] lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-xl ${isDark ? "border-white/10 bg-white/5 text-white/75" : "border-slate-200 bg-white/85 text-slate-700"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Business Setup Infrastructure
              </div>

              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl ${isDark ? "text-white" : "text-slate-950"}`}>
                Build the operating system your business needs before it scales.
              </h1>

              <p className={`mt-6 max-w-2xl text-base leading-8 ${isDark ? "text-white/62" : "text-slate-600"}`}>
                We turn your business idea into a launch-ready operating foundation — structure, tools, workflows, email, CRM, payments, automation, documentation, and a clear path to growth.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?type=business-setup"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
                >
                  Start Your Business Setup →
                </Link>
                <Link
                  href="#process"
                  className={`inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold shadow-sm transition ${isDark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white/85 text-slate-800 hover:bg-white"}`}
                >
                  View setup process
                </Link>
              </div>

              <div className={`mt-8 flex flex-wrap gap-3 text-xs font-semibold ${isDark ? "text-white/45" : "text-slate-500"}`}>
                <span>Operations-ready</span>
                <span>•</span>
                <span>CRM setup</span>
                <span>•</span>
                <span>Automation roadmap</span>
                <span>•</span>
                <span>Launch handover</span>
              </div>
            </div>

            <BusinessSetupMockup isDark={isDark} />
          </section>

          {/* WHY */}
          <section className="mt-28 grid gap-5 lg:grid-cols-3">
            <SectionIntro
              isDark={isDark}
              eyebrow="The cost of messy setup"
              title="Most businesses do not fail from lack of ideas. They fail from weak systems."
              copy="When leads, files, payments, emails, tasks, and customer updates live in disconnected places, growth becomes slower and more expensive."
            />
            <MetricCard isDark={isDark} label="Launch clarity" value="Higher" copy="A clear structure makes your offer, workflow, tools, and customer journey easier to execute." />
            <MetricCard isDark={isDark} label="Operational friction" value="Lower" copy="A connected setup reduces confusion, duplicate work, missed follow-ups, and manual admin." />
          </section>

          {/* WHAT YOU GET */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="What you get"
              title="A complete business foundation your team can actually operate."
              copy="We build the essentials as one connected system — not separate tools that nobody knows how to use."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {foundationCards.map((card) => (
                <FeatureCard key={card.title} isDark={isDark} {...card} />
              ))}
            </div>
          </section>

          {/* STACK */}
          <section className={`mt-28 rounded-[2rem] border p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10 ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_28px_90px_rgba(0,0,0,0.35)]" : "border-white bg-white/80"}`}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <Eyebrow isDark={isDark}>Business operating stack</Eyebrow>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  One connected foundation across identity, revenue, operations, and automation.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  We help you avoid random tools and build a practical stack that supports your current business while leaving room for automation, growth, and future team members.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {setupStack.map(([title, desc]) => (
                  <StackCard key={title} isDark={isDark} title={title} desc={desc} />
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section id="process" className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="Setup process"
              title="From business idea to launch-ready system in four controlled steps."
              copy="We map, design, configure, test, and document the foundation so your business can start operating with confidence."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {processSteps.map((step) => (
                <ProcessStep key={step.number} isDark={isDark} {...step} />
              ))}
            </div>
          </section>

          {/* USE CASES */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="Use cases"
              title="Built for founders, service businesses, and scaling teams."
              copy="Different businesses need different foundations. We scope the setup around your stage, offer, team, and launch pressure."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {useCases.map((item) => (
                <UseCaseCard key={item.title} isDark={isDark} {...item} />
              ))}
            </div>
          </section>

          {/* TIERS */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="Engagement tiers"
              title="Choose the setup depth your business needs."
              copy="No unnecessary complexity. Each tier is scoped around how much structure, integration, automation, and documentation your business needs right now."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {tiers.map((tier) => (
                <TierCard key={tier.name} isDark={isDark} {...tier} />
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-28 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Eyebrow isDark={isDark}>Setup FAQ</Eyebrow>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Clear answers before we build your foundation.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We keep the process simple, document every major decision, and build the setup around tools your business can actually manage.
              </p>
            </div>
            <div className="grid gap-4">
              {faq.map((item) => (
                <FAQCard key={item.q} isDark={isDark} {...item} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className={`mt-28 overflow-hidden rounded-[2.5rem] border p-8 text-center shadow-[0_30px_110px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-12 ${isDark ? "border-white/10 bg-white/[0.055] shadow-[0_30px_110px_rgba(0,0,0,0.40)]" : "border-white bg-white/85"}`}>
            <div className="mx-auto max-w-3xl">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Launch-ready foundation
              </div>
              <h2 className={`text-4xl font-semibold tracking-tight md:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
                Start with a business system that can grow with you.
              </h2>
              <p className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Build the structure, tools, workflows, and documentation your business needs before marketing, sales, and operations become harder to control.
              </p>
              <Link
                href="/contact?type=business-setup"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
              >
                Request a Business Setup Proposal →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function BusinessSetupMockup({ isDark }: { isDark: boolean }) {
  const systems = [
    ["CRM", "Lead pipeline", "86%"],
    ["Email", "Verified domain", "94%"],
    ["Payments", "Checkout ready", "91%"],
  ];

  const workflow = [
    ["Lead intake", "Website form → CRM"],
    ["Client onboarding", "Docs + welcome email"],
    ["Invoice flow", "Stripe-ready handoff"],
    ["Delivery tracker", "Tasks + status updates"],
  ];

  return (
    <div className="group relative mx-auto h-[620px] w-full max-w-[620px] [perspective:1800px]">
      <div className="absolute inset-4 rounded-full bg-[#635bff]/20 blur-[110px]" />
      <div className="absolute right-4 top-24 h-28 w-28 rounded-[2rem] bg-gradient-to-br from-cyan-300/45 to-blue-600/25 blur-[1px] transition duration-700 group-hover:-translate-y-6 group-hover:translate-x-4" />
      <div className="absolute bottom-28 left-2 h-24 w-24 rounded-[2rem] bg-gradient-to-br from-[#635bff]/35 to-cyan-400/20 blur-[1px] transition duration-700 group-hover:translate-y-4 group-hover:-translate-x-4" />

      <div
        className={`absolute inset-x-4 top-4 rotate-[1.6deg] overflow-hidden rounded-[2.75rem] border p-5 shadow-[0_55px_160px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition duration-700 will-change-transform group-hover:-translate-y-4 group-hover:rotate-[0.4deg] group-hover:[transform:rotateX(6deg)_rotateY(-8deg)] ${
          isDark
            ? "border-white/10 bg-white/[0.08] text-white shadow-[0_65px_180px_rgba(0,0,0,0.58)]"
            : "border-white bg-white/92 text-slate-950"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.16),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(0,210,255,0.18),transparent_30%)]" />
        <div className={`relative rounded-[2.2rem] border p-4 ${isDark ? "border-white/10 bg-black/20" : "border-slate-200/70 bg-white/75"}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className={isDark ? "text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35" : "text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400"}>
                Business OS
              </div>
              <div className={`mt-2 text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Launch Command Center
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
              Ready
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,0.35)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_35px_100px_rgba(99,91,255,0.32)]">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -bottom-12 left-4 h-32 w-32 rounded-full bg-[#635bff]/20 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-white/45">Operational readiness</div>
                  <div className="mt-1 text-5xl font-semibold tracking-tight">92%</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 px-4 py-3 text-xs font-bold shadow-[0_18px_45px_rgba(0,210,255,0.22)]">
                  Live Map
                </div>
              </div>

              <div className="relative mt-6 grid gap-3">
                {systems.map(([title, desc, percent]) => (
                  <div key={title} className="group/system rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.085]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs text-white/40">{desc}</div>
                        <div className="mt-1 text-base font-semibold">{title}</div>
                      </div>
                      <div className="text-xs font-semibold text-cyan-300">{percent}</div>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 w-[86%] rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 transition-all duration-500 group-hover/system:w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-[1.75rem] border p-4 ${isDark ? "border-white/10 bg-white/[0.045]" : "border-slate-200 bg-white/80"}`}>
              <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.22em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"}>
                Launch workflow
              </div>

              <div className="mt-4 space-y-3">
                {workflow.map(([title, desc], index) => (
                  <div
                    key={title}
                    className={`group/flow relative rounded-2xl border p-3 transition duration-300 hover:-translate-y-1 ${
                      isDark
                        ? "border-white/10 bg-black/20 text-white/75 hover:bg-white/[0.06]"
                        : "border-slate-200 bg-white/85 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-white/15 text-[11px] font-bold text-white shadow-lg backdrop-blur-xl transition duration-300 group-hover/flow:rotate-6 group-hover/flow:scale-110">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400" />
                        <span className="relative">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
                        <div className={isDark ? "mt-0.5 text-[11px] text-white/42" : "mt-0.5 text-[11px] text-slate-500"}>{desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Launch assets", "12 ready"],
              ["Admin docs", "Synced"],
              ["Automation", "4 flows"],
            ].map(([label, value]) => (
              <div
                key={label}
                className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                  isDark
                    ? "border-white/10 bg-black/20 text-white/70"
                    : "border-slate-200 bg-white/85 text-slate-700"
                }`}
              >
                <div className={isDark ? "text-[10px] uppercase tracking-[0.2em] text-white/35" : "text-[10px] uppercase tracking-[0.2em] text-slate-400"}>{label}</div>
                <div className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children, isDark }: { children: React.ReactNode; isDark?: boolean }) {
  return <div className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "text-cyan-300" : "text-[#635bff]"}`}>{children}</div>;
}

function SectionIntro({ isDark, eyebrow, title, copy }: { isDark: boolean; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="lg:col-span-1">
      <Eyebrow isDark={isDark}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>
    </div>
  );
}

function CenteredIntro({ isDark, eyebrow, title, copy }: { isDark: boolean; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow isDark={isDark}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-4xl font-semibold tracking-tight md:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      <p className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>
    </div>
  );
}

function MetricCard({ isDark, label, value, copy }: { isDark: boolean; label: string; value: string; copy: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.14)]" : "border-white bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.16)]"}`}>
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl transition duration-500 group-hover:scale-125" />
      <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.24em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"}>{label}</div>
      <div className={`mt-4 text-4xl font-semibold ${isDark ? "text-cyan-300" : "text-[#635bff]"}`}>{value}</div>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>
    </div>
  );
}

function FeatureCard({ isDark, title, description, stat }: { isDark: boolean; title: string; description: string; stat: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.15)]"}`}>
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl transition group-hover:scale-125" />
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/30 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_50px_rgba(99,91,255,0.22)] backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:scale-110">
        <div className="absolute inset-0 bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400" />
        <div className="absolute inset-[1px] rounded-[1.18rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.42),transparent_38%)]" />
        <BusinessFeatureIcon name={title} />
      </div>
      <h3 className={`relative mt-6 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`relative mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{description}</p>
    </div>
  );
}

function BusinessFeatureIcon({ name }: { name: string }) {
  const common = "relative h-6 w-6";

  if (name === "Business Structure") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 20V8l6-4 6 4v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6M9 10h.01M12 10h.01M15 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "Operational Blueprint") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M5 7h14M5 12h10M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 11l2 2 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "Tools & Systems Setup") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="m9.5 12 1.6 1.6 3.4-3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "Launch-Ready Assets") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M6 5.5A2.5 2.5 0 0 1 8.5 3h7A2.5 2.5 0 0 1 18 5.5v13A2.5 2.5 0 0 1 15.5 21h-7A2.5 2.5 0 0 1 6 18.5v-13Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "Automation Recommendations") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m10 12 1.3 1.3L14.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path d="M4 17 9 12l3 3 7-8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h4v4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StackCard({ isDark, title, desc }: { isDark: boolean; title: string; desc: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-6 transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-black/20 hover:bg-white/[0.07]" : "border-slate-200 bg-white/80 hover:bg-white"}`}>
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/30 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_50px_rgba(99,91,255,0.22)] backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:scale-110">
        <div className="absolute inset-0 bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400" />
        <div className="absolute inset-[1px] rounded-[1.18rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.42),transparent_38%)]" />
        <BusinessSetupIcon name={title} />
      </div>
      <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
    </div>
  );
}

function ProcessStep({ isDark, number, title, copy }: { isDark: boolean; number: string; title: string; copy: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-6 transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-black/20 hover:bg-white/[0.07]" : "border-slate-200 bg-white/75 hover:bg-white"}`}>
      <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-white/30 bg-white/15 px-3.5 py-3 text-xs font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_50px_rgba(99,91,255,0.22)] backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:rotate-2 group-hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-400" />
        <div className="absolute inset-[1px] rounded-[0.95rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.42),transparent_38%)]" />
        <ProcessIcon number={number} />
        <span className="relative">{number}</span>
      </div>
      <h3 className={`mt-6 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>
    </div>
  );
}

function BusinessSetupIcon({ name }: { name: string }) {
  const common = "relative h-6 w-6";

  if (name === "Identity") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9.5h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "Operations") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M6 7h12M6 12h12M6 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 7h.01M4 12h.01M4 17h.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "Revenue") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 17 9 12l3 3 7-8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h4v4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "Automation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 3v3M12 18v3M4.8 7.2l2.1 2.1M17.1 14.7l2.1 2.1M3 12h3M18 12h3M4.8 16.8l2.1-2.1M17.1 9.3l2.1-2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "Analytics") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M5 19V9M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M4 19h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcessIcon({ number }: { number: string }) {
  const common = "relative h-5 w-5";

  if (number === "01") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 11a7 7 0 0 1 13.4-2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 4v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 13a7 7 0 0 1-13.4 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 20v-5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (number === "02") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M5 7h14M5 12h9M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 11l2 2 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (number === "03") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UseCaseCard({ isDark, title, description, points }: { isDark: boolean; title: string; description: string; points: string[] }) {
  return (
    <div className={`group rounded-[2rem] border p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.14)]"}`}>
      <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{description}</p>
      <div className="mt-5 space-y-2">
        {points.map((point) => (
          <div key={point} className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-white/10 bg-black/15 text-white/70" : "border-slate-200 bg-white/70 text-slate-700"}`}>
            <span className={isDark ? "text-cyan-300" : "text-[#635bff]"}>✓</span>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}

function TierCard({ isDark, name, label, description, items, featured }: { isDark: boolean; name: string; label: string; description: string; items: string[]; featured?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)] ${featured ? "border-[#635bff]/45 bg-gradient-to-br from-[#635bff]/16 via-blue-500/10 to-cyan-400/10 shadow-[0_28px_90px_rgba(99,91,255,0.24)] hover:shadow-[0_38px_130px_rgba(99,91,255,0.32)]" : isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.14)]"}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.24em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"}>{label}</div>
        {featured ? <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#635bff]">Recommended</span> : null}
      </div>
      <h3 className={`mt-5 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{name}</h3>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{description}</p>
      <div className="mt-6 space-y-2">
        {items.map((item) => (
          <div key={item} className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-white/10 bg-black/15 text-white/70" : "border-slate-200 bg-white/70 text-slate-700"}`}>
            <span className={isDark ? "text-cyan-300" : "text-[#635bff]"}>✓</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQCard({ isDark, q, a }: { isDark: boolean; q: string; a: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/[0.045] hover:bg-white/[0.07]" : "border-white bg-white/82 shadow-[0_18px_60px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_80px_rgba(99,91,255,0.10)]"}`}>
      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{q}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{a}</p>
    </div>
  );
}