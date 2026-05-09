export type Agency8NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type Agency8HomeSection = {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
  content: string;
};

export type Agency8HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  enabled: boolean;
};

export type Agency8ListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Agency8Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  enabled: boolean;
};

export type Agency8Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type Agency8Config = {
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
    nav: Agency8NavItem[];
  };
  homeSections: Agency8HomeSection[];
  heroBanners: Agency8HeroBanner[];
  services: Agency8ListItem[];
  portfolio: Agency8ListItem[];
  testimonials: Agency8Testimonial[];
  team: Agency8ListItem[];
  blog: Agency8ListItem[];
  pages: Agency8Page[];
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
