import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Compression для production
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024, // Минимальный размер файла для сжатия (1KB)
    }),
  ],
  assetsInclude: ["**/*.webm", "**/*.mp4"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/Site": path.resolve(__dirname, "./src/Site"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/utils": path.resolve(__dirname, "./src/shared/Utils"),
      "@/api": path.resolve(__dirname, "./src/shared/api"),
      "@/types": path.resolve(__dirname, "./src/shared/types"),
    },
  },
  build: {
    sourcemap: false,
  },
  server: {
    port: 44478,
  },
  optimizeDeps: {
    include: [
      // Twitch библиотеки - для решения проблемы с cacheSymbol в dev режиме
      "@twurple/api",
      "@twurple/auth",
      "@twurple/chat",
      "@mkody/twitch-emoticons",
      // HTML парсер - для предотвращения конфликтов инициализации
      "html-react-parser",
    ],
  },
});
