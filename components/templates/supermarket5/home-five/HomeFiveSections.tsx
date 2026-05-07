"use client";

import Link from "next/link";
import { useState } from "react";
import ShopMain from "@/components/templates/supermarket5/shop/ShopMain";
import { CATEGORIES, POSTS, PRODUCTS } from "@/lib/supermarket5/defaults";

const BP = "/templates/supermarket-5/preview";
const IMG = "/templates/supermarket5";

export function BannerFive() {
  return (
    <div className="rts-banner-area rts-section-gap pt_sm--20">
      <div className="container">
        <div className="row g-5 g-sm-4">
          <div className="col-lg-9">
            <div className="banner-left-five-area-start bg_image">
              <div className="inner-content-banner-five">
                <span>Get up to 30% off on your first $150 purchase</span>
                <h1 className="title">Do not miss our amazing <br />grocery deals</h1>
                <p>We have prepared special discounts for you on grocery products. Don&apos;t miss these opportunities...</p>
                <Link href={`${BP}/shop`} className="rts-btn btn-primary radious-sm with-icon">
                  <div className="btn-text">Shop Now</div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="banner-five-right-content bg_image">
              <div className="content-area">
                <Link href={`${BP}/shop`} className="rts-btn btn-primary">Weekend Discount</Link>
                <h3 className="title">Strawberry Water Drinks <span>Flavors Awesome</span></h3>
                <Link href={`${BP}/shop`} className="shop-now-goshop-btn">
                  <span className="text">Shop Now</span>
                  <div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div>
                  <div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureCategory() {
  return (
    <div className="rts-category-area rts-section-gapTop">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cover-card-main-over">
              <div className="title-area-between">
                <h2 className="title-left mb--0">Featured Categories</h2>
                <div className="next-prev-swiper-wrapper d-sm-none">
                  <div className="swiper-button-prevs"><i className="fa-regular fa-chevron-left" /></div>
                  <div className="swiper-button-nexts"><i className="fa-regular fa-chevron-right" /></div>
                </div>
              </div>
              <div className="row g-3">
                {CATEGORIES.slice(0, 8).map((category) => (
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6" key={category.id}>
                    <div className="single-category-one">
                      <Link href={`${BP}/categories/${category.slug}`}>
                        <img src={category.image} alt={category.name} />
                        <p>{category.name}</p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BestDiscount() {
  return (
    <div className="rts-feature-large-product-area rts-section-gapBottom">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="feature-product-area-large-2 bg_image">
              <div className="inner-feature-product-content">
                <span>Weekend Discount</span>
                <h2 className="title">Feed The Best Energy <br />Drink Booster</h2>
                <p>Just don&apos;t miss the special offer this week</p>
                <Link href={`${BP}/shop`} className="rts-btn btn-primary">Shop Now</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="feature-product-area-large-2 bg_2 bg_image">
              <div className="inner-feature-product-content">
                <span>Weekend Discount</span>
                <h2 className="title">Our Garden Fresh <br />Vegetables</h2>
                <p>Just don&apos;t miss the special offer this week</p>
                <Link href={`${BP}/shop`} className="rts-btn btn-primary">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BestSellingWrap() {
  const [tab, setTab] = useState("tab1");
  const groups: Record<string, number[]> = {
    tab1: [1, 5, 6, 4, 7, 8, 9, 10, 11, 12, 13, 15],
    tab2: [5, 6, 4, 7, 8, 5, 6, 5, 8, 9, 18, 12],
    tab3: [5, 6, 8, 7, 3, 2, 1, 5, 8, 9, 13, 2],
    tab4: [1, 2, 6, 7, 10, 2, 1, 5, 8, 11, 12, 16],
  };

  return (
    <div className="popular-product-col-7-area rts-section-gapBottom container">
      <div className="container cover-card-main-over-white mt--60">
        <div className="row">
          <div className="col-lg-12">
            <div className="cover-card-main-over-1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="title-area-between">
                      <h2 className="title-left">Weekly Best Selling Groceries</h2>
                      <Tabs active={tab} setActive={setTab} />
                    </div>
                  </div>
                </div>
                <ProductGrid indices={groups[tab]} compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecentlyAddedTwo() {
  const groups = [
    ["Recently Added", [1, 2, 3, 4]],
    ["Top Rated", [5, 6, 7, 8]],
    ["Top Selling", [9, 10, 11, 12]],
    ["Deals of the day", [13, 14, 15, 16]],
  ] as const;

  return (
    <div className="four-feature-in-one rts-section-gap">
      <div className="container">
        <div className="row g-4">
          {groups.map(([title, indices]) => (
            <div className="col-lg-3" key={title}>
              <div className="feature-product-list-wrapper">
                <div className="title-area"><h2 className="title">{title}</h2></div>
                {indices.map((index) => PRODUCTS[index]).filter(Boolean).map((product) => (
                  <div className="single-product-list" key={`${title}-${product.id}`}>
                    <div className="thumbnail"><Link href={`${BP}/shop/${product.slug}`}><img src={`${IMG}/products/${product.image}`} alt={product.title} /></Link></div>
                    <div className="body-content">
                      <Link href={`${BP}/shop/${product.slug}`}><h4 className="title">{product.title}</h4></Link>
                      <div className="price-area"><span className="current">{product.price}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogFive() {
  return (
    <div className="rts-blog-area rts-section-gap bg_gradient-tranding-items">
      <div className="container">
        <div className="row">
          <div className="col-lg-12"><div className="title-area-between"><h2 className="title-left mb--0">Latest Blog Post Insights</h2></div></div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="cover-card-main-over-1">
              <div className="row g-4">
                {POSTS.slice(3, 7).map((post) => (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={post.id}>
                    <div className="single-blog-area-start">
                      <Link href={`${BP}/blog/${post.slug}`} className="thumbnail"><img src={`${IMG}/blog/${post.image}`} alt={post.title} /></Link>
                      <div className="blog-body">
                        <div className="top-area"><span>{post.category}</span><span>{post.publishedDate}</span></div>
                        <Link href={`${BP}/blog/${post.slug}`}><h4 className="title">{post.title}</h4></Link>
                        <Link href={`${BP}/blog/${post.slug}`} className="shop-now-goshop-btn"><span className="text">Read More</span><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShortService() {
  const services = [
    ["fa-light fa-tags", "Best Prices & Offers", "Special discounts on grocery products."],
    ["fa-light fa-arrows-rotate", "100% Return Policy", "Simple returns for eligible grocery orders."],
    ["fa-light fa-headset", "Support 24/7", "Our support team is ready anytime."],
    ["fa-light fa-fire", "Great Daily Deals", "Fresh offers prepared every day."],
  ];
  return (
    <div className="rts-shorts-service-area rts-section-gap bg_primary">
      <div className="container">
        <div className="row g-5">
          {services.map(([icon, title, copy]) => (
            <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={title}>
              <div className="single-short-service-area-start">
                <div className="icon-area"><i className={icon} /></div>
                <div className="information"><h4 className="title">{title}</h4><p className="disc">{copy}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ indices, compact = false }: { indices: number[]; compact?: boolean }) {
  return (
    <div className="row g-4">
      {indices.map((index) => PRODUCTS[index]).filter(Boolean).map((product) => (
        <div key={product.id} className={compact ? "col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12" : "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"}>
          <div className="single-shopping-card-one">
            <ShopMain Slug={product.slug} ProductImage={product.image} ProductTitle={product.title} Price={product.price} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Tabs({ active, setActive }: { active: string; setActive: (tab: string) => void }) {
  const tabs = [
    ["tab1", "Frozen Foods"],
    ["tab2", "Diet Foods"],
    ["tab3", "Healthy Foods"],
    ["tab4", "Vitamin Items"],
  ];
  return (
    <ul className="nav nav-tabs best-selling-grocery" role="tablist">
      {tabs.map(([id, label]) => (
        <li className="nav-item" key={id}>
          <button type="button" onClick={() => setActive(id)} className={`nav-link ${active === id ? "active" : ""}`} aria-selected={active === id}>
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
