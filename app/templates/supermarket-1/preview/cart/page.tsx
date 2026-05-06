"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";
import { useCart } from "@/lib/supermarket1/context";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function CartPage() {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = item.price;
      const quantity = item.quantity || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon === "12345") {
      setDiscount(0.25);
      setCouponMessage("Coupon applied -25% successfully");
      localStorage.setItem("coupon", coupon);
      localStorage.setItem("discount", "0.25");
    } else {
      setDiscount(0);
      setCouponMessage("Coupon code is incorrect");
      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
    }
  };

  const clearCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sm1_cart");
      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
    }
    setCoupon("");
    setDiscount(0);
    setCouponMessage("");
    cartItems.forEach((item) => removeFromCart(item.id));
  };

  const finalTotal = subtotal - subtotal * discount;

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
                <a className="current" href="#">Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>

      <div className="rts-cart-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row g-5">
            {/* Cart Items */}
            <div className="col-xl-9 col-12 order-2 order-xl-1">
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
                </div>

                {cartItems.length === 0 && (
                  <div style={{ padding: "40px 0", textAlign: "center" }}>
                    <p>Your cart is empty. <Link href={`${BASE_PATH}/shop`} style={{ color: "#629D23" }}>Continue Shopping</Link></p>
                  </div>
                )}

                {cartItems.map((item) => (
                  <div className="single-cart-area-list main item-parent" key={item.id}>
                    <div className="product-main-cart">
                      <div className="close section-activation" onClick={() => removeFromCart(item.id)}>
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
                  </div>
                ))}

                {/* Coupon + Clear */}
                <div className="bottom-cupon-code-cart-area">
                  <form onSubmit={applyCoupon}>
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        setCouponMessage("");
                      }}
                    />
                    <button type="submit" className="rts-btn btn-primary">Apply Coupon</button>
                    {couponMessage && (
                      <p style={{ color: coupon === "12345" ? "green" : "red", marginTop: "8px" }}>{couponMessage}</p>
                    )}
                  </form>
                  <button onClick={clearCart} className="rts-btn btn-primary mr--50">Clear All</button>
                </div>
              </div>
            </div>

            {/* Summary Area */}
            <div className="col-xl-3 col-12 order-1 order-xl-2">
              <div className="cart-total-area-start-right">
                <h5 className="title">Cart Totals</h5>
                <div className="subtotal">
                  <span>Subtotal</span>
                  <h6 className="price">${subtotal.toFixed(2)}</h6>
                </div>
                <div className="shipping">
                  <span>Shipping</span>
                  <ul>
                    <li><input type="radio" id="f-option" name="selector" defaultChecked /><label htmlFor="f-option">Free Shipping</label></li>
                    <li><input type="radio" id="s-option" name="selector" /><label htmlFor="s-option">Flat Rate</label></li>
                    <li><input type="radio" id="t-option" name="selector" /><label htmlFor="t-option">Local Pickup</label></li>
                    <li><p>Shipping options will be updated during checkout</p><p className="bold">Calculate Shipping</p></li>
                  </ul>
                </div>
                <div className="bottom">
                  <div className="wrapper">
                    <span>Total</span>
                    <h6 className="price">${finalTotal.toFixed(2)}</h6>
                  </div>
                  <div className="button-area">
                    <Link href={`${BASE_PATH}/checkout`} className="rts-btn btn-primary">Proceed To Checkout</Link>
                  </div>
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
