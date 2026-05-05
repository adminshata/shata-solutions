import type { Category, Product, StoreConfig } from "./types";

const IMG = "/templates/shata-home";

const categories: Category[] = [
  {
    id: "cat-1",
    handle: "living-room",
    name: "Living Room",
    description: "Sofas, accent chairs, coffee tables, and statement lighting.",
    image: `${IMG}/collections/cate__thumb1.jpg`,
    featured: true,
  },
  {
    id: "cat-2",
    handle: "bedroom",
    name: "Bedroom",
    description: "Bed frames, mattresses, wardrobes, and nightstands.",
    image: `${IMG}/collections/cate__thumb2.jpg`,
    featured: true,
  },
  {
    id: "cat-3",
    handle: "lighting",
    name: "Lighting",
    description: "Pendant lights, floor lamps, and smart lighting systems.",
    image: `${IMG}/collections/cate__thumb3.jpg`,
    featured: true,
  },
  {
    id: "cat-4",
    handle: "dining",
    name: "Dining",
    description: "Dining tables, chairs, sideboards, and bar stools.",
    image: `${IMG}/collections/cate__thumb4.jpg`,
    featured: true,
  },
  {
    id: "cat-5",
    handle: "storage",
    name: "Storage",
    description: "Shelving, bookcases, cabinets, and storage solutions.",
    image: `${IMG}/collections/cate__thumb5.jpg`,
  },
  {
    id: "cat-6",
    handle: "outdoor",
    name: "Outdoor",
    description: "Garden furniture, outdoor lighting, and patio decor.",
    image: `${IMG}/collections/cate__thumb6.jpg`,
  },
  {
    id: "cat-7",
    handle: "decor",
    name: "Decor",
    description: "Rugs, cushions, wall art, and decorative accessories.",
    image: `${IMG}/collections/cate__thumb7.jpg`,
  },
  {
    id: "cat-8",
    handle: "sale",
    name: "Sale",
    description: "Premium home pieces at sharper prices.",
    image: `${IMG}/collections/cate__thumb8.jpg`,
  },
];

