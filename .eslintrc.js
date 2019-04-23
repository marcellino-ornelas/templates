const path = require('path');

const config = {
  env: { node: 1 },
  extends: ['airbnb', 'prettier'],
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
  }
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
