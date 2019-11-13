import path from 'path';
import { TPS_FOLDER } from '@tps/utilities/constants';

export const TESTING_TPS = path.join(__dirname, `../${TPS_FOLDER}`);

export const TESTING_PACKAGE_FILES = [
  './index.js',
  './db',
  './db/db.js',
  './server',
  './storeUtils',
  './storeUtils/user.js'
];

export const INIT_PACKAGE_FILES = ['.tpsrc'];

export const TESTING_DIR =
  path.normalize(process.env.TEST_DIR) || path.join(__dirname, '../');

/**
 * In order to test init we need to use another folder other than this repo.
 * this is because tps init yells at you if your repo is already initialized.
 */
export const TESTING_INIT_DIR = path.join(TESTING_DIR, '../');

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
