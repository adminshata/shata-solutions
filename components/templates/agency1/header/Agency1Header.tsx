"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAgency1 } from "@/lib/agency1/context";

function Agency1Logo({ dark = true, text }: { dark?: boolean; text: string }) {
  const parts = text.split(".");
  return (
    <span style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 900,
      fontSize: 20,
      letterSpacing: -0.5,
      color: dark ? "#101010" : "#ffffff",
      lineHeight: 1,
    }}>
      {parts[0] || text}
      {parts.length > 1 && <span style={{ color: "#F14F44" }}>.</span>}
      {parts.length > 1 ? parts.slice(1).join(".") : null}
    </span>
  );
}

export default function Agency1Header() {
  const { config } = useAgency1();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      {/* Side Offset Panel */}
      <aside className="fix">
        <div className={`side-info${sidebarOpen ? " info-open" : ""}`}>
          <div className="side-info-content">
            <div className="offset-widget offset-header">
              <div className="offset-logo">
                <Link href="/templates/agency-1/preview">
                  <Agency1Logo dark={true} text={config.brand.logoText ?? "Shata.Agency"} />
                </Link>
              </div>
              <button
                className="side-info-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="offset-button">
              <Link href={config.header.ctaLink} className="rr-btn">
                <span className="btn-wrap">
                  <span className="text-one">{config.header.ctaLabel}</span>
                  <span className="text-two">{config.header.ctaLabel}</span>
                </span>
              </Link>
            </div>
            <div className="offset-widget-box">
              <h2 className="title">Contact Us</h2>
              <div className="contact-meta">
                <div className="contact-item">
                  <span className="icon"><i className="fa-solid fa-location-dot" /></span>
                  <span className="text">{config.header.address}</span>
                </div>
                <div className="contact-item">
                  <span className="icon"><i className="fa-solid fa-envelope" /></span>
                  <span className="text">
                    <a href={`mailto:${config.header.email}`}>{config.header.email}</a>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="icon"><i className="fa-solid fa-phone" /></span>
                  <span className="text">
                    <a href={`tel:${config.header.phone}`}>{config.header.phone}</a>
                  </span>
                </div>
              </div>
            </div>
            {/* Mobile Nav */}
            <nav className="d-xl-none" style={{ marginTop: 24 }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <Link href="/templates/agency-1/preview" onClick={() => setSidebarOpen(false)}
                    style={{ display: "block", padding: "10px 0", fontWeight: 600 }}>
                    Home
                  </Link>
                </li>
                {config.navItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} onClick={() => setSidebarOpen(false)}
                      style={{ display: "block", padding: "10px 0", fontWeight: 600 }}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul style={{ listStyle: "none", paddingLeft: 16 }}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} onClick={() => setSidebarOpen(false)}
                              style={{ display: "block", padding: "6px 0", fontSize: 14 }}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="offcanvas-overlay"
          style={{ display: "block", opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className={`header-area${config.header.stickyHeader && sticky ? " sticky" : ""}`}>
        <div className="header-main">
          <div className="container rr-container-1800">
            <div className="header-area__inner">
              <div className="header__logo">
                <Link href="/templates/agency-1/preview">
                  <Agency1Logo dark={true} text={config.brand.logoText ?? "Shata.Agency"} />
                </Link>
              </div>

              <div className="header__nav">
                <nav className="main-menu">
                  <ul>
                    <li
                      className="menu-item-has-children"
                      onMouseEnter={() => setOpenDropdown("home")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link href="/templates/agency-1/preview">Home</Link>
                      {openDropdown === "home" && (
                        <ul className="dp-menu column-2" style={{ display: "block" }}>
                          <li><Link href="/templates/agency-1/preview">AI Agency</Link></li>
                        </ul>
                      )}
                    </li>
                    {config.navItems.map((item) => (
                      <li
                        key={item.label}
                        className={item.children ? "menu-item-has-children" : ""}
                        onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                        onMouseLeave={() => item.children && setOpenDropdown(null)}
                      >
                        <Link href={item.href}>{item.label}</Link>
                        {item.children && openDropdown === item.label && (
                          <ul className="dp-menu" style={{ display: "block" }}>
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link href={child.href}>{child.label}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="header-right">
                {config.header.showGetInTouchBtn && (
                  <Link href={config.header.ctaLink} className="rr-btn-border">
                    <span className="text">{config.header.ctaLabel}</span>
                    <span className="icon"><i className="fa-regular fa-arrow-right" /></span>
                  </Link>
                )}
                <div className="header__navicon d-xl-none">
                  <div className="side-toggle">
                    <button
                      className="bar-icon"
                      onClick={() => setSidebarOpen(true)}
                      aria-label="Open menu"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      <span />
                      <span />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
