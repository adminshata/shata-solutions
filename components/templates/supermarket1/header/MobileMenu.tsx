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
                <li><Link href={`${BASE_PATH}/shop`}>Shop Grid</Link></li>
              </ul>
            </li>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu("shopOthers")}>Shop Others</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === "shopOthers" ? "mm-show" : ""}`}>
                <li><Link href={`${BASE_PATH}/cart`}>Cart</Link></li>
                <li><Link href={`${BASE_PATH}/checkout`}>Checkout</Link></li>
                <li><Link href={`${BASE_PATH}/compare`}>Compare</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={`has-droupdown ${openMenuIndex === 3 ? "mm-active" : ""}`}>
          <a href="#" className="main" onClick={() => toggleMenu(3)}>Blog</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 3 ? "mm-show" : ""}`}>
            <li><Link className="mobile-menu-link" href={`${BASE_PATH}/blog`}>Blog</Link></li>
          </ul>
        </li>
        <li><Link className="main" href={`${BASE_PATH}/contact`}>Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
