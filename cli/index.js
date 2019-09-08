const debug = require('debug');
const yargs = require('yargs');
const GLOBAL_OPTIONS = require('./options/global');

yargs
  .middleware(argv => {
    if (argv.verbose) {
      debug.enable('tps');
    }
  })
  .options(GLOBAL_OPTIONS)
  .commandDir('commands')
  .help().argv;
