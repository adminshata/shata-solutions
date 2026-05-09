"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import { useAgency1 } from "@/lib/agency1/context";

const values = [
  { num: "01.", title: "Human-Centered Innovation", thumb: "/templates/agency1/imgs/inner/about/value/value-thumb1.jpg", desc: "We build AI that serves people first. Every system we design prioritizes usability, accessibility, and real human benefit over technical novelty." },
  { num: "02.", title: "Trusted & Transparent Partnerships", thumb: "/templates/agency1/imgs/inner/about/value/value-thumb2.jpg", desc: "Our clients get full visibility into methodology, progress, and performance. No black boxes, no surprises — just clear, honest collaboration." },
  { num: "03.", title: "Cutting-Edge AI Expertise", thumb: "/templates/agency1/imgs/inner/about/value/value-thumb3.jpg", desc: "We stay at the frontier. Our team continuously researches, tests, and deploys the latest AI architectures so your solutions remain state-of-the-art." },
  { num: "04.", title: "Sustainable & Measurable Impact", thumb: "/templates/agency1/imgs/inner/about/value/value-thumb4.jpg", desc: "Every engagement is measured against real business KPIs. We define success metrics upfront and report against them throughout." },
];

const awards = [
  { name: "AI Excellence Awards", topic: "Best AI Automation Project 2024", date: "DEC 2024" },
  { name: "G2 Best Software", topic: "Top AI Consulting Firm 2024", date: "NOV 2024" },
  { name: "Forbes AI 50", topic: "Recognized AI Partner 2023", date: "OCT 2023" },
  { name: "Gartner Cool Vendor", topic: "Machine Learning Solutions 2023", date: "SEP 2023" },
  { name: "AI Excellence Awards", topic: "Innovation in NLP 2022 — 1st Winner", date: "DEC 2022" },
];

const QuoteSVG5 = () => (
  <svg width="80" height="63" viewBox="0 0 138 109" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M58.8991 7.77194L53.8918 0C19.247 23.5085 0 52.0721 0 75.5806C0 98.3119 16.5556 109 30.6044 109C48.3117 109 60.8207 93.8416 60.8207 77.9122C60.8207 64.5072 52.352 53.042 40.9948 48.7644C37.7242 47.5955 34.6447 46.6255 34.6447 40.9923C34.6447 33.8049 39.843 23.1231 58.8991 7.77194ZM135.308 7.77194L130.301 0C96.0383 23.5085 76.4094 52.0721 76.4094 75.5806C76.4094 98.3119 93.3468 109 107.396 109C125.294 109 138 93.8416 138 77.9122C138 64.5072 129.34 53.042 117.595 48.7644C114.325 47.5955 111.436 46.6255 111.436 40.9923C111.436 33.8049 116.825 23.1168 135.302 7.76573L135.308 7.77194Z" fill="#F3FF0A" />
  </svg>
);

const brandLogos = [
  "/templates/agency1/imgs/brand/brand-5_01.png",
  "/templates/agency1/imgs/brand/brand-5_02.png",
  "/templates/agency1/imgs/brand/brand-5_03.png",
  "/templates/agency1/imgs/brand/brand-5_04.png",
  "/templates/agency1/imgs/brand/brand-5_05.png",
  "/templates/agency1/imgs/brand/brand-5_06.png",
];

