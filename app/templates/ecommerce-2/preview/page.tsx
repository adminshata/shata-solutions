"use client";

import { useStore } from "@/lib/shata-home/context";
import {
  BannerOffer,
  Categories,
  FeaturedProducts,
  Hero,
  Newsletter,
  Testimonials,
  ValueProps,
} from "@/components/templates/shata-home/sections/HomeSections";

export default function ShataHomePreviewPage() {
  const config = useStore();

  return (
    <>
      {config.homeSectionOrder.map((s) => {
        if (!s.enabled) return null;
        switch (s.id) {
          case "hero":              return <Hero key={s.id} />;
          case "value-props":       return <ValueProps key={s.id} />;
          case "categories":        return <Categories key={s.id} />;
          case "featured-products": return <FeaturedProducts key={s.id} />;
          case "banner-offer":      return <BannerOffer key={s.id} />;
          case "testimonials":      return <Testimonials key={s.id} />;
          case "newsletter":        return <Newsletter key={s.id} />;
          case "announcement":      return null; // rendered in StoreShell
          default:                  return null;
        }
      })}
    </>
  );
}
