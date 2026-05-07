import Link from "next/link";

function FooterLogo() {
  return (
    <span style={{
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeight: 900,
      fontSize: 26,
      letterSpacing: -0.5,
      color: "#ffffff",
      lineHeight: 1,
    }}>
      Shata<span style={{ color: "#F14F44" }}>.</span>Agency
    </span>
  );
}

export default function Agency1Footer() {
  return (
    <footer
      className="footer__area bg-img"
      style={{ backgroundImage: "url(/templates/agency1/imgs/work/work-bg.png)" }}
    >
      <div className="container rr-container-1800">
        <div className="footer-widget-wrapper">
          <div className="footer-widget-wrapper__top-content">
            <div className="footer-widget-wrapper__icon">
              <FooterLogo />
            </div>
            <h3 className="title">
              Collaborate with our creative team to make <br />
              your project shine with unmatched intelligence.
            </h3>
            <div className="footer-widget-wrapper__social">
              <ul>
                <li><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a></li>
                <li><a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a></li>
                <li><a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a></li>
                <li><a href="#" aria-label="Vimeo"><i className="fab fa-vimeo-v" /></a></li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-3">
              <div className="footer-widget__box">
                <div className="footer-widget-contact">
                  <span className="sub-title">Our address</span>
                  <h4><a href="#">25 Elm Drive, Riverside, TX</a></h4>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="footer-widget__box">
                <div className="footer-widget-contact">
                  <span className="sub-title">Send a message</span>
                  <h4><a href="mailto:hello@shataagencyone.com">hello@shataagencyone.com</a></h4>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="footer-widget__box">
                <div className="footer-widget-contact">
                  <span className="sub-title">Call our office</span>
                  <h4><a href="tel:+17627680763">+1 (762) 768 0763</a></h4>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="footer-widget__box">
                <div className="footer-widget-contact">
                  <span className="sub-title">Quick links</span>
                  <h4>
                    <Link href="/templates/agency-1/preview/services">Our Services</Link>
                  </h4>
                </div>
              </div>
            </div>
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
                <h3>Work with us &ndash; Let&apos;s Chat &ndash; Work with us &ndash; Let&apos;s Chat &ndash;</h3>
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
                Copyright &copy; <a href="#">Shata Solutions</a> 2025. All rights reserved.
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
