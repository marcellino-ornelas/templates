const path = require('path');
const debug = require('debug');
const INIT_OPTIONS = require('../options/init');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const { isDir } = require('../../lib/utilities/fileSystem');
const { cliLog } = require('../../lib/utilities/helpers');
const {
  InitializedAlready,
  ParentDirectoryInitializedError
} = require('../../lib/errors');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = INIT_OPTIONS;

exports.handler = argv => {
  if (argv.verbose) {
    debug.enable('tps');
  }

  const temp = new Template('init', {
    force: argv.force,
    verbose: argv.verbose,
    tpsPath: TPS.MAIN_TPS
  });

  const inProcessBuilds = [];
  const initFolder = path.join(TPS.INIT_LOCAL_PATH, TPS.TPS_FOLDER);

  if (!TPS.HAS_GLOBAL) {
    inProcessBuilds.push(temp.render(TPS.GLOBAL_PATH));
  }

  if (!argv.force && isDir(initFolder)) {
    throw new InitializedAlready(TPS.INIT_LOCAL_PATH);
  }

  if (argv.force || !isDir(TPS.LOCAL_PATH)) {
    inProcessBuilds.push(temp.render(TPS.INIT_LOCAL_PATH));
  } else {
    throw new ParentDirectoryInitializedError(TPS.LOCAL_PATH);
  }

  Promise.all(inProcessBuilds)
    .then(() => console.log('tps initialized'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};
