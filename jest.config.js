// module.exports = {
//   testMatch: ['**/__tests__/tests/**/*jest.js'],
//   setupFilesAfterEnv: ['./__tests__/setup'],
//   testEnvironment: 'node',
// };

const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');
const path = require('path');

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/tests/**/*jest.(js|ts)'],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
