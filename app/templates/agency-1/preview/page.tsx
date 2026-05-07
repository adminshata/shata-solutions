"use client";

import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Hero from "@/components/templates/agency1/home/Agency1Hero";
import {
  Agency1About,
  Agency1TextSlider,
  Agency1Services,
  Agency1WorkProcess,
  Agency1Portfolio,
  Agency1VideoSection,
  Agency1Testimonials,
  Agency1CTASection,
  Agency1Brands,
  Agency1Blog,
  Agency1CustomHomeSection,
} from "@/components/templates/agency1/home/Agency1HomeSections";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1HomePage() {
  const { config } = useAgency1();

  const renderSection = (id: string) => {
    switch (id) {
      case "hero": return <Agency1Hero />;
      case "about": return <Agency1About />;
      case "textSlider": return <Agency1TextSlider />;
      case "services": return <Agency1Services />;
      case "workProcess": return <Agency1WorkProcess />;
      case "portfolio": return <Agency1Portfolio />;
      case "video": return <Agency1VideoSection />;
      case "testimonials": return <Agency1Testimonials />;
      case "cta": return <Agency1CTASection />;
      case "brands": return <Agency1Brands />;
      case "blog": return <Agency1Blog />;
      default: {
        const sec = config.homeSections.find((s) => s.id === id);
        return sec ? <Agency1CustomHomeSection section={sec} /> : null;
      }
    }
  };

  return (
    <>
      <Agency1Header />
      <main>
        {config.homeSections
          .filter((s) => s.enabled)
          .map((s) => (
            <div key={s.id}>{renderSection(s.id)}</div>
          ))}
      </main>
      <Agency1Footer />
    </>
  );
}
