// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        services: resolve(__dirname, "services.html"),
        projects: resolve(__dirname, "projects.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
