"use client";

import { useState } from "react";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";
import Link from "next/link";

export default function Agency1FAQPage() {
  const { config } = useAgency1();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title="FAQ" subtitle="Frequently Asked Questions" />

        <section className="rr-bg-gray section-spacing">
          <div className="container rr-container-1800">
            <div className="section-heading" style={{ marginBottom: 56 }}>
              <h3 className="title">
                Everything You Need to Know <br />
                About Working with Shata Agency One
              </h3>
            </div>

            <div className="row">
              <div className="col-xl-8">
                <div>
                  {config.faqs.map((faq, i) => (
                    <div
                      key={faq.id}
                      style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 12,
                        overflow: "hidden",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      <button
                        onClick={() => setOpenIdx(openIdx === i ? null : i)}
                        style={{
                          width: "100%",
                          padding: "22px 28px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          gap: 16,
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: 17, color: "#101010", lineHeight: 1.4 }}>
                          {faq.question}
                        </span>
                        <span style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: openIdx === i ? "#101010" : "#F0F2F4",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, transition: "all 0.2s",
                        }}>
                          <i
                            className={`fas fa-${openIdx === i ? "minus" : "plus"}`}
                            style={{ fontSize: 12, color: openIdx === i ? "#fff" : "#101010" }}
                          />
                        </span>
                      </button>

                      {openIdx === i && (
                        <div style={{ padding: "0 28px 24px" }}>
                          <p style={{ color: "#555", lineHeight: 1.8, fontSize: 15 }}>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-xl-4">
                <div style={{ background: "#101010", borderRadius: 20, padding: "40px 32px", color: "#fff", position: "sticky", top: 100 }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>
                    <i className="fa-solid fa-circle-question" style={{ color: "#F14F44" }} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>
                    Still have questions?
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>
                    Our team is happy to help. Reach out and we&apos;ll respond within one business day.
                  </p>
                  <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
                    <span className="text">Ask Us Anything</span>
                    <span className="icon"><i className="fa-regular fa-arrow-right" /></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
