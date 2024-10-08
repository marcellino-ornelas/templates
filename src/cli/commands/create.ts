import { CommandModule } from 'yargs';
import { createHandler } from '@tps/cli/utils/create';

export default {
	command: 'create [buildPaths...]',

	description: 'create a new folder with template',

	deprecated: true,

	builder: {
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
		hidden: {
			describe: 'Prompt all hidden prompts',
			type: 'boolean',
		},
	},

	handler: createHandler,
} as CommandModule;
