"use client";

import Link from "next/link";
import { SafeImg, PageTitle, SectionHeading } from "@/components/templates/restaurant1/ui/Atoms";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function BlogPage() {
  const { posts } = R1_DEFAULTS.blog;
  const primaryColor = R1_DEFAULTS.theme.primaryColor;

  return (
    <>
      <PageTitle
        title="News & Events"
        subtitle="Our Blog"
        bg={R1_DEFAULTS.hero.slides[2].image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Don't miss" title="Latest From Our Blog" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <div className="relative h-56 overflow-hidden mb-5">
                  <SafeImg
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 text-xs tracking-widest uppercase text-white font-semibold"
                      style={{ background: primaryColor }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2 tracking-wide">{post.date}</p>
                <h2 className="text-lg font-medium text-gray-900 mb-3 leading-snug line-clamp-2">
                  {post.title}
                </h2>
                <div className="w-8 h-px mb-3" style={{ background: primaryColor }} />
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/templates/restaurant-1/preview/blog/${post.slug}`}
                  className="text-xs tracking-widest uppercase font-semibold transition-colors hover:opacity-70"
                  style={{ color: primaryColor }}
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ReservationBanner />
    </>
  );
}
