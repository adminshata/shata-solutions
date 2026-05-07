"use client";
import HeaderTwo from "@/components/templates/supermarket3/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket3/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket3/common/BackToTop";
import ShopMain from "@/components/templates/supermarket3/shop/ShopMain";
import { PRODUCTS } from "@/lib/supermarket3/defaults";
import type { Product } from "@/lib/supermarket3/types";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-3/preview";
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Store</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-section-gap">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <span style={{ fontWeight: 700, fontSize: '22px', color: 'var(--color-primary)', display: 'block', marginBottom: 12 }}>BlueMart</span>
                <p style={{ color: '#666' }}><i className="fa-light fa-location-dot" /> 258 Daniel Street, Berlin</p>
                <p style={{ color: '#666' }}><i className="fa-light fa-phone" /> +25896 3158 3228</p>
                <p style={{ color: '#666' }}><i className="fa-light fa-envelope" /> info@bluemart.com</p>
                <p style={{ marginTop: 16 }}>Premium fresh grocery delivered to your door daily.</p>
              </div>
            </div>
            <div className="col-lg-8">
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
