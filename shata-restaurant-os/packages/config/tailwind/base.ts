import type { Config } from "tailwindcss";

export const baseConfig: Omit<Config, "content"> = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // CSS variable-based semantic colors (shadcn/ui pattern)
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        // Product palette
        brand: {
          DEFAULT: "#FF4500",
          dark: "#CC3700",
          light: "#FFF5F2",
        },
        teal: "#00B4D8",
        success: "#06D6A0",
        warning: "#FFD166",
        danger: "#EF233C",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "ticket-in": {
          from: { transform: "scale(0.95) translateY(-8px)", opacity: "0" },
          to: { transform: "scale(1) translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "ticket-in": "ticket-in 0.25s ease-out",
      },
    },
  },
};
