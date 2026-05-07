"use client";

import Image from "next/image";
import Link from "next/link";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1TeamPage() {
  const { config } = useAgency1();
  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title="Our Team" subtitle="Meet the Experts" />

        <section className="rr-bg-gray section-spacing">
          <div className="container rr-container-1800">
            <div className="section-heading" style={{ marginBottom: 56 }}>
              <h3 className="title">
                The Minds Behind the Machine — <br />
                Experts in AI, ML, and Intelligent Systems
              </h3>
            </div>

            <div className="row mb-minus-30">
              {config.team.map((member) => (
                <div key={member.id} className="col-md-6 col-xl-4">
                  <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", marginBottom: 30, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}>
                    <div style={{ position: "relative", height: 320 }}>
                      <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "40px 24px 24px" }}>
                        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{member.name}</h3>
                        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>{member.role}</p>
                      </div>
                    </div>
                    <div style={{ padding: "24px" }}>
                      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{member.bio}</p>
                      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                        <a href={member.social.twitter} aria-label="Twitter" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}><i className="fab fa-twitter" /></a>
                        <a href={member.social.linkedin} aria-label="LinkedIn" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}><i className="fab fa-linkedin-in" /></a>
                        <a href={member.social.github} aria-label="GitHub" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}><i className="fab fa-github" /></a>
                      </div>
                      <Link href={`/templates/agency-1/preview/team/${member.slug}`}
                        style={{ fontSize: 14, color: "#F14F44", fontWeight: 600 }}>
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join team CTA */}
        <section
          className="work-section bg-img section-spacing"
          style={{ backgroundImage: "url(/templates/agency1/imgs/work/work-bg.png)" }}
        >
          <div className="container rr-container-1800" style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image src="/templates/agency1/imgs/inner/team/team-vision-thumb1_1.jpg" alt="Team vision" width={120} height={80} style={{ borderRadius: 12, marginBottom: 24 }} />
            </div>
            <h3 style={{ color: "#fff", fontSize: "clamp(28px,4vw,56px)", fontWeight: 800, marginBottom: 16 }}>
              Join the Team
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.7 }}>
              We&apos;re always looking for exceptional AI engineers, researchers, and strategists.
              If you&apos;re passionate about building AI that makes a real difference, we&apos;d love to hear from you.
            </p>
            <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
              <span className="text">See Open Roles</span>
              <span className="icon"><i className="fa-regular fa-arrow-right" /></span>
            </Link>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
