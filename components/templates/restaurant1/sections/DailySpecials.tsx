"use client";

import { useSite } from "@/lib/restaurant1/context";
import { SectionHeading, Btn } from "../ui/Atoms";

export function DailySpecials() {
  const site = useSite();
  const { subtitle, heading, bgImage, dishes } = site.specials;

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.92)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionHeading subtitle={subtitle} title={heading} light />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="border border-white/10 p-8 relative group hover:border-opacity-40 transition-all duration-300"
              style={{ borderColor: `${site.theme.primaryColor}30` }}
            >
              <div
                className="absolute top-4 right-4 text-2xl font-light"
                style={{ color: site.theme.primaryColor, fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)" }}
              >
                {dish.price}
              </div>
              <h3 className="text-white text-lg font-light mb-3 pr-16">{dish.title}</h3>
              <div className="w-8 h-px mb-4" style={{ background: site.theme.primaryColor }} />
              <p className="text-gray-400 text-sm leading-relaxed">{dish.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Btn href="/templates/restaurant-1/preview/menu?tab=specials" variant="white">
            View Full Menu
          </Btn>
        </div>
      </div>
    </section>
  );
}
