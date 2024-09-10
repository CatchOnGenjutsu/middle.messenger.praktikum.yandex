import { resolve } from "path";
import { defineConfig } from "vite";
// import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
  server: {
    port: 3000,
  },
});
