"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";
import { useWishlist, useCart } from "@/lib/supermarket1/context";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, updateItemQuantity } = useWishlist();
  const { addToCart } = useCart();

  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = (item: { id: number; image: string; title: string; price: number; quantity: number }) => {
    addToCart({
      id: Date.now(),
      image: item.image,
      title: item.title,
      price: item.price,
      quantity: 1,
      active: true,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const clearWishlist = () => {
    wishlistItems.forEach((item) => removeFromWishlist(item.id));
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
                <a className="current" href="#">Wishlist</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="rts-cart-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-12 col-12">
              <div className="cart-area-main-wrapper">
                <div className="cart-top-area-note">
                  <p>Add <span>$59.69</span> to cart and get free shipping</p>
                  <div className="bottom-content-deals mt--10">
                    <div className="single-progress-area-incard">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rts-cart-list-area">
                <div className="single-cart-area-list head">
                  <div className="product-main"><p>Products</p></div>
                  <div className="price"><p>Price</p></div>
                  <div className="quantity"><p>Quantity</p></div>
                  <div className="subtotal"><p>SubTotal</p></div>
                  <div className="subtotal"><p>Add to Cart</p></div>
                </div>

                {wishlistItems.length === 0 && (
                  <div style={{ padding: "40px 0", textAlign: "center" }}>
                    <p>Your wishlist is empty. <Link href={`${BASE_PATH}/shop`} style={{ color: "#629D23" }}>Browse products</Link></p>
                  </div>
                )}

                {wishlistItems.map((item) => (
                  <div className="single-cart-area-list main item-parent" key={item.id}>
                    <div className="product-main-cart">
                      <div className="close section-activation" onClick={() => removeFromWishlist(item.id)}>
                        <i className="fa-regular fa-x" />
                      </div>
                      <div className="thumbnail">
                        <img src={item.image} alt="shop" />
                      </div>
                      <div className="information">
                        <h6 className="title">{item.title}</h6>
                        <span>SKU: SKUZNFER</span>
                      </div>
                    </div>
                    <div className="price"><p>${item.price.toFixed(2)}</p></div>
                    <div className="quantity">
                      <div className="quantity-edit">
                        <input type="text" className="input" value={item.quantity} readOnly />
                        <div className="button-wrapper-action">
                          <button
                            className="button minus"
                            onClick={() => item.quantity > 1 && updateItemQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="fa-regular fa-chevron-down" />
                          </button>
                          <button
                            className="button plus"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fa-regular fa-chevron-up" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="subtotal"><p>${(item.price * item.quantity).toFixed(2)}</p></div>
                    <div className="button-area">
                      <a
                        href="#"
                        className="rts-btn btn-primary radious-sm with-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(item);
                        }}
                      >
                        <div className="btn-text">{addedId === item.id ? "Added!" : "Add to Cart"}</div>
                        <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                        <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                      </a>
                    </div>
                  </div>
                ))}

                <div className="bottom-cupon-code-cart-area">
                  <button onClick={clearWishlist} className="rts-btn btn-primary mr--50">Clear All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
