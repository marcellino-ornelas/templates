const debug = require('debug');
const logger = require('../lib/utilities/logger/index');
const { IS_TESTING } = require('../lib/utilities/constants');
const yargs = require('yargs');
const GLOBAL_OPTIONS = require('./options/global');

// if (IS_TESTING) {
//   logger.cli.opts.disableLog = true;
// }

// eslint-disable-next-line no-unused-expressions
yargs
  .options(GLOBAL_OPTIONS)
  .commandDir('commands')
  .help().argv;
