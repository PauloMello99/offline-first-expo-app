module.exports = {
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
  endOfLine: "auto",
  printWidth: 120,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["tva"],
  overrides: [
    {
      files: "*.{ts,tsx}",
      options: {
        parser: "typescript",
        trailingComma: "all", // Mantém vírgulas em arrays, objetos e parâmetros
      },
    },
    {
      files: "*.{js,jsx}",
      options: {
        parser: "babel",
        trailingComma: "all",
      },
    },
  ],
};
