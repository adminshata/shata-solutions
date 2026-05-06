"use client";

import React from "react";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";

function NavItem() {
  const productHref = `${BASE_PATH}/shop/firebase-business-makes-your-profit`;

  return (
    <div>
      <nav>
        <ul className="parent-nav">
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Home</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={BASE_PATH}>Home One</Link></li>
            </ul>
          </li>
          <li className="parent">
            <Link href={`${BASE_PATH}/about`}>About</Link>
          </li>
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
                          <li><Link href={`${BASE_PATH}/shop`}>Shop Grid Sidebar</Link></li>
                          <li><Link href={`${BASE_PATH}/shop/list-sidebar`}>Shop list Sidebar</Link></li>
                          <li><Link href={`${BASE_PATH}/shop/grid-top-filter`}>Shop Top Filter Grid</Link></li>
                          <li><Link href={`${BASE_PATH}/shop/list-top-filter`}>Shop Top Filter List</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Shop Details</p>
                        <ul>
                          <li><Link className="sub-b" href={productHref}>Shop Details</Link></li>
                          <li><Link className="sub-b" href={productHref}>Shop Details V2</Link></li>
                          <li><Link className="sub-b" href={productHref}>Shop Details V3</Link></li>
                          <li><Link className="sub-b" href={productHref}>Shop Details V4</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Product Feature</p>
                        <ul>
                          <li><Link className="sub-b" href={productHref}>Variable product</Link></li>
                          <li><Link className="sub-b" href={productHref}>Affiliate product</Link></li>
                          <li><Link className="sub-b" href={`${BASE_PATH}/compare`}>Shop Compare</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Shop Others</p>
                        <ul>
                          <li><Link className="sub-b" href={`${BASE_PATH}/cart`}>Cart</Link></li>
                          <li><Link className="sub-b" href={`${BASE_PATH}/checkout`}>Checkout</Link></li>
                          <li><Link className="sub-b" href={`${BASE_PATH}/trackorder`}>Track Order</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <Link href={`${BASE_PATH}/shop`} className="feature-add-megamenu-area">
                      <img src="/templates/supermarket1/images/feature/05.jpg" alt="feature_product" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Vendors</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BASE_PATH}/vendors/list`}>Vendor List</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/vendors`}>Vendor Grid</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/vendors/fresh-juice-bar`}>Vendor Details</Link></li>
            </ul>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Pages</Link>
            <ul className="submenu">
              <li>
                <Link className="sub-b" href={`${BASE_PATH}/dashboard`}>
                  Dashboard
                  <span className="badge">( New )</span>
                </Link>
              </li>
              <li><Link className="sub-b" href={`${BASE_PATH}/about`}>About</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/store`}>Store</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/invoice`}>Invoice</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/contact`}>Contact</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/register`}>Register</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/login`}>Login</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/privacy-policy`}>Privacy Policy</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/cookies-policy`}>Cookies Policy</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/terms-condition`}>Terms &amp; Condition</Link></li>
            </ul>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Blog</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BASE_PATH}/blog`}>Blog</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/blog`}>Blog List Left Sidebar</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/blog`}>Blog List Right Sidebar</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/blog/details-profitable-business-makes-your-profit`}>Blog Details</Link></li>
            </ul>
          </li>
          <li className="parents">
            <Link target="_blank" href={`${BASE_PATH}/dashboard`}>
              Dashboard
              <span className="badge">New</span>
            </Link>
          </li>
          <li className="parent">
            <Link href={`${BASE_PATH}/contact`}>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavItem;
