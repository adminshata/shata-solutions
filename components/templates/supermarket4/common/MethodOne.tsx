import React from 'react';

function MethodOne() {
  return (
    <div>
      <div className="rts-shorts-service-area rts-section-gap bg_primary">
        <div className="container-2">
          <div className="row g-5">
            {[
              { title: "Payment Only Online", desc: "We prepared special discounts you on grocery products." },
              { title: "Everyday New Stocks", desc: "We prepared special discounts you on grocery products." },
              { title: "Best Quality Assurance", desc: "We prepared special discounts you on grocery products." },
              { title: "Delivery Within 30 Mins", desc: "We prepared special discounts you on grocery products." },
            ].map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="single-short-service-area-start">
                  <div className="icon-area">
                    <i className={`fa-light ${["fa-credit-card","fa-box","fa-star","fa-truck"][i]}`} style={{ fontSize: '36px', color: '#629D23' }} />
                  </div>
                  <div className="information">
                    <h4 className="title">{item.title}</h4>
                    <p className="disc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MethodOne;
