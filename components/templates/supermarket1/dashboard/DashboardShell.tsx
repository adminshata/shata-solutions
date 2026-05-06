"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  SUPERMARKET1_ASSETS,
  SUPERMARKET1_BASE,
  dashboardOrders,
  dashboardProducts,
  supermarket1Vendors,
} from "@/lib/supermarket1/reference-data";

type MenuItem = {
  title: string;
  icon: string;
  href?: string;
  children?: { title: string; href: string }[];
};

const DASH = `${SUPERMARKET1_BASE}/dashboard`;

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/01.svg`,
    children: [
      { title: "Main Demo", href: DASH },
      { title: "Coming Soon", href: "#" },
    ],
  },
  {
    title: "Order",
    icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/09.svg`,
    children: [
      { title: "Order", href: `${DASH}/order` },
      { title: "Order Details", href: `${DASH}/order-details` },
    ],
  },
  {
    title: "Product",
    icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/02.svg`,
    children: [
      { title: "Product List", href: `${DASH}/product-list` },
      { title: "Add Product", href: `${DASH}/add-product` },
    ],
  },
  {
    title: "Vendor",
    icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/04.svg`,
    children: [
      { title: "Vendor Grid", href: `${DASH}/vendor-grid` },
      { title: "Vendor List", href: `${DASH}/vendor-list` },
      { title: "Vendor Details", href: `${DASH}/vendor-details` },
      { title: "Create Vendors", href: `${DASH}/create-vendors` },
    ],
  },
  { title: "Transactions", icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/06.svg`, href: `${DASH}/transaction` },
  { title: "Reviews", icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/07.svg`, href: `${DASH}/review` },
  { title: "Brand", icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/16.svg`, href: `${DASH}/brand` },
  { title: "Payment", icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/17.svg`, href: `${DASH}/payment` },
  {
    title: "User Profile",
    icon: `${SUPERMARKET1_ASSETS}/images-dashboard/icons/05.svg`,
    children: [
      { title: "Profile Setting", href: `${DASH}/profile-setting` },
      { title: "Log In", href: `${DASH}/log-in` },
      { title: "Registration", href: `${DASH}/registration` },
    ],
  },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="freshmart_dashboard">
      <DashboardSidebar collapsed={collapsed} />
      <div className={`right-area-body-content ${collapsed ? "collapsed" : ""}`}>
        <DashboardHeader onToggleSidebar={() => setCollapsed((value) => !value)} />
        {children}
      </div>
    </div>
  );
}

function DashboardSidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`sidebar_left ${collapsed ? "collapsed" : ""}`}>
      <Link href={DASH} className="logo">
        <span style={{ color: "#629D23", fontSize: 26, fontWeight: 800 }}>FreshMart</span>
      </Link>
      <SideMenu />
    </div>
  );
}

