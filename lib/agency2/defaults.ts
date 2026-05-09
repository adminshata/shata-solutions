import type { Agency2Config } from "./types";

export const AGENCY2_STORAGE_KEY = "shata-ai-robotics-draft";

export const AGENCY2_DEFAULTS: Agency2Config = {
  brand: {
    name: "Shata AI Robotics",
    tagline: "AI robotics, automation, and intelligent digital systems",
    email: "hello@shataairobotics.com",
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
    ctaHref: "/templates/agency-2/preview/contact",
    nav: [
      { id: "home", label: "Home", href: "/templates/agency-2/preview", enabled: true },
      { id: "about", label: "About Us", href: "/templates/agency-2/preview/about", enabled: true },
      { id: "services", label: "Service", href: "/templates/agency-2/preview/services", enabled: true },
      { id: "portfolio", label: "Portfolio", href: "/templates/agency-2/preview/portfolio", enabled: true },
      { id: "blog", label: "Blog", href: "/templates/agency-2/preview/blog", enabled: true },
      { id: "pages", label: "Pages", href: "/templates/agency-2/preview/faq", enabled: true },
      { id: "contact", label: "Contact", href: "/templates/agency-2/preview/contact", enabled: true },
    ],
  },
  homeSections: [
    { id: "hero", title: "Hero", type: "hero", enabled: true, content: "Next-Gen Automation with AI-Powered Robots" },
    { id: "expertise", title: "Expertise", type: "slider", enabled: true, content: "Smart automation and robotics services" },
    { id: "future", title: "Future Robotics", type: "gallery", enabled: true, content: "Visual robotics showcase from the reference template" },
    { id: "portfolio", title: "Portfolio", type: "projects", enabled: true, content: "Featured automation projects" },
    { id: "blog", title: "Blog", type: "posts", enabled: true, content: "Latest intelligence and automation articles" },
  ],
  heroBanners: [
    {
      id: "robotic-hero",
      eyebrow: "AI robotics for modern operations",
      title: "Next-Gen Automation with AI-Powered Robots",
      subtitle: "Boosting productivity, streamlining operations, and enhancing accuracy.",
      image: "/templates/agency2/imgs/home-2/robot.png",
      enabled: true,
    },
  ],
  services: [
    {
      id: "automation",
      title: "Smart Automation Solutions",
      slug: "smart-automation-solutions",
      description: "AI-enabled workflows, robotics planning, and operational automation.",
      image: "/templates/agency2/imgs/service/service-3_01.jpg",
      enabled: true,
    },
    {
      id: "vision",
      title: "Computer Vision Systems",
      slug: "computer-vision-systems",
      description: "Visual intelligence pipelines for robotics, inspection, and quality control.",
      image: "/templates/agency2/imgs/project/features-1.png",
      enabled: true,
    },
    {
      id: "analytics",
      title: "Predictive AI Analytics",
      slug: "predictive-ai-analytics",
      description: "Forecasting and decision models for high-velocity teams.",
      image: "/templates/agency2/imgs/project/features-2.png",
      enabled: true,
    },
  ],
  portfolio: [
    {
      id: "robotics-lab",
      title: "Robotics Operations Lab",
      slug: "robotics-operations-lab",
      description: "An AI-powered robotic operations experience.",
      image: "/templates/agency2/imgs/project/project-img-1.jpg",
      enabled: true,
    },
    {
      id: "vision-grid",
      title: "Vision Intelligence Grid",
      slug: "vision-intelligence-grid",
      description: "Computer vision dashboards and automation control.",
      image: "/templates/agency2/imgs/project/project-img-2.jpg",
      enabled: true,
    },
  ],
  testimonials: [
    {
      id: "morgan",
      name: "Morgan Ellis",
      role: "Automation Director",
      quote: "The team helped us turn complex robotic workflows into a clear, scalable system.",
      image: "/templates/agency2/imgs/testimonial/author-5-01.png",
      enabled: true,
    },
  ],
  team: [
    {
      id: "aiden",
      title: "Aiden Brooks",
      slug: "aiden-brooks",
      description: "Robotics Strategy Lead",
      image: "/templates/agency2/imgs/inner/team/team-thumb1_1.jpg",
      enabled: true,
    },
    {
      id: "maya",
      title: "Maya Chen",
      slug: "maya-chen",
      description: "AI Systems Architect",
      image: "/templates/agency2/imgs/inner/team/team-thumb1_2.jpg",
      enabled: true,
    },
  ],
  blog: [
    {
      id: "automation-future",
      title: "How Robotics Teams Scale AI Automation",
      slug: "how-robotics-teams-scale-ai-automation",
      description: "Practical patterns for deploying intelligent automation safely.",
      image: "/templates/agency2/imgs/blog/blog-thumb1_1.jpg",
      enabled: true,
    },
  ],
  pages: [
    { id: "faq", title: "FAQ", slug: "faq", content: "Common questions about robotic automation projects.", enabled: true },
  ],
  contact: {
    heading: "Start an AI robotics project",
    formTitle: "Tell us what you want to automate",
    mapLabel: "Shata AI Robotics Studio",
  },
  footer: {
    copyright: "© 2026 Shata AI Robotics. All Rights Reserved.",
    description: "AI robotics, automation, and intelligent digital systems for modern teams.",
  },
};
