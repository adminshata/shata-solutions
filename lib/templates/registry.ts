import { ecommerceTemplateData } from "./ecommerce";

export const templateRegistry = {
  ecommerce: {
    label: "Ecommerce",
    previewHref: "/templates/ecommerce",
    editorHref: "/template-editor/ecommerce",
    data: ecommerceTemplateData,
  },
} as const;

export type TemplateSlug = keyof typeof templateRegistry;
