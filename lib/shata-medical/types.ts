/**
 * Shata Medical — canonical data model.
 *
 * Mirrors the lib/shata-home pattern: a single SiteConfig is the
 * source of truth for the entire template. Every component reads
 * from context, not from hardcoded arrays.
 *
 * Tier 1: localStorage. Tier 2: swap persistence layer only.
 */

/* -------------------------------- Theme -------------------------------- */

export type SiteTheme = {
  primary: string;      // e.g. "#1565c0"
  primaryFg: string;    // text on primary bg
  accent: string;       // e.g. "#0288d1"
  background: string;
  foreground: string;
  muted: string;
  surface: string;
  border: string;
  radius: "sm" | "md" | "lg";
};

/* -------------------------------- Logo --------------------------------- */

export type SiteLogo = {
  src?: string;
  alt: string;
  text: string;
};

/* ------------------------------- Contact ------------------------------- */

export type SiteContact = {
  email: string;
  phone: string;
  emergencyPhone?: string;
  address: string;
  hours?: string;
  mapEmbedUrl?: string;
};

export type SiteSocial = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  whatsapp?: string;
};

/* -------------------------------- Nav ---------------------------------- */

export type NavItem = { label: string; href: string };

/* ------------------------------ Services ------------------------------- */

export type ServiceBadge = "new" | "popular" | "featured";

export type Service = {
  id: string;
  handle: string;
  name: string;
  shortDescription?: string;
  description: string;
  category: string;           // department handle
  department?: string;        // display label
  duration?: string;          // e.g. "30–60 min"
  priceLabel?: string;        // e.g. "From $120"
  highlights?: string[];      // bullet features shown on detail page
  images: string[];
  icon?: string;              // path to icon image
  badge?: ServiceBadge;
  featured?: boolean;
  active?: boolean;
  tags?: string[];
};

/* ------------------------------ Doctors -------------------------------- */

export type Doctor = {
  id: string;
  handle: string;
  name: string;
  specialty: string;
  shortBio?: string;
  bio: string;
  image: string;
  qualifications?: string[];  // ["MBBS", "FRCS", …]
  languages?: string[];
  availability?: string;      // "Mon–Fri, 9am–5pm"
  email?: string;
  phone?: string;
  department?: string;        // department handle for linking
  featured?: boolean;
  active?: boolean;
};

/* ----------------------------- Testimonials ---------------------------- */

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  body: string;
  rating?: number;  // 1–5
};

/* ------------------------------- Stats --------------------------------- */

export type Stat = {
  value: string;
  label: string;
  icon?: string;
};

/* ------------------------------- About --------------------------------- */

export type AboutPage = {
  title: string;
  subtitle: string;
  story: string;
  mission?: string;
  vision?: string;
  image?: string;
  stats: Stat[];
  values: { title: string; copy: string }[];
};

/* ----------------------------- Departments ----------------------------- */

export type Department = {
  id: string;
  handle: string;
  name: string;
  description?: string;
  icon?: string;
};

/* ----------------------------- Home Sections --------------------------- */

export type SectionId =
  | "hero"
  | "departments"
  | "about"
  | "stats"
  | "featured-services"
  | "doctors"
  | "process"
  | "testimonials"
  | "cta"
  | "newsletter";

export type SectionOrderItem = {
  id: SectionId;
  enabled: boolean;
};

/* ---------------------------- Hero ------------------------------------- */

export type HeroSlide = {
  heading: string;
  subheading: string;
  image: string;
  cta?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

/* ----------------------------- Sections -------------------------------- */

export type SiteSections = {
  announcement?: { enabled: boolean; text: string };
  hero: {
    slides: HeroSlide[];
  };
  about: {
    eyebrow?: string;
    title: string;
    body: string;
    image?: string;
    checkpoints?: string[];
    cta?: { label: string; href: string };
  };
  stats: {
    backgroundImage?: string;
    items: Stat[];
  };
  featuredServices: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  doctors: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  process: {
    eyebrow?: string;
    title: string;
    backgroundImage?: string;
    steps: { number: string; title: string; copy: string; icon?: string }[];
  };
  testimonials: {
    eyebrow?: string;
    title: string;
    items: Testimonial[];
  };
  cta: {
    title: string;
    subtitle?: string;
    image?: string;
    cta: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  };
  newsletter: {
    title: string;
    subtitle?: string;
    placeholder?: string;
  };
};

/* ----------------------------- Legal ----------------------------------- */

export type LegalLinks = {
  privacy?: string;
  terms?: string;
  cookies?: string;
};

/* ----------------------------- Site Config ----------------------------- */

export type SiteConfig = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  locale: string;
  logo: SiteLogo;
  theme: SiteTheme;
  contact: SiteContact;
  social: SiteSocial;
  navigation: NavItem[];
  footerLinks: { title: string; items: NavItem[] }[];
  sections: SiteSections;
  homeSectionOrder: SectionOrderItem[];
  departments: Department[];
  services: Service[];
  doctors: Doctor[];
  about: AboutPage;
  legal: LegalLinks;
};
