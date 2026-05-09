import type { Agency6Config } from "./types";

export const AGENCY6_STORAGE_KEY = "shata-seo-agency-draft";

export const AGENCY6_DEFAULTS: Agency6Config = {
  brand: {
    name: "Shata SEO Agency",
    tagline: "SEO strategy, technical search, and organic growth systems",
    email: "hello@shataseo.com",
    phone: "(505) 555-0125",
    address: "3891 Ranchview Dr. Richardson",
  },
  theme: {
    primary: "#68F84F",
    accent: "#F4FF5F",
    background: "#050505",
    text: "#111111",
  },
  header: {
    ctaLabel: "Contact With Us",
    ctaHref: "/templates/agency-6/preview/contact",
    nav: [
      { id: "home", label: "Home", href: "/templates/agency-6/preview", enabled: true },
      { id: "about", label: "About Us", href: "/templates/agency-6/preview/about", enabled: true },
      { id: "services", label: "Service", href: "/templates/agency-6/preview/services", enabled: true },
      { id: "portfolio", label: "Portfolio", href: "/templates/agency-6/preview/portfolio", enabled: true },
      { id: "blog", label: "Blog", href: "/templates/agency-6/preview/blog", enabled: true },
      { id: "pages", label: "Pages", href: "/templates/agency-6/preview/faq", enabled: true },
      { id: "contact", label: "Contact", href: "/templates/agency-6/preview/contact", enabled: true },
    ],
  },
  homeSections: [
    { id: "hero", title: "Hero", type: "hero", enabled: true, content: "SEO Systems Built For Measurable Organic Growth" },
    { id: "counter", title: "Counter", type: "stats", enabled: true, content: "Reference IT solution counters and proof points" },
    { id: "services", title: "Services", type: "services", enabled: true, content: "IT, cloud, security, and automation services" },
    { id: "portfolio", title: "Portfolio", type: "projects", enabled: true, content: "Featured technology projects" },
    { id: "blog", title: "Blog", type: "posts", enabled: true, content: "Latest IT solution articles" },
  ],
  heroBanners: [
    {
      id: "it-hero",
      eyebrow: "Search strategy for ambitious teams",
      title: "SEO Systems Built For Measurable Organic Growth",
      subtitle: "Cloud, security, automation, and digital operations built from the reference design.",
      image: "/templates/agency6/imgs/hero/hero-3_01.jpg",
      enabled: true,
    },
  ],
  services: [
    {
      id: "automation",
      title: "Technical SEO",
      slug: "cloud-infrastructure",
      description: "Scalable cloud architecture, deployment, and operations support.",
      image: "/templates/agency6/imgs/service/service-3_01.jpg",
      enabled: true,
    },
    {
      id: "vision",
      title: "Cyber Security",
      slug: "cyber-security",
      description: "Security hardening, monitoring, and resilient systems planning.",
      image: "/templates/agency6/imgs/project/features-1.png",
      enabled: true,
    },
    {
      id: "analytics",
      title: "Automation Engineering",
      slug: "automation-engineering",
      description: "Workflow automation and technical process improvement.",
      image: "/templates/agency6/imgs/project/features-2.png",
      enabled: true,
    },
  ],
  portfolio: [
    {
      id: "robotics-lab",
      title: "Managed IT Platform",
      slug: "managed-it-platform",
      description: "A scalable digital operations and infrastructure project.",
      image: "/templates/agency6/imgs/project/project-img-1.jpg",
      enabled: true,
    },
    {
      id: "vision-grid",
      title: "Security Operations Grid",
      slug: "security-operations-grid",
      description: "A secure monitoring and automation control experience.",
      image: "/templates/agency6/imgs/project/project-img-2.jpg",
      enabled: true,
    },
  ],
  testimonials: [
    {
      id: "morgan",
      name: "Morgan Ellis",
      role: "Technology Director",
      quote: "The team helped us turn complex IT workflows into a clear, scalable system.",
      image: "/templates/agency6/imgs/testimonial/author-5-01.png",
      enabled: true,
    },
  ],
  team: [
    {
      id: "aiden",
      title: "Aiden Brooks",
      slug: "aiden-brooks",
      description: "Cloud Strategy Lead",
      image: "/templates/agency6/imgs/inner/team/team-thumb1_1.jpg",
      enabled: true,
    },
    {
      id: "maya",
      title: "Maya Chen",
      slug: "maya-chen",
      description: "Security Systems Architect",
      image: "/templates/agency6/imgs/inner/team/team-thumb1_2.jpg",
      enabled: true,
    },
  ],
  blog: [
    {
      id: "automation-future",
      title: "How IT Teams Scale Secure Automation",
      slug: "how-it-teams-scale-secure-automation",
      description: "Practical patterns for deploying secure automation safely.",
      image: "/templates/agency6/imgs/blog/blog-thumb1_1.jpg",
      enabled: true,
    },
  ],
  pages: [
    { id: "faq", title: "FAQ", slug: "faq", content: "Common questions about IT solution projects.", enabled: true },
  ],
  contact: {
    heading: "Start an IT solution project",
    formTitle: "Tell us what you want to improve",
    mapLabel: "Shata SEO Agency Studio",
  },
  footer: {
    copyright: "© 2026 Shata SEO Agency. All Rights Reserved.",
    description: "SEO strategy, technical search, and organic growth systems for modern teams.",
  },
};
