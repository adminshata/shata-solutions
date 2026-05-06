'use client';
import React from 'react';
import { useWishlist } from '@/lib/supermarket2/context';
import Link from 'next/link';

const BP = "/templates/supermarket-2/preview";

const WishlistMain = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const total = wishlistItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="rts-cart-area rts-section-gap bg_light-1">
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-9 col-12 order-2 order-xl-1">
            <div className="rts-cart-list-area">
              <div className="single-cart-area-list head">
                <div className="product-main"><p>Products</p></div>
                <div className="price"><p>Price</p></div>
                <div className="quantity"><p>Quantity</p></div>
                <div className="subtotal"><p>SubTotal</p></div>
              </div>
              {wishlistItems.length === 0 && (
                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                  <p>Your wishlist is empty. <Link href={`${BP}/shop`}>Continue shopping</Link></p>
                </div>
              )}
              {wishlistItems.map(item => (
                <div className="single-cart-area-list main item-parent" key={item.id}>
                  <div className="product-main-cart">
                    <div className="close section-activation" onClick={() => removeFromWishlist(item.id)}><i className="fa-regular fa-x" /></div>
                    <div className="thumbnail"><img src={item.image} alt="shop" /></div>
                    <div className="information"><h6 className="title">{item.title}</h6><span>SKU:SKUZNFER</span></div>
                  </div>
                  <div className="price"><p>${item.price.toFixed(2)}</p></div>
                  <div className="quantity"><p>{item.quantity}</p></div>
                  <div className="subtotal"><p>${(item.price * item.quantity).toFixed(2)}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xl-3 col-12 order-1 order-xl-2">
            <div className="cart-total-area-start-right">
              <h5 className="title">Wishlist Totals</h5>
              <div className="subtotal"><span>Subtotal</span><h6 className="price">${total.toFixed(2)}</h6></div>
              <div className="bottom">
                <div className="button-area">
                  <Link href={`${BP}/cart`} className="rts-btn btn-primary">View Cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WishlistMain;
