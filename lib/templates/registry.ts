/**
 * Shata Solutions — Template Marketplace Registry
 * Single source of truth for all live website templates.
 * Powers: /website-templates, /services/website-platform, industry pages.
 *
 * NOTE: Only add templates with a confirmed, working previewHref.
 * Set previewHref: null and status: "coming-soon" for planned templates.
 */

export type TemplateStatus = "live" | "coming-soon";

export type TemplateColorTheme = {
  primary: string;
  bg: string;
  gradient: string;
  badge: string;
};

export type SiteTemplate = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  industry: string;
  description: string;
  features: string[];
  tags: string[];
  previewHref: string | null;
  status: TemplateStatus;
  featured: boolean;
  colorTheme: TemplateColorTheme;
  recommendedFor: string[];
  pages: string[];
};

/* ------------------------------------------------------------------ */
/* All 24 verified live templates                                      */
/* ------------------------------------------------------------------ */

export const SITE_TEMPLATES: SiteTemplate[] = [
  /* ===== AGENCY & BUSINESS ===== */
  {
    id: "agency-1",
    slug: "agency-1",
    name: "AI Agency",
    tagline: "Intelligent solutions for the modern enterprise.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A full-featured AI and digital agency template with portfolio, team, blog, services, contact, and admin panel.",
    features: ["Portfolio", "Team profiles", "Blog", "Services", "Admin panel"],
    tags: ["AI", "Agency", "Portfolio", "Dark theme", "Blog"],
    previewHref: "/templates/agency-1/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#635bff",
      bg: "#070d1c",
      gradient: "from-[#635bff]/20 to-[#070d1c]",
      badge: "#a3a0ff",
    },
    recommendedFor: ["AI companies", "Digital agencies", "Tech consultancies"],
    pages: ["Home", "About", "Services", "Portfolio", "Blog", "Team", "Contact", "FAQ"],
  },
  {
    id: "agency-2",
    slug: "agency-2",
    name: "AI Robotics Agency",
    tagline: "Advanced automation and intelligent robotic systems.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A premium AI robotics agency template with futuristic design, automation showcases, and lead capture.",
    features: ["Futuristic hero", "Services showcase", "Lead capture", "Dark aesthetic"],
    tags: ["Robotics", "AI", "Automation", "Agency"],
    previewHref: "/templates/agency-2/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#06b6d4",
      bg: "#060d1a",
      gradient: "from-cyan-500/20 to-[#060d1a]",
      badge: "#67e8f9",
    },
    recommendedFor: ["Robotics companies", "Automation firms", "Industrial tech"],
    pages: ["Home", "Services", "Contact"],
  },
  {
    id: "agency-3",
    slug: "agency-3",
    name: "IT Solutions Agency",
    tagline: "Enterprise IT consulting and managed services.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "Professional IT solutions and managed services agency template with service pages and trust signals.",
    features: ["Service pages", "Trust signals", "Case studies", "Contact"],
    tags: ["IT", "Managed Services", "Agency", "Enterprise"],
    previewHref: "/templates/agency-3/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#3b82f6",
      bg: "#071020",
      gradient: "from-blue-600/20 to-[#071020]",
      badge: "#93c5fd",
    },
    recommendedFor: ["IT companies", "MSPs", "Tech consultants"],
    pages: ["Home", "Services", "Contact"],
  },
  {
    id: "agency-4",
    slug: "agency-4",
    name: "Software Agency",
    tagline: "Custom software strategy, product engineering, and delivery.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A sleek software development agency template showcasing product engineering capabilities and client success.",
    features: ["Service pages", "Portfolio", "Process section", "Team"],
    tags: ["Software", "Development", "Agency", "SaaS"],
    previewHref: "/templates/agency-4/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#8b5cf6",
      bg: "#0b0618",
      gradient: "from-violet-600/20 to-[#0b0618]",
      badge: "#c4b5fd",
    },
    recommendedFor: ["Software companies", "Product studios", "Dev agencies"],
    pages: ["Home", "Services", "Contact"],
  },
  {
    id: "agency-5",
    slug: "agency-5",
    name: "Marketing Agency",
    tagline: "Growth-focused digital marketing for ambitious brands.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A vibrant marketing agency template with campaign showcases, team profiles, and conversion-optimized CTAs.",
    features: ["Campaign showcase", "Team profiles", "Testimonials", "Contact"],
    tags: ["Marketing", "Digital", "Growth", "Agency"],
    previewHref: "/templates/agency-5/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#f59e0b",
      bg: "#0f0a02",
      gradient: "from-amber-500/20 to-[#0f0a02]",
      badge: "#fcd34d",
    },
    recommendedFor: ["Marketing agencies", "Growth firms", "Brand studios"],
    pages: ["Home", "Services", "Contact"],
  },
  {
    id: "agency-6",
    slug: "agency-6",
    name: "SEO Agency",
    tagline: "Search visibility that drives real business outcomes.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A results-focused SEO agency template with ranking proofs, service packages, and lead generation.",
    features: ["Ranking showcase", "Service packages", "Lead forms", "Case studies"],
    tags: ["SEO", "Search", "Digital", "Agency"],
    previewHref: "/templates/agency-6/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#10b981",
      bg: "#021510",
      gradient: "from-emerald-500/20 to-[#021510]",
      badge: "#6ee7b7",
    },
    recommendedFor: ["SEO agencies", "Digital marketers", "Content studios"],
    pages: ["Home", "Services", "Contact"],
  },
  {
    id: "agency-7",
    slug: "agency-7",
    name: "Cyber Security Agency",
    tagline: "Enterprise-grade cyber defense and risk management.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A professional cybersecurity agency template with threat analysis services, trust indicators, and secure contact.",
    features: ["Services", "Threat showcase", "Trust indicators", "Contact"],
    tags: ["Cybersecurity", "Security", "Enterprise", "Agency"],
    previewHref: "/templates/agency-7/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#ef4444",
      bg: "#0d0005",
      gradient: "from-red-600/20 to-[#0d0005]",
      badge: "#fca5a5",
    },
    recommendedFor: ["Cybersecurity firms", "Risk consultants", "Enterprise IT"],
    pages: ["Home", "Services", "Contact"],
  },
  {
    id: "agency-8",
    slug: "agency-8",
    name: "SaaS & Startups",
    tagline: "Modern SaaS product and startup landing page.",
    category: "Agency & Business",
    industry: "agencies",
    description:
      "A high-converting SaaS and startup template with pricing, features, testimonials, and smooth onboarding CTA.",
    features: ["Pricing tables", "Feature highlights", "Testimonials", "Onboarding CTA"],
    tags: ["SaaS", "Startup", "Product", "Landing page"],
    previewHref: "/templates/agency-8/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#635bff",
      bg: "#07091a",
      gradient: "from-indigo-500/20 to-[#07091a]",
      badge: "#a5b4fc",
    },
    recommendedFor: ["SaaS companies", "Startups", "Product teams"],
    pages: ["Home", "Pricing", "Features", "Contact"],
  },

  /* ===== ECOMMERCE & RETAIL ===== */
  {
    id: "ecommerce-1",
    slug: "ecommerce",
    name: "Shata Store",
    tagline: "Premium fashion ecommerce with full shopping flow.",
    category: "Ecommerce & Retail",
    industry: "ecommerce",
    description:
      "A complete fashion ecommerce template with categories, product pages, cart, checkout, account, wishlist, and order success.",
    features: ["Product catalog", "Cart & checkout", "Account system", "Wishlist", "Order tracking"],
    tags: ["Fashion", "Ecommerce", "Shopping", "Full featured"],
    previewHref: "/templates/ecommerce/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#d4d4d8",
      bg: "#0a0a0a",
      gradient: "from-zinc-600/20 to-[#0a0a0a]",
      badge: "#a1a1aa",
    },
    recommendedFor: ["Fashion brands", "Clothing stores", "Lifestyle brands"],
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Account", "Wishlist", "Order Success"],
  },
  {
    id: "ecommerce-2",
    slug: "ecommerce-2",
    name: "Shata Home",
    tagline: "Premium furniture & home decor ecommerce store.",
    category: "Ecommerce & Retail",
    industry: "ecommerce",
    description:
      "A premium furniture and home decor ecommerce template with room collections, product pages, cart, and wishlist.",
    features: ["Room collections", "Product pages", "Cart", "Wishlist", "Loyalty program"],
    tags: ["Furniture", "Home decor", "Ecommerce", "Lifestyle"],
    previewHref: "/templates/ecommerce-2/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#d97706",
      bg: "#1a0f05",
      gradient: "from-amber-700/20 to-[#1a0f05]",
      badge: "#fbbf24",
    },
    recommendedFor: ["Furniture stores", "Home decor brands", "Interior design"],
    pages: ["Home", "Shop", "Product Detail", "Cart", "About", "Contact"],
  },
  {
    id: "flower-shop-1",
    slug: "flower-shop-1",
    name: "Shata Flowers",
    tagline: "Fresh floral arrangements delivered to your door.",
    category: "Ecommerce & Retail",
    industry: "ecommerce",
    description:
      "A beautiful flower shop ecommerce template with seasonal arrangements, bouquets, gifting, and delivery flow.",
    features: ["Product catalog", "Gift options", "Delivery checkout", "Blog"],
    tags: ["Flowers", "Gifts", "Ecommerce", "Seasonal"],
    previewHref: "/templates/flower-shop-1/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#ec4899",
      bg: "#1a0010",
      gradient: "from-pink-500/20 to-[#1a0010]",
      badge: "#f9a8d4",
    },
    recommendedFor: ["Flower shops", "Gift stores", "Floral delivery"],
    pages: ["Home", "Shop", "About", "Blog", "Contact"],
  },
  {
    id: "jewelry-shop-1",
    slug: "jewelry-shop-1",
    name: "Shata Jewelry",
    tagline: "Luxury jewelry crafted for timeless elegance.",
    category: "Ecommerce & Retail",
    industry: "ecommerce",
    description:
      "A premium jewelry ecommerce template with collection pages, product detail, wishlist, cart, and account.",
    features: ["Collections", "Product detail", "Wishlist & cart", "Account", "Login & register"],
    tags: ["Jewelry", "Luxury", "Ecommerce", "Fashion"],
    previewHref: "/templates/jewelry-shop-1/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#c9a84c",
      bg: "#0c0800",
      gradient: "from-yellow-600/20 to-[#0c0800]",
      badge: "#e4b96a",
    },
    recommendedFor: ["Jewelry brands", "Luxury retailers", "Accessory stores"],
    pages: ["Home", "Shop", "Product Detail", "Cart", "Wishlist", "Account", "Login"],
  },
  {
    id: "supermarket-1",
    slug: "supermarket-1",
    name: "FreshMart",
    tagline: "Your neighborhood's freshest grocery destination.",
    category: "Ecommerce & Retail",
    industry: "supermarkets",
    description:
      "A full-featured supermarket ecommerce template with categories, products, cart, checkout, and vendor management.",
    features: ["Grocery catalog", "Cart & checkout", "Vendor system", "Order tracking"],
    tags: ["Grocery", "Supermarket", "Ecommerce", "Fresh"],
    previewHref: "/templates/supermarket-1/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#16a34a",
      bg: "#021208",
      gradient: "from-green-700/20 to-[#021208]",
      badge: "#86efac",
    },
    recommendedFor: ["Grocery stores", "Supermarkets", "Food delivery"],
    pages: ["Home", "Shop", "Product", "Cart", "Checkout", "Vendors", "Account"],
  },
  {
    id: "supermarket-2",
    slug: "supermarket-2",
    name: "QuickMart",
    tagline: "Fresh deals delivered fast.",
    category: "Ecommerce & Retail",
    industry: "supermarkets",
    description:
      "A clean and fast grocery template with promotional banners, categories, and streamlined checkout.",
    features: ["Promo banners", "Categories", "Cart", "Checkout"],
    tags: ["Grocery", "Supermarket", "Quick delivery", "Deals"],
    previewHref: "/templates/supermarket-2/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#dc2626",
      bg: "#120003",
      gradient: "from-red-700/20 to-[#120003]",
      badge: "#fca5a5",
    },
    recommendedFor: ["Grocery delivery", "Convenience stores", "Quick commerce"],
    pages: ["Home", "Shop", "Product", "Cart", "Checkout"],
  },
  {
    id: "supermarket-3",
    slug: "supermarket-3",
    name: "BlueMart",
    tagline: "Trusted quality at every aisle.",
    category: "Ecommerce & Retail",
    industry: "supermarkets",
    description:
      "A modern blue-themed supermarket template with a clean layout, category nav, and full shopping flow.",
    features: ["Category navigation", "Product grid", "Full shopping flow"],
    tags: ["Grocery", "Supermarket", "Blue", "Clean"],
    previewHref: "/templates/supermarket-3/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#1d4ed8",
      bg: "#020920",
      gradient: "from-blue-700/20 to-[#020920]",
      badge: "#93c5fd",
    },
    recommendedFor: ["Grocery chains", "Supermarkets", "Food retail"],
    pages: ["Home", "Shop", "Product", "Cart", "Checkout"],
  },
  {
    id: "supermarket-4",
    slug: "supermarket-4",
    name: "OrangeMart",
    tagline: "Vibrant deals, every day.",
    category: "Ecommerce & Retail",
    industry: "supermarkets",
    description:
      "An energetic orange-themed grocery store template with bold promotions, categories, and full ecommerce flow.",
    features: ["Bold promos", "Categories", "Shopping flow"],
    tags: ["Grocery", "Supermarket", "Vibrant", "Deals"],
    previewHref: "/templates/supermarket-4/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#ea580c",
      bg: "#120600",
      gradient: "from-orange-600/20 to-[#120600]",
      badge: "#fdba74",
    },
    recommendedFor: ["Discount grocers", "Supermarkets", "Promo-led stores"],
    pages: ["Home", "Shop", "Product", "Cart", "Checkout"],
  },
  {
    id: "supermarket-5",
    slug: "supermarket-5",
    name: "VividMart",
    tagline: "Premium grocery — bold, fresh, vivid.",
    category: "Ecommerce & Retail",
    industry: "supermarkets",
    description:
      "A premium vivid-styled supermarket with multi-vendor support, rich product pages, and a full loyalty ecosystem.",
    features: ["Multi-vendor", "Loyalty system", "Rich products", "Full checkout"],
    tags: ["Grocery", "Supermarket", "Premium", "Multi-vendor"],
    previewHref: "/templates/supermarket-5/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#7c3aed",
      bg: "#0d0120",
      gradient: "from-violet-700/20 to-[#0d0120]",
      badge: "#c4b5fd",
    },
    recommendedFor: ["Premium grocers", "Supermarket chains", "Multi-vendor markets"],
    pages: ["Home", "Shop", "Product", "Cart", "Checkout", "Vendors", "Account", "Wishlist"],
  },

  /* ===== FOOD & BEVERAGE ===== */
  {
    id: "cafe-1",
    slug: "cafe-1",
    name: "Cafert",
    tagline: "Specialty coffee, artisan bites, community vibes.",
    category: "Food & Beverage",
    industry: "restaurants-cafes",
    description:
      "A modern specialty café template with menu, reservations, team, and contact — built for community-focused coffee shops.",
    features: ["Menu", "Reservations", "About & team", "Gallery", "Contact"],
    tags: ["Café", "Coffee", "Specialty", "Menu"],
    previewHref: "/templates/cafe-1/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#92400e",
      bg: "#1a0c05",
      gradient: "from-amber-900/25 to-[#1a0c05]",
      badge: "#d97706",
    },
    recommendedFor: ["Coffee shops", "Specialty cafés", "Bakeries"],
    pages: ["Home", "Menu", "About", "Contact", "Reservations"],
  },
  {
    id: "cafe1",
    slug: "cafe1",
    name: "Avenue Café",
    tagline: "More than a café — a neighbourhood ritual.",
    category: "Food & Beverage",
    industry: "restaurants-cafes",
    description:
      "A premium café template with CMS-driven menu, team profiles, gallery, reservations, and full admin panel.",
    features: ["CMS-driven menu", "Team profiles", "Gallery", "Admin panel", "Reservations"],
    tags: ["Café", "Coffee", "Premium", "Admin panel"],
    previewHref: "/templates/cafe1/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#78350f",
      bg: "#120800",
      gradient: "from-yellow-900/25 to-[#120800]",
      badge: "#f59e0b",
    },
    recommendedFor: ["Cafés", "Coffee chains", "Brunch spots"],
    pages: ["Home", "Menu", "Team", "About", "Contact", "Reservations", "Admin"],
  },
  {
    id: "restaurant-1",
    slug: "restaurant-1",
    name: "La Belle Table",
    tagline: "Elegant restaurant & fine dining experience.",
    category: "Food & Beverage",
    industry: "restaurants-cafes",
    description:
      "A sophisticated fine dining restaurant template with multi-slide hero, chef profiles, blog, and reservation system.",
    features: ["Multi-slide hero", "Chef profiles", "Blog", "Reservations", "Gallery"],
    tags: ["Restaurant", "Fine dining", "Elegant", "Blog"],
    previewHref: "/templates/restaurant-1/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#b91c1c",
      bg: "#0f0200",
      gradient: "from-red-900/25 to-[#0f0200]",
      badge: "#fca5a5",
    },
    recommendedFor: ["Restaurants", "Fine dining", "Bistros"],
    pages: ["Home", "Menu", "About", "Chefs", "Blog", "Gallery", "Contact", "Reservations"],
  },

  /* ===== HEALTH & MEDICAL ===== */
  {
    id: "medical-center-1",
    slug: "medical-center-1",
    name: "Shata Medical Center",
    tagline: "Comprehensive healthcare, delivered with excellence.",
    category: "Health & Medical",
    industry: "medical-centers",
    description:
      "A complete medical center template with appointment booking, doctors, departments, services, and admin panel.",
    features: ["Appointment booking", "Doctor profiles", "Departments", "Admin panel", "Services"],
    tags: ["Medical", "Healthcare", "Appointments", "Doctors"],
    previewHref: "/templates/medical-center-1/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#0284c7",
      bg: "#020d1a",
      gradient: "from-sky-600/20 to-[#020d1a]",
      badge: "#7dd3fc",
    },
    recommendedFor: ["Medical centers", "Hospitals", "Multi-specialty clinics"],
    pages: ["Home", "About", "Services", "Appointment", "Doctors", "Contact", "Admin"],
  },
  {
    id: "pharmacy-1",
    slug: "pharmacy-1",
    name: "Shata Pharmacy",
    tagline: "Your trusted neighborhood pharmacy.",
    category: "Health & Medical",
    industry: "pharmacies",
    description:
      "A pharmacy ecommerce template with product catalog, categories, cart, account, and prescription-ready layout.",
    features: ["Product catalog", "Categories", "Cart & checkout", "Account", "Blog"],
    tags: ["Pharmacy", "Medical", "Ecommerce", "Healthcare"],
    previewHref: "/templates/pharmacy-1/preview",
    status: "live",
    featured: false,
    colorTheme: {
      primary: "#059669",
      bg: "#011410",
      gradient: "from-emerald-700/20 to-[#011410]",
      badge: "#6ee7b7",
    },
    recommendedFor: ["Pharmacies", "Drug stores", "Healthcare retailers"],
    pages: ["Home", "Shop", "Categories", "Cart", "Blog", "Account"],
  },

  /* ===== BEAUTY & WELLNESS ===== */
  {
    id: "spa-salon-1",
    slug: "spa-salon-1",
    name: "Shata Spa & Salon",
    tagline: "Relax. Rejuvenate. Revive.",
    category: "Beauty & Wellness",
    industry: "beauty-salons",
    description:
      "A luxury spa and salon template with service menus, booking, team profiles, gallery, blog, and pricing.",
    features: ["Service menus", "Booking / appointments", "Team profiles", "Gallery", "Pricing", "Blog"],
    tags: ["Spa", "Salon", "Beauty", "Wellness", "Appointments"],
    previewHref: "/templates/spa-salon-1/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#7c3aed",
      bg: "#0e0120",
      gradient: "from-purple-700/20 to-[#0e0120]",
      badge: "#c4b5fd",
    },
    recommendedFor: ["Spas", "Beauty salons", "Wellness centers"],
    pages: ["Home", "Services", "About", "Team", "Gallery", "Blog", "Contact", "Appointment", "Pricing"],
  },

  /* ===== LEGAL ===== */
  {
    id: "multi-lawyer-1",
    slug: "multi-lawyer-1",
    name: "Morrison & Grant LLP",
    tagline: "Trusted legal counsel. Proven results.",
    category: "Legal",
    industry: "law-firms",
    description:
      "A premium multi-attorney law firm template with practice areas, attorney profiles, case results, blog, and consultation booking.",
    features: ["Attorney profiles", "Practice areas", "Case results", "Blog", "Consultation form", "Privacy & Terms"],
    tags: ["Law firm", "Legal", "Attorneys", "Consultation"],
    previewHref: "/templates/multi-lawyer-1/preview",
    status: "live",
    featured: true,
    colorTheme: {
      primary: "#c9a84c",
      bg: "#050d1f",
      gradient: "from-yellow-700/15 to-[#050d1f]",
      badge: "#e4b96a",
    },
    recommendedFor: ["Law firms", "Solo attorneys", "Legal consultancies"],
    pages: ["Home", "About", "Practice Areas", "Attorneys", "Attorney Detail", "Case Results", "Blog", "Contact", "Privacy", "Terms"],
  },
];

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

