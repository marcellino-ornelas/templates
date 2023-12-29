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
	handler(argv) {
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
			logger.cli.log('Initializing Global...');
			if (Templates.hasGloablTpsrc()) {
				errorExit(new GlobalInitializedAlreadyError(TPS.GLOBAL_PATH));
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
			logger.cli.info(
				'tps found in parent directory?',
				Templates.hasLocalTpsrc(),
			);
			logger.cli.info('closes tps location', TPS.LOCAL_PATH);

			if (Templates.hasLocalTpsrc() && !argv.force) {
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
	},
} as CommandModule<object, InitArgv>;
