import type { EcommerceTemplateData } from "./types";

export const ecommerceTemplateData: EcommerceTemplateData = {
  industry: "ecommerce",
  slug: "ecommerce",
  brand: {
    name: "Shata Store",
    logoText: "SS",
    primaryColor: "#635bff",
    accentColor: "#06b6d4",
    backgroundColor: "#f8fafc",
  },
  hero: {
    badge: "Premium ecommerce template",
    headline: "Launch a polished online store without the technical headache.",
    subcopy:
      "A conversion-ready storefront with product grids, category sections, trust blocks, checkout-ready CTAs, and mobile-first commerce layouts.",
    ctaLabel: "Shop collection",
  },
  categories: [
    { id: "fashion", name: "Fashion", description: "Modern products, variants, and campaign-ready collections." },
    { id: "beauty", name: "Beauty", description: "Bundles, offers, skincare, cosmetics, and subscription-friendly flows." },
    { id: "electronics", name: "Electronics", description: "Specs, comparisons, accessories, warranties, and high-ticket layouts." },
  ],
  products: [
    {
      id: "p1",
      name: "Signature Sneakers",
      category: "Fashion",
      price: "$89",
      badge: "Best seller",
      description: "Lightweight daily sneakers with a premium product card layout.",
    },
    {
      id: "p2",
      name: "Glow Serum Kit",
      category: "Beauty",
      price: "$49",
      badge: "Bundle",
      description: "A clean beauty bundle card with conversion-focused details.",
    },
    {
      id: "p3",
      name: "Wireless Pro Headset",
      category: "Electronics",
      price: "$129",
      badge: "New",
      description: "High-ticket product layout with trust and warranty-ready copy.",
    },
  ],
  sections: [
    { id: "hero", label: "Hero", enabled: true, order: 1 },
    { id: "categories", label: "Categories", enabled: true, order: 2 },
    { id: "featuredProducts", label: "Featured products", enabled: true, order: 3 },
    { id: "promoBanner", label: "Promo banner", enabled: true, order: 4 },
    { id: "trust", label: "Trust section", enabled: true, order: 5 },
    { id: "contact", label: "Contact", enabled: true, order: 6 },
  ],
  contact: {
    phone: "+1 (555) 120-8890",
    email: "hello@shatastore.com",
    address: "California, United States",
    whatsapp: "+15551208890",
  },
};
