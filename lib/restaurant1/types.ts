export type NavLink = { label: string; href: string };

export type CustomPage = {
  id: string;
  title: string;
  slug: string;
  content: string;
  enabled: boolean;
};

export type HomeSection = {
  id: string;
  label: string;
  enabled: boolean;
};

export type Slide = {
  id: string;
  image: string;
  subheadline: string;
  headline: string;
  bio: string;
  ctaLabel: string;
  ctaHref: string;
};

export type TabPanel = {
  id: string;
  label: string;
  content: string;
};

export type SpecialDish = {
  id: string;
  price: string;
  title: string;
  description: string;
};

export type MenuItem = {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: string;
  weight?: string;
  badge?: string;
  image: string;
  category: string;
  featured?: boolean;
  active?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  handle: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

export type Chef = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  image: string;
  rating: number;
  text: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author?: string;
};

export type HourEntry = { day: string; hours: string };

export type SiteConfig = {
  brand: {
    name: string;
    tagline: string;
    logo: string;
    logoLight: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    darkColor: string;
    lightColor: string;
    bodyFont: string;
    headingFont: string;
  };
  hero: {
    slides: Slide[];
  };
  about: {
    subtitle: string;
    heading: string;
    description: string;
    tabs: { id: string; label: string }[];
  };
  specials: {
    subtitle: string;
    heading: string;
    bgImage: string;
    dishes: SpecialDish[];
  };
  menuSection: {
    subtitle: string;
    heading: string;
    description: string;
    categories: MenuCategory[];
  };
  testimonials: {
    subtitle: string;
    heading: string;
    bgImage: string;
    items: Testimonial[];
  };
  blog: {
    subtitle: string;
    heading: string;
    description: string;
    posts: BlogPost[];
  };
  gallery: {
    items: GalleryItem[];
  };
  chefs: {
    subtitle: string;
    heading: string;
    items: Chef[];
  };
  reservation: {
    heading: string;
    description: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: HourEntry[];
    facebook?: string;
    twitter?: string;
    instagram?: string;
    pinterest?: string;
    mapEmbed?: string;
  };
  footer: {
    copyright: string;
    newsletterPlaceholder: string;
  };
  navigation: NavLink[];
  menuItems: MenuItem[];
  homeSections?: HomeSection[];
  customPages?: CustomPage[];
};
