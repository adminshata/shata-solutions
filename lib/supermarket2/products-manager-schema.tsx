"use client";

import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager";
import { ensureUniqueHandle, makeId, slugify } from "@/components/templates/shared/items-manager";
import type { Product, SiteConfig } from "./types";
import { formatPrice } from "./utils";

export function buildProductsSchema(args: {
  config: SiteConfig;
  imagePool: string[];
}): ItemsManagerSchema<Product> {
  const { config, imagePool } = args;
  return {
    labels: {
      entitySingular: "product",
      entityPlural: "products",
      addLabel: "Add product",
      emptyTitle: "No products yet.",
      emptyCopy: "Add your first product. You can change it any time.",
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
    categories: config.categories.map((c) => ({ handle: c.handle, label: c.name })),
    badgeOptions: [
      { value: "", label: "None" },
      { value: "new", label: "New" },
      { value: "sale", label: "Sale" },
      { value: "hot", label: "Hot" },
      { value: "organic", label: "Organic" },
    ],
    imagePool,
    createNew: () => {
      const id = makeId("prod");
      const name = "New product";
      return {
        id,
        handle: ensureUniqueHandle(slugify(name), config.products),
        name,
        shortDescription: "",
        description: "",
        category: config.categories[0]?.handle ?? "",
        price: 0,
        images: [],
        featured: false,
        active: true,
      };
    },
    formatPriceForList: (p) => formatPrice(p.price),
    renderExtras: (p, patch) => <ProductExtras product={p} patch={patch} />,
  };
}

function ProductExtras({
  product,
  patch,
}: {
  product: Product;
  patch: (delta: Partial<Product>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Compare-at price</span>
          <input
            type="number"
            step="0.01"
            value={product.compareAtPrice ? (product.compareAtPrice / 100).toString() : ""}
            onChange={(e) => {
              const raw = e.target.value;
              patch({ compareAtPrice: raw === "" ? undefined : Math.round(Number(raw) * 100) });
            }}
            placeholder="—"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#DC2626]"
          />
        </label>
        <label className="block">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Unit (e.g. 500g)</span>
          <input
            type="text"
            value={product.unit ?? ""}
            onChange={(e) => patch({ unit: e.target.value || undefined })}
            placeholder="—"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#DC2626]"
          />
        </label>
      </div>
    </div>
  );
}
