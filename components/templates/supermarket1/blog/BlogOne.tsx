"use client";

import React from "react";
import BlogOneMain from "./BlogOneMain";

interface PostType {
  slug: string;
  image: string;
  title?: string;
}

const POSTS: PostType[] = [
  { slug: "details-profitable-business-makes-your-profit", image: "06.jpg", title: "Details Profitable business makes your profit" },
  { slug: "one-Profitable-business-makes-your-profit", image: "07.jpg", title: "One Profitable business makes your profit" },
  { slug: "me-profitable-business-makes-your-profit", image: "08.jpg", title: "Me Profitable business makes your profit" },
  { slug: "details-business-makes-your-profit", image: "09.jpg", title: "Details business makes your profit" },
];

function BlogOne() {
  return (
    <div>
      {/* rts top tranding product area */}
      <div className="blog-area-start rts-section-gapBottom">
        <div className="container">
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
                  {POSTS.map((post, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                      <div className="single-blog-area-start">
                        <BlogOneMain
                          Slug={post.slug}
                          blogImage={post.image}
                          blogTitle={post.title}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts top tranding product area end */}
    </div>
  );
}

export default BlogOne;
