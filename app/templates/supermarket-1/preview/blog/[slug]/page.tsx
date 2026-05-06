"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_BLOG = "/templates/supermarket1/blog";

const POSTS = [
  { id: 1, slug: "profitable-business-makes-your-profit-Best-Solution", image: "05.jpg", bannerImg: "05.jpg", title: "Profitable business makes your profit Best Solution", category: "Business Solution", publishedDate: "15 Jan, 2023", author: "David Smith", descripTion: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures pidiously repurpose leading edge growth strategies with just in time web readiness communicate timely meta services." },
  { id: 2, slug: "details-profitable-business-makes-your-profit", image: "06.jpg", bannerImg: "06.jpg", title: "Details Profitable business makes your profit", category: "Business Solution", publishedDate: "15 Jan, 2023", author: "David Smith", descripTion: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { id: 3, slug: "one-Profitable-business-makes-your-profit", image: "07.jpg", bannerImg: "07.jpg", title: "One Profitable business makes your profit", category: "Business Solution", publishedDate: "18 Jan, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna venenatis diam ac malesuada velit." },
  { id: 4, slug: "me-profitable-business-makes-your-profit", image: "08.jpg", bannerImg: "08.jpg", title: "Me Profitable business makes your profit", category: "Business Solution", publishedDate: "20 Jan, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna venenatis diam ac malesuada velit." },
  { id: 5, slug: "details-business-makes-your-profit", image: "09.jpg", bannerImg: "09.jpg", title: "Details business makes your profit", category: "Business", publishedDate: "22 Jan, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 6, slug: "firebase-business-makes-your-profit", image: "10.jpg", bannerImg: "10.jpg", title: "Firebase business makes your profit", category: "Technology", publishedDate: "25 Jan, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 7, slug: "grow-your-organic-business-online", image: "11.jpg", bannerImg: "11.jpg", title: "Grow Your Organic Business Online", category: "Organic", publishedDate: "28 Jan, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 8, slug: "fresh-produce-delivery-tips", image: "12.jpg", bannerImg: "12.jpg", title: "Fresh Produce Delivery Tips", category: "Delivery", publishedDate: "01 Feb, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 9, slug: "best-seasonal-vegetables", image: "13.jpg", bannerImg: "13.jpg", title: "Best Seasonal Vegetables to Buy", category: "Vegetables", publishedDate: "04 Feb, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 10, slug: "dairy-products-nutrition-guide", image: "14.jpg", bannerImg: "14.jpg", title: "Dairy Products Nutrition Guide", category: "Nutrition", publishedDate: "07 Feb, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 11, slug: "meal-prep-grocery-guide", image: "15.jpg", bannerImg: "15.jpg", title: "Meal Prep Grocery Guide", category: "Lifestyle", publishedDate: "10 Feb, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
  { id: 12, slug: "sustainable-shopping-tips", image: "16.jpg", bannerImg: "16.jpg", title: "Sustainable Shopping Tips", category: "Lifestyle", publishedDate: "13 Feb, 2023", author: "David Smith", descripTion: "Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur ultrices pellentesque magna." },
];

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const blogPost = POSTS.find((post) => post.slug === slug);

  if (!blogPost) {
    return (
      <div className="demo-one">
        <HeaderOne />
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <h2>Post not found</h2>
          <Link href={`${BASE_PATH}/blog`} className="rts-btn btn-primary mt--20" style={{ marginTop: "20px", display: "inline-block" }}>Back to Blog</Link>
        </div>
        <FooterOne />
      </div>
    );
  }

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
                <Link href={`${BASE_PATH}/blog`}>Blog</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">{blogPost.title}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="blog-sidebar-area rts-section-gap">
        <div className="container">
          <div className="row">
            {/* Blog Content */}
            <div className="col-lg-8 order-lg-1 order-md-2 order-sm-2 order-2">
              <div className="blog-details-area-1">
                <div className="thumbnail">
                  <img
                    src={`${BASE_BLOG}/${blogPost.bannerImg}`}
                    alt={blogPost.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x450/629D23/fff?text=Blog`; }}
                  />
                </div>
                <div className="body-content-blog-details">
                  <div className="top-tag-time">
                    <div className="single">
                      <i className="fa-solid fa-clock" />
                      <span>{blogPost.publishedDate}</span>
                    </div>
                    <div className="single">
                      <i className="fa-solid fa-folder" />
                      <span>{blogPost.category}</span>
                    </div>
                  </div>
                  <h1 className="title">{blogPost.title}</h1>
                  <p className="disc">{blogPost.descripTion}</p>
                  <p className="disc">Et pellentesque venenatis aliquet morbi praesent penatibus justo sem velit blandit, sapien pretium duis suspendisse aliquam accumsan suscipit mauris lacinia, aenean orci magnis consequat montes vivamus habitant torquent nec.</p>
                  <p className="quote">&ldquo;Integer posuere odio ullamcorper semper eu bibendum, sodales pharetra ac ornare proin auctor, quis phasellus curae fusce magnis. Molestie tempus fusce nullam feugiat nibh praesent porttitor.&rdquo;</p>
                  <p className="disc">Molestie vestibulum sagittis torquent eget potenti diam vehicula, habitant a eros fusce urna penatibus tempus ultrices, mollis euismod montes porttitor curabitur senectus.</p>

                  <div className="tag-social-share-wrapper-area-wrapper">
                    <div className="tags-area">
                      <span>Tags</span>
                      <button>Organic</button>
                      <button>Grocery</button>
                      <button>Fresh</button>
                    </div>
                    <div className="social-icons">
                      <span>Social Icon</span>
                      <ul>
                        <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                        <li><a href="#"><i className="fa-brands fa-twitter" /></a></li>
                        <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
                        <li><a href="#"><i className="fa-brands fa-dribbble" /></a></li>
                      </ul>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="blog-details-author">
                    <div className="thumbnail">
                      <img src={`${BASE_BLOG}/01.png`} alt="author"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blogPost.author)}&background=629D23&color=fff&size=80`; }} />
                    </div>
                    <div className="author-information">
                      <span>Author</span>
                      <h5 className="title">{blogPost.author}</h5>
                      <p>Donec sollicitudin molestie malesuada. Vivamus magna justo, lacinia eget consectetur sed.</p>
                      <div className="social">
                        <ul>
                          <li><a href="#"><i className="fa-brands fa-dribbble" /></a></li>
                          <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                          <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="comment-replay-area-start">
                    <h3 className="title">03 Comments</h3>
                    {[
                      { name: "Amalia Genner", date: "Sep 25, 2024", img: "02.png" },
                      { name: "Robert Johnson", date: "Sep 26, 2024", img: "03.png" },
                    ].map((comment, idx) => (
                      <div className={`single-comment-area${idx > 0 ? " bottom pl--100 pl_sm--0 mt--50 pt--50" : ""}`} key={idx}>
                        <div className="thumbanil">
                          <img src={`${BASE_BLOG}/${comment.img}`} alt="comment"
                            onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=629D23&color=fff&size=60`; }} />
                        </div>
                        <div className="comment-information">
                          <div className="top-area">
                            <div className="left">
                              <span>{comment.date}</span>
                              <h5 className="title">{comment.name}</h5>
                            </div>
                            <div className="replay"><span>Replay</span></div>
                          </div>
                          <p className="disc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed convallis at tellus.</p>
                        </div>
                      </div>
                    ))}

                    {/* Add Review Form */}
                    <div className="contact-form-wrapper-1 mt--50">
                      <h3 className="title mb--20">Add a Review</h3>
                      <p>Your email address will not be published. Required fields are marked*</p>
                      <form action="#" className="contact-form-1">
                        <div className="contact-form-wrapper--half-area">
                          <div className="single"><input type="text" placeholder="name*" /></div>
                          <div className="single"><input type="text" placeholder="Email*" /></div>
                        </div>
                        <textarea name="message" placeholder="Write Message Here" defaultValue={""} />
                        <button className="rts-btn btn-primary mt--20">Submit Now</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 pl--60 order-lg-2 order-md-1 order-sm-1 order-1 pl_md--10 pl_sm--10 rts-sticky-column-item">
              <div className="blog-sidebar-single-wized">
                <form action="#">
                  <input type="text" placeholder="Search Here" required />
                  <button><i className="fa-regular fa-magnifying-glass" /></button>
                </form>
              </div>

              <div className="blog-sidebar-single-wized with-title">
                <h4 className="title">Categories</h4>
                <div className="category-main-wrapper">
                  {["Baking Material", "Bread and Juice", "Clothing & Beauty", "Fresh Vegetable", "Fresh Seafood", "Milks and Dairies", "Wine & Drinks"].map((cat) => (
                    <div className="single-category-area" key={cat}><p>{cat}</p></div>
                  ))}
                </div>
              </div>

              <div className="blog-sidebar-single-wized with-title">
                <h4 className="title">Latest Post</h4>
                <div className="latest-post-small-area-wrapper">
                  {POSTS.slice(0, 3).map((post, idx) => (
                    <div className="single-latest-post-area" key={idx}>
                      <Link href={`${BASE_PATH}/blog/${post.slug}`} className="thumbnail">
                        <img src={`${BASE_BLOG}/${post.image}`} alt="thumbnail"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/80x80/629D23/fff?text=Blog`; }} />
                      </Link>
                      <div className="inner-content-area">
                        <div className="icon-top-area">
                          <i className="fa-light fa-clock" /><span>{post.publishedDate}</span>
                        </div>
                        <Link href={`${BASE_PATH}/blog/${post.slug}`}><h5 className="title-sm-blog">{post.title}</h5></Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="blog-sidebar-single-wized with-title">
                <h4 className="title">Tags</h4>
                <div className="tags-area-blog-short-main">
                  {["Organic", "Fresh", "Grocery", "Healthy", "Vegetables", "Fruits", "Dairy", "Bakery"].map((tag) => (
                    <button key={tag} className="single-category">{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
