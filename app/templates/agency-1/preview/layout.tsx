import type { Metadata } from "next";
import { Agency1Provider } from "@/lib/agency1/context";
import Agency1DebugImages from "@/components/templates/agency1/Agency1DebugImages";

export const metadata: Metadata = {
  title: "Shata Agency One – AI Agency & Intelligent Solutions",
  description:
    "Shata Agency One is a premium AI agency delivering custom AI solutions, machine learning, NLP, and automation for forward-thinking businesses.",
};

export default function Agency1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/templates/agency1/css/style.css" />
      <style>{`
        /* Ensure Next.js fill images always display */
        .hero-section__area img,
        .about-section-area img,
        .service-section img,
        .work-section img,
        .project-section img,
        .video-section__area img,
        .features-section img,
        .testimonials-section img,
        .blog img,
        .brand__area img,
        .footer__area img,
        .inner-hero-section img,
        [style*="position: relative"] img,
        [style*="position:relative"] img {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
          max-width: none;
        }
        /* Trexa CSS hides some images by default until hover/JS. Force visible for agency-1 preview. */
        main img,
        img[data-nimg] {
          opacity: 1 !important;
          visibility: visible !important;
        }
        .value__title img,
        .value__thumb img {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }
        /* Ensure fill images behave correctly */
        img[style*="position: absolute"],
        img[style*="position:absolute"] {
          object-fit: cover;
        }
      `}</style>
      <Agency1Provider>
        {children}
        <Agency1DebugImages />
      </Agency1Provider>
    </>
  );
}
