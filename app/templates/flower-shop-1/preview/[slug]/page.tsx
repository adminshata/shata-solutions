import FlowerShop1Preview from "../../../../../components/templates/flowerShop1/FlowerShop1Preview";

const pageMap: Record<string, string> = {
  faq: "faq.html",
  delivery: "faq.html",
  "shop-grid": "shop-grid-full-3-col.html",
  "shop-grid-4col": "shop-grid-full-4-col.html",
  "shop-right-sidebar": "shop-grid-right-sidebar.html",
  "shop-list": "shop-list-full-width.html",
  "shop-list-left": "shop-list-left-sidebar.html",
  "shop-list-right": "shop-list-right-sidebar.html",
  "product-details": "product-details.html",
  "product-details-variable": "product-details-variable.html",
  "product-details-group": "product-details-group.html",
  "product-details-affiliate": "product-details-affiliate.html",
  "blog-left-sidebar": "blog-left-sidebar.html",
  "blog-right-sidebar": "blog-right-sidebar.html",
  "blog-details": "blog-details.html",
  "blog-details-left": "blog-details-left-sidebar.html",
  "home-2": "index-2.html",
  "home-3": "index-3.html",
  "home-4": "index-4.html",
};

export default async function FlowerShop1DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pageMap[slug] ?? "faq.html";
  return <FlowerShop1Preview page={page} title={`Shata Flowers ${slug}`} />;
}
