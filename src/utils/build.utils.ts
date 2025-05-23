import { copy, ensureDir, readdir } from "fs-extra";
import { join, dirname, relative } from "node:path";

export const copyFiles = async (sourceDir: string, targetDir: string, ext: string) => {
  if (!sourceDir || !targetDir || !ext) {
    throw new Error("Invalid parameters: sourceDir, targetDir, and ext are required");
  }

  try {
    const files = await readdir(sourceDir, { recursive: true, withFileTypes: true });

    for (const file of files) {
      if (!file.isFile() || !file.name.endsWith(ext)) continue;

      // More compatible approach for getting parent path
      const filePath = file.parentPath ?? sourceDir;
      const relativePath = relative(sourceDir, filePath);
      const srcPath = join(filePath, file.name);
      const destPath = join(targetDir, relativePath, file.name);

      await ensureDir(dirname(destPath));
      await copy(srcPath, destPath, { overwrite: true });
    }
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;
    throw new Error(`Failed to copy files: ${errorMessage}`);
  }
};
