"use client";

import Link from "next/link";
import { PageShell } from "./PageShell";
import { SUPERMARKET1_ASSETS, SUPERMARKET1_BASE } from "@/lib/supermarket1/reference-data";

export function StorePage() {
  return (
    <PageShell title="Store">
      <div className="rts-store-area rts-section-gap">
        <div className="container">
          <div className="row g-5">
            {["01.jpg", "02.jpg", "03.jpg"].map((image, index) => (
              <div className="col-lg-4 col-md-6" key={image}>
                <div className="single-store-area">
                  <img src={`${SUPERMARKET1_ASSETS}/images/store/${image}`} alt="store" style={{ width: "100%", borderRadius: 10 }} />
                  <div className="inner-content" style={{ paddingTop: 18 }}>
                    <h4 className="title">FreshMart Store {index + 1}</h4>
                    <p>530 Post Ct El Dorado Hills California, United States</p>
                    <Link href={`${SUPERMARKET1_BASE}/shop`} className="rts-btn btn-primary radious-sm">Visit Store</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function InvoicePage() {
  return (
    <PageShell title="Invoice">
      <div className="rts-invoice-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="invoice-main-wrapper-1">
            <div className="logo-top-area">
              <span style={{ color: "#629D23", fontSize: 28, fontWeight: 800 }}>FreshMart</span>
              <h3 className="title">Invoice</h3>
            </div>
            <div className="invoice-header">
              <div><h5>Invoice To:</h5><p>Wade Warren<br />530 Post Ct El Dorado Hills</p></div>
              <div><h5>Invoice:</h5><p>#INV-12546<br />Date: 03/02/2026</p></div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                <tbody>
                  {["Fresh Grocery Pack", "Organic Juice", "Bakery Bundle"].map((item, index) => (
                    <tr key={item}><td>{item}</td><td>{index + 1}</td><td>${(24 + index * 8).toFixed(2)}</td><td>${((index + 1) * (24 + index * 8)).toFixed(2)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="total-area"><h4>Total: $184.00</h4></div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function TrackOrderPage() {
  return (
    <PageShell title="Track Order">
      <div className="rts-track-order-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="registration-wrapper-1">
                <h3 className="title">Track Your Order</h3>
                <form onSubmit={(event) => event.preventDefault()}>
                  <input type="text" placeholder="Order ID" />
                  <input type="email" placeholder="Billing Email" />
                  <button className="rts-btn btn-primary">Track Order</button>
                </form>
              </div>
              <div className="cart-top-area-note mt--30">
                <p>Your order <span>#145278</span> is currently out for delivery.</p>
                <div className="bottom-content-deals mt--10"><div className="single-progress-area-incard"><div className="progress"><div className="progress-bar" style={{ width: "80%" }} /></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function PolicyPage({ title }: { title: string }) {
  return (
    <PageShell title={title}>
      <div className="rts-policy-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="privacy-policy-wrapper" style={{ background: "#fff", borderRadius: 12, padding: 40 }}>
                <h2 className="title">{title}</h2>
                <p>FreshMart keeps this page aligned with the original policy layout while using FreshMart brand language.</p>
                <h4>Information We Collect</h4>
                <p>We collect order, account, delivery, and support details needed to provide grocery shopping services.</p>
                <h4>How We Use Information</h4>
                <p>We use information to process orders, manage vendors, improve service quality, and keep accounts secure.</p>
                <h4>Contact</h4>
                <p>Questions about this policy can be sent to hello@freshmart.com.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
