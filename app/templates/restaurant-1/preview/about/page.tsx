"use client";

import { SafeImg, PageTitle, SectionHeading } from "@/components/templates/restaurant1/ui/Atoms";
import { AboutTabs } from "@/components/templates/restaurant1/sections/AboutTabs";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function AboutPage() {
  return (
    <>
      <PageTitle
        title="About Us"
        subtitle="Our Story"
        bg={R1_DEFAULTS.hero.slides[1].image}
      />

      {/* About Tabs Section */}
      <AboutTabs />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="Why Us"
            title="Why Choose La Belle Table"
            desc="We believe great food begins with the finest ingredients and a passionate culinary team dedicated to your dining experience."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: "Award Winning",
                desc: "Recognized by leading culinary publications and awarded for excellence in dining.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Fresh Ingredients",
                desc: "We source the finest local and seasonal ingredients daily for every dish we prepare.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                  </svg>
                ),
                title: "Expert Chefs",
                desc: "Our team of world-class chefs brings passion and expertise to every plate.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 border border-gray-100">
                <div className="flex justify-center mb-4 text-gray-700">{item.icon}</div>
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Photo Strip */}
      <section className="py-20" style={{ background: "#f9f6f2" }}>
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Our Space" title="The Restaurant" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {R1_DEFAULTS.gallery.items.slice(0, 4).map((item) => (
              <div key={item.id} className="relative h-48 overflow-hidden">
                <SafeImg
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReservationBanner />
    </>
  );
}
