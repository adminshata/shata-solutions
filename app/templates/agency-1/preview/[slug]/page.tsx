"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1CustomPage() {
  const { config } = useAgency1();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const page = config.pages.find((p) => p.slug === slug && p.enabled);

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb title={page?.title ?? "Not found"} subtitle="Page" />

        <section className="rr-bg-gray section-spacing">
          <div className="container rr-container-1800">
            {!page ? (
              <div style={{ background: "#fff", borderRadius: 16, padding: 32 }}>
                <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Page not found</h2>
                <p style={{ color: "#666", lineHeight: 1.7 }}>
                  This page doesn&apos;t exist (or is disabled). Return home.
                </p>
                <div style={{ marginTop: 20 }}>
                  <Link href="/templates/agency-1/preview" style={{ color: "#F14F44", fontWeight: 700 }}>
                    ← Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 16, padding: 32 }}>
                <h2 style={{ fontWeight: 800, fontSize: 34, marginBottom: 14, color: "#101010" }}>
                  {page.title}
                </h2>
                <div style={{ color: "#666", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                  {page.content}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}

