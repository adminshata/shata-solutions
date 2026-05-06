"use client";
import React from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function OrderSuccessfulPage() {
  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">Order Successful</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                background: "#fff",
                borderRadius: "12px",
                padding: "60px 40px",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#629D23",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <i className="fa-solid fa-check" style={{ color: "#fff", fontSize: "36px" }} />
                </div>
                <h2 style={{ marginBottom: "16px", color: "#2C3C28" }}>Order Placed Successfully!</h2>
                <p style={{ color: "#666", marginBottom: "8px" }}>
                  Thank you for your order. Your order has been received and is being processed.
                </p>
                <p style={{ color: "#666", marginBottom: "32px" }}>
                  You will receive an email confirmation shortly.
                </p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href={`${BASE_PATH}/account`} className="rts-btn btn-primary">Track Your Order</Link>
                  <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-border">Continue Shopping</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
