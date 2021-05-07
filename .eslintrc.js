module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "@looker/eslint-config",
    "@looker/eslint-config/license-header",
    "eslint:recommended",
    "standard",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: "./tsconfig.json"
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      "typescript": {
        "project": "./tsconfig.json"
      }
    },
    "import/external-module-folders": [
      "node_modules",
      "packages"
    ]
  },
  "overrides": [
    {
      "files": [
        "*.js"
      ],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ],
  rules: {
    "array-callback-return": "off",
    "node/no-path-concat": "off",
    "node/no-new-require": "off",
    "node/handle-callback-err": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": "off",
    "camelcase": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/ban-ts-ignore": "warn",
    "no-eval": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "camelcase": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "args": "all",
        "argsIgnorePattern": "^_"
      }
    ],
    "sort-keys-fix/sort-keys-fix": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "import/default": "off",
    "sort-keys": "off",
    "spaced-comment": [
      "error",
      "always",
      {
        "markers": [
          "#region",
          "#endregion"
        ]
      }
    ],
    "header/header": [
      2,
      "config/license-header.js"
    ],
    "no-use-before-define": "off",
    "no-path-concat": "warn"
  }
}
