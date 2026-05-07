"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  "/templates/agency1/imgs/hero/hero-img-1.png",
  "/templates/agency1/imgs/hero/hero-img-2.png",
  "/templates/agency1/imgs/hero/hero-img-3.png",
];

export default function Agency1Hero() {
  const [current, setCurrent] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const prev = () => setCurrent((c) => (c === 0 ? heroSlides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === heroSlides.length - 1 ? 0 : c + 1));

  return (
    <section className="hero-section__area">
      <div className="hero-section__wrapper">
        <div className="container rr-container-1800">
          <div className="hero-section__inner">
            <div className="hero-section__box">
              <div className="number">
                <h3>7</h3>
                <h4>Years of AI Excellence</h4>
              </div>
              <div className="hero-section__client">
                <div className="media">
                  <Image src="/templates/agency1/imgs/hero/client-img-1.png" alt="client" width={40} height={40} />
                  <Image src="/templates/agency1/imgs/hero/client-img-2.png" alt="client" width={40} height={40} />
                  <Image src="/templates/agency1/imgs/hero/client-img-3.png" alt="client" width={40} height={40} />
                  <Image src="/templates/agency1/imgs/hero/client-img-4.png" alt="client" width={40} height={40} />
                </div>
                <div className="hero-section__text">
                  <h4>More than 25K <br />clients reviews</h4>
                </div>
              </div>
            </div>
            <div className="hero-section__content">
              <h2 className="title">
                Unlock the ultimate <br />
                power of AI, in your <br />
                real life
              </h2>
            </div>
          </div>

          <div className="hero-section__wrapper-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="hero-section__silad-box">
                  <div className="hero-slider-active" style={{ position: "relative", overflow: "hidden", borderRadius: 16 }}>
                    <div style={{ position: "relative", minHeight: 480 }}>
                      <Image
                        src={heroSlides[current]}
                        alt="AI Hero"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                      <div className="video__play">
                        <button
                          className="popup-video icon"
                          onClick={() => setVideoOpen(true)}
                          aria-label="Watch video"
                          style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4806 7.13176C13.1524 7.51565 13.1524 8.48435 12.4806 8.86824L1.49614 15.1451C0.829481 15.526 0 15.0446 0 14.2768V1.72318C0 0.955357 0.829482 0.47399 1.49614 0.854937L12.4806 7.13176Z" fill="#101010" />
                          </svg>
                        </button>
                        <span>WATCH VIDEO</span>
                      </div>
                    </div>
                  </div>
                  <div className="arrow">
                    <button className="rr-button-next rr-button" onClick={next} aria-label="Next slide">
                      <i className="far fa-chevron-right" />
                    </button>
                    <button className="rr-button-prev rr-button rr-button-2" onClick={prev} aria-label="Previous slide">
                      <i className="far fa-chevron-left" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="hero-section__card">
                  <div className="sub-title">
                    <span />
                    <h3>ABOUT US</h3>
                  </div>
                  <h2 className="title">
                    <Link href="/templates/agency-1/preview/about">
                      Startup agency, providing AI <br />
                      service worldwide since 2018
                    </Link>
                  </h2>
                  <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
                    <span className="text">CONTACT US TODAY</span>
                    <span className="icon">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#h1)">
                          <path d="M22.0004 10.9995C16.6011 10.9995 12.2227 6.07534 12.2227 -0.00044632" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M12.2227 21.9995C12.2227 15.9253 16.5997 10.9995 22.0004 10.9995" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M22.0005 10.9995H0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" />
                        </g>
                        <defs><clipPath id="h1"><rect width="22" height="22" fill="white" /></clipPath></defs>
                      </svg>
                    </span>
                  </Link>
                </div>
                <div
                  className="hero-section__card card-2"
                  style={{ backgroundImage: "url(/templates/agency1/imgs/hero/hero-img-3.png)", backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="sub-title">
                    <span />
                    <h3>ABOUT US</h3>
                  </div>
                  <h2 className="title">
                    <Link href="/templates/agency-1/preview/about">
                      Startup agency, providing AI <br />
                      service worldwide since 2018
                    </Link>
                  </h2>
                  <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
                    <span className="text">CONTACT US TODAY</span>
                    <span className="icon">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#h2)">
                          <path d="M22.0004 10.9995C16.6011 10.9995 12.2227 6.07534 12.2227 -0.00044632" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M12.2227 21.9995C12.2227 15.9253 16.5997 10.9995 22.0004 10.9995" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M22.0005 10.9995H0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" />
                        </g>
                        <defs><clipPath id="h2"><rect width="22" height="22" fill="white" /></clipPath></defs>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {videoOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setVideoOpen(false)}
        >
          <div style={{ width: "min(800px,90vw)", aspectRatio: "16/9", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/8oON21G1Bqg?autoplay=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: "none", borderRadius: 12 }}
            />
            <button
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              style={{
                position: "absolute", top: -40, right: 0, background: "none", border: "none",
                color: "white", fontSize: 28, cursor: "pointer",
              }}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
