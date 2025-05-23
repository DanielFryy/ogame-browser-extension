import { build } from "esbuild";
import { copy, ensureDir, readdir, remove } from "fs-extra";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildOptions } from "./esbuild.config";
import { copyFiles } from "@/utils/build.utils";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const SRC_DIR = resolve(__dirname, "src");
const DIST_DIR = resolve(__dirname, "dist");
const PUBLIC_DIR = resolve(__dirname, "public");

const runBuild = async () => {
  try {
    // Clean dist directory
    await remove(DIST_DIR);

    // Create dist directory
    await ensureDir(DIST_DIR);

    // Build the TypeScript files
    await build(buildOptions);

    // Copy and rename manifest based on target browser
    const targetBrowser = process.env.TARGET_BROWSER ?? "firefox";
    console.log(`Building for ${targetBrowser}...`);

    const manifestSource = join(PUBLIC_DIR, `manifest.${targetBrowser}.json`);
    const manifestDest = join(DIST_DIR, "manifest.json");

    try {
      await copy(manifestSource, manifestDest, { overwrite: true });
      console.log(`Copied manifest for ${targetBrowser}`);

      // Copy webextension-polyfill
      const polyfillSource = join(
        __dirname,
        "node_modules/webextension-polyfill/dist/browser-polyfill.min.js"
      );
      const polyfillDest = join(DIST_DIR, "browser-polyfill.min.js");
      await ensureDir(dirname(polyfillDest));
      await copy(polyfillSource, polyfillDest, { overwrite: true });
      console.log("Copied webextension-polyfill");
    } catch (error) {
      console.error(`Error copying files: ${error}`);
      throw error;
    }

    // Copy other static files from public (excluding manifest files)
    const files = await readdir(PUBLIC_DIR, { withFileTypes: true });
    for (const file of files) {
      if (file.name.startsWith("manifest.")) continue;
      const srcPath = join(PUBLIC_DIR, file.name);
      const destPath = join(DIST_DIR, file.name);
      await copy(srcPath, destPath);
    }

    // Copy HTML and CSS files from src to dist
    await Promise.all([
      copyFiles(SRC_DIR, DIST_DIR, ".html"),
      copyFiles(SRC_DIR, DIST_DIR, ".css")
    ]);

    console.log("✨ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
};

// Execute build
runBuild();
