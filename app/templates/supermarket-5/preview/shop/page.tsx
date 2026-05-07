"use client";
import HeaderTwo from "@/components/templates/supermarket5/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket5/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket5/common/BackToTop";
import ShopMain from "@/components/templates/supermarket5/shop/ShopMain";
import { PRODUCTS } from "@/lib/supermarket5/defaults";
import type { Product } from "@/lib/supermarket5/types";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BASE_PATH = "/templates/supermarket-5/preview";

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(150);

  const filteredProducts = PRODUCTS.filter((p: Product) => {
    const price = parseFloat(p.price ?? "0");
    const matchSearch = !searchQuery || (p.title?.toLowerCase().includes(searchQuery) || p.category?.toLowerCase().includes(searchQuery));
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category ?? "");
    const matchPrice = price >= minPrice && price <= maxPrice;
    return matchSearch && matchCat && matchPrice;
  });

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category).filter(Boolean))) as string[];

  return (
    <div className="rts-shop-section rts-section-gap bg_light-1">
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-3 col-lg-4 col-12">
            <div className="shop-sidebar-area">
              <div className="single-sidebar-widget">
                <h5 className="title">Categories</h5>
                <div className="inner-content-category-filter">
                  {categories.map((cat, i) => (
                    <div key={i} className="single-category-filter">
                      <input type="checkbox" id={`cat-${i}`} checked={selectedCategories.includes(cat)}
                        onChange={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} />
                      <label htmlFor={`cat-${i}`}>{cat}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="single-sidebar-widget mt--30">
                <h5 className="title">Price Range</h5>
                <div>
                  <input type="range" min={0} max={150} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: "100%" }} />
                  <p>$0 — ${maxPrice}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-12">
            <div className="row g-4">
              {filteredProducts.length === 0 ? (
                <div className="col-12"><p>No products found.</p></div>
              ) : filteredProducts.map((product: Product, i: number) => (
                <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="single-shopping-card-one">
                    <ShopMain Slug={product.slug} ProductImage={product.image} ProductTitle={product.title} Price={product.price} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row"><div className="col-lg-12">
            <div className="navigator-breadcrumb-wrapper">
              <Link href={BASE_PATH}>Home</Link>
              <i className="fa-regular fa-chevron-right" />
              <a className="current" href="#">Shop</a>
            </div>
          </div></div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}><ShopContent /></Suspense>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
