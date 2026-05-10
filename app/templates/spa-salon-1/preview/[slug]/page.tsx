// app/templates/spa-salon-1/preview/[slug]/page.tsx
import SpaSalon1Frame from "@/components/templates/spaSalon1/SpaSalon1Frame";

const SLUG_MAP: Record<string, string> = {
  faqs: "faqs.html",
  "gift-cards": "gift-cards.html",
  terms: "terms.html",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SpaSalon1SlugPage({ params }: Props) {
  const { slug } = await params;
  const htmlPage = SLUG_MAP[slug] ?? "demo-1.html";
  return <SpaSalon1Frame page={htmlPage} title={`${slug} — Shata Spa & Salon`} />;
}

export async function generateStaticParams() {
  return [
    { slug: "faqs" },
    { slug: "gift-cards" },
    { slug: "terms" },
  ];
}
