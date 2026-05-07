export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface HeroSlide {
  image: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  year: string;
  image: string;
  tags: string[];
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage: string;
  category: string;
  image: string;
  content: string;
}

export interface PageItem {
  slug: string;
  page: string;
  title: string;
  path: string;
  content: string;
  enabled: boolean;
}

export interface WorkProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface HomeSection {
  id: string;
  label: string;
  enabled: boolean;
  title?: string;
  subtitle?: string;
  content?: string;
}

export interface Agency1Config {
  brand: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    founded: string;
    yearsOfExcellence: number;
    clientsCount: string;
    projectsCount: string;
    teamCount: string;
    awardsCount: string;
    logoText?: string;
  };
  theme: {
    accentColor: string;
    bgColor: string;
    darkColor: string;
    textColor: string;
    secondaryTextColor: string;
    radius?: number;
    fontFamily?: string;
  };
  header: {
    stickyHeader: boolean;
    showGetInTouchBtn: boolean;
    ctaLabel: string;
    ctaLink: string;
    address: string;
    email: string;
    phone: string;
  };
  hero: {
    yearsBadge: number;
    yearsBadgeLabel: string;
    title: string;
    clientsLabel: string;
    videoUrl: string;
    slides: HeroSlide[];
  };
  homeSections: HomeSection[];
  navItems: NavItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  blogPosts: BlogPost[];
  /** @deprecated legacy key */
  blog?: BlogPost[];
  pages: PageItem[];
  workProcess: WorkProcessStep[];
  faqs: FAQItem[];
  contact: {
    title: string;
    subtitle: string;
    intro: string;
    office: string;
    email: string;
    phone: string;
    hours: string;
    socials: {
      twitter: string;
      linkedin: string;
      github: string;
      youtube: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
    marqueeText: string;
    address: string;
    email: string;
    phone: string;
    social: {
      facebook: string;
      twitter: string;
      linkedin: string;
      youtube: string;
      vimeo: string;
    };
    columns?: FooterColumn[];
  };
}

export type FooterColumn =
  | { type: "contact"; title: string; value: string; href?: string }
  | { type: "link"; title: string; items: { label: string; href: string }[] };
