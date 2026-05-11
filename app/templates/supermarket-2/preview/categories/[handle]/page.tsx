"use client";
import HeaderTwo from "@/components/templates/supermarket2/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket2/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket2/common/BackToTop";
import ShopMain from "@/components/templates/supermarket2/shop/ShopMain";
import { PRODUCTS } from "@/lib/supermarket2/defaults";
import type { Product } from "@/lib/supermarket2/types";
import Link from "next/link";
import { useParams } from "next/navigation";

const BASE_PATH = "/templates/supermarket-2/preview";

export default function CategoryPage() {
  const params = useParams<{ handle: string }>();
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Category: {params.handle}</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-shop-section rts-section-gap bg_light-1">
        <div className="container">
          <div className="row g-4">
            {PRODUCTS.slice(0, 9).map((product: Product, i: number) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="single-shopping-card-one">
                  <ShopMain Slug={product.slug} ProductImage={product.image} ProductTitle={product.title} Price={product.price} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
