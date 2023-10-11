// @ts-check

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	opts: {
		experimentalTemplateEngine: true,
	},
	prompts: [
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
			message: 'What type of extension do you want for your component?',
			default: (answers) => {
				if (answers.typescript) return 'ts';
				return 'js';
			},
		},
		{
			name: 'css',
			aliases: ['c'],
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include a css file?',
			default: true,
		},
		{
			name: 'cssType',
			aliases: ['z'],
			tpsType: 'data',
			type: 'input',
			message: 'What type of css extension would you like?',
			when: (answers) => {
				return !!answers.css;
			},
			default: 'css',
		},
		{
			name: 'test',
			aliases: ['t'],
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include unit tests?',
			default: false,
		},
		{
			name: 'testType',
			aliases: ['y'],
			tpsType: 'data',
			type: 'input',
			message: 'What type of test extension would you like?',
			when: (answers) => {
				return !!answers.test;
			},
			default: (answers) => {
				if (answers.typescript) return 'test.ts';
				return 'test.js';
			},
		},
		{
			name: 'index',
			aliases: ['i'],
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include a index file?',
			default: true,
		},
		{
			name: 'storybook',
			aliases: ['s', 'story'],
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include a storybook file?',
			default: false,
		},
	],
};
