"use server";

import { access, readdir } from "node:fs/promises";
import path from "node:path";

const IMG_RX = /\.(jpe?g|png|webp|gif|avif)$/i;
const BASE_PUBLIC = ["public", "templates", "supermarket1"];

const DIRS = {
  products: [...BASE_PUBLIC, "products"],
  category: [...BASE_PUBLIC, "category"],
  banner:   [...BASE_PUBLIC, "banner"],
  feature:  [...BASE_PUBLIC, "feature"],
  blog:     [...BASE_PUBLIC, "blog"],
  vendor:   [...BASE_PUBLIC, "images", "vendor"],
  offer:    [...BASE_PUBLIC, "images", "offer"],
  store:    [...BASE_PUBLIC, "images", "store"],
  contact:  [...BASE_PUBLIC, "images", "contact"],
};

async function listDir(parts: string[], prefix: string): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), ...parts);
    const files = await readdir(dir);
    return files
      .filter((f) => IMG_RX.test(f))
      .sort()
      .map((f) => `${prefix}/${f}`);
  } catch {
    return [];
  }
}

export async function listAllSupermarket1Images(): Promise<string[]> {
  const [products, category, banner, feature, blog, vendor, offer, store, contact] = await Promise.all([
    listDir(DIRS.products, "/templates/supermarket1/products"),
    listDir(DIRS.category, "/templates/supermarket1/category"),
    listDir(DIRS.banner,   "/templates/supermarket1/banner"),
    listDir(DIRS.feature,  "/templates/supermarket1/feature"),
    listDir(DIRS.blog,     "/templates/supermarket1/blog"),
    listDir(DIRS.vendor,   "/templates/supermarket1/images/vendor"),
    listDir(DIRS.offer,    "/templates/supermarket1/images/offer"),
    listDir(DIRS.store,    "/templates/supermarket1/images/store"),
    listDir(DIRS.contact,  "/templates/supermarket1/images/contact"),
  ]);
  return [...products, ...category, ...banner, ...feature, ...blog, ...vendor, ...offer, ...store, ...contact];
}

export async function listProductImages(): Promise<string[]> {
  return listDir(DIRS.products, "/templates/supermarket1/products");
}

export async function checkSupermarket1Images(imagePaths: string[]): Promise<{
  checked: number;
  missing: string[];
}> {
  const unique = [...new Set(imagePaths.filter((src) => src.startsWith("/templates/supermarket1/")))];
  const publicDir = path.join(process.cwd(), "public");
  const missing: string[] = [];

  await Promise.all(
    unique.map(async (src) => {
      const relative = src.replace(/^\/+/, "");
      const file = path.normalize(path.join(publicDir, relative));
      if (!file.startsWith(publicDir + path.sep)) {
        missing.push(src);
        return;
      }
      try {
        await access(file);
      } catch {
        missing.push(src);
      }
    })
  );

  return { checked: unique.length, missing: missing.sort() };
}
