module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 7,
    "project": "./tsconfig.json"
  },
  "plugins": [
    "import",
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "node": true,
    "es6": true,
    "jest": true
  },
  "globals": {},
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "no-unused-vars": "off",
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "warn",
          "error"
        ]
      }
    ],
    "no-empty": [
      "error",
      {
        "allowEmptyCatch": true
      }
    ],
    "semi": [
      "warn",
      "never"
    ],
    "eol-last": "warn",
    "comma-dangle": [
      "error",
      "never"
    ]
  }
}
