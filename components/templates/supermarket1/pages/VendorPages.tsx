"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import WeeklyBestSellingMain from "@/components/templates/supermarket1/product-main/WeeklyBestSellingMain";
import { PageShell } from "./PageShell";
import {
  SUPERMARKET1_BASE,
  SUPERMARKET1_ASSETS,
  supermarket1Vendors,
  type SupermarketVendor,
} from "@/lib/supermarket1/reference-data";

function Stars({ rating }: { rating: string }) {
  return (
    <div className="stars-area">
      {Array.from({ length: 5 }).map((_, index) => (
        <i key={index} className="fa-solid fa-star" />
      ))}
      <span>{rating}</span>
    </div>
  );
}

function VendorCard({ vendor, mode }: { vendor: SupermarketVendor; mode: "grid" | "list" }) {
  return (
    <div className={mode === "list" ? "single-vendor-area with-list" : "single-vendor-area"}>
      <div className="logo-vendor">
        <img src={vendor.logo} alt={vendor.name} />
      </div>
      <h3 className="title">
        {vendor.name} <span className={vendor.status === "Open" ? "open" : "closed"}>{vendor.status}</span>
      </h3>
      <Stars rating={vendor.rating} />
      <div className="location">
        <i className="fa-regular fa-location-dot" />
        <p>{vendor.address}</p>
      </div>
      <div className="location">
        <i className="fa-solid fa-phone-volume" />
        <p>{vendor.phone}</p>
      </div>
      <Link href={`${SUPERMARKET1_BASE}/vendors/${vendor.handle}`} className="rts-btn btn-primary radious-sm with-icon">
        <div className="btn-text">Visit Store</div>
        <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
        <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
      </Link>
    </div>
  );
}

