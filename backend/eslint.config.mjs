import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**"],
  },
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
