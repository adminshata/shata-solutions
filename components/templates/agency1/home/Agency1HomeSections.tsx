"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  agency1Services,
  agency1Portfolio,
  agency1Testimonials,
  agency1WorkProcess,
  agency1Blog,
} from "@/lib/agency1/data";

/* ── About Section ──────────────────────────────────────────── */
const aboutItems = [
  { icon: "/templates/agency1/imgs/about/about-icon-1.png", title: "Advanced AI Technology", desc: "We harness the latest AI research and production-grade tooling to build systems that deliver real-world results at scale." },
  { icon: "/templates/agency1/imgs/about/about-icon-2.png", title: "Tailored Solutions", desc: "No two clients are the same. Every solution we build is designed around your specific data, workflows, and business goals." },
  { icon: "/templates/agency1/imgs/about/about-icon-3.png", title: "Cutting-Edge Technology", desc: "From transformer models to reinforcement learning, we deploy the most powerful and appropriate AI tools for your use case." },
  { icon: "/templates/agency1/imgs/about/about-icon-4.png", title: "Modern Development", desc: "Our engineering team follows best-in-class practices — version control, CI/CD, model monitoring, and clean, maintainable code." },
];

export function Agency1About() {
  return (
    <section className="about-section-area">
      <div className="about-section-wrapper rr-bg-gray section-spacing">
        <div className="container rr-container-1800">
          <div className="section-heading">
            <div className="shape">
              <Image src="/templates/agency1/imgs/about/about-shape-1.png" alt="shape" width={40} height={40} />
            </div>
            <h3 className="title">
              We&apos;re a full-service AI automation agency, helping <br />
              businesses unlock their full potential with cutting-edge <br />
              artificial intelligence — from smart process automation <br />
              to predictive analytics.
            </h3>
          </div>
          <div className="row mb-minus-30">
            {aboutItems.map((item) => (
              <div key={item.title} className="col-md-6 col-xl-3">
                <div className="about-section-item">
                  <div className="icon">
                    <Image src={item.icon} alt={item.title} width={60} height={60} />
                  </div>
                  <div className="about-section-content">
                    <h2 className="title"><a href="#">{item.title}</a></h2>
                    <p className="decs">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Text Marquee ───────────────────────────────────────────── */
export function Agency1TextSlider() {
  return (
    <section className="text-slider-area rr-bg-gray section-spacing">
      <div className="text-slider-box">
        <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-block", animation: "agency1TextSlide 25s linear infinite" }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-slider-content" style={{ display: "inline-block", marginRight: 80 }}>
                <h4 className="text">Artificial Intelligence in shaping the future of technology</h4>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes agency1TextSlide { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </section>
  );
}

/* ── Services Section ───────────────────────────────────────── */
const ArrowSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#sv1)">
      <path d="M23.2462 7.96119C19.4712 11.8214 12.8893 11.509 8.54541 7.26099" stroke="#F0F2F4" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M24.2746 22.6428C19.9319 18.3959 19.4704 11.8225 23.2465 7.96124" stroke="#F0F2F4" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M23.2465 7.96117L7.86475 23.6902" stroke="#F0F2F4" strokeWidth="2" strokeMiterlimit="10" />
    </g>
    <defs><clipPath id="sv1"><rect width="32" height="32" fill="white" /></clipPath></defs>
  </svg>
);

export function Agency1Services() {
  const displayed = agency1Services.slice(0, 3);
  return (
    <section className="service-section">
      <div className="service-section__wrapper rr-bg-gray section-spacing">
        <div className="container rr-container-1800">
          <div className="service-section__info">
            <h4 className="title">
              Designing Tomorrow: AI-Powered Creativity for <br />
              Future Innovations and Intelligent Solutions that <br />
              Drive Transformative Growth at Every Step
            </h4>
            <Link href="/templates/agency-1/preview/services" className="rr-btn-border">
              <span className="text">VIEW ALL SERVICES</span>
              <span className="icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#sv2)"><path d="M22.0007 10.9995C16.6014 10.9995 12.2229 6.0753 12.2229 -0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /><path d="M12.2229 21.9995C12.2229 15.9253 16.5999 10.9995 22.0007 10.9995" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /><path d="M22.0005 10.9995H0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /></g>
                  <defs><clipPath id="sv2"><rect width="22" height="22" fill="white" /></clipPath></defs>
                </svg>
              </span>
            </Link>
          </div>
          <div className="row mb-minus-30">
            {displayed.map((svc) => (
              <div key={svc.id} className="col-lg-6 col-xxl-4">
                <div className="service-section__wrap">
                  <div className="logo">
                    <Image src={svc.icon} alt={svc.title} width={56} height={56} />
                  </div>
                  <div className="service-section__item">
                    <div className="number"><span>{svc.number}</span></div>
                    <div className="content">
                      <h3 className="title">
                        <Link href={`/templates/agency-1/preview/services/${svc.slug}`}>{svc.title}</Link>
                      </h3>
                      <p className="decs">{svc.description}</p>
                    </div>
                    <div className="service-section__bottom">
                      <div className="icon">
                        <Link className="project-btn" href={`/templates/agency-1/preview/services/${svc.slug}`}>
                          <ArrowSVG />
                        </Link>
                      </div>
                      <span className="dot" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Work Process Section ───────────────────────────────────── */
export function Agency1WorkProcess() {
  return (
    <section
      className="work-section bg-img"
      style={{ backgroundImage: "url(/templates/agency1/imgs/work/work-bg.png)" }}
    >
      <div className="work-section__wrapper">
        <div className="container rr-container-1800">
          <div className="row">
            <div className="col-xl-6">
              <div className="work-section__wrap">
                <div className="section-heading">
                  <h3 className="title">
                    Our Process for Smarter AI Solutions <br />
                    That Drive Innovation, Efficiency, and <br />
                    Business Growth at Every Step
                  </h3>
                </div>
                <div className="icon-shape">
                  <Image src="/templates/agency1/imgs/project/workt-logo.png" alt="icon" width={60} height={60} />
                </div>
                <div className="work-section__thumb rr-ov-hidden" style={{ position: "relative", minHeight: 340 }}>
                  <Image
                    src="/templates/agency1/imgs/project/workt-img-1.jpg"
                    alt="Work"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <Link href="/templates/agency-1/preview/contact" className="rr-btn-border" style={{ position: "absolute", bottom: 24, left: 24, zIndex: 2 }}>
                    <span className="text">CONTACT US TODAY</span>
                    <span className="icon">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#wp1)"><path d="M22.0007 10.9995C16.6014 10.9995 12.2229 6.0753 12.2229 -0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /><path d="M12.2229 21.9995C12.2229 15.9253 16.5999 10.9995 22.0007 10.9995" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /><path d="M22.0005 10.9995H0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /></g>
                        <defs><clipPath id="wp1"><rect width="22" height="22" fill="white" /></clipPath></defs>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-1" />
            <div className="col-xl-5">
              <div className="work-section__item-box">
                {agency1WorkProcess.map((step) => (
                  <div key={step.step} className="work-section__item">
                    <div className="work-section__number"><span>{step.step}</span></div>
                    <div className="work-section__content">
                      <h3 className="title">{step.title}</h3>
                      <p className="decs">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Portfolio / Projects Section ───────────────────────────── */
const ArrowWhiteSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#aw1)">
      <path d="M23.2462 7.96095C19.4712 11.8212 12.8893 11.5088 8.54541 7.26074" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M24.2744 22.6425C19.9316 18.3956 19.4702 11.8223 23.2462 7.96099" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M23.2463 7.96093L7.8645 23.6899" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
    </g>
    <defs><clipPath id="aw1"><rect width="32" height="32" fill="white" /></clipPath></defs>
  </svg>
);

export function Agency1Portfolio() {
  const featured = agency1Portfolio.slice(0, 4);
  const images = [
    "/templates/agency1/imgs/project/project-img-1.jpg",
    "/templates/agency1/imgs/project/project-img-2.jpg",
    "/templates/agency1/imgs/project/project-img-1.jpg",
  ];

  return (
    <section className="project-section rr-bg-gray section-spacing">
      <div className="container rr-container-1800">
        <div className="section-heading">
          <h3 className="title">
            Real Projects. Real Impact. Real Intelligence. Powered <br />
            by AI for Scalable, Smart Business Growth
          </h3>
        </div>
        <div className="project-section__wrapper">
          {/* image-card alternating */}
          {featured.map((proj, i) => (
            i % 2 === 0 ? (
              <>
                <div key={`img-${proj.id}`} className="project-section__thumb rr-ov-hidden" style={{ position: "relative", minHeight: 360 }}>
                  <Image src={images[Math.floor(i / 2) % images.length]} alt={proj.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div key={proj.id} className="project-section__card">
                  <div className="icon">
                    <Link className="project-btn" href={`/templates/agency-1/preview/portfolio/${proj.slug}`}>
                      <ArrowWhiteSVG />
                    </Link>
                  </div>
                  <div className="project-section__content">
                    <h4 className="sub-title">{proj.category}</h4>
                    <h2 className="title">{proj.title}</h2>
                    <p className="decs">{proj.description}</p>
                    <span className="date">{proj.year}</span>
                  </div>
                </div>
              </>
            ) : (
              <div key={proj.id} className="project-section__card">
                <div className="icon">
                  <Link className="project-btn" href={`/templates/agency-1/preview/portfolio/${proj.slug}`}>
                    <ArrowWhiteSVG />
                  </Link>
                </div>
                <div className="project-section__content">
                  <h4 className="sub-title">{proj.category}</h4>
                  <h2 className="title">{proj.title}</h2>
                  <p className="decs">{proj.description}</p>
                  <span className="date">{proj.year}</span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Video CTA Section ──────────────────────────────────────── */
export function Agency1VideoSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="video-section__area rr-ov-hidden">
      <div
        className="video-section__bg"
        style={{ backgroundImage: "url(/templates/agency1/imgs/video/video-banner-img.png)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container rr-container-1800">
          <div className="video-section__wrapper">
            <div className="row">
              <div className="col-xl-6 col-xxl-8">
                <div className="video-section__content">
                  <h3 className="title">
                    An award-winning AI agency and <br />
                    intelligent solutions partner, <br />
                    established in 2018
                  </h3>
                  <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
                    <span className="text">CONTACT US TODAY</span>
                    <span className="icon">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#vs1)">
                          <path d="M22.0004 10.9995C16.6011 10.9995 12.2227 6.0753 12.2227 -0.000488281" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M12.2227 21.9995C12.2227 15.9253 16.5997 10.9995 22.0004 10.9995" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                          <path d="M22.0005 10.9995H0.000488281" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                        </g>
                        <defs><clipPath id="vs1"><rect width="22" height="22" fill="white" /></clipPath></defs>
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-xxl-4">
                <div className="video-section__card">
                  <div className="video-section__play">
                    <button
                      className="popup-video icon"
                      onClick={() => setVideoOpen(true)}
                      aria-label="Play video"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5577 13.7577C23.1474 13.421 23.1474 12.579 22.5577 12.2423L1.32692 0.118527C0.737178 -0.218244 0 0.20272 0 0.876261V25.1237C0 25.7973 0.73718 26.2182 1.32692 25.8815L22.5577 13.7577Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="title">
                    We believe AI can transform <br />
                    the world and we are here to <br />
                    lead that change.
                  </h3>
                  <div className="video-section__list">
                    <ul>
                      {["Smart. Scalable. Reliable.", "AI Built for Impact", "Solutions That Grow with You", "Human-Centered Innovation"].map((item) => (
                        <li key={item}>
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="12.4307" x2="10.3448" y2="12.4307" stroke="#101010" /><line x1="14.6553" y1="12.4307" x2="25.0001" y2="12.4307" stroke="#101010" /><line x1="12.4312" y1="10.3447" x2="12.4312" y2="-0.000101089" stroke="#101010" /><line x1="12.4312" y1="25" x2="12.4312" y2="14.6552" stroke="#101010" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {videoOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setVideoOpen(false)}
        >
          <div style={{ width: "min(800px,90vw)", aspectRatio: "16/9", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8oON21G1Bqg?autoplay=1" allow="autoplay; encrypted-media" allowFullScreen style={{ border: "none", borderRadius: 12 }} />
            <button onClick={() => setVideoOpen(false)} style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: "white", fontSize: 28, cursor: "pointer" }}>
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Testimonials Section ───────────────────────────────────── */
const QuoteSVG = () => (
  <svg width="56" height="45" viewBox="0 0 56 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.9011 3.2086L21.8691 0C7.81039 9.70536 0 21.4976 0 31.203C0 40.5875 6.7182 45 12.4192 45C19.6048 45 24.6809 38.7419 24.6809 32.1656C24.6809 26.6314 21.2443 21.8981 16.6356 20.1321C15.3084 19.6495 14.0587 19.2491 14.0587 16.9234C14.0587 13.9561 16.1682 9.54621 23.9011 3.2086ZM54.9078 3.2086L52.8758 0C38.9721 9.70536 31.0067 21.4976 31.0067 31.203C31.0067 40.5875 37.8799 45 43.5808 45C50.8439 45 56 38.7419 56 32.1656C56 26.6314 52.4859 21.8981 47.7197 20.1321C46.3926 19.6495 45.2204 19.2491 45.2204 16.9234C45.2204 13.9561 47.4073 9.54364 54.9053 3.20604L54.9078 3.2086Z" fill="#F14F44" />
  </svg>
);

export function Agency1Testimonials() {
  return (
    <section className="testimonials-section pin-area-3">
      <div className="testimonials-section-wrapper section-spacing-top">
        <div className="container rr-container-1800">
          <div className="section-heading pin-element_3">
            <h3 className="title">
              User Stories: Hear What Others Love About <br />
              Our Shata Agency One and How It Transformed <br />
              Their Business
            </h3>
          </div>
          <div className="testimonials-wrapper-box">
            {agency1Testimonials.map((t) => (
              <div key={t.id} className="testimonials-item">
                <div className="icon"><QuoteSVG /></div>
                <div className="testimonials-content">
                  <p className="decs">{t.quote}</p>
                </div>
                <div className="testimonials-author">
                  <div className="author-thumb">
                    <Image src={t.avatar} alt={t.author} width={52} height={52} />
                  </div>
                  <div className="author-content">
                    <h3 className="name">{t.author}</h3>
                    <p className="decs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA / Features Section ─────────────────────────────────── */
export function Agency1CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section className="features-section rr-bg-gray section-spacing-top">
      <div className="container rr-container-1800">
        <div className="features-section__wrapper">
          <div className="features-section__thumb rr-ov-hidden" style={{ position: "relative", minHeight: 480 }}>
            <Image
              src="/templates/agency1/imgs/project/features-2.png"
              alt="AI Features"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="features-section__item">
              <div className="content">
                <h3 className="title">
                  Turn Your Concepts <br />
                  Into Reality — Start the <br />
                  Conversation
                </h3>
                <p className="decs">
                  Have an idea? Let&apos;s turn it into something real. Share your vision <br />
                  and we&apos;ll help bring it to life with smart, innovative, efficient, and <br />
                  tailored AI solutions.
                </p>
              </div>
              <div className="features-section__form">
                {submitted ? (
                  <p style={{ color: "#fff", fontWeight: 600 }}>Thank you! We&apos;ll be in touch.</p>
                ) : (
                  <form onSubmit={handleSubmit} className="ts-subscribe-form">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="rr-btn-border">
                      <span className="text">Sign Up Now</span>
                      <span className="icon">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#cta1)">
                            <path d="M22.0004 10.9995C16.6011 10.9995 12.2227 6.0753 12.2227 -0.000488281" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                            <path d="M12.2227 21.9995C12.2227 15.9253 16.5997 10.9995 22.0004 10.9995" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                            <path d="M22.0005 10.9995H0.000488281" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                          </g>
                          <defs><clipPath id="cta1"><rect width="22" height="22" fill="white" /></clipPath></defs>
                        </svg>
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Brand Logos ────────────────────────────────────────────── */
const brandLogos = [
  "/templates/agency1/imgs/band/band-shape-1.png",
  "/templates/agency1/imgs/band/band-shape-2.png",
  "/templates/agency1/imgs/band/band-shape-4.png",
  "/templates/agency1/imgs/band/band-shape-5.png",
  "/templates/agency1/imgs/band/band-shape-1.png",
  "/templates/agency1/imgs/band/band-shape-2.png",
];

export function Agency1Brands() {
  return (
    <section className="brand__area rr-bg-gray section-spacing">
      <div className="container rr-container-1800">
        <div className="section-heading">
          <h3 className="title">
            100+ backers with our amazing team driving <br />
            innovation, trust, and results
          </h3>
        </div>
        <div className="brand__item-wrapper">
          <div className="brand__item-box">
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", animation: "agency1BrandSlide 18s linear infinite", width: "max-content" }}>
                {[...brandLogos, ...brandLogos].map((logo, i) => (
                  <div key={i} className="brand__item" style={{ marginRight: 48, flexShrink: 0 }}>
                    <Image src={logo} alt={`Brand ${i}`} width={100} height={40} style={{ objectFit: "contain" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes agency1BrandSlide { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </section>
  );
}

/* ── Blog Section ───────────────────────────────────────────── */
export function Agency1Blog() {
  const [current, setCurrent] = useState(0);
  const displayed = agency1Blog.slice(0, 4);

  return (
    <section className="blog">
      <div className="blog__inner">
        <div className="container rr-container-1800">
          <div className="service-section__info">
            <h4 className="title">
              Latest Insights: How AI is powering the next <br />
              generation of business innovation and digital <br />
              transformation
            </h4>
            <Link href="/templates/agency-1/preview/blog" className="rr-btn-border">
              <span className="text">VIEW ALL POSTS</span>
              <span className="icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#bl1)"><path d="M22.0007 10.9995C16.6014 10.9995 12.2229 6.0753 12.2229 -0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /><path d="M12.2229 21.9995C12.2229 15.9253 16.5999 10.9995 22.0007 10.9995" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /><path d="M22.0005 10.9995H0.000488281" stroke="#101010" strokeWidth="2" strokeMiterlimit="10" /></g>
                  <defs><clipPath id="bl1"><rect width="22" height="22" fill="white" /></clipPath></defs>
                </svg>
              </span>
            </Link>
          </div>
          <div className="blog__wrapper">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
              {displayed.slice(current, current + 2).map((post) => (
                <div key={post.id} className="blog__item">
                  <div className="blog__media rr-ov-hidden" style={{ position: "relative", height: 280 }}>
                    <Link href={`/templates/agency-1/preview/blog/${post.slug}`}>
                      <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                    </Link>
                  </div>
                  <div className="blog__content">
                    <div className="blog__top">
                      <span>{post.date}</span>
                      <h2 className="title">
                        <Link href={`/templates/agency-1/preview/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="decs">{post.excerpt}</p>
                    </div>
                    <div className="blog__bottom">
                      <Link href={`/templates/agency-1/preview/blog/${post.slug}`}>Read the Full Article</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {[0, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Blog page ${i / 2 + 1}`}
                  style={{
                    width: 10, height: 10, borderRadius: "50%", border: "none", cursor: "pointer",
                    background: current === i ? "#101010" : "#ccc",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
