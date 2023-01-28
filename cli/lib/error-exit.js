const logger = require('../../lib/utilities/logger');

module.exports = (error) => {
  logger.cli.enable().error('%O', error);
  process.exit(1);
};
