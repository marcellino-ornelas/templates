const debug = require('debug');
const INIT_OPTIONS = require('../options/init');
const errorExit = require('../lib/error-exit');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const {
  InitializedAlreadyError,
  ParentDirectoryInitializedError,
  GlobalInitializedAlreadyError,
} = require('../../lib/errors');
const logger = require('../../lib/utilities/logger');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = INIT_OPTIONS;

exports.handler = (argv) => {
  if (argv.verbose) {
    debug.enable('tps:cli');
  }

  const tpsConfig = {
    force: argv.force,
    verbose: argv.verbose,
    tpsPath: TPS.MAIN_TPS,
  };

  logger.cli.info('Cli options: %n', tpsConfig);

  const tps = new Template('init', tpsConfig);

  /**
   * tps global init
   */
  if (argv.global) {
    logger.cli.log('Initializing Global...');
    if (TPS.HAS_GLOBAL) {
      errorExit(new GlobalInitializedAlreadyError());
    }

    tps
      .render(TPS.INIT_GLOBAL_PATH)
      .then(() => {
        logger.cli.log('tps globally initialized');
      })
      .catch(errorExit);
  } else {
    /**
     * tps local init
     */
    if (TPS.IS_TPS_INITIALIZED) {
      errorExit(new InitializedAlreadyError(TPS.INIT_LOCAL_PATH));
    }

    /**
     * if not force then tps folder can not exist in cwd
     */
    logger.cli.info('tps found in parent directory?', TPS.HAS_LOCAL);
    logger.cli.info('closes tps location', TPS.LOCAL_PATH);

    if (TPS.HAS_LOCAL && !argv.force) {
      errorExit(new ParentDirectoryInitializedError(TPS.LOCAL_PATH));
    }

    logger.cli.log('Initializing repo...');

    tps
      .render(TPS.INIT_LOCAL_PATH)
      .then(() => {
        logger.cli.log('Repo initialized');
      })
      .catch(errorExit);
  }
};
