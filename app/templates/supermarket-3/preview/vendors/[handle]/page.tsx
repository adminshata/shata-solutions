"use client";
import HeaderTwo from "@/components/templates/supermarket3/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket3/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket3/common/BackToTop";
import ShopMain from "@/components/templates/supermarket3/shop/ShopMain";
import { PRODUCTS } from "@/lib/supermarket3/defaults";
import type { Product } from "@/lib/supermarket3/types";
import Link from "next/link";
import { useParams } from "next/navigation";
const BASE_PATH = "/templates/supermarket-3/preview";
export default function Page() {
  const params = useParams<{ handle: string }>();
  const vendorName = params.handle === "fresh-juice-bar" ? "Fresh Juice Bar" : params.handle.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const vendorDescription = params.handle === "fresh-juice-bar"
    ? "Cold-pressed juices, fruit cups, wellness drinks, and fresh produce prepared daily."
    : "Premium organic produce from local farms with over 10 years of experience.";
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <Link href={`${BASE_PATH}/vendors`}>Vendors</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Vendor Details</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-section-gap">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <img src="/templates/supermarket3/vendor/01.jpg" alt="vendor" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} onError={e => { (e.target as HTMLImageElement).src = '/templates/supermarket3/products/01.jpg'; }} />
                <h4>{vendorName}</h4>
                <p style={{ color: '#666' }}><i className="fa-light fa-location-dot" /> Berlin, Germany</p>
                <p>{vendorDescription}</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0' }}>
                  <div><strong>45</strong><br /><small>Products</small></div>
                  <div><strong>4.8</strong><br /><small>Rating</small></div>
                  <div><strong>200+</strong><br /><small>Reviews</small></div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <h4 style={{ marginBottom: 24 }}>Vendor Products</h4>
              <div className="row g-4">
                {PRODUCTS.slice(0, 6).map((p: Product, i: number) => (
                  <div key={i} className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="single-shopping-card-one">
                      <ShopMain Slug={p.slug} ProductImage={p.image} ProductTitle={p.title} Price={p.price} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
