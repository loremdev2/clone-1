import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Get the current file name and directory using Node.js path utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat with the base directory of the current file
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend ESLint configuration with Next.js and TypeScript
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'), // Add Next.js core rules and TypeScript rules
  compat.config({
    rules: {
      'react/no-unescaped-entities': 'off', // Disable this rule (customize based on your needs)
      '@next/next/no-page-custom-font': 'off', // Disable custom font rule
      '@typescript-eslint/no-unused-vars': ['warn'], // Warn about unused variables instead of throwing errors
      'no-unused-vars': 'off', // Disable unused variable checks globally (optional)
      '@typescript-eslint/no-explicit-any': 'warn', // Warn on the usage of 'any' type
      'react/jsx-uses-react': 'off', // Disable the rule requiring React to be in scope for JSX (Next.js handles this)
      'react/jsx-uses-vars': 'warn', // Warn about unused variables in JSX
      'no-console': 'warn', // Warn when using console logs
    },
  }),
];

export default eslintConfig;