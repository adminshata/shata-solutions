import type { Config } from "tailwindcss";
import { baseConfig } from "@shata/config/tailwind/base";

const config: Config = {
  ...baseConfig,
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
