const yargs = require('yargs');

yargs
  .option('verbose', {
    alias: 'v',
    describe: 'More in-depth logging',
    type: 'boolean'
  })
  .commandDir('commands')
  .help().argv;
