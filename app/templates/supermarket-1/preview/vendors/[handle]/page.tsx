import { VendorDetailsPage } from "@/components/templates/supermarket1/pages/VendorPages";

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <VendorDetailsPage handle={handle} />;
}
