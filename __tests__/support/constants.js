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
    name: 'testingPrompt',
    aliases: ['test1', 't'],
    message: 'This is a testing testing prompt',
    default: 'default value'
  }
];
