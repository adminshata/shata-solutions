"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/lib/restaurant1/context";
import { SectionHeading } from "../ui/Atoms";

export function BlogPreview() {
  const site = useSite();
  const { subtitle, heading, description, posts } = site.blog;
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-20" style={{ background: site.theme.lightColor || "#f9f6f2" }}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading subtitle={subtitle} title={heading} desc={description} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <article key={post.id} className="bg-white group">
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/templates/restaurant1/assets/images/banners/1.jpg";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 text-xs tracking-widest uppercase text-white font-semibold"
                    style={{ background: site.theme.primaryColor }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-3 tracking-wide">{post.date}</p>
                <h3 className="text-gray-900 font-medium text-lg mb-3 group-hover:text-opacity-80 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="w-8 h-px mb-3" style={{ background: site.theme.primaryColor }} />
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/templates/restaurant-1/preview/blog/${post.slug}`}
                  className="text-xs tracking-widest uppercase font-semibold transition-colors hover:opacity-70"
                  style={{ color: site.theme.primaryColor }}
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/templates/restaurant-1/preview/blog"
            className="inline-block px-8 py-4 text-sm tracking-widest uppercase font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: site.theme.primaryColor, color: site.theme.primaryColor }}
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
