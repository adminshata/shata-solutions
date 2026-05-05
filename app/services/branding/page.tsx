"use client";

import Link from "next/link";
import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const brandPillars = [
  {
    title: "Audit & Sentiment",
    eyebrow: "Market intelligence",
    desc: "We analyze your competitive landscape, category language, visual saturation, customer perception, and 2026 positioning gaps so the brand is built on evidence — not taste.",
    features: ["Competitor map", "Audience sentiment", "Positioning gaps", "Category narrative"],
    kind: "audit",
  },
  {
    title: "Visual Identity System",
    eyebrow: "Scalable identity",
    desc: "Beyond a logo: we design typography scales, accessible color systems, iconography, layout rules, UI tokens, and visual patterns your team can reuse everywhere.",
    features: ["Logo architecture", "Type scale", "Accessible colors", "Icon system"],
    kind: "identity",
  },
  {
    title: "Product UI/UX Fusion",
    eyebrow: "Brand inside software",
    desc: "Your brand should live inside the product, not just the website. We translate identity into Stripe-style components, dashboards, states, and interaction language.",
    features: ["UI components", "Product states", "Design tokens", "Dashboard style"],
    kind: "product",
  },
  {
    title: "Bilingual Verbal Identity",
    eyebrow: "Global + local voice",
    desc: "We build tone-of-voice systems for English and Arabic markets so your brand can speak with authority, clarity, and cultural precision across regions.",
    features: ["English voice", "Arabic voice", "Messaging rules", "Sales copy logic"],
    kind: "verbal",
  },
];

const campaignGrid = [
  {
    number: "01",
    trait: "Trust",
    headline: "Every signal feels verified.",
    direction: "Glass shield, verified badge, clean UI card, soft blue glow.",
  },
  {
    number: "02",
    trait: "Velocity",
    headline: "Speed your market can feel.",
    direction: "Motion blur trails, delivery path, sharp diagonal light lines.",
  },
  {
    number: "03",
    trait: "Scale",
    headline: "Built to expand without breaking.",
    direction: "3D grid, modular blocks, expanding architecture lines.",
  },
  {
    number: "04",
    trait: "Human-Centricity",
    headline: "Technology with a human rhythm.",
    direction: "Warm portrait silhouettes, service cards, soft handoff visuals.",
  },
  {
    number: "05",
    trait: "Security",
    headline: "Confidence at every touchpoint.",
    direction: "Frosted vault, API lock, encrypted route overlays.",
  },
  {
    number: "06",
    trait: "Innovation",
    headline: "A system that keeps learning.",
    direction: "AI nodes, luminous circuits, product intelligence dashboard.",
  },
  {
    number: "07",
    trait: "Global Reach",
    headline: "One brand. Every market.",
    direction: "World map mesh, glowing location pins, bilingual captions.",
  },
  {
    number: "08",
    trait: "Seamlessness",
    headline: "No friction between idea and action.",
    direction: "Connected cards, app screens, continuous flow lines.",
  },
  {
    number: "09",
    trait: "Result",
    headline: "Brand clarity that compounds.",
    direction: "Growth curve, revenue dashboard, crisp success state.",
  },
];

const campaignImages = [
  "/branding/shata-campaign-post-01.png",
  "/branding/shata-campaign-post-02.png",
  "/branding/shata-campaign-post-03.png",
  "/branding/shata-campaign-post-04.png",
  "/branding/shata-campaign-post-05.png",
  "/branding/shata-campaign-post-06.png",
  "/branding/shata-campaign-post-07.png",
  "/branding/shata-campaign-post-08.png",
  "/branding/shata-campaign-post-09.png",
];

const roiRows = [
  { metric: "Trust score", generic: "Looks acceptable", systemic: "Consistent proof across product, web, social, and sales" },
  { metric: "Ad CTR", generic: "Creative changes randomly", systemic: "Campaign assets follow a tested visual system" },
  { metric: "Sales cycle", generic: "Extra explanation required", systemic: "Positioning makes the value easier to understand" },
  { metric: "Talent acquisition", generic: "Company feels early-stage", systemic: "Brand signals maturity, ambition, and operating clarity" },
  { metric: "Design speed", generic: "Every asset starts from zero", systemic: "Reusable components, templates, and guidelines" },
];


