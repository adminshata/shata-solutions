import { notFound } from "next/navigation";
import { websiteIndustries } from "../../data";
import IndustryView from "./IndustryView";

type IndustryPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return websiteIndustries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = websiteIndustries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.title} websites — Shata Website Platform`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = websiteIndustries.find((i) => i.slug === slug);
  if (!industry) notFound();
  return <IndustryView industry={industry} />;
}
