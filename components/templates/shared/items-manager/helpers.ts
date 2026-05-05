import type { ManagedItemBase } from "./types";

const HANDLE_OK = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isValidHandle(handle: string): boolean {
  return HANDLE_OK.test(handle);
}

export function ensureUniqueHandle<T extends ManagedItemBase>(
  desired: string,
  items: T[],
  excludeId?: string
): string {
  const taken = new Set(items.filter((i) => i.id !== excludeId).map((i) => i.handle));
  const base = desired || "item";
  if (!taken.has(base)) return base;
  for (let n = 2; n < 1000; n++) {
    const candidate = `${base}-${n}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${base}-${Date.now()}`;
}

export function makeId(prefix = "item"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function moveInArray<T>(arr: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return arr;
  const next = [...arr];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/** Default duplicate: shallow-copy, new id, append "(copy)" to name, fresh handle. */
export function defaultDuplicate<T extends ManagedItemBase>(item: T, all: T[]): T {
  const copy = { ...item };
  copy.id = makeId();
  const newName = item.name.endsWith("(copy)") ? item.name : `${item.name} (copy)`;
  copy.name = newName;
  copy.handle = ensureUniqueHandle(slugify(newName), all);
  copy.featured = false;
  return copy;
}

/** Download arbitrary JSON in the browser. */
export function downloadJSON(filename: string, payload: unknown) {
  if (typeof window === "undefined") return;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Read a file picked by an <input type="file"> as JSON. Throws on invalid JSON. */
export async function readJSONFile<T>(file: File): Promise<T> {
  const text = await file.text();
  return JSON.parse(text) as T;
}

/** Visible field defaults. */
export function withFieldDefaults(visible: import("./types").FieldVisibility | undefined) {
  return {
    category:         visible?.category         ?? true,
    shortDescription: visible?.shortDescription ?? true,
    description:      visible?.description      ?? true,
    price:            visible?.price            ?? true,
    priceLabel:       visible?.priceLabel       ?? false,
    images:           visible?.images           ?? true,
    badge:            visible?.badge            ?? false,
    featured:         visible?.featured         ?? true,
    active:           visible?.active           ?? true,
  };
}