export const LIVE_TEMPLATES = SITE_TEMPLATES.filter((t) => t.status === "live");
export const FEATURED_TEMPLATES = SITE_TEMPLATES.filter((t) => t.featured && t.status === "live");

export const TEMPLATE_CATEGORIES = [
  "All",
  "Agency & Business",
  "Ecommerce & Retail",
  "Food & Beverage",
  "Health & Medical",
  "Beauty & Wellness",
  "Legal",
] as const;

export type TemplateCategoryFilter = (typeof TEMPLATE_CATEGORIES)[number];

export function getTemplatesByCategory(category: TemplateCategoryFilter): SiteTemplate[] {
  if (category === "All") return LIVE_TEMPLATES;
  return LIVE_TEMPLATES.filter((t) => t.category === category);
}

export function getTemplateBySlug(slug: string): SiteTemplate | undefined {
  return SITE_TEMPLATES.find((t) => t.slug === slug);
}

export const TEMPLATE_STATS = {
  total: LIVE_TEMPLATES.length,
  categories: TEMPLATE_CATEGORIES.length - 1,
  industries: [...new Set(LIVE_TEMPLATES.map((t) => t.industry))].length,
  pagesTotal: LIVE_TEMPLATES.reduce((sum, t) => sum + t.pages.length, 0),
} as const;

/* Keep backward-compat stub for old import */
export const templateRegistry = {} as const;
export type TemplateSlug = string;
