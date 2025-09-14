import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "../../packages/components/src"),
      "@/ui": path.resolve(__dirname, "../../packages/components/src/ui"),
      "@/lib": path.resolve(__dirname, "../../packages/components/src/lib"),
    },
  },
});
