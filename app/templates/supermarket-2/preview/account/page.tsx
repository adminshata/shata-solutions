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
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Account</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-section-gap bg_light-1">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3">
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <i className="fa-light fa-user" style={{ fontSize: 32, color: 'var(--color-primary)' }} />
                  </div>
                  <h6>John Doe</h6>
                  <p style={{ color: '#666', fontSize: 13 }}>john@example.com</p>
                </div>
                <nav><ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[["Dashboard", "#"],["Orders", "#"],["Address", "#"],["Profile", "#"],["Logout", "#"]].map(([label, href], i) => (
                    <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <a href={href} style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}><i className="fa-regular fa-chevron-right" style={{ fontSize: 10, color: 'var(--color-primary)' }} />{label}</a>
                    </li>
                  ))}
                </ul></nav>
              </div>
            </div>
            <div className="col-lg-9">
              <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h4 style={{ marginBottom: 24 }}>My Dashboard</h4>
                <div className="row g-4">
                  {[{label:"Total Orders",val:"12",icon:"fa-box"},{label:"Wishlist",val:"5",icon:"fa-heart"},{label:"Reviews",val:"8",icon:"fa-star"},{label:"Addresses",val:"2",icon:"fa-location-dot"}].map((stat, i) => (
                    <div key={i} className="col-sm-6">
                      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`fa-light ${stat.icon}`} style={{ color: '#fff', fontSize: 20 }} />
                        </div>
                        <div><h5 style={{ margin: 0 }}>{stat.val}</h5><p style={{ margin: 0, color: '#666', fontSize: 13 }}>{stat.label}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
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
