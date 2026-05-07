"use client";

import Image from "next/image";
import Link from "next/link";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1BlogPage() {
  const { config } = useAgency1();
  const posts = config.blogPosts;
  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title="Blog & Insights" subtitle="Latest Articles" />

        <section className="rr-bg-gray section-spacing">
          <div className="container rr-container-1800">
            <div className="section-heading" style={{ marginBottom: 48 }}>
              <h3 className="title">
                Latest Insights on AI, Machine Learning, <br />
                Automation and the Future of Business
              </h3>
            </div>

            <div className="row mb-minus-30">
              {posts.map((post, i) => (
                <div key={post.id} className={i === 0 ? "col-xl-12" : "col-md-6 col-xl-4"}>
                  <div className="blog__item" style={{ display: "block", marginBottom: 30, background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
                    <div className="blog__media rr-ov-hidden" style={{ position: "relative", height: i === 0 ? 440 : 260 }}>
                      <Link href={`/templates/agency-1/preview/blog/${post.slug}`}>
                        <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                      </Link>
                      <div style={{ position: "absolute", top: 16, left: 16, background: "#F14F44", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
                        {post.category}
                      </div>
                    </div>
                    <div className="blog__content" style={{ padding: "24px 28px" }}>
                      <div className="blog__top">
                        <span style={{ fontSize: 13, color: "#999" }}>{post.date}</span>
                        <h2 className="title" style={{ margin: "12px 0", fontSize: i === 0 ? 28 : 20, fontWeight: 700, lineHeight: 1.4 }}>
                          <Link href={`/templates/agency-1/preview/blog/${post.slug}`} style={{ color: "#101010", textDecoration: "none" }}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="decs" style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>{post.excerpt}</p>
                      </div>
                      <div className="blog__bottom" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Link href={`/templates/agency-1/preview/blog/${post.slug}`} style={{ color: "#101010", fontWeight: 600, fontSize: 14 }}>
                          Read the Full Article →
                        </Link>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Image src={post.authorImage} alt={post.author} width={28} height={28} style={{ borderRadius: "50%" }} />
                          <span style={{ fontSize: 13, color: "#666" }}>{post.author}</span>
                        </div>
                      </div>
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
