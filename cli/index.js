const yargs = require('yargs');
const GLOBAL_OPTIONS = require('./options/global');

yargs
  .options(GLOBAL_OPTIONS)
  .commandDir('commands')
  .help().argv;
