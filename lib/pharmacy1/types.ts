export type Pharmacy1NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type Pharmacy1EditableItem = {
  id: string;
  handle: string;
  name: string;
  title?: string;
  shortDescription: string;
  description: string;
  image: string;
  price?: string;
  category?: string;
  badge?: string;
  enabled: boolean;
  featured: boolean;
};

export type Pharmacy1HomeSection = {
  id: string;
  name: string;
  type: string;
  content: string;
  enabled: boolean;
};

export type Pharmacy1Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type Pharmacy1Config = {
  brand: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
  };
  theme: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
  header: {
    nav: Pharmacy1NavItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  homeSections: Pharmacy1HomeSection[];
  heroBanners: Pharmacy1EditableItem[];
  categories: Pharmacy1EditableItem[];
  products: Pharmacy1EditableItem[];
  offers: Pharmacy1EditableItem[];
  services: Pharmacy1EditableItem[];
  brands: Pharmacy1EditableItem[];
  testimonials: Pharmacy1EditableItem[];
  blog: Pharmacy1EditableItem[];
  pages: Pharmacy1Page[];
  contact: {
    heading: string;
    formTitle: string;
    mapLabel: string;
    safetyNote: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
};
