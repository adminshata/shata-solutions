"use client";
import React, { useState } from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";
import { useCompare, useCart } from "@/lib/supermarket1/context";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function ComparePage() {
  const { compareItems, removeFromCompare } = useCompare();
  const { addToCart } = useCart();
  const [addedName, setAddedName] = useState<string | null>(null);

  const handleAdd = (item: { image: string; name: string; price: string }) => {
    addToCart({
      id: Date.now(),
      image: item.image,
      title: item.name ?? "Default Product Title",
      price: parseFloat(item.price ?? "0"),
      quantity: 1,
      active: true,
    });
    setAddedName(item.name);
    setTimeout(() => setAddedName(null), 2000);
  };

  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">Compare</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="rts-section-gap bg_light-1">
        <div className="container">
          {compareItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p>No products to compare. <Link href={`${BASE_PATH}/shop`} style={{ color: "#629D23" }}>Browse products</Link></p>
            </div>
          ) : (
            <div className="modal-body">
              <div className="compare-main-wrapper-body">
                <div className="single-compare-elements name">Preview</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements" key={index}>
                    <div className="thumbnail-preview">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname spacifiq">
                <div className="single-compare-elements name">Name</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements" key={index}>
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname">
                <div className="single-compare-elements name">Price</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements price" key={index}>
                    <p>{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname">
                <div className="single-compare-elements name">Description</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements discription" key={index}>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname">
                <div className="single-compare-elements name">Rating</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements" key={index}>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <i key={i} className={`fa-solid fa-star${i < item.rating ? "" : " text-muted"}`} style={{ color: i < item.rating ? "#f8b400" : "#ccc" }} />
                      ))}
                      <span>({item.ratingCount})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname">
                <div className="single-compare-elements name">Weight</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements" key={index}>
                    <p>{item.weight}</p>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname">
                <div className="single-compare-elements name">Stock status</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements" key={index}>
                    <div className={item.inStock ? "instocks" : "outstocks"}>
                      <span className={item.inStock ? "" : "out-stock"}>
                        {item.inStock ? "In Stock" : "Out Of Stock"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="compare-main-wrapper-body productname">
                <div className="single-compare-elements name">Buy Now</div>
                {compareItems.map((item, index) => (
                  <div className="single-compare-elements" key={index}>
                    <div className="cart-counter-action">
                      <a
                        href="#"
                        className="rts-btn btn-primary radious-sm with-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAdd(item);
                        }}
                      >
                        <div className="btn-text">{addedName === item.name ? "Added!" : "Add To Cart"}</div>
                        <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                        <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                      </a>
                      <a
                        href="#"
                        className="rts-btn btn-primary radious-sm remove-this"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCompare(item.name);
                        }}
                      >
                        <div className="btn-text"><i className="fa-light fa-trash" /></div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
