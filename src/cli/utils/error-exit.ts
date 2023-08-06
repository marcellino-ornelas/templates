import logger from '@tps/utilities/logger';

export const errorExit = (error) => {
  // @ts-expect-error need types
  logger.cli.enable().error('%O', error);
  process.exit(1);
};
