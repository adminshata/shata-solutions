"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSite } from "@/lib/restaurant1/context";
import { PageTitle, SectionHeading, SafeImg } from "@/components/templates/restaurant1/ui/Atoms";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";
import { DailySpecials } from "@/components/templates/restaurant1/sections/DailySpecials";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

function MenuContent() {
  const site = useSite();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const tabs = [
    ...site.menuSection.categories.map((c) => ({ id: c.id, label: c.label })),
    { id: "specials", label: "Daily Specials" },
  ];

  const [activeTab, setActiveTab] = useState(tabParam === "specials" ? "specials" : tabs[0].id);

  if (activeTab === "specials") {
    return (
      <>
        {/* Tab bar */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-2.5 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
                style={
                  activeTab === tab.id
                    ? { background: site.theme.primaryColor, borderColor: site.theme.primaryColor, color: "#fff" }
                    : { background: "transparent", borderColor: site.theme.primaryColor, color: site.theme.primaryColor }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <DailySpecials />
      </>
    );
  }

  const items = site.menuItems.filter((m) => m.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Tab bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-6 py-2.5 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
            style={
              activeTab === tab.id
                ? { background: site.theme.primaryColor, borderColor: site.theme.primaryColor, color: "#fff" }
                : { background: "transparent", borderColor: site.theme.primaryColor, color: site.theme.primaryColor }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white group border border-gray-100 hover:shadow-md transition-shadow">
            <div className="relative h-52 overflow-hidden">
              <SafeImg
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.badge && (
                <span
                  className="absolute top-3 left-3 px-2 py-1 text-xs text-white tracking-widest uppercase"
                  style={{ background: site.theme.primaryColor }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <span className="font-semibold text-sm ml-4 flex-shrink-0" style={{ color: site.theme.primaryColor }}>
                  {item.price}
                </span>
              </div>
              <div className="w-8 h-px mb-3" style={{ background: site.theme.primaryColor }} />
              <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <PageTitle
        title="Our Menu"
        subtitle="Food Menu"
        bg={R1_DEFAULTS.hero.slides[2].image}
      />
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading menu...</div>}>
        <MenuContent />
      </Suspense>
      <ReservationBanner />
    </>
  );
}
