import type {
  Plan,
  OnboardingStepDef,
  DashboardStage,
  DashboardDoc,
  DashboardTask,
  Integration,
} from "./types";

// Third-party endpoints / keys
export const MAKE_WEBHOOK_URL =
  "https://hook.us2.make.com/ekuqtcgqtpikl3rwvukjjbxm47k505ee";

export const ELEVENLABS_VOICE_ID = "iK6sNBwUqd2NJ9qTKLvV";
export const WHATSAPP_NUMBER = "16197761122";

// Pricing plans
export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Launch your U.S. business",
    priceMonthly: 49,
    priceYearly: 39,
    oneTime: 299,
    badge: null,
    features: [
      "LLC Formation (any state)",
      "Registered Agent (1 year)",
      "Operating Agreement",
      "Email support",
      "Document vault",
    ],
    notIncluded: [
      "EIN filing",
      "US bank account",
      "Stripe setup",
      "Priority support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most popular — ready to operate",
    priceMonthly: 99,
    priceYearly: 79,
    oneTime: 499,
    badge: "MOST POPULAR",
    features: [
      "Everything in Starter",
      "EIN filing & IRS follow-up",
      "US business bank account (Wise)",
      "Stripe account setup",
      "Compliance reminders",
      "Priority chat + WhatsApp",
    ],
    notIncluded: ["Dedicated account manager"],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For funded startups and agencies",
    priceMonthly: 199,
    priceYearly: 159,
    oneTime: 999,
    badge: "PREMIUM",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Tax strategy consultation",
      "Bookkeeping setup (QuickBooks)",
      "Multi-entity structuring",
      "24/7 priority support",
    ],
    notIncluded: [],
  },
];

// Onboarding wizard steps
export const ONBOARDING_STEPS: OnboardingStepDef[] = [
  { id: 1, title: "Choose plan", desc: "Pick the right tier for your business" },
  { id: 2, title: "Business info", desc: "Tell us about your company" },
  { id: 3, title: "Owner details", desc: "Your contact information" },
  { id: 4, title: "Services", desc: "Pick what you need" },
  { id: 5, title: "Review & pay", desc: "Confirm and checkout" },
];

// Dashboard mock data (replace with Supabase queries)
export const DASHBOARD_STAGES: DashboardStage[] = [
  { label: "LLC Formation", status: "complete", icon: "📄" },
  { label: "EIN Registration", status: "complete", icon: "💼" },
  { label: "Operating Agreement", status: "complete", icon: "📝" },
  { label: "Bank Account (Wise)", status: "in-progress", icon: "🏦" },
  { label: "Stripe Setup", status: "pending", icon: "💳" },
  { label: "Domain + Email", status: "pending", icon: "🌍" },
];

export const DASHBOARD_DOCS: DashboardDoc[] = [
  { name: "Articles of Organization.pdf", type: "LLC", date: "2026-04-02", size: "142 KB" },
  { name: "EIN Confirmation Letter.pdf", type: "IRS", date: "2026-04-08", size: "86 KB" },
  { name: "Operating Agreement.pdf", type: "LLC", date: "2026-04-02", size: "256 KB" },
  { name: "Registered Agent Contract.pdf", type: "Compliance", date: "2026-04-01", size: "98 KB" },
];

export const DASHBOARD_TASKS: DashboardTask[] = [
  { title: "Sign Wise bank application", status: "action", due: "Today" },
  { title: "Upload passport copy", status: "action", due: "Tomorrow" },
  { title: "Review Stripe application", status: "upcoming", due: "Apr 25" },
  { title: "File annual report (Wyoming)", status: "upcoming", due: "Dec 31" },
];

// Integrations grid
export const INTEGRATIONS: Integration[] = [
  { name: "Stripe", color: "from-purple-500 to-indigo-500", logo: "/logos/stripe.svg" },
  { name: "Shopify", color: "from-green-500 to-emerald-500", logo: "/logos/shopify.svg" },
  { name: "Zapier", color: "from-orange-500 to-red-500", logo: "/logos/zapier.svg" },
  { name: "Notion", color: "from-gray-700 to-black", logo: "/logos/notion.svg" },
  { name: "Slack", color: "from-pink-500 to-purple-500", logo: "/logos/slack.svg" },
  { name: "HubSpot", color: "from-orange-400 to-orange-600", logo: "/logos/hubspot.svg" },
  { name: "Google", color: "from-blue-400 to-red-400", logo: "/logos/google.svg" },
  { name: "Airtable", color: "from-yellow-400 to-orange-400", logo: "/logos/airtable.svg" },
  { name: "Webflow", color: "from-blue-500 to-indigo-600", logo: "/logos/webflow.svg" },
  { name: "WordPress", color: "from-slate-500 to-slate-700", logo: "/logos/wordpress.svg" },
  { name: "PayPal", color: "from-blue-600 to-blue-800", logo: "/logos/paypal.svg" },
  { name: "QuickBooks", color: "from-green-600 to-green-800", logo: "/logos/quickbooks.svg" },
];

