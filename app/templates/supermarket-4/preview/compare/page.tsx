"use client";
import HeaderTwo from "@/components/templates/supermarket4/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket4/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket4/common/BackToTop";
import CompareElements from "@/components/templates/supermarket4/compare/CompareElements";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-4/preview";
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Compare</a>
          </div>
        </div></div></div>
      </div>
      <CompareElements />
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
