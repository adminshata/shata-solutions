"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const tlds = [
  { ext: ".ai", label: "Artificial intelligence", status: "Premium", speed: "94%", desc: "Best for AI tools, automation products, and technical founders." },
  { ext: ".io", label: "Developer-native", status: "Premium", speed: "91%", desc: "Popular for infrastructure, SaaS, developer platforms, and startups." },
  { ext: ".com", label: "Global default", status: "Standard", speed: "98%", desc: "The strongest trust signal for mainstream brands and commerce." },
  { ext: ".app", label: "Product launches", status: "Standard", speed: "89%", desc: "Built for apps, portals, product dashboards, and mobile-first brands." },
];

const security = [
  ["Automated DNSSEC", "Protect DNS records from tampering with one-click signing and validation."],
  ["WHOIS Privacy", "Always free privacy protection to keep owner data off public lookup databases."],
  ["Email Auth Presets", "DMARC, SPF, and DKIM presets for safer business email and better deliverability."],
  ["Edge DNS Routing", "Managed records designed to connect cleanly with global edge networks."],
];

const integrations = ["Google Workspace", "Vercel", "Shopify", "Stripe"];

const metrics = [
  ["99.99%", "DNS uptime"],
  ["YubiKey", "2-factor hardware support"],
  ["24/7", "Concierge migration"],
];

const tiers = [
  {
    name: "Personal",
    label: "Foundation",
    desc: "For founders and small brands securing their first domain identity.",
    items: ["1 domain", "Basic DNS management", "WHOIS privacy", "Email forwarding guidance", "Launch checklist"],
  },
  {
    name: "Pro",
    label: "Most requested",
    desc: "For teams managing multiple brands, campaigns, and business email infrastructure.",
    items: ["Up to 10 domains", "Advanced security", "DMARC/SPF/DKIM presets", "Email warm-up guidance", "Priority DNS setup"],
    featured: true,
  },
  {
    name: "Enterprise",
    label: "Scale",
    desc: "For companies that need bulk management, registry controls, and migration support.",
    items: ["Bulk domain management", "Custom Registry Lock", "VIP NOC support", "Portfolio governance", "Concierge migration"],
  },
];

const brokerage = [
  ["shata.ai", "$18,500", "AI-native premium identity"],
  ["nexuscommerce.com", "$42,000", "Enterprise commerce positioning"],
  ["shipstack.io", "$12,900", "Logistics and developer-friendly"],
];

