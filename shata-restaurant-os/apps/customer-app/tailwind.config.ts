import type { Config } from "tailwindcss";
import { baseConfig } from "../../packages/config/tailwind/base";

// Premium café design system — overrides/extends the shared base palette
// for the customer app only (other apps keep the base orange "brand").
const config: Config = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      fontFamily: {
        ...baseConfig.theme?.extend?.fontFamily,
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        ...baseConfig.theme?.extend?.colors,
        // FIX: base config defines `background` via rgb(var(--background)) but
        // our --background var is stored as HSL triples — rgb() misreads the
        // hue/sat/lightness numbers as raw RGB channels, producing a strong
        // blue/purple fill. Override with hsl() to match how the var is stored.
        background: "hsl(var(--background) / <alpha-value>)",
        // Warm café palette — espresso brown + caramel + cream
        brand: {
          DEFAULT: "#1E3932",
          dark: "#142822",
          light: "#2D5016",
        },
        success: "#7FA58B",
        primary: {
          DEFAULT: "#4A2E1F",
          dark: "#2A1810",
        },
        secondary: "#EAD7C0",
        accent: {
          DEFAULT: "#B9824A",
          light: "#EAD7C0",
        },
        cream: "#F8F3EA",
        surface: "#FFFFFF",
        error: "#DC2626",
      },
    },
  },
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
