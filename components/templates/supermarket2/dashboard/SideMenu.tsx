"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BP = "/templates/supermarket-2/preview";
const DASH = `${BP}/dashboard`;
const DA = "/templates/supermarket2/dashboard-assets";

interface MenuItem {
  title: string;
  icon: string;
  children?: { title: string; href: string }[];
  href?: string;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: `${DA}/icons/01.svg`, children: [{ title: "Main Demo", href: DASH }, { title: "Coming Soon", href: "#" }] },
  { title: "Order", icon: `${DA}/icons/09.svg`, children: [{ title: "Order", href: `${DASH}/order` }, { title: "Order Details", href: `${DASH}/order-details` }] },
  { title: "Product", icon: `${DA}/icons/02.svg`, children: [{ title: "Product List", href: `${DASH}/product-list` }, { title: "Add Product", href: `${DASH}/add-product` }] },
  { title: "Vendor", icon: `${DA}/icons/04.svg`, children: [{ title: "Vendor Grid", href: `${DASH}/vendor-grid` }, { title: "Vendor List", href: `${DASH}/vendor-list` }, { title: "Vendor Details", href: `${DASH}/vendor-details` }, { title: "Create Vendors", href: `${DASH}/create-vendors` }] },
  { title: "Transactions", icon: `${DA}/icons/06.svg`, href: `${DASH}/transaction` },
  { title: "Reviews", icon: `${DA}/icons/07.svg`, href: `${DASH}/review` },
  { title: "Brand", icon: `${DA}/icons/16.svg`, href: `${DASH}/brand` },
  { title: "Payment", icon: `${DA}/icons/17.svg`, href: `${DASH}/payment` },
  { title: "User Profile", icon: `${DA}/icons/05.svg`, children: [{ title: "Profile Setting", href: `${DASH}/profile-setting` }, { title: "Log In", href: `${DASH}/log-in` }, { title: "Registration", href: `${DASH}/registration` }] },
];

const SideMenu = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const pathname = usePathname();

  useEffect(() => {
    const activeIndex = menuItems.findIndex(item => item.children?.some(child => pathname === child.href));
    if (activeIndex !== -1) setOpenIndex(activeIndex);
  }, [pathname]);

  const handleToggle = (index: number) => setOpenIndex(prev => prev === index ? null : index);

  return (
    <ul className="rts-side-nav-area-left menu-active-parent">
      {menuItems.map((item, index) => {
        const hasSubmenu = !!item.children?.length;
        const isOpen = openIndex === index;
        return (
          <li className="single-menu-item" key={index}>
            {hasSubmenu ? (
              <Link href="#" className={`with-plus ${isOpen ? "active" : ""}`} onClick={e => { e.preventDefault(); handleToggle(index); }}>
                <img src={item.icon} alt="icon" className="icon" />
                <p>{item.title}</p>
              </Link>
            ) : (
              <Link href={item.href || "#"}>
                <img src={item.icon} alt="icon" className="icon" />
                <p>{item.title}</p>
              </Link>
            )}
            {hasSubmenu && (
              <ul className={`submenu mm-collapse parent-nav ${isOpen ? "mm-show" : ""}`}>
                {item.children!.map((sub, si) => {
                  const isActive = pathname === sub.href;
                  return (
                    <li key={si}><Link href={sub.href} className={`mobile-menu-link ${isActive ? "active" : ""}`}>{sub.title}</Link></li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default SideMenu;
