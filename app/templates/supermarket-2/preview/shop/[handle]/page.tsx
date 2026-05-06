"use client";
import HeaderTwo from "@/components/templates/supermarket2/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket2/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket2/common/BackToTop";
import { PRODUCTS } from "@/lib/supermarket2/defaults";
import { useCart } from "@/lib/supermarket2/context";
import { useWishlist } from "@/lib/supermarket2/context";
import Link from "next/link";
import { useState } from "react";

const BASE_PATH = "/templates/supermarket-2/preview";

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const product = PRODUCTS.find(p => p.slug === params.handle) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAdd = () => addToCart({ id: Date.now(), image: `/templates/supermarket2/products/${product.image}`, title: product.title ?? "Product", price: parseFloat(product.price ?? "0"), quantity, active: true });
  const handleWishlist = () => addToWishlist({ id: Date.now(), image: `/templates/supermarket2/products/${product.image}`, title: product.title ?? "Product", price: parseFloat(product.price ?? "0"), quantity: 1 });

  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <Link href={`${BASE_PATH}/shop`}>Shop</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">{product.title}</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-product-details-section rts-section-gap">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="product-thumb-area">
                <div className="thumb-wrapper one filterd-items figure">
                  <div className="product-thumb"><img src={`/templates/supermarket2/products/${product.image}`} alt={product.title} style={{ width: "100%", borderRadius: 8 }} /></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contents">
                <div className="product-status">
                  <span className="product-catagory">{product.category}</span>
                  <div className="rating-stars-group">
                    {[1,2,3,4,5].map(s => <div key={s} className="rating-star"><i className="fas fa-star" /></div>)}
                    <span>10 Reviews</span>
                  </div>
                </div>
                <h2 className="product-title">{product.title} <span className="stock">In Stock</span></h2>
                <span className="product-price">${product.price}</span>
                <p>{product.descripTion}</p>
                <div className="product-bottom-action">
                  <div className="cart-edit">
                    <div className="quantity-edit action-item">
                      <button className="button" onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}><i className="fal fa-minus minus" /></button>
                      <input type="text" className="input" value={quantity} readOnly />
                      <button className="button plus" onClick={() => setQuantity(q => q + 1)}><i className="fal fa-plus plus" /></button>
                    </div>
                  </div>
                  <a href="#" className="rts-btn btn-primary radious-sm with-icon" onClick={e => { e.preventDefault(); handleAdd(); }}>
                    <div className="btn-text">Add To Cart</div>
                    <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                    <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                  </a>
                  <a href="#" className="rts-btn btn-primary ml--20" onClick={e => { e.preventDefault(); handleWishlist(); }}>
                    <i className="fa-light fa-heart" />
                  </a>
                </div>
                <div className="product-uniques">
                  <span className="catagorys product-unipue"><span>Categories: </span>{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