function SideMenu() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const activeIndex = menuItems.findIndex((item) =>
      item.children?.some((child) => pathname === child.href)
    );
    if (activeIndex !== -1) setOpenIndex(activeIndex);
  }, [pathname]);

  return (
    <ul className="rts-side-nav-area-left menu-active-parent">
      {menuItems.map((item, index) => {
        const hasSubmenu = !!item.children?.length;
        const isOpen = openIndex === index;
        const isActive = item.href === pathname;

        return (
          <li className="single-menu-item" key={item.title}>
            {hasSubmenu ? (
              <Link
                href="#"
                className={`with-plus ${isOpen ? "active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenIndex((value) => value === index ? null : index);
                }}
              >
                <img src={item.icon} alt="" className="icon" />
                <p>{item.title}</p>
              </Link>
            ) : (
              <Link href={item.href ?? "#"} className={isActive ? "active" : ""}>
                <img src={item.icon} alt="" className="icon" />
                <p>{item.title}</p>
              </Link>
            )}
            {hasSubmenu && (
              <ul className={`submenu mm-collapse parent-nav ${isOpen ? "mm-show" : ""}`}>
                {item.children!.map((child) => (
                  <li key={child.title}>
                    <Link href={child.href} className={`mobile-menu-link ${pathname === child.href ? "active" : ""}`}>
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function DashboardHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActivePopup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header-one">
      <div className="headerleft">
        <button type="button" className="collups-show-icon" onClick={onToggleSidebar} aria-label="Toggle dashboard sidebar">
          <img src={`${SUPERMARKET1_ASSETS}/images-dashboard/icons/10.svg`} alt="" />
          <i className="fa-light fa-arrow-right" />
        </button>
      </div>
      <div className="header-right">
        <div className="action-interactive-area__header" ref={popupRef}>
          <button type="button" className={`single_action__haeader search-action ${activePopup === "search" ? "active" : ""}`} onClick={() => setActivePopup(activePopup === "search" ? null : "search")}>
            <i className="fa-light fa-magnifying-glass" />
            <div className="search-opoup slide-down__click" style={{ display: activePopup === "search" ? "block" : "none" }} onClick={(event) => event.stopPropagation()}>
              <input type="text" placeholder="Search" />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </button>
          <button type="button" className={`single_action__haeader notification ${activePopup === "notification" ? "active" : ""}`} onClick={() => setActivePopup(activePopup === "notification" ? null : "notification")}>
            <i className="fa-light fa-bell" />
            <div className="notification_main_wrapper slide-down__click" style={{ display: activePopup === "notification" ? "block" : "none" }}>
              <h3 className="title">Notification<span className="count">5</span></h3>
              <div className="notification__content">
                <ul className="notification__items">
                  {["New order received", "Stock level updated", "Vendor profile approved"].map((message) => (
                    <li className="single__items" key={message}>
                      <a className="single-link" href="#">
                        <div className="avatar"><img src={`${SUPERMARKET1_ASSETS}/images/avatar/user.svg`} alt="" /></div>
                        <div className="main-content"><h5 className="name-user">FreshMart<span className="time-ago">1.3 hrs ago</span></h5><div className="disc">{message}<span className="count" /></div></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
          <button type="button" className={`single_action__haeader language user_avatar__information ${activePopup === "language" ? "active" : ""}`} onClick={() => setActivePopup(activePopup === "language" ? null : "language")}>
            <i className="fa-light fa-language" />
            <div className="user_information_main_wrapper slide-down__click" style={{ display: activePopup === "language" ? "block" : "none" }}>
              {["English", "Bangla", "Hindi", "Latin"].map((language) => <a key={language} href="#">{language}</a>)}
            </div>
          </button>
          <button type="button" className={`single_action__haeader user_avatar__information ${activePopup === "profile" ? "active" : ""}`} onClick={() => setActivePopup(activePopup === "profile" ? null : "profile")}>
            <img src={`${SUPERMARKET1_ASSETS}/images/avatar/user.svg`} alt="User" />
            <div className="user_information_main_wrapper slide-down__click" style={{ display: activePopup === "profile" ? "block" : "none" }}>
              <Link href={`${DASH}/profile-setting`}><i className="fa-light fa-user" /> Profile Setting</Link>
              <Link href={SUPERMARKET1_BASE}><i className="fa-regular fa-shop" /> Visit Storefront</Link>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export function DashboardOverview() {
  return (
    <DashboardShell>
      <div className="body-root-inner">
        <div className="transection">
          <div className="title-right-actioin-btn-wrapper-product-list">
            <h3 className="title">Overview</h3>
            <div className="button-wrapper">
              <div className="single-select">
                <select className="nice-select" defaultValue="Week">
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                  <option>6 Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          {[
            ["Revenue", "$1280", "04.png"],
            ["Orders", "158", "05.png"],
            ["Products", "358", "06.png"],
            ["Sales", "$89k", "07.png"],
          ].map(([label, value, image]) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" key={label}>
              <div className="single-over-fiew-card">
                <span className="top-main">{label}</span>
                <div className="bottom">
                  <h2 className="title">{value}</h2>
                  <div className="right-primary">
                    <div className="increase"><i className="fa-light fa-arrow-up" /><span>50.8%</span></div>
                    <img src={`${SUPERMARKET1_ASSETS}/images-dashboard/avatar/${image}`} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt--10 g-5">
          <div className="col-xl-8">
            <div className="dashboard-card">
              <h4 className="title">Sales Analytics</h4>
              <div style={{ height: 260, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 10, alignItems: "end", paddingTop: 30 }}>
                {[35, 64, 48, 80, 62, 92, 74, 100, 66, 84, 58, 76].map((height, index) => (
                  <span key={index} style={{ height: `${height}%`, borderRadius: 8, background: "linear-gradient(180deg, #629D23, #d7f2bd)" }} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="dashboard-card">
              <h4 className="title">Top Product Countries</h4>
              {["United States", "Germany", "Australia", "Canada"].map((country, index) => (
                <div className="single-progress-area-incard" key={country}>
                  <div className="top"><span>{country}</span><span>{90 - index * 12}%</span></div>
                  <div className="progress"><div className="progress-bar" style={{ width: `${90 - index * 12}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </DashboardShell>
  );
}

function DashboardFooter() {
  return (
    <div className="footer-copyright">
      <div className="left"><p>Copyright © 2025 All Right Reserved.</p></div>
      <ul><li><a href="#">Terms</a></li><li><a href="#">Privacy</a></li><li><a href="#">Help</a></li></ul>
    </div>
  );
}

export function DashboardOrderPage({ details = false }: { details?: boolean }) {
  return (
    <DashboardShell>
      <div className="body-root-inner">
        <div className="title-right-actioin-btn-wrapper-product-list">
          <h3 className="title">{details ? "Order Details" : "Order"}</h3>
          <Link href={`${DASH}/order`} className="rts-btn btn-primary">Order List</Link>
        </div>
        {details ? <OrderDetails /> : <OrdersTable />}
        <DashboardFooter />
      </div>
    </DashboardShell>
  );
}

function OrdersTable() {
  return (
    <div className="product-list-main-wrapper">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead><tr><th>Order No</th><th>Customer</th><th>Date</th><th>Status</th><th>Total</th></tr></thead>
          <tbody>
            {dashboardOrders.map((order) => (
              <tr key={order.id}><td>{order.id}</td><td>{order.customer}</td><td>{order.date}</td><td><span className="status">{order.status}</span></td><td>{order.total}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderDetails() {
  return (
    <div className="order-details-wrapper">
      <div className="row g-5">
        <div className="col-lg-8">
          <OrdersTable />
        </div>
        <div className="col-lg-4">
          <div className="single-over-fiew-card">
            <span className="top-main">Order Summary</span>
            <div className="shipping"><p>Subtotal: $445.00</p><p>Shipping: Free</p><p>Discount: $25.00</p></div>
            <div className="bottom"><h2 className="title">$420.00</h2></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardProductListPage() {
  const [filter, setFilter] = useState("");
  const products = dashboardProducts.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <DashboardShell>
      <div className="body-root-inner">
        <div className="title-right-actioin-btn-wrapper-product-list">
          <h3 className="title">Product List</h3>
          <Link href={`${DASH}/add-product`} className="rts-btn btn-primary">Add Product</Link>
        </div>
        <div className="product-list-main-wrapper">
          <div className="search-area-start">
            <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Search Product" />
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead><tr><th>Product Name</th><th>Product No</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td><div className="item-image-and-name"><a href="#" className="thumbnail"><img src={product.image} alt="grocery" /></a><p>{product.name}</p></div></td>
                    <td>{product.no}</td><td>{product.category}</td><td>{product.price}</td><td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </DashboardShell>
  );
}

export function DashboardGenericPage({ title, kind }: { title: string; kind?: "vendors" | "form" | "payment" | "reviews" }) {
  return (
    <DashboardShell>
      <div className="body-root-inner">
        <div className="title-right-actioin-btn-wrapper-product-list">
          <h3 className="title">{title}</h3>
        </div>
        {kind === "vendors" ? (
          <div className="row g-5">
            {supermarket1Vendors.map((vendor) => (
              <div className="col-xl-4 col-lg-6" key={vendor.handle}>
                <div className="single-over-fiew-card">
                  <span className="top-main">{vendor.status}</span>
                  <div className="bottom"><h2 className="title" style={{ fontSize: 24 }}>{vendor.name}</h2><img src={vendor.logo} alt="" style={{ width: 64 }} /></div>
                  <p>{vendor.address}</p>
                </div>
              </div>
            ))}
          </div>
        ) : kind === "form" ? (
          <div className="product-list-main-wrapper">
            <form className="row g-4" onSubmit={(event) => event.preventDefault()}>
              {["Product Name", "Regular Price", "Sale Price", "Category"].map((label) => (
                <div className="col-lg-6" key={label}><label>{label}</label><input className="form-control" placeholder={label} /></div>
              ))}
              <div className="col-lg-12"><label>Description</label><textarea className="form-control" rows={5} /></div>
              <div className="col-lg-12"><button className="rts-btn btn-primary">Save Changes</button></div>
            </form>
          </div>
        ) : (
          <div className="row g-5">
            {[
              ["Transactions", "$12,800", "06.png"],
              ["Reviews", "4.8", "07.png"],
              ["Payments", "$9,420", "05.png"],
            ].map(([label, value, image]) => (
              <div className="col-xl-4 col-lg-6" key={label}>
                <div className="single-over-fiew-card">
                  <span className="top-main">{kind === "reviews" ? "Customer" : label}</span>
                  <div className="bottom"><h2 className="title">{value}</h2><img src={`${SUPERMARKET1_ASSETS}/images-dashboard/avatar/${image}`} alt="" /></div>
                  <p>{title} content restored from the dashboard section.</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <DashboardFooter />
      </div>
    </DashboardShell>
  );
}
