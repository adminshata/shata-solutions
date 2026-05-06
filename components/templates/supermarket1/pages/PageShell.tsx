"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";
import { SUPERMARKET1_BASE } from "@/lib/supermarket1/reference-data";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="demo-one">
      <HeaderOne />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={SUPERMARKET1_BASE}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">{title}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-seperator bg_light-1">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>
      {children}
      <FooterOne />
    </div>
  );
}
