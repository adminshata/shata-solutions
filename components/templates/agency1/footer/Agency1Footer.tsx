"use client";

import Link from "next/link";
import { useAgency1 } from "@/lib/agency1/context";

function FooterLogo({ text }: { text: string }) {
  const parts = text.split(".");
  return (
    <span style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 900,
      fontSize: 26,
      letterSpacing: -0.5,
      color: "#ffffff",
      lineHeight: 1,
    }}>
      {parts[0] || text}
      {parts.length > 1 && <span style={{ color: "#F14F44" }}>.</span>}
      {parts.length > 1 ? parts.slice(1).join(".") : null}
    </span>
  );
}

export default function Agency1Footer() {
  const { config } = useAgency1();
  const f = config.footer;
  const cols = f.columns ?? [];
  return (
    <footer
      className="footer__area bg-img"
      style={{ backgroundImage: "url(/templates/agency1/imgs/work/work-bg.png)" }}
    >
      <div className="container rr-container-1800">
        <div className="footer-widget-wrapper">
          <div className="footer-widget-wrapper__top-content">
            <div className="footer-widget-wrapper__icon">
              <FooterLogo text={config.brand.logoText ?? "Shata.Agency"} />
            </div>
            <h3 className="title">
              {f.tagline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
            <div className="footer-widget-wrapper__social">
              <ul>
                <li><a href={f.social.facebook} aria-label="Facebook"><i className="fab fa-facebook-f" /></a></li>
                <li><a href={f.social.twitter} aria-label="Twitter"><i className="fab fa-twitter" /></a></li>
                <li><a href={f.social.linkedin} aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a></li>
                <li><a href={f.social.youtube} aria-label="YouTube"><i className="fab fa-youtube" /></a></li>
                <li><a href={f.social.vimeo} aria-label="Vimeo"><i className="fab fa-vimeo-v" /></a></li>
              </ul>
            </div>
          </div>

          <div className="row">
            {(cols.length ? cols : [
              { type: "contact" as const, title: "Our address", value: config.brand.address },
              { type: "contact" as const, title: "Send a message", value: config.brand.email, href: `mailto:${config.brand.email}` },
              { type: "contact" as const, title: "Call our office", value: config.brand.phone, href: `tel:${config.brand.phone}` },
              { type: "link" as const, title: "Quick links", items: [{ label: "Our Services", href: "/templates/agency-1/preview/services" }] },
            ]).slice(0, 4).map((col, idx) => (
              <div key={idx} className="col-xl-3">
                <div className="footer-widget__box">
                  <div className="footer-widget-contact">
                    <span className="sub-title">{col.title}</span>
                    {col.type === "contact" ? (
                      <h4>
                        <a href={(col.href ?? "#")}>{col.value}</a>
                      </h4>
                    ) : (
                      <div style={{ display: "grid", gap: 8 }}>
                        {(col.items ?? []).map((it) => (
                          <h4 key={it.href}>
                            <Link href={it.href}>{it.label}</Link>
                          </h4>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee text */}
      <div className="footer-widget-text-slider">
        <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
          <div
            style={{
              display: "inline-block",
              animation: "agency1Marquee 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-slide" style={{ display: "inline-block", marginRight: 40 }}>
                <h3>{f.marqueeText} {f.marqueeText}</h3>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container rr-container-1800">
        <div className="copyright-area">
          <div className="copyright-area-inner">
            <div className="copyright-text">
              <p className="text">
              {f.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes agency1Marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}
