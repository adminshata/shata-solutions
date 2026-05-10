// lib/spaSalon1/types.ts

export interface SpaBrand {
  name: string;
  tagline: string;
  logo: string;
  logoWhite: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    pinterest?: string;
  };
}

export interface SpaTheme {
  activeTheme: "gold" | "pink" | "rose" | "silk";
  primaryColor: string;
  accentColor: string;
}

export interface SpaNavItem {
  id: string;
  label: string;
  href: string;
  children?: SpaNavItem[];
}

export interface SpaNavigation {
  items: SpaNavItem[];
  showBookingButton: boolean;
  bookingButtonText: string;
  bookingButtonHref: string;
  topbarEnabled: boolean;
  topbarPhone: string;
  topbarEmail: string;
  topbarHours: string;
}

export interface SpaHeroSlide {
  id: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export interface SpaHomeSection {
  id: string;
  type: "hero" | "about" | "services" | "gallery" | "team" | "testimonials" | "pricing" | "blog" | "cta" | "video" | "instagram" | "brands";
  enabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
}

export interface SpaService {
  id: string;
  handle: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  duration: string;
  price: number;
  currency: string;
  featured: boolean;
  order: number;
}

export interface SpaPricingItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration?: string;
  description?: string;
}

export interface SpaPricingCategory {
  id: string;
  name: string;
  icon?: string;
  items: SpaPricingItem[];
}

export interface SpaTeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  specialties: string[];
  order: number;
}

export interface SpaGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  order: number;
}

export interface SpaTestimonial {
  id: string;
  author: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  service?: string;
  order: number;
}

export interface SpaBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
  order: number;
}

export interface SpaAppointmentSettings {
  enabled: boolean;
  title: string;
  subtitle: string;
  services: string[];
  timeSlots: string[];
  daysOpen: string[];
  note: string;
}

export interface SpaContactSettings {
  mapEmbedUrl?: string;
  formTitle: string;
  formSubtitle: string;
  showMap: boolean;
  hours: { day: string; time: string }[];
}

export interface SpaFooter {
  description: string;
  copyrightText: string;
  columns: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterPlaceholder: string;
}

export interface SpaCustomPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
}

export interface SpaSalon1Config {
  brand: SpaBrand;
  theme: SpaTheme;
  navigation: SpaNavigation;
  heroSlides: SpaHeroSlide[];
  homeSections: SpaHomeSection[];
  services: SpaService[];
  pricingCategories: SpaPricingCategory[];
  team: SpaTeamMember[];
  gallery: SpaGalleryImage[];
  testimonials: SpaTestimonial[];
  blog: SpaBlogPost[];
  appointment: SpaAppointmentSettings;
  contact: SpaContactSettings;
  footer: SpaFooter;
  customPages: SpaCustomPage[];
}
