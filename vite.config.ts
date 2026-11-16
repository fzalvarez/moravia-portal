import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

// En desarrollo el backend corre en :8000. El proxy deja la API en el mismo
// origen que el portal: sin CORS y con la cookie de refresco funcionando.
const API_TARGET = "http://localhost:8000";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Moravia — Mi departamento",
        short_name: "Moravia",
        description: "Estado de cuenta, liquidaciones, pagos y avisos de su departamento.",
        lang: "es-PE",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#f8f9fe",
        theme_color: "#0052cc",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Solo la aplicación (HTML, JS, CSS, iconos). Las respuestas de la API
        // nunca se guardan: los datos financieros siempre vienen del servidor.
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//, /^\/health/],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": API_TARGET,
      "/health": API_TARGET,
    },
  },
  preview: {
    proxy: {
      "/api": API_TARGET,
      "/health": API_TARGET,
    },
  },
  build: {
    outDir: "dist",
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
