import logger from '@tps/utilities/logger';

export const errorExit = (error) => {
	logger.cli.enable().error('%O', error);
	process.exit(1);
};

export const logAndThrow = (error: Error): void => {
	logger.cli.error(error);

	throw error;
};
