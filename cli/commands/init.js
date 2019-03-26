const path = require('path');
const os = require('os');
const findUp = require('find-up');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const { isDir } = require('../../lib/utilities/fileSystem');
const { cliLog } = require('../../lib/utilities/helpers');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = yargs =>
  yargs.option('force', {
    alias: 'f',
    describe: 'Initialize tps in cwd no matter what',
    type: 'boolean'
  });

exports.handler = function(argv) {
  const temp = new Template();
  const localDest = process.cwd();

  temp.use('init', {
    tpsPath: TPS.MAIN_TPS
  });

  // TODO: Take out when default packages are ready
  temp.loadPackage('default');

  const inProcessBuilds = [];

  if (!TPS.HAS_GLOBAL) {
    inProcessBuilds.push(temp.render(TPS.GLOBAL_PATH));
  }

  if (argv.force || !isDir(TPS.LOCAL_PATH)) {
    const initFolder = path.join(TPS.INIT_LOCAL_PATH, TPS.TPS_FOLDER);
    if (isDir(initFolder)) {
      cliLog('This folder is already initialized with tps');
      process.exit(1);
    } else {
      inProcessBuilds.push(temp.render(TPS.INIT_LOCAL_PATH));
    }
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
