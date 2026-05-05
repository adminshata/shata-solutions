"use client";

import Link from "next/link";
import { useStore } from "@/lib/shata-store/context";

export function AnnouncementBar() {
  const config = useStore();
  const ann = config.sections.announcement;
  if (!ann.enabled || !ann.text) return null;
  const inner = (
    <div className="bg-[color:var(--store-fg)] text-[color:var(--store-bg)]">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-semibold tracking-wide md:px-8">
        {ann.text}
      </div>
    </div>
  );
  return ann.href ? <Link href={ann.href}>{inner}</Link> : inner;
}
