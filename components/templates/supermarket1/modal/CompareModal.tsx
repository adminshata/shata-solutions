"use client";

import React from "react";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const CompareModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal-compare-area-start"
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{ background: "#fff", borderRadius: "8px", padding: "20px", maxWidth: "900px", width: "95%", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>
          <i className="fa-regular fa-x" />
        </button>
        <div className="compare-main-wrapper-body">
          <div className="single-compare-elements name">Preview</div>
          <div className="single-compare-elements">
            <div className="thumbnail-preview">
              <img src="/templates/supermarket1/products/01.jpg" alt="grocery" />
            </div>
          </div>
          <div className="single-compare-elements">
            <div className="thumbnail-preview">
              <img src="/templates/supermarket1/products/02.jpg" alt="grocery" />
            </div>
          </div>
          <div className="single-compare-elements">
            <div className="thumbnail-preview">
              <img src="/templates/supermarket1/products/03.jpg" alt="grocery" />
            </div>
          </div>
        </div>
        <div className="compare-main-wrapper-body productname spacifiq">
          <div className="single-compare-elements name">Name</div>
          <div className="single-compare-elements"><p>J.Crew Mercantile Women&#39;s Short</p></div>
          <div className="single-compare-elements"><p>Amazon Essentials Women&#39;s Tanks</p></div>
          <div className="single-compare-elements"><p>Amazon Brand - Daily Ritual Wom</p></div>
        </div>
        <div className="compare-main-wrapper-body productname">
          <div className="single-compare-elements name">Price</div>
          <div className="single-compare-elements price"><p>$25.00</p></div>
          <div className="single-compare-elements price"><p>$39.25</p></div>
          <div className="single-compare-elements price"><p>$12.00</p></div>
        </div>
        <div className="compare-main-wrapper-body productname">
          <div className="single-compare-elements name">Rating</div>
          {[1,2,3].map(i => (
            <div className="single-compare-elements" key={i}>
              <div className="rating">
                {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star" />)}
                <span>({i * 10})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
