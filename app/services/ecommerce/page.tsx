"use client";

import Link from "next/link";

import GlobalStyles from "@/components/home/GlobalStyles";
import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useTheme } from "@/lib/hooks";

const buildOptions = [
  {
    title: "Import from Shopify",
    desc: "Move products, categories, checkout logic, and customer flows into a faster managed commerce layer.",
    signal: "Migration-ready",
  },
  {
    title: "AI Product Generator",
    desc: "Generate product titles, descriptions, SEO metadata, variants, and launch-ready product pages from raw inventory data.",
    signal: "AI-assisted catalog",
  },
  {
    title: "Social-to-Store Sync",
    desc: "Turn Instagram, TikTok, WhatsApp, and campaign content into shoppable product flows connected to your store.",
    signal: "Social commerce",
  },
  {
    title: "Managed Store Setup",
    desc: "We configure storefront, checkout, shipping, tax, analytics, automation, and conversion flows end-to-end.",
    signal: "Done-for-you launch",
  },
] as const;

const showcasePanels = [
  {
    title: "Dynamic Checkout",
    eyebrow: "Payments",
    desc: "One-click Apple Pay, Stripe Pay, wallet-ready checkout, and conversion-optimized payment flows.",
    metric: "+18% checkout lift",
    variant: "checkout",
    video: "/videos/ecommerce/dynamic-checkout.mp4",
  },
  {
    title: "Inventory Command",
    eyebrow: "Operations",
    desc: "Real-time stock sync across storefront, campaigns, marketplaces, and internal order workflows.",
    metric: "Live stock sync",
    variant: "inventory",
    video: "/videos/ecommerce/inventory-command.mp4",
  },
  {
    title: "Conversion Analytics",
    eyebrow: "Revenue intelligence",
    desc: "High-end dashboards for LTV, AOV, conversion rate, cart recovery, and revenue velocity.",
    metric: "LTV / AOV tracked",
    variant: "analytics",
    video: "/videos/ecommerce/conversion-analytics.mp4",
  },
] as const;

const ecommerceTemplates = [
  {
    title: "Fashion Storefront",
    tag: "Catalog + checkout",
    desc: "Premium product grids, variant selectors, size guides, cart recovery, and campaign-ready landing pages.",
    metric: "36 product launch",
    variant: "fashion",
  },
  {
    title: "Restaurant Ordering",
    tag: "Menu + delivery",
    desc: "Digital menus, combos, payment links, delivery zones, WhatsApp ordering, and reservation flows.",
    metric: "Menu to order",
    variant: "restaurant",
  },
  {
    title: "Electronics Store",
    tag: "Specs + warranty",
    desc: "Product specs, bundles, comparison cards, warranty notes, and lead capture for high-ticket products.",
    metric: "AOV focused",
    variant: "electronics",
  },
  {
    title: "Beauty & Cosmetics",
    tag: "Bundles + offers",
    desc: "Bundles, before/after proof sections, influencer campaign pages, and subscription-friendly product flows.",
    metric: "Bundle ready",
    variant: "beauty",
  },
  {
    title: "Supermarket Online",
    tag: "Categories + offers",
    desc: "Categories, weekly offers, delivery areas, branch pickup, WhatsApp orders, and fast reorder journeys.",
    metric: "Fast reorder",
    variant: "supermarket",
  },
] as const;

const managedDifferences = [
  {
    title: "Abandoned Cart Recovery",
    desc: "Automated recovery flows through email, SMS, WhatsApp, and retargeting-ready events.",
  },
  {
    title: "Global Tax / VAT Logic",
    desc: "Stripe Tax-style setup for regional tax rules, invoices, compliance workflows, and checkout accuracy.",
  },
  {
    title: "Edge Delivery Speed",
    desc: "Next.js/Vercel-grade architecture for fast pages, low latency, and conversion-friendly load times.",
  },
  {
    title: "PCI-DSS Ready Checkout",
    desc: "Payment flows are designed around secure providers and trusted checkout infrastructure.",
  },
] as const;

