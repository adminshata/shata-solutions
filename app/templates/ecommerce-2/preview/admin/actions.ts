"use server";

import { readdir } from "node:fs/promises";
import path from "node:path";

const PRODUCTS_DIR = ["public", "templates", "shata-home", "products"];
const COLLECTIONS_DIR = ["public", "templates", "shata-home", "collections"];
const OFFER_DIR = ["public", "templates", "shata-home", "offer"];
const BG_DIR = ["public", "templates", "shata-home", "bg"];

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

export async function listProductImages(): Promise<string[]> {
  return listDir(PRODUCTS_DIR, "/templates/shata-home/products");
}

export async function listCollectionImages(): Promise<string[]> {
  return listDir(COLLECTIONS_DIR, "/templates/shata-home/collections");
}

export async function listOfferImages(): Promise<string[]> {
  return listDir(OFFER_DIR, "/templates/shata-home/offer");
}

export async function listBgImages(): Promise<string[]> {
  return listDir(BG_DIR, "/templates/shata-home/bg");
}

/** Combined pool — all available images for the image picker. */
export async function listAllStoreImages(): Promise<string[]> {
  const [products, collections, offers, bgs] = await Promise.all([
    listProductImages(),
    listCollectionImages(),
    listOfferImages(),
    listBgImages(),
  ]);
  return [...products, ...collections, ...offers, ...bgs];
}
