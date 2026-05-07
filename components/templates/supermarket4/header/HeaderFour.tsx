"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "./Nav";
import CategoryMenu from "./CategoryMenu";
import Cart from "./Cart";
import WishList from "./WishList";
import Sidebar from "./Sidebar";
import BackToTop from "@/components/templates/supermarket4/common/BackToTop";
import { useCompare } from "@/lib/supermarket4/context";

const BP = "/templates/supermarket-4/preview";

export default function HeaderFour() {
  const { compareItems } = useCompare();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allSuggestions = [
    "Fresh organic vegetables",
    "Frozen foods",
    "Diet foods",
    "Healthy foods",
    "Vitamin items",
    "Fresh juice deal",
    "OrangeMart grocery bundle",
  ];

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSuggestions(allSuggestions.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5));
    setShowSuggestions(true);
  }, [searchTerm]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    router.push(`${BP}/shop${searchTerm.trim() ? `?search=${encodeURIComponent(searchTerm.trim())}` : ""}`);
    setShowSuggestions(false);
  }

  function chooseSuggestion(suggestion: string) {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`${BP}/shop?search=${encodeURIComponent(suggestion)}`);
  }

  function handleMenuClick() {
    document.querySelector(".side-bar.header-two")?.classList.toggle("show");
  }

  function handleSearchOpen() {
    document.querySelector(".search-input-area")?.classList.toggle("show");
  }

  return (
    <>
      <header className="header-style-two header-four bg-primary-header header-primary-sticky header--fft">
        <div className="header-top-area bg_primary">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bwtween-area-header-top header-top-style-four">
                  <div className="hader-top-menu">
                    <Link href={`${BP}/about`}>About Us</Link>
                    <Link href={`${BP}/account`}>My Account</Link>
                    <Link href={`${BP}/wishlist`}>Wishlist</Link>
                    <Link href={`${BP}/track-order`}>Order Tracking</Link>
                  </div>
                  <p>Welcome to our Organic store&nbsp;OrangeMart!</p>
                  <div className="follow-us-social">
                    <span>Follow Us:</span>
                    <div className="social">
                      <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
                      <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
                      <a href="#" aria-label="Website"><i className="fa-regular fa-basketball" /></a>
                      <a href="#" aria-label="Skype"><i className="fa-brands fa-skype" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="search-header-area-main bg_white without-category">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="logo-search-category-wrapper">
                  <Link href={BP} className="logo-area">
                    <span className="logo orangemart-logo">OrangeMart</span>
                  </Link>
                  <div className="category-search-wrapper">
                    <div className="location-area">
                      <div className="icon"><i className="fa-light fa-location-dot" /></div>
                      <div className="information">
                        <span>Your location</span>
                        <p>Select Location</p>
                      </div>
                    </div>
                    <form onSubmit={submitSearch} className="search-header" autoComplete="off" style={{ position: "relative" }}>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for products, categories or brands"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                      />
                      <button type="submit" className="rts-btn btn-primary radious-sm with-icon">
                        <div className="btn-text">Search</div>
                        <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                        <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                      </button>
                      {showSuggestions && suggestions.length > 0 && (
                        <ul className="autocomplete-suggestions" style={{ position: "absolute", backgroundColor: "#fff", border: "1px solid #fed7aa", marginTop: 4, width: "100%", maxHeight: 220, overflowY: "auto", zIndex: 1000, listStyleType: "none", padding: 0, borderRadius: 6 }}>
                          {suggestions.map((suggestion) => (
                            <li key={suggestion} onMouseDown={(event) => event.preventDefault()} onClick={() => chooseSuggestion(suggestion)} style={{ padding: "10px 14px", cursor: "pointer" }}>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </form>
                  </div>
                  <div className="accont-wishlist-cart-area-header">
                    <Link href={`${BP}/account`} className="btn-border-only account"><i className="fa-light fa-user" />Account</Link>
                    <Link href={`${BP}/compare`} className="btn-border-only account compare-number">
                      <i className="fa-regular fa-code-compare" />
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

        <div className={`rts-header-nav-area-one header-four header--sticky ${isSticky ? "sticky" : ""}`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="nav-and-btn-wrapper">
                  <div className="nav-area-bottom-left-header-four">
                    <div className="category-btn category-hover-header">
                      <span>All Categories</span>
                      <CategoryMenu />
                    </div>
                    <div className="nav-area"><Nav /></div>
                  </div>
                  <div className="right-location-area fourt">
                    <p>Get 30% Discount Now <span>Sale</span></p>
                  </div>
                </div>

                <div className="logo-search-category-wrapper">
                  <Link href={BP} className="logo-area"><span className="logo orangemart-logo small">OrangeMart</span></Link>
                  <div className="category-search-wrapper">
                    <div className="category-btn category-hover-header">
                      <img className="parent" src="/templates/supermarket4/icons/bar-1.svg" alt="icons" />
                      <span className="cts">All Categories</span>
                      <CategoryMenu />
                    </div>
                    <form onSubmit={submitSearch} className="search-header">
                      <input type="text" placeholder="Search for products, categories" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                      <button type="submit" className="rts-btn btn-primary radious-sm with-icon">
                        <div className="btn-text">Search</div>
                        <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                        <div className="arrow-icon"><i className="fa-light fa-magnifying-glass" /></div>
                      </button>
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
                        <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z" fill="#1F1F25" /></svg>
                      </div>
                      <div className="menu-btn" id="menu-btn" onClick={handleMenuClick}>
                        <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y={14} width={20} height={2} fill="#1F1F25" /><rect y={7} width={20} height={2} fill="#1F1F25" /><rect width={20} height={2} fill="#1F1F25" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <BackToTop />
      <Sidebar />
    </>
  );
}
