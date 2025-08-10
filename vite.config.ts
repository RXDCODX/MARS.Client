import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.webm", "**/*.mp4"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/Site_Components": path.resolve(__dirname, "./src/Site/Site_Components"),
      "@/ControlRoom_Components": path.resolve(__dirname, "./src/Site/ControlRoom_Components"),
      "@/pages": path.resolve(__dirname, "./src/Site"),
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
        assetFileNames: assetInfo => {
          if (!assetInfo.name) {
            return `assets/[name]-[hash][extname]`;
          }
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/webm|mp4/.test(ext)) {
            return `assets/videos/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  server: {
    port: 44478,
  },
});
