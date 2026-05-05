"use client";

import { useStore } from "@/lib/shata-store/context";
import {
  BannerOffer,
  Categories,
  FeaturedProducts,
  Hero,
  Newsletter,
  Testimonials,
  ValueProps,
} from "@/components/templates/shata-store/sections/HomeSections";

export default function ShataStoreHome() {
  const config = useStore();

  // Render in the order from config — toggling sections on/off and reordering
  // is the foundation of the Tier 1 customization system.
  return (
    <>
      {config.homeSectionOrder.map((s) => {
        if (!s.enabled) return null;
        switch (s.id) {
          case "hero":              return <Hero key={s.id} />;
          case "categories":        return <Categories key={s.id} />;
          case "featured-products": return <FeaturedProducts key={s.id} />;
          case "banner-offer":      return <BannerOffer key={s.id} />;
          case "value-props":       return <ValueProps key={s.id} />;
          case "testimonials":      return <Testimonials key={s.id} />;
          case "newsletter":        return <Newsletter key={s.id} />;
          case "announcement":      return null; // rendered in StoreShell
          default:                  return null;
        }
      })}
    </>
  );
}
