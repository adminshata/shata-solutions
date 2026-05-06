"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CategoryBb from "./CategoryBb";

const BASE_PATH = "/templates/supermarket-1/preview";

const slides = [
  {
    className: "banner-bg-image bg_image bg_one-banner ptb--120 ptb_md--80 ptb_sm--60",
    pre: "Get up to 30% off on your first $150 purchase",
    title: "Do not miss our amazing \ngrocery deals",
  },
  {
    className: "banner-bg-image bg_image bg_one-banner two ptb--120 ptb_md--80 ptb_sm--60",
    pre: "Get up to 30% off on your first $150 purchase",
    title: "Do not miss our amazing \ngrocery deals",
  },
];

const BannerOne = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="background-light-gray-color rts-section-gap bg_light-1 pt_sm--20">
      <div className="rts-banner-area-one mb--30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="category-area-main-wrapper-one" style={{ position: "relative" }}>
                <div className={slide.className}>
                  <div className="banner-one-inner-content">
                    <span className="pre">{slide.pre}</span>
                    <h1 className="title">
                      Do not miss our amazing <br />
                      grocery deals
                    </h1>
                    <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-primary radious-sm with-icon">
                      <div className="btn-text">Shop Now</div>
                      <div className="arrow-icon"><i className="fa-light fa-arrow-right"></i></div>
                      <div className="arrow-icon"><i className="fa-light fa-arrow-right"></i></div>
                    </Link>
                  </div>
                </div>
                <button className="swiper-button-next" onClick={nextSlide}>
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
                <button className="swiper-button-prev" onClick={prevSlide}>
                  <i className="fa-regular fa-arrow-left"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryBb />
    </div>
  );
};

export default BannerOne;
