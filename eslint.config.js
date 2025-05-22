import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { configs, config } from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const eslintConfig = config(
  eslint.configs.recommended,
  configs.recommended,
  prettierConfig,
  { plugins: { prettier: prettierPlugin } },
  includeIgnoreFile(gitignorePath),
  {
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    settings: { "import/resolver": { typescript: true } },
    rules: {
      // Prettier
      "prettier/prettier": ["error"],

      // Typescript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { vars: "all", args: "none", ignoreRestSiblings: false }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-interface": "off",
      // Import rules
      "import/no-duplicates": "off",
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal", "parent", "sibling", "index"], ["object"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: false }
        }
      ]
    }
  }
);

export default eslintConfig;
