const path = require('path');
const debug = require('debug');
const INIT_OPTIONS = require('../options/init');
const errorExit = require('../lib/error-exit');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const {
  InitializedAlreadyError,
  ParentDirectoryInitializedError,
  GlobalInitializedAlreadyError
} = require('../../lib/errors');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = INIT_OPTIONS;

exports.handler = argv => {
  if (argv.verbose) {
    debug.enable('tps');
  }

  const tps = new Template('init', {
    force: argv.force,
    verbose: argv.verbose,
    tpsPath: TPS.MAIN_TPS
  });

  /**
   * tps global init
   */
  if (argv.global) {
    if (TPS.HAS_GLOBAL) {
      throw new GlobalInitializedAlreadyError();
    }

    tps
      .render(TPS.INIT_GLOBAL_PATH)
      .then(() => {
        console.log('tps globally initialized');
      })
      .catch(errorExit);
  } else {
    /**
     * tps local init
     */
    // console.log(TPS.IS_TPS_INITIALIZED, TPS.INIT_LOCAL_TPS_PATH);
    if (TPS.IS_TPS_INITIALIZED) {
      throw new InitializedAlreadyError(TPS.INIT_LOCAL_PATH);
    }

    /**
     * if not force then tps folder can not exist in cwd
     */
    // console.log('has_local', TPS.HAS_LOCAL);
    // console.log('local', TPS.LOCAL_PATH);
    if (TPS.HAS_LOCAL && !argv.force) {
      throw new ParentDirectoryInitializedError(TPS.LOCAL_PATH);
    }

    tps
      .render(TPS.INIT_LOCAL_PATH)
      .then(() => {
        console.log('Repo initialized');
      })
      .catch(errorExit);
  }
};
