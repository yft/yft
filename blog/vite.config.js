import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
// import eslintPlugin from "vite-plugin-eslint";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/yft/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    // eslintPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
