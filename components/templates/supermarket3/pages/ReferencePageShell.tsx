import Link from "next/link";
import HeaderTwo from "../header/HeaderTwo";
import FooterTwo from "../footer/FooterTwo";
import BackToTop from "../common/BackToTop";

const BASE_PATH = "/templates/supermarket-3/preview";

export function ReferencePageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">{title}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="rts-section-gap">
        <div className="container">
          <div className="mb--40">
            <h1 className="title">{title}</h1>
            {subtitle && <p style={{ maxWidth: 760, fontSize: 18, lineHeight: 1.8 }}>{subtitle}</p>}
          </div>
          {children}
        </div>
      </section>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
