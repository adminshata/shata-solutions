export type FlowerShop1NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type FlowerShop1EditableItem = {
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

export type FlowerShop1HomeSection = {
  id: string;
  name: string;
  type: string;
  content: string;
  enabled: boolean;
};

export type FlowerShop1Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type FlowerShop1Config = {
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
    nav: FlowerShop1NavItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  homeSections: FlowerShop1HomeSection[];
  heroBanners: FlowerShop1EditableItem[];
  categories: FlowerShop1EditableItem[];
  products: FlowerShop1EditableItem[];
  occasions: FlowerShop1EditableItem[];
  offers: FlowerShop1EditableItem[];
  testimonials: FlowerShop1EditableItem[];
  blog: FlowerShop1EditableItem[];
  pages: FlowerShop1Page[];
  contact: {
    heading: string;
    formTitle: string;
    mapLabel: string;
    note: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
};
