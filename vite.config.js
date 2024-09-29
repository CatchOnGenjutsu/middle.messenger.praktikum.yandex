import { resolve } from "path";
import { defineConfig } from "vite";
// import sassPlugin from "vite-plugin-sass";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  // plugins: [sassPlugin()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import url("./src/styles.scss");`,
  //     },
  //   },
  // },
  server: {
    port: 3000,
  },
});
