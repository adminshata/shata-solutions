import type { SiteTheme, MenuItem, TeamMember, SiteConfig, MenuCategory } from "./types";

/* -------------------------------- Theme -------------------------------- */

const RADIUS_PX = { sm: "4px", md: "8px", lg: "16px" } as const;

export function themeVars(theme: SiteTheme): Record<string, string> {
  return {
    "--cafe-primary":    theme.primary,
    "--cafe-primary-fg": theme.primaryFg,
    "--cafe-accent":     theme.accent,
    "--cafe-bg":         theme.background,
    "--cafe-fg":         theme.foreground,
    "--cafe-muted":      theme.muted,
    "--cafe-surface":    theme.surface,
    "--cafe-border":     theme.border,
    "--cafe-radius":     RADIUS_PX[theme.radius],
  };
}

/* ----------------------------- Lookups --------------------------------- */

export function featuredMenuItems(config: SiteConfig): MenuItem[] {
  return config.menuItems.filter((m) => m.active !== false && m.featured);
}

export function menuByCategory(config: SiteConfig, categoryId: string): MenuItem[] {
  return config.menuItems.filter((m) => m.active !== false && m.category === categoryId);
}

export function featuredTeam(config: SiteConfig): TeamMember[] {
  return config.team.filter((t) => t.featured);
}

export function findMenuItem(config: SiteConfig, handle: string): MenuItem | undefined {
  return config.menuItems.find((m) => m.handle === handle);
}

export function findMenuCategory(config: SiteConfig, id: string): MenuCategory | undefined {
  return config.menuCategories.find((c) => c.id === id);
}

export function activeMenuItems(config: SiteConfig): MenuItem[] {
  return config.menuItems.filter((m) => m.active !== false);
}
