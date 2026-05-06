'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const BP = "/templates/supermarket-2/preview";

const MobileMenu = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openThirdLevelKey, setOpenThirdLevelKey] = useState<string | null>(null);
  const toggleMenu = (index: number) => setOpenMenuIndex(prev => prev === index ? null : index);
  const toggleThirdMenu = (key: string) => setOpenThirdLevelKey(prev => prev === key ? null : key);

  return (
    <nav className="nav-main mainmenu-nav mt--30">
      <ul className="mainmenu metismenu" id="mobile-menu-active">
        <li className={`has-droupdown ${openMenuIndex === 0 ? 'mm-active' : ''}`}>
          <a href="#" className="main" onClick={() => toggleMenu(0)}>Home</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 0 ? 'mm-show' : ''}`}>
            <li><Link className="mobile-menu-link" href={BP}>QuickMart Home</Link></li>
          </ul>
        </li>
        <li><Link className="main" href={`${BP}/about`}>About</Link></li>
        <li className={`has-droupdown ${openMenuIndex === 1 ? 'mm-active' : ''}`}>
          <a href="#" className="main" onClick={() => toggleMenu(1)}>Pages</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 1 ? 'mm-show' : ''}`}>
            <li><Link className="mobile-menu-link" href={`${BP}/about`}>About</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/invoice`}>Invoice</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/contact`}>Contact</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/register`}>Register</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/login`}>Login</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/privacy-policy`}>Privacy Policy</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/cookies-policy`}>Cookies Policy</Link></li>
            <li><Link className="mobile-menu-link" href={`${BP}/terms-condition`}>Terms Condition</Link></li>
          </ul>
        </li>
        <li className={`has-droupdown ${openMenuIndex === 2 ? 'mm-active' : ''}`}>
          <a href="#" className="main" onClick={() => toggleMenu(2)}>Shop</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 2 ? 'mm-show' : ''}`}>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu('shopLayout')}>Shop Layout</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === 'shopLayout' ? 'mm-show' : ''}`}>
                <li><Link href={`${BP}/shop`}>Shop Grid Sidebar</Link></li>
                <li><Link href={`${BP}/shop/list`}>Shop List Sidebar</Link></li>
                <li><Link href={`${BP}/shop/grid-top-filter`}>Shop Top Filter Grid</Link></li>
              </ul>
            </li>
            <li className="has-droupdown third-lvl">
              <a href="#" className="main" onClick={() => toggleThirdMenu('shopOthers')}>Shop Others</a>
              <ul className={`submenu-third-lvl mm-collapse ${openThirdLevelKey === 'shopOthers' ? 'mm-show' : ''}`}>
                <li><Link href={`${BP}/cart`}>Cart</Link></li>
                <li><Link href={`${BP}/checkout`}>Checkout</Link></li>
                <li><Link href={`${BP}/track-order`}>Track Order</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={`has-droupdown ${openMenuIndex === 3 ? 'mm-active' : ''}`}>
          <a href="#" className="main" onClick={() => toggleMenu(3)}>Blog</a>
          <ul className={`submenu mm-collapse ${openMenuIndex === 3 ? 'mm-show' : ''}`}>
            <li><Link className="mobile-menu-link" href={`${BP}/blog`}>Blog</Link></li>
          </ul>
        </li>
        <li><Link className="main" href={`${BP}/contact`}>Contact Us</Link></li>
      </ul>
    </nav>
  );
};
export default MobileMenu;
