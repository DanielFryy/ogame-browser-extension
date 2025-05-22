import { type BuildOptions } from "esbuild";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const buildOptions: BuildOptions = {
  entryPoints: [
    resolve(__dirname, "src/background/background.ts"),
    resolve(__dirname, "src/content/content.ts"),
    resolve(__dirname, "src/popup/popup.tsx"),
    resolve(__dirname, "src/options/options.tsx")
  ],
  bundle: true,
  outdir: "dist",
  platform: "browser",
  format: "iife",
  target: "es2020",
  minify: process.env.NODE_ENV === "production",
  sourcemap: process.env.NODE_ENV !== "production",
  loader: {
    ".tsx": "tsx",
    ".ts": "ts",
    ".js": "js",
    ".css": "css",
    ".json": "json",
    ".png": "dataurl",
    ".svg": "dataurl"
  },
  define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development") },
  treeShaking: true,
  logLevel: "info",
  metafile: true // Useful for bundle analysis
};
