import { build } from "esbuild";
import { copy, ensureDir, readdir, remove } from "fs-extra";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildOptions } from "./esbuild.config";

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const SRC_DIR = resolve(__dirname, "src");
const DIST_DIR = resolve(__dirname, "dist");
const PUBLIC_DIR = resolve(__dirname, "public");

async function copyFiles(sourceDir: string, targetDir: string, ext: string) {
  const files = await readdir(sourceDir, { recursive: true, withFileTypes: true });

  for (const file of files) {
    if (!file.isFile() || !file.name.endsWith(ext)) continue;

    const relativePath = file.parentPath?.replace(sourceDir + "/", "") ?? "";
    const srcPath = join(file.parentPath ?? sourceDir, file.name);
    const destPath = join(targetDir, relativePath, file.name);

    await ensureDir(dirname(destPath));
    await copy(srcPath, destPath, { overwrite: true });
  }
}

async function runBuild() {
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
    } catch (error) {
      console.error(`Error copying manifest: ${error}`);
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
}

// Execute build
runBuild();
