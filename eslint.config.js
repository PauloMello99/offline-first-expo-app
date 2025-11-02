// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");
const prettier = require("eslint-plugin-prettier");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    plugins: {
      prettier: prettier,
      "unused-imports": unusedImports,
    },
    rules: {
      "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external"], "internal", ["parent", "index", "sibling"]],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["dist/*", "node_modules/*", "build/*", "android/*", "ios/*", "*.config.js", "components/ui/*"],
  },
]);
