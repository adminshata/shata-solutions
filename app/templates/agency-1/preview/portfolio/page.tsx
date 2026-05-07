"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { agency1Portfolio } from "@/lib/agency1/data";

const categories = ["All", ...Array.from(new Set(agency1Portfolio.map((p) => p.category)))];

export default function Agency1PortfolioPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? agency1Portfolio : agency1Portfolio.filter((p) => p.category === active);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title="Portfolio" subtitle="Our Work" />

        <section className="rr-bg-gray section-spacing">
          <div className="container rr-container-1800">
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: active === cat ? "#101010" : "#ddd",
                    background: active === cat ? "#101010" : "transparent",
                    color: active === cat ? "#fff" : "#666",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="row mb-minus-30">
              {filtered.map((proj) => (
                <div key={proj.id} className="col-md-6 col-xl-4">
                  <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", marginBottom: 30, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
                    <div style={{ position: "relative", height: 280 }}>
                      <Image src={proj.image} alt={proj.title} fill style={{ objectFit: "cover" }} />
                      <div style={{
                        position: "absolute", top: 16, left: 16,
                        background: "#101010", color: "#fff",
                        fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                      }}>
                        {proj.category}
                      </div>
                    </div>
                    <div style={{ padding: "24px 28px" }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
                        <Link href={`/templates/agency-1/preview/portfolio/${proj.slug}`} style={{ color: "#101010", textDecoration: "none" }}>
                          {proj.title}
                        </Link>
                      </h3>
                      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{proj.description}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                        {proj.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: 12, padding: "3px 10px", background: "#F0F2F4", borderRadius: 999, color: "#555" }}>{tag}</span>
                        ))}
                      </div>
                      <Link href={`/templates/agency-1/preview/portfolio/${proj.slug}`}
                        style={{ color: "#F14F44", fontWeight: 600, fontSize: 14 }}>
                        View Case Study →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
