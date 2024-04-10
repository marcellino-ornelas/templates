import { CommandModule } from 'yargs';
import debug from 'debug';
import { errorExit, logAndThrow } from '@tps/cli/utils/error-exit';
import Template from '@tps/templates';
import { TemplateOptions, Templates } from '@tps/templates/templates';
import * as TPS from '@tps/utilities/constants';
import {
	InitializedAlreadyError,
	GlobalInitializedAlreadyError,
} from '@tps/errors';
import logger from '@tps/utilities/logger';
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
				logAndThrow(new GlobalInitializedAlreadyError(TPS.USER_HOME));
			}

			await tps.render(TPS.USER_HOME);

			const initializedFolder = path.join(TPS.USER_HOME, TPS.TPS_FOLDER);

			logger.cli.info('Globally initialized %s', initializedFolder);

			console.log(initializedFolder);

			return;
		}

		/**
		 * tps local init
		 */
		logger.cli.info('Tps local location: %s', TPS.CWD);

		if (Templates.directoryIsTpsInitialized(TPS.CWD)) {
			logAndThrow(new InitializedAlreadyError(TPS.CWD));
		}

		logger.cli.info('Initializing repo...');

		await tps.render(TPS.CWD);

		const initializedFolder = path.join(TPS.CWD, TPS.TPS_FOLDER);

		logger.cli.info('Repo initialized %s', initializedFolder);

		console.log(initializedFolder);
	},
} as CommandModule<object, InitArgv>;
