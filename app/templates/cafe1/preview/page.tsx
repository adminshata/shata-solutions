"use client";

import { useSite } from "@/lib/shata-cafe/context";
import { SECTION_MAP } from "@/components/templates/shata-cafe/sections/HomeSections";

export default function Cafe1HomePage() {
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