const storeFeatures = [
  {
    title: "Multi-currency Support",
    desc: "Present prices and checkout flows for global customers with localized currency logic.",
  },
  {
    title: "AI Product Descriptions",
    desc: "Generate premium product copy, benefits, specs, SEO snippets, and category descriptions.",
  },
  {
    title: "Shipping Label Automation",
    desc: "Prepare FedEx, Aramex, DHL, or local carrier workflows for faster fulfillment.",
  },
  {
    title: "Headless API Foundation",
    desc: "Structure your catalog, checkout, and customer data for future apps, dashboards, and automation.",
  },
  {
    title: "Conversion Optimization",
    desc: "Improve product pages, bundles, trust sections, urgency blocks, and checkout microcopy.",
  },
  {
    title: "Edge Functions",
    desc: "Use fast server-side logic for forms, checkout routing, product availability, and lead capture.",
  },
  {
    title: "Order Notifications",
    desc: "Connect confirmations, fulfillment alerts, and internal notifications across email and WhatsApp.",
  },
  {
    title: "PCI-DSS Level 1 Providers",
    desc: "Build around payment infrastructure trusted for secure card and wallet processing.",
  },
  {
    title: "Revenue Dashboard",
    desc: "Track orders, AOV, LTV, conversion signals, recovery flows, and growth experiments in one place.",
  },
] as const;

const plans = [
  {
    name: "Starter Store",
    desc: "For brands launching a focused catalog with clean checkout and essential automation.",
    items: [
      "Product catalog setup",
      "Checkout and payment setup",
      "Basic shipping rules",
      "Lead and order notifications",
      "Analytics foundation",
      "Launch support",
    ],
    cta: "Start store setup",
    featured: false,
  },
  {
    name: "Growth Engine",
    desc: "For growing stores that need automation, analytics, cart recovery, and campaign-ready flows.",
    items: [
      "Advanced product pages",
      "Abandoned cart recovery",
      "Multi-currency support",
      "Conversion analytics",
      "Shipping label workflows",
      "Campaign landing pages",
    ],
    cta: "Build growth engine",
    featured: true,
  },
  {
    name: "Enterprise Commerce",
    desc: "For teams building high-scale commerce systems with headless architecture and custom workflows.",
    items: [
      "Headless API planning",
      "Custom checkout logic",
      "Tax / VAT workflow support",
      "Multi-channel inventory logic",
      "Custom dashboards",
      "Priority commerce support",
    ],
    cta: "Request architecture plan",
    featured: false,
  },
] as const;

const faqs = [
  ["Can you migrate my Shopify store?", "Yes. We can migrate products, categories, core content, and rebuild the storefront experience around a faster managed commerce flow."],
  ["Do you support Stripe payments?", "Yes. We can configure Stripe-powered checkout flows, wallet payments, payment links, and conversion-friendly checkout journeys."],
  ["Can customers use Apple Pay or Google Pay?", "Yes, depending on the selected payment provider and country availability, we can prepare wallet-ready checkout flows."],
  ["Is the checkout secure?", "We build around trusted payment providers and PCI-DSS Level 1 infrastructure instead of storing card data directly inside your website."],
  ["Can you connect PayPal?", "Yes. PayPal can be added when it fits the target market and checkout strategy."],
  ["Do you handle taxes and VAT?", "We can design tax/VAT workflows and integrate provider-supported tax logic. Exact availability depends on country, entity, and payment provider."],
  ["Can you automate shipping labels?", "Yes. We can prepare workflows for FedEx, Aramex, DHL, or local carriers where integrations and account access are available."],
  ["Can I sell in multiple currencies?", "Yes. We can structure multi-currency display and checkout logic depending on the provider and business requirements."],
  ["Can you recover abandoned carts?", "Yes. We can set up recovery flows through email, SMS, WhatsApp, or retargeting-ready events."],
  ["Will I get analytics?", "Yes. We can track conversion rate, order volume, AOV, LTV signals, cart recovery, and campaign performance."],
  ["Can this connect to CRM or automation?", "Yes. Forms, orders, customers, and campaigns can be connected to CRM-ready workflows and automations."],
  ["Do I need technical experience?", "No. Shata handles setup, architecture, payments, storefront flow, and launch support so you can focus on products and growth."],
] as const;

