export const SM2_BASE = "/templates/supermarket-2/preview";
export const SM2_ASSETS = "/templates/supermarket2";

export function sm2Img(path: string): string {
  return `${SM2_ASSETS}/${path}`;
}

export function sm2Link(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${SM2_BASE}${path}`;
}
