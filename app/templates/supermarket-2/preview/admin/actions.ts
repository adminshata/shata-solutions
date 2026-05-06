"use server";

import { access, readdir } from "node:fs/promises";
import path from "node:path";

const IMG_RX = /\.(jpe?g|png|webp|gif|avif)$/i;
const BASE_PUBLIC = ["public", "templates", "supermarket2"];

const DIRS = {
  products: [...BASE_PUBLIC, "products"],
  category: [...BASE_PUBLIC, "category"],
  banner:   [...BASE_PUBLIC, "banner"],
  feature:  [...BASE_PUBLIC, "feature"],
  blog:     [...BASE_PUBLIC, "blog"],
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

export async function listAllSupermarket2Images(): Promise<string[]> {
  const [products, category, banner, feature, blog] = await Promise.all([
    listDir(DIRS.products, "/templates/supermarket2/products"),
    listDir(DIRS.category, "/templates/supermarket2/category"),
    listDir(DIRS.banner,   "/templates/supermarket2/banner"),
    listDir(DIRS.feature,  "/templates/supermarket2/feature"),
    listDir(DIRS.blog,     "/templates/supermarket2/blog"),
  ]);
  return [...products, ...category, ...banner, ...feature, ...blog];
}

export async function listProductImages(): Promise<string[]> {
  return listDir(DIRS.products, "/templates/supermarket2/products");
}

export async function checkSupermarket2Images(imagePaths: string[]): Promise<{
  checked: number;
  missing: string[];
}> {
  const unique = [...new Set(imagePaths.filter((src) => src.startsWith("/templates/supermarket2/")))];
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
