import { type BuildOptions } from "esbuild";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const paths = [
  "src/background/background.ts",
  "src/content/content.ts",
  "src/popup/popup.tsx",
  "src/options/options.tsx"
];

export const buildOptions: BuildOptions = {
  entryPoints: paths.map(path => resolve(__dirname, path)),
  bundle: true,
  outdir: "dist",
  platform: "browser",
  format: "iife",
  target: "es2020",
  external: ["webextension-polyfill"],
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