export default function Agency1AboutPage() {
  const { config } = useAgency1();
  const [activeValue, setActiveValue] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <>
      <Agency1Header />
      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb1 section-bg overflow-hidden">
          <div className="container rr-container-1800">
            <div className="breadcrumb1__top">
              <div className="breadcrumb1__top-left">About us</div>
              <div className="breadcrumb1__top-right">
                <div className="breadcrumb1__top-right-img">
                  <Image
                    src="/templates/agency1/imgs/inner/breadcrumb/breadcrumb-img1_1.png"
                    alt="clients"
                    width={100}
                    height={40}
                  />
                </div>
                <div className="breadcrumb1__top-right-text">More than 25K clients reviews</div>
              </div>
            </div>
            <h1 className="breadcrumb1__title">
              We are Shata AI Agency — an AI agency and <br />
              innovative technology company based <br />
              in Riverside, TX.
            </h1>
          </div>
          <div className="breadcrumb1__abouttext">
            Agency{" "}
            <Image
              src="/templates/agency1/imgs/inner/about/about-breadcumbthumb.jpg"
              alt="award"
              width={80}
              height={40}
              style={{ display: "inline", borderRadius: 4 }}
            />{" "}
            Award
          </div>
          <div className="breadcrumb1__thumb rr-ov-hidden" style={{ position: "relative", height: 400, margin: "40px 0 0" }}>
            <Image
              src="/templates/agency1/imgs/inner/breadcrumb/breadcrumb-thumb1_2.jpg"
              alt="About"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Value Section */}
        <div className="value section-spacing overflow-hidden">
          <div className="container rr-container-1800">
            <div className="section-top7">
              <div className="row gy-5 d-flex align-items-end justify-content-between">
                <div className="col-xl-10">
                  <div>
                    <div className="section-top7__subtitle">Our Value</div>
                    <div className="section-top7__title mb-0">
                      Together, we create smarter AI-powered solutions. We offer seamless AI-driven
                      partnerships and transform your vision into reality with innovation and precision.
                      No buzzwords — just real results.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="value__list-wrap">
              {values.map((v, i) => (
                <div
                  key={v.num}
                  className={`value__list${activeValue === i ? " active" : ""}`}
                  onClick={() => setActiveValue(i)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="value__left">
                    <div className="value__number">{v.num}</div>
                    <div className="value__title">
                      <Image src={v.thumb} alt={v.title} width={52} height={52} style={{ borderRadius: 8 }} />
                      <span>{v.title}</span>
                    </div>
                  </div>
                  <div className="value__desc">{v.desc}</div>
                </div>
              ))}
            </div>

            {/* Big thumbs */}
            <div className="value__thumb section-spacing pb-0">
              <div className="value-thumb__one rr-ov-hidden rounded-5" style={{ position: "relative", height: 340, borderRadius: 20, overflow: "hidden" }}>
                <Image
                  src="/templates/agency1/imgs/inner/about/value/value-big-thumb1.jpg"
                  alt="Our team"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="value-thumb__two rr-ov-hidden rounded-5" style={{ position: "relative", height: 340, borderRadius: 20, overflow: "hidden" }}>
                <Image
                  src="/templates/agency1/imgs/inner/about/value/value-big-thumb2.jpg"
                  alt="Our work"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="awards overflow-hidden">
          {/* Marquee */}
          <div className="marque-section6 rr-ov-hidden">
            <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "20px 0" }}>
              <div style={{ display: "inline-block", animation: "agency1AboutMarquee 22s linear infinite" }}>
                {[...Array(3)].map((_, i) => (
                  <span key={i} style={{ display: "inline-block", marginRight: 60, fontSize: 20, fontWeight: 700, color: "#101010" }}>
                    strategy <span style={{ color: "#F14F44" }}>&#9679;</span> marketing <span style={{ color: "#F14F44" }}>&#9679;</span> analysis <span style={{ color: "#F14F44" }}>&#9679;</span> innovation <span style={{ color: "#F14F44" }}>&#9679;</span> AI solutions <span style={{ color: "#F14F44" }}>&#9679;</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="container rr-container-1800">
            <div className="awards__list-wrap section-spacing">
              {awards.map((award) => (
                <div key={award.topic} className="awards__list">
                  <div className="awards__name">{award.name}</div>
                  <div className="awards__topic">{award.topic}</div>
                  <div className="awards__date">{award.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="testimonial-5__area section-spacing pb-0 bg-white overflow-hidden">
          <div className="container rr-container-1800">
            <div className="testimonial-5__wrapper">
              <div style={{ position: "relative" }}>
                <div className="testimonial-5__item">
                  <div className="testimonial-5__quote">
                    <QuoteSVG5 />
                  </div>
                  <p className="testimonial-5__desc">
                    {config.testimonials[testimonialIdx]?.quote ?? ""}
                  </p>
                  <div className="testimonial-5__author">
                    <div className="testimonial-5__thumb">
                      <Image
                        src={config.testimonials[testimonialIdx]?.avatar ?? "/templates/agency1/imgs/testimonials/testimonials-author-img-1.png"}
                        alt={config.testimonials[testimonialIdx]?.author ?? "Author"}
                        width={56}
                        height={56}
                      />
                    </div>
                    <h5 className="testimonial-5__name">
                      {config.testimonials[testimonialIdx]?.author ?? "—"}, {config.testimonials[testimonialIdx]?.role ?? ""}
                    </h5>
                  </div>
                </div>
                <div className="testimonial-5__arrow">
                  <button
                    className="testimonial-5__swiper-button-prev"
                    onClick={() => setTestimonialIdx((i) => (i === 0 ? Math.max(config.testimonials.length - 1, 0) : i - 1))}
                    aria-label="Previous testimonial"
                    style={{ background: "none", border: "1px solid #ccc", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", marginRight: 8 }}
                  >
                    <i className="far fa-chevron-left" />
                  </button>
                  <button
                    className="testimonial-5__swiper-button-next"
                    onClick={() => setTestimonialIdx((i) => (i === Math.max(config.testimonials.length - 1, 0) ? 0 : i + 1))}
                    aria-label="Next testimonial"
                    style={{ background: "none", border: "1px solid #ccc", borderRadius: "50%", width: 44, height: 44, cursor: "pointer" }}
                  >
                    <i className="far fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Logos */}
        <div className="brand-slide-5__area section-spacing bg-white overflow-hidden">
          <div className="container rr-container-1800">
            <div className="brand-section-5__slide">
              <div style={{ overflow: "hidden" }}>
                <div style={{ display: "flex", animation: "agency1BrandSlide5 20s linear infinite", width: "max-content" }}>
                  {[...brandLogos, ...brandLogos].map((logo, i) => (
                    <div key={i} className="brand-section-5__item" style={{ marginRight: 56, flexShrink: 0 }}>
                      <Image src={logo} alt={`Partner ${i}`} width={120} height={48} style={{ objectFit: "contain" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Agency1Footer />

      <style>{`
        @keyframes agency1AboutMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes agency1BrandSlide5 { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </>
  );
}