export default function EcommercePage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#050b16] text-white" : "bg-[#f6f9ff] text-slate-950"}`}>
      <GlobalStyles />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        openOnboarding={() => {}}
        openDashboard={() => {}}
      />

      <main className="relative min-h-screen overflow-hidden pt-28">
        <CommerceBackground isDark={isDark} />
        <Hero isDark={isDark} />
        <BuildOptions isDark={isDark} />
        <InteractiveShowcase isDark={isDark} />
        <TemplateMediaStrip isDark={isDark} />
        <ManagedDifference isDark={isDark} />
        <FeatureBento isDark={isDark} />
        <PlansSection isDark={isDark} />
        <FAQSection isDark={isDark} />
        <HeroImagePrompt isDark={isDark} />
        <FinalCTA />
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}

function CommerceBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 ${isDark ? "bg-[#050b16]" : "bg-[#f6f9ff]"}`} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,91,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />
      <div className="absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-[#635bff]/25 blur-[140px]" />
      <div className="absolute -right-40 top-56 h-[560px] w-[560px] rounded-full bg-[#00F5A0]/15 blur-[140px]" />
      <div className="absolute left-1/3 top-[620px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[130px]" />
    </div>
  );
}

function Hero({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative px-6 pb-20 pt-28 md:px-10 lg:px-16 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold backdrop-blur-xl ${isDark ? "border-white/10 bg-white/[0.06] text-white/75" : "border-slate-200 bg-white/80 text-slate-600 shadow-sm"}`}>
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
            Ecommerce-as-a-Service
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.07em] md:text-7xl">
            Commerce without the complexity.
          </h1>
          <p className={`mt-7 max-w-2xl text-lg leading-8 ${isDark ? "text-white/66" : "text-slate-600"}`}>
            Launch a conversion-ready ecommerce system with payments, inventory, shipping workflows, analytics, automation, and high-speed storefront architecture managed by Shata.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact?type=ecommerce"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-7 py-4 text-sm font-bold text-white shadow-[0_22px_70px_rgba(99,91,255,0.35)] transition hover:-translate-y-1"
            >
              Build my store
            </Link>
            <Link
              href="#features"
              className={`inline-flex items-center justify-center rounded-full border px-7 py-4 text-sm font-bold transition hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/[0.06] text-white hover:bg-white/10" : "border-slate-200 bg-white/80 text-slate-700 hover:bg-white"}`}
            >
              Explore commerce stack
            </Link>
          </div>
        </div>

        <FloatingStorefront />
      </div>
    </section>
  );
}

