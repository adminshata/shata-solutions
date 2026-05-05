"use server";

import { readdir } from "node:fs/promises";
import path from "node:path";

const IMG_RX = /\.(jpe?g|png|webp|gif|avif)$/i;

const DIRS = {
  menu:    ["public", "templates", "shata-cafe", "menu"],
  hero:    ["public", "templates", "shata-cafe", "hero"],
  about:   ["public", "templates", "shata-cafe", "about"],
  bg:      ["public", "templates", "shata-cafe", "bg"],
  gallery: ["public", "templates", "shata-cafe", "gallery"],
  team:    ["public", "templates", "shata-cafe", "team"],
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

export async function listAllCafeImages(): Promise<string[]> {
  const [menu, hero, about, bg, gallery, team] = await Promise.all([
    listDir(DIRS.menu,    "/templates/shata-cafe/menu"),
    listDir(DIRS.hero,    "/templates/shata-cafe/hero"),
    listDir(DIRS.about,   "/templates/shata-cafe/about"),
    listDir(DIRS.bg,      "/templates/shata-cafe/bg"),
    listDir(DIRS.gallery, "/templates/shata-cafe/gallery"),
    listDir(DIRS.team,    "/templates/shata-cafe/team"),
  ]);
  return [...menu, ...hero, ...about, ...bg, ...gallery, ...team];
}

export async function listMenuImages(): Promise<string[]> {
  return listDir(DIRS.menu, "/templates/shata-cafe/menu");
}
