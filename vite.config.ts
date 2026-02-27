import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/Arcanoid-POC/",
  server: {
    port: 8080,
    open: true,
  },
});
