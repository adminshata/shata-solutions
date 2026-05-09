"use client";

import { useState } from "react";
import Image from "next/image";
import { useSite } from "@/lib/restaurant1/context";
import { SectionHeading, Btn } from "../ui/Atoms";

const TAB_CONTENT: Record<string, { text: string; image: string }> = {
  About: {
    text: "Shata Bistro One was the first restaurant to open in our area. The restaurant was designed with history in mind — we created a soft industrial dining room, combined with an open kitchen, coffee take-out bar and on-site coffee roastery. Our menu celebrates seasonal, locally sourced ingredients crafted into extraordinary dishes.",
    image: "/templates/restaurant1/assets/images/tabs/1.jpg",
  },
  History: {
    text: "Founded in 2008, Shata Bistro One began as a small neighborhood cafe and grew into a celebrated fine dining destination. Over the years, our kitchen has earned recognition for its commitment to culinary excellence, earning multiple awards and a loyal community of guests who return time and again.",
    image: "/templates/restaurant1/assets/images/tabs/2.jpg",
  },
  Awards: {
    text: "We are proud to have received numerous accolades including Best Restaurant of the Year, Top Chef Award, and recognition from leading food critics and culinary publications. Our team dedicates itself to innovation and perfection with every dish we create and serve.",
    image: "/templates/restaurant1/assets/images/tabs/3.jpg",
  },
  Chefs: {
    text: "Our team of world-class chefs brings decades of experience from Michelin-starred restaurants around the globe. Led by our Head Chef John Miller, each member of our culinary team is passionate about creating unforgettable dining experiences through bold flavors and creative presentation.",
    image: "/templates/restaurant1/assets/images/tabs/4.jpg",
  },
};

export function AboutTabs() {
  const site = useSite();
  const tabs = site.about.tabs;
  const [active, setActive] = useState(tabs[0]?.id || "About");

  const content = TAB_CONTENT[active] || TAB_CONTENT["About"];

  return (
    <section className="py-20" style={{ background: site.theme.lightColor || "#f9f6f2" }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          subtitle={site.about.subtitle}
          title={site.about.heading}
          desc={site.about.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <Image
              src={content.image}
              alt={active}
              fill
              className="object-cover transition-opacity duration-300"
              unoptimized
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/templates/restaurant1/assets/images/banners/1.jpg";
              }}
            />
          </div>

          {/* Right: Tabs + Content */}
          <div>
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="px-5 py-2 text-xs tracking-widest uppercase font-semibold border transition-all duration-200"
                  style={
                    active === tab.id
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
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              {content.text}
            </p>

            <Btn href="/templates/restaurant-1/preview/about" variant="primary">
              Read More
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
