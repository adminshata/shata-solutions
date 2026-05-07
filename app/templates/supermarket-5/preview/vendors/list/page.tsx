"use client";
import HeaderTwo from "@/components/templates/supermarket5/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket5/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket5/common/BackToTop";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-5/preview";
const vendors = [
  { handle: "fresh-juice-bar", name: "Fresh Juice Bar", location: "Berlin, Germany", products: 45, rating: 4.9, img: "01.jpg", desc: "Cold-pressed juices, fruit cups, and wellness drinks." },
  { handle: "green-valley-farms", name: "Green Valley Farms", location: "Frankfurt, Germany", products: 32, rating: 4.8, img: "02.jpg", desc: "Fresh daily deliveries of seasonal vegetables and fruits." },
  { handle: "organic-roots", name: "Organic Roots", location: "Hamburg, Germany", products: 58, rating: 4.9, img: "01.webp", desc: "Certified organic products sourced directly from farmers." },
  { handle: "pure-nature-store", name: "Pure Nature Store", location: "Munich, Germany", products: 27, rating: 4.5, img: "02.webp", desc: "Natural and chemical-free grocery products." },
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
            <a className="current" href="#">Vendor List</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-section-gap">
        <div className="container">
          <div className="row g-4">
            {vendors.map((v, i) => (
              <div key={i} className="col-12">
                <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 24 }}>
                  <img src={`/templates/supermarket5/vendor/${v.img}`} alt={v.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).src = '/templates/supermarket5/products/01.jpg'; }} />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 4px' }}>{v.name}</h5>
                    <p style={{ margin: '0 0 8px', color: '#666' }}><i className="fa-light fa-location-dot" /> {v.location}</p>
                    <p style={{ margin: 0, color: '#888', fontSize: 14 }}>{v.desc}</p>
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <p style={{ margin: '0 0 4px' }}>{v.products} Products</p>
                    <p style={{ margin: '0 0 12px' }}>{v.rating} <i className="fa-solid fa-star" style={{ color: '#f59e0b' }} /></p>
                    <Link href={`${BASE_PATH}/vendors/${v.handle}`} className="rts-btn btn-primary">View Store</Link>
                  </div>
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
