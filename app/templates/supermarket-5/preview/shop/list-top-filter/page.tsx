import HeaderTwo from "@/components/templates/supermarket5/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket5/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket5/common/BackToTop";
import ShopMain from "@/components/templates/supermarket5/shop/ShopMain";
import { PRODUCTS } from "@/lib/supermarket5/defaults";

export default function ShopListTopFilterPage() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <section className="rts-section-gap">
        <div className="container">
          <div className="mb--30 d-flex align-items-center justify-content-between flex-wrap" style={{ gap: 16 }}>
            <h2 className="title">Shop Top Filter List</h2>
            <div className="d-flex align-items-center" style={{ gap: 12 }}>
              <button className="rts-btn btn-primary radious-sm">All</button>
              <button className="rts-btn btn-primary radious-sm">Fresh</button>
              <button className="rts-btn btn-primary radious-sm">Sale</button>
            </div>
          </div>
          <div className="row g-4">
            {PRODUCTS.slice(0, 12).map((product) => (
              <div key={product.id} className="col-lg-6">
                <div className="single-shopping-card-one list-style">
                  <ShopMain Slug={product.slug} ProductImage={product.image} ProductTitle={product.title} Price={product.price} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
