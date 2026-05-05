"use client";

import { makeId, slugify, ensureUniqueHandle } from "@/components/templates/shared/items-manager";
import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager";
import type { MenuItem } from "./types";

const BASE = "/templates/shata-cafe";

export function buildMenuSchema(
  menuItems: MenuItem[],
  imagePool: string[]
): ItemsManagerSchema<MenuItem> {
  return {
    labels: {
      entitySingular: "menu item",
      entityPlural:   "menu items",
      addLabel:       "+ Add item",
      emptyTitle:     "No menu items yet",
      emptyCopy:      "Add your first menu item to get started.",
    },

    fields: {
      category:         true,
      shortDescription: true,
      description:      true,
      price:            false,
      priceLabel:       false,
      images:           true,
      badge:            true,
      featured:         true,
      active:           true,
    },

    categories: [
      { handle: "breakfasts", label: "Breakfasts" },
      { handle: "starters",   label: "Starters" },
      { handle: "mains",      label: "Mains" },
      { handle: "desserts",   label: "Desserts" },
      { handle: "beverages",  label: "Beverages" },
    ],

    badgeOptions: [
      { value: "",           label: "No badge" },
      { value: "popular",    label: "Popular" },
      { value: "chef's pick", label: "Chef's Pick" },
      { value: "new",        label: "New" },
      { value: "seasonal",   label: "Seasonal" },
    ],

    imagePool,

    createNew: (): MenuItem => ({
      id:               makeId("item"),
      handle:           ensureUniqueHandle("new-item", menuItems),
      name:             "New Item",
      shortDescription: "",
      category:         "mains",
      price:            "$0",
      description:      "",
      images:           [`${BASE}/menu/penne-alfredo.jpg`],
      featured:         false,
      active:           true,
    }),

    renderExtras: (item, patch) => (
      <div className="mt-2">
        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
            Price
          </span>
          <input
            type="text"
            value={item.price ?? ""}
            onChange={(e) => patch({ price: e.target.value })}
            placeholder="e.g. $14"
            className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-amber-500"
          />
        </label>
      </div>
    ),

    formatPriceForList: (item) => item.price ?? "—",

    duplicate: (item): MenuItem => ({
      ...item,
      id:     makeId("item"),
      handle: ensureUniqueHandle(
        slugify(item.name + " copy"),
        menuItems
      ),
      name:     item.name + " (copy)",
      featured: false,
    }),
  };
}
