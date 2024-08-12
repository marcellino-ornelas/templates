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
			type: 'list',
			tpsType: 'data',
			choices: ['default', 'named'],
			default: 'default',
			hidden: true,
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
			type: 'list',
			tpsType: 'data',
			choices: ['function', 'arrow'],
			hidden: true,
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
			name: 'reactTestingLibrary',
			type: 'confirm',
			tpsType: 'data',
			message:
				'Would you like to use @testing-library/react in your test file?',
			when: (answers) => {
				return !!answers.test;
			},
			hidden: true,
			default: true,
		},
		{
			name: 'jestDomImport',
			type: 'confirm',
			tpsType: 'data',
			message: 'Would you like a @testing-library/jest-dom import?',
			when: (answers) => {
				return !!answers.reactTestingLibrary;
			},
			hidden: true,
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
				return `test.${answers.extension}`;
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
			name: 'indexExtension',
			aliases: ['indexExt'],
			tpsType: 'data',
			type: 'input',
			hidden: true,
			message: 'What type of extension would you like for your index file?',
			when: (answers) => {
				return !!answers.index;
			},
			default: (answers) => {
				// if jsx or tsx extension, strip ending `x` for index file
				if (/^(t|j)sx$/.test(answers.extension)) {
					return answers.extension.slice(0, -1);
				}

				return answers.extension;
			},
		},
		{
			name: 'indexExportPattern',
			aliases: ['i'],
			type: 'list',
			tpsType: 'data',
			hidden: true,
			message: 'What type of export pattern do you want for your index file?',
			choices: ['shorthand', 'explicit'],
			default: 'shorthand',
		},
		{
			name: 'component',
			hidden: true,
			type: 'confirm',
			tpsType: 'data',
			message: 'What component would you like as the base component?',
			default: 'div',
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
