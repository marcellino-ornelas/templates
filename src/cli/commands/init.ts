import { CommandModule } from 'yargs';
import debug from 'debug';
import { errorExit } from '@tps/cli/utils/error-exit';
import Template from '@tps/templates';
import { TemplateOptions, Templates } from '@tps/templates/templates';
import * as TPS from '@tps/utilities/constants';
import {
	InitializedAlreadyError,
	ParentDirectoryInitializedError,
	GlobalInitializedAlreadyError,
} from '@tps/errors';
import logger from '@tps/utilities/logger';
import { isDir } from '@tps/utilities/fileSystem';
import path from 'path';

interface InitArgv {
	force: boolean;
	global: boolean;
	verbose: boolean;
}

export default {
	command: ['init', 'i'],
	builder: {
		force: {
			alias: 'f',
			describe: 'Initialize tps in cwd no matter what',
			type: 'boolean',
		},
		global: {
			alias: 'g',
			describe: 'Initialize tps globally',
			type: 'boolean',
		},
	},
	describe: 'Initialize local settings',
	async handler(argv) {
		if (argv.verbose) {
			debug.enable('tps:cli');
		}

		const tpsConfig: Partial<TemplateOptions> = {
			force: argv.force,
			//   verbose: argv.verbose,
			tpsPath: TPS.DEFAULT_TPS,
		};

		logger.cli.info('Cli options: %n', tpsConfig);

		const tps = new Template('init', tpsConfig);

		/**
		 * tps global init
		 */
		if (argv.global) {
			logger.cli.info('Initializing Global...');

			if (Templates.hasGloablTps()) {
				const error = new GlobalInitializedAlreadyError(TPS.USER_HOME);

				logger.cli.error(error);

				throw error;
			}

			return tps
				.render(TPS.USER_HOME)
				.then(() => {
					logger.cli.log('tps globally initialized');
				})
				.catch(errorExit);
		}

		/**
		 * tps local init
		 */
		logger.cli.info('Tps local location: %s', TPS.CWD);

		if (Templates.directoryIsTpsInitialized(TPS.CWD)) {
			const error = new InitializedAlreadyError(TPS.CWD);

			logger.cli.error(error);

			throw error;
		}

		logger.cli.info('Initializing repo...');

		return tps
			.render(TPS.CWD)
			.then(() => {
				logger.cli.log('Repo initialized');
			})
			.catch(errorExit);
	},
} as CommandModule<object, InitArgv>;
