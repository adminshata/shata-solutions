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
  page: string;
  path: string;
  slug: string;
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
  };
  theme: {
    accentColor: string;
    bgColor: string;
    darkColor: string;
    textColor: string;
    secondaryTextColor: string;
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
  blog: BlogPost[];
  pages: PageItem[];
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
  };
}
