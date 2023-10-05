#!/usr/bin/env node
/* eslint-disable no-unused-expressions */

import yargs from 'yargs/yargs';
import { commands } from './commands';

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
	})
	.command(commands)
	.help()
	.parse();
