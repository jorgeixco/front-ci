import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import cypressPlugin from 'eslint-plugin-cypress';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'], // Incluye todos los archivos que deseas analizar
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.cypress,
      },
    },
  },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  prettierConfig,
  {
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
