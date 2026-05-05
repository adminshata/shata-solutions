import type { ReactNode } from "react";
import GlobalStyles from "@/components/home/GlobalStyles";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "Shata · Formation Ops",
};

export default function FormationAdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalStyles />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
