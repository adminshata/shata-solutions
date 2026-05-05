"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const features = [
  {
    title: "Unlimited Aliases",
    description: "Create role-based addresses like sales@, support@, billing@, founders@, and route them cleanly without buying unnecessary seats.",
    stat: "Role-based",
  },
  {
    title: "Shared Team Inboxes",
    description: "Give sales, support, operations, and finance a controlled workspace for customer communication and handoffs.",
    stat: "Team-ready",
  },
  {
    title: "Pro-Signature Suites",
    description: "Standardized branded signatures for the whole team with logo, title, phone, website, and CTA links.",
    stat: "Brand-safe",
  },
  {
    title: "100GB High-Performance Storage",
    description: "Premium mailbox storage planning for growing teams that need reliable access, archives, attachments, and compliance-ready retention.",
    stat: "100GB",
  },
  {
    title: "Migration Support",
    description: "Move from Gmail, Outlook, Zoho, cPanel, or old hosting without losing historical messages or confusing your team.",
    stat: "Zero-friction",
  },
  {
    title: "Admin Documentation",
    description: "Clear handover with mailbox list, DNS records, recovery steps, access rules, and security notes.",
    stat: "Operational",
  },
];

const securitySpecs = [
  ["SPF", "Authorizes trusted sending servers for your domain."],
  ["DKIM", "Adds cryptographic signatures to prove messages were not altered."],
  ["DMARC", "Defines policy for spoofing protection, reporting, and enforcement."],
  ["Inbox Warming", "Gradual sending patterns to build trust for new domains and mailboxes."],
  ["IP Reputation", "Monitoring signals that protect deliverability before it becomes a sales problem."],
  ["2FA + Recovery", "Guidance for login safety, admin ownership, and account recovery."],
];

const useCases = [
  {
    title: "The Scaling Founder",
    description: "Launch with founder, sales, support, finance, and hiring inboxes that make the company look serious from day one.",
    points: ["Founder identity", "Investor-ready communication", "Clean department routing"],
  },
  {
    title: "The High-Volume Sales Team",
    description: "Protect outbound performance with authentication, warm-up logic, aliases, tracking alignment, and inbox placement controls.",
    points: ["Deliverability readiness", "Sales aliases", "Reply routing"],
  },
  {
    title: "The Secure Legal/Finance Entity",
    description: "Build a stricter communication layer for sensitive documents, client trust, billing, contracts, and audit-friendly access.",
    points: ["Security posture", "Access control", "Compliance workflow"],
  },
];

const tiers = [
  {
    name: "Starter",
    users: "1–5 Users",
    description: "Essential business email identity for solo founders and small teams.",
    items: ["Domain connection", "MX/SPF/DKIM/DMARC setup", "1–5 mailboxes", "Aliases + forwarding", "Signature suite"],
  },
  {
    name: "Growth",
    users: "5–50 Users",
    description: "Advanced team email infrastructure for sales, support, and operations.",
    items: ["Advanced security", "Automated inbox warming", "IP reputation monitoring", "Shared team inboxes", "Analytics-ready handover"],
    featured: true,
  },
  {
    name: "Enterprise",
    users: "50+ Users",
    description: "Concierge migration and governance for larger teams and sensitive operations.",
    items: ["Custom migration plan", "Admin policy setup", "Access governance", "Priority launch support", "24/7 priority NOC support"],
  },
];

const faq = [
  {
    q: "How do I move my old emails?",
    a: "We audit your current provider, map every mailbox and alias, prepare DNS, then migrate messages with a controlled cutover plan so your team can keep working with minimal disruption.",
  },
  {
    q: "Will my emails hit the spam folder?",
    a: "No setup can promise 100% inbox placement, but we configure the core deliverability layer correctly: SPF, DKIM, DMARC, warm-up patterns, sender reputation checks, and clean mailbox practices.",
  },
  {
    q: "Do I need Google Workspace or Microsoft 365?",
    a: "Not always. We recommend the provider based on budget, team size, storage, compliance, collaboration needs, and whether your business already uses Google or Microsoft tools.",
  },
  {
    q: "Can you connect website forms and CRM replies?",
    a: "Yes. We can align form notifications, contact addresses, CRM sending domains, support inboxes, and sales reply routing so communication feels connected.",
  },
];

