/**
 * Shata Store — canonical data model.
 *
 * One config drives the entire storefront. Built so it can move from a
 * defaults.ts file (Tier 1) to a Supabase row (Tier 2) without changing
 * a single component. Storefront reads from `useStore()`, period.
 *
 * Money values are stored as integer USD cents to avoid float drift.
 */

export type Money = number; // integer cents

/* -------------------------------- Theme -------------------------------- */

export type StoreTheme = {
  /** Brand color, used for primary CTAs and accents (hex or any CSS color). */
  primary: string;
  /** Foreground color used on top of `primary` (e.g. white on a dark primary). */
  primaryFg: string;
  /** Secondary accent — used for highlights, sale badges. */
  accent: string;
  /** Page background (used by the storefront wrapper). */
  background: string;
  /** Default text color. */
  foreground: string;
  /** Muted text. */
  muted: string;
  /** Surface — cards, inputs, dropdowns. */
  surface: string;
  /** Card / divider border color. */
  border: string;
  /** Corner-radius scale. */
  radius: "sm" | "md" | "lg";
};

/* -------------------------------- Logo --------------------------------- */

export type StoreLogo = {
  /** Optional public-path image. If unset we render the text. */
  src?: string;
  alt: string;
  /** Always present — used as fallback and as the wordmark next to the icon. */
  text: string;
};

/* ------------------------------- Contact ------------------------------- */

export type StoreContact = {
  email: string;
  phone: string;
  address: string;
  hours?: string;
};

export type StoreSocial = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  whatsapp?: string;
};

/* -------------------------------- Nav ---------------------------------- */

export type NavItem = { label: string; href: string };

/* ------------------------------ Catalog -------------------------------- */

export type ProductBadge = "new" | "sale" | "bestseller" | "limited";

export type ProductOption = {
  name: string;            // e.g. "Size", "Color"
  values: string[];        // e.g. ["S","M","L"], ["Black","White"]
};

export type Product = {
  id: string;
  handle: string;          // url slug
  name: string;
  shortDescription?: string;
  description: string;     // markdown-lite plain text
  category: string;        // category handle
  tags?: string[];
  price: Money;            // cents
  compareAtPrice?: Money;  // optional original price for showing a discount
  currency: "USD";         // future: per-store currency
  images: string[];        // public paths; first is primary
  rating?: number;         // 0..5
  reviewCount?: number;
  inventory?: number;      // optional stock count
  options?: ProductOption[];
  featured?: boolean;
  /** Visible to customers. Defaults to true if undefined. */
  active?: boolean;
  badge?: ProductBadge;
};

export type Category = {
  id: string;
  handle: string;
  name: string;
  description: string;
  image: string;
  featured?: boolean;
};

/* ------------------------------ Sections ------------------------------- */

export type SectionId =
  | "announcement"
  | "hero"
  | "categories"
  | "featured-products"
  | "banner-offer"
  | "value-props"
  | "testimonials"
  | "newsletter";

export type AnnouncementSection = {
  enabled: boolean;
  text: string;
  href?: string;
};

export type HeroSection = {
  enabled: boolean;
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: string;          // optional hero image (uses gradient fallback)
  align: "left" | "center";
};

export type CategoriesSection = {
  enabled: boolean;
  title: string;
  subtitle?: string;
  /** Show all categories, or limit. */
  limit?: number;
};

export type FeaturedProductsSection = {
  enabled: boolean;
  title: string;
  subtitle?: string;
  /** If empty, falls back to products marked `featured: true`. */
  productHandles?: string[];
  limit?: number;
};

export type BannerOfferSection = {
  enabled: boolean;
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
};

export type ValuePropsSection = {
  enabled: boolean;
  items: { title: string; copy: string; icon: "shipping" | "support" | "returns" | "secure" }[];
};

export type Testimonial = { quote: string; author: string; role?: string };
export type TestimonialsSection = {
  enabled: boolean;
  title: string;
  items: Testimonial[];
};

export type NewsletterSection = {
  enabled: boolean;
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export type StoreSections = {
  announcement: AnnouncementSection;
  hero: HeroSection;
  categories: CategoriesSection;
  featuredProducts: FeaturedProductsSection;
  bannerOffer: BannerOfferSection;
  valueProps: ValuePropsSection;
  testimonials: TestimonialsSection;
  newsletter: NewsletterSection;
};

/** Order + on/off of sections on the home page. */
export type SectionOrderItem = { id: SectionId; enabled: boolean };

/* -------------------------------- Pages -------------------------------- */

export type AboutPage = {
  title: string;
  subtitle: string;
  story: string;            // long-form text
  values: { title: string; copy: string }[];
  stats?: { value: string; label: string }[];
};

export type LegalLinks = {
  termsHref?: string;
  privacyHref?: string;
  refundsHref?: string;
};

/* ------------------------------ Top-level ------------------------------ */

export type StoreConfig = {
  /** Internal slug — used for the public URL when stored in a multi-tenant DB. */
  slug: string;
  /** Display name. */
  name: string;
  /** One-line positioning. */
  tagline: string;
  /** Long description, used for SEO + about. */
  description: string;
  /** Default currency. Locked to USD in this pass; theme is structured to add later. */
  currency: "USD";
  /** Locale + region — used for `Intl.NumberFormat`. */
  locale: string;

  logo: StoreLogo;
  theme: StoreTheme;
  contact: StoreContact;
  social: StoreSocial;

  /** Header navigation. */
  navigation: NavItem[];
  /** Footer column groups (label → links). */
  footerLinks: { title: string; items: NavItem[] }[];

  /** All sections + their content. Toggleable individually. */
  sections: StoreSections;

  /** Order + on/off of sections on the home page. */
  homeSectionOrder: SectionOrderItem[];

  /** Catalog. */
  categories: Category[];
  products: Product[];

  about: AboutPage;
  legal: LegalLinks;
};

/* -------------------------------- Cart --------------------------------- */

export type CartLine = {
  productId: string;
  /** Selected option values keyed by option name, e.g. {"Size":"M","Color":"Black"} */
  options?: Record<string, string>;
  quantity: number;
};

export type Cart = {
  lines: CartLine[];
};
