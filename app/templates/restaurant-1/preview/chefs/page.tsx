"use client";

import { SafeImg, PageTitle, SectionHeading } from "@/components/templates/restaurant1/ui/Atoms";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function ChefsPage() {
  const { chefs } = R1_DEFAULTS;

  return (
    <>
      <PageTitle
        title="Our Chefs"
        subtitle="Meet The Team"
        bg={R1_DEFAULTS.hero.slides[0].image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle={chefs.subtitle}
            title={chefs.heading}
            desc="Our world-class culinary team brings passion, creativity, and expertise to every dish we serve."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {chefs.items.map((chef) => (
              <div key={chef.id} className="group text-center">
                <div className="relative h-72 overflow-hidden mb-5">
                  <SafeImg
                    src={chef.image}
                    alt={chef.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {["facebook", "twitter", "instagram"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="w-9 h-9 flex items-center justify-center border border-white/40 text-white hover:border-white transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 text-lg mb-1">{chef.name}</h3>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c8a97e" }}>
                  {chef.role}
                </p>
                <div className="w-8 h-px mx-auto mb-3" style={{ background: "#c8a97e" }} />
                <p className="text-gray-500 text-sm leading-relaxed">{chef.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReservationBanner />
    </>
  );
}
