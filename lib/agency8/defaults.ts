import type { Agency8Config } from "./types";

export const AGENCY8_STORAGE_KEY = "shata-saas-startups-draft";

export const AGENCY8_DEFAULTS: Agency8Config = {
  brand: {
    name: "Shata SaaS & Startups",
    tagline: "SaaS product strategy, startup systems, and launch operations",
    email: "hello@shatasaas.com",
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
    ctaHref: "/templates/agency-8/preview/contact",
    nav: [
      { id: "home", label: "Home", href: "/templates/agency-8/preview", enabled: true },
      { id: "about", label: "About Us", href: "/templates/agency-8/preview/about", enabled: true },
      { id: "services", label: "Service", href: "/templates/agency-8/preview/services", enabled: true },
      { id: "portfolio", label: "Portfolio", href: "/templates/agency-8/preview/portfolio", enabled: true },
      { id: "blog", label: "Blog", href: "/templates/agency-8/preview/blog", enabled: true },
      { id: "pages", label: "Pages", href: "/templates/agency-8/preview/faq", enabled: true },
      { id: "contact", label: "Contact", href: "/templates/agency-8/preview/contact", enabled: true },
    ],
  },
  homeSections: [
    { id: "hero", title: "Hero", type: "hero", enabled: true, content: "Launch And Scale SaaS Products With Confidence" },
    { id: "counter", title: "Counter", type: "stats", enabled: true, content: "Reference IT solution counters and proof points" },
    { id: "services", title: "Services", type: "services", enabled: true, content: "IT, cloud, security, and automation services" },
    { id: "portfolio", title: "Portfolio", type: "projects", enabled: true, content: "Featured technology projects" },
    { id: "blog", title: "Blog", type: "posts", enabled: true, content: "Latest IT solution articles" },
  ],
  heroBanners: [
    {
      id: "it-hero",
      eyebrow: "Startup systems for SaaS teams",
      title: "Launch And Scale SaaS Products With Confidence",
      subtitle: "Cloud, security, automation, and digital operations built from the reference design.",
      image: "/templates/agency8/imgs/hero/hero-3_01.jpg",
      enabled: true,
    },
  ],
  services: [
    {
      id: "automation",
      title: "SaaS Product Systems",
      slug: "cloud-infrastructure",
      description: "Scalable cloud architecture, deployment, and operations support.",
      image: "/templates/agency8/imgs/service/service-3_01.jpg",
      enabled: true,
    },
    {
      id: "vision",
      title: "Cyber Security",
      slug: "cyber-security",
      description: "Security hardening, monitoring, and resilient systems planning.",
      image: "/templates/agency8/imgs/project/features-1.png",
      enabled: true,
    },
    {
      id: "analytics",
      title: "Automation Engineering",
      slug: "automation-engineering",
      description: "Workflow automation and technical process improvement.",
      image: "/templates/agency8/imgs/project/features-2.png",
      enabled: true,
    },
  ],
  portfolio: [
    {
      id: "robotics-lab",
      title: "Managed IT Platform",
      slug: "managed-it-platform",
      description: "A scalable digital operations and infrastructure project.",
      image: "/templates/agency8/imgs/project/project-img-1.jpg",
      enabled: true,
    },
    {
      id: "vision-grid",
      title: "Security Operations Grid",
      slug: "security-operations-grid",
      description: "A secure monitoring and automation control experience.",
      image: "/templates/agency8/imgs/project/project-img-2.jpg",
      enabled: true,
    },
  ],
  testimonials: [
    {
      id: "morgan",
      name: "Morgan Ellis",
      role: "Technology Director",
      quote: "The team helped us turn complex IT workflows into a clear, scalable system.",
      image: "/templates/agency8/imgs/testimonial/author-5-01.png",
      enabled: true,
    },
  ],
  team: [
    {
      id: "aiden",
      title: "Aiden Brooks",
      slug: "aiden-brooks",
      description: "Cloud Strategy Lead",
      image: "/templates/agency8/imgs/inner/team/team-thumb1_1.jpg",
      enabled: true,
    },
    {
      id: "maya",
      title: "Maya Chen",
      slug: "maya-chen",
      description: "Security Systems Architect",
      image: "/templates/agency8/imgs/inner/team/team-thumb1_2.jpg",
      enabled: true,
    },
  ],
  blog: [
    {
      id: "automation-future",
      title: "How IT Teams Scale Secure Automation",
      slug: "how-it-teams-scale-secure-automation",
      description: "Practical patterns for deploying secure automation safely.",
      image: "/templates/agency8/imgs/blog/blog-thumb1_1.jpg",
      enabled: true,
    },
  ],
  pages: [
    { id: "faq", title: "FAQ", slug: "faq", content: "Common questions about IT solution projects.", enabled: true },
  ],
  contact: {
    heading: "Start an IT solution project",
    formTitle: "Tell us what you want to improve",
    mapLabel: "Shata SaaS & Startups Studio",
  },
  footer: {
    copyright: "© 2026 Shata SaaS & Startups. All Rights Reserved.",
    description: "SaaS product strategy, startup systems, and launch operations for modern teams.",
  },
};
