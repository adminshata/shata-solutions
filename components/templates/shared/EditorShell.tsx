"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type EditorShellProps = {
  title: string;
  previewHref: string;
  children: ReactNode;
  preview: ReactNode;
};

export default function EditorShell({ title, previewHref, children, preview }: EditorShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 px-5 py-4 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400">
              Template editor
            </p>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <Link
            href={previewHref}
            className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 transition hover:-translate-y-0.5"
          >
            Open preview
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-5 py-6 lg:grid-cols-[420px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl">
          {children}
        </aside>
        <main className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
          {preview}
        </main>
      </div>
    </div>
  );
}
