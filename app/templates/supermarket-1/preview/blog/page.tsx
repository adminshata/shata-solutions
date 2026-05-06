"use client";
import React, { useState } from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_BLOG = "/templates/supermarket1/blog";

const POSTS = [
  { id: 1, slug: "profitable-business-makes-your-profit-Best-Solution", image: "05.jpg", title: "Profitable business makes your profit Best Solution", category: "Business Solution", publishedDate: "15 Jan, 2023" },
  { id: 2, slug: "details-profitable-business-makes-your-profit", image: "06.jpg", title: "Details Profitable business makes your profit", category: "Business Solution", publishedDate: "15 Jan, 2023" },
  { id: 3, slug: "one-Profitable-business-makes-your-profit", image: "07.jpg", title: "One Profitable business makes your profit", category: "Business Solution", publishedDate: "18 Jan, 2023" },
  { id: 4, slug: "me-profitable-business-makes-your-profit", image: "08.jpg", title: "Me Profitable business makes your profit", category: "Business Solution", publishedDate: "20 Jan, 2023" },
  { id: 5, slug: "details-business-makes-your-profit", image: "09.jpg", title: "Details business makes your profit", category: "Business", publishedDate: "22 Jan, 2023" },
  { id: 6, slug: "firebase-business-makes-your-profit", image: "10.jpg", title: "Firebase business makes your profit", category: "Technology", publishedDate: "25 Jan, 2023" },
  { id: 7, slug: "grow-your-organic-business-online", image: "11.jpg", title: "Grow Your Organic Business Online", category: "Organic", publishedDate: "28 Jan, 2023" },
  { id: 8, slug: "fresh-produce-delivery-tips", image: "12.jpg", title: "Fresh Produce Delivery Tips", category: "Delivery", publishedDate: "01 Feb, 2023" },
  { id: 9, slug: "best-seasonal-vegetables", image: "13.jpg", title: "Best Seasonal Vegetables to Buy", category: "Vegetables", publishedDate: "04 Feb, 2023" },
  { id: 10, slug: "dairy-products-nutrition-guide", image: "14.jpg", title: "Dairy Products Nutrition Guide", category: "Nutrition", publishedDate: "07 Feb, 2023" },
  { id: 11, slug: "meal-prep-grocery-guide", image: "15.jpg", title: "Meal Prep Grocery Guide", category: "Lifestyle", publishedDate: "10 Feb, 2023" },
  { id: 12, slug: "sustainable-shopping-tips", image: "16.jpg", title: "Sustainable Shopping Tips", category: "Lifestyle", publishedDate: "13 Feb, 2023" },
];

const POSTS_PER_PAGE = 8;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(POSTS.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = POSTS.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
                <a className="current" href="#">Blog Grid</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="rts-blog-area rts-section-gap bg_white bg_gradient-tranding-items">
        <div className="container">
          <div className="row g-5">
            {currentPosts.map((post) => (
              <div key={post.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="single-blog-style-card-border">
                  <Link href={`${BASE_PATH}/blog/${post.slug}`} className="thumbnail">
                    <img src={`${BASE_BLOG}/${post.image}`} alt={post.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x280/629D23/fff?text=Blog`; }} />
                  </Link>
                  <div className="inner-content-body">
                    <div className="tag-area">
                      <div className="single">
                        <i className="fa-light fa-clock" />
                        <span>{post.publishedDate}</span>
                      </div>
                      <div className="single">
                        <i className="fa-light fa-folder" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <Link className="title-main" href={`${BASE_PATH}/blog/${post.slug}`}>
                      <h3 className="title animated fadeIn">{post.title}</h3>
                    </Link>
                    <div className="button-area">
                      <Link href={`${BASE_PATH}/blog/${post.slug}`} className="rts-btn btn-primary radious-sm with-icon">
                        <div className="btn-text">Read Details</div>
                        <div className="arrow-icon"><i className="fa-solid fa-circle-plus" /></div>
                        <div className="arrow-icon"><i className="fa-solid fa-circle-plus" /></div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row mt--50">
            <div className="col-lg-12">
              <div className="pagination-area-main-wrappper">
                <ul>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i}>
                      <button
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </button>
                    </li>
                  ))}
                  {currentPage < totalPages && (
                    <li>
                      <button onClick={() => setCurrentPage(currentPage + 1)}>
                        <i className="fa-regular fa-chevrons-right" />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
