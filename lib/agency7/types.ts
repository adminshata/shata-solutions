export type Agency7NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type Agency7HomeSection = {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
  content: string;
};

export type Agency7HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  enabled: boolean;
};

export type Agency7ListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Agency7Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  enabled: boolean;
};

export type Agency7Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type Agency7Config = {
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
    nav: Agency7NavItem[];
  };
  homeSections: Agency7HomeSection[];
  heroBanners: Agency7HeroBanner[];
  services: Agency7ListItem[];
  portfolio: Agency7ListItem[];
  testimonials: Agency7Testimonial[];
  team: Agency7ListItem[];
  blog: Agency7ListItem[];
  pages: Agency7Page[];
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