function FloatingStorefront() {
  return (
    <div className="relative mx-auto h-[640px] w-full max-w-[660px] [perspective:1800px]">
      <div className="absolute inset-8 rounded-full bg-[#635bff]/30 blur-[120px]" />
      <div className="absolute inset-x-4 top-8 rotate-[1.3deg] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-5 shadow-[0_50px_150px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-700 hover:-translate-y-4 hover:rotate-0 hover:[transform:rotateX(5deg)_rotateY(-7deg)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(99,91,255,0.22),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(0,245,160,0.14),transparent_30%)]" />
        <div className="relative rounded-[2rem] border border-white/10 bg-[#060b17]/85 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.32em] text-white/35">Commerce OS</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">Modern E-commerce Command Center</div>
            </div>
            <div className="rounded-full bg-[#00F5A0]/10 px-3 py-1.5 text-xs font-bold text-cyan-500">Revenue live</div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] bg-white p-4 text-slate-950 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                <span>Storefront</span>
                <span>checkout ready</span>
              </div>
              <div className="mt-5 h-32 rounded-[1.2rem] bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-300" />
              <div className="mt-5 text-3xl font-semibold tracking-[-0.045em]">Premium product page.</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["L", "M", "XL"].map((size) => (
                  <div key={size} className="rounded-xl bg-slate-100 py-3 text-center text-xs font-black text-slate-500">{size}</div>
                ))}
              </div>
              <div className="mt-4 rounded-full bg-slate-950 py-3 text-center text-xs font-black text-white">ADD TO CART</div>
            </div>

            <div className="space-y-3">
              {[
                ["AOV", "$82.40", "+12%"],
                ["LTV", "$219", "+24%"],
                ["Cart recovery", "18", "active"],
              ].map(([label, value, badge]) => (
                <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center justify-between text-xs text-white/45"><span>{label}</span><span className="text-cyan-500">{badge}</span></div>
                  <div className="mt-2 text-2xl font-semibold">{value}</div>
                </div>
              ))}
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
                <div className="mb-4 text-xs text-white/45">Revenue curve</div>
                <div className="flex h-20 items-end gap-2">
                  {[34, 46, 38, 62, 58, 78, 92].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-lg bg-gradient-to-t from-[#635bff] to-[#00F5A0]" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildOptions({ isDark }: { isDark: boolean }) {
  return (
    <section className="px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader isDark={isDark} eyebrow="Launch paths" title="Start from your current commerce reality." copy="Import an existing catalog, generate products with AI, sync social channels, or let Shata manage the entire launch path." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {buildOptions.map((option, index) => (
            <Surface key={option.title} isDark={isDark} className="p-6 transition hover:-translate-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635bff] to-cyan-400 text-sm font-black text-white">0{index + 1}</div>
              <div className={`mt-6 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{option.title}</div>
              <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/58" : "text-slate-600"}`}>{option.desc}</p>
              <div className="mt-5 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-500">{option.signal}</div>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveShowcase({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative overflow-hidden px-0 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeader
          isDark={isDark}
          eyebrow="Commerce intelligence"
          title="Checkout, inventory, and revenue systems in motion."
          copy="Duda-style horizontal commerce panels showing the operational layers behind every store — checkout, inventory sync, and analytics."
        />
      </div>

      <div className="mt-12 w-full overflow-x-auto overflow-y-hidden px-6 pb-4 md:px-10 lg:px-16">
        <div className="flex min-w-[1080px] gap-4">
          {showcasePanels.map((panel) => (
            <ShowcasePanel key={panel.title} panel={panel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcasePanel({ panel }: { panel: (typeof showcasePanels)[number] }) {
  return (
    <div className="group relative h-[520px] min-w-[280px] flex-[1] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.28)] transition-all duration-700 hover:flex-[2.05]">
      <div className="absolute inset-0 opacity-95 transition duration-700 group-hover:scale-105 group-hover:opacity-100">
        <video
          src={panel.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-6 pt-28 text-white">
        <div className="translate-y-8 transition duration-500 group-hover:translate-y-0">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500">{panel.eyebrow}</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{panel.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65 opacity-0 transition duration-500 group-hover:opacity-100">{panel.desc}</p>
          <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 opacity-0 transition duration-500 group-hover:opacity-100">{panel.metric}</div>
        </div>
      </div>
    </div>
  );
}

function TemplateMediaStrip({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative overflow-hidden px-0 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeader
          isDark={isDark}
          eyebrow="Ecommerce templates"
          title="Launch from high-converting store systems."
          copy="Not just themes — each template is shaped around products, checkout, fulfillment, analytics, and customer follow-up."
        />
      </div>

      <div className="mt-12 w-full overflow-x-auto overflow-y-hidden px-6 pb-4 md:px-10 lg:px-16">
        <div className="flex min-w-[1280px] gap-4">
          {ecommerceTemplates.map((template) => (
            <TemplatePanel key={template.title} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatePanel({ template }: { template: (typeof ecommerceTemplates)[number] }) {
  return (
    <div className="group relative h-[540px] min-w-[245px] flex-[1] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.28)] transition-all duration-700 hover:flex-[2.25]">
      <div className="absolute inset-0 transition duration-700 group-hover:scale-105">
        <TemplateVisual variant={template.variant} title={template.title} tag={template.tag} />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 pt-32 text-white">
        <div className="translate-y-9 transition duration-500 group-hover:translate-y-0">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500">{template.tag}</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{template.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65 opacity-0 transition duration-500 group-hover:opacity-100">{template.desc}</p>
          <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 opacity-0 transition duration-500 group-hover:opacity-100">{template.metric}</div>
        </div>
      </div>
    </div>
  );
}

function TemplateVisual({ variant, title, tag }: { variant: string; title: string; tag: string }) {
  const bars = variant === "supermarket" ? [68, 82, 74, 92, 58] : variant === "electronics" ? [90, 64, 78, 86, 70] : [52, 78, 66, 88, 74];

  return (
    <div className="h-full bg-[radial-gradient(circle_at_20%_10%,rgba(99,91,255,0.36),transparent_32%),radial-gradient(circle_at_80%_25%,rgba(0,245,160,0.14),transparent_28%),linear-gradient(135deg,#020617,#0f172a)] p-6">
      <div className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
          <span>{tag}</span>
          <span>Live demo</span>
        </div>
        <div className="mt-6 h-32 rounded-[1.2rem] bg-gradient-to-br from-[#635bff] via-blue-500 to-cyan-300" />
        <div className="mt-5 text-3xl font-semibold leading-none tracking-[-0.05em]">{title}</div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["01", "02", "03"].map((item) => (
            <div key={item} className="rounded-xl bg-slate-100 py-3 text-center text-xs font-black text-slate-500">{item}</div>
          ))}
        </div>
        <div className="mt-5 flex h-20 items-end gap-2 rounded-2xl bg-slate-950 p-3">
          {bars.map((height, index) => (
            <div key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-[#635bff] to-[#00F5A0]" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelVisual({ variant }: { variant: string }) {
  if (variant === "checkout") {
    return (
      <div className="h-full bg-[radial-gradient(circle_at_20%_10%,rgba(99,91,255,0.5),transparent_35%),linear-gradient(135deg,#020617,#0f172a)] p-6">
        <div className="rounded-[1.5rem] bg-white p-5 text-slate-950 shadow-2xl">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Express checkout</div>
          <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
            <div className="text-lg font-semibold">Apple Pay</div>
            <div className="mt-2 text-xs text-white/50">One tap checkout</div>
          </div>
          <div className="mt-3 rounded-2xl bg-[#635bff] p-5 text-sm font-black text-white">Stripe Pay ready</div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Visa", "ACH", "Wallet"].map((item) => (
              <div key={item} className="rounded-xl bg-slate-100 py-3 text-center text-[10px] font-black text-slate-500">{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inventory") {
    return (
      <div className="h-full bg-[linear-gradient(135deg,#020617,#111827)] p-6">
        <div className="grid grid-cols-2 gap-3">
          {["Store", "Instagram", "Warehouse", "Campaign"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <div className="text-xs text-white/45">{item}</div>
              <div className="mt-3 text-2xl font-semibold">{88 - index * 9}</div>
              <div className="mt-3 h-1.5 rounded-full bg-[#00F5A0]" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
          <div className="text-xs text-white/45">Sync status</div>
          <div className="mt-3 text-2xl font-semibold text-[#00F5A0]">Live inventory</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[linear-gradient(135deg,#020617,#0f172a)] p-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-white/45"><span>LTV</span><span>AOV</span></div>
        <div className="flex h-56 items-end gap-2">
          {[35, 48, 42, 66, 72, 62, 88, 96].map((height, index) => (
            <div key={index} className="flex-1 rounded-t-lg bg-gradient-to-t from-[#635bff] to-[#00F5A0]" style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.06] p-4"><div className="text-xs text-white/45">AOV</div><div className="mt-2 text-xl font-semibold">$82</div></div>
          <div className="rounded-2xl bg-white/[0.06] p-4"><div className="text-xs text-white/45">LTV</div><div className="mt-2 text-xl font-semibold">$219</div></div>
        </div>
      </div>
    </div>
  );
}

function ManagedDifference({ isDark }: { isDark: boolean }) {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader isDark={isDark} eyebrow="Managed commerce" title="More than a storefront. A revenue operating layer." copy="We combine checkout, automation, tax logic, speed, and analytics into a commerce system designed for velocity." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {managedDifferences.map((item) => (
            <div
              key={item.title}
              className={`rounded-[2rem] border p-6 backdrop-blur-xl transition hover:-translate-y-2 ${
                isDark
                  ? "border-white/10 bg-white/[0.055] shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
                  : "border-slate-200 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className="mb-7 h-20 rounded-2xl bg-gradient-to-br from-[#635bff]/30 to-cyan-400/20" />
              <div className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{item.title}</div>
              <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/58" : "text-slate-600"}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBento({ isDark }: { isDark: boolean }) {
  return (
    <section id="features" className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader isDark={isDark} eyebrow="Store features" title="Every store layer connected from day one." copy="From product copy to fulfillment logic, your commerce stack is built to sell, track, and scale." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {storeFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative overflow-hidden rounded-[2rem] border p-7 backdrop-blur-xl transition hover:-translate-y-2 ${
                isDark
                  ? "border-white/10 bg-white/[0.055] shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
                  : "border-slate-200 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-[#635bff]/20 blur-2xl" />
              <div className="relative">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-500">{String(index + 1).padStart(2, "0")}</div>
                <div className={`mt-5 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{feature.title}</div>
                <p className={`mt-4 text-base leading-7 ${isDark ? "text-white/60" : "text-slate-600"}`}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlansSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader isDark={isDark} eyebrow="Commerce plans" title="Choose the commerce layer that matches your growth stage." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[2rem] border p-7 transition hover:-translate-y-2 ${
                plan.featured
                  ? "border-[#635bff] bg-gradient-to-br from-[#635bff] to-cyan-500 text-white shadow-[0_30px_90px_rgba(99,91,255,0.35)]"
                  : isDark
                    ? "border-white/10 bg-white/[0.055] text-white shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
                    : "border-slate-200 bg-white/80 text-slate-950 shadow-[0_28px_90px_rgba(15,23,42,0.08)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-7 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#635bff]">
                  Recommended
                </div>
              )}

              <div className="text-2xl font-semibold">{plan.name}</div>

              <p className={`mt-4 text-base leading-7 ${
                plan.featured ? "text-white/75" : isDark ? "text-white/60" : "text-slate-600"
              }`}>
                {plan.desc}
              </p>

              <div className="mt-7 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <div
                    key={item}
                    className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                      plan.featured
                        ? "bg-white/12 text-white"
                        : isDark
                          ? "bg-white/[0.06] text-white"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact?type=ecommerce"
                className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black transition hover:-translate-y-1 ${
                  plan.featured
                    ? "bg-white text-[#635bff]"
                    : isDark
                      ? "bg-white text-slate-950"
                      : "bg-slate-950 text-white"
                }`}
              >
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader isDark={isDark} eyebrow="FAQ" title="Payments, security, migration, and launch questions." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <Surface key={question} className="p-6">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold">
                  <span>{question}</span>
                  <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#635bff]/10 text-sm font-black text-cyan-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-white/60">{answer}</p>
              </details>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroImagePrompt({ isDark }: { isDark: boolean }) {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16">
      <div className={`mx-auto max-w-7xl rounded-[2rem] border p-7 backdrop-blur-xl ${isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.08)]"}`}>
        <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500">Hero image prompt</div>
        <p className={`mt-4 max-w-5xl text-sm leading-7 ${isDark ? "text-white/65" : "text-slate-600"}`}>
          High-fidelity 3D isometric Modern E-commerce Command Center, deep navy background, electric indigo and mint green revenue signals, floating glass-morphism storefront cards, product page preview, Apple Pay and Stripe Pay checkout modules, inventory sync dashboard, conversion analytics line graphs for LTV and AOV, premium SaaS UI, Apple minimalism, Stripe technical precision, clean lighting, soft shadows, ultra-polished commercial product render, no text artifacts.
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-24 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,91,255,0.32),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(0,245,160,0.18),transparent_42%)]" />
        <div className="relative">
          <div className="text-sm font-black uppercase tracking-[0.2em] text-cyan-500">Ready to sell</div>
          <h2 className="mx-auto mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">Build your ecommerce engine.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">Launch with payments, storefront, fulfillment logic, automation, analytics, and support — all managed in one place.</p>
          <Link href="/contact?type=ecommerce" className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-base font-black text-slate-950 shadow-xl transition hover:-translate-y-1">Start your store →</Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, copy, isDark = true }: { eyebrow: string; title: string; copy?: string; isDark?: boolean }) {
  return (
    <div className="max-w-5xl">
      <div className="text-xs font-black uppercase tracking-[0.28em] text-cyan-500">{eyebrow}</div>
      <h2 className={`mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.055em] md:text-6xl ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {copy && <p className={`mt-6 max-w-2xl text-base leading-8 md:text-lg ${isDark ? "text-white/62" : "text-slate-600"}`}>{copy}</p>}
    </div>
  );
}

function Surface({ children, className = "", isDark = true }: { children: React.ReactNode; className?: string; isDark?: boolean }) {
  return <div className={`rounded-[2rem] border backdrop-blur-xl ${isDark ? "border-white/10 bg-white/[0.055] shadow-[0_28px_90px_rgba(0,0,0,0.35)]" : "border-slate-200 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.08)]"} ${className}`}>{children}</div>;
}
