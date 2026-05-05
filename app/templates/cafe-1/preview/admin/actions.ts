"use server";

import { access, readdir } from "node:fs/promises";
import path from "node:path";

const IMG_RX = /\.(jpe?g|png|webp|gif|avif)$/i;

const DIRS = {
  menu:    ["public", "templates", "cafe1", "menu"],
  hero:    ["public", "templates", "cafe1", "hero"],
  about:   ["public", "templates", "cafe1", "about"],
  gallery: ["public", "templates", "cafe1", "gallery"],
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

export async function listAllCafe1Images(): Promise<string[]> {
  const [menu, hero, about, gallery] = await Promise.all([
    listDir(DIRS.menu,    "/templates/cafe1/menu"),
    listDir(DIRS.hero,    "/templates/cafe1/hero"),
    listDir(DIRS.about,   "/templates/cafe1/about"),
    listDir(DIRS.gallery, "/templates/cafe1/gallery"),
  ]);
  return [...menu, ...hero, ...about, ...gallery];
}

export async function listMenuImages(): Promise<string[]> {
  return listDir(DIRS.menu, "/templates/cafe1/menu");
}

export async function checkCafe1Images(imagePaths: string[]): Promise<{
  checked: number;
  missing: string[];
}> {
  const unique = [...new Set(imagePaths.filter((src) => src.startsWith("/templates/cafe1/")))];
  const publicDir = path.join(process.cwd(), "public");
  const missing: string[] = [];

  await Promise.all(unique.map(async (src) => {
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
  }));

  return { checked: unique.length, missing: missing.sort() };
}
