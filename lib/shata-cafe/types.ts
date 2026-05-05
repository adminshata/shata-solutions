/**
 * Shata Cafe — canonical data model.
 * Mirrors the shata-medical pattern: single SiteConfig drives the entire template.
 */

/* -------------------------------- Theme -------------------------------- */

export type SiteTheme = {
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

export type SiteLogo = {
  src?: string;
  alt: string;
  text: string;
};

/* ------------------------------- Contact ------------------------------- */

export type SiteContact = {
  email: string;
  phone: string;
  address: string;
  hours?: string;
  mapEmbedUrl?: string;
  reservationPhone?: string;
};

export type SiteSocial = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tripadvisor?: string;
  whatsapp?: string;
};

/* -------------------------------- Nav ---------------------------------- */

export type NavItem = { label: string; href: string };

/* ------------------------------ Menu ----------------------------------- */

export type MenuItemBadge = "popular" | "new" | "chef's pick" | "seasonal";

export type MenuItem = {
  id: string;
  handle: string;
  name: string;
  shortDescription?: string;
  category: string;     // matches MenuCategory.id
  price: string;
  description: string;
  images: string[];
  badge?: MenuItemBadge;
  featured?: boolean;
  active?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  image?: string;
  description?: string;
};

/* ------------------------------ Team ----------------------------------- */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  featured?: boolean;
};

/* ----------------------------- Testimonials ---------------------------- */

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  body: string;
  rating?: number;
};

/* ------------------------------- Stats --------------------------------- */

export type Stat = {
  value: string;
  label: string;
};

/* ----------------------------- Home Sections --------------------------- */

export type SectionId =
  | "hero"
  | "about"
  | "menu-categories"
  | "featured-menu"
  | "stats"
  | "gallery"
  | "team"
  | "testimonials"
  | "reservation"
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
    imageSecondary?: string;
    checkpoints?: string[];
    cta?: { label: string; href: string };
  };
  menuCategories: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  featuredMenu: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  stats: {
    backgroundImage?: string;
    items: Stat[];
  };
  gallery: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    images: { src: string; alt: string }[];
  };
  team: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  testimonials: {
    eyebrow?: string;
    title: string;
    items: Testimonial[];
  };
  reservation: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    hours: { day: string; time: string }[];
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
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  team: TeamMember[];
  legal: LegalLinks;
};
