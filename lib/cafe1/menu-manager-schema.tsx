import { makeId, slugify, ensureUniqueHandle } from "@/components/templates/shared/items-manager";
import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager/types";
import type { MenuItem } from "./types";

export function buildMenuSchema(
  imagePool: string[],
  existingItems: MenuItem[]
): ItemsManagerSchema<MenuItem> {
  return {
    labels: {
      entitySingular: "item",
      entityPlural:   "items",
      addLabel:       "+ Add Menu Item",
      emptyTitle:     "No menu items yet",
      emptyCopy:      "Add your first menu item to get started.",
    },
    fields: {
      category:         true,
      shortDescription: true,
      description:      true,
      images:           true,
      badge:            true,
      featured:         true,
      active:           true,
      price:            false,
    },
    categories: [
      { handle: "starters",   label: "Starters" },
      { handle: "breakfasts", label: "Breakfasts" },
      { handle: "desserts",   label: "Desserts" },
      { handle: "beverages",  label: "Beverages" },
    ],
    badgeOptions: [
      { value: "",         label: "None" },
      { value: "new",      label: "New" },
      { value: "popular",  label: "Popular" },
      { value: "spicy",    label: "Spicy" },
      { value: "vegan",    label: "Vegan" },
      { value: "seasonal", label: "Seasonal" },
    ],
    imagePool,
    createNew: () => ({
      id:          makeId(),
      handle:      ensureUniqueHandle(slugify("New Item"), existingItems),
      name:        "New Item",
      category:    "breakfasts",
      price:       "$0",
      description: "",
      images:      [],
      active:      true,
    }),
    renderExtras: (item, patch) => (
      <label className="block">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
          Price
        </span>
        <input
          value={item.price}
          onChange={(e) => patch({ price: e.target.value })}
          placeholder="$0"
          className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-[#B38E6A] transition"
        />
      </label>
    ),
    formatPriceForList: (item) => item.price || "—",
  };
}
