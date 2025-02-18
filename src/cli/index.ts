#!/usr/bin/env node
/* eslint-disable no-unused-expressions */

import yargs from 'yargs/yargs';
import { commands } from './commands';
import { middleware } from './middleware';

// eslint-disable-next-line no-unused-expressions
yargs(process.argv.slice(2))
	.options({
		verbose: {
			alias: 'v',
			describe: 'More in-depth logging',
			type: 'boolean',
			required: false,
			default: false,
		},
		env: {
			describe: 'Load environment variables from a .env file',
			type: 'boolean',
			required: false,
			default: true,
		},
	})
	.middleware(middleware)
	.command(commands)
	.help()
	.parse();
