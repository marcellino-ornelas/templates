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
