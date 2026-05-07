import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { agency1Team } from "@/lib/agency1/data";

export function generateStaticParams() {
  return agency1Team.map((m) => ({ slug: m.slug }));
}

export default function Agency1TeamDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const member = agency1Team.find((m) => m.slug === params.slug);
  if (!member) notFound();

  const others = agency1Team.filter((m) => m.slug !== params.slug).slice(0, 3);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title={member.name} subtitle={member.role} />

        <section className="section-spacing">
          <div className="container rr-container-1800">
            <div className="row gy-5">
              <div className="col-xl-4">
                <div style={{ position: "relative", height: 520, borderRadius: 20, overflow: "hidden", marginBottom: 24 }}>
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 24 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Connect</h4>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[{ icon: "fab fa-twitter", href: member.social.twitter }, { icon: "fab fa-linkedin-in", href: member.social.linkedin }, { icon: "fab fa-github", href: member.social.github }].map((s) => (
                      <a key={s.icon} href={s.href}
                        style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#101010", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                        <i className={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-xl-8">
                <span style={{ background: "#F14F44", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999, display: "inline-block", marginBottom: 20 }}>
                  {member.role}
                </span>
                <h2 style={{ fontSize: "clamp(28px,4vw,56px)", fontWeight: 800, marginBottom: 20 }}>{member.name}</h2>
                <p style={{ color: "#555", lineHeight: 1.8, fontSize: 17, marginBottom: 24 }}>{member.bio}</p>
                <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 32 }}>
                  With a relentless focus on measurable results, they bring both technical depth and strategic
                  clarity to every engagement. Their work spans multiple industries and consistently delivers
                  AI solutions that perform in the real world — not just in notebooks.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                  {[
                    { label: "Projects Delivered", value: "40+" },
                    { label: "Years of Experience", value: "10+" },
                    { label: "Industries Served", value: "8" },
                    { label: "Models Deployed", value: "60+" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: "#F0F2F4", borderRadius: 12, padding: "20px 24px" }}>
                      <div style={{ fontSize: 32, fontWeight: 800 }}>{stat.value}</div>
                      <div style={{ fontSize: 14, color: "#666" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/templates/agency-1/preview/contact" className="rr-btn">
                  <span className="btn-wrap">
                    <span className="text-one">Work with {member.name.split(" ")[0]}</span>
                    <span className="text-two">Work with {member.name.split(" ")[0]}</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Other team members */}
            <div style={{ marginTop: 80 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 32, fontSize: 28 }}>More Team Members</h3>
              <div className="row">
                {others.map((m) => (
                  <div key={m.id} className="col-md-4">
                    <Link href={`/templates/agency-1/preview/team/${m.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 20, background: "#F0F2F4", borderRadius: 16, marginBottom: 16 }}>
                        <Image src={m.image} alt={m.name} width={60} height={60} style={{ borderRadius: "50%", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 700, color: "#101010" }}>{m.name}</div>
                          <div style={{ fontSize: 13, color: "#666" }}>{m.role}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
