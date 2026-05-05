"use client";

import { useState } from "react";
import type { Product2 } from "./ProductCard";
import ProductCard from "./ProductCard";

type Tab = { id: string; label: string };

type ProductGridProps = {
  title: string;
  tabs: Tab[];
  productsByTab: Record<string, Product2[]>;
};

export default function ProductGrid({ title, tabs, productsByTab }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const products = productsByTab[activeTab] ?? [];

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-gray-900 px-8 py-3 text-xs font-bold uppercase tracking-wider text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            Discover All Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
