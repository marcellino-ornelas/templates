// @ts-check
// const prettier = require('prettier/standalone.js');

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	opts: {
		experimentalTemplateEngine: true,
	},
	prompts: [
		{
			name: 'export',
			description: 'Type of export that will be used in your component',
			message: 'Would you like a default export or named export?',
			type: 'list',
			tpsType: 'data',
			choices: ['default', 'named'],
			default: 'default',
			hidden: true,
		},
		{
			name: 'inlineDefaultExport',
			description:
				'Places the default export on the same line as the component, if export is default.',
			message:
				'Would you like your default export on the same line as your component?',
			type: 'confirm',
			tpsType: 'data',
			hidden: true,
			default: false,
		},
		{
			name: 'functionStyle',
			description: 'Type of function that will be used in your component',
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
			description: 'Generate the component in TypeScript',
			aliases: ['t'],
			type: 'confirm',
			tpsType: 'data',
			message: 'Would you like to use typescript',
			default: false,
		},
		{
			name: 'extension',
			description: 'Extension that will be used for the component file',
			message: 'What type of extension do you want for your component?',
			aliases: ['e', 'ext', 'extention'],
			type: 'input',
			tpsType: 'data',
			default: (answers) => {
				if (answers.typescript) return 'tsx';
				return 'jsx';
			},
		},
		{
			name: 'css',
			description: 'Generate a css file for the component',
			message: 'Would you like to include a css file?',
			aliases: ['c'],
			type: 'confirm',
			tpsType: 'package',
			default: true,
		},
		{
			name: 'cssExtension',
			description: 'Extension that will be used for the css file',
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
			description: 'Generate a test file for the component',
			type: 'confirm',
			tpsType: 'package',
			message: 'Would you like to include unit tests?',
			default: false,
		},
		{
			name: 'reactTestingLibrary',
			description: 'Use react testing library in the test file',
			message:
				'Would you like to use @testing-library/react in your test file?',
			type: 'confirm',
			tpsType: 'data',
			when: (answers) => {
				return !!answers.test;
			},
			hidden: true,
			default: true,
		},
		{
			name: 'jestDomImport',
			description:
				'Add a @testing-library/jest-dom import statement to the test file',
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
			description: 'Extension that will be used for the test file',
			message: 'What type of test extension would you like?',
			aliases: ['testType', 'testExt'],
			tpsType: 'data',
			type: 'input',
			when: (answers) => {
				return !!answers.test;
			},
			default: (answers) => {
				return `test.${answers.extension}`;
			},
		},
		{
			name: 'index',
			description: 'Generate a index file for the component',
			message: 'Would you like to include a index file?',
			aliases: ['i'],
			type: 'confirm',
			tpsType: 'package',
			default: true,
		},
		{
			name: 'indexExtension',
			description: 'Extension that will be used for the index file',
			message: 'What type of extension would you like for your index file?',
			aliases: ['indexExt'],
			tpsType: 'data',
			type: 'input',
			hidden: true,
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
			description:
				'Type of export pattern that will be used for the index file',
			message: 'What type of export pattern do you want for your index file?',
			aliases: ['i'],
			type: 'list',
			tpsType: 'data',
			hidden: true,
			choices: ['shorthand', 'explicit'],
			default: 'shorthand',
		},
		{
			name: 'component',
			description:
				'Element or component that will be returned in the component file',
			message: 'What component would you like as the base component?',
			hidden: true,
			type: 'confirm',
			tpsType: 'data',
			default: 'div',
		},
		{
			name: 'storybook',
			description: 'Generate a storybook file for the component',
			message: 'Would you like to include a storybook file?',
			aliases: ['s', 'story'],
			hidden: true,
			type: 'confirm',
			tpsType: 'package',
			default: false,
		},
		{
			name: 'formatter',
			description:
				'Type of formatter you would like to use to format the component',
			message: 'What type of formatter do you want to use to format your code',
			type: 'list',
			tpsType: 'data',
			hidden: true,
			choices: ['prettier', 'biome'],
			default: 'prettier',
		},
		{
			name: 'linter',
			description:
				'Type of linter you would like to use to format the component',
			message: 'What type of linter do you want to use to fix your code',
			type: 'list',
			tpsType: 'data',
			hidden: true,
			choices: ['eslint', 'biome'],
			default: 'eslint',
		},
	],
	events: {
		async onRendered(tps, dest, createdPaths) {
			const prettier = (await import('prettier')).default;
			const { $ } = await import('zx');

			$.preferLocal = true;

			const configPath = await prettier.resolveConfigFile(`${dest}/hey.json`);
			// issue 1:
			// 		if prettier and biome are both globally installed running
			// 		both in the same process would overwrite eachother
			// issue 2:
			// 		if eslint and biome are both globally installed running
			// 		both in the same process would overwrite eachother
			// Questions:
			// 		Would someone want to run both?? :thinking:

			try {
				await $`prettier ${createdPaths} --ignore-unknown --write --ignore-path ./.prettierignore`;
			} catch (e) {
				console.warn('prettier', e);
			}

			try {
				await $`eslint ${createdPaths} --fix`;
			} catch (e) {
				console.warn('eslint', e);
			}
		},
	},
};
