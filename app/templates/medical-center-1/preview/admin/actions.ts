"use server";

import { readdir } from "node:fs/promises";
import path from "node:path";

const IMG_RX = /\.(jpe?g|png|webp|gif|avif)$/i;

const DIRS = {
  services:     ["public", "templates", "shata-medical", "services"],
  team:         ["public", "templates", "shata-medical", "team"],
  about:        ["public", "templates", "shata-medical", "about"],
  bg:           ["public", "templates", "shata-medical", "bg"],
  testimonials: ["public", "templates", "shata-medical", "testimonials"],
  icons:        ["public", "templates", "shata-medical", "icons"],
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

export async function listServiceImages(): Promise<string[]> {
  return listDir(DIRS.services, "/templates/shata-medical/services");
}

export async function listTeamImages(): Promise<string[]> {
  return listDir(DIRS.team, "/templates/shata-medical/team");
}

export async function listAboutImages(): Promise<string[]> {
  return listDir(DIRS.about, "/templates/shata-medical/about");
}

export async function listBgImages(): Promise<string[]> {
  return listDir(DIRS.bg, "/templates/shata-medical/bg");
}

export async function listAllMedicalImages(): Promise<string[]> {
  const [services, team, about, bg, testimonials, icons] = await Promise.all([
    listDir(DIRS.services,     "/templates/shata-medical/services"),
    listDir(DIRS.team,         "/templates/shata-medical/team"),
    listDir(DIRS.about,        "/templates/shata-medical/about"),
    listDir(DIRS.bg,           "/templates/shata-medical/bg"),
    listDir(DIRS.testimonials, "/templates/shata-medical/testimonials"),
    listDir(DIRS.icons,        "/templates/shata-medical/icons"),
  ]);
  return [...services, ...team, ...about, ...bg, ...testimonials, ...icons];
}
