const path = require('path');

const IGNORE = 0;
const ERROR = 2;

const config = {
  env: { node: 1, es6: true },

  extends: ['airbnb', 'prettier'],
  plugins: ['jest'],
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  },
  rules: {
    'no-console': IGNORE,
    'import/no-named-as-default': IGNORE,
    'import/prefer-default-export': IGNORE,
    'class-methods-use-this': IGNORE,
    'no-use-before-define': IGNORE,
    'func-names': [ERROR, 'as-needed'],
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'spaced-comment': [ERROR, 'always', { exceptions: ['*'] }],
    'no-underscore-dangle': [ERROR, { allowAfterThis: true }]
  },
  overrides: [
    Object.assign(
      {
        files: ['__tests__/**/*.js'],
        env: { jest: true },
        plugins: ['jest']
      },
      require('eslint-plugin-jest').configs.recommended
    )
  ]
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
