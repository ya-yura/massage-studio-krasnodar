import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/massage-studio-krasnodar/",
  plugins: [react()],
  build: { outDir: "dist-pages", emptyOutDir: true },
});
