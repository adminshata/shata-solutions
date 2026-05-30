import { redirect } from "next/navigation";

// QR/NFC landing — immediately redirect to the menu for this table token
export default function TableLanding({
  params,
}: {
  params: { token: string };
}) {
  redirect(`/t/${params.token}/menu`);
}
