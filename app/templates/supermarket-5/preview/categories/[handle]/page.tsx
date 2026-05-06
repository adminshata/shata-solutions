"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/templates/supermarket5/layout/SiteShell";
import { Header } from "@/components/templates/supermarket5/layout/Header";
import { Footer } from "@/components/templates/supermarket5/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket5/layout/CartDrawer";
import { ProductCard } from "@/components/templates/supermarket5/product/ProductCard";
import { useSite } from "@/lib/supermarket5/context";
import { findCategory, productsByCategory } from "@/lib/supermarket5/utils";

const BASE_PATH = "/templates/supermarket-5/preview";

export default function CategoryPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const config = useSite();
  const category = findCategory(config, handle);

  if (!category) notFound();

  const products = productsByCategory(config, handle);

  return (
    <SiteShell>
      <Header />
      <main style={{ background: "#F3F4F6" }}>
        {/* Banner */}
        <div style={{ background: "#7C3AED" }} className="py-10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 text-xs text-white/70 mb-2">
              <Link href={BASE_PATH} className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href={`${BASE_PATH}/shop`} className="hover:text-white">Shop</Link>
              <span>/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white">{category.name}</h1>
            <p className="mt-1 text-sm text-white/70">{products.length} product{products.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Link
                href={`${BASE_PATH}/shop`}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
              >
                All
              </Link>
              {config.categories.filter(c => c.active !== false).map((cat) => (
                <Link
                  key={cat.id}
                  href={`${BASE_PATH}/categories/${cat.handle}`}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    cat.handle === handle
                      ? "border-[#7C3AED] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED]"
                  }`}
                  style={cat.handle === handle ? { background: "#7C3AED" } : {}}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded border border-gray-200 p-16 text-center gap-4">
                <svg className="h-12 w-12 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M6 6h15l-1.5 9H7.5z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6L4 2H2" />
                </svg>
                <p className="text-gray-500">No products in this category yet.</p>
                <Link href={`${BASE_PATH}/shop`} className="text-sm font-semibold underline" style={{ color: "#7C3AED" }}>
                  Browse all products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}
