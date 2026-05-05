import type { SiteTheme, Service, Doctor, SiteConfig, Department } from "./types";

/* -------------------------------- Theme -------------------------------- */

const RADIUS_PX = { sm: "4px", md: "8px", lg: "16px" } as const;

export function themeVars(theme: SiteTheme): Record<string, string> {
  return {
    "--med-primary":    theme.primary,
    "--med-primary-fg": theme.primaryFg,
    "--med-accent":     theme.accent,
    "--med-bg":         theme.background,
    "--med-fg":         theme.foreground,
    "--med-muted":      theme.muted,
    "--med-surface":    theme.surface,
    "--med-border":     theme.border,
    "--med-radius":     RADIUS_PX[theme.radius],
  };
}

/* -------------------------------- Slugify ------------------------------ */

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/* ----------------------------- Lookups --------------------------------- */

export function findService(config: SiteConfig, handle: string): Service | undefined {
  return config.services.find((s) => s.handle === handle);
}

export function findDoctor(config: SiteConfig, handle: string): Doctor | undefined {
  return config.doctors.find((d) => d.handle === handle);
}

export function findDepartment(config: SiteConfig, handle: string): Department | undefined {
  return config.departments.find((d) => d.handle === handle);
}

export function servicesByDepartment(config: SiteConfig, deptHandle: string): Service[] {
  return config.services.filter(
    (s) => s.active !== false && s.category === deptHandle
  );
}

export function featuredServices(config: SiteConfig): Service[] {
  return config.services.filter((s) => s.active !== false && s.featured);
}

export function featuredDoctors(config: SiteConfig): Doctor[] {
  return config.doctors.filter((d) => d.active !== false && d.featured);
}

export function activeServices(config: SiteConfig): Service[] {
  return config.services.filter((s) => s.active !== false);
}

export function activeDoctors(config: SiteConfig): Doctor[] {
  return config.doctors.filter((d) => d.active !== false);
}

/* ----------------------------- Rating ---------------------------------- */

export function renderStars(rating: number): string {
  return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}
