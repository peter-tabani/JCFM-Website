import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // Disable the apostrophe/quote escaping warning
      "react/no-unescaped-entities": "off",
      // Existing data-fetch effects and inline admin menu helpers predate the
      // newer React Compiler checks; keep the rest of the Next lint rules on.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
];

export default eslintConfig;
