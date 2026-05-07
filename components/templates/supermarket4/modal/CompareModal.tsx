"use client";
import React from 'react';
interface ModalProps { show: boolean; handleClose: () => void; }
const CompareModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  if (!show) return null;
  return (
    <div className="modal-compare-area-start" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, maxWidth: 700, width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}><i className="fal fa-times" /></button>
        </div>
        <div className="compare-main-wrapper-body"><div className="single-compare-elements name">Preview</div><div className="single-compare-elements"><div className="thumbnail-preview"><img src="/templates/supermarket4/products/01.jpg" alt="grocery" /></div></div><div className="single-compare-elements"><div className="thumbnail-preview"><img src="/templates/supermarket4/products/02.jpg" alt="grocery" /></div></div><div className="single-compare-elements"><div className="thumbnail-preview"><img src="/templates/supermarket4/products/03.jpg" alt="grocery" /></div></div></div>
        <div className="compare-main-wrapper-body productname spacifiq"><div className="single-compare-elements name">Name</div><div className="single-compare-elements"><p>J.Crew Mercantile Women&apos;s Short</p></div><div className="single-compare-elements"><p>Amazon Essentials Women&apos;s Tanks</p></div><div className="single-compare-elements"><p>Amazon Brand - Daily Ritual</p></div></div>
        <div className="compare-main-wrapper-body productname"><div className="single-compare-elements name">Price</div><div className="single-compare-elements price"><p>$25.00</p></div><div className="single-compare-elements price"><p>$39.25</p></div><div className="single-compare-elements price"><p>$12.00</p></div></div>
        <div className="compare-main-wrapper-body productname"><div className="single-compare-elements name">Buy Now</div><div className="single-compare-elements"><div className="cart-counter-action"><a href="#" className="rts-btn btn-primary radious-sm with-icon"><div className="btn-text">Add To Cart</div><div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div><div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div></a></div></div><div className="single-compare-elements"><div className="cart-counter-action"><a href="#" className="rts-btn btn-primary radious-sm with-icon"><div className="btn-text">Add To Cart</div><div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div><div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div></a></div></div><div className="single-compare-elements"><div className="cart-counter-action"><a href="#" className="rts-btn btn-primary radious-sm with-icon"><div className="btn-text">Add To Cart</div><div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div><div className="arrow-icon"><i className="fa-regular fa-cart-shopping" /></div></a></div></div></div>
      </div>
    </div>
  );
};
export default CompareModal;
