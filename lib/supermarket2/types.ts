export interface Product {
  id: number;
  slug: string;
  image: string;
  bannerImg?: string;
  category?: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  price?: string;
  descripTion?: string;
}

export interface Post {
  id: number;
  slug: string;
  image: string;
  bannerImg?: string;
  category?: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  descripTion?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  slug: string;
}

export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  active: boolean;
}

export interface WishlistItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CompareItem {
  image: string;
  name: string;
  price: string;
  description: string;
  rating: number;
  ratingCount: number;
  weight: string;
  inStock: boolean;
}

export interface StoreTheme {
  primary: string;
  primaryFg: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  surface: string;
  border: string;
  radius: "sm" | "md" | "lg";
  fontStyle: "clean" | "classic" | "rounded";
}

export interface StoreCategory {
  id: string;
  handle: string;
  name: string;
  image?: string;
  icon?: string;
  parent?: string;
  active?: boolean;
}

export interface StoreProduct {
  id: string;
  handle: string;
  name: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  images: string[];
  badge?: string | null;
  featured?: boolean;
  active?: boolean;
  price: number;
  compareAtPrice?: number;
  unit?: string;
  stock?: number;
  rating?: number;
}

export type ProductBadge = "sale" | "new" | "hot" | "organic";

export interface HomeSection {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  active: boolean;
  order: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  active: boolean;
}

export interface OfferDeal {
  id: string;
  title: string;
  discountText: string;
  countdownDate: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
}

export interface StoreBlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  active: boolean;
}

export interface StoreVendor {
  id: string;
  name: string;
  handle: string;
  logo?: string;
  image: string;
  description: string;
  rating: number;
  address: string;
  contact: string;
  active: boolean;
}

export interface StaticPageContent {
  id: string;
  title: string;
  subtitle?: string;
  heroImage?: string;
  content: string;
  active: boolean;
}

export interface HeaderNavConfig {
  topBarText: string;
  countdownText: string;
  countdownDate: string;
  saleBlockText: string;
  trendingText: string;
  menuItems: { id: string; label: string; href: string; visible: boolean }[];
  shopMegaMenu: { group: string; items: { label: string; href: string }[] }[];
  pagesDropdown: { label: string; href: string }[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  logo: { text: string; image?: string };
  theme: StoreTheme;
  contact: {
    email: string;
    phone: string;
    phone2?: string;
    address: string;
    hours?: string;
    deliveryHours?: string;
    mapText?: string;
    formLabels?: {
      name: string;
      email: string;
      phone: string;
      message: string;
      button: string;
    };
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  announcement: {
    active: boolean;
    text: string;
  };
  header: HeaderNavConfig;
  sections: HomeSection[];
  slides: HeroSlide[];
  categories: StoreCategory[];
  products: StoreProduct[];
  offers: OfferDeal[];
  blog: StoreBlogPost[];
  vendors: StoreVendor[];
  pages: StaticPageContent[];
  footer: {
    newsletterTitle: string;
    newsletterText: string;
    copyright: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    paymentIcons: string[];
  };
}
