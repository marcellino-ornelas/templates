const debug = require('debug');
const yargs = require('yargs');
const GLOBAL_OPTIONS = require('./options/global');

// eslint-disable-next-line no-unused-expressions
yargs
  .options(GLOBAL_OPTIONS)
  .commandDir('commands')
  .fail((message, err, yargs) => {
    console.log('hey', message, err, yargs);
  })
  .help().argv;
