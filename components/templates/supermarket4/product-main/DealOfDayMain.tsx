"use client";
import { useState } from 'react';
import ProductDetails from '@/components/templates/supermarket4/modal/ProductDetails';
import CompareModal from '@/components/templates/supermarket4/modal/CompareModal';
import { useCart } from '@/lib/supermarket4/context';
import { useWishlist } from '@/lib/supermarket4/context';
import { useCompare } from '@/lib/supermarket4/context';
import Link from 'next/link';

const BP = "/templates/supermarket-4/preview";

interface Props {
  Slug: string;
  ProductImage: string;
  ProductTitle?: string;
  Price?: string;
}

const DealOfDayMain: React.FC<Props> = ({ Slug, ProductImage, ProductTitle, Price }) => {
  type ModalType = 'one' | 'two' | 'three' | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  const { addToCart } = useCart();
  const handleAdd = () => addToCart({ id: Date.now(), image: `/templates/supermarket4/products/${ProductImage}`, title: ProductTitle ?? 'Product', price: Price ? parseFloat(Price) : 0, quantity: 1, active: true });

  const { addToWishlist } = useWishlist();
  const handleWishlist = () => addToWishlist({ id: Date.now(), image: `/templates/supermarket4/products/${ProductImage}`, title: ProductTitle ?? 'Product', price: parseFloat(Price ?? '0'), quantity: 1 });

  const { addToCompare } = useCompare();
  const handleCompare = () => addToCompare({ image: `/templates/supermarket4/products/${ProductImage}`, name: ProductTitle ?? 'Product', price: Price ?? '0', description: 'Premium grocery product.', rating: 5, ratingCount: 25, weight: '500g', inStock: true });

  return (
    <>
      <div className="onsale-offer"><span>On sale</span></div>
      <div className="image-and-action-area-wrapper">
        <Link href={`${BP}/shop/${Slug}`} className="thumbnail-preview">
          <img src={`/templates/supermarket4/products/${ProductImage}`} alt="grocery" />
        </Link>
        <div className="action-share-option">
          <div className="single-action openuptip message-show-action" data-flow="up" title="Add To Wishlist" onClick={handleWishlist}>
            <i className="fa-light fa-heart" />
          </div>
          <div className="single-action openuptip" data-flow="up" title="Compare" onClick={handleCompare}>
            <i className="fa-solid fa-arrows-retweet" />
          </div>
          <div className="single-action openuptip cta-quickview product-details-popup-btn" data-flow="up" title="Quick View" onClick={() => setActiveModal('two')}>
            <i className="fa-regular fa-eye" />
          </div>
        </div>
      </div>
      <div className="body-content">
        <div className="start-area-rating">
          {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star" />)}
        </div>
        <Link href={`${BP}/shop/${Slug}`}>
          <h4 className="title">{ProductTitle ?? 'How to growing your business'}</h4>
        </Link>
        <span className="availability">500g Pack</span>
        <div className="price-area">
          <span className="current">{`$${Price}`}</span>
          <div className="previous">$36.00</div>
        </div>
        <div className="cart-counter-action">
          <Link href="#" className="rts-btn btn-primary radious-sm with-icon" onClick={e => { e.preventDefault(); handleAdd(); }}>
            <div className="btn-text">Add To Cart</div>
            <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
            <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
          </Link>
        </div>
      </div>
      <CompareModal show={activeModal === 'one'} handleClose={handleClose} />
      <ProductDetails show={activeModal === 'two'} handleClose={handleClose} productImage={`/templates/supermarket4/products/${ProductImage}`} productTitle={ProductTitle ?? 'Product'} productPrice={Price ?? '0'} />
    </>
  );
};
export default DealOfDayMain;
