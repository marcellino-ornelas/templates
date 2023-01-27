const path = require('path');
// const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  testMatch: ['!**/lib/**', '**/__tests__/tests/**/*jest.(js|ts)'],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@tps/(.+)$': path.join(__dirname, 'src/$1'),
    '^@test/(.+)$': path.join(__dirname, '__tests__/$1'),
  },
};
