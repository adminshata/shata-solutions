"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";

const categories = [
  { img: "/templates/supermarket1/category/01.png", name: "Organic Vegetable" },
  { img: "/templates/supermarket1/category/02.png", name: "Fresh Fruits" },
  { img: "/templates/supermarket1/category/03.png", name: "Dairy Products" },
  { img: "/templates/supermarket1/category/04.png", name: "Breads & Bakery" },
  { img: "/templates/supermarket1/category/05.png", name: "Chips & Snacks" },
  { img: "/templates/supermarket1/category/06.png", name: "Meats & Seafood" },
  { img: "/templates/supermarket1/category/07.png", name: "Frozen Foods" },
  { img: "/templates/supermarket1/category/08.png", name: "Beverages" },
  { img: "/templates/supermarket1/category/09.png", name: "Grocery" },
  { img: "/templates/supermarket1/category/10.png", name: "Other Items" },
];

function CategoryBannerBottom() {
  const [startIndex, setStartIndex] = useState(0);
  const visible = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleCats = [...categories, ...categories].slice(startIndex, startIndex + visible);

  return (
    <div className="rts-caregory-area-one">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="category-area-main-wrapper-one">
              <div className="swiper-wrapper" style={{ display: "flex", gap: "12px" }}>
                {visibleCats.map((cat, idx) => (
                  <div key={idx} className="swiper-slide" style={{ flex: "0 0 auto", width: "9%" }}>
                    <Link href={`${BASE_PATH}/shop`} className="single-category-one">
                      <img
                        src={cat.img}
                        alt={cat.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                      <p>{cat.name}</p>
                    </Link>
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

export default CategoryBannerBottom;
