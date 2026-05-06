"use client";

import React from "react";
import DiscountProductMain from "../product-main/DiscountProductMain";

const BASE_PATH = "/templates/supermarket-1/preview";

interface PostType {
  slug: string;
  image: string;
  title?: string;
  price?: string;
}

const PRODUCTS: PostType[] = [
  { slug: "details-profitable-business-makes-your-profit", image: "16.jpg", title: "Details Profitable business", price: "29.00" },
  { slug: "details-business-makes-your-profit", image: "19.jpg", title: "Details business makes your profit", price: "90.00" },
  { slug: "firebase-business-makes-your-profit", image: "20.jpg", title: "Firebase business makes your profit", price: "50.00" },
  { slug: "me-profitable-business-makes-your-profit", image: "18.jpg", title: "Me Profitable business", price: "78.00" },
];

function DiscountProduct() {
  return (
    <div>
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Products With Discounts</h2>
                <div className="countdown">
                  <div className="countDown">12/05/2027 10:20:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product-with-discount">
                <div className="row g-5">
                  <div className="col-xl-4 col-lg-12">
                    <a href={`${BASE_PATH}/shop`} className="single-discount-with-bg">
                      <div className="inner-content">
                        <h4 className="title">Alpro Organic Flavored <br />Fresh Juice</h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">$15.00</h4>
                        </div>
                      </div>
                    </a>
                    <a href={`${BASE_PATH}/shop`} className="single-discount-with-bg bg-2">
                      <div className="inner-content">
                        <h4 className="title">Alpro Organic Flavored <br />Fresh Juice</h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">$15.00</h4>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-8 col-lg-12">
                    <div className="row g-4">
                      {PRODUCTS.map((post, index) => (
                        <div key={index} className="col-lg-6">
                          <div className="single-shopping-card-one discount-offer">
                            <DiscountProductMain
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
      </div>
    </div>
  );
}

export default DiscountProduct;
