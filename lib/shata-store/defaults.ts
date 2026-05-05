import type { Category, Product, StoreConfig } from "./types";

const IMG = "/templates/shata-store";

const categories: Category[] = [
  {
    id: "cat-1",
    handle: "new-arrivals",
    name: "New Arrivals",
    description: "Fresh styles, just dropped this week.",
    image: `${IMG}/collections/1.png`,
    featured: true,
  },
  {
    id: "cat-2",
    handle: "best-sellers",
    name: "Best Sellers",
    description: "What everyone is wearing right now.",
    image: `${IMG}/collections/2.png`,
    featured: true,
  },
  {
    id: "cat-3",
    handle: "outerwear",
    name: "Outerwear",
    description: "Jackets, coats, and layers built for any weather.",
    image: `${IMG}/collections/3.png`,
    featured: true,
  },
  {
    id: "cat-4",
    handle: "footwear",
    name: "Footwear",
    description: "Everyday comfort meets premium materials.",
    image: `${IMG}/collections/4.png`,
    featured: true,
  },
  {
    id: "cat-5",
    handle: "accessories",
    name: "Accessories",
    description: "The small details that finish a look.",
    image: `${IMG}/collections/5.png`,
  },
  {
    id: "cat-6",
    handle: "sale",
    name: "Sale",
    description: "Premium pieces at a sharper price.",
    image: `${IMG}/collections/6.png`,
  },
];

