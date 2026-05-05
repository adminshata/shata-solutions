import type { ReactNode } from "react";
import { Montserrat, Raleway } from "next/font/google";
import { Cafe1Provider } from "@/lib/cafe1/context";
import { SiteShell } from "@/components/templates/cafe1/layout/SiteShell";

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
      <Cafe1Provider>
        <SiteShell>{children}</SiteShell>
      </Cafe1Provider>
    </div>
  );
}
