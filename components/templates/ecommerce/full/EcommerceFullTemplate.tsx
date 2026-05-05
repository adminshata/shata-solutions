import Image from "next/image";
import type { Product } from "./ProductCard";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";

// ─── Static product data ─────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Linen Shirt",
    category: "Men's Wear",
    price: 89,
    rating: 4.8,
    reviews: 124,
    badge: "New",
    image: "/templates/ecommerce/products/p1.jpg",
    colors: ["#2d2d2d", "#c8a96e", "#f0ebe3"],
  },
  {
    id: 2,
    name: "Floral Midi Dress",
    category: "Women's Fashion",
    price: 129,
    originalPrice: 159,
    rating: 4.9,
    reviews: 87,
    badge: "Sale",
    image: "/templates/ecommerce/products/p2.jpg",
    colors: ["#f4c2c2", "#9fc4c7"],
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 199,
    rating: 4.7,
    reviews: 203,
    badge: "Best Seller",
    image: "/templates/ecommerce/products/p3.jpg",
    colors: ["#2d2d2d", "#c8a96e"],
  },
  {
    id: 4,
    name: "Oversized Blazer",
    category: "Women's Fashion",
    price: 245,
    rating: 4.6,
    reviews: 56,
    image: "/templates/ecommerce/products/p4.jpg",
    colors: ["#e8e0d5", "#2d2d2d"],
  },
  {
    id: 5,
    name: "Premium Denim Jacket",
    category: "Men's Wear",
    price: 179,
    originalPrice: 219,
    rating: 4.8,
    reviews: 142,
    badge: "Sale",
    image: "/templates/ecommerce/products/p5.jpg",
    colors: ["#3b5288", "#2d2d2d"],
  },
  {
    id: 6,
    name: "Silk Wrap Blouse",
    category: "Women's Fashion",
    price: 95,
    rating: 4.5,
    reviews: 78,
    badge: "New",
    image: "/templates/ecommerce/products/p6.jpg",
    colors: ["#f4c2c2", "#9fc4c7", "#e8e0d5"],
  },
  {
    id: 7,
    name: "Canvas Tote Bag",
    category: "Accessories",
    price: 69,
    rating: 4.7,
    reviews: 312,
    image: "/templates/ecommerce/products/p7.jpg",
    colors: ["#e8e0d5", "#2d2d2d"],
  },
  {
    id: 8,
    name: "Merino Wool Sweater",
    category: "Men's Wear",
    price: 139,
    originalPrice: 169,
    rating: 4.9,
    reviews: 91,
    badge: "Trending",
    image: "/templates/ecommerce/products/p8.jpg",
    colors: ["#c8a96e", "#2d2d2d", "#f0ebe3"],
  },
];

// ─── Trust features ───────────────────────────────────────────────────────────

const TRUST_FEATURES = [
  {
    title: "Free Delivery",
    desc: "On all orders over $50",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
  },
  {
    title: "Secure Payment",
    desc: "100% secure transactions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "Dedicated customer service",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
  },
];

// ─── Main template ─────────────────────────────────────────────────────────────

export default function EcommerceFullTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
      <Header />
      <Hero />
      <Categories />

      {/* New Arrivals */}
      <div className="bg-neutral-50">
        <ProductGrid
          title="New arrivals"
          subtitle="Just dropped"
          products={PRODUCTS.slice(0, 4)}
        />
      </div>

      {/* Promo banner */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-8 py-14 sm:px-14 lg:flex lg:items-center lg:gap-12 lg:py-20">
            {/* Text content */}
            <div className="relative z-10 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Limited time offer
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl xl:text-5xl">
                Get 20% off <br className="hidden sm:block" />
                your first order
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
                Sign up for our newsletter and receive an exclusive discount
                code on your first purchase.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border-0 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/20 sm:max-w-xs"
                />
                <button className="cursor-pointer rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100">
                  Claim discount
                </button>
              </div>
            </div>

            {/* Promo image */}
            <div className="relative mt-10 hidden lg:mt-0 lg:block lg:w-72 xl:w-80">
              <Image
                src="/templates/ecommerce/promo1.png"
                alt="Promo — Shata Store"
                width={400}
                height={400}
                className="object-contain"
                sizes="(max-width: 1024px) 0px, 320px"
              />
            </div>

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-white/[0.03]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-white/[0.03]" />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <div className="bg-white">
        <ProductGrid
          title="Best sellers"
          subtitle="Most popular this month"
          products={PRODUCTS.slice(4)}
        />
      </div>

      {/* Trust features */}
      <section className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {TRUST_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
