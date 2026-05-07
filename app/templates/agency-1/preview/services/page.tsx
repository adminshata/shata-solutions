"use client";

import Image from "next/image";
import Link from "next/link";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

const ArrowSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#sv_svc)">
      <path d="M23.2462 7.96119C19.4712 11.8214 12.8893 11.509 8.54541 7.26099" stroke="#F0F2F4" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M24.2746 22.6428C19.9319 18.3959 19.4704 11.8225 23.2465 7.96124" stroke="#F0F2F4" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M23.2465 7.96117L7.86475 23.6902" stroke="#F0F2F4" strokeWidth="2" strokeMiterlimit="10" />
    </g>
    <defs><clipPath id="sv_svc"><rect width="32" height="32" fill="white" /></clipPath></defs>
  </svg>
);

export default function Agency1ServicesPage() {
  const { config } = useAgency1();
  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title="Our Services" subtitle="What We Offer" />

        {/* Services intro */}
        <section className="service-section">
          <div className="service-section__wrapper rr-bg-gray section-spacing">
            <div className="container rr-container-1800">
              <div className="service-section__info" style={{ marginBottom: 60 }}>
                <h4 className="title">
                  AI Solutions Designed for Your Business — <br />
                  From Strategy to Full Deployment
                </h4>
                <p style={{ maxWidth: 520, color: "#666", lineHeight: 1.7 }}>
                  We combine deep technical expertise with strategic thinking to deliver AI systems that
                  create lasting competitive advantage.
                </p>
              </div>

              <div className="row mb-minus-30">
                {config.services.map((svc) => (
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

        {/* How We Work */}
        <section
          className="work-section bg-img section-spacing"
          style={{ backgroundImage: "url(/templates/agency1/imgs/work/work-bg.png)" }}
        >
          <div className="container rr-container-1800">
            <div className="section-heading" style={{ marginBottom: 48 }}>
              <h3 className="title">Every Service Delivered with Precision, Transparency, and Impact</h3>
            </div>
            <div className="row">
              {[
                { icon: "fa-solid fa-magnifying-glass-chart", label: "Discovery & Scoping", desc: "We define the problem, map your data, and assess AI readiness before writing a single line of code." },
                { icon: "fa-solid fa-gears", label: "Build & Iterate", desc: "Agile sprints with demos every two weeks. You see progress and can shape direction throughout." },
                { icon: "fa-solid fa-chart-line", label: "Deploy & Monitor", desc: "We ship production-ready models with full observability — monitoring, alerts, and retraining pipelines." },
                { icon: "fa-solid fa-handshake", label: "Ongoing Support", desc: "Retainer support plans keep your AI performing at peak. We evolve the system as your business grows." },
              ].map((item) => (
                <div key={item.label} className="col-md-6 col-xl-3">
                  <div style={{ padding: "32px 24px", background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", height: "100%" }}>
                    <i className={item.icon} style={{ fontSize: 32, color: "#F14F44", marginBottom: 16, display: "block" }} />
                    <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>{item.label}</h4>
                    <p style={{ color: "#aaa", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rr-bg-gray section-spacing">
          <div className="container rr-container-1800" style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, marginBottom: 24 }}>
              Ready to Start Your AI Journey?
            </h3>
            <p style={{ color: "#666", maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Book a free 45-minute discovery call. We&apos;ll assess your use case and provide an honest
              recommendation — no obligation.
            </p>
            <Link href="/templates/agency-1/preview/contact" className="rr-btn">
              <span className="btn-wrap">
                <span className="text-one">Book Discovery Call</span>
                <span className="text-two">Book Discovery Call</span>
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
