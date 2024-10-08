// @ts-check
const { runFormatter, FORMATTER_PROMPT } = require('../../lib/tools');

/** @type {import('./../../src/types/settings').SettingsFile} */
module.exports = {
	opts: {
		newFolder: false,
		experimentalTemplateEngine: true,
	},
	prompts: [
		{
			name: 'type',
			type: 'list',
			tpsType: 'package',
			message: 'What type of file style do you want to use?',
			choices: [
				{
					name: 'Named Export',
					value: 'namedExport',
				},
				{
					name: 'Default Export',
					value: 'defaultExport',
				},
			],
			default: 'namedExport',
		},
		{
			name: 'typescript',
			type: 'confirm',
			tpsType: 'data',
			message: 'Would you like to use typescript',
			default: false,
		},
		{
			name: 'extension',
			aliases: ['e', 'ext', 'extention'],
			type: 'input',
			tpsType: 'data',
			message: 'What type of extension do you want for your file?',
			default: (answers) => {
				if (answers.typescript) return 'ts';
				return 'js';
			},
		},
		{
			name: 'description',
			aliases: ['desc'],
			type: 'input',
			tpsType: 'data',
			message: 'Please add a description',
			default: '...',
		},
		FORMATTER_PROMPT,
	],
	events: {
		async onRendered(tps, { dest, buildPaths }) {
			const directoryForPrettier = tps.opts.newFolder ? buildPaths : [dest];

			const answers = tps.getAnswers();

			runFormatter(answers.formatter, dest, directoryForPrettier, tps);
		},
	},
};
