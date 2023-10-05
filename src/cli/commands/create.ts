import { CommandModule } from 'yargs';
import { createHandler, options } from '@tps/cli/utils/create';

export default {
	command: 'create [buildPaths...]',

	description: 'create a new folder with template',

	builder: options,

	handler: createHandler,
} as CommandModule;
