"use client";

import { useState } from "react";
import { useSite } from "@/lib/restaurant1/context";
import { PageTitle, SafeImg } from "@/components/templates/restaurant1/ui/Atoms";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function GalleryPage() {
  const site = useSite();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = site.gallery.items;

  return (
    <>
      <PageTitle
        title="Gallery"
        subtitle="Our Gallery"
        bg={R1_DEFAULTS.hero.slides[0].image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative h-52 overflow-hidden group cursor-pointer"
                onClick={() => setLightbox(item.src)}
              >
                <SafeImg
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-4xl w-full max-h-[80vh] aspect-video">
            <SafeImg
              src={lightbox}
              alt="Gallery"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <ReservationBanner />
    </>
  );
}
