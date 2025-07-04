import globals from 'globals' //Provides global variables for different environments
import js from '@eslint/js' //Core ESLint rules
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  //Use recommended JavaScript rules as base
  js.configs.recommended,
  {
    //This configuration applies to all .js files
    files: ['**/*.js'],

    languageOptions: {
      sourceType: 'commonjs',         //Use CommonJS module system (require(), module.exports)
      globals: { ...globals.node },   //Allow Node.js global variables
      ecmaVersion: 'latest',          //Use latest Javascript features
    },

    plugins: {
      '@stylistic/js': stylisticJs,   //Use the stylistic plugin for formatting
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
    },
  },
  {
    //Ignore the dist/ directory
    ignores: ['dist/**'],
  },
]