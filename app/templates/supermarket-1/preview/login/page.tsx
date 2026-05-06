"use client";
import React from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function LoginPage() {
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
                <a className="current" href="#">Log In</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="registration-wrapper-1">
                <div className="logo-area mb--0">
                  <span style={{ fontWeight: 800, fontSize: "28px", color: "#629D23" }}>FreshMart</span>
                </div>
                <h3 className="title">Login Into Your Account</h3>
                <form action="#" className="registration-form">
                  <div className="input-wrapper">
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="password">Password*</label>
                    <input type="password" id="password" />
                  </div>
                  <button className="rts-btn btn-primary">Login Account</button>
                  <div className="another-way-to-registration">
                    <div className="registradion-top-text">
                      <span>Or Register With</span>
                    </div>
                    <div className="login-with-brand">
                      <a href="#" className="single">
                        <span style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "4px", display: "inline-block" }}>Google</span>
                      </a>
                      <a href="#" className="single">
                        <span style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: "4px", display: "inline-block" }}>Facebook</span>
                      </a>
                    </div>
                    <p>Don&apos;t have an account? <Link href={`${BASE_PATH}/register`}>Registration</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
