"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";
import WeeklyBestSellingMain from "@/components/templates/supermarket1/product-main/WeeklyBestSellingMain";

const BASE_PATH = "/templates/supermarket-1/preview";

interface PostType {
  slug: string;
  image: string;
  title?: string;
  price?: string;
  category?: string;
}

const ALL_PRODUCTS: PostType[] = [
  { slug: "profitable-business-makes-your-profit-Best-Solution", image: "15.jpg", title: "Profitable business Best Solution", price: "36.00", category: "Beverages" },
  { slug: "details-profitable-business-makes-your-profit", image: "16.jpg", title: "Details Profitable business", price: "29.00", category: "Beverages" },
  { slug: "one-Profitable-business-makes-your-profit", image: "17.jpg", title: "One Profitable business", price: "25.00", category: "Beverages" },
  { slug: "me-profitable-business-makes-your-profit", image: "18.jpg", title: "Me Profitable business", price: "78.00", category: "Biscuits & Snacks" },
  { slug: "details-business-makes-your-profit", image: "19.jpg", title: "Details business makes your profit", price: "90.00", category: "Beverages" },
  { slug: "firebase-business-makes-your-profit", image: "20.jpg", title: "Firebase business makes your profit", price: "50.00", category: "Beverages" },
  { slug: "netlyfy-business-makes-your-profit", image: "21.jpg", title: "Netlyfy business makes your profit", price: "19.00", category: "Beverages" },
  { slug: "profitable-business-makes-your-profit", image: "22.jpg", title: "Profitable business makes your profit", price: "30.00", category: "Biscuits & Snacks" },
  { slug: "Valuable-business-makes-your-profit", image: "23.jpg", title: "Valuable business makes your profit", price: "16.00", category: "Biscuits & Snacks" },
  { slug: "System-business-makes-your-profit", image: "24.jpg", title: "System business makes your profit", price: "15.00", category: "Biscuits & Snacks" },
  { slug: "profitables-business-makes-your-profit", image: "25.jpg", title: "Profitables business makes your profit", price: "12.00", category: "Breads & Bakery" },
  { slug: "content-business-makes-your-profit", image: "26.jpg", title: "Content business makes your profit", price: "79.00", category: "Breads & Bakery" },
  { slug: "Dalivaring-business-makes-your-profit", image: "01.jpg", title: "Dalivaring business makes your profit", price: "63.00", category: "Breads & Bakery" },
  { slug: "Staning-business-makes-your-profit", image: "02.jpg", title: "Staning business makes your profit", price: "86.00", category: "Breads & Bakery" },
  { slug: "Best-business-makes-your-profit", image: "03.jpg", title: "Best business makes your profit", price: "18.00", category: "Breads & Bakery" },
  { slug: "cooler-business-makes-your-profit", image: "04.jpg", title: "Cooler business makes your profit", price: "18.00", category: "Beverages" },
];

