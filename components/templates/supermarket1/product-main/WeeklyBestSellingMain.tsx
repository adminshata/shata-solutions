"use client";

import { useState, useEffect } from "react";
import ProductDetails from "../modal/ProductDetails";
import CompareModal from "../modal/CompareModal";
import { useCart } from "@/lib/supermarket1/context";
import { useWishlist } from "@/lib/supermarket1/context";
import { useCompare } from "@/lib/supermarket1/context";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";
const BASE_IMG = "/templates/supermarket1/products";

interface WeeklyBestSellingMainProps {
  Slug: string;
  ProductImage: string;
  ProductTitle?: string;
  Price?: string;
}

const WeeklyBestSellingMain: React.FC<WeeklyBestSellingMainProps> = ({
  Slug,
  ProductImage,
  ProductTitle,
  Price,
}) => {
  const [domReady, setDomReady] = useState(false);
  useEffect(() => { setDomReady(true); }, []);

  type ModalType = "one" | "two" | "three" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { addToCompare } = useCompare();

  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const imgSrc = ProductImage.startsWith("/") ? ProductImage : `${BASE_IMG}/${ProductImage}`;

  const handleAdd = () => {
    addToCart({ id: Date.now(), image: imgSrc, title: ProductTitle ?? "Product", price: parseFloat(Price ?? "0"), quantity, active: true });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleWishlist = () => {
    addToWishlist({ id: Date.now(), image: imgSrc, title: ProductTitle ?? "Product", price: parseFloat(Price ?? "0"), quantity: 1 });
  };

  const handleCompare = () => {
    addToCompare({ image: imgSrc, name: ProductTitle ?? "Product", price: Price ?? "0", description: "Fresh quality grocery product.", rating: 5, ratingCount: 25, weight: "500g", inStock: true });
  };

  if (!domReady) return null;

  return (
    <>
      <div className="image-and-action-area-wrapper">
        <Link href={`${BASE_PATH}/shop/${Slug}`} className="thumbnail-preview">
          <div className="badge">
            <span>25% <br />Off</span>
            <i className="fa-solid fa-bookmark" />
          </div>
          <img src={imgSrc} alt="grocery" />
        </Link>
        <div className="action-share-option">
          <span className="single-action openuptip message-show-action" data-flow="up" title="Add To Wishlist" onClick={handleWishlist}>
            <i className="fa-light fa-heart" />
          </span>
          <span className="single-action openuptip" data-flow="up" title="Compare" onClick={handleCompare}>
            <i className="fa-solid fa-arrows-retweet" />
          </span>
          <span className="single-action openuptip cta-quickview product-details-popup-btn" data-flow="up" title="Quick View" onClick={() => setActiveModal("two")}>
            <i className="fa-regular fa-eye" />
          </span>
        </div>
      </div>
      <div className="body-content">
        <Link href={`${BASE_PATH}/shop/${Slug}`}>
          <h4 className="title">{ProductTitle ?? "Product"}</h4>
        </Link>
        <span className="availability">500g Pack</span>
        <div className="price-area">
          <span className="current">${Price}</span>
          <div className="previous">$36.00</div>
        </div>
        <div className="cart-counter-action">
          <div className="quantity-edit">
            <input type="text" className="input" value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} />
            <div className="button-wrapper-action">
              <button className="button minus" onClick={decrease}><i className="fa-regular fa-chevron-down" /></button>
              <button className="button plus" onClick={increase}>+<i className="fa-regular fa-chevron-up" /></button>
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

export default WeeklyBestSellingMain;
