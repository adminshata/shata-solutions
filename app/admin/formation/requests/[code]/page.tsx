import { notFound } from "next/navigation";
import { getRequest } from "@/lib/formation/store";
import { ADDON_CATALOG, PACKAGE_CATALOG, STATE_CATALOG } from "@/lib/formation/catalog";
import RequestDetail from "./RequestDetail";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ code: string }> };

export default async function FormationRequestPage({ params }: PageProps) {
  const { code } = await params;
  const request = await getRequest(code);
  if (!request) notFound();
  return (
    <RequestDetail
      request={request}
      catalogs={{
        packages: PACKAGE_CATALOG,
        states: STATE_CATALOG,
        addOns: ADDON_CATALOG,
      }}
    />
  );
}
