// @ts-check

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	opts: {
		experimentalTemplateEngine: true,
	},
	prompts: [
		{
			name: 'export',
			message: 'Would you like a default export or named export?',
			type: 'checkbox',
			tpsType: 'data',
			choices: ['default', 'named'],
			default: 'default',
		},
		{
			name: 'inlineDefaultExport',
			message:
				'Would you like your default export on the same line as your component?',
			type: 'confirm',
			tpsType: 'data',
			hidden: true,
			default: false,
		},
		{
			name: 'functionStyle',
			message:
				'Would you like a arrow function or a function declaration for your component?',
			type: 'checkbox',
			tpsType: 'data',
			choices: ['function', 'arrow'],
			default: 'function',
		},
		{
			name: 'typescript',
			aliases: ['t'],
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
				if (answers.typescript) return 'tsx';
				return 'jsx';
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
			name: 'cssExtension',
			aliases: ['cssType', 'cssExt'],
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
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include unit tests?',
			default: false,
		},
		{
			name: 'testExtension',
			aliases: ['testType', 'testExt'],
			tpsType: 'data',
			type: 'input',
			message: 'What type of test extension would you like?',
			when: (answers) => {
				return !!answers.test;
			},
			default: (answers) => {
				if (answers.typescript) return 'test.tsx';
				return 'test.jsx';
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
			name: 'component',
			hidden: true,
			type: 'confirm',
			tpsType: 'data',
			message: 'What component would you like as the base component?',
			default: null,
		},
		{
			name: 'storybook',
			aliases: ['s', 'story'],
			hidden: true,
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include a storybook file?',
			default: false,
		},
	],
};