export default function DomainRegistration() {
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
        <div className="pointer-events-none fixed left-[-15%] top-[-20%] h-[560px] w-[560px] rounded-full bg-[#635bff]/20 blur-[120px]" />
        <div className="pointer-events-none fixed right-[-15%] top-[15%] h-[560px] w-[560px] rounded-full bg-cyan-400/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          {/* HERO */}
          <section className="grid items-center gap-12 [perspective:1800px] lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-xl ${isDark ? "border-white/10 bg-white/5 text-white/75" : "border-slate-200 bg-white/85 text-slate-700"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
                Nexus Domains
              </div>

              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl ${isDark ? "text-white" : "text-slate-950"}`}>
                Your Identity, Globally Distributed.
              </h1>

              <p className={`mt-6 max-w-2xl text-base leading-8 ${isDark ? "text-white/62" : "text-slate-600"}`}>
                Register, secure, route, and manage your domain portfolio with AI-powered suggestions, instant integrations, premium brokerage support, and security defaults built for modern SaaS teams.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?type=domain-registration"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
                >
                  Search your domain →
                </Link>
                <Link
                  href="#security"
                  className={`inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold shadow-sm transition ${isDark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white/85 text-slate-800 hover:bg-white"}`}
                >
                  View security layer
                </Link>
              </div>
            </div>

            <DomainHeroMockup isDark={isDark} />
          </section>

          {/* TLD MARKETPLACE */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="TLD marketplace"
              title="Pick a domain extension based on trust, category fit, and launch velocity."
              copy="Our suggestion engine ranks TLDs by brand sentiment, SEO potential, buyer trust, and technical compatibility with your launch stack."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tlds.map((tld) => (
                <TLDCard key={tld.ext} isDark={isDark} {...tld} />
              ))}
            </div>
          </section>

          {/* INFRASTRUCTURE */}
          <section id="security" className={`mt-28 rounded-[2.5rem] border p-8 shadow-[0_30px_110px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-10 ${isDark ? "border-white/10 bg-white/[0.055] shadow-[0_30px_110px_rgba(0,0,0,0.40)]" : "border-white bg-white/85"}`}>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <Eyebrow isDark={isDark}>Infrastructure layer</Eyebrow>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight md:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
                  One-click security for every domain you own.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Nexus Domains treats domain registration as infrastructure. DNSSEC, privacy protection, email authentication presets, and edge-ready routing are configured as default operating controls — not optional add-ons.
                </p>
              </div>
              <EdgeDiagram isDark={isDark} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {security.map(([title, desc]) => (
                <SecurityCard key={title} isDark={isDark} title={title} desc={desc} />
              ))}
            </div>
          </section>

          {/* ECOSYSTEM */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="Ecosystem integration"
              title="Connect the tools your business already runs on."
              copy="Inspired by Shopify simplicity, every connection is presented as a clean toggle: verify, connect, route, and launch without touching confusing DNS screens."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {integrations.map((item) => (
                <IntegrationCard key={item} isDark={isDark} name={item} />
              ))}
            </div>
          </section>

          {/* BROKERAGE */}
          <section className={`mt-28 rounded-[2.5rem] border p-8 shadow-[0_30px_110px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-10 ${isDark ? "border-white/10 bg-white/[0.055] shadow-[0_30px_110px_rgba(0,0,0,0.40)]" : "border-white bg-white/85"}`}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <Eyebrow isDark={isDark}>Premium brokerage</Eyebrow>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  High-value identities for brands that need the exact name.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  For domains priced at $10k+, we manage outreach, negotiation, escrow guidance, transfer planning, and lease-to-own options so the brand can secure the asset without operational risk.
                </p>
              </div>
              <div className="grid gap-4">
                {brokerage.map(([domain, price, desc]) => (
                  <BrokerageCard key={domain} isDark={isDark} domain={domain} price={price} desc={desc} />
                ))}
              </div>
            </div>
          </section>

          {/* TRUST */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="Trust & scale"
              title="Built for domains that have to stay online."
              copy="The domain layer supports brand trust, email authentication, launch reliability, and global customer access."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {metrics.map(([value, label]) => (
                <MetricCard key={label} isDark={isDark} value={value} label={label} />
              ))}
            </div>
          </section>

          {/* TIERS */}
          <section className="mt-28">
            <CenteredIntro
              isDark={isDark}
              eyebrow="Engagement tiers"
              title="Choose the domain management layer that fits your stage."
              copy="Start with one domain, scale into a portfolio, or move into enterprise controls with registry lock and VIP support."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {tiers.map((tier) => (
                <TierCard key={tier.name} isDark={isDark} {...tier} />
              ))}
            </div>
          </section>

          {/* MICRO INTERACTIONS */}
          <section className={`mt-28 rounded-[2rem] border p-8 ${isDark ? "border-white/10 bg-white/[0.045]" : "border-white bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"}`}>
            <Eyebrow isDark={isDark}>Micro-interactions</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Designed to make domain search feel intelligent.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <MicroCard isDark={isDark} title="Availability pulse" copy="The search bar emits a soft indigo border-glow when a domain is available." />
              <MicroCard isDark={isDark} title="AI suggestion reveal" copy="TLD cards slide in as the user types, ranked by brand sentiment and SEO potential." />
              <MicroCard isDark={isDark} title="DNS speed chart" copy="Each extension animates a small propagation chart on hover to communicate infrastructure readiness." />
            </div>
          </section>

          {/* CTA */}
          <section className={`mt-28 overflow-hidden rounded-[2.5rem] border p-8 text-center shadow-[0_30px_110px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-12 ${isDark ? "border-white/10 bg-white/[0.055] shadow-[0_30px_110px_rgba(0,0,0,0.40)]" : "border-white bg-white/85"}`}>
            <div className="mx-auto max-w-3xl">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Secure your identity layer
              </div>
              <h2 className={`text-4xl font-semibold tracking-tight md:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
                Register the domain your future customers will trust.
              </h2>
              <p className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                Search, secure, configure, and connect your domain with security-first defaults and concierge launch support.
              </p>
              <Link
                href="/contact?type=domain-registration"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
              >
                Request Domain Setup →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function DomainHeroMockup({ isDark }: { isDark: boolean }) {
  const results = [
    ["nexusai.com", "Available", "92 sentiment"],
    ["nexus.ai", "Premium", "98 category fit"],
    ["nexus.app", "Available", "89 SEO fit"],
  ];

  return (
    <div className="group relative mx-auto h-[620px] w-full max-w-[620px] [perspective:1800px]">
      <div className="absolute inset-4 rounded-full bg-[#635bff]/20 blur-[110px]" />
      <div className="absolute right-4 top-24 h-28 w-28 rounded-[2rem] bg-gradient-to-br from-cyan-300/45 to-blue-600/25 blur-[1px] transition duration-700 group-hover:-translate-y-6 group-hover:translate-x-4" />
      <div className="absolute bottom-28 left-2 h-24 w-24 rounded-[2rem] bg-gradient-to-br from-[#635bff]/35 to-cyan-400/20 blur-[1px] transition duration-700 group-hover:translate-y-4 group-hover:-translate-x-4" />

      <div className={`absolute inset-x-4 top-4 rotate-[1.6deg] overflow-hidden rounded-[2.75rem] border p-5 shadow-[0_55px_160px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition duration-700 will-change-transform group-hover:-translate-y-4 group-hover:rotate-[0.4deg] group-hover:[transform:rotateX(6deg)_rotateY(-8deg)] ${isDark ? "border-white/10 bg-white/[0.08] text-white shadow-[0_65px_180px_rgba(0,0,0,0.58)]" : "border-white bg-white/92 text-slate-950"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.16),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(0,210,255,0.18),transparent_30%)]" />
        <div className={`relative rounded-[2.2rem] border p-4 ${isDark ? "border-white/10 bg-black/20" : "border-slate-200/70 bg-white/75"}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className={isDark ? "text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35" : "text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400"}>AI domain search</div>
              <div className={`mt-2 text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>nexus</div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
              Live
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950 p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,0.35)] transition duration-500 group-hover:shadow-[0_35px_100px_rgba(99,91,255,0.32)]">
            <div className="rounded-2xl border border-[#635bff]/35 bg-white/[0.06] p-4 shadow-[0_0_40px_rgba(99,91,255,0.22)]">
              <div className="text-xs text-white/45">Search domain</div>
              <div className="mt-2 flex items-center justify-between gap-4">
                <div className="text-2xl font-semibold">nexus.ai</div>
                <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Available</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {results.map(([domain, status, meta]) => (
                <div key={domain} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.085]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold">{domain}</div>
                      <div className="mt-1 text-xs text-white/45">{meta}</div>
                    </div>
                    <div className={status === "Available" ? "text-xs font-semibold text-emerald-300" : "text-xs font-semibold text-cyan-300"}>{status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Sentiment", "SEO fit", "DNS speed"].map((label, index) => (
              <div key={label} className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-black/20 text-white/70" : "border-slate-200 bg-white/85 text-slate-700"}`}>
                <div className={isDark ? "text-[10px] uppercase tracking-[0.2em] text-white/35" : "text-[10px] uppercase tracking-[0.2em] text-slate-400"}>{label}</div>
                <div className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{["92", "88", "99"][index]}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TLDCard({ isDark, ext, label, status, speed, desc }: { isDark: boolean; ext: string; label: string; status: string; speed: string; desc: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)] ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.14)]"}`}>
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl transition group-hover:scale-125" />
      <div className={`relative text-5xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>{ext}</div>
      <div className={isDark ? "relative mt-2 text-sm text-white/50" : "relative mt-2 text-sm text-slate-500"}>{label}</div>
      <div className="relative mt-5 flex items-center justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${status === "Premium" ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"}`}>{status}</span>
        <span className={isDark ? "text-xs font-semibold text-white/45" : "text-xs font-semibold text-slate-500"}>{speed} DNS</span>
      </div>
      <div className="relative mt-4 h-1.5 rounded-full bg-slate-950/10 dark:bg-white/10">
        <div className="h-1.5 w-[78%] rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 transition-all duration-500 group-hover:w-full" />
      </div>
      <p className={`relative mt-5 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
    </div>
  );
}

function EdgeDiagram({ isDark }: { isDark: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border p-6 ${isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-white/80"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,91,255,0.18),transparent_45%)]" />
      <div className="relative mx-auto flex h-[330px] max-w-xl items-center justify-center">
        <div className="absolute h-56 w-56 rounded-full border border-cyan-400/20" />
        <div className="absolute h-80 w-80 rounded-full border border-[#635bff]/20" />
        <div className="z-10 rounded-[1.5rem] bg-gradient-to-br from-[#635bff] to-cyan-400 px-6 py-5 text-center text-white shadow-[0_24px_80px_rgba(99,91,255,0.34)]">
          <div className="text-xs uppercase tracking-[0.24em] text-white/70">Domain</div>
          <div className="mt-1 text-2xl font-semibold">nexus.ai</div>
        </div>
        {[
          "US Edge",
          "EU Edge",
          "MENA Edge",
          "APAC Edge",
        ].map((node, index) => (
          <div
            key={node}
            className={`absolute rounded-2xl border px-4 py-3 text-xs font-semibold ${isDark ? "border-white/10 bg-white/[0.06] text-white/70" : "border-slate-200 bg-white text-slate-700"}`}
            style={{
              transform: `rotate(${index * 90}deg) translateY(-130px) rotate(-${index * 90}deg)`,
            }}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityCard({ isDark, title, desc }: { isDark: boolean; title: string; desc: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-5 transition duration-500 hover:-translate-y-2 ${isDark ? "border-white/10 bg-black/20 hover:bg-white/[0.07]" : "border-slate-200 bg-white/80 hover:bg-white"}`}>
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-white shadow-lg">✓</div>
      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
    </div>
  );
}

function IntegrationCard({ isDark, name }: { isDark: boolean; name: string }) {
  return (
    <div className={`group rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-2 ${isDark ? "border-white/10 bg-white/[0.045] hover:bg-white/[0.07]" : "border-white bg-white/82 shadow-[0_18px_60px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_80px_rgba(99,91,255,0.10)]"}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{name}</div>
        <div className="relative h-7 w-12 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 shadow-lg">
          <div className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
        </div>
      </div>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
        One-toggle verification, DNS presets, and clean routing for your launch stack.
      </p>
    </div>
  );
}

function BrokerageCard({ isDark, domain, price, desc }: { isDark: boolean; domain: string; price: string; desc: string }) {
  return (
    <div className={`group rounded-[1.75rem] border p-5 transition duration-500 hover:-translate-y-2 ${isDark ? "border-white/10 bg-black/20 hover:bg-white/[0.07]" : "border-slate-200 bg-white/80 hover:bg-white"}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{domain}</div>
          <div className={isDark ? "mt-1 text-sm text-white/50" : "mt-1 text-sm text-slate-500"}>{desc}</div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-semibold ${isDark ? "text-cyan-300" : "text-[#635bff]"}`}>{price}</div>
          <div className="mt-1 text-xs font-semibold text-emerald-400">Lease-to-own</div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ isDark, value, label }: { isDark: boolean; value: string; label: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-7 text-center backdrop-blur-xl transition duration-500 hover:-translate-y-2 ${isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.14)]" : "border-white bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.16)]"}`}>
      <div className={`text-5xl font-semibold tracking-tight ${isDark ? "text-cyan-300" : "text-[#635bff]"}`}>{value}</div>
      <p className={`mt-3 text-sm font-semibold ${isDark ? "text-white/60" : "text-slate-600"}`}>{label}</p>
    </div>
  );
}

function TierCard({ isDark, name, label, desc, items, featured }: { isDark: boolean; name: string; label: string; desc: string; items: string[]; featured?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)] ${featured ? "border-[#635bff]/45 bg-gradient-to-br from-[#635bff]/16 via-blue-500/10 to-cyan-400/10 shadow-[0_28px_90px_rgba(99,91,255,0.24)] hover:shadow-[0_38px_130px_rgba(99,91,255,0.32)]" : isDark ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.32)] hover:shadow-[0_34px_110px_rgba(0,210,255,0.12)]" : "border-white bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.08)] hover:shadow-[0_34px_110px_rgba(99,91,255,0.14)]"}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.24em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"}>{label}</div>
        {featured ? <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#635bff]">Recommended</span> : null}
      </div>
      <h3 className={`mt-5 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{name}</h3>
      <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
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

function MicroCard({ isDark, title, copy }: { isDark: boolean; title: string; copy: string }) {
  return (
    <div className={`rounded-[1.75rem] border p-5 ${isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-white/80"}`}>
      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{copy}</p>
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

function Eyebrow({ children, isDark }: { children: React.ReactNode; isDark?: boolean }) {
  return <div className={`text-xs font-semibold uppercase tracking-[0.28em] ${isDark ? "text-cyan-300" : "text-[#635bff]"}`}>{children}</div>;
}