const governance = [
  "Downloadable logo files and usage rules",
  "CSS variables for colors, shadows, radius, and spacing",
  "Typography scale and product UI tokens",
  "Social templates for 9-grid campaigns and launch drops",
  "Motion presets for reels, product demos, and ads",
  "Private brand wiki for founders, designers, marketers, and sales teams",
];

const ecosystemLogos = [
  { name: "figma", label: "Figma" },
  { name: "framer", label: "Framer" },
  { name: "webflow", label: "Webflow" },
  { name: "notion", label: "Notion" },
  { name: "stripe", label: "Stripe" },
  { name: "hubspot", label: "HubSpot" },
];

export default function BrandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden ${
        isDark ? "bg-[#0B0D12] text-white" : "bg-white text-slate-950"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_18%_10%,rgba(99,91,255,0.20),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(0,210,255,0.14),transparent_34%),linear-gradient(180deg,#0B0D12_0%,#111827_52%,#0B0D12_100%)]"
              : "bg-gradient-to-br from-white via-indigo-50/50 to-blue-50/40"
          }`}
        />
        <div className="absolute top-16 -left-24 h-[520px] w-[520px] rounded-full bg-[#635bff]/25 blur-[130px] animate-pulse" />
        <div className="absolute top-52 -right-24 h-[520px] w-[520px] rounded-full bg-cyan-400/18 blur-[130px] animate-pulse" />
        <div className="absolute left-1/2 top-[720px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px] animate-pulse" />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-[0.055]" : "opacity-[0.06]"}`}
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative z-10 pt-32 pb-24 [transform-style:preserve-3d]">
        {/* HERO */}
        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 lg:grid-cols-[1.02fr_0.98fr] [transform-style:preserve-3d]">
          <div className="text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/80"
                  : "border-slate-200 bg-white/70 text-slate-700"
              }`}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#EF233C] animate-pulse" />
              Brand Systems by Shata Solutions
              <span className={isDark ? "text-white/30" : "text-slate-300"}>·</span>
              Systemic Branding for SaaS
            </div>

            <h1
              className={`mt-8 text-5xl sm:text-6xl lg:text-[4.8rem] font-semibold leading-[1.02] tracking-[-0.045em] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Branding as an
              <span className="block bg-gradient-to-br from-[#EF233C] via-[#635bff] to-cyan-400 bg-clip-text text-transparent">
                operational advantage.
              </span>
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-white/70" : "text-slate-600"
              } mx-auto lg:mx-0`}
            >
              We build brand systems for Series A+ SaaS companies — identities that scale across product UI, social campaigns, sales decks, hiring, investor narratives, and global markets.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/contact?type=branding"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#EF233C] via-[#635bff] to-blue-600 px-8 py-3.5 text-white font-semibold shadow-[0_22px_70px_rgba(99,91,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="relative z-10">Architect my brand →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-[#635bff] to-[#EF233C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#brand-campaign"
                className={`rounded-full border px-8 py-3.5 font-semibold backdrop-blur-xl transition ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/10"
                    : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                View campaign logic
              </a>
            </div>
          </div>

          <BrandCommandCenter isDark={isDark} />
        </section>

        {/* WHAT YOU GET */}
        <section className="mx-auto mt-10 max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow isDark={isDark}>What You Get</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              A complete brand system your team can use everywhere.
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Every deliverable is built as a reusable system — not a one-time design file — so your brand stays consistent across product, marketing, sales, and social campaigns.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Logo System", "Primary mark, icon mark, lockups, spacing rules, and usage guidance for every channel."],
              ["Color & Typography", "Accessible color palette, font hierarchy, type scale, contrast rules, and visual rhythm."],
              ["Social Campaign Identity", "Launch-ready campaign direction, post templates, 9-grid logic, and visual content rules."],
              ["Product UI Brand Kit", "Buttons, cards, states, dashboard patterns, tokens, and branded interface components."],
              ["Voice Guidelines", "English and Arabic tone rules, messaging hierarchy, founder voice, and conversion copy logic."],
              ["Brand Portal", "A private living hub for logos, assets, CSS variables, templates, motion presets, and usage rules."],
            ].map(([title, desc], index) => (
              <WhatYouGetCard key={title} isDark={isDark} title={title} desc={desc} index={index} />
            ))}
          </div>
        </section>

        {/* 360 BRAND PILLARS */}
        <section className="mx-auto mt-32 max-w-7xl px-6">
          <div className="text-center">
            <Eyebrow isDark={isDark}>360-degree brand pillars</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              A brand system engineered like software.
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              Your identity becomes a reusable operating layer — not a folder of disconnected files.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {brandPillars.map((pillar, index) => (
              <BrandPillar key={pillar.title} isDark={isDark} index={index} {...pillar} />
            ))}
          </div>
        </section>

        {/* SOCIAL CAMPAIGN */}
        <section id="brand-campaign" className="mx-auto mt-24 max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <GlassCard isDark={isDark} className="sticky top-28 p-8">
              <Eyebrow isDark={isDark}>Campaign Identity System</Eyebrow>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Campaign visuals that make your brand instantly recognizable.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                We design campaign visuals that make your brand instantly recognizable across launch posts, ads, investor updates, and product announcements.
              </p>
              <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 p-3 shadow-2xl">
                <MiniInstagramPreview />
              </div>
            </GlassCard>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {campaignGrid.map((item, index) => (
                <CampaignTile key={item.number} isDark={isDark} image={campaignImages[index]} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/12 blur-[90px]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <Eyebrow isDark={isDark}>Content ecosystem</Eyebrow>
                <h3 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  Turn your brand into a content system.
                </h3>
                <p className={`mt-3 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  Extend your brand identity into social media packages, launch grids, short-form content, and lead-generation campaigns.
                </p>
              </div>

              <Link
                href="/services/marketing-plans/social-media"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#635bff] to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(99,91,255,0.28)] transition hover:scale-[1.02]"
              >
                Explore Social Media Packages →
              </Link>
            </div>
          </GlassCard>
        </section>

        {/* GOVERNANCE */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="relative overflow-hidden p-8 md:p-10">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#635bff]/15 blur-[110px]" />
            <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <Eyebrow isDark={isDark}>Brand governance & scale</Eyebrow>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                  Living Brand Guidelines — a private operating portal for your team.
                </h2>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                  We turn your brand into a living portal where marketing, product, sales, and leadership can download assets, copy rules, CSS variables, motion presets, and campaign templates.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {governance.slice(0, 4).map((item) => (
                    <Requirement key={item} isDark={isDark} label={item} />
                  ))}
                </div>
              </div>

              <BrandPortalVisual isDark={isDark} />
            </div>
          </GlassCard>
        </section>

        {/* ROI */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <GlassCard isDark={isDark} className="p-8">
              <Eyebrow isDark={isDark}>Stripe-style trust section</Eyebrow>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                Brand ROI is operational clarity made visible.
              </h2>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
                A systemic brand improves how fast people understand you, trust you, click you, buy from you, and join you.
              </p>
            </GlassCard>

            <ROITable isDark={isDark} />
          </div>
        </section>


        <section className="mx-auto mt-24 max-w-7xl px-6">
          <GlassCard isDark={isDark} className="p-8">
            <Eyebrow isDark={isDark}>Built for modern SaaS stacks</Eyebrow>
            <h2 className={`mt-4 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Designed to integrate with the tools modern SaaS teams already use.
            </h2>
            <p className={`mt-3 max-w-3xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We structure brand systems to work cleanly across design, website, documentation, payments, CRM, and growth workflows — so your team can execute without rebuilding the brand from scratch.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {ecosystemLogos.map((logo) => (
                <div
                  key={logo.name}
                  className={`group relative overflow-hidden rounded-[1.5rem] border p-5 text-center transition duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                    isDark
                      ? "border-white/10 bg-black/25 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                      : "border-white bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)]"
                  }`}
                >
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#635bff]/10 blur-2xl transition group-hover:bg-cyan-400/15" />
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80">
                    <EcosystemLogo name={logo.name} />
                  </div>
                  <div className={`relative mt-4 text-sm font-semibold ${isDark ? "text-white/80" : "text-slate-700"}`}>
                    {logo.label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* ENGAGEMENT TIERS */}
        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow isDark={isDark}>Engagement tiers</Eyebrow>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              Choose the level of brand architecture your team needs.
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              No generic packages. Each engagement is scoped around your current stage, launch pressure, and how deeply the brand needs to integrate with product, marketing, and sales.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                tier: "Brand Starter",
                label: "Foundation",
                desc: "For teams that need a clean, professional identity system and launch-ready basics.",
                items: ["Logo direction", "Color and typography system", "Basic voice rules", "Starter brand guidelines"],
              },
              {
                tier: "Brand System",
                label: "Most requested",
                desc: "For SaaS teams that need a complete visual, verbal, product, and campaign identity system.",
                items: ["Full visual identity", "Product UI brand kit", "Campaign identity system", "Living brand guidelines"],
                featured: true,
              },
              {
                tier: "Enterprise Brand Architecture",
                label: "Scale",
                desc: "For growing teams that need governance, multi-market consistency, and operational brand control.",
                items: ["Brand governance portal", "Multi-team usage rules", "Executive narrative system", "Advanced campaign architecture"],
              },
            ].map((tier) => (
              <EngagementTierCard key={tier.tier} isDark={isDark} {...tier} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-24 max-w-5xl px-6 text-center">
          <GlassCard isDark={isDark} className="p-10">
            <Eyebrow isDark={isDark}>Brand Systems by Shata Solutions</Eyebrow>
            <h2 className={`mt-4 text-3xl font-semibold tracking-tight md:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
              Ready to turn your brand into a scalable business system?
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
              We’ll audit your current perception, define your strategic position, architect your identity, and package it into a living system your team can actually use.
            </p>
            <Link
              href="/contact?type=branding"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#EF233C] via-[#635bff] to-blue-600 px-8 py-3.5 font-semibold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:scale-[1.02]"
            >
              Request a Brand System Proposal →
            </Link>
          </GlassCard>
        </section>
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function BrandCommandCenter({ isDark }: { isDark: boolean }) {
  return (
    <div className="group relative mx-auto h-[620px] w-full max-w-[600px] perspective-[1500px]">
      <div className="absolute left-1/2 top-1/2 h-[515px] w-[515px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/22 blur-[115px] transition duration-700 group-hover:scale-110" />
      <div
        className={`absolute inset-x-2 top-2 rotate-[1deg] rounded-[2.65rem] border p-6 backdrop-blur-2xl transition duration-700 group-hover:-translate-y-3 group-hover:rotate-[1.5deg] ${
          isDark
            ? "border-white/15 bg-white/[0.08] shadow-[0_80px_220px_rgba(0,0,0,0.65),0_0_120px_rgba(99,91,255,0.18)]"
            : "border-white/80 bg-white/90 shadow-[0_50px_150px_rgba(15,23,42,0.16)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className={isDark ? "text-xs text-white/40" : "text-xs text-slate-400"}>Brand Command Center</div>
            <div className={`mt-1 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>Shata Express</div>
          </div>
          <div className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs text-red-400">Live system</div>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <BrandImagePanel
            isDark={isDark}
            title="Logo system"
            value="12 marks"
            image="/branding/logo-system.png"
            accent="from-blue-600 to-cyan-400"
          />
          <BrandImagePanel
            isDark={isDark}
            title="UI tokens"
            value="48 styles"
            image="/branding/ui-tokens.png"
            accent="from-indigo-500 to-blue-500"
          />
          <BrandImagePanel
            isDark={isDark}
            title="Social assets"
            value="9-grid"
            image="/branding/social-assets.png"
            accent="from-sky-500 to-indigo-500"
          />
          <BrandImagePanel
            isDark={isDark}
            title="Voice system"
            value="EN + AR"
            image="/branding/voice-system.png"
            accent="from-cyan-400 to-blue-600"
          />
        </div>

        <div className={`mt-5 rounded-3xl border p-3 ${isDark ? "border-white/10 bg-black/25" : "border-slate-200 bg-white/80"}`}>
          <div className="grid grid-cols-3 gap-3">
            {["Logo", "UI", "Social", "Ads", "Deck", "Wiki"].map((item) => (
              <div key={item} className="rounded-2xl bg-gradient-to-br from-[#EF233C] via-[#635bff] to-cyan-400 p-[1px]">
                <div className={`rounded-2xl px-3 py-2.5 text-center text-[11px] font-semibold ${isDark ? "bg-slate-950/80 text-white" : "bg-white/85 text-slate-900"}`}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatingBadge isDark={isDark} className="bottom-10 -left-4" label="Brand clarity" value="+84%" />
      <FloatingBadge isDark={isDark} className="bottom-8 -right-4" label="Asset speed" value="3.2x" />
    </div>
  );
}


function BrandImagePanel({
  isDark,
  title,
  value,
  image,
  accent,
}: {
  isDark: boolean;
  title: string;
  value: string;
  image: string;
  accent: string;
}) {
  return (
    <div
      className={`group/panel relative overflow-hidden rounded-3xl border p-2.5 transition duration-500 hover:-translate-y-1 ${
        isDark
          ? "border-white/10 bg-black/25 shadow-[0_26px_80px_rgba(0,0,0,0.42)]"
          : "border-white bg-white/90 shadow-[0_22px_70px_rgba(15,23,42,0.14)]"
      }`}
    >
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${accent} opacity-25 blur-2xl transition group-hover/panel:scale-125`} />

      <div className="relative overflow-hidden rounded-[1.35rem] bg-slate-950/5">
        <img
          src={image}
          alt={`${title} visual`}
          className="h-[150px] w-full object-cover transition duration-500 group-hover/panel:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="relative flex items-center justify-between gap-3 px-2 pb-1 pt-3">
        <div className="min-w-0">
          <div className={isDark ? "truncate text-[10px] uppercase tracking-[0.2em] text-white/40" : "truncate text-[10px] uppercase tracking-[0.2em] text-slate-400"}>
            {title}
          </div>
          <div className={`mt-1 text-base font-semibold leading-tight ${isDark ? "text-white" : "text-slate-950"}`}>
            {value}
          </div>
        </div>
        <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${accent}`} />
      </div>
    </div>
  );
}

function BrandPillar({ isDark, eyebrow, title, desc, features, kind, index }: { isDark: boolean; eyebrow: string; title: string; desc: string; features: string[]; kind: string; index: number }) {
  return (
    <div className={`group relative min-h-[390px] overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:scale-[1.02] ${isDark ? "border-white/10 bg-white/[0.05] hover:bg-white/[0.07] shadow-[0_35px_110px_rgba(0,0,0,0.45)]" : "border-white bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.11)]"}`}>
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#635bff]/10 blur-[80px] transition group-hover:scale-125" />
      <div className="relative">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.25em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"}>{eyebrow} · 0{index + 1}</div>
        <h3 className={`mt-4 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
        <p className={`mt-3 max-w-xl text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{desc}</p>
        <BrandVisual kind={kind} />
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <Requirement key={feature} isDark={isDark} label={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandVisual({ kind }: { kind: string }) {
  if (kind === "audit") {
    return (
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#07142a] p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300/70">Market analysis</div>
            <div className="mt-1 text-sm font-semibold text-white">Brand Positioning Index</div>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
            Live audit
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-end gap-2 h-28">
              {[
                { label: "You", value: 86, color: "from-blue-500 to-cyan-300" },
                { label: "C1", value: 62, color: "from-slate-500 to-slate-300" },
                { label: "C2", value: 54, color: "from-slate-500 to-slate-300" },
                { label: "C3", value: 71, color: "from-slate-500 to-slate-300" },
                { label: "Gap", value: 38, color: "from-rose-500 to-orange-300" },
              ].map((item) => (
                <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-xl bg-gradient-to-t ${item.color} shadow-[0_0_24px_rgba(37,99,235,0.25)]`}
                    style={{ height: `${item.value}%` }}
                  />
                  <div className="text-[10px] font-medium text-white/45">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="grid gap-3">
              {[
                ["Awareness", "72%", "w-[72%]"],
                ["Trust", "86%", "w-[86%]"],
                ["Differentiation", "64%", "w-[64%]"],
              ].map(([label, value, width]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                    <span>{label}</span>
                    <span className="font-semibold text-blue-200">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className={`h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-300 ${width}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-blue-400/15 bg-blue-400/10 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-blue-200/70">Opportunity gap</div>
              <div className="mt-1 text-sm font-semibold text-white">Own the premium logistics-tech narrative.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "identity") {
    return (
      <div className="mt-8 grid grid-cols-4 gap-3">
        {["Aa", "#", "◈", "↗"].map((item) => (
          <div key={item} className="flex min-h-[80px] items-center justify-center rounded-[1.35rem] bg-white text-2xl font-bold text-slate-950 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (kind === "product") {
    return (
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#07142a] p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200">
            Product UI Kit
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-2 rounded-xl bg-blue-500/15 px-3 py-2 text-xs font-semibold text-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              Dashboard
            </div>
            <div className="mt-3 space-y-2">
              {["Components", "States", "Tokens", "Motion"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/60">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600/40 to-cyan-400/20 p-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-blue-100/70">MRR</div>
                <div className="mt-1 text-2xl font-semibold text-white">$84.2k</div>
                <div className="mt-3 h-2 rounded-full bg-white/15">
                  <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" />
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/35 to-blue-400/20 p-3">
                <div className="text-[10px] uppercase tracking-[0.18em] text-blue-100/70">Activation</div>
                <div className="mt-1 text-2xl font-semibold text-white">68%</div>
                <div className="mt-3 flex h-10 items-end gap-1.5">
                  {[35, 52, 44, 74, 61, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-full bg-gradient-to-t from-blue-600 to-cyan-300" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Primary", "Hover", "Success"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-center text-[10px] font-semibold text-white/65">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-5 shadow-2xl">
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-2xl bg-white px-4 py-5 text-2xl font-bold text-slate-950">EN</div>
        <div className="rounded-2xl bg-white px-4 py-5 text-2xl font-bold text-slate-950">AR</div>
      </div>
    </div>
  );
}

function MiniInstagramPreview() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-2xl ring-1 ring-white/10">
      <img
        src="/branding/shata-campaign-main.png"
        alt="Shata Express full social media campaign presentation"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function CampaignTile({
  isDark,
  number,
  trait,
  headline,
  direction,
  image,
}: {
  isDark: boolean;
  number: string;
  trait: string;
  headline: string;
  direction: string;
  image: string;
}) {
  return (
    <div className={`group overflow-hidden rounded-[1.75rem] border backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:scale-[1.02] ${isDark ? "border-white/10 bg-white/[0.05] shadow-[0_30px_90px_rgba(0,0,0,0.38)]" : "border-white bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.10)]"}`}>
      <div className="relative aspect-square overflow-hidden bg-slate-950">
        <img
          src={image}
          alt={`Shata Express campaign post ${number} - ${trait}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-70" />
      </div>
      <div className="p-5">
        <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.22em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"}>{trait}</div>
        <h3 className={`mt-2 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{headline}</h3>
        <div className={isDark ? "mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/35" : "mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"}>3D art direction</div>
        <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-slate-600"}`}>{direction}</p>
      </div>
    </div>
  );
}

function ROITable({ isDark }: { isDark: boolean }) {
  return (
    <GlassCard isDark={isDark} className="overflow-hidden">
      <div className="grid grid-cols-3 border-b border-slate-200/20 px-5 py-3 text-xs font-semibold uppercase tracking-wider">
        <div>Metric</div>
        <div>Generic SaaS Brand</div>
        <div>Systemic Brand</div>
      </div>
      {roiRows.map((row) => (
        <div key={row.metric} className={`grid grid-cols-3 gap-3 border-b px-5 py-4 text-sm last:border-b-0 ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className={`font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{row.metric}</div>
          <div className={isDark ? "text-white/55" : "text-slate-500"}>{row.generic}</div>
          <div className={isDark ? "text-cyan-300" : "text-[#635bff]"}>{row.systemic}</div>
        </div>
      ))}
    </GlassCard>
  );
}


function EcosystemLogo({ name }: { name: string }) {
  if (name === "figma") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <circle cx="26" cy="16" r="8" fill="#F24E1E" />
        <circle cx="38" cy="16" r="8" fill="#FF7262" />
        <circle cx="26" cy="32" r="8" fill="#A259FF" />
        <circle cx="38" cy="32" r="8" fill="#1ABCFE" />
        <circle cx="26" cy="48" r="8" fill="#0ACF83" />
      </svg>
    );
  }

  if (name === "framer") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <rect x="10" y="8" width="44" height="48" rx="12" fill="#111827" />
        <path d="M22 14h22v12H32l12 12H22V14Zm0 24h22L32 50H22V38Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "webflow") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="12" fill="#146EF5" />
        <path d="M48 25 41 43h-7l3-8-5 8h-7l3-7-5 7h-7l9-18h7l-3 8 5-8h7l-3 8 3-8h6Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "stripe") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <rect x="8" y="12" width="48" height="40" rx="11" fill="#635BFF" />
        <path d="M38 30c-4.5-1.5-6-2.4-6-4 0-1.4 1.2-2.3 3.6-2.3 2.7 0 5.5.9 7.5 2v-6.2c-1.8-.8-4.4-1.5-7.5-1.5-6.8 0-11.1 3.5-11.1 8.8 0 4.8 3.5 6.8 9 8.6 3.7 1.3 5 2.2 5 3.9 0 1.6-1.4 2.5-4 2.5-3.1 0-6.4-1.2-8.7-2.6v6.4c2.1 1.1 5.3 2 9 2 7.2 0 11.7-3.4 11.7-9.1 0-4.8-3-6.6-8.5-8.5Z" fill="#fff" />
      </svg>
    );
  }

  if (name === "notion") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="7" fill="#fff" stroke="#111827" strokeWidth="4" />
        <path d="M22 45V20h5l13 18V20h5v25h-5L27 27v18h-5Z" fill="#111827" />
      </svg>
    );
  }

  if (name === "hubspot") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <circle cx="32" cy="34" r="12" fill="#FF7A59" />
        <circle cx="48" cy="18" r="6" fill="#FF7A59" />
        <circle cx="17" cy="20" r="5" fill="#FF7A59" />
        <path d="M21 23l8 7M40 27l6-6M32 22V12" stroke="#FF7A59" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="34" r="5" fill="#fff" />
      </svg>
    );
  }

  return null;
}


function FloatingBadge({ isDark, className, label, value }: { isDark: boolean; className: string; label: string; value: string }) {
  return (
    <div className={`absolute ${className} rounded-2xl border p-4 shadow-xl backdrop-blur-2xl transition duration-700 group-hover:-translate-y-2 ${isDark ? "border-white/10 bg-white/10 text-white" : "border-white/70 bg-white/80 text-slate-900"}`}>
      <div className={isDark ? "text-xs text-white/50" : "text-xs text-slate-400"}>{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Requirement({ isDark, label }: { isDark: boolean; label: string }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-white/10 bg-black/20 text-white/75" : "border-slate-200 bg-white/80 text-slate-700"}`}>
      <span className={isDark ? "text-cyan-300" : "text-[#635bff]"}>✓</span> {label}
    </div>
  );
}

function GlassCard({ isDark, className = "", children }: { isDark: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-[2rem] border backdrop-blur-xl ${isDark ? "border-white/10 bg-white/[0.05] shadow-[0_35px_110px_rgba(0,0,0,0.40)]" : "border-white bg-white/85 shadow-[0_30px_100px_rgba(15,23,42,0.10)]"} ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return <div className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? "text-indigo-300" : "text-[#635bff]"}`}>{children}</div>;
}
function WhatYouGetCard({ isDark, title, desc, index }: { isDark: boolean; title: string; desc: string; index: number }) {
  const accents = [
    "from-blue-600 to-cyan-400",
    "from-indigo-500 to-blue-500",
    "from-sky-500 to-indigo-500",
    "from-cyan-400 to-blue-600",
    "from-violet-500 to-sky-400",
    "from-blue-500 to-slate-400",
  ];

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-2 ${
        isDark
          ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.34)]"
          : "border-white bg-white/90 shadow-[0_22px_70px_rgba(15,23,42,0.09)]"
      }`}
    >
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accents[index]} opacity-20 blur-3xl transition group-hover:scale-125`} />
      <div className="relative">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accents[index]} text-sm font-bold text-white shadow-[0_18px_45px_rgba(37,99,235,0.28)]`}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className={`mt-6 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
          {title}
        </h3>
        <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}
function BrandPortalVisual({ isDark }: { isDark: boolean }) {
  const portalItems = [
    ["Brand Portal", "Private team hub", "from-blue-600 to-cyan-400"],
    ["Assets", "Logos, images, exports", "from-indigo-500 to-blue-500"],
    ["CSS Tokens", "Colors, shadows, radius", "from-cyan-400 to-blue-600"],
    ["Templates", "Posts, decks, launch kits", "from-sky-500 to-indigo-500"],
    ["Motion Presets", "Reels, demos, transitions", "from-violet-500 to-sky-400"],
    ["Usage Rules", "Clear space, contrast, do/don’t", "from-blue-500 to-slate-400"],
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-4 backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-black/25 shadow-[0_35px_110px_rgba(0,0,0,0.42)]"
          : "border-white bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.12)]"
      }`}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/14 blur-[90px]" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#635bff]/14 blur-[90px]" />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07142a]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
            Live brand portal
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-[0.62fr_1.38fr]">
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-4 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white">Shata Brand OS</div>
            {[
              "Overview",
              "Logos",
              "Tokens",
              "Templates",
              "Motion",
              "Rules",
            ].map((item, index) => (
              <div
                key={item}
                className={`mb-2 rounded-xl px-3 py-2 text-[11px] ${
                  index === 0 ? "bg-blue-500/18 text-blue-100" : "text-white/50 hover:bg-white/[0.06]"
                }`}
              >
                {item}
              </div>
            ))}
          </aside>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300/70">Governance dashboard</div>
                <div className="mt-1 text-xl font-semibold text-white">Everything your team needs in one place.</div>
              </div>
              <div className="hidden rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300 sm:block">Synced</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {portalItems.map(([title, desc, accent]) => (
                <div key={title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:-translate-y-1">
                  <div className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl transition group-hover:scale-125`} />
                  <div className={`relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-xs font-bold text-white shadow-lg`}>
                    ✦
                  </div>
                  <div className="relative text-sm font-semibold text-white">{title}</div>
                  <div className="relative mt-1 text-[11px] leading-5 text-white/52">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function EngagementTierCard({
  isDark,
  tier,
  label,
  desc,
  items,
  featured,
}: {
  isDark: boolean;
  tier: string;
  label: string;
  desc: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-2 ${
        featured
          ? "border-[#635bff]/45 bg-gradient-to-br from-[#635bff]/16 via-blue-500/10 to-cyan-400/10 shadow-[0_28px_90px_rgba(99,91,255,0.24)]"
          : isDark
            ? "border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.30)]"
            : "border-white bg-white/90 shadow-[0_22px_70px_rgba(15,23,42,0.09)]"
      }`}
    >
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="relative flex min-h-[430px] flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.24em] text-white/35" : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"}>
            {label}
          </div>
          {featured ? (
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#635bff] shadow-sm">
              Recommended
            </span>
          ) : null}
        </div>

        <h3 className={`mt-5 text-2xl font-semibold leading-tight ${isDark ? "text-white" : "text-slate-950"}`}>
          {tier}
        </h3>
        <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/62" : "text-slate-600"}`}>{desc}</p>

        <div className="mt-6 space-y-2">
          {items.map((item) => (
            <div key={item} className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-white/10 bg-black/15 text-white/70" : "border-slate-200 bg-white/70 text-slate-700"}`}>
              <span className={isDark ? "text-cyan-300" : "text-[#635bff]"}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/contact?type=branding&tier=${encodeURIComponent(tier)}`}
          className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition hover:scale-[1.02] ${
            featured
              ? "bg-gradient-to-r from-[#635bff] to-cyan-500 text-white shadow-[0_18px_55px_rgba(99,91,255,0.28)]"
              : isDark
                ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
          }`}
        >
          Request proposal →
        </Link>
      </div>
    </div>
  );
}