const products: Product[] = [
  {
    id: "prod-1",
    handle: "atlas-knit-sweater",
    name: "Atlas Knit Sweater",
    shortDescription: "Soft merino blend with a relaxed fit.",
    description:
      "A modern take on the classic crew-neck. Spun from a fine-gauge merino blend, the Atlas Knit drapes cleanly over a tee and finishes layered under outerwear. Pre-washed for shape retention. Designed in our studio, knit in Portugal.",
    category: "best-sellers",
    tags: ["new", "merino"],
    price: 11800,
    compareAtPrice: 14000,
    currency: "USD",
    images: [`${IMG}/products/p1.jpg`, `${IMG}/products/p1-1.jpg`, `${IMG}/products/p1-2.jpg`, `${IMG}/products/p1-3.jpg`],
    rating: 4.7,
    reviewCount: 128,
    inventory: 32,
    options: [
      { name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { name: "Color", values: ["Stone", "Charcoal", "Forest"] },
    ],
    featured: true,
    badge: "sale",
  },
  {
    id: "prod-2",
    handle: "linear-overshirt",
    name: "Linear Overshirt",
    shortDescription: "Structured cotton overshirt with a clean placket.",
    description:
      "A workshirt-meets-jacket built from heavyweight Japanese cotton. Two flap chest pockets, garment-dyed, and finished with corozo buttons. Wear it open over a tee or buttoned as a light layer.",
    category: "outerwear",
    price: 14800,
    currency: "USD",
    images: [`${IMG}/products/p2.jpg`, `${IMG}/products/p2-1.jpg`, `${IMG}/products/p2-2.jpg`, `${IMG}/products/p2-3.jpg`],
    rating: 4.8,
    reviewCount: 86,
    inventory: 18,
    options: [
      { name: "Size", values: ["S", "M", "L", "XL"] },
      { name: "Color", values: ["Sand", "Black"] },
    ],
    featured: true,
    badge: "new",
  },
  {
    id: "prod-3",
    handle: "voyage-trainer",
    name: "Voyage Trainer",
    shortDescription: "All-day cushioning. Italian leather upper.",
    description:
      "Our take on the everyday trainer. Italian full-grain leather upper, padded collar, and a cup-sole built for a lifetime of city walks. Resoled, not replaced.",
    category: "footwear",
    price: 19800,
    currency: "USD",
    images: [`${IMG}/products/p3.jpg`, `${IMG}/products/p3-1.jpg`, `${IMG}/products/p3-2.jpg`, `${IMG}/products/p3-3.jpg`],
    rating: 4.6,
    reviewCount: 214,
    inventory: 22,
    options: [
      { name: "Size", values: ["7", "8", "9", "10", "11", "12"] },
      { name: "Color", values: ["White", "Bone", "Black"] },
    ],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "prod-4",
    handle: "harbor-tote",
    name: "Harbor Tote",
    shortDescription: "Vegetable-tanned leather, large capacity.",
    description:
      "A tote that holds a laptop, a notebook, and a change of clothes for the gym — and looks better the more you use it. Vegetable-tanned, edge-finished by hand.",
    category: "accessories",
    price: 22500,
    currency: "USD",
    images: [`${IMG}/products/p4.jpg`, `${IMG}/products/p4-1.jpg`, `${IMG}/products/p4-2.jpg`, `${IMG}/products/p4-3.jpg`],
    rating: 4.9,
    reviewCount: 64,
    inventory: 12,
    options: [{ name: "Color", values: ["Tan", "Black", "Cognac"] }],
    featured: true,
  },
  {
    id: "prod-5",
    handle: "north-shell-jacket",
    name: "North Shell Jacket",
    shortDescription: "3-layer waterproof shell. Built for real weather.",
    description:
      "A technical shell with sealed seams, articulated elbows, and a 2-way front zip. Designed for commutes, runs, and weekends in the mountains.",
    category: "outerwear",
    price: 24800,
    compareAtPrice: 28000,
    currency: "USD",
    images: [`${IMG}/products/p5.jpg`, `${IMG}/products/p5-1.jpg`, `${IMG}/products/p5-2.jpg`, `${IMG}/products/p5-3.jpg`],
    rating: 4.7,
    reviewCount: 51,
    inventory: 9,
    options: [
      { name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { name: "Color", values: ["Slate", "Olive"] },
    ],
    featured: true,
    badge: "sale",
  },
  {
    id: "prod-6",
    handle: "field-cap",
    name: "Field Cap",
    shortDescription: "Six-panel cap in washed cotton twill.",
    description:
      "A no-fuss six-panel cap made from sturdy cotton twill. Adjustable strap-back. Garment-washed for an immediate broken-in feel.",
    category: "accessories",
    price: 4200,
    currency: "USD",
    images: [`${IMG}/products/p6.jpg`, `${IMG}/products/p6-1.jpg`, `${IMG}/products/p6-2.jpg`, `${IMG}/products/p6-3.jpg`],
    rating: 4.5,
    reviewCount: 142,
    inventory: 60,
    options: [{ name: "Color", values: ["Khaki", "Black", "Navy"] }],
  },
  {
    id: "prod-7",
    handle: "explorer-trouser",
    name: "Explorer Trouser",
    shortDescription: "Tapered, washed, and incredibly easy to wear.",
    description:
      "Our take on the modern trouser. Mid-rise, slight taper, slight stretch. Looks pressed even when it isn't.",
    category: "best-sellers",
    price: 12800,
    currency: "USD",
    images: [`${IMG}/products/p7.jpg`, `${IMG}/products/p7-1.jpg`, `${IMG}/products/p7-2.jpg`, `${IMG}/products/p7-3.jpg`],
    rating: 4.6,
    reviewCount: 98,
    inventory: 41,
    options: [
      { name: "Size", values: ["28", "30", "32", "34", "36"] },
      { name: "Color", values: ["Stone", "Black"] },
    ],
    featured: true,
  },
  {
    id: "prod-8",
    handle: "porter-watch",
    name: "Porter Watch",
    shortDescription: "Automatic movement, sapphire crystal, 38mm.",
    description:
      "A clean, daily watch built around a Japanese automatic movement. Brushed steel case, domed sapphire, and a chocolate-brown leather strap.",
    category: "accessories",
    price: 32500,
    currency: "USD",
    images: [`${IMG}/products/p8.jpg`, `${IMG}/products/p8-1.jpg`, `${IMG}/products/p8-2.jpg`, `${IMG}/products/p8-3.jpg`],
    rating: 4.8,
    reviewCount: 36,
    inventory: 7,
    options: [{ name: "Strap", values: ["Brown leather", "Black leather", "Steel"] }],
    badge: "limited",
  },
  // Variants — same shoots, different framing — used where we need more catalog variety.
  {
    id: "prod-9",
    handle: "pier-tee",
    name: "Pier Tee",
    shortDescription: "Heavyweight tee in long-staple cotton.",
    description:
      "The everyday tee — built from long-staple cotton with a slightly relaxed fit. Garment-dyed and pre-shrunk so the size you buy is the size you keep.",
    category: "new-arrivals",
    price: 4800,
    currency: "USD",
    images: [`${IMG}/products/p1-2.jpg`, `${IMG}/products/p1-1.jpg`, `${IMG}/products/p1-3.jpg`, `${IMG}/products/p1.jpg`],
    rating: 4.5,
    reviewCount: 311,
    inventory: 120,
    options: [
      { name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { name: "Color", values: ["White", "Black", "Stone", "Olive"] },
    ],
    featured: true,
  },
  {
    id: "prod-10",
    handle: "ridge-belt",
    name: "Ridge Belt",
    shortDescription: "Italian bridle leather. Aged hardware.",
    description:
      "A simple belt that holds up. Cut from a single piece of Italian bridle leather and finished with a solid brass buckle.",
    category: "accessories",
    price: 6800,
    currency: "USD",
    images: [`${IMG}/products/p4-1.jpg`, `${IMG}/products/p4-2.jpg`, `${IMG}/products/p4.jpg`, `${IMG}/products/p4-3.jpg`],
    rating: 4.7,
    reviewCount: 79,
    inventory: 28,
    options: [
      { name: "Size", values: ["30", "32", "34", "36", "38"] },
      { name: "Color", values: ["Tan", "Black"] },
    ],
  },
  {
    id: "prod-11",
    handle: "summit-puffer",
    name: "Summit Puffer",
    shortDescription: "Recycled down. Lightweight warmth.",
    description:
      "A packable puffer with 700-fill recycled down. Quilted construction, an internal stash pocket, and a baffle pattern that drapes cleanly over a layer.",
    category: "outerwear",
    price: 21800,
    currency: "USD",
    images: [`${IMG}/products/p5-1.jpg`, `${IMG}/products/p5-2.jpg`, `${IMG}/products/p5-3.jpg`, `${IMG}/products/p5.jpg`],
    rating: 4.6,
    reviewCount: 22,
    inventory: 14,
    options: [
      { name: "Size", values: ["S", "M", "L", "XL"] },
      { name: "Color", values: ["Black", "Sand"] },
    ],
    badge: "new",
  },
  {
    id: "prod-12",
    handle: "club-loafer",
    name: "Club Loafer",
    shortDescription: "Penny loafer in waxed suede.",
    description:
      "A modern penny loafer in waxed Italian suede. Soft leather lining, blake-stitched leather sole. Wear it sockless in summer, with chunky knits in winter.",
    category: "footwear",
    price: 23500,
    currency: "USD",
    images: [`${IMG}/products/p3-2.jpg`, `${IMG}/products/p3-1.jpg`, `${IMG}/products/p3-3.jpg`, `${IMG}/products/p3.jpg`],
    rating: 4.4,
    reviewCount: 41,
    inventory: 11,
    options: [
      { name: "Size", values: ["7", "8", "9", "10", "11", "12"] },
      { name: "Color", values: ["Cognac", "Black"] },
    ],
  },
];

export const SHATA_STORE_DEFAULTS: StoreConfig = {
  slug: "shata-store",
  name: "Shata Store",
  tagline: "A modern store, ready to ship.",
  description:
    "Shata Store is the demo storefront powered by the Shata Website Platform. Premium product cards, a fast cart, and a clean checkout flow — fully editable by your team.",
  currency: "USD",
  locale: "en-US",

  logo: {
    text: "Shata Store",
    alt: "Shata Store wordmark",
  },

  theme: {
    primary: "#0f172a",        // slate-900 — premium ecommerce default
    primaryFg: "#ffffff",
    accent: "#635bff",         // indigo highlight
    background: "#fafaf7",     // warm off-white, classic premium ecommerce
    foreground: "#0f172a",
    muted: "#64748b",
    surface: "#ffffff",
    border: "#e6e2da",
    radius: "lg",
  },

  contact: {
    email: "hello@shatastore.demo",
    phone: "+1 (555) 010-1900",
    address: "Studio 4, 200 Founders Lane, Wilmington, DE 19801",
    hours: "Mon–Fri · 9:00–17:00 EST",
  },

  social: {
    instagram: "https://instagram.com/shatastore",
    facebook: "https://facebook.com/shatastore",
    twitter: "https://twitter.com/shatastore",
  },

  navigation: [
    { label: "Shop", href: "/templates/ecommerce/preview/shop" },
    { label: "Collections", href: "/templates/ecommerce/preview/shop?view=categories" },
    { label: "About", href: "/templates/ecommerce/preview/about" },
    { label: "Contact", href: "/templates/ecommerce/preview/contact" },
  ],

  footerLinks: [
    {
      title: "Shop",
      items: [
        { label: "All products", href: "/templates/ecommerce/preview/shop" },
        { label: "New arrivals", href: "/templates/ecommerce/preview/collections/new-arrivals" },
        { label: "Best sellers", href: "/templates/ecommerce/preview/collections/best-sellers" },
        { label: "Sale", href: "/templates/ecommerce/preview/collections/sale" },
      ],
    },
    {
      title: "Help",
      items: [
        { label: "Contact", href: "/templates/ecommerce/preview/contact" },
        { label: "Shipping", href: "/templates/ecommerce/preview/about" },
        { label: "Returns", href: "/templates/ecommerce/preview/about" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/templates/ecommerce/preview/about" },
        { label: "Powered by Shata", href: "/services/website-platform" },
      ],
    },
  ],

  sections: {
    announcement: {
      enabled: true,
      text: "Free U.S. shipping on orders over $75 · Use code SHATA10 for 10% off your first order",
    },
    hero: {
      enabled: true,
      eyebrow: "Spring collection",
      title: "Premium essentials, designed to last.",
      subtitle:
        "A focused store of modern menswear and accessories — built to wear daily, designed to outlast trends.",
      ctaLabel: "Shop the collection",
      ctaHref: "/templates/ecommerce/preview/shop",
      secondaryCtaLabel: "View best sellers",
      secondaryCtaHref: "/templates/ecommerce/preview/collections/best-sellers",
      align: "left",
    },
    categories: {
      enabled: true,
      title: "Shop by category",
      subtitle: "Curated edits for every part of your wardrobe.",
      limit: 6,
    },
    featuredProducts: {
      enabled: true,
      title: "Featured this week",
      subtitle: "What we're recommending right now.",
      limit: 8,
    },
    bannerOffer: {
      enabled: true,
      eyebrow: "Limited offer",
      title: "10% off your first order",
      subtitle: "Sign up for the Shata Store newsletter and we'll drop a one-time code straight in your inbox.",
      ctaLabel: "Sign up",
      ctaHref: "/templates/ecommerce/preview/contact",
    },
    valueProps: {
      enabled: true,
      items: [
        { title: "Free shipping over $75", copy: "Standard U.S. shipping included on every qualifying order.", icon: "shipping" },
        { title: "30-day returns", copy: "If it isn't right, send it back. No questions, no restocking fees.", icon: "returns" },
        { title: "Real-person support", copy: "Email us any time — we reply within one business day.", icon: "support" },
        { title: "Secure checkout", copy: "Stripe-powered checkout with industry-standard security.", icon: "secure" },
      ],
    },
    testimonials: {
      enabled: true,
      title: "What customers are saying",
      items: [
        { quote: "The fit and quality are incredible. The Voyage Trainer has replaced three pairs of my old sneakers.", author: "Maya P." },
        { quote: "Easy ordering, fast shipping, and the packaging actually felt premium. Coming back for more.", author: "Karim H." },
        { quote: "Customer support replied within an hour and sorted my exchange the same day.", author: "Jordan R." },
      ],
    },
    newsletter: {
      enabled: true,
      title: "Stay in the loop",
      subtitle: "New drops, restock alerts, and the occasional behind-the-scenes look — once a week, never more.",
      ctaLabel: "Subscribe",
    },
  },

  homeSectionOrder: [
    { id: "announcement", enabled: true },
    { id: "hero", enabled: true },
    { id: "value-props", enabled: true },
    { id: "categories", enabled: true },
    { id: "featured-products", enabled: true },
    { id: "banner-offer", enabled: true },
    { id: "testimonials", enabled: true },
    { id: "newsletter", enabled: true },
  ],

  categories,
  products,

  about: {
    title: "Built for the long run.",
    subtitle:
      "We make a small number of premium pieces, designed to last for years and improve as they wear in.",
    story:
      "Shata Store started with a simple idea: too many ecommerce brands chase trends, while the best clothes are quiet ones — built well, built to last, and built to be worn every day. We work with a small group of mills and workshops in Portugal, Italy, and Japan. We over-spec the materials. We under-promise on hype. And we ship every order with care.",
    values: [
      { title: "Materials first", copy: "We pick the fabric, leather, or metal first — then we design around it." },
      { title: "Made well", copy: "We work with workshops who care about the work. We pay them properly." },
      { title: "Honest pricing", copy: "Premium without the markup theatre. We tell you what it costs us." },
    ],
    stats: [
      { value: "12+", label: "Workshops" },
      { value: "4", label: "Continents" },
      { value: "94%", label: "Repeat customers" },
      { value: "<24h", label: "Reply time" },
    ],
  },

  legal: {
    termsHref: "/templates/ecommerce/preview/about",
    privacyHref: "/templates/ecommerce/preview/about",
  },
};
