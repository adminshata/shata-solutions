import type { ReactNode } from "react";
import { Montserrat, Raleway } from "next/font/google";
import { PreviewFrame } from "@/components/templates/cafe1/layout/PreviewFrame";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-c1-body",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-c1-accent",
  display: "swap",
});

export default function Cafe1PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${montserrat.variable} ${raleway.variable}`}>
      <PreviewFrame>{children}</PreviewFrame>
    </div>
  );
}
