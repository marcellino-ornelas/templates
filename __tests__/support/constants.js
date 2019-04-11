import path from 'path';

export const TESTING_PACKAGE_FILES = [
  './index.js',
  './db',
  './db/db.js',
  './server',
  './storeUtils',
  './storeUtils/user.js'
];

export const INIT_PACKAGE_FILES = ['.tpsrc'];

export const TESTING_DIR = path.join(__dirname, '../');

/**
 * Prompter constants
 */

export const PROMPTER_QUESTIONS = [
  {
    name: 'test-normal-flag',
    flag: 'test1',
    question: 'test-normal-flag',
    default: ''
  },
  {
    name: 'test-advanced-long',
    flag: {
      long: 'test2'
    },
    question: 'test-advanced-long',
    default: ''
  },
  {
    name: 'test-advanced-short',
    flag: {
      long: 'test3',
      short: 'd'
    },
    question: 'test-advanced-short',
    default: ''
  }
];
