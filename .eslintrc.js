const path = require('path');

const config = {
  env: {
    node: 1
  },
  extends: ['airbnb', 'prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  },
  rules: {
    'no-underscore-dangle': [
      2,
      {
        allowAfterThis: true
      }
    ],
    'func-names': [2, 'as-needed']
  }
};

module.exports = config;
