"use client";
import React from 'react';
import Link from 'next/link';

const BP = "/templates/supermarket-3/preview";

function NavItem() {
  return (
    <div>
      <nav>
        <ul className="parent-nav">
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Home</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={BP}>BlueMart Home</Link></li>
            </ul>
          </li>
          <li className="parent"><Link href={`${BP}/about`}>About</Link></li>
          <li className="parent with-megamenu">
            <Link href="#">Shop</Link>
            <div className="rts-megamenu">
              <div className="wrapper">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div className="megamenu-item-wrapper">
                      <div className="single-megamenu-wrapper">
                        <p className="title">Shop Layout</p>
                        <ul>
                          <li><Link href={`${BP}/shop`}>Shop Grid Sidebar</Link></li>
                          <li><Link href={`${BP}/shop/list`}>Shop List Sidebar</Link></li>
                          <li><Link href={`${BP}/shop/grid-top-filter`}>Shop Top Filter Grid</Link></li>
                          <li><Link href={`${BP}/shop/list-top-filter`}>Shop Top Filter List</Link></li>
                          <li><Link href={`${BP}/shop`}>Shop Wide</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Shop Details</p>
                        <ul>
                          <li><Link href={`${BP}/shop/super-fresh-meat`}>Product Details</Link></li>
                          <li><Link href={`${BP}/shop/original-fresh-frut`}>Product Variable</Link></li>
                          <li><Link href={`${BP}/shop/organic-fresh-frut`}>Product Grouped</Link></li>
                          <li><Link href={`${BP}/shop/lite-fresh-frut`}>Product Affiliate</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Product Feature</p>
                        <ul>
                          <li><Link className="sub-b" href={`${BP}/compare`}>Shop Compare</Link></li>
                          <li><Link className="sub-b" href={`${BP}/wishlist`}>Shop Wishlist</Link></li>
                          <li><Link className="sub-b" href={`${BP}/cart`}>Cart Sidebar</Link></li>
                          <li><Link className="sub-b" href={`${BP}/checkout`}>Checkout</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Shop Others</p>
                        <ul>
                          <li><Link className="sub-b" href={`${BP}/cart`}>Cart</Link></li>
                          <li><Link className="sub-b" href={`${BP}/checkout`}>Checkout</Link></li>
                          <li><Link className="sub-b" href={`${BP}/order-successful`}>Order Successful</Link></li>
                          <li><Link className="sub-b" href={`${BP}/track-order`}>Track Order</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <Link href={`${BP}/shop`} className="feature-add-megamenu-area">
                      <img src="/templates/supermarket3/feature/05.jpg" alt="feature_product" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Vendors</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BP}/vendors/list`}>Vendor List</Link></li>
              <li><Link className="sub-b" href={`${BP}/vendors`}>Vendor Grid</Link></li>
              <li><Link className="sub-b" href={`${BP}/vendors/fresh-juice-bar`}>Vendor Details</Link></li>
            </ul>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Pages</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BP}/dashboard`}>Dashboard <span className="badge">( New )</span></Link></li>
              <li><Link className="sub-b" href={`${BP}/about`}>About</Link></li>
              <li><Link className="sub-b" href={`${BP}/store`}>Store</Link></li>
              <li><Link className="sub-b" href={`${BP}/invoice`}>Invoice</Link></li>
              <li><Link className="sub-b" href={`${BP}/contact`}>Contact</Link></li>
              <li><Link className="sub-b" href={`${BP}/register`}>Register</Link></li>
              <li><Link className="sub-b" href={`${BP}/login`}>Login</Link></li>
              <li><Link className="sub-b" href={`${BP}/privacy-policy`}>Privacy Policy</Link></li>
              <li><Link className="sub-b" href={`${BP}/cookies-policy`}>Cookies Policy</Link></li>
              <li><Link className="sub-b" href={`${BP}/terms-condition`}>Terms &amp; Condition</Link></li>
            </ul>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Blog</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BP}/blog`}>Blog</Link></li>
            </ul>
          </li>
          <li className="parents">
            <Link href={`${BP}/dashboard`}>Dashboard<span className="badge">New</span></Link>
          </li>
          <li className="parent"><Link href={`${BP}/contact`}>Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
}
export default NavItem;
