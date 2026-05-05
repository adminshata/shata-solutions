/**
 * Shata Home — canonical data model.
 *
 * Identical contract to lib/shata-store/types.ts so the same
 * StoreShell / preview pages can be duplicated and pointed at
 * this lib without any shape changes.
 *
 * Money values are stored as integer USD cents.
 */

export type Money = number; // integer cents

/* -------------------------------- Theme -------------------------------- */

export type StoreTheme = {
  primary: string;
  primaryFg: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  surface: string;
  border: string;
  radius: "sm" | "md" | "lg";
};

/* -------------------------------- Logo --------------------------------- */

export type StoreLogo = {
  src?: string;
  alt: string;
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
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  name: string;
  shortDescription?: string;
  description: string;
  category: string;
  tags?: string[];
  price: Money;
  compareAtPrice?: Money;
  currency: "USD";
  images: string[];
  rating?: number;
  reviewCount?: number;
  inventory?: number;
  options?: ProductOption[];
  featured?: boolean;
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
  image?: string;
  align: "left" | "center";
};

export type CategoriesSection = {
  enabled: boolean;
  title: string;
  subtitle?: string;
  limit?: number;
};

export type FeaturedProductsSection = {
  enabled: boolean;
  title: string;
  subtitle?: string;
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

export type SectionOrderItem = { id: SectionId; enabled: boolean };

/* -------------------------------- Pages -------------------------------- */

export type AboutPage = {
  title: string;
  subtitle: string;
  story: string;
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
  slug: string;
  name: string;
  tagline: string;
  description: string;
  currency: "USD";
  locale: string;

  logo: StoreLogo;
  theme: StoreTheme;
  contact: StoreContact;
  social: StoreSocial;

  navigation: NavItem[];
  footerLinks: { title: string; items: NavItem[] }[];

  sections: StoreSections;
  homeSectionOrder: SectionOrderItem[];

  categories: Category[];
  products: Product[];

  about: AboutPage;
  legal: LegalLinks;
};

/* -------------------------------- Cart --------------------------------- */

export type CartLine = {
  productId: string;
  options?: Record<string, string>;
  quantity: number;
};

export type Cart = {
  lines: CartLine[];
};
