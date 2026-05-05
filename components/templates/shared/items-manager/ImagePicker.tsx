"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  /** Available image paths to choose from. */
  pool: string[];
  /** Currently-selected images on the item (kept selected/highlighted). */
  selected: string[];
  /** Multi-select mode (default true). */
  multi?: boolean;
  onConfirm: (paths: string[]) => void;
  onClose: () => void;
};

export function ImagePicker({ open, pool, selected, multi = true, onConfirm, onClose }: Props) {
  const [pending, setPending] = useState<string[]>(selected);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) setPending(selected);
  }, [open, selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter((p) => p.toLowerCase().includes(q));
  }, [pool, query]);

  if (!open) return null;

  function toggle(path: string) {
    if (!multi) {
      setPending([path]);
      return;
    }
    setPending((cur) => (cur.includes(path) ? cur.filter((p) => p !== path) : [...cur, path]));
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-label="Pick images">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative flex max-h-[88vh] w-[min(960px,92vw)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1226] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Library</div>
            <div className="text-sm font-semibold">Select {multi ? "images" : "an image"}</div>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by filename…"
            className="w-56 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white outline-none focus:border-[#635bff]"
          />
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-white/55 hover:bg-white/[0.06]">
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <div className="text-base font-semibold">No images match.</div>
              <p className="mt-1 max-w-md text-xs text-white/55">
                Drop new image files into <code className="rounded bg-white/[0.06] px-1 py-0.5">public/templates/shata-store/products/</code> and reload the editor.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {filtered.map((path) => {
                const isSelected = pending.includes(path);
                return (
                  <li key={path}>
                    <button
                      type="button"
                      onClick={() => toggle(path)}
                      className={`group relative block w-full overflow-hidden rounded-lg border-2 transition ${
                        isSelected ? "border-[#635bff]" : "border-white/10 hover:border-white/30"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="relative aspect-square bg-white/[0.04]">
                        <Image src={path} alt="" fill sizes="160px" className="object-cover" unoptimized />
                      </div>
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-left text-[9px] text-white/85">
                        {path.split("/").pop()}
                      </span>
                      {isSelected && (
                        <span className="absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#635bff] text-[10px] font-bold text-white">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-3">
          <span className="text-[11px] text-white/55">
            {pending.length} of {pool.length} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.08]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(pending)}
              className="rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
            >
              Use {pending.length || ""} image{pending.length === 1 ? "" : "s"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
