"use client";
import React from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function NotFound() {
  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-404-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-inner-content-wrapper" style={{ textAlign: "center", padding: "60px 0" }}>
                <h1 className="title" style={{ fontSize: "120px", fontWeight: 800, color: "#629D23", lineHeight: 1 }}>404</h1>
                <h3 style={{ margin: "20px 0 16px" }}>Oops! Page Not Found</h3>
                <p style={{ color: "#666", marginBottom: "32px" }}>
                  Sorry, the page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href={BASE_PATH} className="rts-btn btn-primary">Back to Home</Link>
                  <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-border">Browse Shop</Link>
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
