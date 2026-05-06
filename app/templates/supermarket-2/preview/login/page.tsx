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
            <a className="current" href="#">Log In</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="registration-wrapper-1">
                <div className="logo-area mb--0">
                  <span style={{ fontWeight: 700, fontSize: '24px', color: 'var(--color-primary)' }}>QuickMart</span>
                </div>
                <h3 className="title">Login Into Your Account</h3>
                <form action="#" className="registration-form">
                  <div className="input-wrapper"><label htmlFor="email">Email*</label><input type="email" id="email" /></div>
                  <div className="input-wrapper"><label htmlFor="password">Password*</label><input type="password" id="password" /></div>
                  <button className="rts-btn btn-primary">Login Account</button>
                  <div className="another-way-to-registration">
                    <div className="registradion-top-text"><span>Or Login With</span></div>
                    <div className="login-with-brand">
                      <a href="#" className="single"><img src="/templates/supermarket2/form/google.svg" alt="google" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} /></a>
                      <a href="#" className="single"><img src="/templates/supermarket2/form/facebook.svg" alt="facebook" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} /></a>
                    </div>
                    <p>Don&apos;t have an account? <Link href={`${BASE_PATH}/register`}>Registration</Link></p>
                  </div>
                </form>
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