// Default onboarding state
export const DEFAULT_ONBOARDING_DATA = {
  businessName: "",
  businessType: "LLC",
  state: "Wyoming",
  industry: "",
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
  address: "",
  services: {
    llc: true,
    ein: true,
    bank: true,
    stripe: false,
    agent: true,
    domain: false,
  },
};

// Service options for onboarding step 4
export const SERVICE_OPTIONS = [
  { key: "llc", label: "LLC Formation", desc: "File with the state", icon: "📄", required: true },
  { key: "ein", label: "EIN Registration", desc: "IRS tax ID", icon: "💼", required: false },
  { key: "agent", label: "Registered Agent", desc: "1 year included", icon: "🛡️", required: false },
  { key: "bank", label: "Wise Bank Account", desc: "US business banking", icon: "🏦", required: false },
  { key: "stripe", label: "Stripe Setup", desc: "Accept card payments", icon: "💳", required: false },
  { key: "domain", label: "Domain + Email", desc: "Pro business email", icon: "🌍", required: false },
] as const;

// FAQ data
export const FAQS = [
  {
    q: "Do I need to be a U.S. resident to form an LLC?",
    a: "No. We specialize in helping non-U.S. residents form LLCs. You don't need a visa, SSN, or U.S. address to own or operate a U.S. LLC.",
  },
  {
    q: "Which state should I form my LLC in?",
    a: "Most international founders choose Wyoming, Delaware, or New Mexico for their low fees, strong privacy, and no state income tax. We help you choose the right state during onboarding.",
  },
  {
    q: "How long does the full setup take?",
    a: "LLC filing: 1-2 business days. EIN: 3-5 days (faster with our IRS contacts). Bank account (Wise): 2-7 days. Stripe: 1-2 days. Total: typically 7-14 days from start to accepting payments.",
  },
  {
    q: "Can I open a real U.S. bank account without being in the U.S.?",
    a: "Yes. We partner with Wise and other fintechs that support remote account opening for LLC owners worldwide. No travel, no U.S. address required.",
  },
  {
    q: "What if my Stripe application gets rejected?",
    a: "We handle the application end-to-end and know what processors look for. If Stripe rejects, we set you up with alternatives like PayPal Business, Wise, or Payoneer at no extra cost.",
  },
  {
    q: "What's included in the monthly compliance fee?",
    a: "Registered agent service, state filing reminders, document storage, access to our AI assistant, quarterly compliance reports, and priority chat support.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If we haven't filed your LLC yet, we offer a 100% refund. After filing, state fees are non-refundable but we offer credit toward other services.",
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote:
      "From idea to operating LLC in 7 days. The Wise bank account + Stripe setup saved me weeks.",
    name: "Ahmed Hassan",
    role: "Founder, SwiftShip",
    avatar: "AH",
  },
  {
    quote:
      "Best decision I made. Their AI assistant answered my questions at 2am and their team handled the IRS filings flawlessly.",
    name: "Sarah Chen",
    role: "CEO, BloomCopy",
    avatar: "SC",
  },
  {
    quote:
      "I'm based in Cairo and launched a Wyoming LLC without leaving my apartment. Unreal experience.",
    name: "Omar Rashad",
    role: "Solo founder",
    avatar: "OR",
  },
];

// Business flow steps (Wise-style)
export const FLOW_STEPS = [
  { step: "01", icon: "📝", title: "Submit your info", desc: "Answer a few questions in our 5-minute onboarding.", time: "5 min" },
  { step: "02", icon: "📄", title: "We file your LLC", desc: "Articles of Organization filed with the state of your choice.", time: "1-2 days" },
  { step: "03", icon: "🏦", title: "EIN + US bank account", desc: "We get your EIN from the IRS and open your Wise account.", time: "3-5 days" },
  { step: "04", icon: "💳", title: "Stripe + launch", desc: "Connect payments and start accepting customers worldwide.", time: "1 day" },
];

// Services section
export const SERVICES = [
  {
    title: "LLC Formation",
    description:
      "Start your U.S. company from anywhere with a simple, guided process. We help you choose the right state, prepare the filing, and manage the setup from start to finish.",
    bullets: ["State filing support", "Registered agent guidance", "Founder-friendly process"],
  },
  {
    title: "EIN Registration",
    description:
      "Get the business tax ID your company needs to operate professionally. We guide you through the EIN process and help you move to the next step faster.",
    bullets: ["Application guidance", "U.S. business compliance support", "Fast onboarding"],
  },
  {
    title: "Business Setup",
    description:
      "Build the right foundation for your company with professional setup support. From structure to readiness, we help you launch the smart way.",
    bullets: ["Business foundation setup", "Operational readiness", "Launch support"],
  },
  {
    title: "AI Automation",
    description:
      "Work smarter and save time with tailored automation solutions. We help businesses reduce manual work and scale faster.",
    bullets: ["Workflow automation", "AI systems", "Efficiency optimization"],
  },
];
