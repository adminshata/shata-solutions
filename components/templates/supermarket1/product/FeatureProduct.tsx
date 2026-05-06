"use client";

import React, { useState, useEffect } from "react";
import WeeklyBestSellingMain from "../product-main/WeeklyBestSellingMain";

interface PostType {
  id: number;
  slug: string;
  image: string;
  title?: string;
  price?: string;
}

const PRODUCTS: PostType[] = [
  { id: 1, slug: "profitable-business-makes-your-profit-Best-Solution", image: "15.jpg", title: "Profitable business makes your profit", price: "36.00" },
  { id: 2, slug: "details-profitable-business-makes-your-profit", image: "16.jpg", title: "Details Profitable business", price: "29.00" },
  { id: 3, slug: "one-Profitable-business-makes-your-profit", image: "17.jpg", title: "One Profitable business", price: "25.00" },
  { id: 4, slug: "me-profitable-business-makes-your-profit", image: "18.jpg", title: "Me Profitable business", price: "78.00" },
  { id: 5, slug: "details-business-makes-your-profit", image: "19.jpg", title: "Details business makes your profit", price: "90.00" },
  { id: 6, slug: "firebase-business-makes-your-profit", image: "20.jpg", title: "Firebase business makes your profit", price: "50.00" },
  { id: 7, slug: "netlyfy-business-makes-your-profit", image: "21.jpg", title: "Netlyfy business makes your profit", price: "19.00" },
];

function FeatureProduct() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const perPage = 6;
  const total = PRODUCTS.length;

  const prev = () => setCurrentIdx((i) => (i - 1 + total) % total);
  const next = () => setCurrentIdx((i) => (i + 1) % total);

  useEffect(() => {
    const interval = setInterval(() => { setCurrentIdx((i) => (i + 1) % total); }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  const visible = Array.from({ length: perPage }, (_, k) => PRODUCTS[(currentIdx + k) % total]);

  return (
    <div>
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Featured Grocery</h2>
                <div className="next-prev-swiper-wrapper">
                  <div className="swiper-button-prev" onClick={prev} style={{ cursor: "pointer" }}>
                    <i className="fa-regular fa-chevron-left" />
                  </div>
                  <div className="swiper-button-next" onClick={next} style={{ cursor: "pointer" }}>
                    <i className="fa-regular fa-chevron-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="category-area-main-wrapper-one">
                <div className="row g-4">
                  {visible.map((post, index) => (
                    <div key={index} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="single-shopping-card-one">
                        <WeeklyBestSellingMain
                          Slug={post.slug}
                          ProductImage={post.image}
                          ProductTitle={post.title}
                          Price={post.price}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
