module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/tests/**/*jest.(js|ts)'],
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
