"use client";
import React from 'react';
import Link from 'next/link';

const BP = "/templates/supermarket-5/preview";

interface Props { Slug: string; blogImage: string; blogTitle?: string; }

const BlogTwoMain: React.FC<Props> = ({ Slug, blogImage, blogTitle }) => {
  return (
    <>
      <Link href={`${BP}/blog/${Slug}`} className="thumbnail">
        <img src={`/templates/supermarket5/blog/${blogImage}`} alt="blog-area" />
      </Link>
      <div className="blog-body">
        <div className="top-area">
          <div className="single-meta"><i className="fa-light fa-clock" /><span>15 Sep, 2023</span></div>
          <div className="single-meta"><i className="fa-regular fa-folder" /><span>Modern Fashion</span></div>
        </div>
        <Link href={`${BP}/blog/${Slug}`}><h4 className="title">{blogTitle ?? 'How to growing your business'}</h4></Link>
        <Link href={`${BP}/blog/${Slug}`} className="shop-now-goshop-btn">
          <span className="text">Read Details</span>
          <div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div>
          <div className="plus-icon"><i className="fa-sharp fa-regular fa-plus" /></div>
        </Link>
      </div>
    </>
  );
};
export default BlogTwoMain;
