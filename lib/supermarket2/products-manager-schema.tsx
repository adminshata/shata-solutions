import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager/types";

export const supermarket2ProductsSchema: ItemsManagerSchema = {
  singularLabel: "Product",
  pluralLabel: "Products",
  storageKey: "supermarket2_products_draft",
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "price", label: "Price", type: "text", required: true },
    { key: "category", label: "Category", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "image", label: "Image", type: "image" },
    { key: "descripTion", label: "Description", type: "textarea" },
  ],
};
