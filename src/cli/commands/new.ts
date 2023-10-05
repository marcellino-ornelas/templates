import { CommandModule } from 'yargs';

import { commands } from './new_commands';

export default {
	command: 'new <command>',

	description: 'create a new template | package',

	builder: (yargs) => yargs.command(commands),

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	handler(argv) {},
} as CommandModule;
