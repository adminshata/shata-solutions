"use client";
import HeaderTwo from "@/components/templates/supermarket2/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket2/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket2/common/BackToTop";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-2/preview";
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-section-gap" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="container">
          <i className="fa-solid fa-circle-check" style={{ fontSize: 64, color: 'var(--color-primary)', marginBottom: 24, display: 'block' }} />
          <h2>Order Successful!</h2>
          <p style={{ margin: '16px 0 32px' }}>Thank you for your order. We will process it shortly.</p>
          <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
