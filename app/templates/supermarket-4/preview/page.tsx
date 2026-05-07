"use client";

import HeaderFour from "@/components/templates/supermarket4/header/HeaderFour";
import FooterOne from "@/components/templates/supermarket4/footer/FooterOne";
import {
  BannerFour,
  BestSellingWrap,
  BlogFour,
  FeatureCategory,
  FeatureDiscount,
  LessDiscount,
  LessDiscountTwo,
  RecentlyAdded,
  ShortService,
} from "@/components/templates/supermarket4/home-four/HomeFourSections";

export default function Supermarket4HomePage() {
  return (
    <div className="index-bg-gray">
      <HeaderFour />
      <BannerFour />
      <FeatureCategory />
      <BestSellingWrap />
      <FeatureDiscount />
      <LessDiscount />
      <LessDiscountTwo />
      <RecentlyAdded />
      <BlogFour />
      <ShortService />
      <FooterOne />
    </div>
  );
}
