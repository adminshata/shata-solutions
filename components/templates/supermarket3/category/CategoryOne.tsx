"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const BP = "/templates/supermarket-3/preview";

const categories = [
  { img: "01.jpg", label: "Organic Vegetable", count: "299 Items" },
  { img: "02.jpg", label: "Fresh Fruits", count: "150 Items" },
  { img: "03.jpg", label: "Dairy Products", count: "85 Items" },
  { img: "04.jpg", label: "Bakery Items", count: "120 Items" },
  { img: "05.jpg", label: "Meat & Seafood", count: "75 Items" },
  { img: "06.jpg", label: "Snacks & Chips", count: "200 Items" },
  { img: "07.jpg", label: "Frozen Foods", count: "95 Items" },
  { img: "08.jpg", label: "Grocery Staples", count: "310 Items" },
  { img: "09.jpg", label: "Healthcare", count: "60 Items" },
];

function CategoryOne() {
  const [current, setCurrent] = useState(0);
  const visible = 8;
  const total = categories.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  const slides = [...categories, ...categories].slice(current, current + visible);

  return (
    <div>
      <div className="rts-caregory-area-two rts-section-gap">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="category-area-main-wrapper-two">
                <div className="mySwiper-category-1 swiper-data" style={{ display: 'flex', gap: 0, overflow: 'hidden' }}>
                  {slides.map((cat, i) => (
                    <div key={i} style={{ flex: '0 0 12.5%' }}>
                      <div className="single-category-one">
                        <Link href={`${BP}/shop`}>
                          <img src={`/templates/supermarket3/category/${cat.img}`} alt="category" />
                          <p>{cat.label}</p>
                          <span>{cat.count}</span>
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
    </div>
  );
}
export default CategoryOne;
