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
  plugins: ['jest'],
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
      files: ['__tests__/**/*.js'],
      env: { jest: true },
      plugins: ['jest'],
      ...require('eslint-plugin-jest').configs.recommended,
    },
  ],
};

// overrides: [
//   Object.assign(
//     {
//       files: ['**/*.jest.js']
//     },
//     require('eslint-plugin-jest').configs.recommended
//   )
// ]
module.exports = config;
