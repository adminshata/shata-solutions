"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";
import { SafeImg, PageTitle } from "@/components/templates/restaurant1/ui/Atoms";
import { ReservationBanner } from "@/components/templates/restaurant1/sections/ReservationBanner";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = R1_DEFAULTS.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const primaryColor = R1_DEFAULTS.theme.primaryColor;
  const related = R1_DEFAULTS.blog.posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageTitle
        title={post.title}
        subtitle={post.category}
        bg={post.image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-8 text-sm text-gray-400">
            <span>{post.date}</span>
            <span>·</span>
            <span style={{ color: primaryColor }}>{post.category}</span>
          </div>

          {/* Hero Image */}
          <div className="relative h-80 md:h-96 mb-10 overflow-hidden">
            <SafeImg src={post.image} alt={post.title} fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-lg leading-relaxed mb-6">{post.excerpt}</p>
            <p className="leading-relaxed mb-6">
              At La Belle Table, we are constantly inspired by the seasons, our local farmers, and the vibrant culinary traditions of the world.
              Each dish we create starts with the finest ingredients, hand-selected at peak freshness to ensure an unforgettable experience.
            </p>
            <p className="leading-relaxed mb-6">
              Our kitchen team works tirelessly to refine techniques and explore new flavor combinations, bringing creativity and precision to every plate.
              We believe that great food is not just nourishment — it is an experience that brings people together, sparks conversation, and creates lasting memories.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-2 my-8 text-gray-500 italic text-xl"
              style={{ borderColor: primaryColor }}
            >
              "One cannot think well, love well, sleep well, if one has not dined well."
            </blockquote>
            <p className="leading-relaxed">
              We invite you to join us and discover the passion and craftsmanship that defines every meal at La Belle Table.
              Make a reservation today and let us craft an extraordinary dining experience just for you.
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/templates/restaurant-1/preview/blog"
              className="text-xs tracking-widest uppercase font-semibold transition-colors hover:opacity-70"
              style={{ color: primaryColor }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: "#f9f6f2" }}>
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-sm tracking-[0.2em] uppercase font-semibold text-center mb-10" style={{ color: primaryColor }}>
              Related Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/templates/restaurant-1/preview/blog/${p.slug}`} className="group">
                  <div className="relative h-44 overflow-hidden mb-4">
                    <SafeImg
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{p.date}</p>
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{p.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ReservationBanner />
    </>
  );
}
