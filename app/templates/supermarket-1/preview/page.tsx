"use client";

import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import BannerOne from "@/components/templates/supermarket1/banner/BannerOne";
import FeatureOne from "@/components/templates/supermarket1/feature/FeatureOne";
import FeatureProduct from "@/components/templates/supermarket1/product/FeatureProduct";
import DiscountProduct from "@/components/templates/supermarket1/product/DiscountProduct";
import WeeklyBestSelling from "@/components/templates/supermarket1/product/WeeklyBestSelling";
import FeatureDiscount from "@/components/templates/supermarket1/product/FeatureDiscount";
import TrandingProduct from "@/components/templates/supermarket1/product/TrandingProduct";
import BlogOne from "@/components/templates/supermarket1/blog/BlogOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderOne />
      <BannerOne />
      <FeatureOne />
      <FeatureProduct />
      <DiscountProduct />
      <WeeklyBestSelling />
      <FeatureDiscount />
      <TrandingProduct />
      <BlogOne />
      <FooterOne />
    </div>
  );
}
