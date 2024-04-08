import fs from 'fs';
import pjson from 'prettyjson-256';
import is from 'is';
import { MAIN_DIR, TPS_FOLDER, USER_HOME } from '@tps/utilities/constants';
import { CommandModule } from 'yargs';
import Templates from '@tps/templates';
import logger from '@tps/utilities/logger';
import { isDir } from '@tps/utilities/fileSystem';
import path from 'path';
import { flatten, unique } from '@tps/utilities/helpers';

interface ListArgv {
	global: boolean;
	local: boolean;
	default: boolean;
}

const removeRcFile = (arr: string[]) => {
	return arr.filter((item) => item !== '.tpsrc');
};

export const BANNED_TEMPLATES: string[] = ['init', 'new-template', 'new-test'];

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

		const templateLocations = Templates.getTemplateLocations().reverse();

		logger.cli.info('Templte locations: %n', templateLocations);

		const filteredTemplates = templateLocations.filter((dir) => {
			const isDefaultTemplate = dir.startsWith(path.join(MAIN_DIR, TPS_FOLDER));

			const isGlobalTemplates =
				dir.startsWith(path.join(USER_HOME, TPS_FOLDER)) ||
				dir.startsWith(path.join(USER_HOME, 'node_modules'));

			const isLocalTemplate = !isDefaultTemplate && !isGlobalTemplates;

			logger.cli.info('%s %n', dir, {
				isDefaultTemplate,
				isGlobalTemplates,
				isLocalTemplate,
			});

			if (!defaultTemplates && isDefaultTemplate) return false;
			if (!global && isGlobalTemplates) return false;
			if (!local && isLocalTemplate) return false;

			return true;
		});

		logger.cli.info('Templates after filter: %n\n', filteredTemplates);

		const templatesNested = await Promise.all(
			filteredTemplates.map(async (templateDir) => {
				let directoryTemplates: string[] = [];

				try {
					directoryTemplates = await fs.promises.readdir(templateDir, {});
				} catch (e) {
					return [];
				}

				if (templateDir.includes('node_modules')) {
					directoryTemplates = directoryTemplates.filter((template) => {
						return template.startsWith('tps-');
					});
				}

				if (templateDir.startsWith(path.join(MAIN_DIR))) {
					directoryTemplates = directoryTemplates.filter((template) => {
						return !BANNED_TEMPLATES.includes(template);
					});
				}

				return removeRcFile(directoryTemplates);
			}),
		);

		const templates = unique(flatten(templatesNested));

		templates.forEach((template) => {
			console.log(template);
		});
	},
} as CommandModule<object, ListArgv>;
