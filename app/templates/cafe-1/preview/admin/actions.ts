"use server";

import { readdir } from "node:fs/promises";
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
