import Image from "next/image";
import type { Product2 } from "./ProductCard";
import Categories from "./Categories";
import FeaturesBar from "./FeaturesBar";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import OfferBanners from "./OfferBanners";
import ProductGrid from "./ProductGrid";
import WeeklyDeals from "./WeeklyDeals";

// ─── Product data ──────────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product2[] = [
  { id: 1,  name: "Nordic Accent Chair",        brand: "HOMECRAFT",  price: 649,  oldPrice: 849,  rating: 5, badge: "New",      image: "/templates/ecommerce-2/products/products__thumb__01.jpg" },
  { id: 2,  name: "Walnut Coffee Table",         brand: "WOODHAUS",   price: 429,                  rating: 4,                    image: "/templates/ecommerce-2/products/products__thumb__02.jpg" },
  { id: 3,  name: "Smart Pendant Light",         brand: "LUMINOS",    price: 279,  oldPrice: 379,  rating: 4, badge: "Sale",     image: "/templates/ecommerce-2/products/products__thumb__03.jpg" },
  { id: 4,  name: "Memory Foam Mattress",        brand: "SLEEPWELL",  price: 899,                  rating: 5, badge: "Top Pick", image: "/templates/ecommerce-2/products/products__thumb__04.jpg" },
  { id: 5,  name: "Linen Sectional Sofa",        brand: "HOMECRAFT",  price: 1899, oldPrice: 2299, rating: 4, badge: "Sale",     image: "/templates/ecommerce-2/products/products__thumb__05.jpg" },
  { id: 6,  name: "Rattan Storage Shelf",        brand: "WOODHAUS",   price: 349,                  rating: 4,                    image: "/templates/ecommerce-2/products/products__thumb__06.jpg" },
  { id: 7,  name: "Marble Side Table",           brand: "LUMINOS",    price: 299,  oldPrice: 399,  rating: 5, badge: "New",      image: "/templates/ecommerce-2/products/products__thumb__07.jpg" },
  { id: 8,  name: "Velvet Bed Frame",            brand: "SLEEPWELL",  price: 799,                  rating: 4,                    image: "/templates/ecommerce-2/products/products__thumb__08.jpg" },
];

const DISCOUNTED = ALL_PRODUCTS.filter((p) => p.oldPrice !== undefined);
const POPULAR    = ALL_PRODUCTS.filter((_, i) => i % 2 === 0);

const PRODUCT_TABS = [
  { id: "trending",   label: "Trending Items" },
  { id: "discounted", label: "Discounted Items" },
  { id: "popular",    label: "Popular Products" },
];

const PRODUCTS_BY_TAB: Record<string, Product2[]> = {
  trending:   ALL_PRODUCTS,
  discounted: DISCOUNTED,
  popular:    POPULAR,
};

// ─── Promo banners (bottom) ───────────────────────────────────────────────────

const BOTTOM_BANNERS = [
  { image: "/templates/ecommerce-2/offer/offer__thumb__3.jpg", sub: "Sofa Collection", discount: "55% Flat" },
  { image: "/templates/ecommerce-2/offer/offer__thumb__4.jpg", sub: "Bedroom Sets",    discount: "75% Flat" },
];

function BottomBanners() {
  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {BOTTOM_BANNERS.map((b) => (
            <a key={b.image} href="#" className="group relative overflow-hidden">
              <div className="relative aspect-[16/7]">
                <Image
                  src={b.image}
                  alt={b.sub}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/30 to-transparent" />
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">{b.sub}</p>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">{b.discount}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4 transition-colors group-hover:text-red-400">
                  View Collection
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Offer heading strip ──────────────────────────────────────────────────────

function OfferStrip() {
  return (
    <div className="bg-red-600 px-4 py-3 text-center">
      <p className="text-sm font-semibold text-white">
        Don&apos;t miss our Furniture, Lighting &amp; Decor Discount up to{" "}
        <strong>70% OFF</strong> &mdash; Use code{" "}
        <span className="rounded bg-white/20 px-2 py-0.5 font-black tracking-widest">
          SHATA20
        </span>
      </p>
    </div>
  );
}

// ─── Template assembly ────────────────────────────────────────────────────────

export default function EcommerceFullTemplate2() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <Header />
      <Hero />
      <FeaturesBar />
      <OfferStrip />
      <OfferBanners />
      <ProductGrid
        title="Discover All Products"
        tabs={PRODUCT_TABS}
        productsByTab={PRODUCTS_BY_TAB}
      />
      <Categories />
      <WeeklyDeals />
      <BottomBanners />
      <Newsletter />
      <Footer />
    </div>
  );
}
