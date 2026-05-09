import type { SiteConfig } from "./types";

export function themeVars(t: SiteConfig["theme"]): Record<string, string> {
  return {
    "--r1-primary": t.primaryColor,
    "--r1-accent": t.accentColor,
    "--r1-dark": t.darkColor,
    "--r1-light": t.lightColor,
  };
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
