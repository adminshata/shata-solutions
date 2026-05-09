export type Agency6NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type Agency6HomeSection = {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
  content: string;
};

export type Agency6HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  enabled: boolean;
};

export type Agency6ListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Agency6Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  enabled: boolean;
};

export type Agency6Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type Agency6Config = {
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
    nav: Agency6NavItem[];
  };
  homeSections: Agency6HomeSection[];
  heroBanners: Agency6HeroBanner[];
  services: Agency6ListItem[];
  portfolio: Agency6ListItem[];
  testimonials: Agency6Testimonial[];
  team: Agency6ListItem[];
  blog: Agency6ListItem[];
  pages: Agency6Page[];
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
