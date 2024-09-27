import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 6,
        project: "./tsconfig.json",
      },
    },
    rules: {
      "react/jsx-filename-extension": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/no-useless-constructor": "off",
      "constructor-super": "off",
      "@typescript-eslint/ban-tslint-comment": "error",
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
