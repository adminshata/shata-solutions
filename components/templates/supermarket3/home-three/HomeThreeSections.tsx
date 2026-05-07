"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ShopMain from "@/components/templates/supermarket3/shop/ShopMain";
import { PRODUCTS, POSTS, CATEGORIES } from "@/lib/supermarket3/defaults";

const BP = "/templates/supermarket-3/preview";
const IMG = "/templates/supermarket3";

export function BuyingProcess() {
  const items = [
    ["fa-light fa-credit-card", "Installments Without Card", "Easy Payment Option"],
    ["fa-light fa-location-dot", "Track Your Order Online", "Order Location Check"],
    ["fa-light fa-face-smile", "100% Happy Customers", "Happy Customer Feedbacks"],
    ["fa-light fa-truck-fast", "Free Delivery From $70", "Home Delivery Available"],
  ];
  return (
    <div className="buying-easyway-process">
      <div className="container-2">
        <div className="col-lg-12">
          <div className="easyway-buying-area-wrapper">
            {items.map(([icon, title, copy]) => (
              <div className="single-easy-way-buying-area" key={title}>
                <div className="icon"><i className={icon} /></div>
                <div className="inforemation">
                  <h4 className="title">{title}</h4>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BannerThree() {
  const slides = [
    {
      cls: "banner-bg-full_1",
      pre: "Get up to 30% off on your first $150 purchase",
      title: "Don’t miss our amazing grocery deals",
      copy: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    },
    {
      cls: "banner-bg-full_1 img-two",
      pre: "Get up to 10% off on your first $250 purchase",
      title: "Check out our incredible deals today",
      copy: "BlueMart keeps fresh food, grocery staples, and daily offers ready for quick shopping.",
    },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 4500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const slide = slides[active];
  return (
    <div className="banner-three-swiper-main-wrapper swiper-button-between">
      <div className={`rts-section-gap rts-banner-area-three ${slide.cls}`}>
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-inner-content-three">
                <span className="pre">{slide.pre}</span>
                <h1 className="title">{slide.title.split(" ").slice(0, 5).join(" ")} <br />{slide.title.split(" ").slice(5).join(" ")}</h1>
                <p className="dsicription">{slide.copy}</p>
                <Link href={`${BP}/shop`} className="rts-btn btn-primary radious-sm with-icon">
                  <div className="btn-text">Shop Now</div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                  <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button className="swiper-button-prev" type="button" onClick={() => setActive((value) => (value + slides.length - 1) % slides.length)} aria-label="Previous banner">
          <i className="fa-regular fa-arrow-left" />
        </button>
        <button className="swiper-button-next" type="button" onClick={() => setActive((value) => (value + 1) % slides.length)} aria-label="Next banner">
          <i className="fa-regular fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}

export function FeatureCategory() {
  return (
    <div className="rts-category-area rts-section-gapTop">
      <div className="container-2">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-between">
              <h2 className="title-left mb--0">Featured Categories</h2>
              <div className="next-prev-swiper-wrapper">
                <button className="swiper-button-prev" type="button"><i className="fa-regular fa-chevron-left" /></button>
                <button className="swiper-button-next" type="button"><i className="fa-regular fa-chevron-right" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3">
          {CATEGORIES.slice(0, 8).map((category) => (
            <div key={category.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
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
  );
}

export function CategoryTop() {
  const cards = [
    ["one", "Drink Fresh Corn Juice", "Good Taste"],
    ["two", "Organic Lemon Flavored", "Banana Chips"],
    ["three", "Nozes Pecanera Brasil", "Chocolate Snacks"],
  ];
  return (
    <div className="category-feature-area rts-section-gap">
      <div className="container-2">
        <div className="row g-24">
          {cards.map(([cls, title, accent]) => (
            <div key={cls} className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className={`single-feature-card ssthree style-three bg_image ${cls}`}>
                <div className="content-area">
                  <Link href={`${BP}/shop/grid-top-filter`} className="rts-btn btn-primary">Weekend Discount</Link>
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

function ProductGrid({ indices, compact = false }: { indices: number[]; compact?: boolean }) {
  return (
    <div className="row g-4 mt--0">
      {indices.map((index) => PRODUCTS[index]).filter(Boolean).map((product) => (
        <div key={product.id} className={compact ? "col-lg-20 col-md-4 col-sm-6 col-12" : "col-lg-3 col-md-6 col-sm-6 col-12"}>
          <div className="single-shopping-card-one deals-of-day">
            <ShopMain Slug={product.slug} ProductImage={product.image} ProductTitle={product.title} Price={product.price} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PopularProduct() {
  const [tab, setTab] = useState("tab1");
  const groups: Record<string, number[]> = {
    tab1: [12, 5, 6, 4],
    tab2: [5, 6, 4, 7],
    tab3: [3, 2, 1, 5],
    tab4: [8, 11, 12, 16],
  };
  return (
    <div className="popular-product-weekly-seller-item rts-section-gap bg_light-1">
      <div className="container-2">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-between">
              <h2 className="title-left mb--0">Popular Products</h2>
              <Tabs active={tab} setActive={setTab} />
            </div>
          </div>
        </div>
        <ProductGrid indices={groups[tab]} />
      </div>
    </div>
  );
}

export function WeeklySellThree() {
  const [tab, setTab] = useState("tab1");
  const groups: Record<string, number[]> = {
    tab1: [5, 6, 4, 7, 8, 5, 6, 5, 8, 9],
    tab2: [7, 8, 5, 6, 5, 8, 9, 18, 12, 2],
    tab3: [5, 6, 8, 7, 3, 2, 1, 5, 8, 9],
    tab4: [1, 2, 6, 7, 10, 2, 1, 5, 8, 11],
  };
  return (
    <div className="bg_light-1 rts-section-gapBottom">
      <div className="container-2 single-new-offer-area-border-weekly-selstyle">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-between mb--15">
              <h2 className="title-left">Don't miss this week's sales</h2>
              <Tabs active={tab} setActive={setTab} />
            </div>
          </div>
        </div>
        <ProductGrid indices={groups[tab]} compact />
      </div>
    </div>
  );
}

export function WeeklySellFour() {
  return (
    <div className="rts-section-gap bg_light-1">
      <div className="container-2">
        <div className="row">
          <div className="col-lg-12"><div className="title-area-between"><h2 className="title-left mb--0">New Arrivals</h2><Link href={`${BP}/shop`} className="shop-now-goshop-btn"><span className="text">View All</span><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div></Link></div></div>
        </div>
        <ProductGrid indices={[18, 19, 20, 21, 22, 5, 7, 9]} compact />
      </div>
    </div>
  );
}

export function BlogThree() {
  return (
    <div className="rts-blog-area rts-section-gap">
      <div className="container-2">
        <div className="row">
          <div className="col-lg-12"><div className="title-area-between"><h2 className="title-left mb--0">Latest Blog Posts</h2><Link href={`${BP}/blog`} className="shop-now-goshop-btn"><span className="text">View All</span><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div><div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div></Link></div></div>
        </div>
        <div className="row g-4">
          {POSTS.slice(0, 3).map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <div className="single-blog-area-start">
                <Link href={`${BP}/blog/${post.slug}`} className="thumbnail"><img src={`${IMG}/blog/${post.image}`} alt={post.title} /></Link>
                <div className="blog-body">
                  <div className="top-area"><span>{post.category}</span><span>{post.publishedDate}</span></div>
                  <Link href={`${BP}/blog/${post.slug}`}><h4 className="title">{post.title}</h4></Link>
                  <p>{post.descripTion}</p>
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