const products: Product[] = [
  {
    id: "prod-1",
    handle: "nordic-accent-chair",
    name: "Nordic Accent Chair",
    shortDescription: "Solid oak frame with premium fabric upholstery.",
    description:
      "A modern Scandinavian accent chair crafted with a solid oak frame and tightly upholstered in a premium bouclé fabric. Perfect as a reading nook companion or as a statement piece in any living room. Seat height: 44 cm. Overall dimensions: 72 × 80 × 88 cm.",
    category: "living-room",
    tags: ["new", "seating", "oak"],
    price: 64900,
    compareAtPrice: 84900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__01.jpg`,
    ],
    rating: 5,
    reviewCount: 84,
    inventory: 12,
    options: [
      { name: "Fabric", values: ["Cream Bouclé", "Charcoal Bouclé", "Sage Green"] },
    ],
    featured: true,
    badge: "new",
  },
  {
    id: "prod-2",
    handle: "walnut-coffee-table",
    name: "Walnut Coffee Table",
    shortDescription: "Solid American walnut with hairpin legs.",
    description:
      "A refined coffee table cut from solid American walnut. The natural grain is sealed with a matte Danish oil finish that deepens with age. Hairpin legs in brushed steel add a mid-century feel. Dimensions: 120 × 60 × 45 cm.",
    category: "living-room",
    price: 42900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__02.jpg`,
    ],
    rating: 4,
    reviewCount: 56,
    inventory: 8,
    options: [
      { name: "Size", values: ["100 cm", "120 cm", "140 cm"] },
    ],
    featured: true,
  },
  {
    id: "prod-3",
    handle: "smart-pendant-light",
    name: "Smart Pendant Light",
    shortDescription: "App-controlled warm/cool LED, 1800–6500 K.",
    description:
      "A minimalist pendant light with a spun-aluminium shade and integrated smart LED. Control colour temperature (1800–6500 K) and brightness via the Shata Home app or voice assistants. Includes 2-metre braided cable and ceiling canopy. Shade diameter: 32 cm.",
    category: "lighting",
    tags: ["smart", "led"],
    price: 27900,
    compareAtPrice: 37900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__03.jpg`,
    ],
    rating: 4,
    reviewCount: 112,
    inventory: 24,
    options: [
      { name: "Shade colour", values: ["Matte White", "Matte Black", "Brushed Gold"] },
    ],
    featured: true,
    badge: "sale",
  },
  {
    id: "prod-4",
    handle: "memory-foam-mattress",
    name: "Memory Foam Mattress",
    shortDescription: "5-zone pocket spring with cooling foam top layer.",
    description:
      "A hotel-grade mattress combining individually wrapped pocket springs with a 5 cm pressure-relief memory foam top layer and a breathable knitted cover. Medium-firm feel. Available in all standard sizes. Delivered vacuum-compressed.",
    category: "bedroom",
    price: 89900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__04.jpg`,
    ],
    rating: 5,
    reviewCount: 203,
    inventory: 15,
    options: [
      { name: "Size", values: ["Single", "Double", "Queen", "King"] },
    ],
    featured: true,
    badge: "bestseller",
  },
  {
    id: "prod-5",
    handle: "linen-sectional-sofa",
    name: "Linen Sectional Sofa",
    shortDescription: "4-seat L-shape, removable linen covers.",
    description:
      "A large-format sectional with a solid hardwood frame, high-resilience foam cushions, and 100% European linen covers that unzip for machine washing. Modular — the chaise can be placed on either side. Dimensions: 290 × 175 × 88 cm.",
    category: "living-room",
    tags: ["large", "modular"],
    price: 189900,
    compareAtPrice: 229900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__05.jpg`,
    ],
    rating: 4,
    reviewCount: 67,
    inventory: 5,
    options: [
      { name: "Colour", values: ["Natural Linen", "Pebble Grey", "Warm Ivory"] },
      { name: "Chaise side", values: ["Left", "Right"] },
    ],
    featured: true,
    badge: "sale",
  },
  {
    id: "prod-6",
    handle: "rattan-storage-shelf",
    name: "Rattan Storage Shelf",
    shortDescription: "Steel frame with woven rattan panels.",
    description:
      "A five-tier open shelf with a powder-coated steel frame and handwoven rattan panel backing. Adds warmth and texture while keeping everyday items accessible. Dimensions: 80 × 35 × 165 cm. Max load per shelf: 10 kg.",
    category: "storage",
    price: 34900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__06.jpg`,
    ],
    rating: 4,
    reviewCount: 44,
    inventory: 18,
    options: [
      { name: "Colour", values: ["Black Frame", "White Frame"] },
    ],
    featured: true,
  },
  {
    id: "prod-7",
    handle: "marble-side-table",
    name: "Marble Side Table",
    shortDescription: "White Carrara marble top, brass base.",
    description:
      "A compact side table with a 2 cm White Carrara marble top and a handcrafted brushed-brass tubular base. Each piece is unique — marble veining varies. Height: 55 cm. Top diameter: 40 cm. Weight: 8 kg.",
    category: "living-room",
    price: 29900,
    compareAtPrice: 39900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__07.jpg`,
    ],
    rating: 5,
    reviewCount: 38,
    inventory: 9,
    options: [
      { name: "Base finish", values: ["Brushed Brass", "Matte Black"] },
    ],
    featured: true,
    badge: "new",
  },
  {
    id: "prod-8",
    handle: "velvet-bed-frame",
    name: "Velvet Bed Frame",
    shortDescription: "Deep buttoned headboard, solid plywood base.",
    description:
      "A statement bed frame with a deep-buttoned headboard upholstered in performance velvet and a solid plywood slatted base — no box spring required. Headboard height from floor: 120 cm. Available in all standard sizes.",
    category: "bedroom",
    price: 79900,
    currency: "USD",
    images: [
      `${IMG}/products/products__thumb__08.jpg`,
    ],
    rating: 4,
    reviewCount: 91,
    inventory: 11,
    options: [
      { name: "Size", values: ["Double", "Queen", "King", "Super King"] },
      { name: "Colour", values: ["Midnight Blue", "Forest Green", "Blush Pink", "Charcoal"] },
    ],
  },
];

export const SHATA_HOME_DEFAULTS: StoreConfig = {
  slug: "shata-home",
  name: "Shata Home",
  tagline: "Premium furniture, lighting & home decor.",
  description:
    "Shata Home is the furniture & decor demo storefront powered by the Shata Website Platform. Premium product cards, a fast cart, and a clean checkout flow — fully editable by your team.",
  currency: "USD",
  locale: "en-US",

  logo: {
    text: "Shata Home",
    alt: "Shata Home wordmark",
  },

  theme: {
    primary: "#dc2626",       // red-600 — bold furniture brand
    primaryFg: "#ffffff",
    accent: "#dc2626",
    background: "#ffffff",
    foreground: "#111827",    // gray-900
    muted: "#6b7280",         // gray-500
    surface: "#f9fafb",       // gray-50
    border: "#e5e7eb",        // gray-200
    radius: "sm",
  },

  contact: {
    email: "hello@shatahome.demo",
    phone: "1800 665 222",
    address: "502 New Design Street, Melbourne, Australia",
    hours: "Mon–Fri · 9:00–18:00 AEST",
  },

  social: {
    instagram: "https://instagram.com/shatahome",
    facebook: "https://facebook.com/shatahome",
    twitter: "https://twitter.com/shatahome",
    youtube: "https://youtube.com/shatahome",
  },

  navigation: [
    { label: "Shop", href: "/templates/ecommerce-2/preview/shop" },
    { label: "Collections", href: "/templates/ecommerce-2/preview/shop?view=categories" },
    { label: "About", href: "/templates/ecommerce-2/preview/about" },
    { label: "Contact", href: "/templates/ecommerce-2/preview/contact" },
  ],

  footerLinks: [
    {
      title: "Shop",
      items: [
        { label: "All products", href: "/templates/ecommerce-2/preview/shop" },
        { label: "Living Room", href: "/templates/ecommerce-2/preview/collections/living-room" },
        { label: "Bedroom", href: "/templates/ecommerce-2/preview/collections/bedroom" },
        { label: "Lighting", href: "/templates/ecommerce-2/preview/collections/lighting" },
        { label: "Sale", href: "/templates/ecommerce-2/preview/collections/sale" },
      ],
    },
    {
      title: "Help",
      items: [
        { label: "Contact", href: "/templates/ecommerce-2/preview/contact" },
        { label: "Delivery & returns", href: "/templates/ecommerce-2/preview/about" },
        { label: "Track your order", href: "/templates/ecommerce-2/preview/contact" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Shata Home", href: "/templates/ecommerce-2/preview/about" },
        { label: "Powered by Shata", href: "/services/website-platform" },
      ],
    },
  ],

  sections: {
    announcement: {
      enabled: true,
      text: "Free delivery on all orders over $500 · Use code SHATA20 for 20% off your first order",
    },
    hero: {
      enabled: true,
      eyebrow: "End Season Sale",
      title: "Premium furniture & home decor.",
      subtitle:
        "Beautifully crafted pieces for every room. From bold statement sofas to refined accent lighting — built to last, designed to impress.",
      ctaLabel: "Shop the collection",
      ctaHref: "/templates/ecommerce-2/preview/shop",
      secondaryCtaLabel: "View sale items",
      secondaryCtaHref: "/templates/ecommerce-2/preview/collections/sale",
      image: `${IMG}/bg/h1__hero__bg.png`,
      align: "left",
    },
    categories: {
      enabled: true,
      title: "Shop by category",
      subtitle: "From living room to outdoor — find every room covered.",
      limit: 8,
    },
    featuredProducts: {
      enabled: true,
      title: "Featured this week",
      subtitle: "Our team picks — the pieces worth knowing about right now.",
      limit: 8,
    },
    bannerOffer: {
      enabled: true,
      eyebrow: "Limited time",
      title: "Up to 55% off sofa & bedroom sets.",
      subtitle:
        "End-of-season clearance on our best-selling furniture collections. Free delivery included on all sale orders over $500.",
      ctaLabel: "Shop the sale",
      ctaHref: "/templates/ecommerce-2/preview/collections/sale",
      image: `${IMG}/offer/offer__thumb__3.jpg`,
    },
    valueProps: {
      enabled: true,
      items: [
        { title: "Easy returns", copy: "Not the right fit? Return within 30 days, no questions asked.", icon: "returns" },
        { title: "Money-back guarantee", copy: "100% satisfaction or your money back on all orders.", icon: "secure" },
        { title: "Live support", copy: "Talk to our team via chat, phone, or email. 7 days a week.", icon: "support" },
        { title: "Free delivery", copy: "Complimentary delivery on all orders over $500.", icon: "shipping" },
      ],
    },
    testimonials: {
      enabled: true,
      title: "What our customers say",
      items: [
        {
          quote: "The Nordic Accent Chair arrived beautifully packaged and looks even better in person. Perfect quality.",
          author: "Sarah M.",
          role: "Melbourne, AU",
        },
        {
          quote: "Fast delivery, excellent packaging, and the marble side table is absolutely stunning. Highly recommend.",
          author: "James K.",
          role: "Sydney, AU",
        },
        {
          quote: "Customer support sorted my exchange in 24 hours. The sectional sofa is now my favourite thing in the house.",
          author: "Priya R.",
          role: "Brisbane, AU",
        },
      ],
    },
    newsletter: {
      enabled: true,
      title: "Join the Shata Home community",
      subtitle:
        "Get first access to new arrivals, exclusive member discounts, and interior design inspiration — once a week.",
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
    title: "Furniture built to last a lifetime.",
    subtitle:
      "We curate and craft premium furniture and home decor — sourced from the world's best workshops, delivered straight to your door.",
    story:
      "Shata Home was founded on one idea: that premium furniture shouldn't be hard to find or impossible to afford. We work directly with workshops in Scandinavia, Italy, and Southeast Asia — sourcing solid materials, removing the middlemen, and passing the savings to you.\n\nEvery piece in our catalogue has been selected by our design team for quality, durability, and timeless appeal. We don't chase trends. We build collections you'll still love in twenty years.",
    values: [
      {
        title: "Materials first",
        copy: "Solid wood, genuine leather, natural stone — we specify materials the way a craftsman would.",
      },
      {
        title: "Direct sourcing",
        copy: "We visit every workshop. No middlemen means better prices and better quality control.",
      },
      {
        title: "Built to last",
        copy: "Our pieces are designed for decades of use. We offer repair and spare-parts services for life.",
      },
    ],
    stats: [
      { value: "5,000+", label: "Products" },
      { value: "120+", label: "Brands" },
      { value: "98%", label: "Happy clients" },
      { value: "24h", label: "Reply time" },
    ],
  },

  legal: {
    termsHref: "/templates/ecommerce-2/preview/about",
    privacyHref: "/templates/ecommerce-2/preview/about",
    refundsHref: "/templates/ecommerce-2/preview/about",
  },
};
