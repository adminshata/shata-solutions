"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSite } from "@/lib/restaurant1/context";
import { PageTitle } from "@/components/templates/restaurant1/ui/Atoms";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function CustomPage() {
  const { slug } = useParams<{ slug: string }>();
  const site = useSite();

  const page = site.customPages?.find((p) => p.slug === slug && p.enabled);

  if (!page) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#f9f6f2" }}
      >
        <div className="text-center max-w-md">
          <p className="text-8xl font-light text-gray-200 mb-4">404</p>
          <h1
            className="text-4xl font-light mb-4"
            style={{
              fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)",
              color: "#1a1a1a",
            }}
          >
            Page Not Found
          </h1>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-px self-center" style={{ background: site.theme.primaryColor }} />
            <div className="w-2 h-2 rounded-full mx-2" style={{ background: site.theme.primaryColor }} />
            <div className="w-12 h-px self-center" style={{ background: site.theme.primaryColor }} />
          </div>
          <p className="text-gray-500 mb-8">
            The page you are looking for does not exist. Please return to the homepage.
          </p>
          <Link
            href="/templates/restaurant-1/preview"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase font-semibold text-white transition-all hover:opacity-80"
            style={{ background: site.theme.primaryColor }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        title={page.title}
        subtitle="Custom Page"
        bg={R1_DEFAULTS.hero.slides[0].image}
      />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="prose prose-lg max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </>
  );
}
