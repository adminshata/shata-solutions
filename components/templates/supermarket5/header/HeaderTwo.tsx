"use client";
import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav';
import CategoryMenu from './CategoryMenu';
import Cart from './Cart';
import WishList from './WishList';
import BackToTop from '@/components/templates/supermarket5/common/BackToTop';
import Sidebar from './Sidebar';
import { useCompare } from '@/lib/supermarket5/context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BP = "/templates/supermarket-5/preview";

function HeaderTwo() {
  const { compareItems } = useCompare();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = () => {
    const sidebar = document.querySelector('.side-bar.header-two');
    if (sidebar) sidebar.classList.toggle('show');
  };
  const handleSearchOpen = () => {
    const sidebar = document.querySelector('.search-input-area');
    if (sidebar) sidebar.classList.toggle('show');
  };

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestions = ["Super Fresh Meat", "Original Fresh Fruit", "Organic Fresh Fruit", "Lite Fresh Fruit", "Smart Fresh Fruit", "Profitable business", "Firebase business", "Netlyfy business", "Valuable business", "System business"];

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = allSuggestions.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`${BP}/shop?search=${encodeURIComponent(suggestion)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) { router.push(`${BP}/shop?search=${encodeURIComponent(searchTerm.trim())}`); setShowSuggestions(false); }
    else { router.push(`${BP}/shop`); }
  };

  return (
    <div>
      <>
        <header className="header-style-two bg-primary-header">
          <div className="header-top-area-two">
            <div className="container-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hader-top-between-two">
                    <p>
                      Welcome to our Organic store VividMart! <span style={{ marginLeft: 12 }}>Get 30% Discount Now</span>
                    </p>
                    <ul className="nav-header-top">
                      <li><Link href={`${BP}/about`}>About Us</Link></li>
                      <li><Link href={`${BP}/account`}>My Account</Link></li>
                      <li><Link href={`${BP}/wishlist`}>Wishlist</Link></li>
                      <li><a href="#">English</a></li>
                      <li><a href="#">USD</a></li>
                      <li><Link href={`${BP}/track-order`}>Track Order</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-header-area-main">
            <div className="container-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="logo-search-category-wrapper">
                    <Link href={BP} className="logo-area">
                      <span style={{ fontWeight: 700, fontSize: '24px', color: 'var(--color-primary)' }}>VividMart</span>
                    </Link>
                    <div className="category-search-wrapper">
                      <div className="category-btn category-hover-header">
                        <img className="parent" src="/templates/supermarket5/icons/bar-1.svg" alt="icons" />
                        <span>Categories</span>
                        <CategoryMenu />
                      </div>
                      <form onSubmit={handleSubmit} className="search-header" autoComplete="off" style={{ position: 'relative' }}>
                        <input ref={inputRef} type="text" placeholder="Search for products, categories or brands" required value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)} />
                        <button type="submit" className="rts-btn btn-primary radious-sm with-icon">
                          <div className="btn-text">Search</div>
                          <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                        </button>
                        {showSuggestions && suggestions.length > 0 && (
                          <ul className="autocomplete-suggestions" style={{ position: 'absolute', backgroundColor: '#fff', border: '1px solid #ccc', marginTop: '4px', width: '100%', maxHeight: '200px', overflowY: 'auto', zIndex: 1000, listStyleType: 'none', padding: 0, borderRadius: '4px' }}>
                            {suggestions.map((suggestion, index) => (
                              <li key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ padding: '8px 12px', cursor: 'pointer' }} onMouseDown={e => e.preventDefault()}>{suggestion}</li>
                            ))}
                          </ul>
                        )}
                      </form>
                    </div>
                    <div className="accont-wishlist-cart-area-header">
                      <Link href={`${BP}/account`} className="btn-border-only account">
                        <i className="fa-light fa-user" />Account
                      </Link>
                      <Link href={`${BP}/compare`} className="btn-border-only account compare-number">
                        <i className="fa-regular fa-code-compare"></i>
                        <span className="number">{compareItems.length}</span>
                      </Link>
                      <WishList />
                      <Cart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`rts-header-nav-area-one header--sticky ${isSticky ? 'sticky' : ''}`}>
            <div className="container-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="nav-and-btn-wrapper">
                    <div className="nav-area"><Nav /></div>
                    <div className="right-location-area">
                      <i className="fa-solid fa-location-dot" />
                      <p><Link href={`${BP}/shop`}>Trending Products</Link> <span style={{ padding: "0 10px" }}>|</span> Delivery: <a href="#">258 FKD Street, Berlin</a></p>
                    </div>
                  </div>
                  <div className="logo-search-category-wrapper">
                    <Link href={BP} className="logo-area">
                      <span style={{ fontWeight: 700, fontSize: '20px', color: 'var(--color-primary)' }}>VividMart</span>
                    </Link>
                    <div className="category-search-wrapper">
                      <div className="category-btn category-hover-header">
                        <img className="parent" src="/templates/supermarket5/icons/bar-1.svg" alt="icons" />
                        <span>Categories</span>
                        <ul className="category-sub-menu">
                          {["Breakfast & Dairy","Meats & Seafood","Breads & Bakery","Chips & Snacks","Medical Healthcare","Grocery & Staples","Biscuits & Snacks","Frozen Foods","Other Items"].map((cat, i) => (
                            <li key={i}><a href="#" className="menu-item"><img src={`/templates/supermarket5/icons/0${i+1 > 9 ? 9 : i+1}.svg`} alt="icons" /><span>{cat}</span></a></li>
                          ))}
                        </ul>
                      </div>
                      <form action="#" className="search-header">
                        <input type="text" placeholder="Search for products, categories" required />
                        <a href="#" className="rts-btn btn-primary radious-sm with-icon">
                          <div className="btn-text">Search</div>
                          <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                          <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                        </a>
                      </form>
                    </div>
                    <div className="main-wrapper-action-2 d-flex">
                      <div className="accont-wishlist-cart-area-header">
                        <Link href={`${BP}/account`} className="btn-border-only account"><i className="fa-light fa-user" />Account</Link>
                        <Link href={`${BP}/wishlist`} className="btn-border-only wishlist"><i className="fa-regular fa-heart" />Wishlist</Link>
                        <Cart />
                      </div>
                      <div className="actions-area">
                        <div className="search-btn" id="search" onClick={handleSearchOpen}>
                          <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z" fill="#1F1F25" />
                          </svg>
                        </div>
                        <div className="menu-btn" id="menu-btn" onClick={handleMenuClick}>
                          <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </header>
      </>
      <BackToTop />
      <Sidebar />
    </div>
  );
}
export default HeaderTwo;
