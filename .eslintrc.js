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
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'jest', 'import'],
  rules: {
    'no-console': IGNORE,
    'import/no-named-as-default': IGNORE,
    'import/prefer-default-export': IGNORE,
    'consistent-return': IGNORE,
    'class-methods-use-this': IGNORE,
    'no-use-before-define': IGNORE,
    'arrow-body-style': IGNORE,
    'func-names': [ERROR, 'as-needed'],
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'spaced-comment': [ERROR, 'always', { exceptions: ['*'] }],
    'no-underscore-dangle': [ERROR, { allowAfterThis: true }],
    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', '.mdx'] }],
    'import/extensions': [
      ERROR,
      {
        ts: 'never',
        svg: 'always',
      },
    ],
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
    {
      files: ['docs/**/*.mdx'],
      extends: ['plugin:@docusaurus/recommended'],
      plugins: ['@docusaurus'],
      parser: 'eslint-mdx',
      rules: {
        'import/no-unresolved': [
          ERROR,
          { ignore: ['^@theme', '^@docusaurus', '^@site'] },
        ],
        'react/react-in-jsx-scope': [IGNORE],
        'react/self-closing-comp': [IGNORE],
      },
    },
    {
      files: ['docs/**/*.tsx'],
      plugins: ['react'],
      rules: {
        'import/no-unresolved': [
          ERROR,
          { ignore: ['^@theme', '^@docusaurus', '^@site'] },
        ],
        'react/function-component-definition': [
          ERROR,
          {
            namedComponents: 'arrow-function',
          },
        ],
        'react/require-default-props': [IGNORE],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: __dirname,
      },
      node: true,
    },
  },
};

module.exports = config;
