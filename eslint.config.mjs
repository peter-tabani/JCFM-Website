import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// NOTE: intentionally NOT using @eslint/eslintrc's FlatCompat here.
// Wrapping "next/core-web-vitals" through FlatCompat crashes on this
// ESLint version with "TypeError: Converting circular structure to JSON"
// (the react-hooks plugin's flat config self-references, and FlatCompat's
// legacy validator can't serialize it). Importing the flat configs
// directly avoids the compat layer entirely.
// See: https://github.com/vercel/next.js/discussions/84596

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Disable the apostrophe/quote escaping warning
      "react/no-unescaped-entities": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
