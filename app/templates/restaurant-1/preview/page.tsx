import { HeroSlider } from "@/components/templates/restaurant1/sections/HeroSlider";
import { AboutTabs } from "@/components/templates/restaurant1/sections/AboutTabs";
import { DailySpecials } from "@/components/templates/restaurant1/sections/DailySpecials";
import { MenuPreview } from "@/components/templates/restaurant1/sections/MenuPreview";
import { Testimonials } from "@/components/templates/restaurant1/sections/Testimonials";
import { BlogPreview } from "@/components/templates/restaurant1/sections/BlogPreview";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";

export default function Restaurant1Home() {
  return (
    <>
      <HeroSlider />
      <AboutTabs />
      <DailySpecials />
      <MenuPreview />
      <Testimonials />
      <BlogPreview />
      <ReservationBanner />
    </>
  );
}
