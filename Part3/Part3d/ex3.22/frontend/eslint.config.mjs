import globals from 'globals' //Provides global variables for different environments
import js from '@eslint/js' //Core ESLint rules
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  //Use recommended JavaScript rules as base
  js.configs.recommended,
  {
    //This configuration applies to all .js and .jsx files
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      sourceType: 'module',         //Use ES modules (import/export)
      ecmaVersion: 'latest',          //Use latest Javascript features
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    plugins: {
      '@stylistic/js': stylisticJs,   //Use the stylistic plugin for formatting
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },

    //My specific rules
    rules: {
      //Indentation must be 2 spaces
      '@stylistic/js/indent': ['error', 2],

      //Line endings must be Unix style (\n NOT \r\n)
      '@stylistic/js/linebreak-style': ['error', 'unix'],

      //Must use single quotes for strings
      '@stylistic/js/quotes': ['error', 'single'],

      //No semicolons at the end of lines
      '@stylistic/js/semi': ['error', 'never'],

      //Must use === instead of ==
      eqeqeq: 'error',

      //No spaces at end of lines
      'no-trailing-spaces': 'error',

      //Must have spaces inside curly braces {'' something ''}
      'object-curly-spacing': ['error', 'always'],

      //Must have spaces around arrow functions ('' => '')
      'arrow-spacing': ['error', { before: true, after: true }],

      //Allow console.log statements for debugging and development purposes
      'no-console': 'off',

      //React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      //React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // Allow React to be marked as used when using JSX
      'no-unused-vars': 'off'  // Temporarily disable unused vars check
    },
  },
  {
    //Ignore the dist/ directory
    ignores: ['dist/**'],
  },
]