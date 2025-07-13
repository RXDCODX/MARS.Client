import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public", "../src/components/FumoFriday/FumosVideos"],
  viteFinal: async (config) => {
    // Настройка для GitHub Pages
    if (config.base === undefined) {
      config.base = "./";
    }

    // Настройки для обработки видео файлов
    config.assetsInclude = config.assetsInclude || [];
    if (Array.isArray(config.assetsInclude)) {
      config.assetsInclude.push("**/*.webm", "**/*.mp4");
    }

    return config;
  },
  env: (config) => ({
    ...config,
    VITE_STATE: "book",
  }),
};
export default config;
