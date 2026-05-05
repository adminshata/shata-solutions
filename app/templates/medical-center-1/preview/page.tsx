"use client";

import { useSite } from "@/lib/shata-medical/context";
import { SECTION_MAP } from "@/components/templates/shata-medical/sections/HomeSections";

export default function HomePage() {
  const config = useSite();
  return (
    <>
      {config.homeSectionOrder
        .filter((s) => s.enabled)
        .map((s) => {
          const Section = SECTION_MAP[s.id];
          return Section ? <Section key={s.id} /> : null;
        })}
    </>
  );
}
