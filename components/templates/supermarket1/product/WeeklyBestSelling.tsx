"use client";

import { useState } from "react";
import WeeklyBestSellingMain from "../product-main/WeeklyBestSellingMain";

interface PostType {
  slug: string;
  image: string;
  title?: string;
  price?: string;
}

const ALL_PRODUCTS: PostType[] = [
  { slug: "details-profitable-business-makes-your-profit", image: "16.jpg", title: "Details Profitable business", price: "29.00" },
  { slug: "details-business-makes-your-profit", image: "19.jpg", title: "Details business makes your profit", price: "90.00" },
  { slug: "firebase-business-makes-your-profit", image: "20.jpg", title: "Firebase business makes your profit", price: "50.00" },
  { slug: "me-profitable-business-makes-your-profit", image: "18.jpg", title: "Me Profitable business", price: "78.00" },
  { slug: "netlyfy-business-makes-your-profit", image: "21.jpg", title: "Netlyfy business makes your profit", price: "19.00" },
  { slug: "profitable-business-makes-your-profit", image: "22.jpg", title: "Profitable business makes your profit", price: "30.00" },
  { slug: "Valuable-business-makes-your-profit", image: "23.jpg", title: "Valuable business makes your profit", price: "16.00" },
  { slug: "System-business-makes-your-profit", image: "24.jpg", title: "System business makes your profit", price: "15.00" },
  { slug: "profitables-business-makes-your-profit", image: "25.jpg", title: "Profitables business makes your profit", price: "12.00" },
  { slug: "content-business-makes-your-profit", image: "26.jpg", title: "Content business makes your profit", price: "79.00" },
  { slug: "Dalivaring-business-makes-your-profit", image: "01.jpg", title: "Dalivaring business makes your profit", price: "63.00" },
  { slug: "Staning-business-makes-your-profit", image: "02.jpg", title: "Staning business makes your profit", price: "86.00" },
];

const TAB_PRODUCTS: Record<string, PostType[]> = {
  tab1: ALL_PRODUCTS.slice(0, 12),
  tab2: [...ALL_PRODUCTS.slice(4, 12), ...ALL_PRODUCTS.slice(0, 4)],
  tab3: [...ALL_PRODUCTS.slice(2, 10), ...ALL_PRODUCTS.slice(0, 2)],
  tab4: [...ALL_PRODUCTS.slice(6, 12), ...ALL_PRODUCTS.slice(0, 6)],
};

const WeeklyBestSelling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const products = TAB_PRODUCTS[activeTab] ?? [];

  return (
    <div>
      <div className="weekly-best-selling-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Weekly Best Selling Groceries</h2>
                <ul className="nav nav-tabs best-selling-grocery" id="myTab" role="tablist">
                  {[
                    { id: "tab1", label: "Frozen Foods" },
                    { id: "tab2", label: "Diet Foods" },
                    { id: "tab3", label: "Healthy Foods" },
                    { id: "tab4", label: "Vitamin Items" },
                  ].map((tab) => (
                    <li key={tab.id} className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row g-4">
                {products.map((post, index) => (
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
  );
};

export default WeeklyBestSelling;
