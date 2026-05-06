"use client";
import React from 'react';
import DealOfDayMain from '@/components/templates/supermarket2/product-main/DealOfDayMain';
import { PRODUCTS } from '@/lib/supermarket2/defaults';
import type { Product } from '@/lib/supermarket2/types';

function DealOfDay() {
  const postIndicesSection1 = [1, 5, 6, 4, 7];
  const postsSection1 = postIndicesSection1.map(i => PRODUCTS[i]).filter(Boolean);

  return (
    <>
      <div className="rts-deal-ofthe-day rts-section-gap">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="titlw-area-between-best-seller-anim">
                <h2 className="title">Deals Of The Day</h2>
              </div>
            </div>
          </div>
          <div className="row g-4 mt--10">
            {postsSection1.map((post: Product, index: number) => (
              <div key={index} className="col-lg-20 col-md-4 col-sm-6 col-12">
                <div className="single-shopping-card-one deals-of-day">
                  <DealOfDayMain Slug={post.slug} ProductImage={post.image} ProductTitle={post.title} Price={post.price} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default DealOfDay;
