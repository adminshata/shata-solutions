"use client";
import React from 'react';
import DealOfDayMain from '@/components/templates/supermarket4/product-main/DealOfDayMain';
import { PRODUCTS } from '@/lib/supermarket4/defaults';
import type { Product } from '@/lib/supermarket4/types';

const BP = "/templates/supermarket-4/preview";

function FeaturesGrid() {
  const sections = [
    { title: "Recently Added", indices: [1, 5] },
    { title: "Top Selling", indices: [5, 6] },
    { title: "Top Rated", indices: [8, 7] },
    { title: "Deals of the day", indices: [3, 2] },
  ];

  return (
    <div className="new-offer-section-area rts-section-gap bg_light-1">
      <div className="container-2">
        <div className="row g-24">
          {sections.map((section, si) => (
            <div key={si} className="col-lg-6">
              <div className="single-new-offer-area">
                <div className="row g-40">
                  <div className="col-lg-12">
                    <div className="new-offer-wized-title-between">
                      <h4 className="title">{section.title}</h4>
                      <a href={`${BP}/shop`} className="rts-btn btn-primary">See More</a>
                    </div>
                  </div>
                  {section.indices.map(i => PRODUCTS[i]).filter(Boolean).map((post: Product, index: number) => (
                    <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="single-shopping-card-one deals-of-day new-deal-offer-border-right">
                        <DealOfDayMain Slug={post.slug} ProductImage={post.image} ProductTitle={post.title} Price={post.price} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FeaturesGrid;
