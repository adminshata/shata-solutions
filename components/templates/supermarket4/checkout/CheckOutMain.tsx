'use client';
import React, { useState } from 'react';
import { useCart } from '@/lib/supermarket4/context';
import Link from 'next/link';

const BP = "/templates/supermarket-4/preview";

export default function CheckOutMain() {
  const { cartItems } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const [billingInfo, setBillingInfo] = useState({ email:'', firstName:'', lastName:'', company:'', country:'', street:'', city:'', state:'', zip:'', phone:'', orderNotes:'' });

  const handleCouponApply = () => {
    if (coupon === '12345') { setDiscount(0.25); setCouponMessage('Coupon applied -25% Discount'); }
    else { setDiscount(0); setCouponMessage('Coupon code is incorrect'); }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shippingCost = discount > 0 ? 0 : 50;
  const total = subtotal - discountAmount + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="checkout-area rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 pr--40 order-2 order-xl-1">
            <div className="coupon-input-area-1">
              <div className="coupon-area">
                <div className="coupon-ask cupon-wrapper-1" onClick={() => setShowCoupon(p => !p)}>
                  <button className="coupon-click">Have a coupon? Click here to enter your code</button>
                </div>
                <div className={`coupon-input-area cupon1 ${showCoupon ? 'show' : ''}`}>
                  <div className="inner">
                    <p>If you have a coupon code, please apply it below.</p>
                    <div className="form-area">
                      <input type="text" placeholder="Enter Coupon Code..." value={coupon} onChange={e => { setCoupon(e.target.value); setCouponMessage(''); }} />
                      <button type="button" className="btn-primary rts-btn" onClick={handleCouponApply}>Apply Coupon</button>
                    </div>
                    {couponMessage && <p style={{ color: coupon === '12345' ? 'green' : 'red', marginTop: '8px' }}>{couponMessage}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="rts-billing-details-area">
              <h3 className="title">Billing Details</h3>
              <form>
                {[{id:'email',label:'Email Address*'},{id:'firstName',label:'First Name*'},{id:'lastName',label:'Last Name*'},{id:'company',label:'Company Name (Optional)*'},{id:'country',label:'Country / Region*'},{id:'street',label:'Street Address*'},{id:'city',label:'Town / City*'},{id:'state',label:'State*'},{id:'zip',label:'Zip Code*'},{id:'phone',label:'Phone*'}].map(({id,label}) => (
                  <div className="single-input" key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input id={id} value={(billingInfo as Record<string,string>)[id]} onChange={handleInputChange} required />
                  </div>
                ))}
                <div className="single-input">
                  <label htmlFor="orderNotes">Order Notes*</label>
                  <textarea id="orderNotes" value={billingInfo.orderNotes} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="rts-btn btn-primary">Update Cart</button>
              </form>
            </div>
          </div>
          <div className="col-lg-4 order-1 order-xl-2">
            <h3 className="title-checkout">Your Order</h3>
            <div className="right-card-sidebar-checkout">
              <div className="top-wrapper"><div className="product">Products</div><div className="price">Price</div></div>
              {cartItems.length === 0 ? <p>Your cart is empty.</p> : cartItems.map(item => (
                <div className="single-shop-list" key={item.id}>
                  <div className="left-area"><img src={item.image} alt={item.title} /><span className="title">{item.title} × {item.quantity}</span></div>
                  <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="single-shop-list"><div className="left-area"><span>Subtotal</span></div><span className="price">${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="single-shop-list"><div className="left-area"><span>Discount (25%)</span></div><span className="price">-${discountAmount.toFixed(2)}</span></div>}
              <div className="single-shop-list"><div className="left-area"><span>Shipping</span></div><span className="price">${shippingCost.toFixed(2)}</span></div>
              <div className="single-shop-list"><div className="left-area"><span style={{ fontWeight: 600 }}>Total Price:</span></div><span className="price" style={{ color: 'var(--color-primary)' }}>${total.toFixed(2)}</span></div>
              <div className="cottom-cart-right-area">
                <ul>
                  <li><input type="radio" id="bank" name="payment" /><label htmlFor="bank">Direct Bank Transfer</label></li>
                  <li><input type="radio" id="check" name="payment" /><label htmlFor="check">Check Payments</label></li>
                  <li><input type="radio" id="cod" name="payment" /><label htmlFor="cod">Cash On Delivery</label></li>
                  <li><input type="radio" id="paypal" name="payment" /><label htmlFor="paypal">Paypal</label></li>
                </ul>
              </div>
              <Link href={`${BP}/order-successful`} className="rts-btn btn-primary w-100 text-center mt--20">Place Order</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
