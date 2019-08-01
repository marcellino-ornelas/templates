const path = require('path');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const { isDir } = require('../../lib/utilities/fileSystem');
const { cliLog } = require('../../lib/utilities/helpers');
const debug = require('debug');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = yargs =>
  yargs.option('force', {
    alias: 'f',
    describe: 'Initialize tps in cwd no matter what',
    type: 'boolean'
  });

exports.handler = function(argv) {
  if (argv.verbose) {
    debug.enable('tps');
  }

  const temp = new Template({
    force: argv.force,
    verbose: argv.verbose
  });

  const localDest = process.cwd();

  temp.use('init', {
    tpsPath: TPS.MAIN_TPS
  });

  const inProcessBuilds = [];
  const initFolder = path.join(TPS.INIT_LOCAL_PATH, TPS.TPS_FOLDER);

  if (!TPS.HAS_GLOBAL) {
    inProcessBuilds.push(temp.render(TPS.GLOBAL_PATH));
  }

  if (!argv.force && isDir(initFolder)) {
    cliLog('This folder is already initialized with tps');
    process.exit(1);
  }

  if (argv.force || !isDir(TPS.LOCAL_PATH)) {
    inProcessBuilds.push(temp.render(TPS.INIT_LOCAL_PATH));
  } else {
    cliLog(`\
      tps is already initialized in a parent directory.
      Use this command to initialized this folder anyways.
      'tps init --force'
      [Current tps location]: ${TPS.LOCAL_PATH}
    `);
    process.exit(1);
  }

  Promise.all(inProcessBuilds)
    .then(() => cliLog('Init process complete'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};
