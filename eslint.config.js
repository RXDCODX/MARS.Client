//*@ts-check*
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { fixupConfigRules } from "@eslint/compat";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier"; // Import the Prettier plugin
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  ...fixupConfigRules({
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      typescriptEslint,
      "simple-import-sort": simpleImportSort,
      react: react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "unicode-bom": "error",
      "arrow-body-style": "error",
      "prefer-arrow-callback": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "react/no-children-prop": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message: "Импортируйте конкретные объекты, а не весь React.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true, endOfLine: "auto" },
      ],
    },
    ignores: [
      "src/services/*",
      "dist/**",
      "node_modules/**",
      "**/*.md",
      "build/**",
      "vite.config.ts",
      "obj/**",
    ],
  }),
  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
      },
    },
  },
  eslintConfigPrettier,
);
