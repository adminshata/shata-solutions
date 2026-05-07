"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ShopMain from "@/components/templates/supermarket5/shop/ShopMain";
import { CATEGORIES, POSTS, PRODUCTS } from "@/lib/supermarket5/defaults";

const BP = "/templates/supermarket-5/preview";
const IMG = "/templates/supermarket5";
const DEAL_COUNTDOWN_TARGET = new Date("2026-10-05T10:20:00").getTime();

function useCountdown(targetTime: number) {
  const [time, setTime] = useState(["00", "00", "00", "00"]);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetTime - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTime([days, hours, minutes, seconds].map((value) => String(value).padStart(2, "0")));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetTime]);

  return time;
}

export function BannerFour() {
  return (
    <div className="rts-banner-area rts-section-gap banner-bg_4 bg_image d-flex align-items-center">
      <div className="transparent-person">
        <img src={`${IMG}/banner/transparent/01.png`} alt="Fresh grocery basket" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-area-start-4">
              <span className="pre">Get up to -30% off on your purchase</span>
              <h1 className="title">Buy From Different Kind <br />of Grocery Store</h1>
              <p>Don&apos;t miss these opportunities...</p>
              <div className="rts-btn-banner-area">
                <Link href={`${BP}/shop`} className="rts-btn btn-primary radious-sm with-icon">
                  <div className="btn-text">Shop Now</div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                </Link>
                <div className="price-area">
                  <span>from</span>
                  <h3 className="title">$80.99</h3>
                </div>
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="title-area-between">
                    <h2 className="title-left mb--0">Featured Categories</h2>
                    <div className="next-prev-swiper-wrapper d-sm-none">
                      <div className="swiper-button-prevs"><i className="fa-regular fa-chevron-left" /></div>
                      <div className="swiper-button-nexts"><i className="fa-regular fa-chevron-right" /></div>
                    </div>
                  </div>
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

export function FeatureDiscount() {
  const cards = [
    ["one", "Drink Fresh Corn Juice", "Good Taste"],
    ["two", "Organic Lemon Flavored", "Banana Chips"],
    ["three", "Nozes Pecanera Brasil", "Chocolate Snacks"],
    ["four", "Strawberry Water Drinks", "Flavors Awesome"],
  ];

  return (
    <div className="category-feature-area rts-section-gapTop">
      <div className="container">
        <div className="row g-4">
          {cards.map(([cls, title, accent]) => (
            <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={cls}>
              <div className={`single-feature-card bg_image ${cls}`}>
                <div className="content-area">
                  <Link href={`${BP}/shop`} className="rts-btn btn-primary">Weekend Discount</Link>
                  <h3 className="title">{title}<br /><span>{accent}</span></h3>
                  <Link href={`${BP}/shop`} className="shop-now-goshop-btn">
                    <span className="text">Shop Now</span>
                    <div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div>
                    <div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LessDiscount() {
  return (
    <div className="rts-category-area rts-section-gapTop">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cover-card-main-over">
              <div className="title-area-between">
                <h2 className="title-left mb--0">Hand Picked Products for 10% Offer</h2>
                <div className="next-prev-swiper-wrapper d-sm-none">
                  <div className="swiper-button-prevs"><i className="fa-regular fa-chevron-left" /></div>
                  <div className="swiper-button-nexts"><i className="fa-regular fa-chevron-right" /></div>
                </div>
              </div>
              <ProductGrid indices={[8, 9, 10, 11, 12, 13]} cardClass="tranding-product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LessDiscountTwo() {
  const countdown = useCountdown(DEAL_COUNTDOWN_TARGET);
  return (
    <div className="weekly-best-deals-top-primary rts-section-gapTop">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="weekly-best-deals-top-primary-wrapper">
              <div className="title-area-between with-progress">
                <h2 className="title-left color-white mb--0">Hand Picked Products for 10% Offer</h2>
                <div className="countdown">
                  <div className="countDown">
                    {countdown.map((item, index) => (
                      <div className="container" key={`${item}-${index}`}><div className="a"><div>{item}</div></div></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="body-best-deals-padding">
                <ProductGrid indices={[20, 21, 10]} deal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecentlyAdded() {
  const groups = [
    ["Recently Added", [1, 2, 3, 4]],
    ["Top Rated", [5, 6, 7, 8]],
    ["Top Selling", [9, 10, 11, 12]],
  ] as const;

  return (
    <div className="four-feature-in-one rts-section-gapTop">
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
          <div className="col-lg-3">
            <div className="add-area-start-feature">
              <div className="thumbnail"><img src={`${IMG}/add/01.jpg`} alt="Seasonal grocery offer" /></div>
              <div className="inner-add-content">
                <div className="tag">Weekend Discount</div>
                <h2 className="title">Discover Real organic <span>Flavors Vegetable</span></h2>
                <Link href={`${BP}/shop`} className="shop-now-goshop-btn">
                  <span className="text">Read Details</span>
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

export function BlogFour() {
  return (
    <div className="blog-area-start rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-between"><h2 className="title-left mb--0">Latest Blog Post Insights</h2></div>
          </div>
        </div>
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

function ProductGrid({ indices, compact = false, deal = false, cardClass = "" }: { indices: number[]; compact?: boolean; deal?: boolean; cardClass?: string }) {
  return (
    <div className="row g-4">
      {indices.map((index) => PRODUCTS[index]).filter(Boolean).map((product) => (
        <div key={product.id} className={deal ? "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12" : compact ? "col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12" : "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"}>
          <div className={`single-shopping-card-one ${deal ? "tranding-product with-progress" : cardClass}`}>
            <ShopMain Slug={product.slug} ProductImage={product.image} ProductTitle={product.title} Price={product.price} />
            {deal && (
              <div className="bottom-content-deals mt--10">
                <span>In Stock</span>
                <div className="single-progress-area-incard">
                  <div className="progress"><div className="progress-bar wow fadeInLeft" role="progressbar" style={{ width: "80%" }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} /></div>
                </div>
              </div>
            )}
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
