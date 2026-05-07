"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Agency1DebugImages() {
  const sp = useSearchParams();
  const on = sp.get("debugImages") === "1";
  if (!on) return null;

  const samples = [
    "/templates/agency1/imgs/hero/hero-img-1.png",
    "/templates/agency1/imgs/about/about-icon-1.png",
    "/templates/agency1/imgs/project/project-img-1.jpg",
    "/templates/agency1/imgs/blog/blog.jpg",
  ];

  return (
    <>
      <style>{`
        /* Debug: make images obvious */
        img { outline: 2px solid #ef4444 !important; outline-offset: -2px; }
        [style*="background-image"] { outline: 2px dashed #22c55e !important; outline-offset: -2px; }
      `}</style>

      <div
        style={{
          position: "fixed",
          left: 12,
          bottom: 12,
          zIndex: 999999,
          background: "rgba(0,0,0,0.78)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          padding: 12,
          width: 420,
          maxWidth: "calc(100vw - 24px)",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Agency‑1 Image Debug
        </div>
        <div style={{ opacity: 0.85, fontSize: 12, marginTop: 6, lineHeight: 1.4 }}>
          Red outline = &lt;img&gt;. Green dashed outline = element with background-image.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 10 }}>
          {samples.map((src) => (
            <div key={src} style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", background: "#111" }}>
              <Image src={src} alt={src} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
