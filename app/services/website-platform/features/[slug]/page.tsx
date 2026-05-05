import { notFound } from "next/navigation";
import { websitePlatformFeatures } from "../../data";
import FeatureView from "./FeatureView";

type FeaturePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return websitePlatformFeatures.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = websitePlatformFeatures.find((f) => f.slug === slug);
  if (!feature) return {};
  return {
    title: `${feature.title} — Shata Website Platform`,
    description: feature.description,
  };
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = websitePlatformFeatures.find((f) => f.slug === slug);
  if (!feature) notFound();
  return <FeatureView feature={feature} />;
}
