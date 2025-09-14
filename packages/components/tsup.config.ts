import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles.css"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react", "react-dom"],
  splitting: false,
  sourcemap: true,
  clean: true,
  loader: {
    ".css": "css",
  },
});
