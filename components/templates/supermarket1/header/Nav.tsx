"use client";

import React from "react";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";

function NavItem() {
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
                          <li><Link href={`${BASE_PATH}/shop`}>Shop Grid</Link></li>
                        </ul>
                      </div>
                      <div className="single-megamenu-wrapper">
                        <p className="title">Shop Others</p>
                        <ul>
                          <li><Link className="sub-b" href={`${BASE_PATH}/cart`}>Cart</Link></li>
                          <li><Link className="sub-b" href={`${BASE_PATH}/checkout`}>Checkout</Link></li>
                          <li><Link className="sub-b" href={`${BASE_PATH}/compare`}>Compare</Link></li>
                          <li><Link className="sub-b" href={`${BASE_PATH}/wishlist`}>Wishlist</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <Link href={`${BASE_PATH}/shop`} className="feature-add-megamenu-area">
                      <img src="/templates/supermarket1/feature/05.jpg" alt="feature_product" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Pages</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BASE_PATH}/about`}>About</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/contact`}>Contact</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/login`}>Login</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/register`}>Register</Link></li>
              <li><Link className="sub-b" href={`${BASE_PATH}/account`}>Account</Link></li>
            </ul>
          </li>
          <li className="parent has-dropdown">
            <Link className="nav-link" href="#">Blog</Link>
            <ul className="submenu">
              <li><Link className="sub-b" href={`${BASE_PATH}/blog`}>Blog</Link></li>
            </ul>
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
