export type Agency3NavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type Agency3HomeSection = {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
  content: string;
};

export type Agency3HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  enabled: boolean;
};

export type Agency3ListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Agency3Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  enabled: boolean;
};

export type Agency3Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type Agency3Config = {
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
    nav: Agency3NavItem[];
  };
  homeSections: Agency3HomeSection[];
  heroBanners: Agency3HeroBanner[];
  services: Agency3ListItem[];
  portfolio: Agency3ListItem[];
  testimonials: Agency3Testimonial[];
  team: Agency3ListItem[];
  blog: Agency3ListItem[];
  pages: Agency3Page[];
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
