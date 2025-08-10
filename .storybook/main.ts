import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

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
  staticDirs: [
    "../public",
    "../src/components/OBS_Components/FumoFriday/FumosVideos",
  ],
  viteFinal: async config => {
    // Настройка для GitHub Pages
    if (config.base === undefined) {
      config.base = "./";
    }

    // Настройки для обработки видео файлов
    config.assetsInclude = config.assetsInclude || [];
    if (Array.isArray(config.assetsInclude)) {
      config.assetsInclude.push("**/*.webm", "**/*.mp4");
    }

    // Добавляем алиасы для корректной работы с импортами
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@/components": path.resolve(__dirname, "../src/components"),
        "@/Site": path.resolve(__dirname, "../src/Site"),
        "@/shared": path.resolve(__dirname, "../src/shared"),
        "@/contexts": path.resolve(__dirname, "../src/contexts"),
        "@/routes": path.resolve(__dirname, "../src/routes"),
        "@/app": path.resolve(__dirname, "../src/app"),
        "@/assets": path.resolve(__dirname, "../src/assets"),
        "@/styles": path.resolve(__dirname, "../src/styles"),
        "@/utils": path.resolve(__dirname, "../src/shared/Utils"),
        "@/api": path.resolve(__dirname, "../src/shared/api"),
        "@/types": path.resolve(__dirname, "../src/shared/types"),
      };
    }

    // Настройки для CSS модулей
    if (config.css) {
      config.css.modules = {
        ...config.css.modules,
        localsConvention: "camelCase",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      };
    }

    // Добавляем поддержку SCSS
    if (config.css) {
      config.css.preprocessorOptions = {
        ...config.css.preprocessorOptions,
        scss: {
          additionalData: `@import "../src/styles/bootstrap.scss";`,
        },
      };
    }

    return config;
  },
  env: config => ({
    ...config,
    VITE_STATE: "book",
  }),
};
export default config;
