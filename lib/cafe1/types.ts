export type MenuItem = {
  id: string;
  handle: string;
  name: string;
  shortDescription?: string;
  description?: string;
  category: string;
  price: string;
  images: string[];
  badge?: string;
  featured?: boolean;
  active?: boolean;
};

export type NavItem = { label: string; href: string };
export type HourEntry = { day: string; time: string };
export type Testimonial = { name: string; role?: string; text: string };

export type SiteConfig = {
  brand: {
    name: string;
    tagline: string;
  };
  theme: {
    headerColor: string;
    bodyColor: string;
    accentColor: string;
    primaryBg: string;
    lightBg: string;
    radius: string;
  };
  sections: {
    hero: {
      subtitle: string;
      heading: string;
      ctaLabel: string;
    };
    offer: {
      enabled: boolean;
      heading: string;
      subtitle: string;
    };
    menu: {
      enabled: boolean;
      heading: string;
      subtitle: string;
    };
    about: {
      enabled: boolean;
      heading: string;
      subtitle: string;
      body: string;
    };
    testimonials: {
      enabled: boolean;
      heading: string;
      items: Testimonial[];
    };
    privateDining: {
      enabled: boolean;
      heading: string;
      subtitle: string;
      ctaLabel: string;
    };
    booking: {
      enabled: boolean;
      heading: string;
      subtitle: string;
      ctaLabel: string;
    };
  };
  menuItems: MenuItem[];
  contact: {
    address: string;
    phone: string;
    phone2?: string;
    email: string;
    hours: HourEntry[];
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  navigation: NavItem[];
};
