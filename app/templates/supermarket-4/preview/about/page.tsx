"use client";
import HeaderTwo from "@/components/templates/supermarket4/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket4/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket4/common/BackToTop";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-4/preview";
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">About Us</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-section-gap">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <img src="/templates/supermarket4/banner/01.webp" alt="about" style={{ width: '100%', borderRadius: 12 }} />
            </div>
            <div className="col-lg-6">
              <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: 14 }}>About OrangeMart</span>
              <h2 style={{ marginBottom: 20 }}>Fresh Groceries Delivered to Your Door</h2>
              <p style={{ color: '#666', lineHeight: 1.8, marginBottom: 20 }}>OrangeMart is your premium online grocery destination, bringing the freshest produce, finest meats, and everyday essentials right to your doorstep. Founded with a vision to make healthy eating accessible, we partner with local farms and trusted vendors.</p>
              <p style={{ color: '#666', lineHeight: 1.8, marginBottom: 32 }}>We believe in quality, freshness, and convenience. Our team works around the clock to ensure your orders are picked fresh and delivered on time.</p>
              <div className="row g-4">
                {[{num:"10+",label:"Years Experience"},{num:"500+",label:"Products"},{num:"50K+",label:"Happy Customers"},{num:"200+",label:"Vendors"}].map((s,i) => (
                  <div key={i} className="col-6">
                    <div style={{ textAlign: 'center', padding: 20, background: '#f9fafb', borderRadius: 8 }}>
                      <h3 style={{ color: 'var(--color-primary)', margin: '0 0 4px' }}>{s.num}</h3>
                      <p style={{ margin: 0, color: '#666', fontSize: 13 }}>{s.label}</p>
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
