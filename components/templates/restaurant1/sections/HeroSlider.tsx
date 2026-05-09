"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSite } from "@/lib/restaurant1/context";
import { Btn } from "../ui/Atoms";

export function HeroSlider() {
  const site = useSite();
  const slides = site.hero.slides;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setCurrent((c) => (c + 1) % slides.length);
    setTimeout(() => setAnimating(false), 600);
  }, [animating, slides.length]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const goTo = (i: number) => {
    if (animating || i === current) return;
    setAnimating(true);
    setCurrent(i);
    setTimeout(() => setAnimating(false), 600);
  };

  const slide = slides[current];

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            className="object-cover"
            unoptimized
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center justify-center text-center px-4"
        style={{ transition: "opacity 0.6s" }}
      >
        <div className={`transition-all duration-500 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <p
            className="text-sm tracking-[0.3em] uppercase mb-4 font-medium"
            style={{ color: site.theme.primaryColor }}
          >
            {slide.subheadline}
          </p>
          <h1
            className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)" }}
          >
            {slide.headline}
          </h1>
          {/* decorative line */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-px bg-white/40" />
            <div className="w-2 h-2 rounded-full mx-2 -mt-0.5" style={{ background: site.theme.primaryColor }} />
            <div className="w-16 h-px bg-white/40" />
          </div>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed text-base">
            {slide.bio}
          </p>
          <Btn href={slide.ctaHref} variant="primary" size="lg">
            {slide.ctaLabel}
          </Btn>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === current ? site.theme.primaryColor : "rgba(255,255,255,0.4)",
              transform: i === current ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:border-white transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:border-white transition-all"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
