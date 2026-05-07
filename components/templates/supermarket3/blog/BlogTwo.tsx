"use client";
import React from 'react';
import BlogTwoMain from './BlogTwoMain';
import { POSTS } from '@/lib/supermarket3/defaults';
import type { Post } from '@/lib/supermarket3/types';

function BlogTwo() {
  const selectedPosts = POSTS.slice(11, 14);
  return (
    <>
      <div className="blog-area-start rts-section-gap">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left mb--0">Latest Blog Post Insights</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="cover-card-main-over">
                <div className="row g-4">
                  {selectedPosts.map((post: Post, index: number) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                      <div className="single-blog-area-start">
                        <BlogTwoMain Slug={post.slug} blogImage={post.image} blogTitle={post.title} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogTwo;
