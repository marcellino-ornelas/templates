const eslintPlugin = require('eslint-plugin-jest');

const IGNORE = 0;
const ERROR = 2;

const config = {
  parser: '@typescript-eslint/parser',
  env: { node: 1, es6: true },
  root: true,

  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['jest', 'import'],
  rules: {
    'no-console': IGNORE,
    'import/no-named-as-default': IGNORE,
    'import/prefer-default-export': IGNORE,
    'consistent-return': IGNORE,
    'class-methods-use-this': IGNORE,
    'no-use-before-define': IGNORE,
    'func-names': [ERROR, 'as-needed'],
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'spaced-comment': [ERROR, 'always', { exceptions: ['*'] }],
    'no-underscore-dangle': [ERROR, { allowAfterThis: true }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': IGNORE,
      },
    },
    {
      files: ['__tests__/**/*.js'],
      env: { jest: true },
      plugins: ['jest'],
      ...eslintPlugin.configs.recommended,
    },
    {
      files: ['cli/**/*.js'],
      rules: {
        'import/no-unresolved': IGNORE,
        'import/extensions': IGNORE,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: __dirname,
      },
    },
  },
};

module.exports = config;
