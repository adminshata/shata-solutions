export type TemplateSectionType =
  | "hero"
  | "categories"
  | "featuredProducts"
  | "promoBanner"
  | "trust"
  | "contact";

export type TemplateBrand = {
  name: string;
  logoText: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
};

export type TemplateHero = {
  headline: string;
  subcopy: string;
  ctaLabel: string;
  badge: string;
};

export type TemplateCategory = {
  id: string;
  name: string;
  description: string;
};

export type TemplateProduct = {
  id: string;
  name: string;
  category: string;
  price: string;
  badge: string;
  description: string;
};

export type TemplateSection = {
  id: TemplateSectionType;
  label: string;
  enabled: boolean;
  order: number;
};

export type TemplateContact = {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
};

export type EcommerceTemplateData = {
  industry: "ecommerce";
  slug: string;
  brand: TemplateBrand;
  hero: TemplateHero;
  categories: TemplateCategory[];
  products: TemplateProduct[];
  sections: TemplateSection[];
  contact: TemplateContact;
};
