/* eslint-disable no-prototype-builtins */
import is from 'is';
import Template from '@tps/templates';
import type { TemplateOptions } from '@tps/templates/templates';
import logger from '@tps/utilities/logger';
import { CommandModule } from 'yargs';

export interface UseArgv {
	use: string;
	packages: string[];
	default: boolean;
	newFolder: boolean;
	force: boolean;
	wipe: boolean;
	buildPaths: string[];
}

export const options = {
	use: {
		alias: 'u',
		describe: 'Template package to create your with',
		type: 'string',
	},
	packages: {
		alias: 'p',
		describe: 'Additional Packages to use when building your template',
		type: 'array',
	},
	default: {
		alias: 'd',
		type: 'boolean',
		describe: 'Use all default answers to all prompts',
	},
	newFolder: {
		alias: 'f',
		describe: 'Create a new folder',
		type: 'boolean',
	},
	force: {
		describe:
			'force the template to be made. This will override any files that tps needs to create',
		type: 'boolean',
	},
	wipe: {
		describe:
			'force the template to be made. This will delete the directory if exists',
		type: 'boolean',
	},
};

export const createHandler: CommandModule<object, UseArgv>['handler'] = async (
	argv,
) => {
	/**
	 * if we ever want to be able to pass a name in then we should add this to the flags.
	 * @example
	 * {
	 *  "name": {
	 *    "alias": "n",
	 *    "describe": "Name for template rendering. defaults to base name of the destination path",
	 *    "type": "string"
	 *  },
	 * }
	 */
	const dest = process.cwd();

	const { packages, buildPaths, ...answers } = argv;

	const tpsConfig: Partial<TemplateOptions> = {};

	if (argv.hasOwnProperty('newFolder')) tpsConfig.newFolder = argv.newFolder;
	if (argv.hasOwnProperty('force')) tpsConfig.force = argv.force;
	if (argv.hasOwnProperty('wipe')) tpsConfig.wipe = argv.wipe;
	if (argv.hasOwnProperty('default')) tpsConfig.default = argv.default;

	logger.cli.info('Tps Config: %n', tpsConfig);
	const tps = new Template(argv.use, tpsConfig);

	// @ts-expect-error wrong types for `is`
	if (is.array(packages) && !is.array.empty(packages)) {
		logger.cli.info('Loading packages:', packages);
		tps.loadPackages(packages);
	}

	if (tps.hasPrompts()) {
		logger.cli.info('Answers to prompts: %n', answers);
		tps.setAnswers(answers);
	}

	// @ts-expect-error wrong types for `is`
	const hasBuildPaths: boolean = !is.array.empty(buildPaths) as boolean;
	const renderItems = hasBuildPaths ? buildPaths : null;

	const renderData = {
		name: argv.name,
	};

	logger.cli.info('Build paths: %n', buildPaths);

	const templatesBuilt = await tps.render(dest, renderItems, renderData);

	console.log('templatesBuilt', templatesBuilt);
	console.log('renderItems', renderItems);

	templatesBuilt.forEach((template) => {
		console.log(template);
	});
};
