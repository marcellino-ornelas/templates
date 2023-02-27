const logger = require('../../lib/utilities/logger').default;

module.exports = (error) => {
  logger.cli.enable().error('%O', error);
  process.exit(1);
};
