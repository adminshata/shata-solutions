"use client";

import Link from "next/link";
import React from "react";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_IMG = "/templates/supermarket1/products";

const trendingProducts = [
  { img: "07.jpg", title: "Pastine Mellin Filid", slug: "netlyfy-business-makes-your-profit" },
  { img: "08.jpg", title: "Di Grano Tenero", slug: "profitable-business-makes-your-profit" },
  { img: "09.jpg", title: "Mellin Grano Tenero", slug: "Valuable-business-makes-your-profit" },
  { img: "10.jpg", title: "Grano Tenero", slug: "System-business-makes-your-profit" },
  { img: "11.jpg", title: "Jack Froot", slug: "profitables-business-makes-your-profit" },
  { img: "12.jpg", title: "Fresh Mango", slug: "content-business-makes-your-profit" },
  { img: "13.jpg", title: "Fresh Juice", slug: "Dalivaring-business-makes-your-profit" },
  { img: "14.jpg", title: "Pastine Mellin", slug: "Staning-business-makes-your-profit" },
];

function TrandingProduct() {
  return (
    <div>
      <>
        {/* rts top tranding product area */}
        <div className="top-tranding-product rts-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-area-between">
                  <h2 className="title-left mb--10">Top Trending Products</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="cover-card-main-over">
                  <div className="row g-4">
                    {trendingProducts.map((product, index) => (
                      <div key={index} className="col-xl-3 col-md-6 col-sm-12 col-12">
                        <div className="single-shopping-card-one tranding-product">
                          <Link href={`${BASE_PATH}/shop/${product.slug}`} className="thumbnail-preview">
                            <div className="badge">
                              <span>25% <br />Off</span>
                              <i className="fa-solid fa-bookmark" />
                            </div>
                            <img src={`${BASE_IMG}/${product.img}`} alt="grocery" />
                          </Link>
                          <div className="body-content">
                            <Link href={`${BASE_PATH}/shop/${product.slug}`}>
                              <h4 className="title">{product.title}</h4>
                            </Link>
                            <span className="availability">500g Pack</span>
                            <div className="price-area">
                              <span className="current">$36.00</span>
                              <div className="previous">$36.00</div>
                            </div>
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
        {/* rts top tranding product area end */}
      </>
    </div>
  );
}

export default TrandingProduct;
