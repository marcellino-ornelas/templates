const path = require('path');

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
    'no-console': 0,
    'import/no-named-as-default': 0,
    'class-methods-use-this': 0,
    'func-names': [2, 'as-needed'],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'spaced-comment': [2, 'always', { exceptions: ['*'] }],
    'no-underscore-dangle': [2, { allowAfterThis: true }]
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
