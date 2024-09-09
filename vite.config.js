import { defineConfig } from "vite";
import { resolve } from "path";
import handlebarsPrecompilePlugin from "./vite-handlebars-precompile-plugin";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  plugins: [handlebarsPrecompilePlugin()],
});
