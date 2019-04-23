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
    'func-names': [2, 'as-needed'],
    'import/no-named-as-default': 0,
    'class-methods-use-this': 0
  }
};

module.exports = config;
