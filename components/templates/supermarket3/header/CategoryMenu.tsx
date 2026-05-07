"use client";
import Link from "next/link";
import React, { useState } from "react";

type MenuItem = { icon: string; label: string; submenu: string[] | null; };

function CategoryMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleMenu = (index: number) => setOpenIndex(openIndex === index ? null : index);
  const menuItems: MenuItem[] = [
    { icon: "01.svg", label: "Breakfast & Dairy", submenu: ["Breakfast", "Dinner", "Pumking"] },
    { icon: "02.svg", label: "Meats & Seafood", submenu: ["Breakfast", "Dinner", "Pumking"] },
    { icon: "03.svg", label: "Breads & Bakery", submenu: null },
    { icon: "04.svg", label: "Chips & Snacks", submenu: ["Breakfast", "Dinner", "Pumking"] },
    { icon: "05.svg", label: "Medical Healthcare", submenu: null },
    { icon: "06.svg", label: "Breads & Bakery", submenu: null },
    { icon: "07.svg", label: "Biscuits & Snacks", submenu: ["Breakfast", "Dinner", "Pumking"] },
    { icon: "08.svg", label: "Frozen Foods", submenu: null },
    { icon: "09.svg", label: "Grocery & Staples", submenu: null },
    { icon: "10.svg", label: "Other Items", submenu: null },
  ];
  return (
    <div>
      <ul className="category-sub-menu" id="category-active-four">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href="#" className="menu-item" onClick={(e) => { e.preventDefault(); if (item.submenu) toggleMenu(index); }}>
              <img src={`/templates/supermarket3/icons/${item.icon}`} alt="icons" />
              <span>{item.label}</span>
              {item.submenu && <i className={`fa-regular ${openIndex === index ? "fa-minus" : "fa-plus"}`} />}
            </Link>
            {item.submenu && (
              <ul className={`submenu mm-collapse ${openIndex === index ? "mm-show" : ""}`}>
                {item.submenu.map((sub, si) => (
                  <li key={si}><Link className="mobile-menu-link" href="/templates/supermarket-3/preview/shop">{sub}</Link></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CategoryMenu;
