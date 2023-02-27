const debug = require('debug');
const is = require('is');
const Template = require('../../lib/templates');
const errorExit = require('./error-exit');
const logger = require('../../lib/utilities/logger');

module.exports.createHandler = (argv) => {
  /**
   * if we ever want to be able to pass a name in then we should add this to the flags.
   * @example
   * {
   *  "name": {
   *    "alias": "n",
   *    "describe": "Name for template rendering. defaults to base name of the destination path",
   *    "type": "string"
   *  },
   * }
   */
  const dest = process.cwd();

  if (argv.verbose) {
    debug.enable('tps,tps:cli');
  }

  const {
    newFolder,
    force,
    wipe,
    default: _default,
    packages,
    buildPaths,
    ...answers
  } = argv;

  const tpsConfig = {
    newFolder,
    force,
    wipe,
    default: _default,
  };

  logger.cli.info('Tps Config: %n', tpsConfig);
  const tps = new Template(argv.use, tpsConfig);

  if (is.array(packages) && !is.array.empty(packages)) {
    logger.cli.info('Loading packages:', packages);
    tps.loadPackages(packages);
  }

  if (tps.hasPrompts()) {
    logger.cli.info('Answers to prompts: %n', answers);
    tps.setAnswers(answers);
  }

  const hasBuildPaths = !is.array.empty(buildPaths);
  const renderItems = hasBuildPaths ? buildPaths : null;

  const renderData = {
    name: argv.name,
  };

  logger.cli.info('Build paths: %n', tpsConfig);

  tps
    .render(dest, renderItems, renderData)
    .then(() => {
      logger.cli.log('process done');
      process.exit(0);
    })
    .catch(errorExit);
};
