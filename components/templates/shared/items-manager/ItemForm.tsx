"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ensureUniqueHandle, isValidHandle, slugify, withFieldDefaults } from "./helpers";
import { ImagePicker } from "./ImagePicker";
import type { ItemsManagerSchema, ManagedItemBase } from "./types";

type Props<T extends ManagedItemBase> = {
  open: boolean;
  /** Item being edited (null when no edit). */
  item: T | null;
  /** All items — used for unique-handle checks. */
  all: T[];
  schema: ItemsManagerSchema<T>;
  onClose: () => void;
  onSave: (next: T) => void;
};

export function ItemForm<T extends ManagedItemBase>({ open, item, all, schema, onClose, onSave }: Props<T>) {
  const fields = withFieldDefaults(schema.fields);
  const [draft, setDraft] = useState<T | null>(null);
  const [autoSlug, setAutoSlug] = useState(true);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setDraft({ ...item });
      // If the handle was auto-derived from name, keep auto on; otherwise treat handle as manually-set.
      setAutoSlug(item.handle === slugify(item.name) || item.handle === "");
    } else {
      setDraft(null);
    }
  }, [item]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const duplicateHandle = useMemo(() => {
    if (!draft) return false;
    return all.some((i) => i.id !== draft.id && i.handle === draft.handle && draft.handle !== "");
  }, [all, draft]);

  if (!open || !draft) return null;

  function patch(delta: Partial<T>) {
    setDraft((cur) => (cur ? { ...cur, ...delta } : cur));
  }

  function setName(value: string) {
    if (autoSlug) {
      const newHandle = ensureUniqueHandle(slugify(value), all, draft!.id);
      patch({ name: value, handle: newHandle } as Partial<T>);
    } else {
      patch({ name: value } as Partial<T>);
    }
  }

  function setHandleManual(value: string) {
    setAutoSlug(false);
    patch({ handle: slugify(value) } as Partial<T>);
  }

  function save() {
    if (!draft) return;
    let next = { ...draft };
    if (!next.name.trim()) next = { ...next, name: "Untitled" };
    if (!next.handle || !isValidHandle(next.handle) || duplicateHandle) {
      next = { ...next, handle: ensureUniqueHandle(slugify(next.name), all, next.id) };
    }
    onSave(next);
  }

  const handleErrors: string[] = [];
  if (draft.handle && !isValidHandle(draft.handle)) handleErrors.push("Lowercase letters, numbers, and dashes only.");
  if (duplicateHandle) handleErrors.push("Already used by another item.");

  return (
    <>
      <div aria-hidden onClick={onClose} className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
      <aside
        role="dialog"
        aria-label={`Edit ${schema.labels.entitySingular}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-[#070d1c] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">
              {item ? `Edit ${schema.labels.entitySingular}` : `New ${schema.labels.entitySingular}`}
            </div>
            <div className="mt-1 text-base font-semibold">{draft.name || `New ${schema.labels.entitySingular}`}</div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-white/55 hover:bg-white/[0.06]">
            ✕
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-5">
            {/* Name + handle */}
            <Field label="Name">
              <input
                value={draft.name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`e.g. ${schema.labels.entitySingular} name`}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
              />
            </Field>

            <Field label="Handle / slug" hint="Used in the URL. Letters, numbers, dashes only.">
              <div className="flex items-stretch gap-2">
                <input
                  value={draft.handle}
                  onChange={(e) => setHandleManual(e.target.value)}
                  placeholder="auto-generated"
                  className={`flex-1 rounded-lg border bg-white/[0.04] px-3 py-2 font-mono text-xs text-white outline-none focus:ring-2 ${
                    handleErrors.length > 0
                      ? "border-rose-400/50 focus:border-rose-400 focus:ring-rose-400/20"
                      : "border-white/10 focus:border-[#635bff] focus:ring-[#635bff]/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(true);
                    patch({ handle: ensureUniqueHandle(slugify(draft.name), all, draft.id) } as Partial<T>);
                  }}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 text-[10px] font-semibold uppercase tracking-wider text-white/65 hover:bg-white/[0.08]"
                  title="Regenerate from name"
                >
                  Auto
                </button>
              </div>
              {handleErrors.length > 0 && (
                <p className="mt-1 text-[11px] text-rose-300">{handleErrors.join(" ")}</p>
              )}
            </Field>

            {/* Category */}
            {fields.category && (schema.categories?.length ?? 0) > 0 && (
              <Field label="Category">
                <select
                  value={draft.category ?? ""}
                  onChange={(e) => patch({ category: e.target.value || undefined } as Partial<T>)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#635bff]"
                >
                  <option value="">— Uncategorized —</option>
                  {schema.categories!.map((c) => (
                    <option key={c.handle} value={c.handle}>{c.label}</option>
                  ))}
                </select>
              </Field>
            )}

            {/* Short description */}
            {fields.shortDescription && (
              <Field label="Short description" hint="Shown on cards and listings.">
                <input
                  value={draft.shortDescription ?? ""}
                  onChange={(e) => patch({ shortDescription: e.target.value } as Partial<T>)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
                />
              </Field>
            )}

            {/* Description */}
            {fields.description && (
              <Field label="Full description">
                <textarea
                  value={draft.description ?? ""}
                  onChange={(e) => patch({ description: e.target.value } as Partial<T>)}
                  rows={5}
                  className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm leading-6 text-white outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
                />
              </Field>
            )}

            {/* Price */}
            {fields.price && (
              <Field label="Price">
                {schema.renderPrice ? schema.renderPrice(draft, patch) : <DefaultPriceInput item={draft} patch={patch} />}
              </Field>
            )}

            {/* Images */}
            {fields.images && (
              <Field label="Images" hint="First image is the primary thumbnail.">
                <ImagesEditor
                  images={draft.images ?? []}
                  onChange={(next) => patch({ images: next } as Partial<T>)}
                  onPickFromLibrary={() => setImagePickerOpen(true)}
                />
              </Field>
            )}

            {/* Badge */}
            {fields.badge && (schema.badgeOptions?.length ?? 0) > 0 && (
              <Field label="Badge">
                <select
                  value={draft.badge ?? ""}
                  onChange={(e) => patch({ badge: e.target.value || undefined } as Partial<T>)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#635bff]"
                >
                  {schema.badgeOptions!.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
            )}

            {/* Featured / Active toggles */}
            <div className="flex flex-wrap gap-3">
              {fields.featured && (
                <ToggleRow
                  label="Featured"
                  hint="Show on the home page."
                  on={!!draft.featured}
                  onClick={() => patch({ featured: !draft.featured } as Partial<T>)}
                />
              )}
              {fields.active && (
                <ToggleRow
                  label="Active"
                  hint="Visible to customers."
                  on={draft.active !== false}
                  onClick={() => patch({ active: draft.active === false ? true : false } as Partial<T>)}
                />
              )}
            </div>

            {/* Industry-specific extras */}
            {schema.renderExtras && (
              <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3a0ff]">Extra fields</h3>
                <div className="mt-3 space-y-3">{schema.renderExtras(draft, patch)}</div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.08]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={duplicateHandle}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)] disabled:opacity-50"
          >
            Save {schema.labels.entitySingular}
          </button>
        </footer>
      </aside>

      <ImagePicker
        open={imagePickerOpen}
        pool={schema.imagePool}
        selected={draft.images ?? []}
        multi
        onClose={() => setImagePickerOpen(false)}
        onConfirm={(next) => {
          patch({ images: next } as Partial<T>);
          setImagePickerOpen(false);
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-pieces                                                          */
/* ------------------------------------------------------------------ */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <span className="mt-1 block">{children}</span>
      {hint && <span className="mt-1 block text-[10px] text-white/40">{hint}</span>}
    </label>
  );
}

function ToggleRow({ label, hint, on, onClick }: { label: string; hint?: string; on: boolean; onClick: () => void }) {
  return (
    <div className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div>
        <div className="text-sm font-semibold">{label}</div>
        {hint && <div className="text-[10px] text-white/45">{hint}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onClick}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
          on ? "bg-gradient-to-r from-[#635bff] to-cyan-400" : "bg-white/15"
        }`}
      >
        <span className={`absolute h-4 w-4 transform rounded-full bg-white shadow transition ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function DefaultPriceInput<T extends ManagedItemBase>({ item, patch }: { item: T; patch: (delta: Partial<T>) => void }) {
  const cents = (item as unknown as { price?: number }).price ?? 0;
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-2 text-xs text-white/55">$</span>
      <input
        type="number"
        step="0.01"
        value={(cents / 100).toString()}
        onChange={(e) => {
          const v = Number(e.target.value || 0);
          patch({ price: Math.round(v * 100) } as unknown as Partial<T>);
        }}
        className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/20"
      />
      <span className="text-[10px] uppercase tracking-wider text-white/45">USD</span>
    </div>
  );
}

function ImagesEditor({
  images,
  onChange,
  onPickFromLibrary,
}: {
  images: string[];
  onChange: (next: string[]) => void;
  onPickFromLibrary: () => void;
}) {
  function move(idx: number, dir: -1 | 1) {
    const next = [...images];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  }
  function remove(path: string) {
    onChange(images.filter((p) => p !== path));
  }
  return (
    <div className="space-y-2">
      {images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-xs text-white/45">
          No images yet.
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((path, i) => (
            <li key={path + i} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <div className="relative aspect-square">
                <Image src={path} alt="" fill sizes="120px" className="object-cover" unoptimized />
              </div>
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded-full bg-[#635bff] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                  Primary
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/85 to-transparent p-1.5 opacity-0 transition group-hover:opacity-100">
                <div className="flex gap-0.5">
                  <button type="button" onClick={() => move(i, -1)} className="rounded bg-white/15 px-1.5 text-[10px] text-white">↑</button>
                  <button type="button" onClick={() => move(i, 1)}  className="rounded bg-white/15 px-1.5 text-[10px] text-white">↓</button>
                </div>
                <button type="button" onClick={() => remove(path)} className="rounded bg-rose-500/85 px-1.5 text-[10px] font-semibold text-white">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={onPickFromLibrary}
        className="w-full rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/[0.06]"
      >
        + Pick images from library
      </button>
    </div>
  );
}
