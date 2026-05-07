import Image from "next/image";
import Link from "next/link";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";

export default function Agency1NotFound() {
  return (
    <>
      <Agency1Header />
      <main>
        <section
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px",
            background: "#F0F2F4",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 600 }}>
            <div style={{ position: "relative", width: 320, height: 220, margin: "0 auto 40px" }}>
              <Image
                src="/templates/agency1/imgs/404.png"
                alt="404 Not Found"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h1
              style={{
                fontSize: "clamp(60px, 12vw, 140px)",
                fontWeight: 900,
                lineHeight: 1,
                color: "#101010",
                marginBottom: 16,
              }}
            >
              404
            </h1>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
              Page Not Found
            </h2>
            <p
              style={{
                color: "#666",
                lineHeight: 1.7,
                marginBottom: 36,
                fontSize: 16,
              }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/templates/agency-1/preview" className="rr-btn">
                <span className="btn-wrap">
                  <span className="text-one">Back to Home</span>
                  <span className="text-two">Back to Home</span>
                </span>
              </Link>
              <Link href="/templates/agency-1/preview/contact" className="rr-btn-border">
                <span className="text">Contact Us</span>
                <span className="icon">
                  <i className="fa-regular fa-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
