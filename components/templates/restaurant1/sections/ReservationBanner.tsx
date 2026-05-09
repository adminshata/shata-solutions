"use client";

import { useSite } from "@/lib/restaurant1/context";
import { Btn } from "../ui/Atoms";

export function ReservationBanner() {
  const site = useSite();

  return (
    <section
      className="py-20 text-center"
      style={{ background: site.theme.darkColor || "#1a1a1a" }}
    >
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-sm tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: site.theme.primaryColor }}>
          Reserve a table
        </p>
        <h2
          className="text-4xl md:text-5xl font-light text-white mb-6"
          style={{ fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)" }}
        >
          {site.reservation.heading}
        </h2>
        <div className="flex justify-center mb-6">
          <div className="w-12 h-px bg-white/20" />
          <div className="w-2 h-2 rounded-full mx-2 -mt-0.5" style={{ background: site.theme.primaryColor }} />
          <div className="w-12 h-px bg-white/20" />
        </div>
        <p className="text-gray-400 mb-8 leading-relaxed">
          {site.reservation.description}
        </p>
        <Btn href="/templates/restaurant-1/preview/reservation" variant="primary" size="lg">
          Book A Table
        </Btn>
      </div>
    </section>
  );
}
