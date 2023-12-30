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
		const { local, default: defaultTemplates, global } = argv;

		logger.cli.info('Args: %O', { local, default: defaultTemplates, global });

		if (defaultTemplates) {
			logger.cli.info('Default Path: %s', TPS.DEFAULT_TPS);

			const defaultTps = removeRcFile(fs.readdirSync(TPS.DEFAULT_TPS)).filter(
				// remove irrelevant templates
				(file) => !BANNED_TEMPLATES.includes(file),
			);

			logger.cli.info('default templates: %s', defaultTps);

			// @ts-expect-error wrong types module (`is`)
			if (!is.array.empty(defaultTps)) {
				console.log('Default: ');
				console.log(pjson.render(defaultTps));
				console.log('');
			}
		}

		if (global) {
			logger.cli.info('Global Path: %s', TPS.GLOBAL_PATH);

			logger.cli.info('User has global tps: %o', isDir(TPS.GLOBAL_PATH));
			if (Templates.hasGloablTps()) {
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

			logger.cli.info('User has local tps: %o', Templates.hasLocalTpsrc());
			if (Templates.hasLocalTps()) {
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
