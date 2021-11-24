import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from "vite-plugin-windicss";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    vue(),
    WindiCSS(),
    Icons({ compiler: "vue3" }),
    Components({ dts: true }),
  ],
});
