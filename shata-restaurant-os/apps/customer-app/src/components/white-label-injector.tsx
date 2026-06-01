"use client";

import { useEffect } from "react";

interface WhiteLabelConfig {
  appName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
  faviconUrl?: string;
  hideShataLogo?: boolean;
}

interface Props {
  config: WhiteLabelConfig | null;
}

export function WhiteLabelInjector({ config }: Props) {
  useEffect(() => {
    if (!config) return;

    if (config.primaryColor) {
      document.documentElement.style.setProperty("--color-brand", config.primaryColor);
      document.documentElement.style.setProperty("--color-brand-dark", adjustColor(config.primaryColor, -20));
    }
    if (config.secondaryColor) {
      document.documentElement.style.setProperty("--color-teal", config.secondaryColor);
    }
    if (config.appName) {
      document.title = config.appName;
    }
    if (config.faviconUrl) {
      const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']") ?? document.createElement("link");
      link.rel = "icon";
      link.href = config.faviconUrl;
      document.head.appendChild(link);
    }
  }, [config]);

  return null;
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}
