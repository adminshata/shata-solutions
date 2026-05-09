"use client";

import { useState } from "react";
import Image from "next/image";
import { useSite } from "@/lib/restaurant1/context";
import { SectionHeading, Stars } from "../ui/Atoms";

export function Testimonials() {
  const site = useSite();
  const { subtitle, heading, bgImage, items } = site.testimonials;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const item = items[current];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <SectionHeading subtitle={subtitle} title={heading} light />

        <div className="relative px-8">
          <Stars count={item.rating} />

          {/* Quote */}
          <svg className="w-8 h-8 mx-auto mb-4 opacity-30" fill="currentColor" style={{ color: site.theme.primaryColor }} viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="text-gray-200 text-lg leading-relaxed italic mb-8">
            &ldquo;{item.text}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: site.theme.primaryColor }}>
              <Image
                src={item.image}
                alt={item.author}
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/templates/restaurant1/assets/images/testimonial/1.png";
                }}
              />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">{item.author}</p>
              <p className="text-gray-400 text-xs tracking-widest uppercase">Happy Customer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:border-white transition-all"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:border-white transition-all"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === current ? site.theme.primaryColor : "rgba(255,255,255,0.4)",
                transform: i === current ? "scale(1.5)" : "scale(1)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
