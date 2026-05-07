import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { agency1Services } from "@/lib/agency1/data";

export function generateStaticParams() {
  return agency1Services.map((s) => ({ handle: s.slug }));
}

export default function Agency1ServiceDetailsPage({
  params,
}: {
  params: { handle: string };
}) {
  const service = agency1Services.find((s) => s.slug === params.handle);
  if (!service) notFound();

  const others = agency1Services.filter((s) => s.slug !== params.handle).slice(0, 3);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title={service.title} subtitle="Service Detail" />

        <section className="service-details section-spacing">
          <div className="container rr-container-1800">
            <div className="row gy-5">
              {/* Main Content */}
              <div className="col-xl-8">
                <div style={{ position: "relative", height: 440, borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
                  <Image
                    src="/templates/agency1/imgs/inner/service-details/service-details-thumb1_1.jpg"
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="icon" style={{ marginBottom: 24 }}>
                  <Image src={service.icon} alt={service.title} width={64} height={64} />
                </div>
                <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, marginBottom: 20 }}>
                  {service.title}
                </h2>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
                  {service.description}
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
                  Our approach combines the latest AI research with proven engineering practices. Every
                  project begins with a thorough discovery phase — understanding your data, goals, and
                  constraints — before moving into design, development, and deployment. We don&apos;t just
                  build models; we build production systems that perform reliably in the real world.
                </p>

                <div style={{ position: "relative", height: 320, borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
                  <Image
                    src="/templates/agency1/imgs/inner/service-details/service-details-thumb1_2.jpg"
                    alt="Service details"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>What&apos;s Included</h3>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
                  {[
                    "Discovery session and AI readiness assessment",
                    "Custom solution architecture and technical roadmap",
                    "Model development, testing, and validation",
                    "Production deployment on your preferred infrastructure",
                    "Post-launch monitoring and performance reporting",
                    "Ongoing support and model retraining schedule",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12, color: "#444" }}>
                      <i className="fa-solid fa-circle-check" style={{ color: "#F14F44", marginTop: 3, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/templates/agency-1/preview/contact" className="rr-btn">
                  <span className="btn-wrap">
                    <span className="text-one">Start This Project</span>
                    <span className="text-two">Start This Project</span>
                  </span>
                </Link>
              </div>

              {/* Sidebar */}
              <div className="col-xl-4">
                <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 32, marginBottom: 32 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 20 }}>Other Services</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {others.map((s) => (
                      <li key={s.id} style={{ borderBottom: "1px solid #ddd", paddingBottom: 16, marginBottom: 16 }}>
                        <Link href={`/templates/agency-1/preview/services/${s.slug}`}
                          style={{ display: "flex", gap: 12, alignItems: "center", color: "#101010", textDecoration: "none" }}>
                          <Image src={s.icon} alt={s.title} width={36} height={36} />
                          <span style={{ fontWeight: 600 }}>{s.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/templates/agency-1/preview/services" style={{ color: "#F14F44", fontWeight: 600 }}>
                    View All Services →
                  </Link>
                </div>

                <div style={{ background: "#101010", borderRadius: 16, padding: 32, color: "#fff" }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Ready to get started?</h4>
                  <p style={{ color: "#aaa", marginBottom: 20, lineHeight: 1.7 }}>
                    Book a free 45-minute discovery call and let&apos;s explore how this service can move the needle for your business.
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
