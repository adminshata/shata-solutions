import Pharmacy1Preview from "../../../../../components/templates/pharmacy1/Pharmacy1Preview";

const pageMap: Record<string, string> = {
  faq: "faq.html",
  history: "history.html",
  locations: "locations.html",
  service: "service.html",
  services: "service.html",
  "service-details": "service-details.html",
  portfolio: "portfolio.html",
  projects: "portfolio.html",
  "portfolio-2": "portfolio-2.html",
  "portfolio-details": "portfolio-details.html",
  team: "team.html",
  "team-details": "team-details.html",
  "blog-grid": "blog-grid.html",
  "blog-left-sidebar": "blog-left-sidebar.html",
  "blog-right-sidebar": "blog-right-sidebar.html",
  "shop-grid": "shop-grid.html",
  "shop-left-sidebar": "shop-left-sidebar.html",
  "shop-right-sidebar": "shop-right-sidebar.html",
  "order-tracking": "order-tracking.html",
  "coming-soon": "coming-soon.html",
};

export default async function Pharmacy1DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pageMap[slug] ?? "404.html";
  return <Pharmacy1Preview page={page} title={`Shata Pharmacy ${slug}`} />;
}
