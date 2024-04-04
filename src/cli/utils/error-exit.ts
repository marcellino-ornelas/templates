import logger from '@tps/utilities/logger';

export const errorExit = (error) => {
	logger.cli.enable().error('%O', error);
	throw error;
};
