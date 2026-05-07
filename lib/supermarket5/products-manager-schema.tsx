"use client";

import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager";
import { ensureUniqueHandle, makeId, slugify } from "@/components/templates/shared/items-manager";
import type { SiteConfig, StoreProduct } from "./types";
import { formatPrice } from "./utils";

export function buildProductsSchema(args: {
  config: SiteConfig;
  imagePool: string[];
}): ItemsManagerSchema<StoreProduct> {
  const { config, imagePool } = args;

  return {
    labels: {
      entitySingular: "product",
      entityPlural: "products",
      addLabel: "Add product",
      emptyTitle: "No products yet.",
      emptyCopy: "Add your first VividMart product.",
    },
    fields: {
      category: true,
      shortDescription: true,
      description: true,
      price: true,
      images: true,
      badge: true,
      featured: true,
      active: true,
    },
    categories: config.categories.map((category) => ({
      handle: category.handle,
      label: category.name,
    })),
    badgeOptions: [
      { value: "", label: "None" },
      { value: "sale", label: "Sale" },
      { value: "new", label: "New" },
      { value: "hot", label: "Hot" },
      { value: "organic", label: "Organic" },
    ],
    imagePool,
    createNew: () => {
      const name = "New product";
      return {
        id: makeId("prod"),
        handle: ensureUniqueHandle(slugify(name), config.products),
        name,
        shortDescription: "",
        description: "",
        category: config.categories[0]?.handle ?? "",
        images: [],
        badge: null,
        featured: false,
        active: true,
        price: 0,
        unit: "each",
        stock: 0,
        rating: 4.8,
      };
    },
    formatPriceForList: (product) => formatPrice(product.price),
    renderExtras: (product, patch) => (
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Compare price">
          <input
            type="number"
            min={0}
            step="0.01"
            value={product.compareAtPrice ? (product.compareAtPrice / 100).toString() : ""}
            onChange={(event) => {
              const raw = event.target.value;
              patch({ compareAtPrice: raw === "" ? undefined : Math.round(Number(raw) * 100) });
            }}
            className={inputCls}
          />
        </Field>
        <Field label="Unit">
          <input
            value={product.unit ?? ""}
            onChange={(event) => patch({ unit: event.target.value || undefined })}
            className={inputCls}
          />
        </Field>
        <Field label="Stock">
          <input
            type="number"
            min={0}
            value={product.stock ?? ""}
            onChange={(event) => {
              const raw = event.target.value;
              patch({ stock: raw === "" ? undefined : Math.max(0, Number(raw)) });
            }}
            className={inputCls}
          />
        </Field>
        <Field label="Rating">
          <input
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={product.rating ?? ""}
            onChange={(event) => {
              const raw = event.target.value;
              patch({ rating: raw === "" ? undefined : Math.min(5, Math.max(0, Number(raw))) });
            }}
            className={inputCls}
          />
        </Field>
      </div>
    ),
  };
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2 text-base text-white outline-none focus:border-[#7C3AED]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-white/75">{label}</span>
      {children}
    </label>
  );
}
