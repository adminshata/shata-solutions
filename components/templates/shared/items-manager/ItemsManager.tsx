"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { defaultDuplicate, downloadJSON, makeId, moveInArray, readJSONFile } from "./helpers";
import { ItemForm } from "./ItemForm";
import type { ItemsManagerProps, ManagedItemBase } from "./types";

/**
 * Reusable items manager for any Shata industry template.
 *
 * Storage-agnostic: takes `items` and `onChange`, never touches a DB or
 * localStorage directly. The hosting page is responsible for persistence.
 */
export function ItemsManager<T extends ManagedItemBase>({ items, onChange, schema }: ItemsManagerProps<T>) {
  const labels = schema.labels;
  const [editing, setEditing] = useState<T | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "yes" | "no">("all");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (q && !`${it.name} ${it.handle} ${it.shortDescription ?? ""}`.toLowerCase().includes(q)) return false;
      if (filterCategory !== "all" && it.category !== filterCategory) return false;
      if (filterFeatured === "yes" && !it.featured) return false;
      if (filterFeatured === "no" && it.featured) return false;
      if (filterActive === "active" && it.active === false) return false;
      if (filterActive === "inactive" && it.active !== false) return false;
      return true;
    });
  }, [items, query, filterCategory, filterFeatured, filterActive]);

  function patchItem(id: string, delta: Partial<T>) {
    onChange(items.map((it) => (it.id === id ? { ...it, ...delta } : it)));
  }

  function removeItem(id: string) {
    onChange(items.filter((it) => it.id !== id));
    setConfirmDeleteId(null);
    setSelected((cur) => {
      const next = new Set(cur);
      next.delete(id);
      return next;
    });
  }

  function duplicateItem(id: string) {
    const target = items.find((it) => it.id === id);
    if (!target) return;
    const dupe = (schema.duplicate ?? ((t: T) => defaultDuplicate(t, items)))(target);
    const idx = items.findIndex((it) => it.id === id);
    onChange([...items.slice(0, idx + 1), dupe, ...items.slice(idx + 1)]);
  }

  function openCreate() {
    const fresh = schema.createNew();
    if (!fresh.id) (fresh as ManagedItemBase).id = makeId(labels.entitySingular);
    setEditing(fresh);
    setDrawerOpen(true);
  }

  function openEdit(item: T) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSave(next: T) {
    const exists = items.some((it) => it.id === next.id);
    onChange(exists ? items.map((it) => (it.id === next.id ? next : it)) : [...items, next]);
    setDrawerOpen(false);
    setEditing(null);
  }

  function moveItem(id: string, dir: -1 | 1) {
    const i = items.findIndex((it) => it.id === id);
    onChange(moveInArray(items, i, i + dir));
  }

  /* DnD reorder ----------------------------------------------------- */

  function onDragStart(e: React.DragEvent, id: string) {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
  function onDrop(e: React.DragEvent, targetId: string) {
    e.preventDefault();
    const sourceId = draggingId || e.dataTransfer.getData("text/plain");
    setDraggingId(null);
    if (!sourceId || sourceId === targetId) return;
    const from = items.findIndex((it) => it.id === sourceId);
    const to = items.findIndex((it) => it.id === targetId);
    onChange(moveInArray(items, from, to));
  }
  function onDragEnd() { setDraggingId(null); }

  /* Bulk actions ---------------------------------------------------- */

  function bulk(action: "delete" | "feature" | "unfeature" | "activate" | "deactivate") {
    if (selected.size === 0) return;
    if (action === "delete") {
      onChange(items.filter((it) => !selected.has(it.id)));
      setSelected(new Set());
      return;
    }
    onChange(items.map((it) => {
      if (!selected.has(it.id)) return it;
      switch (action) {
        case "feature":     return { ...it, featured: true };
        case "unfeature":   return { ...it, featured: false };
        case "activate":    return { ...it, active: true };
        case "deactivate":  return { ...it, active: false };
      }
    }));
  }

  /* JSON import / export ------------------------------------------- */

  function exportJSON() {
    downloadJSON(`${labels.entityPlural}-${new Date().toISOString().slice(0, 10)}.json`, items);
  }
  async function importJSON(file: File) {
    try {
      const parsed = await readJSONFile<unknown>(file);
      if (!Array.isArray(parsed)) throw new Error("Expected an array.");
      // Soft validation — keep only entries with id, handle, name, images.
      const cleaned = parsed.filter((row) => typeof row === "object" && row !== null
        && typeof (row as ManagedItemBase).id === "string"
        && typeof (row as ManagedItemBase).handle === "string"
        && typeof (row as ManagedItemBase).name === "string"
        && Array.isArray((row as ManagedItemBase).images)) as T[];
      if (cleaned.length === 0) throw new Error("No valid items.");
      onChange(cleaned);
    } catch (e) {
      alert("Import failed: " + (e instanceof Error ? e.message : "unknown error"));
    }
  }

  /* ----------------------------------------------------------------- */

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          <div className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 sm:w-72">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="text-white/45" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${labels.entityPlural}…`}
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/40"
            />
          </div>
        </div>

        {(schema.categories?.length ?? 0) > 0 && (
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#635bff]">
            <option value="all">All categories</option>
            {schema.categories!.map((c) => <option key={c.handle} value={c.handle}>{c.label}</option>)}
          </select>
        )}
        <select value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value as "all" | "yes" | "no")} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#635bff]">
          <option value="all">All</option>
          <option value="yes">Featured</option>
          <option value="no">Not featured</option>
        </select>
        <select value={filterActive} onChange={(e) => setFilterActive(e.target.value as "all" | "active" | "inactive")} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#635bff]">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Hidden</option>
        </select>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={exportJSON}
            title="Export catalog as JSON"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:bg-white/[0.08]"
          >
            Export
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:bg-white/[0.08]"
          >
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importJSON(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
          >
            + {labels.addLabel ?? `Add ${labels.entitySingular}`}
          </button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#635bff]/30 bg-[#635bff]/10 px-3 py-2">
          <span className="text-[11px] font-semibold text-white">{selected.size} selected</span>
          <button type="button" onClick={() => bulk("feature")} className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Feature</button>
          <button type="button" onClick={() => bulk("unfeature")} className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Unfeature</button>
          <button type="button" onClick={() => bulk("activate")} className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Activate</button>
          <button type="button" onClick={() => bulk("deactivate")} className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Hide</button>
          <button type="button" onClick={() => bulk("delete")} className="rounded-md bg-rose-500/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Delete</button>
          <button type="button" onClick={() => setSelected(new Set())} className="ml-auto rounded-md border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">Clear</button>
        </div>
      )}

      {/* List */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03]">
        {items.length === 0 ? (
          <EmptyState
            title={labels.emptyTitle ?? `No ${labels.entityPlural} yet.`}
            copy={labels.emptyCopy ?? `Create your first ${labels.entitySingular}.`}
            ctaLabel={labels.addLabel ?? `Add ${labels.entitySingular}`}
            onAdd={openCreate}
          />
        ) : filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-white/55">
            No {labels.entityPlural} match these filters.
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {filtered.map((it) => {
              const allIdx = items.findIndex((x) => x.id === it.id);
              const isSelected = selected.has(it.id);
              return (
                <li
                  key={it.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, it.id)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, it.id)}
                  onDragEnd={onDragEnd}
                  className={`group flex items-center gap-3 px-3 py-2.5 transition ${
                    draggingId === it.id ? "opacity-50" : ""
                  } ${isSelected ? "bg-[#635bff]/10" : "hover:bg-white/[0.03]"}`}
                >
                  <input
                    type="checkbox"
                    aria-label={`Select ${it.name}`}
                    checked={isSelected}
                    onChange={(e) => {
                      const next = new Set(selected);
                      if (e.target.checked) next.add(it.id);
                      else next.delete(it.id);
                      setSelected(next);
                    }}
                    className="h-4 w-4 flex-none accent-[#635bff]"
                  />
                  <span title="Drag to reorder" className="cursor-grab select-none text-base text-white/30">⋮⋮</span>

                  <button
                    type="button"
                    onClick={() => openEdit(it)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <div className="relative h-12 w-12 flex-none overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
                      {it.images[0] ? (
                        <Image src={it.images[0]} alt={it.name} fill sizes="48px" className="object-cover" unoptimized />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[9px] text-white/30">No image</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 truncate">
                        <span className={`truncate text-sm font-semibold ${it.active === false ? "text-white/45" : "text-white"}`}>
                          {it.name || "Untitled"}
                        </span>
                        {it.badge && <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/85">{it.badge}</span>}
                        {it.active === false && <span className="rounded-full bg-rose-500/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-rose-300">Hidden</span>}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-white/45">
                        <span className="font-mono truncate">{it.handle || "—"}</span>
                        {it.category && <span>· {it.category}</span>}
                        {schema.formatPriceForList && <span>· {schema.formatPriceForList(it)}</span>}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <InlineToggle
                      label="F"
                      title="Featured"
                      on={!!it.featured}
                      onClick={() => patchItem(it.id, { featured: !it.featured } as Partial<T>)}
                    />
                    <InlineToggle
                      label="A"
                      title="Active"
                      on={it.active !== false}
                      onClick={() => patchItem(it.id, { active: it.active === false ? true : false } as Partial<T>)}
                    />
                    <RowMenu
                      onEdit={() => openEdit(it)}
                      onDuplicate={() => duplicateItem(it.id)}
                      onMoveUp={allIdx > 0 ? () => moveItem(it.id, -1) : undefined}
                      onMoveDown={allIdx < items.length - 1 ? () => moveItem(it.id, 1) : undefined}
                      confirmingDelete={confirmDeleteId === it.id}
                      onAskDelete={() => setConfirmDeleteId(it.id)}
                      onCancelDelete={() => setConfirmDeleteId(null)}
                      onConfirmDelete={() => removeItem(it.id)}
                      extras={(schema.extraActions ?? [])
                        .filter((a) => !a.hidden?.(it))
                        .map<ResolvedRowAction>((a) => ({ id: a.id, label: a.label, danger: a.danger, run: () => a.onClick(it) }))}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="text-[11px] text-white/40">
        Showing {filtered.length} of {items.length} {labels.entityPlural} · drag rows to reorder
      </div>

      <ItemForm
        open={drawerOpen}
        item={editing}
        all={items}
        schema={schema}
        onClose={() => { setDrawerOpen(false); setEditing(null); }}
        onSave={handleSave}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-pieces                                                          */
/* ------------------------------------------------------------------ */

function InlineToggle({ label, title, on, onClick }: { label: string; title: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${title} · ${on ? "on" : "off"}`}
      aria-pressed={on}
      className={`flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-bold ${
        on
          ? "border-transparent bg-gradient-to-br from-[#635bff] to-cyan-400 text-white"
          : "border-white/10 bg-white/[0.04] text-white/40"
      }`}
    >
      {label}
    </button>
  );
}

type ResolvedRowAction = { id: string; label: string; danger?: boolean; run: () => void };

function RowMenu({
  onEdit,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  confirmingDelete,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
  extras = [],
}: {
  onEdit: () => void;
  onDuplicate: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  confirmingDelete: boolean;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  extras?: ResolvedRowAction[];
}) {
  const [open, setOpen] = useState(false);

  if (confirmingDelete) {
    return (
      <div className="flex items-center gap-1 rounded-md bg-rose-500/15 px-2 py-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-300">Delete?</span>
        <button type="button" onClick={onConfirmDelete} className="rounded bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">Yes</button>
        <button type="button" onClick={onCancelDelete} className="rounded bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">No</button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Row actions"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/[0.08]"
      >
        ⋯
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-30" />
          <div className="absolute right-0 z-40 mt-1 w-40 overflow-hidden rounded-lg border border-white/10 bg-[#0b1226] shadow-xl">
            <MenuItem onClick={() => { setOpen(false); onEdit(); }}>Edit</MenuItem>
            <MenuItem onClick={() => { setOpen(false); onDuplicate(); }}>Duplicate</MenuItem>
            {onMoveUp && <MenuItem onClick={() => { setOpen(false); onMoveUp(); }}>Move up</MenuItem>}
            {onMoveDown && <MenuItem onClick={() => { setOpen(false); onMoveDown(); }}>Move down</MenuItem>}
            {extras.map((a) => (
              <MenuItem key={a.id} danger={a.danger} onClick={() => { setOpen(false); a.run(); }}>{a.label}</MenuItem>
            ))}
            <MenuItem danger onClick={() => { setOpen(false); onAskDelete(); }}>Delete</MenuItem>
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full px-3 py-2 text-left text-xs transition ${
        danger ? "text-rose-300 hover:bg-rose-500/10" : "text-white hover:bg-white/[0.06]"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({
  title,
  copy,
  ctaLabel,
  onAdd,
}: {
  title: string;
  copy: string;
  ctaLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="text-base font-semibold text-white">{title}</div>
      <p className="mt-1 max-w-sm text-xs text-white/55">{copy}</p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#635bff] to-cyan-400 px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,91,255,0.7)]"
      >
        + {ctaLabel}
      </button>
    </div>
  );
}