const allCategories = ["Beverages", "Biscuits & Snacks", "Breads & Bakery"];
const allBrands = ["Frito Lay", "Nespresso", "Oreo", "Quaker", "Welch's"];

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(150);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const price = parseFloat(p.price ?? "0");
    if (price < minPrice || price > maxPrice) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category ?? "")) return false;
    if (searchQuery) {
      const t = p.title?.toLowerCase() ?? "";
      if (!t.includes(searchQuery)) return false;
    }
    return true;
  });

  return (
    <div className="shop-page">
      {/* Breadcrumb */}
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">Shop</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>
      <div className="shop-grid-sidebar-area rts-section-gap">
        <div className="container">
          <div className="row g-0">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-12 pr--70 pr_lg--10 pr_sm--10 pr_md--5 rts-sticky-column-item">
              <div className="sidebar-filter-main theiaStickySidebar">
                <div className="single-filter-box">
                  <h5 className="title">Widget Price Filter</h5>
                  <div className="filterbox-body">
                    <form action="#" className="price-input-area" onSubmit={(e) => e.preventDefault()}>
                      <div className="half-input-wrapper">
                        <div className="single">
                          <label htmlFor="min">Min price</label>
                          <input id="min" type="number" value={minPrice} min={0} onChange={(e) => setMinPrice(parseFloat(e.target.value) || 0)} />
                        </div>
                        <div className="single">
                          <label htmlFor="max">Max price</label>
                          <input id="max" type="number" value={maxPrice} min={0} onChange={(e) => setMaxPrice(parseFloat(e.target.value) || 150)} />
                        </div>
                      </div>
                      <input type="range" className="range" min={0} max={150} value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))} />
                      <div className="filter-value-min-max">
                        <span>Price: ${minPrice} — ${maxPrice}</span>
                        <button type="submit" className="rts-btn btn-primary">Filter</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="single-filter-box">
                  <h5 className="title">Product Categories</h5>
                  <div className="filterbox-body">
                    <div className="category-wrapper">
                      {allCategories.map((cat, i) => (
                        <div className="single-category" key={i}>
                          <input id={`cat${i+1}`} type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} />
                          <label htmlFor={`cat${i+1}`}>{cat}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="single-filter-box">
                  <h5 className="title">Select Brands</h5>
                  <div className="filterbox-body">
                    <div className="category-wrapper">
                      {allBrands.map((brand, i) => (
                        <div className="single-category" key={i}>
                          <input id={`brand${i+1}`} type="checkbox" />
                          <label htmlFor={`brand${i+1}`}>{brand}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main */}
            <div className="col-xl-9 col-lg-12">
              <div className="filter-select-area">
                <div className="top-filter">
                  <span>Showing {filteredProducts.length} results</span>
                  <div className="right-end">
                    <span>Sort: Short By Latest</span>
                    <div className="button-tab-area">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <button onClick={() => setActiveTab("tab1")} className={`nav-link single-button ${activeTab === "tab1" ? "active" : ""}`}>
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><rect x="0.5" y="0.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /><rect x="0.5" y="9.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /><rect x="9.5" y="0.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /><rect x="9.5" y="9.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /></svg>
                          </button>
                        </li>
                        <li className="nav-item">
                          <button onClick={() => setActiveTab("tab2")} className={`nav-link single-button ${activeTab === "tab2" ? "active" : ""}`}>
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><rect x="0.5" y="0.5" width={6} height={6} rx="1.5" stroke="#2C3C28" /><rect x="0.5" y="9.5" width={6} height={6} rx="1.5" stroke="#2C3C28" /><rect x={9} y={3} width={7} height={1} fill="#2C3C28" /><rect x={9} y={12} width={7} height={1} fill="#2C3C28" /></svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-content mt--20">
                {activeTab === "tab1" && (
                  <div className="row g-4">
                    {filteredProducts.length > 0 ? filteredProducts.map((post, index) => (
                      <div key={index} className="col-lg-20 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="single-shopping-card-one">
                          <WeeklyBestSellingMain Slug={post.slug} ProductImage={post.image} ProductTitle={post.title} Price={post.price} />
                        </div>
                      </div>
                    )) : (
                      <div className="col-12 text-center py-5"><h2>No Product Found</h2></div>
                    )}
                  </div>
                )}
                {activeTab === "tab2" && (
                  <div className="row">
                    {filteredProducts.length > 0 ? filteredProducts.map((post, index) => (
                      <div key={index} className="col-lg-6">
                        <div className="single-shopping-card-one discount-offer">
                          <WeeklyBestSellingMain Slug={post.slug} ProductImage={post.image} ProductTitle={post.title} Price={post.price} />
                        </div>
                      </div>
                    )) : (
                      <div className="col-12 text-center py-5"><h2>No Product Found</h2></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <HeaderOne />
      <Suspense fallback={<div className="text-center py-20"><p>Loading products...</p></div>}>
        <ShopContent />
      </Suspense>
      <FooterOne />
    </>
  );
}