export default function BusinessEmail() {
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
              Business Email Infrastructure
            </div>

            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Identity is Infrastructure. Own your domain, secure your future.
            </h1>

            <p className={`mt-6 max-w-2xl text-base leading-8 ${isDark ? "text-white/62" : "text-slate-600"}`}>
              We configure professional business email, authentication records, migration, inbox warming, and security controls so your company communicates with authority — without the technical headache.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact?type=business-email"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
              >
                Start Your 14-Day Identity Trial →
              </Link>
              <Link
                href="#security"
                className={`inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold shadow-sm transition ${isDark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white/85 text-slate-800 hover:bg-white"}`}
              >
                View security specs
              </Link>
            </div>

            <div className={`mt-8 flex flex-wrap gap-3 text-xs font-semibold ${isDark ? "text-white/45" : "text-slate-500"}`}>
              <span>DMARC-ready</span>
              <span>•</span>
              <span>Google Workspace</span>
              <span>•</span>
              <span>Microsoft 365</span>
              <span>•</span>
              <span>Migration concierge</span>
            </div>
          </div>

          <EmailAuthorityMockup isDark={isDark} />
        </section>

        {/* COST OF GENERIC */}
        <section className="mt-28 grid gap-5 lg:grid-cols-3">
          <SectionIntro
            isDark={isDark}
            eyebrow="The cost of generic"
            title="Generic email quietly lowers trust before the first sales call."
            copy="A Gmail or Yahoo address can make a funded startup look temporary, trigger stricter spam checks, and create friction with investors, enterprise buyers, and high-value clients."
          />
          <MetricCard isDark={isDark} label="Trust-to-conversion" value="Higher" copy="Branded domains create continuity between website, proposal, invoice, and inbox." />
          <MetricCard isDark={isDark} label="Spam risk" value="Lower" copy="Authentication records help mailbox providers understand that your domain is legitimate." />
        </section>

        {/* FEATURE SUITE */}
        <section className="mt-28">
          <CenteredIntro
            isDark={isDark}
            eyebrow="Feature suite"
            title="Everything your team needs to communicate like a serious company."
            copy="A complete business email layer built for trust, collaboration, storage, signatures, and daily operations."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} isDark={isDark} {...feature} />
            ))}
          </div>
        </section>

        {/* PROVIDERS */}
        <section className={`mt-28 rounded-[2rem] border p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10 ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_28px_90px_rgba(0,0,0,0.35)]" : "border-white bg-white/80"}`}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Eyebrow isDark={isDark}>Unified stack</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">World-class interface. Managed technical plumbing.</h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Your team gets the interface they already trust — Google Workspace or Microsoft 365 — while we handle the domain connection, DNS records, migration logic, aliases, inbox policies, and deliverability configuration.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProviderCard isDark={isDark} name="Google Workspace" desc="Gmail, Drive, Calendar, Meet, admin console, and scalable mailbox management." />
              <ProviderCard isDark={isDark} name="Microsoft 365" desc="Outlook, Teams, OneDrive, Exchange controls, and enterprise-friendly governance." />
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section id="security" className="mt-28">
          <CenteredIntro
            isDark={isDark}
            eyebrow="Bulletproof deliverability"
            title="Authentication, warming, and reputation controls built into the core setup."
            copy="Deliverability is not a checkbox. It is a technical trust system that has to be configured before sales, support, billing, and founder outreach begin."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securitySpecs.map(([title, desc]) => (
              <SecuritySpec key={title} isDark={isDark} title={title} desc={desc} />
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className={`mt-28 rounded-[2rem] border p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10 ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_28px_90px_rgba(0,0,0,0.35)]" : "border-white bg-white/80"}`}>
          <CenteredIntro
            isDark={isDark}
            eyebrow="Zero-friction setup"
            title="From domain connection to launch in three controlled steps."
            copy="We remove the confusion from DNS, provider settings, migration, and testing. Your team gets a clean handover, not a technical mess."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <ProcessStep isDark={isDark} number="01" title="Domain Connection" copy="We connect your domain, verify DNS access, choose the right provider, and prepare the mailbox architecture." />
            <ProcessStep isDark={isDark} number="02" title="Automated Migration" copy="We move data, aliases, routing, and team inboxes with a controlled cutover plan." />
            <ProcessStep isDark={isDark} number="03" title="Launch" copy="We test sending, receiving, authentication, warm-up, signatures, and team access before handover." />
          </div>
        </section>

        {/* USE CASES */}
        <section className="mt-28">
          <CenteredIntro
            isDark={isDark}
            eyebrow="Industry use cases"
            title="Built for the exact communication risks your business faces."
            copy="Different teams need different email architecture. We scope the setup around trust, volume, security, and internal ownership."
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
            eyebrow="Cloud engagement tiers"
            title="Pick the email infrastructure level that matches your growth stage."
            copy="No noisy pricing table. Just clear scopes based on users, security needs, migration complexity, and deliverability requirements."
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
            <Eyebrow isDark={isDark}>Concierge FAQ</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Clear answers before we touch your DNS.</h2>
            <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We explain the setup in plain language and document the technical decisions so you always own the accounts, domain, and infrastructure.
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
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-500 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SOC2 Type II Compliant
            </div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Launch email identity that buyers, investors, and inboxes trust.</h2>
            <p className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Start with a clean domain, secure records, migration support, and a deliverability system built before your next campaign or client pitch.
            </p>
            <Link
              href="/contact?type=business-email"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
            >
              Start Your 14-Day Identity Trial →
            </Link>

            <div className={`mt-8 grid gap-3 text-xs font-semibold sm:grid-cols-5 ${isDark ? "text-white/45" : "text-slate-500"}`}>
              {['Google Workspace', 'Microsoft 365', 'DMARC', 'DKIM', 'IP Reputation'].map((item) => (
                <div key={item} className={`rounded-full border px-3 py-2 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/70"}`}>{item}</div>
              ))}
            </div>
          </div>
        </section>
      </div>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function EmailAuthorityMockup({ isDark }: { isDark: boolean }) {
  return (
    <div className="group relative mx-auto h-[590px] w-full max-w-[590px] [perspective:1600px]">
      <div className="absolute inset-6 rounded-full bg-[#635bff]/20 blur-[100px]" />
      <div className="absolute right-2 top-20 h-28 w-28 rounded-[2rem] bg-gradient-to-br from-cyan-300/45 to-blue-600/25 blur-[1px] transition duration-700 group-hover:-translate-y-6 group-hover:translate-x-4" />
      <div className="absolute bottom-24 left-2 h-24 w-24 rounded-[2rem] bg-gradient-to-br from-[#635bff]/35 to-cyan-400/20 blur-[1px] transition duration-700 group-hover:translate-y-4 group-hover:-translate-x-4" />
      <div
        className={`absolute inset-x-4 top-8 rotate-[2deg] rounded-[2.5rem] border p-6 shadow-[0_45px_150px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition duration-700 will-change-transform group-hover:-translate-y-4 group-hover:rotate-[0.6deg] group-hover:[transform:rotateX(6deg)_rotateY(-8deg)] ${
          isDark
            ? "border-white/10 bg-white/[0.08] text-white shadow-[0_60px_180px_rgba(0,0,0,0.55)]"
            : "border-white bg-white/92 text-slate-950"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.22em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"}>Verified inbox</div>
            <div className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>info@yourcompany.com</div>
          </div>
          <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            Verified
          </div>
        </div>

        <div className={`mt-7 rounded-[1.75rem] border p-5 text-white shadow-2xl transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_35px_90px_rgba(99,91,255,0.35)] ${isDark ? "border-white/10 bg-slate-950" : "border-slate-200 bg-slate-950"}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-xl">✓</div>
            <div>
              <div className="text-sm text-white/50">Domain authentication</div>
              <div className="text-xl font-semibold">Inbox trust score 98%</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['SPF', 'DKIM', 'DMARC'].map((item) => (
              <div key={item} className="group/record rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
                <div className="text-xs text-white/45">Record</div>
                <div className="mt-1 text-lg font-semibold">{item}</div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div className="h-1.5 w-[92%] rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 transition duration-500 group-hover/record:w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {['sales@yourcompany.com', 'support@yourcompany.com', 'billing@yourcompany.com', 'founder@yourcompany.com'].map((mail) => (
            <div
              key={mail}
              className={`rounded-2xl border p-4 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                isDark
                  ? "border-white/10 bg-black/25 text-white/70"
                  : "border-slate-200 bg-white/85 text-slate-700"
              }`}
            >
              {mail}
            </div>
          ))}
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
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-lg transition duration-500 group-hover:rotate-12 group-hover:scale-110">✦</div>
      <h3 className={`relative mt-6 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`relative mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{description}</p>
      <div className={`relative mt-6 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${isDark ? "border-white/10 bg-black/20 text-white/55" : "border-slate-200 bg-white/70 text-slate-600"}`}>{stat}</div>
    </div>
  );
}

function ProviderCard({ isDark, name, desc }: { isDark: boolean; name: string; desc: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-6 transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-black/20 hover:bg-white/[0.07]" : "border-slate-200 bg-white/80 hover:bg-white"}`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold transition duration-500 group-hover:rotate-6 group-hover:scale-110 ${isDark ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}>{name[0]}</div>
      <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{name}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
    </div>
  );
}

function SecuritySpec({ isDark, title, desc }: { isDark: boolean; title: string; desc: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_20px_70px_rgba(0,0,0,0.30)] hover:shadow-[0_30px_100px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_20px_70px_rgba(15,23,42,0.07)] hover:shadow-[0_30px_100px_rgba(99,91,255,0.14)]"}`}>
      <div className="flex items-center justify-between">
        <div className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</div>
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)] transition group-hover:scale-150" />
      </div>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
    </div>
  );
}

function ProcessStep({ isDark, number, title, copy }: { isDark: boolean; number: string; title: string; copy: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-6 transition duration-500 hover:-translate-y-2 hover:[transform:rotateX(3deg)_rotateY(-3deg)] ${isDark ? "border-white/10 bg-black/20 hover:bg-white/[0.07]" : "border-slate-200 bg-white/75 hover:bg-white"}`}>
      <div className="inline-flex rounded-xl bg-gradient-to-br from-[#635bff] to-cyan-400 px-3 py-2 text-xs font-bold text-white shadow-lg transition duration-500 group-hover:rotate-6 group-hover:scale-110">{number}</div>
      <h3 className={`mt-6 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>
    </div>
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

function TierCard({ isDark, name, users, description, items, featured }: { isDark: boolean; name: string; users: string; description: string; items: string[]; featured?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)] ${featured ? "border-[#635bff]/45 bg-gradient-to-br from-[#635bff]/16 via-blue-500/10 to-cyan-400/10 shadow-[0_28px_90px_rgba(99,91,255,0.24)] hover:shadow-[0_38px_130px_rgba(99,91,255,0.32)]" : isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.14)]"}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.24em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"}>{users}</div>
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