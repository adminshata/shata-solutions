"use client";
import { useState } from 'react';
import WeeklyBestSellingTwoMain from '@/components/templates/supermarket5/product-main/WeeklyBestSellingTwoMain';
import { PRODUCTS } from '@/lib/supermarket5/defaults';
import type { Product } from '@/lib/supermarket5/types';

function WeeklyBestSellingTwo() {
  const postIndicesSection1 = [17,18,19,20,21,22];
  const postsSection1 = postIndicesSection1.map(i => PRODUCTS[i]).filter(Boolean);

  return (
    <div>
      <div className="weekly-best-seller-area rts-section-gap bg_light-1">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="titlw-area-between-best-seller-anim">
                <h2 className="title">Weekly Best Seller Grocery</h2>
              </div>
            </div>
          </div>
          <div className="row g-4 mt--10">
            {postsSection1.map((post: Product, index: number) => (
              <div key={index} className="col-xl-2 col-md-3 col-md-4 col-sm-6 col-12">
                <div className="weekly-best-seller-item-single">
                  <WeeklyBestSellingTwoMain Slug={post.slug} ProductImage={post.image} ProductTitle={post.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeeklyBestSellingTwo;
