import vuePlugin from 'eslint-plugin-vue'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default ts.config(
  // Shared configs
  js.configs.recommended,
  ...ts.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginPrettierRecommended,
  vuePlugin.configs['flat/recommended'],
  // Custom config
  {
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**', 'eslint.config.js'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
    languageOptions: {
      parser: ts.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        chrome: 'readonly',
      },
    },
    settings: {
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-named-as-default-member': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/prop-types': 'off',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
)