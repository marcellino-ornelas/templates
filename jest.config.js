const path = require('path');
// const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: true,
      },
    ],
  },
  testMatch: ['!**/lib/**', '**/__tests__/tests/**/*jest.(js|ts)'],
  testPathIgnorePatterns: [
    // TODO: need to fix cli tests
    '<rootDir>/__tests__/tests/cli',
  ],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@tps/(.+)$': path.join(__dirname, 'src/$1'),
    '^@test/(.+)$': path.join(__dirname, '__tests__/$1'),
  },
};
