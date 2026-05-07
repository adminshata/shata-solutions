import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  bg?: string;
}

export default function Agency1Breadcrumb({
  title,
  subtitle,
  bg = "/templates/agency1/imgs/inner/breadcrumb/breadcumbbg.jpg",
}: Props) {
  return (
    <div
      className="breadcrumb1 section-bg overflow-hidden"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container rr-container-1800">
        <div style={{ padding: "120px 0 80px" }}>
          {subtitle && (
            <p style={{ color: "#aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12, fontSize: 13 }}>
              {subtitle}
            </p>
          )}
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            {title}
          </h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14, color: "#aaa" }}>
            <Link href="/templates/agency-1/preview" style={{ color: "#aaa" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
