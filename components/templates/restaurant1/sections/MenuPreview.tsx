"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/lib/restaurant1/context";
import { SectionHeading } from "../ui/Atoms";

export function MenuPreview() {
  const site = useSite();
  const { subtitle, heading, description, categories } = site.menuSection;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "lunch");

  const items = site.menuItems.filter((m) => m.category === activeCategory).slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading subtitle={subtitle} title={heading} desc={description} />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-6 py-2.5 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
              style={
                activeCategory === cat.id
                  ? {
                      background: site.theme.primaryColor,
                      borderColor: site.theme.primaryColor,
                      color: "#fff",
                    }
                  : {
                      background: "transparent",
                      borderColor: site.theme.primaryColor,
                      color: site.theme.primaryColor,
                    }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item) => (
            <div key={item.id} className="group flex gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-all">
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/templates/restaurant1/assets/images/banners/1.jpg";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                  <span className="text-sm font-semibold flex-shrink-0" style={{ color: site.theme.primaryColor }}>
                    {item.price}
                  </span>
                </div>
                <div className="w-6 h-px mb-2" style={{ background: site.theme.primaryColor }} />
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/templates/restaurant-1/preview/menu"
            className="inline-block px-8 py-4 text-sm tracking-widest uppercase font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: site.theme.primaryColor, color: site.theme.primaryColor }}
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
