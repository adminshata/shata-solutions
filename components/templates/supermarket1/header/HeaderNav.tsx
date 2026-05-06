"use client";

import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";

function HeaderNav() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    const sidebar = document.querySelector(".side-bar.header-two");
    if (sidebar) sidebar.classList.toggle("show");
  };

  const handleSearchOpen = () => {
    const sidebar = document.querySelector(".search-input-area");
    if (sidebar) sidebar.classList.toggle("show");
  };

  return (
    <div>
      <div className={`rts-header-nav-area-one header--sticky ${isSticky ? "sticky" : ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="nav-and-btn-wrapper">
                <div className="nav-area">
                  <Nav />
                </div>
                <div className="right-btn-area">
                  <a href="#" className="btn-narrow">Trending Products</a>
                  <button className="rts-btn btn-primary">
                    Get 30% Discount Now
                    <span>Sale</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="logo-search-category-wrapper after-md-device-header">
                <Link href={BASE_PATH} className="logo-area">
                  <span className="logo-text" style={{ fontWeight: 800, fontSize: "22px", color: "#629D23" }}>FreshMart</span>
                </Link>
                <div className="category-search-wrapper">
                  <div className="category-btn category-hover-header">
                    <img className="parent" src="/templates/supermarket1/icons/bar-1.svg" alt="icons" />
                    <span>Categories</span>
                    <ul className="category-sub-menu">
                      <li><a href="#" className="menu-item"><img src="/templates/supermarket1/icons/01.svg" alt="icons" /><span>Breakfast &amp; Dairy</span></a></li>
                      <li><a href="#" className="menu-item"><img src="/templates/supermarket1/icons/02.svg" alt="icons" /><span>Meats &amp; Seafood</span></a></li>
                      <li><a href="#" className="menu-item"><img src="/templates/supermarket1/icons/03.svg" alt="icons" /><span>Breads &amp; Bakery</span></a></li>
                      <li><a href="#" className="menu-item"><img src="/templates/supermarket1/icons/04.svg" alt="icons" /><span>Chips &amp; Snacks</span></a></li>
                      <li><a href="#" className="menu-item"><img src="/templates/supermarket1/icons/05.svg" alt="icons" /><span>Medical Healthcare</span></a></li>
                    </ul>
                  </div>
                  <form action="#" className="search-header">
                    <input type="text" placeholder="Search for products, categories or brands" required />
                    <button className="rts-btn btn-primary radious-sm with-icon">
                      <span className="btn-text">Search</span>
                      <span className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></span>
                      <span className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></span>
                    </button>
                  </form>
                </div>
                <div className="main-wrapper-action-2 d-flex">
                  <div className="accont-wishlist-cart-area-header">
                    <Link href={`${BASE_PATH}/account`} className="btn-border-only account">
                      <i className="fa-light fa-user" /> Account
                    </Link>
                    <Link href={`${BASE_PATH}/wishlist`} className="btn-border-only wishlist">
                      <i className="fa-regular fa-heart" /> Wishlist
                    </Link>
                  </div>
                  <div className="actions-area">
                    <div className="search-btn" id="search" onClick={handleSearchOpen}>
                      <svg width={17} height={16} viewBox="0 0 17 16" fill="none">
                        <path d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z" fill="#1F1F25" />
                      </svg>
                    </div>
                    <div className="menu-btn" onClick={handleMenuClick}>
                      <svg width={20} height={16} viewBox="0 0 20 16" fill="none">
                        <rect y={14} width={20} height={2} fill="#1F1F25" />
                        <rect y={7} width={20} height={2} fill="#1F1F25" />
                        <rect width={20} height={2} fill="#1F1F25" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
