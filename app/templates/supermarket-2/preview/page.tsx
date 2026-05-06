"use client";
import HeaderTwo from "@/components/templates/supermarket2/header/HeaderTwo";
import BannerTwo from "@/components/templates/supermarket2/banner/BannerTwo";
import CategoryOne from "@/components/templates/supermarket2/category/CategoryOne";
import FeatureTwo from "@/components/templates/supermarket2/feature/FeatureTwo";
import WeeklyBestSellingTwo from "@/components/templates/supermarket2/product/WeeklyBestSellingTwo";
import MethodOne from "@/components/templates/supermarket2/common/MethodOne";
import OfferAdd from "@/components/templates/supermarket2/common/OfferAdd";
import DealOfDay from "@/components/templates/supermarket2/product/DealOfDay";
import FeaturesGrid from "@/components/templates/supermarket2/product/FeaturesGrid";
import BlogTwo from "@/components/templates/supermarket2/blog/BlogTwo";
import FooterTwo from "@/components/templates/supermarket2/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket2/common/BackToTop";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <BannerTwo />
      <CategoryOne />
      <FeatureTwo />
      <WeeklyBestSellingTwo />
      <MethodOne />
      <DealOfDay />
      <OfferAdd />
      <FeaturesGrid />
      <BlogTwo />
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