export function VendorsPage({ initialMode = "grid" }: { initialMode?: "grid" | "list" }) {
  const [mode, setMode] = useState<"grid" | "list">(initialMode);
  const [query, setQuery] = useState("");
  const vendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? supermarket1Vendors.filter((vendor) => vendor.name.toLowerCase().includes(q)) : supermarket1Vendors;
  }, [query]);

  return (
    <PageShell title={mode === "grid" ? "Vendor Grid" : "Vendor List"}>
      <div className="vendor-search-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="vendor-search-area-wrapper">
                <h1 className="title">Vendors List</h1>
                <form className="search-vendor-form" onSubmit={(event) => event.preventDefault()}>
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search vendors (by name or ID)..."
                  />
                  <button type="submit" className="rts-btn btn-primary radious-sm with-icon">
                    <div className="btn-text">Search</div>
                    <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                    <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="vendor-search-area rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="filter-search-area-top-between filter-select-area">
                <div className="top-filter">
                  <span>Showing 1-20 of 57 results</span>
                  <div className="right-end">
                    <span>Sort: Short By Latest</span>
                    <div className="button-tab-area">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <button type="button" onClick={() => setMode("grid")} className={`nav-link single-button ${mode === "grid" ? "active" : ""}`}>
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><rect x="0.5" y="0.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /><rect x="0.5" y="9.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /><rect x="9.5" y="0.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /><rect x="9.5" y="9.5" width={6} height={6} rx="1.5" stroke="#2C3B28" /></svg>
                          </button>
                        </li>
                        <li className="nav-item">
                          <button type="button" onClick={() => setMode("list")} className={`single-button nav-link ${mode === "list" ? "active" : ""}`}>
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><rect x="0.5" y="0.5" width={6} height={6} rx="1.5" stroke="#2C3C28" /><rect x="0.5" y="9.5" width={6} height={6} rx="1.5" stroke="#2C3C28" /><rect x={9} y={3} width={7} height={1} fill="#2C3C28" /><rect x={9} y={12} width={7} height={1} fill="#2C3C28" /></svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-content mt--20">
                <div className={mode === "list" ? "row g-4" : "row g-4"}>
                  {vendors.map((vendor) => (
                    <div key={vendor.handle} className={mode === "list" ? "col-12" : "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"}>
                      <VendorCard vendor={vendor} mode={mode} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function VendorDetailsPage({ handle }: { handle: string }) {
  const vendor = supermarket1Vendors.find((item) => item.handle === handle) ?? supermarket1Vendors[0];

  return (
    <PageShell title="Vendor Details">
      <div className="vendor-name">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="vendor-name-area-details">
                <h1 className="title">{vendor.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="store-details-area rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-12 pr--60 pr_md--10 pr_sm--10">
              <div className="filter-area-vendor-details">
                <div className="single-filter-box">
                  <h5 className="title">Product Categories</h5>
                  <div className="filterbox-body">
                    <div className="category-wrapper">
                      {["Beverages", "Biscuits & Snacks", "Breads & Bakery", "Breakfast & Dairy", "Frozen Foods", "Fruits & Vegetables", "Grocery & Staples", "Household Needs", "Meats & Seafood"].map((category, index) => (
                        <div className="single-category" key={category}>
                          <input id={`vendor-cat-${index}`} type="checkbox" />
                          <label htmlFor={`vendor-cat-${index}`}>{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="single-filter-box">
                  <h5 className="title">Store Time</h5>
                  <div className="filterbox-body vendor-time-opening">
                    <h6 className="title-opeing">Open Hours</h6>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <span className="single-opening-hour" key={day}><span className="day">{day}</span> : 8:00 am - 10:00 pm</span>
                    ))}
                    <span className="single-opening-hour"><span className="day">Sun</span> : <span>Off Day</span></span>
                  </div>
                </div>
                <div className="single-filter-box">
                  <h5 className="title">Contact Vendor</h5>
                  <div className="filterbox-body vendor-contact-info-wrapper">
                    <form onSubmit={(event) => event.preventDefault()}>
                      <input type="text" placeholder="Your Name" />
                      <input type="email" placeholder="Email Address" />
                      <input type="text" placeholder="Type Message" />
                      <button className="rts-btn btn-primary">Submit Message</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-12 mt-lg--30">
              <div className="vendor-details-banner--area">
                <div className="row g-5">
                  <div className="col-lg-3">
                    <div className="vendor-banner-left">
                      <img src={vendor.logo} alt={vendor.name} />
                      <div className="header-area">
                        <h4 className="title">{vendor.name} <span>{vendor.status}</span></h4>
                      </div>
                      <Stars rating={`(${vendor.rating})`} />
                      <div className="location"><i className="fa-regular fa-location-dot" /><p>{vendor.address}</p></div>
                      <div className="location"><i className="fa-regular fa-phone-volume" /><p>{vendor.phone}</p></div>
                      <div className="location"><i className="fa-regular fa-cart-shopping" /><p>3214 Product Available</p></div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="banner-vendor-details bg_image" style={{ backgroundImage: `url(${vendor.cover})` }}>
                      <div className="content-area">
                        <a href="#" className="rts-btn btn-primary">Weekend Discount</a>
                        <h3 className="title animated fadeIn">Drink Fresh Corn Juice <br /><span>Good Taste</span></h3>
                        <a href="#" className="shop-now-goshop-btn"><span className="text">Shop Now</span><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product-area-add-wrapper bg_image">
                    <h2 className="title">Products</h2>
                    <img src={`${SUPERMARKET1_ASSETS}/images/vendor/01.png`} alt="" className="one" />
                    <img src={`${SUPERMARKET1_ASSETS}/images/vendor/02.png`} alt="" className="two" />
                  </div>
                </div>
              </div>
              <div className="row g-4 ml-v-dec-m mt--40">
                {["08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg"].map((image, index) => (
                  <div className="col-lg-4 col-md-6" key={image}>
                    <div className="single-shopping-card-one tranding-product">
                      <WeeklyBestSellingMain
                        Slug={`vendor-product-${index + 1}`}
                        ProductImage={image}
                        ProductTitle="Fresh grocery product"
                        Price={(18 + index * 4).toFixed(2)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
