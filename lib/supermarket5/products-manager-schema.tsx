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
      { value: "", label: "— None —" },
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
        badge: null,
        unit: "each",
      };
    },
    formatPriceForList: (p) => formatPrice(p.price),
    renderExtras: (p, patch) => <ProductExtrasFields product={p} patch={patch} />,
  };
}

function ProductExtrasFields({
  product,
  patch,
}: {
  product: Product;
  patch: (delta: Partial<Product>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Compare-at price (USD)" hint="Original price; renders as crossed-out.">
          <input
            type="number"
            step="0.01"
            value={product.compareAtPrice ? (product.compareAtPrice / 100).toString() : ""}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") patch({ compareAtPrice: undefined });
              else patch({ compareAtPrice: Math.round(Number(raw) * 100) });
            }}
            placeholder="—"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]"
          />
        </Field>

        <Field label="Unit" hint='e.g. "kg", "500g", "each"'>
          <input
            type="text"
            value={product.unit ?? ""}
            onChange={(e) => patch({ unit: e.target.value || undefined })}
            placeholder="each"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]"
          />
        </Field>

        <Field label="Stock" hint="Optional inventory count.">
          <input
            type="number"
            min={0}
            value={product.stock ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              patch({ stock: raw === "" ? undefined : Math.max(0, Number(raw)) });
            }}
            placeholder="—"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <span className="mt-1 block">{children}</span>
      {hint && <span className="mt-1 block text-[10px] text-white/40">{hint}</span>}
    </label>
  );
}
