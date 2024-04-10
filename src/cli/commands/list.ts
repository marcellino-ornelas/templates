import fs from 'fs';
import { MAIN_DIR, TPS_FOLDER, USER_HOME } from '@tps/utilities/constants';
import { CommandModule } from 'yargs';
import Templates from '@tps/templates';
import logger from '@tps/utilities/logger';
import path from 'path';
import { flatten, unique } from '@tps/utilities/helpers';

interface ListArgv {
	global: boolean;
	local: boolean;
	default: boolean;
	nodeModules: boolean;
}

const removeRcFile = (arr: string[]) => {
	return arr.filter((item) => {
		return item !== '.tpsrc';
	});
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
		nodeModules: {
			type: 'boolean',
			description: 'List out 3rd party templates',
			alias: 'n',
			default: true,
		},
	},
	async handler(argv) {
		const { local, default: defaultTemplates, global, nodeModules } = argv;

		logger.cli.info('Args: %n', {
			local,
			default: defaultTemplates,
			global,
			nodeModules,
		});

		/**
		 * All template locations
		 */
		const templateLocations = Templates.getTemplateLocations();

		logger.cli.info('Template locations: %n', templateLocations);

		/**
		 * Filter out local, global, default, 3rd party templates depending
		 * on what the user supplies
		 */
		const filteredTemplates = templateLocations.filter((dir) => {
			const isDefaultTemplate = dir.startsWith(path.join(MAIN_DIR, TPS_FOLDER));

			const isNodeModulesTemplate = path.parse(dir).base === 'node_modules';

			const isGlobalTemplates =
				dir.startsWith(path.join(USER_HOME, TPS_FOLDER)) ||
				dir.startsWith(path.join(USER_HOME, 'node_modules'));

			const isLocalTemplate = !isDefaultTemplate && !isGlobalTemplates;

			logger.cli.info('%s %n', dir, {
				isDefaultTemplate,
				isGlobalTemplates,
				isLocalTemplate,
				isNodeModulesTemplate,
			});

			if (!defaultTemplates && isDefaultTemplate) return false;
			if (!global && isGlobalTemplates) return false;
			if (!nodeModules && isNodeModulesTemplate) return false;
			if (!local && isLocalTemplate) return false;

			return true;
		});

		logger.cli.info('Templates after filter: %n\n', filteredTemplates);

		/**
		 * Fetch templates in each directories still present
		 */
		const templatesNested = await Promise.all(
			filteredTemplates.map(async (templateDir) => {
				let directoryTemplates: string[] = [];

				try {
					/**
					 * readdir throws error when not present. To prevent
					 * making multiple call (existence, readdir) for each directory
					 * well just return empty array here.
					 */
					directoryTemplates = await fs.promises.readdir(templateDir, {});
				} catch (e) {
					return [];
				}

				if (templateDir.includes('node_modules')) {
					/**
					 * Only print out packages that start with `tps`
					 */
					directoryTemplates = directoryTemplates.filter((template) => {
						return template.startsWith('tps-');
					});
				}

				if (templateDir.startsWith(path.join(MAIN_DIR))) {
					/**
					 * Removed banned templates. Banned templates are
					 * this repos internal templates
					 */
					directoryTemplates = directoryTemplates.filter((template) => {
						return !BANNED_TEMPLATES.includes(template);
					});
				}

				/**
				 * Remove `.tpsrc` file
				 */
				return removeRcFile(directoryTemplates);
			}),
		);

		const templates = unique(flatten(templatesNested));

		templates.forEach((template) => {
			console.log(template);
		});
	},
} as CommandModule<object, ListArgv>;
