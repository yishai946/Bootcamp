// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      // ESLint core rules
      ...js.configs.recommended.rules,

      // TypeScript ESLint rules
      ...tseslint.configs.recommended.rules,

      // React rules
      ...pluginReact.configs.flat.recommended.rules,

      // Prettier integration
      'prettier/prettier': 'error',

      // Correct way to check unused vars in TS
      'no-unused-vars': 'off', // Turn off core rule
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Optional: warn on undefined vars
      'no-undef': 'warn',
    },
  },
]);
