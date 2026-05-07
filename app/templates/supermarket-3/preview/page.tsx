"use client";

import HeaderThree from "@/components/templates/supermarket3/header/HeaderThree";
import FooterTwo from "@/components/templates/supermarket3/footer/FooterTwo";
import {
  BannerThree,
  BlogThree,
  BuyingProcess,
  CategoryTop,
  FeatureCategory,
  PopularProduct,
  WeeklySellFour,
  WeeklySellThree,
} from "@/components/templates/supermarket3/home-three/HomeThreeSections";

export default function Supermarket3HomePage() {
  return (
    <div className="demo-one">
      <HeaderThree />
      <BuyingProcess />
      <BannerThree />
      <FeatureCategory />
      <CategoryTop />
      <PopularProduct />
      <WeeklySellThree />
      <WeeklySellFour />
      <BlogThree />
      <FooterTwo />
    </div>
  );
}
