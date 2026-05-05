"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/templates/supermarket1/layout/SiteShell";
import { Header } from "@/components/templates/supermarket1/layout/Header";
import { Footer } from "@/components/templates/supermarket1/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket1/layout/CartDrawer";
import { ProductCard } from "@/components/templates/supermarket1/product/ProductCard";
import { useSite } from "@/lib/supermarket1/context";
import { activeProducts, activeCategories } from "@/lib/supermarket1/utils";

const BASE_PATH = "/templates/supermarket-1/preview";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function ShopPage() {
  const config = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");

  const categories = activeCategories(config);
  let products = activeProducts(config);

  if (selectedCategory) {
    products = products.filter((p) => p.category === selectedCategory);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    products = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
    );
  }
  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  if (sort === "name-asc") products = [...products].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <SiteShell>
      <Header />
      <main className="py-8" style={{ background: "#F3F4F6" }}>
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-gray-500 mb-6">
            <Link href={BASE_PATH} className="hover:text-[#629D23]">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Shop</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-56 shrink-0 space-y-4">
              {/* Search */}
              <div className="bg-white rounded border border-gray-200 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">Search</h3>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-[#629D23]"
                />
              </div>

              {/* Categories */}
              <div className="bg-white rounded border border-gray-200 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("")}
                      className={`w-full text-left rounded px-2 py-1.5 text-sm transition-colors ${
                        selectedCategory === "" ? "text-[#629D23] font-semibold" : "text-gray-600 hover:text-[#629D23]"
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const count = activeProducts(config).filter((p) => p.category === cat.handle).length;
                    return (
                      <li key={cat.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(cat.handle)}
                          className={`w-full text-left rounded px-2 py-1.5 text-sm flex items-center justify-between transition-colors ${
                            selectedCategory === cat.handle
                              ? "text-[#629D23] font-semibold"
                              : "text-gray-600 hover:text-[#629D23]"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-gray-400">({count})</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded border border-gray-200 px-4 py-3 mb-5">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-800">{products.length}</span> products
                  {selectedCategory && (
                    <> in <span className="font-semibold text-[#629D23]">
                      {categories.find(c => c.handle === selectedCategory)?.name}
                    </span></>
                  )}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-[#629D23]"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>

              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white rounded border border-gray-200 p-12 text-center">
                  <p className="text-gray-500">No products found.</p>
                  <button
                    type="button"
                    onClick={() => { setSelectedCategory(""); setSearch(""); }}
                    className="mt-3 text-sm font-semibold underline"
                    style={{ color: "#629D23" }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}
