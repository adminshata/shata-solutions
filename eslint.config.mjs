import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "public/templates/**",
      "references/**",
    ],
  },
  nextPlugin.flatConfig.coreWebVitals,
];

export default eslintConfig;
