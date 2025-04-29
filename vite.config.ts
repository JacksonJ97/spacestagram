import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/spacestagram/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      data: "/src/data",
      pages: "/src/pages",
      utils: "/src/utils",
    },
  },
});
