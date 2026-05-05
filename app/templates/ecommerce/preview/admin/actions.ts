"use server";

import { readdir } from "node:fs/promises";
import path from "node:path";

const PRODUCTS_DIR = ["public", "templates", "shata-store", "products"];
const COLLECTIONS_DIR = ["public", "templates", "shata-store", "collections"];

const IMG_RX = /\.(jpe?g|png|webp|gif|avif)$/i;

async function listDir(parts: string[], publicPrefix: string): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), ...parts);
    const files = await readdir(dir);
    return files
      .filter((f) => IMG_RX.test(f))
      .sort()
      .map((f) => `${publicPrefix}/${f}`);
  } catch {
    return [];
  }
}

/** Returns the public paths of every product image available in the local pool. */
export async function listProductImages(): Promise<string[]> {
  return listDir(PRODUCTS_DIR, "/templates/shata-store/products");
}

/** Same for collection / category images. */
export async function listCollectionImages(): Promise<string[]> {
  return listDir(COLLECTIONS_DIR, "/templates/shata-store/collections");
}

/** Combined pool — products first, then collections. Useful as a single picker. */
export async function listAllStoreImages(): Promise<string[]> {
  const [a, b] = await Promise.all([listProductImages(), listCollectionImages()]);
  return [...a, ...b];
}
