"use client";
import Link from 'next/link';
import { useState } from 'react';
import ProductDetails from '@/components/templates/supermarket2/modal/ProductDetails';
import CompareModal from '@/components/templates/supermarket2/modal/CompareModal';

const BP = "/templates/supermarket-2/preview";

interface Props {
  Slug: string;
  ProductImage: string;
  ProductTitle?: string;
  Price?: string;
}

const WeeklyBestSellingTwoMain: React.FC<Props> = ({ Slug, ProductImage, ProductTitle, Price }) => {
  type ModalType = 'one' | 'two' | 'three' | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  return (
    <>
      <Link href={`${BP}/shop/${Slug}`} className="thumbanil">
        <img src={`/templates/supermarket2/products/${ProductImage}`} alt="seller" />
        <div className="action-share-option">
          <div className="single-action openuptip message-show-action" data-data-flow="up" title="Add To Wishlist">
            <i className="fa-light fa-heart" />
          </div>
          <div className="single-action openuptip" data-data-flow="up" title="Compare">
            <i className="fa-solid fa-arrows-retweet" />
          </div>
          <div className="single-action openuptip cta-quickview product-details-popup-btn" data-data-flow="up" title="Quick View">
            <i className="fa-regular fa-eye" />
          </div>
        </div>
      </Link>
      <div className="inner">
        <Link href={`${BP}/shop/${Slug}`}>
          <h4 className="title">{ProductTitle ?? 'How to growing your business'}</h4>
        </Link>
        <h6 className="price">{`$${Price}`}</h6>
      </div>
      <CompareModal show={activeModal === 'one'} handleClose={handleClose} />
      <ProductDetails show={activeModal === 'two'} handleClose={handleClose} productImage={`/templates/supermarket2/products/${ProductImage}`} productTitle={ProductTitle ?? 'Product'} productPrice={Price ?? '0'} />
    </>
  );
};
export default WeeklyBestSellingTwoMain;
