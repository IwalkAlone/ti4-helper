import { defineConfig } from "vite-plugin-windicss";
import defaultTheme from "windicss/defaultTheme";

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        ti4: ["'Handel Gothic'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        space: "rgba(49, 49, 80)",
      },
    },
  },
});
