// module.exports = {
//   testMatch: ['**/__tests__/tests/**/*jest.js'],
//   setupFilesAfterEnv: ['./__tests__/setup'],
//   testEnvironment: 'node',
// };

const path = require('path');

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/tests/**/*jest.(js|ts)'],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@tps/(.+)$': path.join(__dirname, 'src/$1'),
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
