export type Agency4NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type Agency4HomeSection = {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
  content: string;
};

export type Agency4HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  enabled: boolean;
};

export type Agency4ListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Agency4Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  enabled: boolean;
};

export type Agency4Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type Agency4Config = {
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
    ctaLabel: string;
    ctaHref: string;
    nav: Agency4NavItem[];
  };
  homeSections: Agency4HomeSection[];
  heroBanners: Agency4HeroBanner[];
  services: Agency4ListItem[];
  portfolio: Agency4ListItem[];
  testimonials: Agency4Testimonial[];
  team: Agency4ListItem[];
  blog: Agency4ListItem[];
  pages: Agency4Page[];
  contact: {
    heading: string;
    formTitle: string;
    mapLabel: string;
  };
  footer: {
    copyright: string;
    description: string;
  };
};
