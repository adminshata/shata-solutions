"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";
import { useCart } from "@/lib/supermarket1/context";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_IMG = "/templates/supermarket1/products";

const PRODUCTS = [
  { slug: "profitable-business-makes-your-profit-Best-Solution", image: "15.jpg", bannerImg: "15.jpg", title: "Profitable business Best Solution", price: "36.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "details-profitable-business-makes-your-profit", image: "16.jpg", bannerImg: "16.jpg", title: "Details Profitable business", price: "29.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "one-Profitable-business-makes-your-profit", image: "17.jpg", bannerImg: "17.jpg", title: "One Profitable business", price: "25.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "me-profitable-business-makes-your-profit", image: "18.jpg", bannerImg: "18.jpg", title: "Me Profitable business", price: "78.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "details-business-makes-your-profit", image: "19.jpg", bannerImg: "19.jpg", title: "Details business makes your profit", price: "90.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "firebase-business-makes-your-profit", image: "20.jpg", bannerImg: "20.jpg", title: "Firebase business makes your profit", price: "50.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "netlyfy-business-makes-your-profit", image: "21.jpg", bannerImg: "21.jpg", title: "Netlyfy business makes your profit", price: "19.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "profitable-business-makes-your-profit", image: "22.jpg", bannerImg: "22.jpg", title: "Profitable business makes your profit", price: "30.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "Valuable-business-makes-your-profit", image: "23.jpg", bannerImg: "23.jpg", title: "Valuable business makes your profit", price: "16.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "System-business-makes-your-profit", image: "24.jpg", bannerImg: "24.jpg", title: "System business makes your profit", price: "15.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "profitables-business-makes-your-profit", image: "25.jpg", bannerImg: "25.jpg", title: "Profitables business makes your profit", price: "12.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "content-business-makes-your-profit", image: "26.jpg", bannerImg: "26.jpg", title: "Content business makes your profit", price: "79.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "Dalivaring-business-makes-your-profit", image: "01.jpg", bannerImg: "01.jpg", title: "Dalivaring business makes your profit", price: "63.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "Staning-business-makes-your-profit", image: "02.jpg", bannerImg: "02.jpg", title: "Staning business makes your profit", price: "86.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "Best-business-makes-your-profit", image: "03.jpg", bannerImg: "03.jpg", title: "Best business makes your profit", price: "18.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
  { slug: "cooler-business-makes-your-profit", image: "04.jpg", bannerImg: "04.jpg", title: "Cooler business makes your profit", price: "18.00", description: "Collaboratively pontificate bleeding edge resources with inexpensive methodologies globally initiate multidisciplinary compatible architectures." },
];

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const product = PRODUCTS.find((p) => p.slug === handle);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="demo-one">
        <HeaderOne />
        <div className="rts-section-gap text-center">
          <h2>Product not found</h2>
          <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-primary">Back to Shop</Link>
        </div>
        <FooterOne />
      </div>
    );
  }

  const mainImg = activeImage ?? `${BASE_IMG}/${product.bannerImg}`;
  const thumbnails = [
    `${BASE_IMG}/${product.bannerImg}`,
    `/templates/supermarket1/images/shop/02.jpg`,
    `/templates/supermarket1/images/shop/03.jpg`,
  ];

  const handleAdd = () => {
    addToCart({ id: Date.now(), image: mainImg, title: product.title, price: parseFloat(product.price), quantity, active: true });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="demo-one">
      <HeaderOne />
      {/* Breadcrumb */}
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <Link href={`${BASE_PATH}/shop`}>Shop</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">{product.title}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      {/* Product Details */}
      <div className="rts-product-details-section rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="product-details-area-main">
                <div className="row g-5">
                  {/* Images */}
                  <div className="col-lg-6">
                    <div className="product-thumb-area">
                      <div className="thumb-wrapper one filterd-items figure">
                        <div className="product-thumb zoom">
                          <img src={mainImg} alt={product.title} />
                        </div>
                      </div>
                      <div className="product-thumb-filter-group">
                        {thumbnails.map((src, i) => (
                          <div key={i} onClick={() => setActiveImage(src)} className={`thumb-filter filter-btn ${mainImg === src ? "active" : ""}`}>
                            <img src={src} alt={`thumb-${i}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="col-lg-6">
                    <div className="contents">
                      <div className="product-status">
                        <span className="product-catagory">Grocery</span>
                        <div className="rating-stars-group">
                          {[1,2,3,4].map(s => <div key={s} className="rating-star"><i className="fas fa-star" /></div>)}
                          <div className="rating-star"><i className="fas fa-star-half-alt" /></div>
                          <span>10 Reviews</span>
                        </div>
                      </div>
                      <h2 className="product-title">{product.title} <span className="stock">In Stock</span></h2>
                      <span className="product-price">
                        <span className="old-price">$9.35</span> ${product.price}
                      </span>
                      <p>{product.description}</p>
                      <div className="product-bottom-action">
                        <div className="cart-edit">
                          <div className="quantity-edit action-item">
                            <button className="button" onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}><i className="fal fa-minus minus" /></button>
                            <input type="text" className="input" value={quantity} readOnly />
                            <button className="button plus" onClick={() => setQuantity(q => q + 1)}><i className="fal fa-plus plus" /></button>
                          </div>
                        </div>
                        <Link href="#" className="rts-btn btn-primary radious-sm with-icon" onClick={(e) => { e.preventDefault(); handleAdd(); }}>
                          <div className="btn-text">{added ? "Added!" : "Add To Cart"}</div>
                          <div className="arrow-icon"><i className={added ? "fa-solid fa-check" : "fa-regular fa-cart-shopping"} /></div>
                          <div className="arrow-icon"><i className={added ? "fa-solid fa-check" : "fa-regular fa-cart-shopping"} /></div>
                        </Link>
                      </div>
                      <div className="product-uniques">
                        <span className="sku product-unipue"><span>SKU: </span>FM-{product.slug.slice(0,8).toUpperCase()}</span>
                        <span className="catagorys product-unipue"><span>Categories: </span>Grocery, Fresh</span>
                        <span className="tags product-unipue"><span>Tags: </span>organic, fresh, groceries</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="product-tab-area mt--40">
                  <ul className="nav nav-tabs" id="productTab" role="tablist">
                    {[
                      { id: "tab1", label: "Description" },
                      { id: "tab2", label: "Reviews" },
                    ].map((tab) => (
                      <li key={tab.id} className="nav-item">
                        <button onClick={() => setActiveTab(tab.id)} className={`nav-link ${activeTab === tab.id ? "active" : ""}`}>{tab.label}</button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content mt--20">
                    {activeTab === "tab1" && (
                      <div className="description-content">
                        <p>{product.description}</p>
                        <p>Our products are sourced fresh daily. We partner with local farmers to bring you the best quality groceries at competitive prices. All items are inspected before delivery.</p>
                      </div>
                    )}
                    {activeTab === "tab2" && (
                      <div className="review-wrapper-main-innner">
                        <div className="submit-review-area">
                          <form action="#" className="submit-review-area">
                            <h5 className="title">Submit Your Review</h5>
                            <div className="half-input-wrapper">
                              <div className="half-input"><input type="text" placeholder="Your Name*" /></div>
                              <div className="half-input"><input type="text" placeholder="Your Email *" /></div>
                            </div>
                            <textarea placeholder="Write Your Review" defaultValue={""} />
                            <button className="rts-btn btn-primary">SUBMIT REVIEW</button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 col-md-12 offset-xl-1 rts-sticky-column-item">
              <div className="theiaStickySidebar">
                <div className="shop-sight-sticky-sidevbar mb--20">
                  <h6 className="title">Available offers</h6>
                  <div className="single-offer-area">
                    <div className="details"><p>Get 5% instant discount for the 1st FreshMart Order</p></div>
                  </div>
                  <div className="single-offer-area">
                    <div className="details"><p>Free Worldwide Shipping on all orders over $100</p></div>
                  </div>
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
