"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/lib/supermarket5/context";
import { activeProducts, activeCategories } from "@/lib/supermarket5/utils";
import { ProductCard } from "../product/ProductCard";
import { SectionTitle } from "../ui/Atoms";

const BASE_PATH = "/templates/supermarket-5/preview";
const BASE_IMG = "/templates/supermarket5";

/* ------------------------------------------------------------------ */
/* Features Row                                                        */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
    title: "Wide Assortment",
    copy: "Thousands of products across all categories",
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free Delivery",
    copy: "On all orders over $50",
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: "Daily Offers",
    copy: "Fresh deals and discounts every day",
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Best Price",
    copy: "Guaranteed lowest prices on all products",
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.21" />
      </svg>
    ),
    title: "Easy Returns",
    copy: "30-day hassle-free return policy",
  },
];

export function FeaturesRow() {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-2 p-4">
              <div className="text-[#7C3AED]">{f.icon}</div>
              <h3 className="text-sm font-bold text-gray-800">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Banner Slider                                                        */
/* ------------------------------------------------------------------ */

const SLIDES = [
  {
    bg: `${BASE_IMG}/banner/01.webp`,
    eyebrow: "Fresh Arrivals",
    title: "Fresh Organic\nProduce Daily",
    copy: "Farm to table — the freshest seasonal vegetables and fruits.",
    cta: "Shop Now",
    href: `${BASE_PATH}/shop`,
  },
  {
    bg: `${BASE_IMG}/banner/02.jpg`,
    eyebrow: "Weekly Deals",
    title: "Save Big on\nGrocery Essentials",
    copy: "Up to 30% off on top grocery staples this week only.",
    cta: "View Deals",
    href: `${BASE_PATH}/shop`,
  },
];

export function BannerSlider() {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];

  return (
    <section className="relative h-[360px] md:h-[420px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.bg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-lg text-white">
          <div className="text-xs font-bold uppercase tracking-widest text-[#f59e0b] mb-2">{slide.eyebrow}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3 whitespace-pre-line">{slide.title}</h2>
          <p className="text-sm text-white/80 mb-6 max-w-xs">{slide.copy}</p>
          <Link
            href={slide.href}
            className="inline-block rounded px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
            style={{ background: "#7C3AED" }}
          >
            {slide.cta} →
          </Link>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Category Quick Links                                                */
/* ------------------------------------------------------------------ */

export function CategoryQuickLinks() {
  const config = useSite();
  const cats = activeCategories(config).slice(0, 5);
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-5 divide-x divide-gray-100">
          {cats.map((cat) => (
            <Link
              key={cat.id}
              href={`${BASE_PATH}/categories/${cat.handle}`}
              className="flex flex-col items-center gap-2 py-4 px-2 hover:bg-[#7C3AED]/5 transition-colors"
            >
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="40px" unoptimized />
                ) : (
                  <div className="h-full w-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] text-xs font-bold">
                    {cat.name[0]}
                  </div>
                )}
              </div>
              <span className="text-[11px] font-medium text-gray-700 text-center line-clamp-1">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured Products                                                   */
/* ------------------------------------------------------------------ */

export function FeaturedProducts() {
  const config = useSite();
  const featured = activeProducts(config).filter(p => p.featured).slice(0, 8);
  if (featured.length === 0) return null;
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <SectionTitle title="Featured Products" subtitle="Hand-picked for you" />
          <Link href={`${BASE_PATH}/shop`} className="text-sm font-semibold hover:underline" style={{ color: "#7C3AED" }}>
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Discount Products                                                   */
/* ------------------------------------------------------------------ */

export function DiscountProducts() {
  const config = useSite();
  const sale = activeProducts(config).filter(p => p.compareAtPrice && p.compareAtPrice > p.price).slice(0, 6);
  if (sale.length === 0) return null;
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <SectionTitle title="Up to 30% Off" subtitle="Limited time discount products" />
          <Link href={`${BASE_PATH}/shop`} className="text-sm font-semibold hover:underline" style={{ color: "#7C3AED" }}>
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {sale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Weekly Best Selling (tabbed)                                        */
/* ------------------------------------------------------------------ */

export function WeeklyBestSelling() {
  const config = useSite();
  const cats = activeCategories(config).slice(0, 4);
  const [activeCat, setActiveCat] = useState(cats[0]?.handle ?? "");
  const products = activeProducts(config).filter(p => p.category === activeCat).slice(0, 8);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
          <SectionTitle title="Weekly Best Selling" />
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            {cats.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCat(cat.handle)}
                className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
                style={
                  activeCat === cat.handle
                    ? { background: "#7C3AED", color: "#fff", borderColor: "#7C3AED" }
                    : { background: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="col-span-full text-sm text-gray-400 text-center py-8">No products in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trending Products                                                   */
/* ------------------------------------------------------------------ */

export function TrendingProducts() {
  const config = useSite();
  const products = activeProducts(config).slice(0, 12);
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <SectionTitle title="Trending Products" subtitle="Most loved by customers" />
          <Link href={`${BASE_PATH}/shop`} className="text-sm font-semibold hover:underline" style={{ color: "#7C3AED" }}>
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Blog Posts                                                          */
/* ------------------------------------------------------------------ */

const BLOG_POSTS = [
  {
    id: "1",
    title: "5 Ways to Keep Your Produce Fresh Longer",
    date: "May 3, 2026",
    category: "Tips & Tricks",
    excerpt: "Learn expert techniques to extend the shelf life of your fresh fruits and vegetables.",
    image: `${BASE_IMG}/products/07.jpg`,
    slug: "keep-produce-fresh",
  },
  {
    id: "2",
    title: "The Benefits of Eating Organic Food Daily",
    date: "April 28, 2026",
    category: "Health",
    excerpt: "Discover why switching to organic produce can transform your health and wellbeing.",
    image: `${BASE_IMG}/products/17.jpg`,
    slug: "benefits-organic-food",
  },
  {
    id: "3",
    title: "Weekly Meal Planning for Busy Families",
    date: "April 20, 2026",
    category: "Lifestyle",
    excerpt: "A practical guide to planning nutritious and budget-friendly weekly family meals.",
    image: `${BASE_IMG}/products/03.jpg`,
    slug: "meal-planning-families",
  },
];

export function BlogPosts() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <SectionTitle title="From Our Blog" subtitle="Tips, recipes, and grocery guides" />
          <Link href="#" className="text-sm font-semibold hover:underline" style={{ color: "#7C3AED" }}>
            All Articles →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-44 bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded px-2 py-1 text-[10px] font-bold text-white" style={{ background: "#7C3AED" }}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[11px] text-gray-400 mb-1">{post.date}</div>
                <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 leading-snug">{post.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                <Link href="#" className="text-xs font-bold hover:underline" style={{ color: "#7C3AED" }}>
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
