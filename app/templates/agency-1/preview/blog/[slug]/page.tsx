"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1BlogDetailsPage() {
  const { config } = useAgency1();
  const routeParams = useParams<{ slug: string }>();
  const slug = routeParams?.slug ?? "";
  const post = config.blogPosts.find((p) => p.slug === slug);
  const related = config.blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title={post?.title ?? "Not found"} subtitle={post?.category ?? "Blog"} />

        <section className="section-spacing">
          <div className="container rr-container-1800">
            <div className="row gy-5">
              {/* Main Content */}
              <div className="col-xl-8">
                {!post ? (
                  <div style={{ background: "#fff", borderRadius: 16, padding: 32 }}>
                    <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Post not found</h2>
                    <p style={{ color: "#666", lineHeight: 1.7 }}>
                      This post doesn&apos;t exist (or is disabled). Go back to the blog list.
                    </p>
                    <div style={{ marginTop: 20 }}>
                      <Link href="/templates/agency-1/preview/blog" style={{ color: "#F14F44", fontWeight: 700 }}>
                        ← Back to Blog
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Image src={post.authorImage} alt={post.author} width={40} height={40} style={{ borderRadius: "50%" }} />
                        <span style={{ fontWeight: 600 }}>{post.author}</span>
                      </div>
                      <span style={{ color: "#999" }}>{post.date}</span>
                      <span style={{ background: "#F14F44", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>{post.category}</span>
                    </div>

                    <div style={{ position: "relative", height: 480, borderRadius: 20, overflow: "hidden", marginBottom: 40 }}>
                      <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                    </div>

                    <article>
                      <p style={{ fontSize: 18, lineHeight: 1.8, color: "#444", marginBottom: 24 }}>{post.excerpt}</p>
                      <p style={{ lineHeight: 1.8, color: "#555", marginBottom: 24 }}>{post.content}</p>

                      <div style={{ position: "relative", height: 320, borderRadius: 16, overflow: "hidden", margin: "32px 0" }}>
                        <Image src="/templates/agency1/imgs/inner/blog-details/blog-details-thumb1_3.jpg" alt="Blog detail" fill style={{ objectFit: "cover" }} />
                      </div>

                      <h3 style={{ fontSize: 24, fontWeight: 700, margin: "32px 0 16px" }}>The Path Forward</h3>
                      <p style={{ lineHeight: 1.8, color: "#555", marginBottom: 24 }}>
                        As AI capabilities continue to expand, organizations that invest now in building the right
                        data infrastructure, team capabilities, and AI governance frameworks will be the ones that
                        realize sustainable competitive advantage. The window is open — but it won&apos;t stay open
                        indefinitely.
                      </p>
                      <p style={{ lineHeight: 1.8, color: "#555" }}>
                        The best place to start is with a clearly defined problem and a realistic assessment of
                        your data maturity. From there, a focused pilot project can demonstrate value in weeks
                        and build organizational confidence for larger investments.
                      </p>
                    </article>

                    {/* Author card */}
                    <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 32, marginTop: 48, display: "flex", gap: 20, alignItems: "flex-start" }}>
                      <Image src={post.authorImage} alt={post.author} width={72} height={72} style={{ borderRadius: "50%", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>Written by</div>
                        <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{post.author}</h4>
                        <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>
                          AI specialist at Shata AI Agency. Writes about machine learning, AI strategy, and the
                          future of intelligent automation.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-xl-4">
                {/* Recent posts */}
                <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 20 }}>Recent Posts</h4>
                  {related.map((r) => (
                    <div key={r.id} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
                      <div style={{ position: "relative", width: 72, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                        <Image src={r.image} alt={r.title} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>{r.date}</div>
                        <Link href={`/templates/agency-1/preview/blog/${r.slug}`}
                          style={{ fontWeight: 600, color: "#101010", fontSize: 14, textDecoration: "none", lineHeight: 1.4, display: "block" }}>
                          {r.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Categories */}
                <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Categories</h4>
                  {["AI Trends", "Machine Learning", "Automation", "Computer Vision", "NLP", "Strategy"].map((cat) => (
                    <div key={cat} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
                      <span style={{ color: "#555", fontSize: 14 }}>{cat}</span>
                      <i className="fa-regular fa-arrow-right" style={{ color: "#F14F44" }} />
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ background: "#101010", borderRadius: 16, padding: 32, color: "#fff" }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Ready to transform your business with AI?</h4>
                  <p style={{ color: "#aaa", marginBottom: 20, lineHeight: 1.7, fontSize: 14 }}>
                    Book a free discovery call and explore what AI can do for your organization.
                  </p>
                  <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
                    <span className="text">Contact Us</span>
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
