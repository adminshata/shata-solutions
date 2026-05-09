"use client";

import { useParams } from "next/navigation";
import Agency3Frame from "../../../../../components/templates/agency3/Agency3Frame";

const routeToPage: Record<string, string> = {
  about: "about.html",
  services: "service.html",
  portfolio: "portfolio-grid.html",
  "portfolio-list": "portfolio-list.html",
  blog: "blog.html",
  "blog-list": "blog-list.html",
  team: "team.html",
  contact: "contact.html",
  faq: "faq.html",
  "not-found": "404.html",
};

function resolvePage(route: string) {
  if (routeToPage[route]) return routeToPage[route];
  if (route.startsWith("services/")) return "service-details.html";
  if (route.startsWith("portfolio/")) return "portfolio-details.html";
  if (route.startsWith("blog/")) return "blog-details.html";
  if (route.startsWith("team/")) return "team-details.html";
  return "404.html";
}

export default function Agency3InnerPage() {
  const params = useParams<{ slug?: string[] }>();
  const route = (params.slug ?? []).join("/");
  const page = resolvePage(route);

  return <Agency3Frame page={page} title={`Shata IT Solutions ${route || "preview"}`} />;
}
