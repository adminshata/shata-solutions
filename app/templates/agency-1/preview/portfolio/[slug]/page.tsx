"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1PortfolioDetailsPage() {
  const { config } = useAgency1();
  const routeParams = useParams<{ slug: string }>();
  const slug = routeParams?.slug ?? "";
  const proj = config.portfolio.find((p) => p.slug === slug);
  const related = config.portfolio.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title={proj?.title ?? "Not found"} subtitle={proj?.category ?? "Portfolio"} />

        <section className="section-spacing">
          <div className="container rr-container-1800">
            <div className="row gy-5">
              {/* Main */}
              <div className="col-xl-8">
                {!proj ? (
                  <div style={{ background: "#fff", borderRadius: 16, padding: 32 }}>
                    <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Project not found</h2>
                    <p style={{ color: "#666", lineHeight: 1.7 }}>
                      This case study doesn&apos;t exist. Return to the portfolio grid.
                    </p>
                    <div style={{ marginTop: 20 }}>
                      <Link href="/templates/agency-1/preview/portfolio" style={{ color: "#F14F44", fontWeight: 700 }}>
                        ← Back to Portfolio
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ position: "relative", height: 500, borderRadius: 20, overflow: "hidden", marginBottom: 40 }}>
                      <Image src={proj.image} alt={proj.title} fill style={{ objectFit: "cover" }} />
                    </div>

                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32, padding: "24px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
                      <div><span style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>CATEGORY</span><strong>{proj.category}</strong></div>
                      <div><span style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>YEAR</span><strong>{proj.year}</strong></div>
                      <div>
                        <span style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>TAGS</span>
                        <div style={{ display: "flex", gap: 6 }}>
                          {proj.tags.map((t) => <span key={t} style={{ fontSize: 12, padding: "2px 10px", background: "#F0F2F4", borderRadius: 999 }}>{t}</span>)}
                        </div>
                      </div>
                    </div>

                    <h2 style={{ fontSize: "clamp(24px,3vw,42px)", fontWeight: 800, marginBottom: 20 }}>{proj.title}</h2>
                    <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 24 }}>{proj.description}</p>
                    <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 24 }}>
                      This project required deep integration of AI into an existing infrastructure without disrupting
                      ongoing operations. Our team followed a phased approach — starting with a read-only pilot on
                      historical data, validating model performance, then gradually increasing the scope.
                    </p>

                    <div className="row" style={{ marginBottom: 40 }}>
                      <div className="col-6">
                        <div style={{ position: "relative", height: 240, borderRadius: 12, overflow: "hidden" }}>
                          <Image src="/templates/agency1/imgs/inner/portfolio-details/portfolio-details-thumb1_1.jpg" alt="Detail 1" fill style={{ objectFit: "cover" }} />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ position: "relative", height: 240, borderRadius: 12, overflow: "hidden" }}>
                          <Image src="/templates/agency1/imgs/inner/portfolio-details/portfolio-details-thumb1_2.png" alt="Detail 2" fill style={{ objectFit: "cover" }} />
                        </div>
                      </div>
                    </div>

                    <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Key Results</h3>
                    <div className="row" style={{ marginBottom: 40 }}>
                      {[{ metric: "99.7%", label: "Accuracy" }, { metric: "60%", label: "Cost Reduction" }, { metric: "3×", label: "Faster Processing" }, { metric: "6wk", label: "Time to Deploy" }].map((r) => (
                        <div key={r.label} className="col-6 col-md-3" style={{ marginBottom: 20 }}>
                          <div style={{ textAlign: "center", padding: "20px 12px", background: "#F0F2F4", borderRadius: 12 }}>
                            <div style={{ fontSize: 36, fontWeight: 800, color: "#101010" }}>{r.metric}</div>
                            <div style={{ fontSize: 14, color: "#666" }}>{r.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href="/templates/agency-1/preview/contact" className="rr-btn">
                      <span className="btn-wrap">
                        <span className="text-one">Start a Similar Project</span>
                        <span className="text-two">Start a Similar Project</span>
                      </span>
                    </Link>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-xl-4">
                <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 20 }}>More Projects</h4>
                  {related.map((r) => (
                    <div key={r.id} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                      <div style={{ position: "relative", width: 72, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                        <Image src={r.image} alt={r.title} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>{r.category}</div>
                        <Link href={`/templates/agency-1/preview/portfolio/${r.slug}`}
                          style={{ fontWeight: 600, color: "#101010", fontSize: 14, textDecoration: "none", lineHeight: 1.4, display: "block" }}>
                          {r.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                  <Link href="/templates/agency-1/preview/portfolio" style={{ color: "#F14F44", fontWeight: 600, fontSize: 14 }}>
                    View All Projects →
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
