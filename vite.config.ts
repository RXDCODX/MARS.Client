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
    // Включаем code splitting для CSS - каждый lazy компонент получит свой CSS файл
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Настройка имен для JS чанков
        chunkFileNames: "assets/js/[name]-[hash].js",
        // Настройка имен для entry файлов
        entryFileNames: "assets/js/[name]-[hash].js",
        // Настройка имен для статических ассетов по типам
        assetFileNames: assetInfo => {
          // Используем names (массив) вместо устаревшего name
          const name = assetInfo.names?.[0] || "";

          // CSS файлы
          if (name.endsWith(".css")) {
            return "assets/css/[name]-[hash].css";
          }

          // Изображения
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          }

          // Видео
          if (/\.(mp4|webm|ogg|mov|avi)$/i.test(name)) {
            return "assets/videos/[name]-[hash][extname]";
          }

          // Аудио
          if (/\.(mp3|wav|ogg|flac|aac|m4a)$/i.test(name)) {
            return "assets/audio/[name]-[hash][extname]";
          }

          // Шрифты
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          // Все остальные файлы
          return "assets/other/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    port: 44478,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "mixed-decls",
          "color-functions",
          "global-builtin",
          "import",
        ],
      },
    },
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
