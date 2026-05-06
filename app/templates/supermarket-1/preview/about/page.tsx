"use client";
import React from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";

const counters = [
  { end: "60M+", label: "Happy\nCustomers" },
  { end: "105M+", label: "Grocery\nProducts" },
  { end: "80K+", label: "Active\nSalesman" },
  { end: "60K+", label: "Store\nWorldwide" },
];

const teamMembers = [
  { name: "David Smith", role: "Founder & CEO", img: "/templates/supermarket1/images/team/01.jpg" },
  { name: "Sarah Johnson", role: "Operations Manager", img: "/templates/supermarket1/images/team/02.jpg" },
  { name: "Michael Chen", role: "Head of Marketing", img: "/templates/supermarket1/images/team/03.jpg" },
  { name: "Emily Davis", role: "Customer Success", img: "/templates/supermarket1/images/team/04.jpg" },
];

export default function AboutPage() {
  return (
    <div className="demo-one">
      <HeaderOne />

      {/* About Banner */}
      <div className="about-banner-area-bg rts-section-gap bg_iamge">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content-about-area">
                <h1 className="title">Do You Want To Know Us?</h1>
                <p className="disc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                  pretium mollis ex, vel interdum augue faucibus sit amet. Proin
                  tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu
                  finibus nunc ullamcorper et.
                </p>
                <Link href={`${BASE_PATH}/contact`} className="rts-btn btn-primary">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area */}
      <div className="rts-counter-area">
        <div className="container-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="counter-area-main-wrapper">
                {counters.map((item, index) => (
                  <div className="single-counter-area" key={index}>
                    <h2 className="title">{item.end}</h2>
                    <p>{item.label.replace("\n", " ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="rts-about-area rts-section-gap">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="about-image-area">
                <img src="/templates/supermarket1/images/about/01.jpg" alt="about" style={{ width: "100%", borderRadius: "8px" }} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content-wrapper">
                <span className="pre-title" style={{ color: "#629D23", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>About FreshMart</span>
                <h2 className="title mt--10">We Are the Best Online Grocery Store</h2>
                <p className="disc mt--20">
                  FreshMart was founded with a simple mission: to make fresh, healthy groceries accessible to everyone. 
                  We source directly from local farmers and trusted suppliers to bring you the freshest produce at unbeatable prices.
                </p>
                <p className="disc mt--15">
                  Our platform offers thousands of products across all categories — from fresh fruits and vegetables to 
                  international cuisines, dairy, bakery, and everything in between.
                </p>
                <div className="button-area mt--30">
                  <Link href={`${BASE_PATH}/shop`} className="rts-btn btn-primary">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="rts-team-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center mb--50">
                <span style={{ color: "#629D23", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Our Team</span>
                <h2 className="title mt--10">Meet The People Behind FreshMart</h2>
              </div>
            </div>
          </div>
          <div className="row g-5">
            {teamMembers.map((member, idx) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={idx}>
                <div className="single-team-wrapper" style={{ textAlign: "center", background: "#fff", borderRadius: "8px", padding: "30px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <div className="thumbnail" style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 20px" }}>
                    <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=629D23&color=fff&size=100`; }} />
                  </div>
                  <h5 className="title" style={{ marginBottom: "5px" }}>{member.name}</h5>
                  <span style={{ color: "#629D23", fontSize: "14px" }}>{member.role}</span>
                  <div className="social mt--15">
                    <ul style={{ display: "flex", justifyContent: "center", gap: "10px", listStyle: "none", padding: 0 }}>
                      <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                      <li><a href="#"><i className="fa-brands fa-twitter" /></a></li>
                      <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Short Service / Feature Area */}
      <div className="rts-feature-area rts-section-gap">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: "fa-truck-fast", title: "Free Delivery", desc: "On all orders over $50" },
              { icon: "fa-rotate-left", title: "Easy Returns", desc: "30-day hassle-free returns" },
              { icon: "fa-shield-halved", title: "Secure Payment", desc: "100% secure transactions" },
              { icon: "fa-headset", title: "24/7 Support", desc: "Dedicated support team" },
              { icon: "fa-tag", title: "Best Prices", desc: "Price match guarantee" },
            ].map((item, idx) => (
              <div className="col-xl-2-4 col-lg-4 col-md-6 col-sm-12" key={idx}>
                <div className="single-feature-area" style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div className="icon" style={{ color: "#629D23", fontSize: "28px", minWidth: "36px" }}>
                    <i className={`fa-light ${item.icon}`} />
                  </div>
                  <div className="content">
                    <h6 style={{ margin: "0 0 4px" }}>{item.title}</h6>
                    <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
