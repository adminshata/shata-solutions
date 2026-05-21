import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Plan {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  includes: string[];
  cta: string;
  featured?: boolean;
}

interface Category {
  id: string;
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  accentBorder: string;
  title: string;
  subtitle: string;
  plans: Plan[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "website-development",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    accent: "text-blue-400",
    accentBg: "bg-blue-500/15",
    accentBorder: "border-blue-500/40",
    title: "Website Development",
    subtitle: "Custom-built websites engineered for performance, conversion, and brand impact.",
    plans: [
      {
        name: "Starter Website",
        price: "from $499",
        description: "A clean, professional website for new businesses and personal brands.",
        includes: [
          "Up to 5 pages",
          "Mobile-responsive design",
          "Contact form integration",
          "Basic SEO setup",
          "1 round of revisions",
        ],
        cta: "Request Quote",
      },
      {
        name: "Business Website",
        price: "from $999",
        description: "A full-featured business site built to convert visitors into customers.",
        includes: [
          "Up to 10 pages",
          "Premium UI/UX design",
          "CMS or content management",
          "Lead capture forms",
          "Analytics integration",
          "2 rounds of revisions",
        ],
        cta: "Request Quote",
        featured: true,
      },
      {
        name: "Premium Custom Website",
        price: "from $1,999",
        description: "Enterprise-grade websites with advanced integrations and custom functionality.",
        includes: [
          "Unlimited pages",
          "Custom design system",
          "API & third-party integrations",
          "Advanced SEO & performance",
          "Booking or ecommerce ready",
          "Dedicated project manager",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    id: "templates",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    accent: "text-purple-400",
    accentBg: "bg-purple-500/15",
    accentBorder: "border-purple-500/40",
    title: "Website Templates & SaaS Templates",
    subtitle: "Ready-to-launch templates for every industry — customize and go live fast.",
    plans: [
      {
        name: "Template Setup",
        price: "from $299",
        description: "Get a professional template installed and configured for your business.",
        includes: [
          "Template installation",
          "Domain connection",
          "Hosting configuration",
          "Basic content setup",
          "1 revision round",
        ],
        cta: "Request Quote",
      },
      {
        name: "Template Customization",
        price: "from $499",
        description: "Tailored template with your brand colors, content, and custom sections.",
        includes: [
          "Full brand color & font setup",
          "Custom content & copy",
          "Logo & image integration",
          "Mobile optimization",
          "Contact & lead forms",
          "2 revision rounds",
        ],
        cta: "Request Quote",
        featured: true,
      },
      {
        name: "Full Template + Branding Setup",
        price: "from $899",
        description: "Complete launch package — template, branding, content, and go-live support.",
        includes: [
          "Template + full customization",
          "Logo & brand kit",
          "Professional copywriting",
          "SEO foundation",
          "Analytics setup",
          "Launch support",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    id: "ai-automation",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    accent: "text-green-400",
    accentBg: "bg-green-500/15",
    accentBorder: "border-green-500/40",
    title: "AI & Automation Systems",
    subtitle: "Intelligent systems that automate your workflows, support, and customer journeys.",
    plans: [
      {
        name: "Basic Automation",
        price: "from $299",
        description: "Simple automations to eliminate repetitive manual tasks.",
        includes: [
          "1–2 automated workflows",
          "Email or form automation",
          "Zapier / Make integration",
          "Basic CRM connection",
          "Setup documentation",
        ],
        cta: "Request Quote",
      },
      {
        name: "Business Automation System",
        price: "from $999",
        description: "A full automation layer for your business operations and customer flows.",
        includes: [
          "5–10 automated workflows",
          "AI chatbot or assistant",
          "CRM & pipeline automation",
          "Lead capture & follow-up",
          "Notification & reporting",
          "1 month support included",
        ],
        cta: "Request Quote",
        featured: true,
      },
      {
        name: "Custom AI Workflow / AI Agent",
        price: "from $1,499",
        description: "Purpose-built AI agents and advanced automation architectures.",
        includes: [
          "Custom AI agent development",
          "Multi-step intelligent workflows",
          "API & data integrations",
          "Custom dashboards",
          "Ongoing optimization support",
          "Priority response",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    id: "branding",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    accent: "text-pink-400",
    accentBg: "bg-pink-500/15",
    accentBorder: "border-pink-500/40",
    title: "Branding & Design",
    subtitle: "Premium brand identity that makes your business look credible, consistent, and memorable.",
    plans: [
      {
        name: "Social Media Design Pack",
        price: "from $199",
        description: "Branded social media templates and graphics for your marketing channels.",
        includes: [
          "10 social media templates",
          "Brand color & font applied",
          "Post, story, and cover designs",
          "Editable source files",
        ],
        cta: "Request Quote",
      },
      {
        name: "Logo + Brand Kit",
        price: "from $299",
        description: "A professional logo and cohesive brand identity for your business.",
        includes: [
          "Primary logo + variations",
          "Color palette & typography",
          "Business card design",
          "Brand usage guidelines",
          "All file formats (SVG, PNG, PDF)",
        ],
        cta: "Request Quote",
        featured: true,
      },
      {
        name: "Full Brand Identity",
        price: "from $799",
        description: "Complete brand system for businesses ready to make a lasting impression.",
        includes: [
          "Logo suite + brand kit",
          "Social media templates",
          "Presentation deck template",
          "Email signature design",
          "Brand guidelines document",
          "2 revision rounds",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    id: "business-setup",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    accent: "text-orange-400",
    accentBg: "bg-orange-500/15",
    accentBorder: "border-orange-500/40",
    title: "Business Setup Support",
    subtitle: "Launch your U.S. business the right way — legal, compliant, and payment-ready.",
    plans: [
      {
        name: "EIN Support",
        price: "from $149",
        priceNote: "Government fees not included",
        description: "Obtain your Employer Identification Number (EIN) quickly and correctly.",
        includes: [
          "EIN application preparation",
          "IRS submission support",
          "Guidance for international founders",
          "Document review",
        ],
        cta: "Request Quote",
      },
      {
        name: "LLC Formation Support",
        price: "from $299",
        priceNote: "+ state filing fees",
        description: "Full assistance registering your LLC in the United States.",
        includes: [
          "State LLC filing preparation",
          "Articles of Organization",
          "Registered agent guidance",
          "Operating Agreement template",
          "EIN application included",
        ],
        cta: "Request Quote",
        featured: true,
      },
      {
        name: "Business Launch Package",
        price: "from $999",
        priceNote: "+ applicable government fees",
        description: "Everything to go from idea to fully operational U.S. business.",
        includes: [
          "LLC formation + EIN",
          "Business banking guidance",
          "Payment processor setup (Stripe)",
          "Business email setup",
          "Starter website or landing page",
          "1-on-1 onboarding call",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    id: "ongoing-support",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
      </svg>
    ),
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/15",
    accentBorder: "border-indigo-500/40",
    title: "Ongoing Support & Maintenance",
    subtitle: "Keep your website fast, secure, and improving — with a team that's always on call.",
    plans: [
      {
        name: "Maintenance Plan",
        price: "from $99/mo",
        description: "Essential maintenance to keep your website healthy and up-to-date.",
        includes: [
          "Monthly software updates",
          "Security monitoring",
          "Uptime monitoring",
          "Minor content updates (2/mo)",
          "Email support",
        ],
        cta: "Get Started",
      },
      {
        name: "Growth Support Plan",
        price: "from $299/mo",
        description: "Active support for growing businesses that need continuous improvements.",
        includes: [
          "All Maintenance Plan features",
          "Up to 5 hours dev/design work",
          "Landing page optimization",
          "Monthly performance report",
          "Priority email & chat support",
          "SEO monitoring",
        ],
        cta: "Get Started",
        featured: true,
      },
      {
        name: "Dedicated Business Support",
        price: "Custom quote",
        description: "A dedicated team for businesses with complex, ongoing technical needs.",
        includes: [
          "Unlimited support requests",
          "Dedicated project manager",
          "Custom development hours",
          "Weekly strategy calls",
          "SLA-backed response time",
          "Full-stack support",
        ],
        cta: "Request Quote",
      },
    ],
  },
];

// ─── Pricing Card ──────────────────────────────────────────────────────────────

function PricingCard({
  plan,
  accent,
  accentBg,
  accentBorder,
}: {
  plan: Plan;
  accent: string;
  accentBg: string;
  accentBorder: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
        plan.featured
          ? `${accentBorder} ${accentBg} border`
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
      }`}
    >
      {plan.featured && (
        <div className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accentBg} ${accent} border ${accentBorder}`}>
          Most Popular
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-white">{plan.name}</h3>
        <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{plan.description}</p>

        <div className="mt-4">
          <span className={`text-2xl font-bold ${plan.featured ? accent : "text-white"}`}>
            {plan.price}
          </span>
          {plan.priceNote && (
            <p className="mt-0.5 text-xs text-white/40">{plan.priceNote}</p>
          )}
        </div>

        <ul className="mt-5 space-y-2">
          {plan.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-white/70">
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${accentBg} ${accent}`}>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href="/contact"
          className={`block text-center rounded-full py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] ${
            plan.featured
              ? `${accentBg} ${accent} border ${accentBorder} hover:opacity-90`
              : "border border-white/20 text-white hover:bg-white/[0.08]"
          }`}
        >
          {plan.cta}
        </Link>
        {plan.price !== "Custom quote" && (
          <Link
            href="/checkout-demo"
            className="block text-center rounded-full py-2 text-xs font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
          >
            Checkout Demo →
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Clear pricing. No surprises.
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            All prices shown are starting estimates. Final pricing is always confirmed before payment, with no hidden charges.
          </p>
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="mx-auto max-w-5xl px-6 pt-10">
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] px-6 py-5">
          <div className="flex gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-300 mb-1">Pricing Disclosure</p>
              <ul className="space-y-1 text-xs text-amber-200/70 leading-relaxed">
                <li>• Prices are starting estimates and may vary based on scope, complexity, integrations, third-party tools, and timeline.</li>
                <li>• Government filing fees, domain registration fees, hosting fees, payment processor fees, and third-party software costs may be billed separately.</li>
                <li>• Final pricing is always confirmed in writing before any payment is collected.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 space-y-20">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} id={cat.id}>
            {/* Category header */}
            <div className="mb-8 flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${cat.accentBg} ${cat.accent}`}>
                {cat.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{cat.title}</h2>
                <p className="mt-1 text-sm text-white/60">{cat.subtitle}</p>
              </div>
            </div>

            {/* Plans grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cat.plans.map((plan) => (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  accent={cat.accent}
                  accentBg={cat.accentBg}
                  accentBorder={cat.accentBorder}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom legal note */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 text-xs text-white/40 leading-relaxed space-y-1">
          <p className="font-semibold text-white/60 mb-2">Important Notes on Pricing</p>
          <p>All prices listed are starting estimates in USD and represent the minimum for each service tier. Actual pricing depends on scope, number of integrations, third-party tools required, and project timeline.</p>
          <p>Government filing fees (LLC, EIN), domain registration, hosting, SSL certificates, email hosting, payment processing fees, and any third-party software subscriptions are not included unless explicitly stated in your project quote.</p>
          <p>Final project pricing is always confirmed in a written quote before any payment is requested. Shata Global LLC (operating as Shata Solutions) does not charge hidden fees.</p>
          <p className="mt-2">Questions? Contact <a href="mailto:sales@shatasolutions.com" className="text-white/60 hover:text-blue-400 transition-colors">sales@shatasolutions.com</a> or <a href="mailto:billing@shatasolutions.com" className="text-white/60 hover:text-blue-400 transition-colors">billing@shatasolutions.com</a>.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/[0.02] p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            Tell us about your project and we will send you a custom quote within 24 hours — no commitment required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact"
              className="px-7 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Request a Free Quote
            </Link>
            <Link
              href="/checkout-demo"
              className="px-7 py-3 border border-blue-500/40 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold hover:bg-blue-500/20 transition-colors"
            >
              Try Checkout Demo
            </Link>
            <Link
              href="/services"
              className="px-7 py-3 border border-white/20 rounded-full text-sm text-white hover:bg-white/[0.07] transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
