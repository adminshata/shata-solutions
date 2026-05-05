"use client";

import Link from "next/link";
import { useStore } from "@/lib/shata-home/context";

export function AnnouncementBar() {
  const config = useStore();
  const sec = config.sections.announcement;
  if (!sec.enabled) return null;

  const content = (
    <p className="text-xs font-semibold text-white">
      {sec.text}
    </p>
  );

  return (
    <div className="bg-[color:var(--store-primary)] px-4 py-2.5 text-center">
      {sec.href ? (
        <Link href={sec.href} className="hover:underline">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
