"use client";

import React, { useState } from "react";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";

const MobileMenu = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openThirdLevelKey, setOpenThirdLevelKey] = useState<string | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex((prev) => (prev === index ? null : index));
  };

  const toggleThirdMenu = (key: string) => {
    setOpenThirdLevelKey((prev) => (prev === key ? null : key));
  };

  return (
    <nav className="nav-main mainmenu-nav mt--30">
      <ul className="mainmenu metismenu" id="mobile-menu-active">
        <li className={`has-droupdown ${openMenuIndex === 0 ? "mm-active" : ""}`}>
          <a href="#" className="main" onClick={() => toggleMenu(0)}>Home</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 0 ? "mm-show" : ""}`}>
            <li><Link className="mobile-menu-link" href={BASE_PATH}>Home One</Link></li>
          </ul>
        </li>
        <li><Link className="main" href={`${BASE_PATH}/about`}>About</Link></li>
        <li className={`has-droupdown ${openMenuIndex === 2 ? "mm-active" : ""}`}>
          <a href="#" className="main" onClick={() => toggleMenu(2)}>Shop</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 2 ? "mm-show" : ""}`}>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu("shopLayout")}>Shop Layout</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === "shopLayout" ? "mm-show" : ""}`}>
                <li><Link href={`${BASE_PATH}/shop`}>Shop Grid Sidebar</Link></li>
                <li><Link href={`${BASE_PATH}/shop/list-sidebar`}>Shop list Sidebar</Link></li>
                <li><Link href={`${BASE_PATH}/shop/grid-top-filter`}>Shop Top Filter Grid</Link></li>
                <li><Link href={`${BASE_PATH}/shop/list-top-filter`}>Shop Top Filter List</Link></li>
              </ul>
            </li>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu("shopDetails")}>Shop Details</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === "shopDetails" ? "mm-show" : ""}`}>
                <li><Link href={`${BASE_PATH}/shop/firebase-business-makes-your-profit`}>Shop Details</Link></li>
                <li><Link href={`${BASE_PATH}/shop/firebase-business-makes-your-profit`}>Shop Details V2</Link></li>
                <li><Link href={`${BASE_PATH}/shop/firebase-business-makes-your-profit`}>Shop Details V3</Link></li>
                <li><Link href={`${BASE_PATH}/shop/firebase-business-makes-your-profit`}>Shop Details V4</Link></li>
              </ul>
            </li>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu("productFeature")}>Product Feature</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === "productFeature" ? "mm-show" : ""}`}>
                <li><Link href={`${BASE_PATH}/shop/firebase-business-makes-your-profit`}>Variable product</Link></li>
                <li><Link href={`${BASE_PATH}/shop/firebase-business-makes-your-profit`}>Affiliate product</Link></li>
                <li><Link href={`${BASE_PATH}/compare`}>Shop Compare</Link></li>
              </ul>
            </li>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu("shopOthers")}>Shop Others</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === "shopOthers" ? "mm-show" : ""}`}>
                <li><Link href={`${BASE_PATH}/cart`}>Cart</Link></li>
                <li><Link href={`${BASE_PATH}/checkout`}>Checkout</Link></li>
                <li><Link href={`${BASE_PATH}/trackorder`}>Track Order</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={`has-droupdown ${openMenuIndex === 4 ? "mm-active" : ""}`}>
          <a href="#" className="main" onClick={() => toggleMenu(4)}>Vendors</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 4 ? "mm-show" : ""}`}>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/vendors/list`}>Vendor List</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/vendors`}>Vendor Grid</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/vendors/fresh-juice-bar`}>Vendor Details</Link></li>
          </ul>
        </li>
        <li className={`has-droupdown ${openMenuIndex === 5 ? "mm-active" : ""}`}>
          <a href="#" className="main" onClick={() => toggleMenu(5)}>Pages</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 5 ? "mm-show" : ""}`}>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/dashboard`}>Dashboard</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/about`}>About</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/store`}>Store</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/invoice`}>Invoice</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/contact`}>Contact</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/register`}>Register</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/login`}>Login</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/privacy-policy`}>Privacy Policy</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/cookies-policy`}>Cookies Policy</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/terms-condition`}>Terms &amp; Condition</Link></li>
          </ul>
        </li>
        <li className={`has-droupdown ${openMenuIndex === 3 ? "mm-active" : ""}`}>
          <a href="#" className="main" onClick={() => toggleMenu(3)}>Blog</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 3 ? "mm-show" : ""}`}>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/blog`}>Blog</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/blog`}>Blog List Left Sidebar</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/blog`}>Blog List Right Sidebar</Link></li>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/blog/details-profitable-business-makes-your-profit`}>Blog Details</Link></li>
          </ul>
        </li>
        <li><Link className="main" href={`${BASE_PATH}/dashboard`}>Dashboard</Link></li>
        <li><Link className="main" href={`${BASE_PATH}/contact`}>Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
