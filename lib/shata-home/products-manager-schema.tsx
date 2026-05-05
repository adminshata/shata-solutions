"use client";

import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager";
import { ensureUniqueHandle, makeId, slugify } from "@/components/templates/shared/items-manager";
import type { Product, StoreConfig } from "./types";
import { formatPrice } from "./utils";

/**
 * Builds an ItemsManagerSchema for Shata Home Products (furniture / decor).
 * Same pattern as lib/shata-store/products-manager-schema.tsx — only domain
 * labels and accent colour differ.
 */
export function buildProductsSchema(args: {
  config: StoreConfig;
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
      { value: "bestseller", label: "Best seller" },
      { value: "limited", label: "Limited" },
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
        currency: "USD",
        images: [],
        featured: false,
        active: true,
      };
    },
    formatPriceForList: (p) => formatPrice(p.price),
    renderExtras: (p, patch) => <ProductExtrasFields product={p} patch={patch} />,
  };
}

/* ------------------------------------------------------------------ */
/* Extras — ecommerce-specific fields                                  */
/* ------------------------------------------------------------------ */

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
              patch({ compareAtPrice: raw === "" ? undefined : Math.round(Number(raw) * 100) });
            }}
            placeholder="—"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-red-500"
          />
        </Field>

        <Field label="Inventory" hint="Optional stock count.">
          <input
            type="number"
            min={0}
            value={product.inventory ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              patch({ inventory: raw === "" ? undefined : Math.max(0, Number(raw)) });
            }}
            placeholder="—"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-red-500"
          />
        </Field>

        <Field label="Rating" hint="0–5">
          <input
            type="number"
            step="0.1"
            min={0}
            max={5}
            value={product.rating ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              patch({ rating: raw === "" ? undefined : Math.min(5, Math.max(0, Number(raw))) });
            }}
            placeholder="—"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-red-500"
          />
        </Field>

        <Field label="Review count">
          <input
            type="number"
            min={0}
            value={product.reviewCount ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              patch({ reviewCount: raw === "" ? undefined : Math.max(0, Number(raw)) });
            }}
            placeholder="—"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-red-500"
          />
        </Field>
      </div>

      <Field label="Tags" hint="Comma-separated.">
        <input
          value={(product.tags ?? []).join(", ")}
          onChange={(e) =>
            patch({
              tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
            })
          }
          placeholder="sofa, oak, living-room"
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-red-500"
        />
      </Field>

      <OptionsEditor
        options={product.options ?? []}
        onChange={(next) => patch({ options: next.length === 0 ? undefined : next })}
      />
    </div>
  );
}

function OptionsEditor({
  options,
  onChange,
}: {
  options: NonNullable<Product["options"]>;
  onChange: (next: NonNullable<Product["options"]>) => void;
}) {
  function patchOption(idx: number, delta: Partial<{ name: string; values: string[] }>) {
    onChange(options.map((o, i) => (i === idx ? { ...o, ...delta } : o)));
  }
  function add() {
    onChange([...options, { name: "Option", values: [] }]);
  }
  function remove(idx: number) {
    onChange(options.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Options (Size, Colour, Fabric, …)
        </span>
        <button
          type="button"
          onClick={add}
          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:bg-white/[0.08]"
        >
          + Option
        </button>
      </div>
      {options.length === 0 ? (
        <div className="mt-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-3 text-center text-[11px] text-white/45">
          No options. Variants are optional.
        </div>
      ) : (
        <ul className="mt-2 space-y-2">
          {options.map((o, idx) => (
            <li key={idx} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2">
                <input
                  value={o.name}
                  onChange={(e) => patchOption(idx, { name: e.target.value })}
                  placeholder="Option name (e.g. Colour)"
                  className="flex-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="rounded-md bg-rose-500/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                >
                  Remove
                </button>
              </div>
              <div className="mt-2">
                <input
                  value={o.values.join(", ")}
                  onChange={(e) =>
                    patchOption(idx, {
                      values: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Values, comma-separated (e.g. Oak, Walnut, White)"
                  className="w-full rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white outline-none focus:border-red-500"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
      <span className="mt-1 block">{children}</span>
      {hint && <span className="mt-1 block text-[10px] text-white/40">{hint}</span>}
    </label>
  );
}
