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
} from "@/components/templates/agency1/home/Agency1HomeSections";

export default function Agency1HomePage() {
  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Hero />
        <Agency1About />
        <Agency1TextSlider />
        <Agency1Services />
        <Agency1WorkProcess />
        <Agency1Portfolio />
        <Agency1VideoSection />
        <Agency1Testimonials />
        <Agency1CTASection />
        <Agency1Brands />
        <Agency1Blog />
      </main>
      <Agency1Footer />
    </>
  );
}
