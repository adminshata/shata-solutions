"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_IMG = "/templates/supermarket1/products";

interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  category: string;
}

const ALL_PRODUCTS: Product[] = [
  { id: 1, slug: "fresh-organic-apple", title: "Fresh Organic Apple", price: 4.99, oldPrice: 6.99, image: "15.jpg", badge: "Organic", category: "fresh-fruits" },
  { id: 2, slug: "premium-broccoli", title: "Premium Broccoli", price: 2.49, image: "16.jpg", category: "vegetables" },
  { id: 3, slug: "whole-milk-1l", title: "Whole Milk 1L", price: 1.99, image: "17.jpg", category: "dairy" },
  { id: 4, slug: "sourdough-bread", title: "Sourdough Bread", price: 3.49, oldPrice: 4.99, image: "18.jpg", badge: "Sale", category: "bakery" },
  { id: 5, slug: "orange-juice-1l", title: "Orange Juice 1L", price: 3.99, image: "19.jpg", category: "beverages" },
  { id: 6, slug: "chicken-breast-500g", title: "Chicken Breast 500g", price: 7.99, image: "20.jpg", category: "meat" },
  { id: 7, slug: "atlantic-salmon", title: "Atlantic Salmon", price: 12.99, oldPrice: 15.99, image: "21.jpg", badge: "Sale", category: "seafood" },
  { id: 8, slug: "mixed-berry-pack", title: "Mixed Berry Pack", price: 5.49, image: "22.jpg", category: "fresh-fruits" },
  { id: 9, slug: "organic-spinach", title: "Organic Spinach 200g", price: 2.99, image: "23.jpg", badge: "Organic", category: "vegetables" },
  { id: 10, slug: "cheddar-cheese-200g", title: "Cheddar Cheese 200g", price: 4.49, image: "24.jpg", category: "dairy" },
  { id: 11, slug: "croissant-pack", title: "Croissant Pack x6", price: 3.99, image: "25.jpg", category: "bakery" },
  { id: 12, slug: "sparkling-water-pack", title: "Sparkling Water 6-pack", price: 2.99, image: "26.jpg", category: "beverages" },
  { id: 13, slug: "organic-banana-bunch", title: "Organic Banana Bunch", price: 1.99, image: "01.jpg", badge: "Organic", category: "fresh-fruits" },
  { id: 14, slug: "cherry-tomato-250g", title: "Cherry Tomato 250g", price: 2.49, image: "02.jpg", category: "vegetables" },
  { id: 15, slug: "greek-yogurt-500g", title: "Greek Yogurt 500g", price: 3.99, image: "03.jpg", category: "dairy" },
  { id: 16, slug: "fresh-mango", title: "Fresh Mango", price: 2.99, oldPrice: 3.99, image: "04.jpg", badge: "Sale", category: "fresh-fruits" },
];

const CATEGORIES: Record<string, string> = {
  "fresh-fruits": "Fresh Fruits",
  "vegetables": "Vegetables",
  "dairy": "Dairy Products",
  "bakery": "Bakery",
  "beverages": "Beverages",
  "meat": "Meat & Poultry",
  "seafood": "Seafood",
};

export default function CategoryPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const categoryName = CATEGORIES[handle] ?? handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const products = ALL_PRODUCTS.filter((p) => p.category === handle);

  const [addedId, setAddedId] = useState<number | null>(null);

  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <Link href={`${BASE_PATH}/shop`}>Shop</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">{categoryName}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="rts-shop-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop-top-area-between mb--30">
                <h4 style={{ margin: 0 }}>{categoryName}</h4>
                <p style={{ margin: 0, color: "#666" }}>Showing {products.length} products</p>
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p>No products found in this category.</p>
              <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-primary" style={{ marginTop: "16px", display: "inline-block" }}>Browse All Products</Link>
            </div>
          ) : (
            <div className="row g-4">
              {products.map((product) => (
                <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="single-shopping-card-one">
                    {product.badge && (
                      <div className="badge-area">
                        <div className="badge" style={{ background: product.badge === "Organic" ? "#629D23" : "#e74c3c" }}>{product.badge}</div>
                      </div>
                    )}
                    <div className="thumbnail-preview">
                      <Link href={`${BASE_PATH}/shop/${product.slug}`}>
                        <img src={`${BASE_IMG}/${product.image}`} alt={product.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/300x300/629D23/fff?text=${encodeURIComponent(product.title)}`; }} />
                      </Link>
                    </div>
                    <div className="body-content">
                      <Link href={`${BASE_PATH}/shop/${product.slug}`}>
                        <h4 className="title">{product.title}</h4>
                      </Link>
                      <div className="price-area">
                        <span className="price current-price">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                          <del className="price old-price" style={{ color: "#999", marginLeft: "8px", fontSize: "13px" }}>${product.oldPrice.toFixed(2)}</del>
                        )}
                      </div>
                      <div className="cart-counter-action">
                        <a
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                          onClick={(e) => {
                            e.preventDefault();
                            setAddedId(product.id);
                            setTimeout(() => setAddedId(null), 2000);
                          }}
                        >
                          <div className="btn-text">{addedId === product.id ? "Added!" : "Add To Cart"}</div>
                          <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                          <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
