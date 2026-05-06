"use client";
import HeaderTwo from "@/components/templates/supermarket2/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket2/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket2/common/BackToTop";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-2/preview";
const vendors = [
  { name: "Green Valley Farms", location: "Berlin, Germany", products: 45, rating: 4.8, img: "01.jpg" },
  { name: "Fresh Morning Co.", location: "Frankfurt, Germany", products: 32, rating: 4.6, img: "02.jpg" },
  { name: "Organic Roots", location: "Hamburg, Germany", products: 58, rating: 4.9, img: "03.jpg" },
  { name: "Pure Nature Store", location: "Munich, Germany", products: 27, rating: 4.5, img: "04.jpg" },
  { name: "Daily Fresh Market", location: "Cologne, Germany", products: 61, rating: 4.7, img: "05.jpg" },
  { name: "Harvest Grove", location: "Stuttgart, Germany", products: 39, rating: 4.4, img: "06.jpg" },
];
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Vendors</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-section-gap">
        <div className="container">
          <div className="row g-4">
            {vendors.map((v, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-12">
                <div className="single-vendor-area-start" style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <img src={`/templates/supermarket2/vendor/${v.img}`} alt={v.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = '/templates/supermarket2/products/01.jpg'; }} />
                    <div>
                      <h5 style={{ margin: 0 }}>{v.name}</h5>
                      <p style={{ margin: 0, color: '#666', fontSize: 13 }}><i className="fa-light fa-location-dot" /> {v.location}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span>{v.products} Products</span>
                    <span>{v.rating} <i className="fa-solid fa-star" style={{ color: '#f59e0b' }} /></span>
                  </div>
                  <Link href={`${BASE_PATH}/vendors/vendor-${i+1}`} className="rts-btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>View Store</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
