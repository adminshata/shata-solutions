import type { SiteConfig } from "./types";

export function themeVars(t: SiteConfig["theme"]): Record<string, string> {
  return {
    "--c1-header":  t.headerColor,
    "--c1-body":    t.bodyColor,
    "--c1-accent":  t.accentColor,
    "--c1-primary": t.primaryBg,
    "--c1-light":   t.lightBg,
    "--c1-radius":  t.radius,
    "--c1-border":  `${t.primaryBg}`,
  };
}
