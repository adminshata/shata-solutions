"use client";

import HeaderFive from "@/components/templates/supermarket5/header/HeaderFive";
import FooterThree from "@/components/templates/supermarket5/footer/FooterThree";
import {
  BannerFive,
  BestSellingWrap,
  BlogFive,
  BestDiscount,
  FeatureCategory,
  RecentlyAddedTwo,
  ShortService,
} from "@/components/templates/supermarket5/home-five/HomeFiveSections";

export default function Supermarket5HomePage() {
  return (
    <div className="index-five">
      <HeaderFive />
      <BannerFive />
      <FeatureCategory />
      <BestDiscount />
      <BestSellingWrap />
      <RecentlyAddedTwo />
      <BlogFive />
      <ShortService />
      <FooterThree />
    </div>
  );
}
