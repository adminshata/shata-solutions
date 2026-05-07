"use client";
import React from 'react';
import Link from 'next/link';

const BP = "/templates/supermarket-3/preview";

function BannerTwo() {
  return (
    <div>
      <div className="rts-banner-area-two mt--60">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-area-two-start">
                <div className="banner-bg-iamge-area bg_banner-2 bg_image">
                  <div className="content">
                    <span className="pre-title">Get up to 30% off on your first $150 purchase</span>
                    <h1 className="title">Feed Your Family at the <br />Best Price</h1>
                    <p className="disc">We have prepared special discounts for you on grocery products. Don't <br /> miss these opportunities...</p>
                    <div className="rts-btn-banner-area">
                      <Link href={`${BP}/shop`} className="rts-btn btn-primary radious-sm with-icon">
                        <div className="btn-text">Shop Now</div>
                        <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                        <div className="arrow-icon"><i className="fa-light fa-arrow-right" /></div>
                      </Link>
                      <div className="price-area"><span>from</span><h3 className="title">$80.99</h3></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BannerTwo;
