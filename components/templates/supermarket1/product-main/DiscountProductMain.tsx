"use client";

import { useState, useEffect } from "react";
import ProductDetails from "../modal/ProductDetails";
import CompareModal from "../modal/CompareModal";
import { useCart, useWishlist, useCompare } from "@/lib/supermarket1/context";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_IMG = "/templates/supermarket1/products";

interface Props {
  Slug: string;
  ProductImage: string;
  ProductTitle?: string;
  Price?: string;
}

const DiscountProductMain: React.FC<Props> = ({ Slug, ProductImage, ProductTitle, Price }) => {
  const [domReady, setDomReady] = useState(false);
  useEffect(() => { setDomReady(true); }, []);

  type ModalType = "one" | "two" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { addToCompare } = useCompare();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const imgSrc = `${BASE_IMG}/${ProductImage}`;

  const handleAdd = () => {
    addToCart({ id: Date.now(), image: imgSrc, title: ProductTitle ?? "Product", price: parseFloat(Price ?? "0"), quantity, active: true });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (!domReady) return null;

  return (
    <>
      <div className="image-and-action-area-wrapper">
        <Link href={`${BASE_PATH}/shop/${Slug}`} className="thumbnail-preview">
          <div className="badge"><span>25% <br />Off</span><i className="fa-solid fa-bookmark" /></div>
          <img src={imgSrc} alt="grocery" />
        </Link>
        <div className="action-share-option">
          <span className="single-action openuptip" title="Add To Wishlist" onClick={() => addToWishlist({ id: Date.now(), image: imgSrc, title: ProductTitle ?? "Product", price: parseFloat(Price ?? "0"), quantity: 1 })}>
            <i className="fa-light fa-heart" />
          </span>
          <span className="single-action openuptip" title="Compare" onClick={() => addToCompare({ image: imgSrc, name: ProductTitle ?? "Product", price: Price ?? "0", description: "Fresh product.", rating: 5, ratingCount: 20, weight: "500g", inStock: true })}>
            <i className="fa-solid fa-arrows-retweet" />
          </span>
          <span className="single-action openuptip" title="Quick View" onClick={() => setActiveModal("two")}>
            <i className="fa-regular fa-eye" />
          </span>
        </div>
      </div>
      <div className="body-content">
        <Link href={`${BASE_PATH}/shop/${Slug}`}><h4 className="title">{ProductTitle ?? "Product"}</h4></Link>
        <span className="availability">500g Pack</span>
        <div className="price-area">
          <span className="current">${Price}</span>
          <div className="previous">$36.00</div>
        </div>
        <div className="cart-counter-action">
          <div className="quantity-edit">
            <input type="text" className="input" value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} />
            <div className="button-wrapper-action">
              <button className="button minus" onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}><i className="fa-regular fa-chevron-down" /></button>
              <button className="button plus" onClick={() => setQuantity(q => q + 1)}>+<i className="fa-regular fa-chevron-up" /></button>
            </div>
          </div>
          <Link href="#" className="rts-btn btn-primary add-to-card radious-sm with-icon" onClick={(e) => { e.preventDefault(); handleAdd(); }}>
            <div className="btn-text">{added ? "Added" : "Add"}</div>
            <div className="arrow-icon"><i className={added ? "fa-solid fa-check" : "fa-regular fa-cart-shopping"} /></div>
            <div className="arrow-icon"><i className={added ? "fa-solid fa-check" : "fa-regular fa-cart-shopping"} /></div>
          </Link>
        </div>
      </div>
      <CompareModal show={activeModal === "one"} handleClose={handleClose} />
      <ProductDetails show={activeModal === "two"} handleClose={handleClose} productImage={imgSrc} productTitle={ProductTitle ?? "Product"} productPrice={Price ?? "0"} />
    </>
  );
};

export default DiscountProductMain;
