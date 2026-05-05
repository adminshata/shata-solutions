"use client";

import { makeId, slugify, ensureUniqueHandle } from "@/components/templates/shared/items-manager";
import type { ItemsManagerSchema } from "@/components/templates/shared/items-manager";
import type { Service } from "./types";

const BASE = "/templates/shata-medical";

export function buildServicesSchema(
  services: Service[],
  imagePool: string[]
): ItemsManagerSchema<Service> {
  return {
    labels: {
      entitySingular: "service",
      entityPlural:   "services",
      addLabel:       "+ Add service",
      emptyTitle:     "No services yet",
      emptyCopy:      "Add your first medical service to get started.",
    },

    fields: {
      category:         true,
      shortDescription: true,
      description:      true,
      price:            false,
      priceLabel:       true,
      images:           true,
      badge:            true,
      featured:         true,
      active:           true,
    },

    categories: [
      { handle: "cardiology",    label: "Cardiology" },
      { handle: "neurology",     label: "Neurology" },
      { handle: "orthopedics",   label: "Orthopedics" },
      { handle: "ophthalmology", label: "Ophthalmology" },
      { handle: "dental-care",   label: "Dental Care" },
      { handle: "pediatrics",    label: "Pediatrics" },
      { handle: "radiology",     label: "Radiology" },
      { handle: "surgery",       label: "General Surgery" },
    ],

    badgeOptions: [
      { value: "",         label: "No badge" },
      { value: "popular",  label: "Popular" },
      { value: "featured", label: "Featured" },
      { value: "new",      label: "New" },
    ],

    imagePool,

    createNew: (): Service => ({
      id:               makeId(),
      handle:           ensureUniqueHandle("new-service", services),
      name:             "New Service",
      shortDescription: "",
      description:      "",
      category:         "cardiology",
      department:       "Cardiology",
      duration:         "",
      priceLabel:       "",
      highlights:       [],
      images:           [`${BASE}/services/service_bg.jpg`],
      icon:             `${BASE}/icons/service_icon_1.png`,
      featured:         false,
      active:           true,
    }),

    renderExtras: (item, patch) => (
      <div className="grid grid-cols-2 gap-3 mt-2">
        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
            Duration
          </span>
          <input
            type="text"
            value={item.duration ?? ""}
            onChange={(e) => patch({ duration: e.target.value })}
            placeholder="e.g. 30–60 min"
            className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
            Department label
          </span>
          <input
            type="text"
            value={item.department ?? ""}
            onChange={(e) => patch({ department: e.target.value })}
            placeholder="e.g. Cardiology"
            className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />
        </label>
        <div className="col-span-2">
          <label className="block">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
              Icon path
            </span>
            <input
              type="text"
              value={item.icon ?? ""}
              onChange={(e) => patch({ icon: e.target.value })}
              placeholder="/templates/shata-medical/icons/service_icon_1.png"
              className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <div className="col-span-2">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
            Service highlights (one per line)
          </span>
          <textarea
            rows={4}
            value={(item.highlights ?? []).join("\n")}
            onChange={(e) =>
              patch({
                highlights: e.target.value
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean),
              })
            }
            placeholder="ECG & stress testing&#10;Echocardiography&#10;Cardiac rehabilitation"
            className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>
    ),

    renderPrice: (item, patch) => (
      <label className="block">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">
          Price label
        </span>
        <input
          type="text"
          value={item.priceLabel ?? ""}
          onChange={(e) => patch({ priceLabel: e.target.value })}
          placeholder="From $120"
          className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
        />
      </label>
    ),

    formatPriceForList: (item) => item.priceLabel ?? "—",

    duplicate: (item): Service => ({
      ...item,
      id:     makeId(),
      handle: ensureUniqueHandle(
        slugify(item.name + " copy"),
        services
      ),
      name: item.name + " (copy)",
    }),
  };
}
