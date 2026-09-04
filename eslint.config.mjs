import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**', 'build/**', 'dist/**', 'coverage/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      strict: ['error', 'global'],
      curly: 'warn',
      'react/prop-types': 'off',
    },
  },
  prettier,
];
