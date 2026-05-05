"use client";

import { SiteShell } from "@/components/templates/supermarket1/layout/SiteShell";
import { Header } from "@/components/templates/supermarket1/layout/Header";
import { Footer } from "@/components/templates/supermarket1/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket1/layout/CartDrawer";
import {
  BannerSlider,
  CategoryQuickLinks,
  FeaturesRow,
  FeaturedProducts,
  DiscountProducts,
  WeeklyBestSelling,
  TrendingProducts,
  BlogPosts,
} from "@/components/templates/supermarket1/sections/HomeSections";
import { useSite } from "@/lib/supermarket1/context";

export default function SupermarketHomePage() {
  const config = useSite();
  const sectionMap: Record<string, React.ReactNode> = {
    features: <FeaturesRow />,
    featured: <FeaturedProducts />,
    discount: <DiscountProducts />,
    weekly: <WeeklyBestSelling />,
    trending: <TrendingProducts />,
    blog: <BlogPosts />,
  };

  return (
    <SiteShell>
      <Header />
      <main>
        <BannerSlider />
        <CategoryQuickLinks />
        {config.sections
          .filter((s) => s.active)
          .map((s) => (
            <div key={s.id}>{sectionMap[s.id] ?? null}</div>
          ))}
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}
