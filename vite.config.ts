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
    rollupOptions: {
      output: {
        // Разделение на chunks для оптимизации загрузки
        manualChunks: id => {
          // Основные библиотеки React
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "react-vendor";
          }
          // Bootstrap и UI компоненты
          if (
            id.includes("node_modules/react-bootstrap") ||
            id.includes("node_modules/bootstrap")
          ) {
            return "ui-vendor";
          }
          // Иконки
          if (id.includes("node_modules/lucide-react")) {
            return "icons-lucide";
          }
          if (id.includes("node_modules/bootstrap-icons")) {
            return "icons-bootstrap";
          }
          if (id.includes("node_modules/react-icons")) {
            return "icons-fa";
          }
          // SignalR
          if (
            id.includes("node_modules/@microsoft/signalr") ||
            id.includes("node_modules/react-signalr")
          ) {
            return "signalr";
          }
          // Twitch API
          if (id.includes("node_modules/@twurple")) {
            return "twitch-vendor";
          }
          // Анимации
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/react-simple-animate") ||
            id.includes("node_modules/react-canvas-confetti")
          ) {
            return "animations";
          }
          // Chart и визуализация
          if (id.includes("node_modules/recharts")) {
            return "charts";
          }
          // Остальные vendor библиотеки
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        assetFileNames: assetInfo => {
          if (!assetInfo.name) {
            return `assets/[name]-[hash][extname]`;
          }
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/webm|mp4/.test(ext)) {
            return `assets/videos/[name]-[hash][extname]`;
          }
          if (/svg/.test(ext)) {
            return `assets/icons/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Увеличиваем chunk size warning limit для больших компонентов
    chunkSizeWarningLimit: 1000,
    // Включить minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Удалить console.log в production
        drop_debugger: true,
      },
    } as any,
    // Включить source maps только для development
    sourcemap: false,
  },
  server: {
    port: 44478,
  },
  // Оптимизация для dev режима
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@microsoft/signalr",
      "react-bootstrap",
    ],
    exclude: [
      // Исключаем из pre-bundling тяжелые библиотеки иконок
      "@fortawesome/free-solid-svg-icons",
      "react-icons",
    ],
  },
});
