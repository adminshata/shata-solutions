'use client';
import { useState } from 'react';
import { useCart } from '@/lib/supermarket3/context';
import Link from 'next/link';

const BP = "/templates/supermarket-3/preview";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  productImage: string;
  productTitle: string;
  productPrice: string;
}

const ProductDetails: React.FC<ModalProps> = ({ show, handleClose, productImage, productTitle, productPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const { addToCart } = useCart();
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  const priceNumber = parseFloat(productPrice) || 0;
  const totalPrice = (priceNumber * quantity).toFixed(2);
  const handleAdd = () => {
    addToCart({ id: Date.now(), image: productImage, title: productTitle, price: priceNumber, quantity, active: true });
    handleClose();
  };
  if (!show) return null;
  return (
    <div className="product-details-popup-wrapper popup" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section" style={{ background: '#fff', borderRadius: 8, padding: 24, maxWidth: 800, width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="product-details-popup">
          <button className="product-details-close-btn" onClick={handleClose}><i className="fal fa-times" /></button>
          <div className="details-product-area">
            <div className="product-thumb-area">
              <div className="thumb-wrapper one filterd-items figure">
                <div className="product-thumb zoom"><img src={productImage} alt="product-thumb" /></div>
              </div>
              <div className="product-thumb-filter-group">
                {['tab1','tab2','tab3'].map(tab => (
                  <div key={tab} onClick={() => setActiveTab(tab)} className={`thumb-filter filter-btn ${activeTab === tab ? 'active' : ''}`}>
                    <img src={productImage} alt={`thumb-${tab}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="contents">
              <div className="product-status">
                <span className="product-catagory">Grocery</span>
                <div className="rating-stars-group">
                  {[1,2,3,4,5].map(s => <div key={s} className="rating-star"><i className="fas fa-star" /></div>)}
                  <span>10 Reviews</span>
                </div>
              </div>
              <h2 className="product-title">{productTitle} <span className="stock">In Stock</span></h2>
              <span className="product-price"><span className="old-price">$9.35</span> ${totalPrice}</span>
              <p>Premium quality grocery product, freshly sourced and delivered to your door.</p>
              <div className="product-bottom-action">
                <div className="cart-edit">
                  <div className="quantity-edit action-item">
                    <button className="button" onClick={decreaseQuantity}><i className="fal fa-minus minus" /></button>
                    <input type="text" className="input" value={quantity} readOnly />
                    <button className="button plus" onClick={increaseQuantity}><i className="fal fa-plus plus" /></button>
                  </div>
                </div>
                <Link href="#" className="rts-btn btn-primary radious-sm with-icon" onClick={e => { e.preventDefault(); handleAdd(); }}>
                  <div className="btn-text">Add To Cart</div>
                  <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                  <div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
