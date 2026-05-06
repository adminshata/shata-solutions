"use client";
import HeaderTwo from "@/components/templates/supermarket2/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket2/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket2/common/BackToTop";
import WishlistMain from "@/components/templates/supermarket2/wishlist/WishlistMain";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-2/preview";
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Wishlist</a>
          </div>
        </div></div></div>
      </div>
      <WishlistMain />
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
