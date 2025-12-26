import js from "@eslint/js"
import jsdoc from "eslint-plugin-jsdoc"
import globals from "globals"
import {defineConfig} from "eslint/config"

const jsdocRecommended = jsdoc.configs["flat/recommended"]

export default defineConfig([
  {
    ignores: ["build/**"]
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      ...jsdocRecommended.plugins
    },
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jasmine
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdocRecommended.rules
    }
  }
])
