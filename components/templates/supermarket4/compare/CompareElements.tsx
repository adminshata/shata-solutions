'use client';
import React from 'react';
import { useCompare } from '@/lib/supermarket4/context';
import Link from 'next/link';

const BP = "/templates/supermarket-4/preview";

const CompareElements = () => {
  const { compareItems, removeFromCompare } = useCompare();

  return (
    <div className="rts-compare-area rts-section-gap bg_light-1">
      <div className="container">
        {compareItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p>No items to compare. <Link href={`${BP}/shop`}>Browse products</Link></p>
          </div>
        ) : (
          <div className="compare-main-wrapper">
            <div className="compare-main-wrapper-body">
              <div className="single-compare-elements name">Preview</div>
              {compareItems.map((item, i) => (
                <div key={i} className="single-compare-elements">
                  <div className="thumbnail-preview"><img src={item.image} alt={item.name} /></div>
                  <button onClick={() => removeFromCompare(item.name)} style={{ marginTop: 8, fontSize: 12, cursor: 'pointer', background: 'none', border: '1px solid #ccc', padding: '4px 8px', borderRadius: 4 }}>Remove</button>
                </div>
              ))}
            </div>
            <div className="compare-main-wrapper-body productname spacifiq">
              <div className="single-compare-elements name">Name</div>
              {compareItems.map((item, i) => <div key={i} className="single-compare-elements"><p>{item.name}</p></div>)}
            </div>
            <div className="compare-main-wrapper-body productname">
              <div className="single-compare-elements name">Price</div>
              {compareItems.map((item, i) => <div key={i} className="single-compare-elements price"><p>${item.price}</p></div>)}
            </div>
            <div className="compare-main-wrapper-body productname">
              <div className="single-compare-elements name">Description</div>
              {compareItems.map((item, i) => <div key={i} className="single-compare-elements discription"><p>{item.description}</p></div>)}
            </div>
            <div className="compare-main-wrapper-body productname">
              <div className="single-compare-elements name">Rating</div>
              {compareItems.map((item, i) => (
                <div key={i} className="single-compare-elements">
                  <div className="rating">
                    {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star" />)}
                    <span>({item.ratingCount})</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="compare-main-wrapper-body productname">
              <div className="single-compare-elements name">Stock status</div>
              {compareItems.map((item, i) => (
                <div key={i} className="single-compare-elements">
                  {item.inStock ? <div className="instocks"><span>In Stock</span></div> : <div className="outstocks"><span className="out-stock">Out Of Stock</span></div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CompareElements;
