import fs from 'fs';
import pjson from 'prettyjson-256';
import is from 'is';
import * as TPS from '@tps/utilities/constants';
import { CommandModule } from 'yargs';
import Templates from '@tps/templates';
import logger from '@tps/utilities/logger';
import { isDir } from '@tps/utilities/fileSystem';

interface ListArgv {
	global: boolean;
	local: boolean;
	default: boolean;
}

const removeRcFile = (arr: string[]) => {
	return arr.filter((item) => item !== '.tpsrc');
};

export const BANNED_TEMPLATES: string[] = [
	'init',
	'new-template',
	'new-test',
	'yargs-cli-cmd',
];

export default {
	command: ['list', 'ls'],
	description: 'Show all available templates',
	builder: {
		global: {
			type: 'boolean',
			description: 'List out global files',
			alias: 'g',
			default: true,
		},
		local: {
			type: 'boolean',
			description: 'List out global files',
			alias: 'l',
			default: true,
		},
		default: {
			type: 'boolean',
			description: 'List out default templates',
			alias: 'd',
			default: true,
		},
	},
	async handler(argv) {
		const { local, default: _default, global } = argv;

		logger.cli.info('Args: %O', { local, default: _default, global });

		if (_default) {
			logger.cli.info('Default Path: %s', TPS.DEFAULT_TPS);

			const defaultTemplates = removeRcFile(
				fs.readdirSync(TPS.DEFAULT_TPS),
			).filter(
				// remove irrelevant templates
				(file) => !BANNED_TEMPLATES.includes(file),
			);

			logger.cli.info('default templates: %s', defaultTemplates);

			// @ts-expect-error wrong types module (`is`)
			if (!is.array.empty(defaultTemplates)) {
				console.log('Default: ');
				console.log(pjson.render(defaultTemplates));
				console.log('');
			}
		}

		if (global) {
			logger.cli.info('Global Path: %s', TPS.GLOBAL_PATH);

			const hasGlobalTps = Templates.hasGloablTps();

			logger.cli.info('User has global tps: %o', isDir(TPS.GLOBAL_PATH));
			if (hasGlobalTps) {
				const globalTemplates = removeRcFile(fs.readdirSync(TPS.GLOBAL_PATH));

				// @ts-expect-error wrong types module (`is`)
				if (!is.array.empty(globalTemplates)) {
					console.log('Global: ');
					console.log(pjson.render(globalTemplates));
					console.log('');
				}
			}
		}

		if (local) {
			logger.cli.info('Local Path: %s', TPS.LOCAL_PATH);

			const hasLocalTps = Templates.hasLocalTps();

			logger.cli.info('User has local tps: %o', hasLocalTps);
			if (hasLocalTps) {
				const localTemplates = removeRcFile(fs.readdirSync(TPS.LOCAL_PATH));

				logger.cli.info('Local templates: %s', localTemplates);

				// @ts-expect-error wrong types module (`is`)
				if (!is.array.empty(localTemplates)) {
					console.log('Local: ');
					console.log(pjson.render(localTemplates));
				}
			}
		}
	},
} as CommandModule<object, ListArgv>;
