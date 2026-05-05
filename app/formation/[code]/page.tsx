import { notFound } from "next/navigation";
import { getPublicRequest } from "@/app/services/llc/actions";
import PublicStatusView from "./PublicStatusView";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;
  return {
    title: `Your formation request ${code} — Shata Solutions`,
  };
}

export default async function PublicStatusPage({ params }: PageProps) {
  const { code } = await params;
  const request = await getPublicRequest(code);
  if (!request) notFound();
  return <PublicStatusView request={request} />;
}
